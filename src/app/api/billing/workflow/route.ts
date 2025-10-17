import { NextRequest, NextResponse } from 'next/server'
import BillingWorkflowService, { BillingWorkflowRequest } from '@/lib/billing-workflow-service'

const billingService = new BillingWorkflowService()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, planId, action, paymentMethod, immediatePayment }: BillingWorkflowRequest = body

    // Validate required fields
    if (!userId || !planId || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate action
    const validActions = ['UPGRADE', 'DOWNGRADE', 'RENEW', 'CANCEL']
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      )
    }

    const result = await billingService.processBillingWorkflow({
      userId,
      planId,
      action,
      paymentMethod,
      immediatePayment,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Billing workflow error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const action = searchParams.get('action')

    if (action === 'plans') {
      const plans = billingService.getSubscriptionPlans()
      return NextResponse.json({ success: true, plans })
    }

    if (userId) {
      const subscription = await billingService.getUserSubscription(userId)
      return NextResponse.json({ success: true, subscription })
    }

    if (action === 'metrics') {
      const metrics = await billingService.getSubscriptionMetrics()
      return NextResponse.json({ success: true, metrics })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Billing GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}