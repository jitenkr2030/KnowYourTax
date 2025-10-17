'use client'

import { useState } from 'react'
import { Shield, Eye, FileText, Users, Database, AlertTriangle, CheckCircle, Globe, Clock, MapPin, Mail, Phone, Download, Upload, Trash2, Settings } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function GDPRPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const gdprPrinciples = [
    {
      title: "Lawfulness, Fairness, and Transparency",
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      description: "Process personal data lawfully, fairly, and in a transparent manner.",
      details: [
        "Clear and concise privacy information",
        "Legitimate basis for data processing",
        "Fair treatment of data subjects",
        "Transparent data practices"
      ]
    },
    {
      title: "Purpose Limitation",
      icon: <Eye className="h-6 w-6 text-green-600" />,
      description: "Collect personal data for specified, explicit, and legitimate purposes.",
      details: [
        "Clear purpose specification",
        "No further processing incompatible with original purpose",
        "Purpose communicated to data subjects",
        "Regular purpose review"
      ]
    },
    {
      title: "Data Minimization",
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      description: "Collect only the personal data that is adequate, relevant, and necessary.",
      details: [
        "Minimum necessary data collection",
        "Regular data review and cleanup",
        "Proportionate data processing",
        "Data retention policies"
      ]
    },
    {
      title: "Accuracy",
      icon: <CheckCircle className="h-6 w-6 text-orange-600" />,
      description: "Ensure personal data is accurate and kept up to date.",
      details: [
        "Data verification procedures",
        "Regular data accuracy checks",
        "Easy data correction mechanisms",
        "Error detection and correction"
      ]
    },
    {
      title: "Storage Limitation",
      icon: <Clock className="h-6 w-6 text-red-600" />,
      description: "Keep personal data in a form that permits identification for no longer than necessary.",
      details: [
        "Defined retention periods",
        "Automatic data deletion",
        "Archival procedures",
        "Regular data cleanup"
      ]
    },
    {
      title: "Integrity and Confidentiality",
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      description: "Ensure appropriate security of personal data.",
      details: [
        "Robust security measures",
        "Access controls and encryption",
        "Regular security assessments",
        "Breach detection and response"
      ]
    },
    {
      title: "Accountability",
      icon: <Users className="h-6 w-6 text-yellow-600" />,
      description: "Demonstrate compliance with GDPR principles.",
      details: [
        "Compliance documentation",
        "Data protection impact assessments",
        "Regular compliance reviews",
        "Staff training and awareness"
      ]
    }
  ]

  const userRights = [
    {
      title: "Right to be Informed",
      icon: <Eye className="h-5 w-5 text-blue-600" />,
      description: "The right to be informed about the collection and use of your personal data.",
      keyPoints: [
        "Clear privacy notices",
        "Transparent data processing information",
        "Purpose and legal basis disclosure",
        "Data retention period information"
      ],
      howToExercise: "Review our Privacy Policy and contact us for additional information."
    },
    {
      title: "Right of Access",
      icon: <FileText className="h-5 w-5 text-green-600" />,
      description: "The right to access your personal data held by us.",
      keyPoints: [
        "Request copy of all personal data",
        "Information about data processing",
        "Purpose of processing disclosure",
        "Recipients of personal data information"
      ],
      howToExercise: "Submit a data access request through our privacy portal or email privacy@kyt.ai."
    },
    {
      title: "Right to Rectification",
      icon: <CheckCircle className="h-5 w-5 text-purple-600" />,
      description: "The right to have inaccurate personal data corrected.",
      keyPoints: [
        "Correct inaccurate data",
        "Complete incomplete data",
        "Supplement missing information",
        "Verification of corrected data"
      ],
      howToExercise: "Contact our privacy team with details of the inaccurate information and proposed corrections."
    },
    {
      title: "Right to Erasure (Right to be Forgotten)",
      icon: <Trash2 className="h-5 w-5 text-red-600" />,
      description: "The right to have personal data deleted when it's no longer needed.",
      keyPoints: [
        "Delete personal data when no longer necessary",
        "Remove data upon withdrawal of consent",
        "Erase data processed unlawfully",
        "Comply with legal erasure requirements"
      ],
      howToExercise: "Submit a deletion request through our privacy portal with specific details about the data to be deleted."
    },
    {
      title: "Right to Restrict Processing",
      icon: <Settings className="h-5 w-5 text-orange-600" />,
      description: "The right to limit how we use your personal data.",
      keyPoints: [
        "Restrict data processing while accuracy verified",
        "Limit processing when data is no longer needed",
        "Restrict use during legal challenges",
        "Maintain data while processing is restricted"
      ],
      howToExercise: "Contact our privacy team to request processing restrictions with specific justification."
    },
    {
      title: "Right to Data Portability",
      icon: <Download className="h-5 w-5 text-indigo-600" />,
      description: "The right to obtain and reuse your personal data for your own purposes.",
      keyPoints: [
        "Receive personal data in machine-readable format",
        "Transfer data to another service provider",
        "Direct data transmission between controllers",
        "Maintain data usability and integrity"
      ],
      howToExercise: "Request data export through your account settings or contact our privacy team."
    },
    {
      title: "Right to Object",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
      description: "The right to object to certain types of processing.",
      keyPoints: [
        "Object to direct marketing",
        "Challenge processing based on legitimate interests",
        "Object to processing for scientific research",
        "Appeal automated decision-making"
      ],
      howToExercise: "Submit objection requests with clear reasoning through our privacy portal."
    },
    {
      title: "Rights Related to Automated Decision Making",
      icon: <Database className="h-5 w-5 text-green-600" />,
      description: "Rights concerning automated decision-making and profiling.",
      keyPoints: [
        "Human review of automated decisions",
        "Explanation of automated decision logic",
        "Challenge automated decisions",
        "Opt-out of profiling activities"
      ],
      howToExercise: "Contact our privacy team if you believe you've been subject to automated decision-making."
    }
  ]

  const dataCategories = [
    {
      category: "Personal Identifiers",
      description: "Information that identifies you as an individual",
      examples: [
        "Full name and date of birth",
        "PAN number and Aadhaar number",
        "Contact information (email, phone, address)",
        "Government-issued identification numbers"
      ],
      retentionPeriod: "As long as required for service provision and legal compliance"
    },
    {
      category: "Financial Information",
      description: "Details related to your financial activities and tax status",
      examples: [
        "Bank account information",
        "Income details and salary information",
        "Investment and asset details",
        "Tax return history and filing information"
      ],
      retentionPeriod: "7 years (as per Indian tax laws)"
    },
    {
      category: "Technical Data",
      description: "Information about how you interact with our services",
      examples: [
        "IP address and browser information",
        "Device information and operating system",
        "Usage data and interaction patterns",
        "Application performance data"
      ],
      retentionPeriod: "1-2 years for analytics, 30 days for security logs"
    },
    {
      category: "Communication Data",
      description: "Information about your communications with us",
      examples: [
        "Customer support chat history",
        "Email correspondence",
        "Phone call records and transcripts",
        "Support ticket information"
      ],
      retentionPeriod: "3 years for service improvement, 1 year for resolved issues"
    }
  ]

  const legalBases = [
    {
      basis: "Consent",
      description: "You have given clear consent for us to process your personal data.",
      examples: [
        "Marketing communications",
        "Cookie preferences",
        "Newsletter subscriptions",
        "Optional feature usage"
      ],
      withdrawalInfo: "You can withdraw consent at any time through your account settings or by contacting us."
    },
    {
      basis: "Contract",
      description: "Processing is necessary for the performance of our contract with you.",
      examples: [
        "Service provision and account management",
        "Tax filing and return preparation",
        "Document processing and verification",
        "Customer support and service delivery"
      ],
      withdrawalInfo: "Processing based on contract necessity continues until the contract ends."
    },
    {
      basis: "Legal Obligation",
      description: "We are legally required to process your personal data.",
      examples: [
        "Tax compliance and reporting",
        "Anti-money laundering (AML) checks",
        "Financial record keeping",
        "Regulatory compliance requirements"
      ],
      withdrawalInfo: "Legal obligations cannot be withdrawn as they are required by law."
    },
    {
      basis: "Legitimate Interests",
      description: "Processing is necessary for our legitimate interests or those of third parties.",
      examples: [
        "Service improvement and development",
        "Fraud prevention and security",
        "Network and IT security",
        "Direct marketing (with opt-out option)"
      ],
      withdrawalInfo: "You can object to processing based on legitimate interests."
    }
  ]

  const dataSecurity = [
    {
      measure: "Encryption",
      description: "All personal data is encrypted using industry-standard encryption protocols.",
      details: [
        "AES-256 encryption for data at rest",
        "TLS 1.3 encryption for data in transit",
        "End-to-end encryption for sensitive communications",
        "Regular encryption key rotation"
      ]
    },
    {
      measure: "Access Controls",
      description: "Strict access controls ensure only authorized personnel can access personal data.",
      details: [
        "Role-based access control (RBAC)",
        "Multi-factor authentication for all employees",
        "Regular access reviews and audits",
        "Privileged access management"
      ]
    },
    {
      measure: "Infrastructure Security",
      description: "Our infrastructure is designed with security as a top priority.",
      details: [
        "Secure cloud hosting with major providers",
        "Regular vulnerability scanning and penetration testing",
        "Intrusion detection and prevention systems",
        "DDoS protection and mitigation"
      ]
    },
    {
      measure: "Data Breach Response",
      description: "We have comprehensive procedures for detecting and responding to data breaches.",
      details: [
        "72-hour breach notification to authorities",
        "Immediate breach detection systems",
        "Breach assessment and impact analysis",
        "Timely notification to affected individuals"
      ]
    }
  ]

  const internationalTransfers = [
    {
      destination: "United States",
      purpose: "Cloud hosting and analytics services",
      safeguards: "Standard Contractual Clauses (SCCs), Privacy Shield framework",
      providers: ["Amazon Web Services", "Google Cloud", "Microsoft Azure"]
    },
    {
      destination: "European Union",
      purpose: "Payment processing and customer support",
      safeguards: "GDPR compliance, Data Processing Agreements (DPAs)",
      providers: ["Stripe", "Zendesk", "Intercom"]
    },
    {
      destination: "Singapore",
      purpose: "Regional data center operations",
      safeguards: "Adequacy decision, DPAs",
      providers: ["AWS Singapore Region", "DigitalOcean"]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">GDPR Compliance</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Last updated: March 15, 2024
        </p>
        <p className="text-gray-500 mt-2">
          KYT.ai is committed to protecting your personal data and complying with the General Data Protection Regulation (GDPR) and applicable Indian data protection laws.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="principles">Principles</TabsTrigger>
          <TabsTrigger value="rights">Your Rights</TabsTrigger>
          <TabsTrigger value="data">Data Categories</TabsTrigger>
          <TabsTrigger value="legal">Legal Basis</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Our GDPR Commitment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  At KYT.ai, we take data protection seriously and are committed to complying with GDPR requirements. This policy explains how we handle personal data and protect your privacy rights.
                </p>
                <p className="text-gray-600 mb-4">
                  As a tax compliance platform operating in India, we also comply with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and other applicable Indian data protection regulations.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">GDPR compliant data processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Transparent data practices</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Strong user rights protection</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Robust security measures</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Regular compliance audits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Data breach preparedness</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key GDPR Compliance Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Lawful Processing</h4>
                    <p className="text-sm text-gray-600">We have clear legal bases for all data processing activities.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2">User Rights</h4>
                    <p className="text-sm text-gray-600">Comprehensive rights for data subjects with easy exercise mechanisms.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium mb-2">Data Security</h4>
                    <p className="text-sm text-gray-600">Advanced security measures to protect personal data.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="principles" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {gdprPrinciples.map((principle, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {principle.icon}
                    <div>
                      <CardTitle className="text-lg">{principle.title}</CardTitle>
                      <CardDescription>{principle.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {principle.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rights" className="mt-8">
          <div className="grid gap-6">
            {userRights.map((right, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {right.icon}
                    <div>
                      <CardTitle className="text-lg">{right.title}</CardTitle>
                      <CardDescription>{right.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Key Points</h4>
                      <ul className="space-y-1">
                        {right.keyPoints.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">How to Exercise</h4>
                      <p className="text-sm text-gray-600">{right.howToExercise}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="data" className="mt-8">
          <div className="grid gap-6">
            {dataCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Examples</h4>
                      <ul className="space-y-1">
                        {category.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Retention Period</h4>
                      <p className="text-sm text-gray-600">{category.retentionPeriod}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="legal" className="mt-8">
          <div className="grid gap-6">
            {legalBases.map((basis, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{basis.basis}</CardTitle>
                  <CardDescription>{basis.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Examples</h4>
                      <ul className="space-y-1">
                        {basis.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Withdrawal Information</h4>
                      <p className="text-sm text-gray-600">{basis.withdrawalInfo}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-8">
          <div className="grid gap-6">
            {dataSecurity.map((measure, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{measure.measure}</CardTitle>
                  <CardDescription>{measure.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {measure.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transfers" className="mt-8">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>International Data Transfers</CardTitle>
                <CardDescription>
                  We transfer personal data internationally only with appropriate safeguards in place.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {internationalTransfers.map((transfer, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{transfer.destination}</h4>
                        <Globe className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{transfer.purpose}</p>
                      <div className="grid gap-2 md:grid-cols-2">
                        <div>
                          <span className="text-sm font-medium">Safeguards:</span>
                          <p className="text-sm text-gray-600">{transfer.safeguards}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Providers:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {transfer.providers.map((provider, providerIndex) => (
                              <Badge key={providerIndex} variant="outline" className="text-xs">
                                {provider}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>GDPR Questions?</CardTitle>
            <CardDescription>
              Our Data Protection Officer is available to answer any questions about GDPR compliance and your data rights.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>dpo@kyt.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 80 1234 5678</span>
              </div>
            </div>
            <Button>Contact DPO</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}