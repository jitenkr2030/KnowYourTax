'use client'

import { useState } from 'react'
import { Briefcase, MapPin, Clock, DollarSign, Users, Building2, Award, TrendingUp, Heart, CheckCircle, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CareersPage() {
  const [activeDepartment, setActiveDepartment] = useState('all')

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Tax Analyst",
      department: "Tax Operations",
      location: "Bangalore",
      type: "Full-time",
      experience: "5-8 years",
      salary: "₹15-25 LPA",
      description: "Looking for an experienced tax analyst to join our tax operations team and help clients with complex tax compliance matters.",
      requirements: [
        "CA/CS/CMA qualification preferred",
        "5+ years in tax compliance",
        "Knowledge of Indian tax laws",
        "Strong analytical skills"
      ],
      benefits: ["Health Insurance", "PF & ESIC", "Flexible Work Hours", "Professional Development"],
      posted: "2 days ago",
      urgent: true
    },
    {
      id: 2,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Mumbai",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹12-20 LPA",
      description: "We're seeking a talented full stack developer to help build and scale our tax compliance platform.",
      requirements: [
        "Experience with React, Node.js",
        "Knowledge of TypeScript",
        "Familiarity with cloud platforms",
        "Strong problem-solving skills"
      ],
      benefits: ["Health Insurance", "Stock Options", "Remote Work", "Learning Budget"],
      posted: "1 week ago",
      urgent: false
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "Bangalore",
      type: "Full-time",
      experience: "4-7 years",
      salary: "₹18-30 LPA",
      description: "Lead product development for our tax compliance platform and work with cross-functional teams.",
      requirements: [
        "4+ years in product management",
        "Experience in fintech/tax tech",
        "Strong analytical and communication skills",
        "MBA preferred"
      ],
      benefits: ["Health Insurance", "Stock Options", "Flexible Work", "Professional Development"],
      posted: "3 days ago",
      urgent: true
    },
    {
      id: 4,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Delhi",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹8-15 LPA",
      description: "Help our customers get the most out of KYT.ai and ensure their success with our platform.",
      requirements: [
        "2+ years in customer success",
        "Knowledge of tax compliance preferred",
        "Excellent communication skills",
        "Problem-solving attitude"
      ],
      benefits: ["Health Insurance", "Performance Bonus", "Flexible Work", "Training Programs"],
      posted: "1 week ago",
      urgent: false
    },
    {
      id: 5,
      title: "Data Scientist",
      department: "Data Science",
      location: "Bangalore",
      type: "Full-time",
      experience: "3-6 years",
      salary: "₹15-25 LPA",
      description: "Apply machine learning and data analysis to improve our tax optimization algorithms.",
      requirements: [
        "PhD/Masters in relevant field",
        "Experience with ML/AI",
        "Strong programming skills (Python/R)",
        "Knowledge of statistics"
      ],
      benefits: ["Health Insurance", "Stock Options", "Research Budget", "Conference Access"],
      posted: "4 days ago",
      urgent: false
    },
    {
      id: 6,
      title: "Marketing Manager",
      department: "Marketing",
      location: "Mumbai",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹10-18 LPA",
      description: "Lead marketing initiatives to grow KYT.ai's presence in the Indian tax compliance market.",
      requirements: [
        "3+ years in marketing",
        "Experience in B2B SaaS preferred",
        "Digital marketing expertise",
        "Strong analytical skills"
      ],
      benefits: ["Health Insurance", "Performance Bonus", "Flexible Work", "Marketing Budget"],
      posted: "5 days ago",
      urgent: false
    }
  ]

  const departments = [
    { id: 'all', name: 'All Departments', count: 6 },
    { id: 'Tax Operations', name: 'Tax Operations', count: 1 },
    { id: 'Engineering', name: 'Engineering', count: 1 },
    { id: 'Product', name: 'Product', count: 1 },
    { id: 'Customer Success', name: 'Customer Success', count: 1 },
    { id: 'Data Science', name: 'Data Science', count: 1 },
    { id: 'Marketing', name: 'Marketing', count: 1 }
  ]

  const companyBenefits = [
    {
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs",
      icon: <Heart className="h-6 w-6 text-red-500" />
    },
    {
      title: "Financial Security",
      description: "Competitive salaries, stock options, and retirement planning",
      icon: <DollarSign className="h-6 w-6 text-green-500" />
    },
    {
      title: "Work-Life Balance",
      description: "Flexible work hours, remote work options, and generous PTO",
      icon: <Clock className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Growth & Development",
      description: "Learning budget, mentorship programs, and career advancement",
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />
    }
  ]

  const cultureValues = [
    {
      title: "Innovation First",
      description: "We encourage creative thinking and innovative solutions to complex tax problems",
      icon: <Star className="h-6 w-6 text-yellow-500" />
    },
    {
      title: "Customer Obsessed",
      description: "Our customers' success is our success - we go above and beyond to help them",
      icon: <Users className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Integrity Always",
      description: "We maintain the highest standards of ethics and transparency in everything we do",
      icon: <CheckCircle className="h-6 w-6 text-green-500" />
    },
    {
      title: "Collaborative Spirit",
      description: "We work together as one team, supporting and learning from each other",
      icon: <Building2 className="h-6 w-6 text-indigo-500" />
    }
  ]

  const filteredJobs = jobOpenings.filter(job => 
    activeDepartment === 'all' || job.department === activeDepartment
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Careers at KYT.ai</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join our team and help revolutionize tax compliance in India. We're looking for passionate individuals who want to make a difference.
        </p>
      </div>

      <Tabs defaultValue="openings" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="openings">Job Openings</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
          <TabsTrigger value="process">Hiring Process</TabsTrigger>
        </TabsList>

        <TabsContent value="openings" className="mt-8">
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Department Filter */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Departments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {departments.map((dept) => (
                      <button
                        key={dept.id}
                        onClick={() => setActiveDepartment(dept.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                          activeDepartment === dept.id ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        <span className="text-sm font-medium">{dept.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {dept.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Job Listings */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-xl">{job.title}</CardTitle>
                            {job.urgent && (
                              <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-green-600">{job.salary}</p>
                          <p className="text-sm text-gray-500">{job.experience}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base mb-4">
                        {job.description}
                      </CardDescription>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Requirements:</h4>
                          <ul className="space-y-1">
                            {job.requirements.map((req, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Benefits:</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.benefits.map((benefit, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6 pt-4 border-t">
                        <span className="text-sm text-gray-500">Posted {job.posted}</span>
                        <Button>Apply Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="benefits" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {companyBenefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {benefit.icon}
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Additional Perks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Free meals and snacks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Transportation allowance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Team outings and events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Employee referral program</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Professional development budget</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Parental leave benefits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Sabbatical programs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Employee stock options</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="culture" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {cultureValues.map((value, index) => (
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
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Life at KYT.ai</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                At KYT.ai, we believe in creating an environment where everyone can thrive. Our culture is built on collaboration, innovation, and a shared passion for making tax compliance simple and accessible.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">150+</div>
                  <p className="text-sm text-gray-600">Team Members</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">4.8</div>
                  <p className="text-sm text-gray-600">Employee Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
                  <p className="text-sm text-gray-600">Employee Retention</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="mt-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Our Hiring Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Application Review</h4>
                      <p className="text-sm text-gray-600">We review your application and qualifications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Initial Screening</h4>
                      <p className="text-sm text-gray-600">Phone or video call with HR</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Technical Interview</h4>
                      <p className="text-sm text-gray-600">In-depth discussion with the team</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Final Interview</h4>
                      <p className="text-sm text-gray-600">Meeting with leadership team</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium">5</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Offer & Onboarding</h4>
                      <p className="text-sm text-gray-600">Welcome to the team!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What We Look For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Passion for Problem-Solving</h4>
                      <p className="text-sm text-gray-600">Love tackling complex challenges</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Collaborative Spirit</h4>
                      <p className="text-sm text-gray-600">Work well in team environments</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Customer Focus</h4>
                      <p className="text-sm text-gray-600">Understand and prioritize customer needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Continuous Learning</h4>
                      <p className="text-sm text-gray-600">Eager to learn and grow</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Integrity</h4>
                      <p className="text-sm text-gray-600">Strong ethical principles</p>
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
            <CardTitle>Ready to Join Us?</CardTitle>
            <CardDescription>
              We're always looking for talented individuals who share our passion for innovation and customer success.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg">Explore All Opportunities</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}