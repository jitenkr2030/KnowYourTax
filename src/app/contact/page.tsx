'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, MessageSquare, Users, Building2, Send, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const officeLocations = [
    {
      city: "Bangalore",
      address: "KYT.ai Headquarters, 123 Tech Park, Electronic City, Bangalore - 560100",
      phone: "+91 80 1234 5678",
      email: "bangalore@kyt.ai",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM",
      map: "https://maps.google.com/?q=KYT.ai+Bangalore"
    },
    {
      city: "Mumbai",
      address: "KYT.ai Office, 456 Business Hub, Bandra Kurla Complex, Mumbai - 400051",
      phone: "+91 22 2345 6789",
      email: "mumbai@kyt.ai",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM",
      map: "https://maps.google.com/?q=KYT.ai+Mumbai"
    },
    {
      city: "Delhi",
      address: "KYT.ai Office, 789 Connaught Place, New Delhi - 110001",
      phone: "+91 11 3456 7890",
      email: "delhi@kyt.ai",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM",
      map: "https://maps.google.com/?q=KYT.ai+Delhi"
    }
  ]

  const supportTeams = [
    {
      name: "Technical Support",
      description: "For technical issues, bugs, and platform assistance",
      email: "support@kyt.ai",
      phone: "+91 80 1234 5678",
      responseTime: "Within 24 hours",
      available: "24/7"
    },
    {
      name: "Tax Advisory",
      description: "For tax-related queries and expert advice",
      email: "tax@kyt.ai",
      phone: "+91 80 2345 6789",
      responseTime: "Within 48 hours",
      available: "Mon - Sat: 9 AM - 6 PM"
    },
    {
      name: "Sales & Partnerships",
      description: "For business inquiries and partnership opportunities",
      email: "sales@kyt.ai",
      phone: "+91 80 3456 7890",
      responseTime: "Within 12 hours",
      available: "Mon - Fri: 9 AM - 6 PM"
    },
    {
      name: "Customer Success",
      description: "For account management and customer success",
      email: "success@kyt.ai",
      phone: "+91 80 4567 8901",
      responseTime: "Within 24 hours",
      available: "Mon - Fri: 9 AM - 6 PM"
    }
  ]

  const faqs = [
    {
      question: "How can I reset my password?",
      answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email."
    },
    {
      question: "What documents do I need for tax filing?",
      answer: "You'll need Form 16, bank statements, investment proofs, and other relevant financial documents."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach us via email at support@kyt.ai, call us at +91 80 1234 5678, or use the live chat feature."
    },
    {
      question: "Is my data secure with KYT.ai?",
      answer: "Yes, we use bank-level encryption and follow strict security protocols to protect your data."
    },
    {
      question: "What are your support hours?",
      answer: "Technical support is available 24/7. Other teams are available Monday to Friday, 9 AM to 6 PM."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription from your account settings or by contacting our support team."
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're here to help! Reach out to our team for any questions, support, or partnership inquiries.
        </p>
      </div>

      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contact">Contact Form</TabsTrigger>
          <TabsTrigger value="offices">Our Offices</TabsTrigger>
          <TabsTrigger value="support">Support Teams</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="mt-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Contact</CardTitle>
                <CardDescription>
                  Get in touch with us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-gray-600">+91 80 1234 5678</p>
                      <p className="text-xs text-gray-500">24/7 Technical Support</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-gray-600">support@kyt.ai</p>
                      <p className="text-xs text-gray-500">Response within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-gray-600">Available on our website</p>
                      <p className="text-xs text-gray-500">Mon - Fri: 9 AM - 6 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-xs text-gray-500">Saturday: 9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Emergency Support</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    For urgent technical issues, call our emergency support line:
                  </p>
                  <p className="font-semibold text-blue-600">+91 80 9999 8888</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="offices" className="mt-8">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {officeLocations.map((office, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {office.city}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{office.address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{office.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{office.email}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{office.hours}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View on Map
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="support" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {supportTeams.map((team, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {team.name}
                  </CardTitle>
                  <CardDescription>{team.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{team.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{team.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Response: {team.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Available: {team.available}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Contact Team
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="mt-8">
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Still Have Questions?</CardTitle>
            <CardDescription>
              Can't find what you're looking for? Our support team is here to help you 24/7.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 justify-center">
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Start Live Chat
            </Button>
            <Button variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Call Us
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}