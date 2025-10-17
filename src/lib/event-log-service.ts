import { db } from '@/lib/db'

export interface EventLogData {
  id: string
  eventType: string
  userId?: string
  accountId?: string
  properties: Record<string, any>
  timestamp: Date
  ipAddress?: string
  userAgent?: string
  sessionId?: string
}

export class EventLogService {
  static async logEvent(data: {
    eventType: string
    userId?: string
    accountId?: string
    properties: Record<string, any>
    ipAddress?: string
    userAgent?: string
    sessionId?: string
  }) {
    try {
      const eventLog = await db.eventLog.create({
        data: {
          eventType: data.eventType,
          userId: data.userId,
          accountId: data.accountId,
          properties: data.properties,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          sessionId: data.sessionId,
        },
      })

      return eventLog
    } catch (error) {
      console.error('Error logging event:', error)
      throw error
    }
  }

  static async getEvents(filters: {
    eventType?: string
    userId?: string
    accountId?: string
    startDate?: Date
    endDate?: Date
    limit?: number
    offset?: number
  } = {}) {
    try {
      const where: any = {}

      if (filters.eventType) {
        where.eventType = filters.eventType
      }

      if (filters.userId) {
        where.userId = filters.userId
      }

      if (filters.accountId) {
        where.accountId = filters.accountId
      }

      if (filters.startDate || filters.endDate) {
        where.timestamp = {}
        if (filters.startDate) {
          where.timestamp.gte = filters.startDate
        }
        if (filters.endDate) {
          where.timestamp.lte = filters.endDate
        }
      }

      const events = await db.eventLog.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          account: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          timestamp: 'desc',
        },
        take: filters.limit || 100,
        skip: filters.offset || 0,
      })

      return events
    } catch (error) {
      console.error('Error fetching events:', error)
      throw error
    }
  }

  static async getEventStats(filters: {
    startDate?: Date
    endDate?: Date
    groupBy?: 'day' | 'week' | 'month'
  } = {}) {
    try {
      const where: any = {}

      if (filters.startDate || filters.endDate) {
        where.timestamp = {}
        if (filters.startDate) {
          where.timestamp.gte = filters.startDate
        }
        if (filters.endDate) {
          where.timestamp.lte = filters.endDate
        }
      }

      // Get event counts by type
      const eventCounts = await db.eventLog.groupBy({
        by: ['eventType'],
        where,
        _count: {
          eventType: true,
        },
        orderBy: {
          _count: {
            eventType: 'desc',
          },
        },
      })

      // Get total events
      const totalEvents = await db.eventLog.count({ where })

      // Get unique users
      const uniqueUsers = await db.eventLog.findMany({
        where,
        select: {
          userId: true,
        },
        distinct: ['userId'],
      })

      // Get unique accounts
      const uniqueAccounts = await db.eventLog.findMany({
        where,
        select: {
          accountId: true,
        },
        distinct: ['accountId'],
      })

      return {
        eventCounts,
        totalEvents,
        uniqueUsers: uniqueUsers.length,
        uniqueAccounts: uniqueAccounts.length,
      }
    } catch (error) {
      console.error('Error fetching event stats:', error)
      throw error
    }
  }

  static async getUserActivity(userId: string, days: number = 30) {
    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      const events = await db.eventLog.findMany({
        where: {
          userId,
          timestamp: {
            gte: startDate,
          },
        },
        orderBy: {
          timestamp: 'desc',
        },
      })

      const eventCounts = events.reduce((acc, event) => {
        acc[event.eventType] = (acc[event.eventType] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      return {
        events,
        eventCounts,
        totalEvents: events.length,
      }
    } catch (error) {
      console.error('Error fetching user activity:', error)
      throw error
    }
  }

  static async getAccountActivity(accountId: string, days: number = 30) {
    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      const events = await db.eventLog.findMany({
        where: {
          accountId,
          timestamp: {
            gte: startDate,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          timestamp: 'desc',
        },
      })

      const eventCounts = events.reduce((acc, event) => {
        acc[event.eventType] = (acc[event.eventType] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const userActivity = events.reduce((acc, event) => {
        if (event.userId) {
          acc[event.userId] = (acc[event.userId] || 0) + 1
        }
        return acc
      }, {} as Record<string, number>)

      return {
        events,
        eventCounts,
        userActivity,
        totalEvents: events.length,
      }
    } catch (error) {
      console.error('Error fetching account activity:', error)
      throw error
    }
  }
}