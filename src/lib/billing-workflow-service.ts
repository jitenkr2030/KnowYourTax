import { db } from '@/lib/db'
import PaymentService from './payment-service'
import NotificationService from './notification-service'

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: 'MONTHLY' | 'YEARLY'
  features: string[]
  maxUsers: number
  maxStorage: number
  maxApiCalls: number
}

export interface BillingWorkflowRequest {
  userId: string
  planId: string
  action: 'UPGRADE' | 'DOWNGRADE' | 'RENEW' | 'CANCEL'
  paymentMethod?: string
  immediatePayment?: boolean
}

export interface BillingWorkflowResponse {
  success: boolean
  subscription?: any
  payment?: any
  invoice?: any
  error?: string
  nextAction?: string
}

class BillingWorkflowService {
  private paymentService: PaymentService
  private notificationService: NotificationService

  constructor() {
    // Initialize payment service with fallback to mock mode
    try {
      this.paymentService = new PaymentService({
        razorpay: {
          keyId: process.env.RAZORPAY_KEY_ID || 'mock_key_id',
          keySecret: process.env.RAZORPAY_KEY_SECRET || 'mock_key_secret',
        },
        cashfree: {
          appId: process.env.CASHFREE_APP_ID || 'mock_app_id',
          secretKey: process.env.CASHFREE_SECRET_KEY || 'mock_secret_key',
          environment: (process.env.CASHFREE_ENVIRONMENT as 'TEST' | 'PRODUCTION') || 'TEST',
        },
      })
    } catch (error) {
      console.warn('Payment service initialization failed:', error)
      // Create a minimal mock payment service
      this.paymentService = new PaymentService({
        razorpay: {
          keyId: 'mock_key_id',
          keySecret: 'mock_key_secret',
        },
        cashfree: {
          appId: 'mock_app_id',
          secretKey: 'mock_secret_key',
          environment: 'TEST',
        },
      })
    }

    this.notificationService = new NotificationService({
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
  }

  // Subscription plans configuration
  private subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'FREE',
      name: 'Free Plan',
      price: 0,
      currency: 'INR',
      interval: 'MONTHLY',
      features: ['1 ITR filing per year', 'Basic tax calculations', 'Email support'],
      maxUsers: 1,
      maxStorage: 1000, // 1GB
      maxApiCalls: 1000,
    },
    {
      id: 'PERSONAL',
      name: 'Personal Plan',
      price: 99,
      currency: 'INR',
      interval: 'MONTHLY',
      features: ['Unlimited ITR filing', 'Advanced analytics', 'Priority support'],
      maxUsers: 1,
      maxStorage: 10000, // 10GB
      maxApiCalls: 10000,
    },
    {
      id: 'BUSINESS',
      name: 'Business Plan',
      price: 2999,
      currency: 'INR',
      interval: 'MONTHLY',
      features: ['Multi-user access', 'GST compliance', 'API access'],
      maxUsers: 5,
      maxStorage: 100000, // 100GB
      maxApiCalls: 100000,
    },
    {
      id: 'ENTERPRISE',
      name: 'Enterprise Plan',
      price: 9999,
      currency: 'INR',
      interval: 'MONTHLY',
      features: ['Unlimited users', 'Custom integrations', 'Dedicated support'],
      maxUsers: -1, // Unlimited
      maxStorage: -1, // Unlimited
      maxApiCalls: -1, // Unlimited
    },
  ]

