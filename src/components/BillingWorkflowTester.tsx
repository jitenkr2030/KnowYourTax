'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Crown, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  X, 
  CheckCircle,
  AlertCircle,
  CreditCard
} from 'lucide-react'

interface SubscriptionPlan {
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

interface BillingWorkflowResponse {
  success: boolean
  subscription?: any
  payment?: any
  invoice?: any
  error?: string
  nextAction?: string
}

export default function BillingWorkflowTester() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [currentSubscription, setCurrentSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BillingWorkflowResponse | null>(null)
  const [metrics, setMetrics] = useState<any>(null)

  // Mock user ID for testing
  const testUserId = 'user123'

  useEffect(() => {
    fetchPlans()
    fetchSubscription()
    fetchMetrics()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/billing/workflow?action=plans')
      const data = await response.json()
      if (data.success) {
        setPlans(data.plans)
      }
    } catch (error) {
      console.error('Error fetching plans:', error)
    }
  }

  const fetchSubscription = async () => {
    try {
      const response = await fetch(`/api/billing/workflow?userId=${testUserId}`)
      const data = await response.json()
      if (data.success) {
        setCurrentSubscription(data.subscription)
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
    }
  }

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/billing/workflow?action=metrics')
      const data = await response.json()
      if (data.success) {
        setMetrics(data.metrics)
      }
    } catch (error) {
      console.error('Error fetching metrics:', error)
    }
  }

  const handleBillingAction = async (planId: string, action: 'UPGRADE' | 'DOWNGRADE' | 'RENEW' | 'CANCEL') => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/billing/workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: testUserId,
          planId,
          action,
        }),
      })

      const data: BillingWorkflowResponse = await response.json()
      setResult(data)

      if (data.success) {
        // Refresh subscription data
        setTimeout(() => {
          fetchSubscription()
          fetchMetrics()
        }, 1000)
      }
    } catch (error) {
      console.error('Error in billing action:', error)
      setResult({
        success: false,
        error: 'Network error occurred',
      })
    } finally {
      setLoading(false)
    }
  }

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'FREE':
        return <AlertCircle className="h-5 w-5" />
      case 'PERSONAL':
        return <TrendingUp className="h-5 w-5" />
      case 'BUSINESS':
        return <Crown className="h-5 w-5" />
      case 'ENTERPRISE':
        return <Crown className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'FREE':
        return 'bg-gray-100 text-gray-800'
      case 'PERSONAL':
        return 'bg-blue-100 text-blue-800'
      case 'BUSINESS':
        return 'bg-purple-100 text-purple-800'
      case 'ENTERPRISE':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Billing Workflow Tester</h1>
        <p className="text-gray-600">Test subscription upgrades, downgrades, renewals, and cancellations</p>
      </div>

      {/* Current Subscription Status */}
      {currentSubscription && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Plan</p>
                <Badge className={getPlanColor(currentSubscription.account?.subscriptionPlan)}>
                  {currentSubscription.account?.subscriptionPlan}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge variant={currentSubscription.account?.subscriptionStatus === 'ACTIVE' ? 'default' : 'secondary'}>
                  {currentSubscription.account?.subscriptionStatus}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expires</p>
                <p className="text-sm">
                  {currentSubscription.account?.subscriptionEndsAt 
                    ? new Date(currentSubscription.account.subscriptionEndsAt).toLocaleDateString()
                    : 'N/A'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Metrics */}
      {metrics && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Subscription Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{metrics.totalAccounts}</div>
                <div className="text-sm text-gray-600">Total Accounts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{metrics.activeSubscriptions}</div>
                <div className="text-sm text-gray-600">Active Subscriptions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">₹{metrics.monthlyRevenue.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Monthly Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{(metrics.churnRate * 100).toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Churn Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result Alert */}
      {result && (
        <Alert className={`mb-8 ${result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          <div className="flex items-center gap-2">
            {result.success ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription>
              {result.success 
                ? `Success! ${result.nextAction || 'Action completed'}` 
                : result.error || 'Action failed'
              }
            </AlertDescription>
          </div>
        </Alert>
      )}

      <Tabs defaultValue="upgrade" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upgrade">Upgrade</TabsTrigger>
          <TabsTrigger value="downgrade">Downgrade</TabsTrigger>
          <TabsTrigger value="renew">Renew</TabsTrigger>
          <TabsTrigger value="cancel">Cancel</TabsTrigger>
        </TabsList>

        <TabsContent value="upgrade" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans
              .filter(plan => {
                const currentPlan = currentSubscription?.account?.subscriptionPlan
                if (!currentPlan) return true
                const planOrder = ['FREE', 'PERSONAL', 'BUSINESS', 'ENTERPRISE']
                const currentIndex = planOrder.indexOf(currentPlan)
                const planIndex = planOrder.indexOf(plan.id)
                return planIndex > currentIndex
              })
              .map((plan) => (
                <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      {getPlanIcon(plan.id)}
                      <Badge className={getPlanColor(plan.id)}>
                        {plan.name}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">
                      ₹{plan.price}
                      <span className="text-sm font-normal text-gray-600">/{plan.interval.toLowerCase()}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      onClick={() => handleBillingAction(plan.id, 'UPGRADE')}
                      disabled={loading}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="downgrade" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans
              .filter(plan => {
                const currentPlan = currentSubscription?.account?.subscriptionPlan
                if (!currentPlan) return false
                const planOrder = ['FREE', 'PERSONAL', 'BUSINESS', 'ENTERPRISE']
                const currentIndex = planOrder.indexOf(currentPlan)
                const planIndex = planOrder.indexOf(plan.id)
                return planIndex < currentIndex
              })
              .map((plan) => (
                <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      {getPlanIcon(plan.id)}
                      <Badge className={getPlanColor(plan.id)}>
                        {plan.name}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">
                      ₹{plan.price}
                      <span className="text-sm font-normal text-gray-600">/{plan.interval.toLowerCase()}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleBillingAction(plan.id, 'DOWNGRADE')}
                      disabled={loading}
                    >
                      <TrendingDown className="h-4 w-4 mr-2" />
                      Downgrade
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="renew" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Renew Current Subscription
              </CardTitle>
              <CardDescription>
                Renew your current subscription plan for another billing cycle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">
                    {currentSubscription?.account?.subscriptionPlan} Plan
                  </p>
                  <p className="text-gray-600">
                    Renewal amount will be calculated based on your current plan
                  </p>
                </div>
                <Button 
                  onClick={() => handleBillingAction(
                    currentSubscription?.account?.subscriptionPlan || 'FREE', 
                    'RENEW'
                  )}
                  disabled={loading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Renew Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancel" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <X className="h-5 w-5" />
                Cancel Subscription
              </CardTitle>
              <CardDescription>
                Cancel your subscription. You'll continue to have access until the end of your current billing period.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This will schedule your subscription for cancellation at the end of the current billing period. 
                    You can reactivate anytime before then.
                  </AlertDescription>
                </Alert>
                <Button 
                  variant="destructive"
                  onClick={() => handleBillingAction(
                    currentSubscription?.account?.subscriptionPlan || 'FREE', 
                    'CANCEL'
                  )}
                  disabled={loading}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}