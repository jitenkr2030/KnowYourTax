import { NextRequest, NextResponse } from 'next/server'
import PaymentService from '@/lib/payment-service'

const paymentService = new PaymentService({
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID!,
    keySecret: process.env.RAZORPAY_KEY_SECRET!,
  },
  cashfree: {
    appId: process.env.CASHFREE_APP_ID!,
    secretKey: process.env.CASHFREE_SECRET_KEY!,
    environment: (process.env.CASHFREE_ENVIRONMENT as 'TEST' | 'PRODUCTION') || 'TEST',
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { provider, ...paymentData } = body

    const result = await paymentService.verifyPayment(paymentData, provider)

    if (result.success) {
      return NextResponse.json({
        success: true,
        paymentId: result.paymentId,
        orderId: result.orderId,
        provider: result.provider,
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
