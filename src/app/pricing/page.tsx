'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Shield, Users, TrendingUp, Crown, Briefcase } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
    currency: string;
  };
  popular?: boolean;
  features: string[];
  highlightedFeatures?: string[];
  cta: string;
  targetUser: string;
  icon: React.ReactNode;
  color: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Plan',
    description: 'Perfect for individuals getting started with tax filing',
    price: {
      monthly: 0,
      yearly: 0,
      currency: '₹'
    },
    features: [
      '1 ITR filing per year',
      'Basic tax calculations',
      'Form 16 import',
      'Standard deductions',
      'Email support',
      'Mobile app access',
      'Basic document storage (1GB)',
      'Compliance calendar'
    ],
    highlightedFeatures: [
      'No credit card required',
      'Perfect for salaried individuals'
    ],
    cta: 'Get Started Free',
    targetUser: 'Individuals',
    icon: <Star className="h-6 w-6" />,
    color: 'from-gray-500 to-gray-600'
  },
  {
    id: 'personal',
    name: 'Personal Plan',
    description: 'For individuals with multiple income sources and investments',
    price: {
      monthly: 99,
      yearly: 999,
      currency: '₹'
    },
    popular: true,
    features: [
      'Unlimited ITR filing',
      'Capital gains tracking',
      'Rental income management',
      'Business income support',
      'Advanced deduction optimizer',
      'TDS reconciliation',
      'Form 26AS integration',
      'Tax planning tools',
      'Priority email support',
      'Document storage (10GB)',
      'Export reports to PDF/Excel',
      'Multi-year data comparison'
    ],
    highlightedFeatures: [
      'Save 17% with yearly billing',
      'All individual tax needs covered'
    ],
    cta: 'Start Personal Plan',
    targetUser: 'Individuals & Professionals',
    icon: <Users className="h-6 w-6" />,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'business',
    name: 'Business Plan',
    description: 'Complete tax compliance solution for businesses and tax professionals',
    price: {
      monthly: 2999,
      yearly: 29999,
      currency: '₹'
    },
    features: [
      'Everything in Personal Plan',
      'Multi-GSTIN management',
      'TDS compliance suite',
      'GST return filing (GSTR-1, 3B, 9)',
      'E-way bill generation',
      'Customs duty filing',
      'Tax audit support',
      'Transfer pricing documentation',
      'Multi-user access (5 users)',
      'Advanced analytics dashboard',
      'API access',
      'Priority phone support',
      'Dedicated account manager',
      'Document storage (100GB)',
      'Custom report builder',
      'Integration with accounting software',
      'White-label options'
    ],
    highlightedFeatures: [
      'Save 17% with yearly billing',
      'Complete business tax compliance'
    ],
    cta: 'Start Business Plan',
    targetUser: 'Businesses & Tax Professionals',
    icon: <Briefcase className="h-6 w-6" />,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    description: 'For large corporations with complex tax requirements',
    price: {
      monthly: 9999,
      yearly: 99999,
      currency: '₹'
    },
    features: [
      'Everything in Business Plan',
      'Unlimited users',
      'Advanced transfer pricing',
      'International tax compliance',
      'Cross-border tax optimization',
      'Custom workflow automation',
      'Advanced risk assessment',
      'Audit defense support',
      'Custom integrations',
      'On-premise deployment option',
      '24/7 dedicated support',
      'Custom SLA',
      'Training and onboarding',
      'Unlimited document storage',
      'Advanced security features',
      'Compliance consulting',
      'Custom development'
    ],
    highlightedFeatures: [
      'Save 17% with yearly billing',
      'Enterprise-grade tax solution'
    ],
    cta: 'Contact Sales',
    targetUser: 'Large Corporations',
    icon: <Crown className="h-6 w-6" />,
    color: 'from-amber-500 to-amber-600'
  }
];

