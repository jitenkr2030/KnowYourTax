import { NextRequest, NextResponse } from 'next/server'
import GSTInvoiceService, { GSTInvoiceRequest } from '@/lib/gst-invoice-service'

const invoiceService = new GSTInvoiceService()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const invoiceRequest: GSTInvoiceRequest = body

    // Validate required fields
    if (!invoiceRequest.customerId || !invoiceRequest.items || invoiceRequest.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const invoice = await invoiceService.createInvoice(invoiceRequest)
    return NextResponse.json({ success: true, invoice })
  } catch (error) {
    console.error('Invoice creation error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')
    const invoiceId = searchParams.get('invoiceId')
    const action = searchParams.get('action')

    if (invoiceId) {
      const invoice = await invoiceService.getInvoiceById(invoiceId)
      if (!invoice) {
        return NextResponse.json(
          { success: false, error: 'Invoice not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true, invoice })
    }

    if (customerId) {
      const invoices = await invoiceService.getInvoicesByCustomer(customerId)
      return NextResponse.json({ success: true, invoices })
    }

    if (action === 'generate-pdf' && invoiceId) {
      const pdfHTML = await invoiceService.generateInvoicePDF(invoiceId)
      return new NextResponse(pdfHTML, {
        headers: {
          'Content-Type': 'text/html',
          'Content-Disposition': `attachment; filename="invoice-${invoiceId}.html"`,
        },
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request parameters' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Invoice GET error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const invoiceId = searchParams.get('invoiceId')
    const body = await request.json()
    const { status, paymentId } = body

    if (!invoiceId) {
      return NextResponse.json(
        { success: false, error: 'Invoice ID required' },
        { status: 400 }
      )
    }

    const invoice = await invoiceService.updateInvoicePaymentStatus(
      invoiceId,
      status,
      paymentId
    )

    if (!invoice) {
      return NextResponse.json(
        { success: false, error: 'Invoice not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, invoice })
  } catch (error) {
    console.error('Invoice update error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}