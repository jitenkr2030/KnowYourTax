import { NextRequest, NextResponse } from 'next/server'
import NotificationService from '@/lib/notification-service'

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...notificationData } = body

    let result

    switch (type) {
      case 'payment-confirmation':
        result = await notificationService.sendPaymentConfirmation(
          notificationData.userEmail,
          notificationData.userPhone,
          notificationData.paymentDetails
        )
        break
      case 'subscription-reminder':
        result = await notificationService.sendSubscriptionReminder(
          notificationData.userEmail,
          notificationData.userPhone,
          notificationData.subscriptionDetails
        )
        break
      case 'tax-payment-reminder':
        result = await notificationService.sendTaxPaymentReminder(
          notificationData.userEmail,
          notificationData.userPhone,
          notificationData.taxDetails
        )
        break
      case 'bill-processing-update':
        result = await notificationService.sendBillProcessingUpdate(
          notificationData.userEmail,
          notificationData.userPhone,
          notificationData.billDetails
        )
        break
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid notification type' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      email: result.email,
      whatsapp: result.whatsapp,
    })
  } catch (error) {
    console.error('Notification error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
