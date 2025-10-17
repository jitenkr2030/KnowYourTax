import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calculator, 
  FileText, 
  BarChart3, 
  Smartphone, 
  Shield, 
  Database,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Zap,
  Target,
  Lightbulb,
  IndianRupee,
  Building,
  Car,
  ShoppingCart,
  Plane,
  BookOpen,
  Film,
  Stamp,
  CreditCard,
  Bell,
  Settings,
  ArrowRight,
  Star
} from "lucide-react"

export default function FeaturesPage() {
  const coreFeatures = [
    {
      title: "Smart Tax Calculator",
      description: "AI-powered tax calculations with automatic updates for the latest tax laws and regulations.",
      icon: Calculator,
      benefits: [
        "Real-time tax law updates",
        "Multiple tax regime support",
        "Automatic optimization suggestions",
        "Accuracy up to 99.9%"
      ],
      useCase: "Perfect for individuals and businesses looking for accurate tax calculations"
    },
    {
      title: "Automated ITR Filing",
      description: "Seamless Income Tax Return filing with auto-population of data from various sources.",
      icon: FileText,
      benefits: [
        "Support for all ITR forms (ITR-1 to ITR-7)",
        "Auto-import from Form 16",
        "Error detection and correction",
        "Direct e-filing to Income Tax Department"
      ],
      useCase: "Ideal for salaried individuals, professionals, and businesses"
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive dashboards and insights to optimize your tax strategy throughout the year.",
      icon: BarChart3,
      benefits: [
        "Tax burden visualization",
        "Cash flow analysis",
        "Tax optimization opportunities",
        "Historical comparison and trends"
      ],
      useCase: "Essential for tax planning and financial decision making"
    },
    {
      title: "Mobile App",
      description: "Full-featured mobile application for tax management on the go.",
      icon: Smartphone,
      benefits: [
        "iOS and Android support",
        "Offline mode functionality",
        "Push notifications for deadlines",
        "Document scanning and upload"
      ],
      useCase: "Great for users who need to manage taxes while traveling"
    }
  ]

  const taxManagement = [
    {
      title: "Income Tax Management",
      icon: IndianRupee,
      features: [
        "Salary income computation",
        "House property income",
        "Business and professional income",
        "Capital gains calculation",
        "Income from other sources",
        "Deductions under Section 80",
        "Tax rebate calculations"
      ],
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "GST Management",
      icon: ShoppingCart,
      features: [
        "GST return filing (GSTR-1, GSTR-3B, etc.)",
        "Input Tax Credit (ITC) reconciliation",
        "E-way bill generation",
        "GST invoice management",
        "Multiple GSTIN support",
        "GST audit assistance",
        "Annual GST compliance"
      ],
      color: "bg-green-100 text-green-600"
    },
    {
      title: "TDS/TCS Management",
      icon: CreditCard,
      features: [
        "TDS calculation and deduction",
        "TDS return filing (Form 24Q, 26Q, 27Q)",
        "TDS certificate generation",
        "TCS compliance",
        "Lower deduction certificate",
        "TDS reconciliation",
        "Compliance monitoring"
      ],
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Property Tax",
      icon: Building,
      features: [
        "Self-occupied property tax",
        "Let-out property calculations",
        "Municipal tax tracking",
        "Stamp duty computation",
        "Property registration",
        "Rental income management",
        "Home loan benefits"
      ],
      color: "bg-orange-100 text-orange-600"
    }
  ]

  const advancedFeatures = [
    {
      title: "AI Tax Advisor",
      description: "Get intelligent tax advice and recommendations powered by artificial intelligence.",
      icon: Lightbulb,
      capabilities: [
        "Personalized tax optimization strategies",
        "Investment suggestions for tax saving",
        "Risk assessment and mitigation",
        "Compliance recommendations"
      ]
    },
    {
      title: "Document Processing",
      description: "Advanced OCR and AI-powered document processing for seamless data extraction.",
      icon: Database,
      capabilities: [
        "Automatic Form 16 processing",
        "Bank statement analysis",
        "Invoice scanning and data extraction",
        "Document categorization and storage"
      ]
    },
    {
      title: "Real-time Compliance",
      description: "Stay compliant with real-time monitoring and alerts for tax deadlines and changes.",
      icon: Bell,
      capabilities: [
        "Deadline reminders and notifications",
        "Tax law change alerts",
        "Compliance status monitoring",
        "Automated reporting"
      ]
    },
    {
      title: "Integration Hub",
      description: "Connect with banks, employers, and tax portals for seamless data flow.",
      icon: Settings,
      capabilities: [
        "Bank account integration",
        "Employer portal connections",
        "Tax department API integration",
        "Third-party software connections"
      ]
    }
  ]

  const industrySolutions = [
    {
      title: "For Individuals",
      icon: Users,
      description: "Comprehensive tax management for salaried professionals, freelancers, and investors.",
      features: [
        "Salary income optimization",
        "Investment tax planning",
        "Rental property management",
        "Capital gains tracking",
        "Deduction maximization"
      ]
    },
    {
      title: "For Small Businesses",
      icon: Building,
      description: "Complete tax compliance solution for small and medium enterprises.",
      features: [
        "Business income computation",
        "GST compliance suite",
        "TDS/TCS management",
        "Payroll tax processing",
        "Audit support"
      ]
    },
    {
      title: "For Tax Professionals",
      icon: Star,
      description: "Professional tools for CAs, CSs, and tax consultants to serve multiple clients.",
      features: [
        "Multi-client management",
        "Bulk filing capabilities",
        "Client collaboration tools",
        "Professional reports",
        "Practice management"
      ]
    },
    {
      title: "For Large Enterprises",
      icon: TrendingUp,
      description: "Enterprise-grade tax management for large corporations and multinational companies.",
      features: [
        "Multi-location tax compliance",
        "Transfer pricing documentation",
        "International tax support",
        "Advanced analytics",
        "Custom integrations"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Comprehensive Feature Set
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Powerful Tax Management Features
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore our comprehensive suite of features designed to simplify tax compliance 
              and optimize your tax strategy across all tax types in India.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Explore All Features
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Essential features that form the foundation of our tax management platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {coreFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Best for:</strong> {feature.useCase}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tax Management Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tax Management Suite</h2>
            <p className="text-lg text-gray-600">
              Comprehensive support for all major tax types in India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {taxManagement.map((tax, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 ${tax.color} rounded-lg flex items-center justify-center mb-3`}>
                    <tax.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{tax.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tax.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Features</h2>
            <p className="text-lg text-gray-600">
              Cutting-edge technology and intelligent automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {feature.capabilities.map((capability, capabilityIndex) => (
                      <div key={capabilityIndex} className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">{capability}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Industry Solutions */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Solutions</h2>
            <p className="text-lg text-gray-600">
              Tailored features for different user segments and industries
            </p>
          </div>

          <Tabs defaultValue="individuals" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="individuals">Individuals</TabsTrigger>
              <TabsTrigger value="business">Small Business</TabsTrigger>
              <TabsTrigger value="professionals">Professionals</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            </TabsList>
            
            <div className="mt-8">
              {industrySolutions.map((solution, index) => (
                <TabsContent key={index} value={solution.title.toLowerCase().split(' ')[0]}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                          <solution.icon className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{solution.title}</CardTitle>
                          <CardDescription className="text-lg mt-2">
                            {solution.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {solution.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Feature Comparison</h2>
            <p className="text-lg text-gray-600">
              Compare features across different plans to find the perfect fit for your needs
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Feature</th>
                      <th className="text-center py-3 px-4">Free</th>
                      <th className="text-center py-3 px-4">Personal</th>
                      <th className="text-center py-3 px-4">Business</th>
                      <th className="text-center py-3 px-4">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Smart Tax Calculator</td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">ITR Filing (Basic)</td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">GST Management</td>
                      <td className="text-center py-3 px-4"><AlertCircle className="w-4 h-4 text-gray-400 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><AlertCircle className="w-4 h-4 text-gray-400 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">AI Tax Advisor</td>
                      <td className="text-center py-3 px-4"><AlertCircle className="w-4 h-4 text-gray-400 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Priority Support</td>
                      <td className="text-center py-3 px-4"><AlertCircle className="w-4 h-4 text-gray-400 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><AlertCircle className="w-4 h-4 text-gray-400 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience All These Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your free trial today and explore all the powerful features KYT.ai has to offer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Free Trial
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