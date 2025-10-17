import { NextRequest, NextResponse } from 'next/server'
import { EventLogService } from '@/lib/event-log-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { eventType, userId, accountId, properties } = body
    
    if (!eventType) {
      return NextResponse.json(
        { error: 'Event type is required' },
        { status: 400 }
      )
    }

    // Get client info from request
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const sessionId = request.headers.get('authorization') || 'anonymous'

    const eventLog = await EventLogService.logEvent({
      eventType,
      userId,
      accountId,
      properties: properties || {},
      ipAddress,
      userAgent,
      sessionId,
    })

    return NextResponse.json({
      success: true,
      data: eventLog,
    })
  } catch (error) {
    console.error('Event logging error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters = {
      eventType: searchParams.get('eventType') || undefined,
      userId: searchParams.get('userId') || undefined,
      accountId: searchParams.get('accountId') || undefined,
      startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
      endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined,
    }

    const events = await EventLogService.getEvents(filters)

    return NextResponse.json({
      success: true,
      data: events,
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}