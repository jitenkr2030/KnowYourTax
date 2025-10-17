"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  IndianRupee, 
  TrendingUp, 
  FileText, 
  Camera, 
  Calculator,
  Users,
  Building,
  ShoppingCart,
  Car,
  BookOpen,
  Star,
  CheckCircle,
  ArrowRight,
  Shield,
  BarChart3,
  Smartphone,
  Globe,
  Heart,
  Award,
  Zap,
  Target,
  Lightbulb,
  Rocket,
  Crown,
  Sparkles
} from "lucide-react"

const pricingPlans = [
  {
    name: "Free Plan",
    price: "₹0",
    period: "forever",
    description: "Perfect for individuals getting started with tax filing",
    features: [
      "1 ITR filing per year",
      "Basic tax calculations",
      "Form 16 import",
      "Standard deductions",
      "Email support",
      "Mobile app access",
      "Basic document storage (1GB)",
      "Compliance calendar"
    ],
    cta: "Get Started",
    popular: false,
    highlight: "Free Forever"
  },
  {
    name: "Personal Plan",
    price: "₹99/month",
    period: "or ₹999/year",
    description: "For individuals with multiple income sources and investments",
    features: [
      "Unlimited ITR filing",
      "Capital gains tracking",
      "Rental income management",
      "Business income support",
      "Advanced deduction optimizer",
      "TDS reconciliation",
      "Form 26AS integration",
      "Tax planning tools",
      "Priority email support",
      "Document storage (10GB)",
      "Export reports to PDF/Excel",
      "Multi-year data comparison"
    ],
    cta: "Start Personal Plan",
    popular: true,
    highlight: "Most Popular - Save 17%"
  },
  {
    name: "Business Plan",
    price: "₹2,999/month",
    period: "or ₹29,999/year",
    description: "Complete tax compliance solution for businesses and tax professionals",
    features: [
      "Everything in Personal Plan",
      "Multi-GSTIN management",
      "TDS compliance suite",
      "GST return filing (GSTR-1, 3B, 9)",
      "E-way bill generation",
      "Customs duty filing",
      "Tax audit support",
      "Transfer pricing documentation",
      "Multi-user access (5 users)",
      "Advanced analytics dashboard",
      "API access",
      "Priority phone support",
      "Dedicated account manager",
      "Document storage (100GB)",
      "Custom report builder",
      "Integration with accounting software",
      "White-label options"
    ],
    cta: "Start Business Plan",
    popular: false,
    highlight: "For Businesses - Save 17%"
  },
  {
    name: "Enterprise Plan",
    price: "₹9,999/month",
    period: "or ₹99,999/year",
    description: "For large corporations with complex tax requirements",
    features: [
      "Everything in Business Plan",
      "Unlimited users",
      "Advanced transfer pricing",
      "International tax compliance",
      "Cross-border tax optimization",
      "Custom workflow automation",
      "Advanced risk assessment",
      "Audit defense support",
      "Custom integrations",
      "On-premise deployment option",
      "24/7 dedicated support",
      "Custom SLA",
      "Training and onboarding",
      "Unlimited document storage",
      "Advanced security features",
      "Compliance consulting",
      "Custom development"
    ],
    cta: "Contact Sales",
    popular: false,
    highlight: "Enterprise Grade - Save 17%"
  }
]

const features = [
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Get detailed insights into your tax spending patterns with AI-powered analytics and beautiful visualizations."
  },
  {
    icon: Camera,
    title: "Bill Scanner",
    description: "Scan bills and receipts with our advanced OCR technology. Automatically extract and categorize tax information."
  },
  {
    icon: Calculator,
    title: "Tax Calculator",
    description: "Calculate your taxes accurately with the latest Indian tax laws and regulations for all tax types."
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Your data is encrypted and secure. We comply with all Indian data protection regulations."
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Access your tax information anywhere with our responsive web app and mobile applications."
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Available in English, Hindi, and other regional languages to serve every Indian."
  }
]

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Software Engineer",
    company: "Bangalore",
    content: "KnowYourTax.ai has completely transformed how I track my taxes. The AI insights helped me save ₹15,000 this year!",
    avatar: "👨‍💻"
  },
  {
    name: "Priya Sharma",
    role: "Small Business Owner",
    company: "Mumbai",
    content: "As a small business owner, managing GST was a nightmare. KnowYourTax.ai made it simple and saved me hours every month.",
    avatar: "👩‍💼"
  },
  {
    name: "Amit Patel",
    role: "Chartered Accountant",
    company: "Ahmedabad",
    content: "I recommend KnowYourTax.ai to all my clients. It's accurate, user-friendly, and provides comprehensive tax insights.",
    avatar: "👨‍💼"
  }
]

const stats = [
  { label: "Active Users", value: "50,000+", icon: Users },
  { label: "Tax Entries Tracked", value: "2M+", icon: FileText },
  { label: "Money Saved", value: "₹5Cr+", icon: IndianRupee },
  { label: "Cities Covered", value: "100+", icon: Building }
]

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleGetStarted = (plan: string) => {
    // Handle getting started with selected plan
    console.log(`Getting started with ${plan} plan`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">KnowYourTax.ai</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="/features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="/product" className="text-gray-700 hover:text-blue-600 transition-colors">Product</a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700">Login</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            <Sparkles className="w-4 h-4 mr-1" />
            Transforming Tax Management in India
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Know Exactly
            <span className="text-blue-600"> How Much Tax</span>
            <br />
            You Pay in India
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            KnowYourTax.ai is the intelligent tax management platform that helps every Indian understand, 
            track, and optimize their tax payments with AI-powered insights and analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3" asChild>
              <a href="/pricing">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3" asChild>
              <a href="/product">Watch Demo</a>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Master Your Taxes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to help Indians understand and optimize their tax payments
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How KnowYourTax.ai Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in minutes and start understanding your tax payments
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your free account in seconds. No credit card required.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Add Tax Entries</h3>
              <p className="text-gray-600">Manually add entries or scan bills with our AI-powered scanner.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Insights</h3>
              <p className="text-gray-600">Receive AI-powered insights and optimize your tax strategy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that works best for you. Upgrade or downgrade anytime.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-xl' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">
                      <Crown className="w-4 h-4 mr-1" />
                      {plan.highlight}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    onClick={() => handleGetStarted(plan.name)}
                  >
                    {plan.cta}
                  </Button>
                  
                  <div className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Indians Across the Country
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about KnowYourTax.ai
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Take Control of Your Taxes?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of Indians who are already using KnowYourTax.ai to understand and optimize their tax payments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="w-80 px-4 py-3 rounded-l-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className="absolute right-0 top-0 h-full px-6 rounded-l-none">
                Get Started
              </Button>
            </div>
            <p className="text-blue-100 text-sm">Free 14-day trial • No credit card required</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">KnowYourTax.ai</span>
              </div>
              <p className="text-gray-400">
                Empowering every Indian to understand and optimize their tax payments.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/features" className="hover:text-white">Features</a></li>
                <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="/security" className="hover:text-white">Security</a></li>
                <li><a href="/mobile-app" className="hover:text-white">Mobile App</a></li>
                <li><a href="/product" className="hover:text-white">Product Overview</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="/careers" className="hover:text-white">Careers</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
                <li><a href="/cookie" className="hover:text-white">Cookie Policy</a></li>
                <li><a href="/gdpr" className="hover:text-white">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KnowYourTax.ai. All rights reserved. Made with ❤️ for India.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}