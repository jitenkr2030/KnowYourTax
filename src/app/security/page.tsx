'use client'

import { useState } from 'react'
import { Shield, Lock, Key, Eye, Server, Database, AlertTriangle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const securityFeatures = [
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "End-to-End Encryption",
      description: "All data is encrypted using AES-256 encryption both in transit and at rest",
      status: "active",
      level: "Critical"
    },
    {
      icon: <Lock className="h-8 w-8 text-blue-600" />,
      title: "Multi-Factor Authentication",
      description: "Secure your account with 2FA using SMS, email, or authenticator apps",
      status: "active",
      level: "High"
    },
    {
      icon: <Key className="h-8 w-8 text-purple-600" />,
      title: "API Security",
      description: "OAuth 2.0 and JWT tokens for secure API access",
      status: "active",
      level: "High"
    },
    {
      icon: <Eye className="h-8 w-8 text-orange-600" />,
      title: "Activity Monitoring",
      description: "Real-time monitoring of all user activities and system events",
      status: "active",
      level: "Medium"
    },
    {
      icon: <Server className="h-8 w-8 text-red-600" />,
      title: "Infrastructure Security",
      description: "Secure cloud infrastructure with regular security audits",
      status: "active",
      level: "High"
    },
    {
      icon: <Database className="h-8 w-8 text-indigo-600" />,
      title: "Data Protection",
      description: "Regular backups and disaster recovery protocols",
      status: "active",
      level: "Critical"
    }
  ]

  const complianceStandards = [
    {
      name: "ISO 27001",
      description: "International standard for information security management",
      status: "certified",
      date: "Valid until 2025"
    },
    {
      name: "SOC 2 Type II",
      description: "Service Organization Control 2 compliance",
      status: "certified",
      date: "Annual audit completed"
    },
    {
      name: "GDPR",
      description: "General Data Protection Regulation compliance",
      status: "compliant",
      date: "Regular reviews"
    },
    {
      name: "PCI DSS",
      description: "Payment Card Industry Data Security Standard",
      status: "compliant",
      date: "Level 1 certified"
    }
  ]

  const securityMeasures = [
    {
      category: "Network Security",
      measures: [
        "SSL/TLS encryption for all communications",
        "Firewall protection and intrusion detection",
        "DDoS protection and mitigation",
        "Regular vulnerability scanning"
      ]
    },
    {
      category: "Application Security",
      measures: [
        "Secure coding practices",
        "Regular security audits and penetration testing",
        "Input validation and sanitization",
        "Session management and CSRF protection"
      ]
    },
    {
      category: "Data Security",
      measures: [
        "Encryption at rest and in transit",
        "Data access controls and permissions",
        "Regular data backups",
        "Secure data disposal procedures"
      ]
    },
    {
      category: "Operational Security",
      measures: [
        "24/7 security monitoring",
        "Incident response procedures",
        "Employee security training",
        "Business continuity planning"
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Security & Privacy</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Enterprise-grade security measures to protect your sensitive tax data and ensure compliance with Indian regulations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Security Features</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="measures">Security Measures</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security First Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  At KYT.ai, security is our top priority. We implement industry-leading security measures to protect your sensitive tax data and ensure compliance with Indian tax regulations.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">256-bit encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Regular security audits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Compliance with Indian regulations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our comprehensive risk management framework ensures that your data is protected against evolving threats and vulnerabilities.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Real-time threat monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Incident response team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Business continuity planning</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    {feature.icon}
                    <Badge variant={feature.status === 'active' ? 'default' : 'secondary'}>
                      {feature.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                  <div className="mt-4">
                    <Badge variant="outline" className="text-xs">
                      {feature.level} Priority
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {complianceStandards.map((standard, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{standard.name}</CardTitle>
                    <Badge variant={standard.status === 'certified' ? 'default' : 'secondary'}>
                      {standard.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-2">
                    {standard.description}
                  </CardDescription>
                  <p className="text-xs text-gray-500">{standard.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="measures" className="mt-8">
          <div className="grid gap-6">
            {securityMeasures.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {category.measures.map((measure, measureIndex) => (
                      <div key={measureIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{measure}</span>
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
            <CardTitle>Security Questions?</CardTitle>
            <CardDescription>
              Our security team is available 24/7 to address any concerns about data protection and privacy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Contact Security Team</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}