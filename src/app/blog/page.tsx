'use client'

import { useState } from 'react'
import { Calendar, User, Tag, Search, Clock, Eye, Heart, MessageCircle, Share2, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const blogPosts = [
    {
      id: 1,
      title: "Understanding GST Filing: A Complete Guide for 2024",
      excerpt: "Everything you need to know about GST filing deadlines, procedures, and best practices for the current financial year.",
      content: "Comprehensive guide covering GST filing requirements, deadlines, and procedures for 2024...",
      author: "Rajesh Sharma",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "GST",
      tags: ["GST", "Filing", "2024", "Guide"],
      views: 1250,
      likes: 89,
      comments: 23,
      featured: true
    },
    {
      id: 2,
      title: "Income Tax Slabs 2024: What's New and How It Affects You",
      excerpt: "Latest updates on income tax slabs, deductions, and how the new budget impacts your tax planning.",
      content: "Detailed analysis of the new income tax slabs and their implications for taxpayers...",
      author: "Priya Patel",
      date: "March 12, 2024",
      readTime: "6 min read",
      category: "Income Tax",
      tags: ["Income Tax", "Budget 2024", "Tax Slabs", "Planning"],
      views: 980,
      likes: 67,
      comments: 15,
      featured: true
    },
    {
      id: 3,
      title: "TDS Deductions Made Simple: A Guide for Employers",
      excerpt: "Step-by-step guide for employers on TDS calculations, deadlines, and compliance requirements.",
      content: "Complete guide for employers on TDS deductions, calculations, and compliance...",
      author: "Amit Kumar",
      date: "March 10, 2024",
      readTime: "10 min read",
      category: "TDS",
      tags: ["TDS", "Employers", "Compliance", "Deductions"],
      views: 756,
      likes: 45,
      comments: 8,
      featured: false
    },
    {
      id: 4,
      title: "Tax Saving Strategies for Salaried Professionals",
      excerpt: "Maximize your tax savings with these proven strategies specifically designed for salaried individuals.",
      content: "Effective tax saving strategies and investment options for salaried professionals...",
      author: "Sneha Reddy",
      date: "March 8, 2024",
      readTime: "7 min read",
      category: "Tax Planning",
      tags: ["Tax Saving", "Salaried", "Investments", "Deductions"],
      views: 1100,
      likes: 78,
      comments: 19,
      featured: false
    },
    {
      id: 5,
      title: "Digital Tax Payments: A Complete Guide",
      excerpt: "How to make tax payments online safely and efficiently, including step-by-step instructions.",
      content: "Comprehensive guide to digital tax payments, security measures, and best practices...",
      author: "Rajesh Sharma",
      date: "March 5, 2024",
      readTime: "5 min read",
      category: "Technology",
      tags: ["Digital Payments", "Online Tax", "Security", "Guide"],
      views: 645,
      likes: 34,
      comments: 6,
      featured: false
    },
    {
      id: 6,
      title: "Common Tax Mistakes to Avoid in 2024",
      excerpt: "Learn about the most common tax filing mistakes and how to avoid them to ensure smooth compliance.",
      content: "Analysis of common tax filing errors and tips to avoid them...",
      author: "Priya Patel",
      date: "March 3, 2024",
      readTime: "9 min read",
      category: "Tips",
      tags: ["Mistakes", "Compliance", "Filing", "2024"],
      views: 1320,
      likes: 95,
      comments: 27,
      featured: true
    }
  ]

  const categories = [
    { id: 'all', name: 'All Posts', count: 6 },
    { id: 'GST', name: 'GST', count: 1 },
    { id: 'Income Tax', name: 'Income Tax', count: 1 },
    { id: 'TDS', name: 'TDS', count: 1 },
    { id: 'Tax Planning', name: 'Tax Planning', count: 1 },
    { id: 'Technology', name: 'Technology', count: 1 },
    { id: 'Tips', name: 'Tips', count: 1 }
  ]

  const popularTags = [
    "GST", "Income Tax", "TDS", "Tax Planning", "Filing", "2024", "Deductions", "Compliance"
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">KYT.ai Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Expert insights, tax tips, and latest updates on Indian tax laws and compliance
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                      activeCategory === category.id ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Featured Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="space-y-2">
                    <h4 className="text-sm font-medium line-clamp-2">{post.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="latest" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="latest">Latest Posts</TabsTrigger>
              <TabsTrigger value="popular">Popular Posts</TabsTrigger>
            </TabsList>

            <TabsContent value="latest" className="mt-6">
              <div className="grid gap-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{post.category}</Badge>
                            {post.featured && (
                              <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                            )}
                          </div>
                          <CardTitle className="text-xl hover:text-blue-600 cursor-pointer">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {post.excerpt}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-6">
              <div className="grid gap-6">
                {blogPosts
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 6)
                  .map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{post.category}</Badge>
                              {post.featured && (
                                <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl hover:text-blue-600 cursor-pointer">
                              {post.title}
                            </CardTitle>
                            <CardDescription className="text-base">
                              {post.excerpt}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="mt-12">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Stay Updated</CardTitle>
            <CardDescription className="text-lg">
              Subscribe to our newsletter for the latest tax tips and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" />
            <Button>Subscribe</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}