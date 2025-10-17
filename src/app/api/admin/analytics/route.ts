import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '30d'
    const metric = searchParams.get('metric')

    // Calculate date range
    const now = new Date()
    let startDate = new Date()
    
    switch (timeRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    // Fetch different metrics based on the request
    if (metric === 'overview') {
      const [totalAccounts, activeSubscriptions, monthlyRevenue, churnRate, growthCount] = await Promise.all([
        db.account.count(),
        db.account.count({ where: { subscriptionStatus: 'ACTIVE' } }),
        db.payment.aggregate({
          where: {
            status: 'SUCCESS',
            createdAt: { gte: startDate },
          },
          _sum: { amount: true },
        }),
        // Simple churn calculation
        db.account.count({
          where: {
            subscriptionStatus: 'CANCELLED',
            updatedAt: { gte: startDate },
          },
        }),
        // Growth calculation
        db.account.count({
          where: {
            createdAt: { gte: startDate },
          },
        }),
      ])

      const previousMonthStart = new Date(startDate)
      previousMonthStart.setMonth(previousMonthStart.getMonth() - 1)
      
      const [previousMonthRevenue] = await Promise.all([
        db.payment.aggregate({
          where: {
            status: 'SUCCESS',
            createdAt: { 
              gte: previousMonthStart,
              lt: startDate,
            },
          },
          _sum: { amount: true },
        }),
      ])

      const calculatedGrowthRate = monthlyRevenue._sum.amount && previousMonthRevenue._sum.amount 
        ? ((monthlyRevenue._sum.amount - previousMonthRevenue._sum.amount) / previousMonthRevenue._sum.amount) * 100
        : 0

      return NextResponse.json({
        success: true,
        data: {
          totalAccounts,
          activeSubscriptions,
          monthlyRevenue: monthlyRevenue._sum.amount || 0,
          churnRate: churnRate / totalAccounts,
          growthRate: calculatedGrowthRate,
          timeRange,
        },
      })
    }

    if (metric === 'subscriptions') {
      const subscriptions = await db.account.findMany({
        where: {
          updatedAt: { gte: startDate },
        },
        include: {
          _count: {
            select: {
              users: true,
              payments: {
                where: { status: 'SUCCESS' },
              },
            },
          },
          payments: {
            where: { 
              status: 'SUCCESS',
              createdAt: { gte: startDate },
            },
            orderBy: { createdAt: 'desc' },
          },
        },
        orderBy: { updatedAt: 'desc' },
      })

      const subscriptionBreakdown = subscriptions.reduce((acc, sub) => {
        const plan = sub.subscriptionPlan
        if (!acc[plan]) {
          acc[plan] = { count: 0, revenue: 0, users: 0 }
        }
        acc[plan].count += 1
        acc[plan].revenue += sub.payments.reduce((sum, payment) => sum + payment.amount, 0)
        acc[plan].users += sub._count.users
        return acc
      }, {} as Record<string, { count: number; revenue: number; users: number }>)

      return NextResponse.json({
        success: true,
        data: {
          subscriptions,
          breakdown: subscriptionBreakdown,
          timeRange,
        },
      })
    }

    if (metric === 'revenue') {
      const revenue = await db.payment.findMany({
        where: {
          status: 'SUCCESS',
          createdAt: { gte: startDate },
        },
        include: {
          account: {
            select: {
              subscriptionPlan: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      const revenueByPlan = revenue.reduce((acc, payment) => {
        const plan = payment.account.subscriptionPlan
        if (!acc[plan]) {
          acc[plan] = 0
        }
        acc[plan] += payment.amount
        return acc
      }, {} as Record<string, number>)

      const revenueByMonth = revenue.reduce((acc, payment) => {
        const month = new Date(payment.createdAt).toISOString().slice(0, 7) // YYYY-MM
        if (!acc[month]) {
          acc[month] = 0
        }
        acc[month] += payment.amount
        return acc
      }, {} as Record<string, number>)

      return NextResponse.json({
        success: true,
        data: {
          revenue,
          revenueByPlan,
          revenueByMonth,
          timeRange,
        },
      })
    }

    if (metric === 'users') {
      const users = await db.user.findMany({
        where: {
          createdAt: { gte: startDate },
        },
        include: {
          account: {
            select: {
              subscriptionPlan: true,
              subscriptionStatus: true,
              createdAt: true,
            },
          },
          _count: {
            select: {
              taxEntries: true,
              gstEntries: true,
              payments: {
                where: { status: 'SUCCESS' },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      const userActivity = users.reduce((acc, user) => {
        const plan = user.account?.subscriptionPlan || 'FREE'
        if (!acc[plan]) {
          acc[plan] = { count: 0, active: 0, taxEntries: 0, gstEntries: 0, payments: 0 }
        }
        acc[plan].count += 1
        if (user.account?.subscriptionStatus === 'ACTIVE') {
          acc[plan].active += 1
        }
        acc[plan].taxEntries += user._count.taxEntries
        acc[plan].gstEntries += user._count.gstEntries
        acc[plan].payments += user._count.payments
        return acc
      }, {} as Record<string, { count: number; active: number; taxEntries: number; gstEntries: number; payments: number }>)

      return NextResponse.json({
        success: true,
        data: {
          users,
          userActivity,
          timeRange,
        },
      })
    }

    if (metric === 'churn') {
      const cancelledSubscriptions = await db.account.findMany({
        where: {
          subscriptionStatus: 'CANCELLED',
          updatedAt: { gte: startDate },
        },
        include: {
          payments: {
            where: { status: 'SUCCESS' },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
        orderBy: { updatedAt: 'desc' },
      })

      const churnByPlan = cancelledSubscriptions.reduce((acc, sub) => {
        const plan = sub.subscriptionPlan
        if (!acc[plan]) {
          acc[plan] = { count: 0, totalRevenue: 0, avgLifetime: 0 }
        }
        acc[plan].count += 1
        if (sub.payments.length > 0) {
          acc[plan].totalRevenue += sub.payments[0].amount
        }
        // Calculate lifetime (simplified)
        const lifetime = new Date().getTime() - new Date(sub.createdAt).getTime()
        acc[plan].avgLifetime += lifetime
        return acc
      }, {} as Record<string, { count: number; totalRevenue: number; avgLifetime: number }>)

      // Calculate average lifetime
      Object.keys(churnByPlan).forEach(plan => {
        if (churnByPlan[plan].count > 0) {
          churnByPlan[plan].avgLifetime = churnByPlan[plan].avgLifetime / churnByPlan[plan].count
        }
      })

      return NextResponse.json({
        success: true,
        data: {
          cancelledSubscriptions,
          churnByPlan,
          timeRange,
        },
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid metric parameter' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Admin analytics error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}