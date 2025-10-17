'use client'

import { useState } from 'react'
import { Smartphone, Download, Apple, Shield, Zap, Bell, Camera, FileText, Calculator, ChartLine, Users, Star, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function MobileAppPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const features = [
    {
      icon: <Calculator className="h-8 w-8 text-blue-600" />,
      title: "Tax Calculator",
      description: "Quick tax calculations with real-time results",
      category: "Essential"
    },
    {
      icon: <FileText className="h-8 w-8 text-green-600" />,
      title: "Document Scanner",
      description: "Scan and upload tax documents instantly",
      category: "Essential"
    },
    {
      icon: <ChartLine className="h-8 w-8 text-purple-600" />,
      title: "Analytics Dashboard",
      description: "Track your tax savings and financial health",
      category: "Analytics"
    },
    {
      icon: <Bell className="h-8 w-8 text-orange-600" />,
      title: "Smart Notifications",
      description: "Never miss a tax deadline again",
      category: "Notifications"
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: "Expert Consultation",
      description: "Connect with tax professionals",
      category: "Support"
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Secure Storage",
      description: "Bank-level encryption for your documents",
      category: "Security"
    }
  ]

  const appStats = [
    { label: "Downloads", value: "500K+", icon: <Download className="h-4 w-4" /> },
    { label: "Rating", value: "4.8", icon: <Star className="h-4 w-4" /> },
    { label: "Active Users", value: "100K+", icon: <Users className="h-4 w-4" /> },
    { label: "Documents Processed", value: "2M+", icon: <FileText className="h-4 w-4" /> }
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      rating: 5,
      comment: "The mobile app made tax filing so much easier. I can file my GST returns while traveling!",
      platform: "Android"
    },
    {
      name: "Priya Sharma",
      role: "Salaried Professional",
      rating: 5,
      comment: "Love the document scanner feature. No more paperwork hassles!",
      platform: "iOS"
    },
    {
      name: "Amit Patel",
      role: "Chartered Accountant",
      rating: 4,
      comment: "Great tool for quick calculations and client consultations.",
      platform: "Android"
    }
  ]

  const downloadOptions = [
    {
      platform: "iOS",
      icon: <Apple className="h-6 w-6" />,
      store: "App Store",
      version: "2.1.0",
      size: "85 MB",
      requirements: "iOS 12.0 or later",
      features: ["Face ID/Touch ID", "Dark Mode", "Widget Support", "iCloud Sync"]
    },
    {
      platform: "Android",
      icon: <Smartphone className="h-6 w-6" />,
      store: "Google Play",
      version: "2.1.0",
      size: "78 MB",
      requirements: "Android 6.0 or later",
      features: ["Fingerprint Unlock", "Dark Mode", "Widget Support", "Auto Backup"]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">KYT.ai Mobile App</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          File taxes, track refunds, and manage your financial health - all from your smartphone
        </p>
      </div>

      {/* App Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {appStats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                {stat.icon}
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="download">Download</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Why Mobile?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our mobile app brings the power of KYT.ai to your fingertips, making tax management accessible anytime, anywhere.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Fast and intuitive interface</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Bank-level security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Smart notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Document scanning</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">File taxes in minutes, not hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Real-time tax calculations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Track refund status instantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Access to tax experts 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Offline mode for remote areas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    {feature.icon}
                    <Badge variant="outline">{feature.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="download" className="mt-8">
          <div className="grid gap-8 md:grid-cols-2">
            {downloadOptions.map((option, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {option.icon}
                    <div>
                      <CardTitle>{option.platform}</CardTitle>
                      <CardDescription>{option.store}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Version:</span>
                        <p>{option.version}</p>
                      </div>
                      <div>
                        <span className="font-medium">Size:</span>
                        <p>{option.size}</p>
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium text-sm">Requirements:</span>
                      <p className="text-sm text-gray-600">{option.requirements}</p>
                    </div>
                    
                    <div>
                      <span className="font-medium text-sm">Features:</span>
                      <ul className="mt-2 space-y-1">
                        {option.features.map((feature, featIndex) => (
                          <li key={featIndex} className="text-sm text-gray-600">• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download from {option.store}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-8">
          <div className="grid gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Badge variant="outline" className="ml-2">{testimonial.platform}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Ready to Get Started?</CardTitle>
            <CardDescription>
              Download the KYT.ai mobile app and experience hassle-free tax management.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 justify-center">
            <Button>
              <Apple className="h-4 w-4 mr-2" />
              App Store
            </Button>
            <Button variant="outline">
              <Smartphone className="h-4 w-4 mr-2" />
              Google Play
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}