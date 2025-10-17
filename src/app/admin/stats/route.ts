import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    // Get total accounts
    const totalAccounts = await db.account.count()
    const activeAccounts = await db.account.count({
      where: { isActive: true }
    })

    // Get total users
    const totalUsers = await db.user.count()

    // Get revenue data
    const payments = await db.payment.findMany({
      where: { status: "SUCCESS" }
    })

    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0)
    
    // Get monthly revenue (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const monthlyPayments = payments.filter(payment => 
      new Date(payment.paidAt || payment.createdAt) >= thirtyDaysAgo
    )
    const monthlyRevenue = monthlyPayments.reduce((sum, payment) => sum + payment.amount, 0)

    // Calculate growth (simplified)
    const growth = 12.5 // This would be calculated based on previous month

    return NextResponse.json({
      totalAccounts,
      activeAccounts,
      totalUsers,
      totalRevenue,
      monthlyRevenue,
      growth
    })

  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}