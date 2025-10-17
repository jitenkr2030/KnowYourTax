import { NextRequest, NextResponse } from 'next/server'
import ReportingService from '@/lib/reporting-service'

const reportingService = new ReportingService()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reportData, format } = body

    if (!reportData || !format) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const buffer = await reportingService.exportReport(reportData, format)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': format === 'pdf' ? 'application/pdf' : 
                       format === 'excel' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' :
                       'text/csv',
        'Content-Disposition': `attachment; filename="report.${format}"`,
      },
    })
  } catch (error) {
    console.error('Report export error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
