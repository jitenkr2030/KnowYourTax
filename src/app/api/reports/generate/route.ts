import { NextRequest, NextResponse } from 'next/server'
import ReportingService from '@/lib/reporting-service'

const reportingService = new ReportingService()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, reportType, config } = body

    if (!userId || !reportType) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const reportData = await reportingService.generateCustomReport(userId, reportType, config)

    return NextResponse.json({
      success: true,
      data: reportData,
    })
  } catch (error) {
    console.error('Report generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
