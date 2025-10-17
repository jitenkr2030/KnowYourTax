import { NextRequest, NextResponse } from 'next/server'
import PaymentService from '@/lib/payment-service'

// Check if required environment variables are set
const razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_key'
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mock_secret'
const cashfreeAppId = process.env.CASHFREE_APP_ID || 'mock_app_id'
const cashfreeSecretKey = process.env.CASHFREE_SECRET_KEY || 'mock_secret_key'

const paymentService = new PaymentService({
  razorpay: {
    keyId: razorpayKeyId,
    keySecret: razorpayKeySecret,
  },
  cashfree: {
    appId: cashfreeAppId,
    secretKey: cashfreeSecretKey,
    environment: (process.env.CASHFREE_ENVIRONMENT as 'TEST' | 'PRODUCTION') || 'TEST',
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // For development, return a mock response if environment variables are not set
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({
        success: true,
        orderId: 'order_mock_' + Date.now(),
        provider: 'razorpay',
        keyId: razorpayKeyId,
        message: 'Using mock payment service for development'
      })
    }
    
    const paymentRequest = {
      amount: body.amount,
      currency: body.currency || 'INR',
      orderId: body.orderId || 'order_' + Date.now(),
      customerId: body.customerId,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      description: body.description,
      provider: body.provider || 'razorpay',
    }

    const result = await paymentService.createPaymentOrder(paymentRequest)

    if (result.success) {
      return NextResponse.json({
        success: true,
        orderId: result.orderId,
        provider: result.provider,
        keyId: process.env.RAZORPAY_KEY_ID,
        // For Razorpay, we need to return the key for frontend
        ...(result.provider === 'razorpay' && { keyId: process.env.RAZORPAY_KEY_ID }),
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
