'use client'

import { useState } from 'react'
import { Shield, Lock, Eye, Database, FileText, AlertTriangle, CheckCircle, Calendar, User, Mail, Phone, MapPin } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function PrivacyPolicyPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const privacySections = [
    {
      title: "Information We Collect",
      icon: <Database className="h-6 w-6 text-blue-600" />,
      content: [
        {
          type: "Personal Information",
          items: [
            "Full name and contact details",
            "Email address and phone number",
            "Physical address",
            "Date of birth and PAN number",
            "Bank account information"
          ]
        },
        {
          type: "Tax Information",
          items: [
            "Income details and salary information",
            "Investment and asset details",
            "Deduction and exemption claims",
            "Previous tax return history",
            "Form 16 and other tax documents"
          ]
        },
        {
          type: "Technical Information",
          items: [
            "IP address and browser information",
            "Device information and operating system",
            "Usage data and interaction patterns",
            "Cookies and tracking data",
            "Application performance data"
          ]
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <Eye className="h-6 w-6 text-green-600" />,
      content: [
        {
          type: "Service Provision",
          items: [
            "Tax filing and return preparation",
            "Document processing and verification",
            "Tax calculation and optimization",
            "Compliance monitoring and alerts",
            "Customer support and assistance"
          ]
        },
        {
          type: "Service Improvement",
          items: [
            "Platform enhancement and development",
            "User experience optimization",
            "Feature development and testing",
            "Performance monitoring and improvement",
            "Security enhancement and testing"
          ]
        },
        {
          type: "Communication",
          items: [
            "Service updates and notifications",
            "Tax deadline reminders",
            "Marketing and promotional content",
            "Customer support responses",
            "Educational content and resources"
          ]
        }
      ]
    },
    {
      title: "Data Protection Measures",
      icon: <Lock className="h-6 w-6 text-purple-600" />,
      content: [
        {
          type: "Encryption",
          items: [
            "AES-256 encryption for data at rest",
            "SSL/TLS encryption for data in transit",
            "End-to-end encryption for sensitive communications",
            "Regular encryption key rotation",
            "Secure key management practices"
          ]
        },
        {
          type: "Access Control",
          items: [
            "Role-based access control system",
            "Multi-factor authentication for employees",
            "Regular access reviews and audits",
            "Privileged access management",
            "Session timeout and automatic logout"
          ]
        },
        {
          type: "Infrastructure Security",
          items: [
            "Secure cloud infrastructure",
            "Regular security vulnerability scanning",
            "Intrusion detection and prevention",
            "DDoS protection and mitigation",
            "Regular security audits and penetration testing"
          ]
        }
      ]
    },
    {
      title: "Data Sharing and Disclosure",
      icon: <FileText className="h-6 w-6 text-orange-600" />,
      content: [
        {
          type: "Third-Party Service Providers",
          items: [
            "Cloud hosting providers (AWS, Google Cloud)",
            "Payment processing services",
            "Email and communication services",
            "Analytics and monitoring tools",
            "Customer support platforms"
          ]
        },
        {
          type: "Legal Requirements",
          items: [
            "Tax authorities and government agencies",
            "Law enforcement agencies",
            "Court orders and legal proceedings",
            "Regulatory compliance requirements",
            "Anti-money laundering (AML) reporting"
          ]
        },
        {
          type: "Business Transfers",
          items: [
            "Company mergers and acquisitions",
            "Asset sales or transfers",
            "Business restructuring",
            "Partnership arrangements",
            "Joint ventures and collaborations"
          ]
        }
      ]
    }
  ]

  const userRights = [
    {
      title: "Right to Access",
      description: "You can request access to all personal information we hold about you.",
      icon: <Eye className="h-5 w-5" />
    },
    {
      title: "Right to Rectification",
      description: "You can request correction of inaccurate or incomplete personal information.",
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      title: "Right to Erasure",
      description: "You can request deletion of your personal information under certain circumstances.",
      icon: <FileText className="h-5 w-5" />
    },
    {
      title: "Right to Restrict Processing",
      description: "You can request limitation of how we use your personal information.",
      icon: <Lock className="h-5 w-5" />
    },
    {
      title: "Right to Data Portability",
      description: "You can request transfer of your personal information to another service.",
      icon: <Database className="h-5 w-5" />
    },
    {
      title: "Right to Object",
      description: "You can object to certain types of processing of your personal information.",
      icon: <AlertTriangle className="h-5 w-5" />
    }
  ]

  const cookiePolicy = [
    {
      type: "Essential Cookies",
      description: "Required for the website to function properly",
      examples: ["Session management", "Security features", "Shopping cart functionality"],
      optional: false
    },
    {
      type: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website",
      examples: ["Google Analytics", "Hotjar", "Mixpanel"],
      optional: true
    },
    {
      type: "Marketing Cookies",
      description: "Used to track advertising effectiveness and serve relevant ads",
      examples: ["Google Ads", "Facebook Pixel", "LinkedIn Insight Tag"],
      optional: true
    },
    {
      type: "Preference Cookies",
      description: "Remember your settings and preferences",
      examples: ["Language selection", "Theme preferences", "Font size settings"],
      optional: true
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Last updated: March 15, 2024
        </p>
        <p className="text-gray-500 mt-2">
          At KYT.ai, we are committed to protecting your privacy and ensuring the security of your personal and tax-related information.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="collection">Data Collection</TabsTrigger>
          <TabsTrigger value="protection">Data Protection</TabsTrigger>
          <TabsTrigger value="rights">Your Rights</TabsTrigger>
          <TabsTrigger value="cookies">Cookies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Our Privacy Commitment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  KYT.ai is dedicated to protecting the privacy and security of our users' information. This Privacy Policy outlines how we collect, use, store, and protect your personal and tax-related data when you use our services.
                </p>
                <p className="text-gray-600 mb-4">
                  We understand that tax information is highly sensitive, and we have implemented industry-leading security measures to ensure your data remains confidential and secure at all times.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Bank-level encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Compliance with Indian regulations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Regular security audits</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Transparent data practices</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">User control over data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">24/7 security monitoring</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Privacy Principles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Transparency</h4>
                    <p className="text-sm text-gray-600">We clearly explain what data we collect and how we use it.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2">Security</h4>
                    <p className="text-sm text-gray-600">We implement robust security measures to protect your data.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium mb-2">Control</h4>
                    <p className="text-sm text-gray-600">You have control over your personal information and privacy settings.</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium mb-2">Compliance</h4>
                    <p className="text-sm text-gray-600">We comply with all applicable privacy laws and regulations.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collection" className="mt-8">
          <div className="grid gap-8">
            {privacySections.map((section, index) => (
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
                        <h4 className="font-medium mb-3">{category.type}</h4>
                        <ul className="space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
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

        <TabsContent value="protection" className="mt-8">
          <div className="grid gap-8">
            {privacySections.slice(2, 3).map((section, index) => (
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
                        <h4 className="font-medium mb-3">{category.type}</h4>
                        <ul className="space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
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
                <CardTitle>Security Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">ISO 27001</div>
                    <p className="text-sm text-gray-600">Information Security Management</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">SOC 2</div>
                    <p className="text-sm text-gray-600">Service Organization Control</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">GDPR</div>
                    <p className="text-sm text-gray-600">Data Protection Compliance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rights" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {userRights.map((right, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {right.icon}
                    <CardTitle className="text-lg">{right.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {right.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How to Exercise Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                To exercise any of your privacy rights, please contact us using the following methods:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">privacy@kyt.ai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">+91 80 1234 5678</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">KYT.ai Privacy Team, Bangalore</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    We will respond to your request within 30 days, as required by applicable privacy laws.
                  </p>
                  <Button variant="outline" size="sm">
                    Submit Privacy Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cookies" className="mt-8">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Cookie Policy</CardTitle>
                <CardDescription>
                  Learn about the cookies we use and how you can manage your preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {cookiePolicy.map((cookie, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{cookie.type}</h4>
                        <Badge variant={cookie.optional ? "secondary" : "default"}>
                          {cookie.optional ? "Optional" : "Required"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{cookie.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {cookie.examples.map((example, exIndex) => (
                          <Badge key={exIndex} variant="outline" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Managing Cookie Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  You can manage your cookie preferences through your browser settings or by using our cookie preference center. Here's how:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Browser Settings</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Chrome: Settings → Privacy and Security → Cookies</li>
                      <li>• Firefox: Options → Privacy & Security → Cookies</li>
                      <li>• Safari: Preferences → Privacy → Cookies</li>
                      <li>• Edge: Settings → Privacy, search, and services → Cookies</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Our Preference Center</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Use our cookie preference center to customize your cookie settings:
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Accept Essential Cookies Only
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Accept All Cookies
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Customize Preferences
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Questions About Privacy?</CardTitle>
            <CardDescription>
              Our privacy team is available to answer any questions you may have about how we handle your data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Contact Privacy Team</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}