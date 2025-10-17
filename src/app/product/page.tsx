import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Shield, 
  Zap, 
  BarChart3, 
  FileText, 
  Smartphone, 
  Users,
  Calculator,
  Database,
  Clock,
  CheckCircle,
  ArrowRight,
  IndianRupee,
  TrendingUp,
  Lightbulb,
  Lock,
  Cloud
} from "lucide-react"

export default function ProductPage() {
  const features = [
    {
      title: "Smart Tax Calculation",
      description: "AI-powered tax calculations with automatic updates for the latest tax laws and regulations.",
      icon: Calculator,
      category: "Core Features",
      benefits: ["Accuracy up to 99.9%", "Real-time tax law updates", "Multi-tax support"]
    },
    {
      title: "Automated Data Collection",
      description: "Seamlessly import data from banks, employers, and other financial institutions.",
      icon: Database,
      category: "Core Features",
      benefits: ["Bank integration", "Form 16 import", "Document OCR"]
    },
    {
      title: "Real-time Analytics",
      description: "Comprehensive dashboards and insights to optimize your tax strategy throughout the year.",
      icon: BarChart3,
      category: "Analytics",
      benefits: ["Tax optimization insights", "Cash flow analysis", "Tax burden tracking"]
    },
    {
      title: "Multi-Tax Support",
      description: "Handle all types of Indian taxes including Income Tax, GST, Property Tax, and more.",
      icon: FileText,
      category: "Tax Types",
      benefits: ["Income Tax (ITR)", "GST Returns", "TDS/TCS", "Property Tax"]
    },
    {
      title: "Mobile App",
      description: "Full-featured mobile application for tax management on the go.",
      icon: Smartphone,
      category: "Accessibility",
      benefits: ["iOS & Android", "Offline mode", "Push notifications"]
    },
    {
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption and compliance with Indian data regulations.",
      icon: Shield,
      category: "Security",
      benefits: ["256-bit encryption", "GDPR compliant", "Regular audits"]
    }
  ]

  const capabilities = [
    {
      title: "Direct Tax Management",
      items: [
        "Income Tax Return (ITR) filing for all forms",
        "TDS/TCS calculation and compliance",
        "Advance tax computation and reminders",
        "Capital gains tax optimization",
        "House property tax calculations"
      ]
    },
    {
      title: "Indirect Tax Management",
      items: [
        "GST return filing and reconciliation",
        "Input Tax Credit (ITC) optimization",
        "E-way bill generation",
        "GST audit support",
        "Multi-state GST compliance"
      ]
    },
    {
      title: "Advanced Features",
      items: [
        "AI-powered tax advice and recommendations",
        "Automated document processing and OCR",
        "Real-time tax law updates and alerts",
        "Integration with CA/CS professionals",
        "Custom tax reports and analytics"
      ]
    }
  ]

  const integrations = [
    { name: "Income Tax Portal", status: "Active", icon: "🏛️" },
    { name: "GST Portal", status: "Active", icon: "📊" },
    { name: "TIN-NSDL", status: "Active", icon: "🔐" },
    { name: "Banks", status: "Active", icon: "🏦" },
    { name: "Employers", status: "Active", icon: "🏢" },
    { name: "Brokers", status: "Beta", icon: "📈" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Revolutionary Tax Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              KYT.ai Product Suite
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive tax management platform designed for Indian taxpayers and businesses. 
              From individual filers to large enterprises, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your taxes efficiently and effectively
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <Badge variant="outline" className="text-xs">
                      {feature.category}
                    </Badge>
                    <CardTitle className="text-lg mt-1">{feature.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {feature.description}
                </CardDescription>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Capabilities</h2>
            <p className="text-lg text-gray-600">
              End-to-end tax management solutions for every need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    {capability.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {capability.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Integrations Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Seamless Integrations</h2>
            <p className="text-lg text-gray-600">
              Connect with all major tax portals and financial institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                        <Badge 
                          variant={integration.status === "Active" ? "default" : "secondary"}
                          className="mt-1"
                        >
                          {integration.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built with Modern Technology</h2>
            <p className="text-lg text-gray-600">
              Leveraging cutting-edge technology for the best tax management experience
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Cloud className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Cloud Native</h3>
                <p className="text-sm text-gray-600 mt-2">Scalable and secure infrastructure</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Lock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">End-to-End Encryption</h3>
                <p className="text-sm text-gray-600 mt-2">Your data is always protected</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Lightbulb className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">AI-Powered</h3>
                <p className="text-sm text-gray-600 mt-2">Smart insights and recommendations</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Real-Time Updates</h3>
                <p className="text-sm text-gray-600 mt-2">Always current with tax laws</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Tax Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied users who have simplified their tax compliance with KYT.ai
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}