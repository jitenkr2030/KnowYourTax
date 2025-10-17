import { NextRequest, NextResponse } from 'next/server'
import { EventLogService } from '@/lib/event-log-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters = {
      startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
      endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
      groupBy: searchParams.get('groupBy') as 'day' | 'week' | 'month' || undefined,
    }

    const stats = await EventLogService.getEventStats(filters)

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('Error fetching event stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}