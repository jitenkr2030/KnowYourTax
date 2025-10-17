import nodemailer from 'nodemailer'
import twilio from 'twilio'

export interface NotificationConfig {
  email: {
    host: string
    port: number
    secure: boolean
    auth: {
      user: string
      pass: string
    }
  }
  whatsapp: {
    accountSid: string
    authToken: string
    from: string
  }
}

export interface EmailNotification {
  to: string
  subject: string
  html: string
  text?: string
}

export interface WhatsAppNotification {
  to: string
  body: string
  mediaUrl?: string
}

export interface NotificationResponse {
  success: boolean
  messageId?: string
  error?: string
  type: 'email' | 'whatsapp'
}

class NotificationService {
  private emailTransporter: nodemailer.Transporter
  private whatsappClient: any = null

  constructor(config: NotificationConfig) {
    // Initialize Email Transporter
    try {
      this.emailTransporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: config.email.secure,
        auth: config.email.auth,
      })
    } catch (error) {
      console.warn('Email transporter initialization failed:', error)
      // Create a mock email transporter
      this.emailTransporter = nodemailer.createTransport({
        streamTransport: true,
        newline: 'unix',
        buffer: true,
      } as any)
    }

    // Initialize WhatsApp Client only if accountSid is valid
    try {
      if (config.whatsapp.accountSid && config.whatsapp.accountSid.startsWith('AC') && config.whatsapp.accountSid.length > 10) {
        this.whatsappClient = twilio(config.whatsapp.accountSid, config.whatsapp.authToken)
      } else {
        console.warn('Twilio accountSid is invalid or not provided - WhatsApp will use mock mode')
        this.whatsappClient = null
      }
    } catch (error) {
      console.warn('WhatsApp client initialization failed:', error)
      this.whatsappClient = null
    }
  }

  async sendEmail(notification: EmailNotification): Promise<NotificationResponse> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@taxmeter.in',
        to: notification.to,
        subject: notification.subject,
        html: notification.html,
        text: notification.text || this.stripHtml(notification.html),
      }

      const result = await this.emailTransporter.sendMail(mailOptions)

      return {
        success: true,
        messageId: result.messageId,
        type: 'email',
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        type: 'email',
      }
    }
  }

  async sendWhatsApp(notification: WhatsAppNotification): Promise<NotificationResponse> {
    try {
      // If WhatsApp client is not initialized, return mock response
      if (!this.whatsappClient) {
        return {
          success: true,
          messageId: `mock_whatsapp_${Date.now()}`,
          type: 'whatsapp',
        }
      }

      const messageOptions: any = {
        body: notification.body,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
        to: `whatsapp:${notification.to}`,
      }

      if (notification.mediaUrl) {
        messageOptions.mediaUrl = [notification.mediaUrl]
      }

      const message = await this.whatsappClient.messages.create(messageOptions)

      return {
        success: true,
        messageId: message.sid,
        type: 'whatsapp',
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        type: 'whatsapp',
      }
    }
  }

  async sendPaymentConfirmation(
    userEmail: string,
    userPhone: string,
    paymentDetails: {
      amount: number
      orderId: string
      paymentId: string
      taxType: string
      date: string
    }
  ): Promise<{ email: NotificationResponse; whatsapp: NotificationResponse }> {
    const emailSubject = 'Payment Confirmation - KnowYourTax.ai'
    const emailHtml = this.getPaymentConfirmationEmail(paymentDetails)
    const whatsappMessage = this.getPaymentConfirmationWhatsApp(paymentDetails)

    const [emailResponse, whatsappResponse] = await Promise.all([
      this.sendEmail({
        to: userEmail,
        subject: emailSubject,
        html: emailHtml,
      }),
      this.sendWhatsApp({
        to: userPhone,
        body: whatsappMessage,
      }),
    ])

    return { email: emailResponse, whatsapp: whatsappResponse }
  }

  async sendSubscriptionReminder(
    userEmail: string,
    userPhone: string,
    subscriptionDetails: {
      plan: string
      expiryDate: string
      daysLeft: number
    }
  ): Promise<{ email: NotificationResponse; whatsapp: NotificationResponse }> {
    const emailSubject = 'Subscription Reminder - KnowYourTax.ai'
    const emailHtml = this.getSubscriptionReminderEmail(subscriptionDetails)
    const whatsappMessage = this.getSubscriptionReminderWhatsApp(subscriptionDetails)

    const [emailResponse, whatsappResponse] = await Promise.all([
      this.sendEmail({
        to: userEmail,
        subject: emailSubject,
        html: emailHtml,
      }),
      this.sendWhatsApp({
        to: userPhone,
        body: whatsappMessage,
      }),
    ])

    return { email: emailResponse, whatsapp: whatsappResponse }
  }

  async sendTaxPaymentReminder(
    userEmail: string,
    userPhone: string,
    taxDetails: {
      taxType: string
      dueDate: string
      amount: number
    }
  ): Promise<{ email: NotificationResponse; whatsapp: NotificationResponse }> {
    const emailSubject = 'Tax Payment Reminder - KnowYourTax.ai'
    const emailHtml = this.getTaxPaymentReminderEmail(taxDetails)
    const whatsappMessage = this.getTaxPaymentReminderWhatsApp(taxDetails)

    const [emailResponse, whatsappResponse] = await Promise.all([
      this.sendEmail({
        to: userEmail,
        subject: emailSubject,
        html: emailHtml,
      }),
      this.sendWhatsApp({
        to: userPhone,
        body: whatsappMessage,
      }),
    ])

    return { email: emailResponse, whatsapp: whatsappResponse }
  }

  async sendPaymentFailure(
    userEmail: string,
    userPhone: string,
    paymentDetails: {
      amount: number
      orderId: string
      paymentId: string
      reason: string
      date: string
    }
  ): Promise<{ email: NotificationResponse; whatsapp: NotificationResponse }> {
    const emailSubject = 'Payment Failed - KnowYourTax.ai'
    const emailHtml = this.getPaymentFailureEmail(paymentDetails)
    const whatsappMessage = this.getPaymentFailureWhatsApp(paymentDetails)

    const [emailResponse, whatsappResponse] = await Promise.all([
      this.sendEmail({
        to: userEmail,
        subject: emailSubject,
        html: emailHtml,
      }),
      this.sendWhatsApp({
        to: userPhone,
        body: whatsappMessage,
      }),
    ])

    return { email: emailResponse, whatsapp: whatsappResponse }
  }

  async sendBillProcessingUpdate(
    userEmail: string,
    userPhone: string,
    billDetails: {
      fileName: string
      status: string
      confidence: number
    }
  ): Promise<{ email: NotificationResponse; whatsapp: NotificationResponse }> {
    const emailSubject = 'Bill Processing Update - KnowYourTax.ai'
    const emailHtml = this.getBillProcessingUpdateEmail(billDetails)
    const whatsappMessage = this.getBillProcessingUpdateWhatsApp(billDetails)

    const [emailResponse, whatsappResponse] = await Promise.all([
      this.sendEmail({
        to: userEmail,
        subject: emailSubject,
        html: emailHtml,
      }),
      this.sendWhatsApp({
        to: userPhone,
        body: whatsappMessage,
      }),
    ])

    return { email: emailResponse, whatsapp: whatsappResponse }
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '')
  }

  private getPaymentConfirmationEmail(paymentDetails: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Payment Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 8px; }
          .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Confirmation</h1>
          </div>
          <div class="content">
            <h2>Thank you for your payment!</h2>
            <p>Your tax payment has been successfully processed.</p>
            <div class="details">
              <h3>Payment Details</h3>
              <p><strong>Order ID:</strong> \${paymentDetails.orderId}</p>
              <p><strong>Payment ID:</strong> \${paymentDetails.paymentId}</p>
              <p><strong>Tax Type:</strong> \${paymentDetails.taxType}</p>
              <p><strong>Amount:</strong> ₹\${paymentDetails.amount.toLocaleString()}</p>
              <p><strong>Date:</strong> \${new Date(paymentDetails.date).toLocaleDateString()}</p>
            </div>
            <p>You can view this payment in your KnowYourTax.ai dashboard.</p>
          </div>
          <div class="footer">
            <p>© 2024 KnowYourTax.ai. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private getPaymentConfirmationWhatsApp(paymentDetails: any): string {
    return `✅ Payment Confirmed!\n\nOrder ID: ${paymentDetails.orderId}\nPayment ID: ${paymentDetails.paymentId}\nTax Type: ${paymentDetails.taxType}\nAmount: ₹${paymentDetails.amount.toLocaleString()}\nDate: ${new Date(paymentDetails.date).toLocaleDateString()}\n\nThank you for using KnowYourTax.ai!`
  }

  private getSubscriptionReminderEmail(subscriptionDetails: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Subscription Reminder</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f59e0b; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 8px; }
          .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Subscription Reminder</h1>
          </div>
          <div class="content">
            <h2>Your subscription is expiring soon!</h2>
            <p>Your \${subscriptionDetails.plan} plan will expire in \${subscriptionDetails.daysLeft} days.</p>
            <div class="details">
              <h3>Subscription Details</h3>
              <p><strong>Current Plan:</strong> \${subscriptionDetails.plan}</p>
              <p><strong>Expiry Date:</strong> \${new Date(subscriptionDetails.expiryDate).toLocaleDateString()}</p>
              <p><strong>Days Remaining:</strong> \${subscriptionDetails.daysLeft}</p>
            </div>
            <p>Renew your subscription to continue enjoying uninterrupted access to KnowYourTax.ai features.</p>
          </div>
          <div class="footer">
            <p>© 2024 KnowYourTax.ai. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private getSubscriptionReminderWhatsApp(subscriptionDetails: any): string {
    return `⚠️ Subscription Reminder\n\nYour ${subscriptionDetails.plan} plan expires in ${subscriptionDetails.daysLeft} days.\nExpiry Date: ${new Date(subscriptionDetails.expiryDate).toLocaleDateString()}\n\nRenew now to continue using KnowYourTax.ai!`
  }

  private getTaxPaymentReminderEmail(taxDetails: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Tax Payment Reminder</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ef4444; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 8px; }
          .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Tax Payment Reminder</h1>
          </div>
          <div class="content">
            <h2>Don't forget your tax payment!</h2>
            <p>You have a tax payment due soon.</p>
            <div class="details">
              <h3>Tax Details</h3>
              <p><strong>Tax Type:</strong> \${taxDetails.taxType}</p>
              <p><strong>Due Date:</strong> \${new Date(taxDetails.dueDate).toLocaleDateString()}</p>
              <p><strong>Amount:</strong> ₹\${taxDetails.amount.toLocaleString()}</p>
            </div>
            <p>Log in to KnowYourTax.ai to record your payment and stay compliant.</p>
          </div>
          <div class="footer">
            <p>© 2024 KnowYourTax.ai. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private getTaxPaymentReminderWhatsApp(taxDetails: any): string {
    return `📅 Tax Payment Reminder\n\nTax Type: ${taxDetails.taxType}\nDue Date: ${new Date(taxDetails.dueDate).toLocaleDateString()}\nAmount: ₹${taxDetails.amount.toLocaleString()}\n\nDon't forget to make your payment!`
  }

  private getPaymentFailureEmail(paymentDetails: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Payment Failed</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ef4444; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 8px; }
          .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Failed</h1>
          </div>
          <div class="content">
            <h2>We couldn't process your payment</h2>
            <p>There was an issue processing your tax payment. Please try again or contact support.</p>
            <div class="details">
              <h3>Payment Details</h3>
              <p><strong>Order ID:</strong> ${paymentDetails.orderId}</p>
              <p><strong>Payment ID:</strong> ${paymentDetails.paymentId}</p>
              <p><strong>Amount:</strong> ₹${paymentDetails.amount.toLocaleString()}</p>
              <p><strong>Reason:</strong> ${paymentDetails.reason}</p>
              <p><strong>Date:</strong> ${new Date(paymentDetails.date).toLocaleDateString()}</p>
            </div>
            <p>If the problem persists, please contact our support team at support@knowyourtax.ai</p>
          </div>
          <div class="footer">
            <p>© 2024 KnowYourTax.ai. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private getPaymentFailureWhatsApp(paymentDetails: any): string {
    return `❌ Payment Failed\n\nOrder ID: ${paymentDetails.orderId}\nPayment ID: ${paymentDetails.paymentId}\nAmount: ₹${paymentDetails.amount.toLocaleString()}\nReason: ${paymentDetails.reason}\nDate: ${new Date(paymentDetails.date).toLocaleDateString()}\n\nPlease try again or contact support.`
  }

  private getBillProcessingUpdateEmail(billDetails: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Bill Processing Update</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #3b82f6; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 8px; }
          .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Bill Processing Update</h1>
          </div>
          <div class="content">
            <h2>Your bill has been processed!</h2>
            <p>We've completed processing your uploaded bill.</p>
            <div class="details">
              <h3>Processing Details</h3>
              <p><strong>File Name:</strong> \${billDetails.fileName}</p>
              <p><strong>Status:</strong> \${billDetails.status}</p>
              <p><strong>Confidence:</strong> \${(billDetails.confidence * 100).toFixed(1)}%</p>
            </div>
            <p>Log in to KnowYourTax.ai to review and confirm the processed bill.</p>
          </div>
          <div class="footer">
            <p>© 2024 KnowYourTax.ai. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private getBillProcessingUpdateWhatsApp(billDetails: any): string {
    return `📄 Bill Processing Update\n\nFile: ${billDetails.fileName}\nStatus: ${billDetails.status}\nConfidence: ${(billDetails.confidence * 100).toFixed(1)}%\n\nReview your processed bill in KnowYourTax.ai!`
  }
}

export default NotificationService
