import { NextRequest, NextResponse } from 'next/server'
import PaymentService from '@/lib/payment-service'
import NotificationService from '@/lib/notification-service'
import { db } from '@/lib/db'
import crypto from 'crypto'

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

const notificationService = new NotificationService({
  email: {
    host: process.env.EMAIL_HOST || 'smtp.mock.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER || 'mock@email.com',
      pass: process.env.EMAIL_PASS || 'mock_password',
    },
  },
  whatsapp: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || 'mock', // Simple mock value
    authToken: process.env.TWILIO_AUTH_TOKEN || 'mock_token',
    from: process.env.TWILIO_WHATSAPP_FROM || '+1234567890',
  },
})

// Webhook signature verification
function verifyRazorpaySignature(body: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex')
  return expectedSignature === signature
}

function verifyCashfreeSignature(body: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex')
  return expectedSignature === signature
}

// Log webhook events for analytics
async function logWebhookEvent(event: any, provider: string, success: boolean) {
  try {
    await db.webhookLog.create({
      data: {
        provider,
        eventType: event.event || event.type || 'payment',
        payload: JSON.stringify(event),
        success,
        timestamp: new Date(),
      },
    })
  } catch (error) {
    console.error('Failed to log webhook event:', error)
  }
}

// Handle different webhook events
async function handleWebhookEvent(event: any, provider: string) {
  const eventType = event.event || event.type || 'payment'
  
  switch (eventType) {
    case 'payment.captured':
    case 'payment.authorized':
      await handlePaymentSuccess(event, provider)
      break
    case 'payment.failed':
      await handlePaymentFailure(event, provider)
      break
    case 'subscription.charged':
      await handleSubscriptionCharge(event, provider)
      break
    case 'subscription.cancelled':
      await handleSubscriptionCancellation(event, provider)
      break
    case 'refund.processed':
      await handleRefund(event, provider)
      break
    default:
      console.log(`Unhandled event type: ${eventType}`)
  }
}

async function handlePaymentSuccess(event: any, provider: string) {
  try {
    // Update payment record
    const payment = await db.payment.updateMany({
      where: {
        gatewayId: event.payload?.payment?.entity?.id || event.payment_id,
      },
      data: {
        status: 'SUCCESS',
        paidAt: new Date(),
        gatewayResponse: JSON.stringify(event),
      },
    })

    // Update subscription if applicable
    if (event.payload?.payment?.entity?.invoice_id || event.invoice_id) {
      await db.subscription.updateMany({
        where: {
          lastPaymentId: event.payload?.payment?.entity?.id || event.payment_id,
        },
        data: {
          status: 'ACTIVE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      })
    }

    // Send notifications
    const user = await db.user.findFirst({
      where: {
        email: event.payload?.payment?.entity?.email || event.email,
      },
    })

    if (user) {
      await notificationService.sendPaymentConfirmation(
        user.email,
        user.phone || '+919876543210',
        {
          amount: (event.payload?.payment?.entity?.amount || event.amount) / 100,
          orderId: event.payload?.payment?.entity?.order_id || event.order_id,
          paymentId: event.payload?.payment?.entity?.id || event.payment_id,
          taxType: 'Subscription Payment',
          date: new Date().toISOString(),
        }
      )
    }
  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

async function handlePaymentFailure(event: any, provider: string) {
  try {
    // Update payment record
    await db.payment.updateMany({
      where: {
        gatewayId: event.payload?.payment?.entity?.id || event.payment_id,
      },
      data: {
        status: 'FAILED',
        gatewayResponse: JSON.stringify(event),
      },
    })

    // Send failure notification
    const user = await db.user.findFirst({
      where: {
        email: event.payload?.payment?.entity?.email || event.email,
      },
    })

    if (user) {
      await notificationService.sendPaymentFailure(
        user.email,
        user.phone || '+919876543210',
        {
          amount: (event.payload?.payment?.entity?.amount || event.amount) / 100,
          orderId: event.payload?.payment?.entity?.order_id || event.order_id,
          paymentId: event.payload?.payment?.entity?.id || event.payment_id,
          reason: event.payload?.payment?.entity?.error_description || event.error_description,
          date: new Date().toISOString(),
        }
      )
    }
  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}

async function handleSubscriptionCharge(event: any, provider: string) {
  try {
    // Update subscription record
    await db.subscription.updateMany({
      where: {
        id: event.payload?.subscription?.entity?.id || event.subscription_id,
      },
      data: {
        status: 'ACTIVE',
        currentPeriodStart: new Date(event.payload?.subscription?.entity?.current_start || event.current_start * 1000),
        currentPeriodEnd: new Date(event.payload?.subscription?.entity?.current_end || event.current_end * 1000),
      },
    })
  } catch (error) {
    console.error('Error handling subscription charge:', error)
  }
}

async function handleSubscriptionCancellation(event: any, provider: string) {
  try {
    // Update subscription record
    await db.subscription.updateMany({
      where: {
        id: event.payload?.subscription?.entity?.id || event.subscription_id,
      },
      data: {
        status: 'CANCELLED',
        cancelAtPeriodEnd: true,
      },
    })
  } catch (error) {
    console.error('Error handling subscription cancellation:', error)
  }
}

async function handleRefund(event: any, provider: string) {
  try {
    // Update payment record with refund info
    await db.payment.updateMany({
      where: {
        gatewayId: event.payload?.refund?.entity?.payment_id || event.payment_id,
      },
      data: {
        status: 'REFUNDED',
        gatewayResponse: JSON.stringify(event),
      },
    })
  } catch (error) {
    console.error('Error handling refund:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text() // Get raw body for signature verification
    const headers = request.headers
    const contentType = headers.get('content-type') || ''

    // Parse JSON body
    let jsonBody: any
    try {
      jsonBody = JSON.parse(body)
    } catch (parseError) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    // For development, return a mock response if environment variables are not set
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      await logWebhookEvent(jsonBody, 'razorpay', true)
      return NextResponse.json({
        success: true,
        paymentId: 'payment_mock_' + Date.now(),
        orderId: 'order_mock_' + Date.now(),
        provider: 'razorpay',
        message: 'Using mock webhook service for development',
        event: jsonBody.event || 'payment.captured',
      })
    }

    // Verify webhook signature
    let signature = headers.get('x-razorpay-signature')
    let provider: 'razorpay' | 'cashfree' = 'razorpay'
    let isVerified = false

    if (signature) {
      // Razorpay webhook
      isVerified = verifyRazorpaySignature(body, signature, razorpayKeySecret)
    } else {
      // Try Cashfree
      signature = headers.get('x-cashfree-signature')
      if (signature) {
        provider = 'cashfree'
        isVerified = verifyCashfreeSignature(body, signature, cashfreeSecretKey)
      }
    }

    if (!signature) {
      await logWebhookEvent(jsonBody, provider, false)
      return NextResponse.json(
        { success: false, error: 'Missing signature' },
        { status: 400 }
      )
    }

    if (!isVerified) {
      await logWebhookEvent(jsonBody, provider, false)
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Handle the webhook event
    await handleWebhookEvent(jsonBody, provider)
    await logWebhookEvent(jsonBody, provider, true)

    return NextResponse.json({
      success: true,
      provider,
      event: jsonBody.event || jsonBody.type || 'payment',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Add WebhookLog model to Prisma schema
export interface WebhookLog {
  id: string
  provider: string
  eventType: string
  payload: string
  success: boolean
  timestamp: Date
}
