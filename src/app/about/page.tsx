'use client'

import { useState } from 'react'
import { Building2, Users, Award, Target, Lightbulb, Heart, Globe, CheckCircle, Star, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story')

  const teamMembers = [
    {
      name: "Rajesh Sharma",
      role: "CEO & Founder",
      bio: "Former CA with 15+ years in tax compliance",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Priya Patel",
      role: "CTO",
      bio: "Tech expert specializing in fintech solutions",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Amit Kumar",
      role: "Head of Tax Operations",
      bio: "Ex-tax department official with 20 years experience",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Sneha Reddy",
      role: "VP of Customer Success",
      bio: "Dedicated to making tax filing simple for everyone",
      image: "/api/placeholder/150/150"
    }
  ]

  const milestones = [
    {
      year: "2019",
      title: "Founded",
      description: "KYT.ai was founded with a mission to simplify tax compliance in India",
      icon: <Building2 className="h-8 w-8 text-blue-600" />
    },
    {
      year: "2020",
      title: "First Product Launch",
      description: "Launched our initial tax filing platform for individual taxpayers",
      icon: <Target className="h-8 w-8 text-green-600" />
    },
    {
      year: "2021",
      title: "Series A Funding",
      description: "Raised $5M in Series A to expand our team and technology",
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />
    },
    {
      year: "2022",
      title: "GST Integration",
      description: "Launched comprehensive GST management for businesses",
      icon: <Award className="h-8 w-8 text-orange-600" />
    },
    {
      year: "2023",
      title: "Mobile App Launch",
      description: "Released iOS and Android apps for on-the-go tax management",
      icon: <Users className="h-8 w-8 text-red-600" />
    },
    {
      year: "2024",
      title: "AI-Powered Features",
      description: "Introduced AI-driven tax optimization and advisory services",
      icon: <Lightbulb className="h-8 w-8 text-indigo-600" />
    }
  ]

  const values = [
    {
      title: "Simplicity",
      description: "Making complex tax processes simple and accessible to everyone",
      icon: <Heart className="h-6 w-6 text-red-500" />
    },
    {
      title: "Innovation",
      description: "Leveraging technology to solve traditional tax challenges",
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />
    },
    {
      title: "Integrity",
      description: "Maintaining the highest standards of ethics and transparency",
      icon: <CheckCircle className="h-6 w-6 text-green-500" />
    },
    {
      title: "Customer Focus",
      description: "Putting our users' needs at the center of everything we do",
      icon: <Users className="h-6 w-6 text-blue-500" />
    }
  ]

  const stats = [
    { label: "Happy Customers", value: "500K+", icon: <Users className="h-4 w-4" /> },
    { label: "Tax Returns Filed", value: "2M+", icon: <Award className="h-4 w-4" /> },
    { label: "Team Members", value: "150+", icon: <Building2 className="h-4 w-4" /> },
    { label: "Cities Served", value: "500+", icon: <Globe className="h-4 w-4" /> }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About KYT.ai</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Revolutionizing tax compliance in India through technology, innovation, and customer-centric solutions
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, index) => (
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
          <TabsTrigger value="story">Our Story</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="values">Values</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="story" className="mt-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  At KYT.ai, we're on a mission to make tax compliance simple, accessible, and stress-free for every Indian citizen and business. 
                </p>
                <p className="text-gray-600 mb-4">
                  Founded in 2019 by a team of tax professionals and technology experts, we recognized the need for a modern, user-friendly platform that could handle the complexities of the Indian tax system.
                </p>
                <p className="text-gray-600">
                  Today, we serve over 500,000 customers across India, helping them file taxes, manage compliance, and optimize their financial health through our innovative technology solutions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We envision a future where tax compliance is no longer a burden but a seamless part of financial management for every Indian.
                </p>
                <p className="text-gray-600 mb-4">
                  Through continuous innovation and a deep understanding of the Indian tax landscape, we're building the most comprehensive tax compliance platform in the country.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">AI-powered tax optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Real-time compliance monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Expert guidance and support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-10 w-10 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="values" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {value.icon}
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="mt-8">
          <div className="grid gap-4">
            {milestones.map((milestone, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {milestone.icon}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{milestone.title}</CardTitle>
                        <Badge variant="outline">{milestone.year}</Badge>
                      </div>
                      <CardDescription className="mt-2">
                        {milestone.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Join Our Journey</CardTitle>
            <CardDescription>
              Be part of the tax compliance revolution in India. Whether you're a customer, partner, or team member, we'd love to have you with us.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 justify-center">
            <Button>Get Started</Button>
            <Button variant="outline">Contact Us</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}