const comparisonFeatures = [
  {
    name: 'ITR Filing',
    free: '1 per year',
    personal: 'Unlimited',
    business: 'Unlimited',
    enterprise: 'Unlimited'
  },
  {
    name: 'GST Returns',
    free: 'Not included',
    personal: 'Not included',
    business: 'All forms',
    enterprise: 'All forms'
  },
  {
    name: 'TDS Management',
    free: 'Basic',
    personal: 'Advanced',
    business: 'Complete suite',
    enterprise: 'Complete suite'
  },
  {
    name: 'E-Way Bills',
    free: 'Not included',
    personal: 'Not included',
    business: 'Unlimited',
    enterprise: 'Unlimited'
  },
  {
    name: 'Document Storage',
    free: '1GB',
    personal: '10GB',
    business: '100GB',
    enterprise: 'Unlimited'
  },
  {
    name: 'Support',
    free: 'Email',
    personal: 'Priority Email',
    business: 'Priority Phone',
    enterprise: '24/7 Dedicated'
  },
  {
    name: 'Users',
    free: '1',
    personal: '1',
    business: '5',
    enterprise: 'Unlimited'
  },
  {
    name: 'API Access',
    free: '❌',
    personal: '❌',
    business: '✅',
    enterprise: '✅'
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlan, setSelectedPlan] = useState<string>('personal');

  const getPrice = (plan: PricingPlan) => {
    return billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly;
  };

  const getPeriod = () => {
    return billingCycle === 'yearly' ? '/year' : '/month';
  };

  const getSavings = (plan: PricingPlan) => {
    if (billingCycle === 'yearly' && plan.price.yearly > 0) {
      const monthlyTotal = plan.price.monthly * 12;
      const savings = monthlyTotal - plan.price.yearly;
      return Math.round((savings / monthlyTotal) * 100);
    }
    return 0;
  };

  const FeatureComparison = () => (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Compare All Plans</h2>
        <p className="text-muted-foreground">Detailed feature comparison across all pricing plans</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6">Feature</th>
              <th className="text-center py-4 px-6">Free</th>
              <th className="text-center py-4 px-6">Personal</th>
              <th className="text-center py-4 px-6">Business</th>
              <th className="text-center py-4 px-6">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((feature, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
                <td className="py-4 px-6 font-medium">{feature.name}</td>
                <td className="py-4 px-6 text-center">{feature.free}</td>
                <td className="py-4 px-6 text-center">{feature.personal}</td>
                <td className="py-4 px-6 text-center">{feature.business}</td>
                <td className="py-4 px-6 text-center">{feature.enterprise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const FAQSection = () => (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Everything you need to know about our pricing</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged a prorated amount for the remainder of your billing cycle.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">We accept all major credit cards, debit cards, UPI, net banking, and wire transfers for enterprise customers.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Is there a free trial?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Yes, we offer a 14-day free trial for our Personal and Business plans. No credit card required to start your trial.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Do you offer discounts?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Yes, we offer 17% discount on yearly billing. We also provide special discounts for startups, educational institutions, and non-profit organizations.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your tax compliance needs. From individual filing to enterprise solutions, we have you covered.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white dark:bg-slate-800 rounded-full p-1 shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'yearly' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                Save 17%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-4 mb-16">
          {pricingPlans.map((plan) => {
            const savings = getSavings(plan);
            const price = getPrice(plan);
            
            return (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden transition-all hover:shadow-xl ${
                  plan.popular ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${plan.color} text-white`}>
                      {plan.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <CardDescription className="text-sm">{plan.targetUser}</CardDescription>
                    </div>
                  </div>
                  
                  <div className="text-center py-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">{plan.currency}{price}</span>
                      <span className="text-muted-foreground">{getPeriod()}</span>
                    </div>
                    {savings > 0 && (
                      <p className="text-sm text-green-600 font-medium mt-1">
                        Save {savings}% with yearly billing
                      </p>
                    )}
                  </div>
                  
                  <p className="text-center text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' : ''}`}
                    size="lg"
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.cta}
                  </Button>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Features:</h4>
                    <ul className="space-y-2">
                      {plan.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.features.length > 4 && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="link" className="h-auto p-0 text-sm">
                              +{plan.features.length - 4} more features
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>{plan.name} - All Features</DialogTitle>
                              <DialogDescription>
                                Complete list of features included in {plan.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                              {plan.features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-2 text-sm">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </ul>
                  </div>
                  
                  {plan.highlightedFeatures && (
                    <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-3">
                      {plan.highlightedFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                          <Zap className="h-3 w-3" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="text-center mb-16">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <Shield className="h-8 w-8" />
            <TrendingUp className="h-8 w-8" />
            <Users className="h-8 w-8" />
            <div className="text-sm">30-Day Money Back Guarantee</div>
            <div className="text-sm">Secure Payment</div>
            <div className="text-sm">Cancel Anytime</div>
          </div>
        </div>

        <FeatureComparison />
        <FAQSection />
      </div>
    </div>
  );
}