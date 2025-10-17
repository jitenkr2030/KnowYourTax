"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  IndianRupee,
  TrendingUp
} from "lucide-react"

interface PaymentMethod {
  id: string
  name: string
  icon: any
  description: string
  provider: 'razorpay' | 'cashfree'
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'razorpay',
    name: 'RazorPay',
    icon: CreditCard,
    description: 'Pay with credit/debit cards, UPI, net banking, and wallets',
    provider: 'razorpay'
  },
  {
    id: 'cashfree',
    name: 'Cashfree',
    icon: Building,
    description: 'Pay with all major payment methods including UPI and cards',
    provider: 'cashfree'
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: Smartphone,
    description: 'Pay directly from your bank account using UPI',
    provider: 'razorpay'
  }
]

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 999,
    duration: 'month',
    features: [
      'Up to 50 tax payments',
      'Basic bill scanning',
      'Email support',
      'Monthly reports'
    ],
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional Plan',
    price: 1999,
    duration: 'month',
    features: [
      'Up to 200 tax payments',
      'Advanced bill scanning',
      'Priority support',
      'Weekly reports',
      'Tax calculations'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 4999,
    duration: 'month',
    features: [
      'Unlimited tax payments',
      'AI-powered bill scanning',
      '24/7 dedicated support',
      'Daily reports',
      'Advanced analytics',
      'API access'
    ],
    popular: false
  }
]

interface PaymentFormData {
  amount: number
  provider: 'razorpay' | 'cashfree'
  plan: string
  email: string
  phone: string
}

export default function PaymentProcessor() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(paymentMethods[0])
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[1])
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: selectedPlan.price,
    provider: selectedMethod.provider,
    plan: selectedPlan.id,
    email: '',
    phone: ''
  })

  const handlePayment = async () => {
    setIsProcessing(true)
    setPaymentStatus('processing')

    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: formData.amount,
          currency: 'INR',
          customerId: 'user_' + Date.now(),
          customerEmail: formData.email,
          customerPhone: formData.phone,
          description: selectedPlan.name + ' Subscription',
          provider: formData.provider
        })
      })

      const result = await response.json()

      if (result.success) {
        // Initialize payment gateway
        if (formData.provider === 'razorpay') {
          const Razorpay = (window as any).Razorpay
          const razorpay = new Razorpay({
            key_id: result.keyId,
            key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
            amount: formData.amount * 100,
            currency: 'INR',
            name: 'KnowYourTax.ai',
            description: selectedPlan.name + ' Subscription',
            order_id: result.orderId,
            handler: function (response: any) {
              // Verify payment
              verifyPayment(response, formData.provider)
            },
            prefill: {
              email: formData.email,
              contact: formData.phone
            },
            theme: {
              color: '#4f46e5'
            }
          })
          razorpay.open()
        } else {
          // Handle Cashfree payment
          console.log('Cashfree payment:', result)
          setPaymentStatus('success')
        }
      } else {
        setPaymentStatus('error')
      }
    } catch (error) {
      console.error('Payment error:', error)
      setPaymentStatus('error')
    } finally {
      setIsProcessing(false)
    }
  }

  const verifyPayment = async (paymentData: any, provider: 'razorpay' | 'cashfree') => {
    try {
      const response = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentData,
          provider
        })
      })

      const result = await response.json()

      if (result.success) {
        setPaymentStatus('success')
        // Send notification
        sendNotification('payment-confirmation', {
          userEmail: formData.email,
          userPhone: formData.phone,
          paymentDetails: {
            amount: formData.amount,
            orderId: paymentData.orderId,
            paymentId: paymentData.paymentId,
            taxType: 'Subscription',
            date: new Date().toISOString()
          }
        })
      } else {
        setPaymentStatus('error')
      }
    } catch (error) {
      console.error('Payment verification error:', error)
      setPaymentStatus('error')
    }
  }

  const sendNotification = async (type: string, data: any) => {
    try {
      await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          ...data
        })
      })
    } catch (error) {
      console.error('Notification error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Payment Processing</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Choose your subscription plan and payment method
        </p>
      </div>

      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="payment">Payment Method</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`cursor-pointer transition-all ${selectedPlan.id === plan.id ? 'ring-2 ring-blue-500' : ''} ${plan.popular ? 'border-blue-500' : ''}`}
                onClick={() => {
                  setSelectedPlan(plan)
                  setFormData(prev => ({ ...prev, amount: plan.price, plan: plan.id }))
                }}
              >
                <CardHeader className="text-center">
                  {plan.popular && (
                    <Badge className="w-fit mx-auto bg-blue-100 text-blue-800">
                      Most Popular
                    </Badge>
                  )}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="space-y-1">
                    <span className="text-3xl font-bold">₹{plan.price}</span>
                    <span className="text-gray-600">/{plan.duration}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={selectedPlan.id === plan.id ? "default" : "outline"}
                  >
                    {selectedPlan.id === plan.id ? 'Selected' : 'Choose Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedMethod.id === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => {
                      setSelectedMethod(method)
                      setFormData(prev => ({ ...prev, provider: method.provider }))
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <method.icon className="h-6 w-6 text-blue-600" />
                      <div className="flex-1">
                        <h3 className="font-medium">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      {selectedMethod.id === method.id && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Complete your payment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Amount</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold">₹{formData.amount}</span>
                      <p className="text-sm text-gray-600">{selectedPlan.name}</p>
                    </div>
                  </div>
                </div>

                {paymentStatus === 'processing' && (
                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      Processing your payment...
                    </AlertDescription>
                  </Alert>
                )}

                {paymentStatus === 'success' && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Payment successful! You will receive a confirmation email shortly.
                    </AlertDescription>
                  </Alert>
                )}

                {paymentStatus === 'error' && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      Payment failed. Please try again.
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={handlePayment}
                  disabled={isProcessing || !formData.email || !formData.phone}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <IndianRupee className="h-4 w-4 mr-2" />
                      Pay ₹{formData.amount}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
