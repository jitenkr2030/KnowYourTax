'use client'

import { useState } from 'react'
import { FileText, Shield, Users, DollarSign, AlertTriangle, CheckCircle, Calendar, Scale, Gavel, Clock, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TermsOfServicePage() {
  const [activeTab, setActiveTab] = useState('overview')

  const termsSections = [
    {
      title: "Acceptance of Terms",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      content: [
        {
          heading: "Agreement to Terms",
          description: "By accessing and using KYT.ai services, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
          points: [
            "These terms constitute a legally binding agreement between you and KYT.ai",
            "You must be at least 18 years old to use our services",
            "By creating an account, you confirm that you have the legal capacity to enter into this agreement",
            "If you are using our services on behalf of a business, you represent that you have authority to bind that business"
          ]
        },
        {
          heading: "Modifications to Terms",
          description: "We reserve the right to modify these terms at any time, with changes becoming effective upon posting.",
          points: [
            "We will provide notice of material changes through email or website notifications",
            "Continued use of our services after changes constitutes acceptance of the new terms",
            "You are responsible for reviewing the most current version of these terms",
            "Major changes will be communicated with at least 30 days notice"
          ]
        }
      ]
    },
    {
      title: "Service Description",
      icon: <Users className="h-6 w-6 text-green-600" />,
      content: [
        {
          heading: "Our Services",
          description: "KYT.ai provides a comprehensive tax compliance platform including the following services:",
          points: [
            "Income tax filing and return preparation",
            "GST registration, filing, and compliance management",
            "TDS/TCS calculation and return filing",
            "Tax planning and optimization advisory",
            "Document management and storage",
            "Real-time tax compliance monitoring",
            "Mobile application for on-the-go access",
            "Integration with tax authorities and financial institutions"
          ]
        },
        {
          heading: "Service Availability",
          description: "We strive to provide reliable service availability with the following commitments:",
          points: [
            "99.9% uptime guarantee for our core services",
            "24/7 technical support for critical issues",
            "Regular maintenance windows with advance notice",
            "Service status updates and incident communication",
            "Backup and disaster recovery procedures",
            "Performance monitoring and optimization"
          ]
        }
      ]
    },
    {
      title: "User Responsibilities",
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      content: [
        {
          heading: "Account Security",
          description: "You are responsible for maintaining the security of your account and credentials:",
          points: [
            "Keep your password confidential and secure",
            "Use strong, unique passwords for your account",
            "Enable two-factor authentication when available",
            "Immediately notify us of any unauthorized account access",
            "Do not share your account credentials with others",
            "Log out of your account when using shared devices"
          ]
        },
        {
          heading: "Data Accuracy",
          description: "You are responsible for the accuracy and completeness of information provided:",
          points: [
            "Provide accurate and complete personal and financial information",
            "Update your information promptly when changes occur",
            "Verify all data before submitting tax returns",
            "Maintain copies of all documents and submissions",
            "Ensure all information complies with current tax laws",
            "Take responsibility for any errors or omissions in your data"
          ]
        },
        {
          heading: "Compliance with Laws",
          description: "You must comply with all applicable laws and regulations:",
          points: [
            "Use our services only for lawful purposes",
            "Comply with all Indian tax laws and regulations",
            "Do not engage in fraudulent or deceptive practices",
            "Respect intellectual property rights of others",
            "Do not interfere with or disrupt our services",
            "Report any suspicious activities or security concerns"
          ]
        }
      ]
    },
    {
      title: "Payment and Billing",
      icon: <DollarSign className="h-6 w-6 text-orange-600" />,
      content: [
        {
          heading: "Subscription Plans",
          description: "We offer various subscription plans with different features and pricing:",
          points: [
            "Free tier with basic tax calculation features",
            "Premium plans with advanced filing and advisory services",
            "Business plans for multiple users and enhanced features",
            "Custom enterprise solutions for large organizations",
            "All plans include core security and compliance features",
            "Pricing is subject to change with advance notice"
          ]
        },
        {
          heading: "Payment Terms",
          description: "Payment terms and conditions for our services:",
          points: [
            "Payments are processed securely through our payment partners",
            "Subscription fees are billed in advance on a monthly or annual basis",
            "All payments are non-refundable except as specified in our refund policy",
            "We reserve the right to suspend services for non-payment",
            "Prices are inclusive of applicable taxes as per Indian law",
            "Payment method changes must be made through your account settings"
          ]
        },
        {
          heading: "Refund Policy",
          description: "Our refund policy ensures fair treatment for our customers:",
          points: [
            "30-day money-back guarantee for new premium subscriptions",
            "Prorated refunds for annual subscriptions if service is unavailable",
            "No refunds for partial months or unused features",
            "Refunds processed within 7-10 business days",
            "Customer satisfaction is our priority - contact support for issues"
          ]
        }
      ]
    },
    {
      title: "Intellectual Property",
      icon: <Scale className="h-6 w-6 text-red-600" />,
      content: [
        {
          heading: "Our Intellectual Property",
          description: "KYT.ai retains all rights to our intellectual property:",
          points: [
            "All software, algorithms, and technology developed by KYT.ai",
            "Website design, content, and user interface elements",
            "Tax calculation methodologies and optimization algorithms",
            "Brand names, logos, and trademarks",
            "Proprietary data formats and APIs",
            "Business processes and methodologies"
          ]
        },
        {
          heading: "User Content",
          description: "Rights and responsibilities regarding user-generated content:",
          points: [
            "You retain ownership of your personal and financial data",
            "You grant us license to use your data solely for providing services",
            "You are responsible for ensuring your content doesn't infringe others' rights",
            "We may use anonymized data for service improvement and analytics",
            "You may not reverse engineer or decompile our software",
            "Third-party intellectual property must be properly licensed"
          ]
        }
      ]
    },
    {
      title: "Limitation of Liability",
      icon: <AlertTriangle className="h-6 w-6 text-yellow-600" />,
      content: [
        {
          heading: "Service Limitations",
          description: "KYT.ai provides services on an 'as is' basis with the following limitations:",
          points: [
            "We do not guarantee tax outcomes or refund amounts",
            "We are not responsible for errors in user-provided data",
            "We are not liable for tax authority decisions or audits",
            "Service availability may be affected by factors beyond our control",
            "We provide tax guidance but not legal or financial advice",
            "Users should consult with qualified tax professionals for complex situations"
          ]
        },
        {
          heading: "Liability Cap",
          description: "Our liability is limited as follows:",
          points: [
            "Total liability capped at the amount paid by you in the previous 12 months",
            "No liability for indirect, consequential, or punitive damages",
            "No liability for lost profits or business interruption",
            "No liability for data loss or security breaches caused by user actions",
            "Claims must be filed within one year of the incident",
            "These limitations apply to the fullest extent permitted by law"
          ]
        }
      ]
    },
    {
      title: "Termination",
      icon: <Gavel className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          heading: "Termination by User",
          description: "You may terminate your account and services at any time:",
          points: [
            "Account termination can be done through your account settings",
            "Data export options are available before termination",
            "No refunds for unused portions of subscription periods",
            "Some data may be retained as required by law",
            "Reactivation options are available within 30 days",
            "Third-party integrations may be affected by termination"
          ]
        },
        {
          heading: "Termination by KYT.ai",
          description: "We reserve the right to terminate services under certain conditions:",
          points: [
            "Violation of these terms or acceptable use policy",
            "Fraudulent or illegal activities",
            "Non-payment of subscription fees",
            "Security breaches or unauthorized access",
            "Regulatory or legal requirements",
            "Service discontinuation with reasonable notice"
          ]
        }
      ]
    }
  ]

  const prohibitedActivities = [
    "Using services for illegal purposes or fraud",
    "Impersonating others or providing false information",
    "Interfering with service operations or security",
    "Reverse engineering or decompiling our software",
    "Distributing malware or engaging in hacking activities",
    "Violating intellectual property rights",
    "Harassing or abusing other users or support staff",
    "Spamming or sending unsolicited communications",
    "Exceeding reasonable usage limits",
    "Using automated tools without authorization"
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Last updated: March 15, 2024
        </p>
        <p className="text-gray-500 mt-2">
          Please read these terms carefully before using KYT.ai services. By accessing our platform, you agree to be bound by these terms.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="responsibilities">Responsibilities</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="intellectual">IP</TabsTrigger>
          <TabsTrigger value="liability">Liability</TabsTrigger>
          <TabsTrigger value="termination">Termination</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Welcome to KYT.ai
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  These Terms of Service govern your use of KYT.ai's tax compliance platform and related services. By accessing or using our services, you agree to comply with and be bound by these terms.
                </p>
                <p className="text-gray-600 mb-4">
                  KYT.ai provides innovative tax compliance solutions designed to simplify tax filing and management for individuals and businesses in India. Our platform combines advanced technology with expert tax knowledge to deliver accurate, efficient, and secure tax services.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Comprehensive tax compliance solutions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Bank-level security and encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Expert tax guidance and support</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Compliance with Indian tax laws</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Transparent pricing and terms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">24/7 customer support</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">What We Provide</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Tax filing and compliance services</li>
                      <li>• Document management and storage</li>
                      <li>• Real-time compliance monitoring</li>
                      <li>• Expert tax advisory and support</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2">Your Responsibilities</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Provide accurate information</li>
                      <li>• Maintain account security</li>
                      <li>• Comply with tax laws</li>
                      <li>• Use services responsibly</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="mt-8">
          <div className="grid gap-8">
            {termsSections.slice(1, 2).map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {section.icon}
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {section.content.map((category, catIndex) => (
                      <div key={catIndex}>
                        <h4 className="font-medium mb-2">{category.heading}</h4>
                        <p className="text-gray-600 mb-3">{category.description}</p>
                        <ul className="space-y-2">
                          {category.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="responsibilities" className="mt-8">
          <div className="grid gap-8">
            {termsSections.slice(2, 3).map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {section.icon}
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {section.content.map((category, catIndex) => (
                      <div key={catIndex}>
                        <h4 className="font-medium mb-2">{category.heading}</h4>
                        <p className="text-gray-600 mb-3">{category.description}</p>
                        <ul className="space-y-2">
                          {category.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card>
              <CardHeader>
                <CardTitle>Prohibited Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  The following activities are strictly prohibited when using KYT.ai services:
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  {prohibitedActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-red-50 rounded">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{activity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payment" className="mt-8">
          <div className="grid gap-8">
            {termsSections.slice(3, 4).map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {section.icon}
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {section.content.map((category, catIndex) => (
                      <div key={catIndex}>
                        <h4 className="font-medium mb-2">{category.heading}</h4>
                        <p className="text-gray-600 mb-3">{category.description}</p>
                        <ul className="space-y-2">
                          {category.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="intellectual" className="mt-8">
          <div className="grid gap-8">
            {termsSections.slice(4, 5).map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {section.icon}
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {section.content.map((category, catIndex) => (
                      <div key={catIndex}>
                        <h4 className="font-medium mb-2">{category.heading}</h4>
                        <p className="text-gray-600 mb-3">{category.description}</p>
                        <ul className="space-y-2">
                          {category.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="liability" className="mt-8">
          <div className="grid gap-8">
            {termsSections.slice(5, 6).map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {section.icon}
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {section.content.map((category, catIndex) => (
                      <div key={catIndex}>
                        <h4 className="font-medium mb-2">{category.heading}</h4>
                        <p className="text-gray-600 mb-3">{category.description}</p>
                        <ul className="space-y-2">
                          {category.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="termination" className="mt-8">
          <div className="grid gap-8">
            {termsSections.slice(6, 7).map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {section.icon}
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {section.content.map((category, catIndex) => (
                      <div key={catIndex}>
                        <h4 className="font-medium mb-2">{category.heading}</h4>
                        <p className="text-gray-600 mb-3">{category.description}</p>
                        <ul className="space-y-2">
                          {category.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Questions About Our Terms?</CardTitle>
            <CardDescription>
              If you have any questions about these Terms of Service, please contact our legal team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Contact Legal Team</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}