  async processBillingWorkflow(request: BillingWorkflowRequest): Promise<BillingWorkflowResponse> {
    try {
      const user = await db.user.findUnique({
        where: { id: request.userId },
        include: { account: true },
      })

      if (!user || !user.account) {
        return {
          success: false,
          error: 'User or account not found',
        }
      }

      const currentPlan = this.subscriptionPlans.find(p => p.id === user.account!.subscriptionPlan)
      const targetPlan = this.subscriptionPlans.find(p => p.id === request.planId)

      if (!targetPlan) {
        return {
          success: false,
          error: 'Target plan not found',
        }
      }

      switch (request.action) {
        case 'UPGRADE':
          return this.handleUpgrade(user, currentPlan, targetPlan, request)
        case 'DOWNGRADE':
          return this.handleDowngrade(user, currentPlan, targetPlan, request)
        case 'RENEW':
          return this.handleRenewal(user, currentPlan, request)
        case 'CANCEL':
          return this.handleCancellation(user, currentPlan, request)
        default:
          return {
            success: false,
            error: 'Invalid billing action',
          }
      }
    } catch (error) {
      console.error('Billing workflow error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private async handleUpgrade(
    user: any,
    currentPlan: SubscriptionPlan | undefined,
    targetPlan: SubscriptionPlan,
    request: BillingWorkflowRequest
  ): Promise<BillingWorkflowResponse> {
    try {
      // Calculate prorated amount
      const proratedAmount = this.calculateProratedAmount(currentPlan, targetPlan, user.account)

      // Create payment record
      const payment = await db.payment.create({
        data: {
          accountId: user.account.id,
          amount: proratedAmount,
          currency: targetPlan.currency,
          status: 'PENDING',
          gateway: 'RAZORPAY',
          description: `Upgrade from ${currentPlan?.name || 'Free'} to ${targetPlan.name}`,
        },
      })

      // Create Razorpay order
      const orderResult = await this.paymentService.createOrder({
        amount: proratedAmount,
        currency: targetPlan.currency,
        receipt: `upgrade_${payment.id}`,
        notes: {
          userId: user.id,
          planId: targetPlan.id,
          action: 'UPGRADE',
        },
      })

      if (!orderResult.success) {
        return {
          success: false,
          error: orderResult.error,
        }
      }

      // Update payment with gateway ID
      await db.payment.update({
        where: { id: payment.id },
        data: { gatewayId: orderResult.orderId },
      })

      return {
        success: true,
        payment: {
          id: payment.id,
          amount: proratedAmount,
          gatewayId: orderResult.orderId,
        },
        nextAction: 'COMPLETE_PAYMENT',
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upgrade failed',
      }
    }
  }

  private async handleDowngrade(
    user: any,
    currentPlan: SubscriptionPlan | undefined,
    targetPlan: SubscriptionPlan,
    request: BillingWorkflowRequest
  ): Promise<BillingWorkflowResponse> {
    try {
      // For downgrades, schedule for next billing cycle
      const currentPeriodEnd = user.account.subscriptionEndsAt || new Date()
      
      await db.account.update({
        where: { id: user.account.id },
        data: {
          subscriptionPlan: targetPlan.id,
          subscriptionEndsAt: currentPeriodEnd, // Keep current period
          maxUsers: targetPlan.maxUsers,
          maxStorage: targetPlan.maxStorage,
          maxApiCalls: targetPlan.maxApiCalls,
        },
      })

      // Send notification about scheduled downgrade
      await this.notificationService.sendSubscriptionReminder(
        user.email,
        user.phone || '+919876543210',
        {
          plan: targetPlan.name,
          expiryDate: currentPeriodEnd.toISOString(),
          daysLeft: Math.ceil((currentPeriodEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
        }
      )

      return {
        success: true,
        nextAction: 'DOWNGRADE_SCHEDULED',
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Downgrade failed',
      }
    }
  }

  private async handleRenewal(
    user: any,
    currentPlan: SubscriptionPlan | undefined,
    request: BillingWorkflowRequest
  ): Promise<BillingWorkflowResponse> {
    try {
      if (!currentPlan || currentPlan.price === 0) {
        return {
          success: false,
          error: 'Free plan cannot be renewed',
        }
      }

      // Create payment for renewal
      const payment = await db.payment.create({
        data: {
          accountId: user.account.id,
          amount: currentPlan.price,
          currency: currentPlan.currency,
          status: 'PENDING',
          gateway: 'RAZORPAY',
          description: `Renewal of ${currentPlan.name}`,
        },
      })

      // Create Razorpay order
      const orderResult = await this.paymentService.createOrder({
        amount: currentPlan.price,
        currency: currentPlan.currency,
        receipt: `renewal_${payment.id}`,
        notes: {
          userId: user.id,
          planId: currentPlan.id,
          action: 'RENEW',
        },
      })

      if (!orderResult.success) {
        return {
          success: false,
          error: orderResult.error,
        }
      }

      // Update payment with gateway ID
      await db.payment.update({
        where: { id: payment.id },
        data: { gatewayId: orderResult.orderId },
      })

      return {
        success: true,
        payment: {
          id: payment.id,
          amount: currentPlan.price,
          gatewayId: orderResult.orderId,
        },
        nextAction: 'COMPLETE_PAYMENT',
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Renewal failed',
      }
    }
  }

  private async handleCancellation(
    user: any,
    currentPlan: SubscriptionPlan | undefined,
    request: BillingWorkflowRequest
  ): Promise<BillingWorkflowResponse> {
    try {
      // Update account to cancel at period end
      await db.account.update({
        where: { id: user.account.id },
        data: {
          cancelAtPeriodEnd: true,
        },
      })

      // Send cancellation confirmation
      await this.notificationService.sendSubscriptionReminder(
        user.email,
        user.phone || '+919876543210',
        {
          plan: currentPlan?.name || 'Current Plan',
          expiryDate: (user.account.subscriptionEndsAt || new Date()).toISOString(),
          daysLeft: Math.ceil(((user.account.subscriptionEndsAt || new Date()).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
        }
      )

      return {
        success: true,
        nextAction: 'CANCELLATION_SCHEDULED',
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Cancellation failed',
      }
    }
  }

  private calculateProratedAmount(
    currentPlan: SubscriptionPlan | undefined,
    targetPlan: SubscriptionPlan,
    account: any
  ): number {
    if (!currentPlan || currentPlan.price === 0) {
      return targetPlan.price
    }

    const currentPeriodEnd = account.subscriptionEndsAt || new Date()
    const daysRemaining = Math.ceil((currentPeriodEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    const daysInMonth = 30

    // Simple proration calculation
    const proratedCurrent = (currentPlan.price * daysRemaining) / daysInMonth
    const proratedTarget = (targetPlan.price * daysRemaining) / daysInMonth

    return Math.max(0, proratedTarget - proratedCurrent)
  }

  async completeSubscriptionPayment(paymentId: string, gatewayResponse: any): Promise<BillingWorkflowResponse> {
    try {
      const payment = await db.payment.findUnique({
        where: { id: paymentId },
        include: { account: { include: { user: true } } },
      })

      if (!payment) {
        return {
          success: false,
          error: 'Payment not found',
        }
      }

      // Update payment status
      await db.payment.update({
        where: { id: paymentId },
        data: {
          status: 'SUCCESS',
          paidAt: new Date(),
          gatewayResponse: JSON.stringify(gatewayResponse),
        },
      })

      // Update account subscription
      const planId = JSON.parse(gatewayResponse).notes?.planId || payment.account.subscriptionPlan
      const targetPlan = this.subscriptionPlans.find(p => p.id === planId)

      if (targetPlan) {
        await db.account.update({
          where: { id: payment.account.id },
          data: {
            subscriptionPlan: targetPlan.id,
            subscriptionStatus: 'ACTIVE',
            subscriptionEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            maxUsers: targetPlan.maxUsers,
            maxStorage: targetPlan.maxStorage,
            maxApiCalls: targetPlan.maxApiCalls,
            cancelAtPeriodEnd: false,
          },
        })

        // Send confirmation
        await this.notificationService.sendPaymentConfirmation(
          payment.account.user.email,
          payment.account.user.phone || '+919876543210',
          {
            amount: payment.amount,
            orderId: gatewayResponse.order_id,
            paymentId: gatewayResponse.payment_id,
            taxType: 'Subscription Payment',
            date: new Date().toISOString(),
          }
        )
      }

      return {
        success: true,
        nextAction: 'SUBSCRIPTION_UPDATED',
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment completion failed',
      }
    }
  }

  getSubscriptionPlans(): SubscriptionPlan[] {
    return this.subscriptionPlans
  }

  async getUserSubscription(userId: string) {
    return await db.user.findUnique({
      where: { id: userId },
      include: {
        account: {
          include: {
            subscriptions: {
              orderBy: { createdAt: 'desc' },
              take: 1,
            },
            payments: {
              orderBy: { createdAt: 'desc' },
              take: 5,
            },
          },
        },
      },
    })
  }

  async getSubscriptionMetrics() {
    const [totalAccounts, activeSubscriptions, monthlyRevenue, churnRate] = await Promise.all([
      db.account.count(),
      db.account.count({ where: { subscriptionStatus: 'ACTIVE' } }),
      db.payment.aggregate({
        where: {
          status: 'SUCCESS',
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          },
        },
        _sum: { amount: true },
      }),
      // Simple churn calculation
      db.account.count({
        where: {
          subscriptionStatus: 'CANCELLED',
          updatedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ])

    return {
      totalAccounts,
      activeSubscriptions,
      monthlyRevenue: monthlyRevenue._sum.amount || 0,
      churnRate: churnRate / totalAccounts,
    }
  }
}

export default BillingWorkflowService