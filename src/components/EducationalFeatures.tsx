"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BookOpen, 
  GraduationCap, 
  Video, 
  Podcast, 
  FileText,
  Calculator,
  TrendingUp,
  Users,
  Award,
  Clock,
  Star,
  Play,
  Download,
  Search,
  Filter
} from "lucide-react"

interface EducationalFeaturesProps {
  userId: string
  onBack: () => void
}

export default function EducationalFeatures({ userId, onBack }: EducationalFeaturesProps) {
  const [activeTab, setActiveTab] = useState("courses")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Income Tax Basics for Beginners",
      description: "Learn the fundamentals of income tax in India",
      category: "basics",
      difficulty: "beginner",
      duration: "2 hours",
      lessons: 12,
      rating: 4.8,
      students: 15420,
      instructor: "CA Rajesh Sharma",
      image: "/api/placeholder/300/200",
      progress: 0
    },
    {
      id: 2,
      title: "Advanced Tax Planning Strategies",
      description: "Master advanced tax saving and planning techniques",
      category: "advanced",
      difficulty: "advanced",
      duration: "4 hours",
      lessons: 24,
      rating: 4.9,
      students: 8930,
      instructor: "CA Priya Patel",
      image: "/api/placeholder/300/200",
      progress: 0
    },
    {
      id: 3,
      title: "GST Compliance for Small Businesses",
      description: "Complete guide to GST registration and compliance",
      category: "gst",
      difficulty: "intermediate",
      duration: "3 hours",
      lessons: 18,
      rating: 4.7,
      students: 12100,
      instructor: "CA Amit Kumar",
      image: "/api/placeholder/300/200",
      progress: 0
    },
    {
      id: 4,
      title: "Tax Deductions at Source (TDS)",
      description: "Understanding TDS provisions and compliance",
      category: "tds",
      difficulty: "intermediate",
      duration: "2.5 hours",
      lessons: 15,
      rating: 4.6,
      students: 9870,
      instructor: "CA Neha Singh",
      image: "/api/placeholder/300/200",
      progress: 0
    }
  ]

  const videos = [
    {
      id: 1,
      title: "How to File ITR-1 for Salaried Individuals",
      description: "Step-by-step guide to filing your income tax return",
      duration: "15:30",
      views: 45230,
      likes: 1234,
      category: "filing",
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Section 80C Deductions Explained",
      description: "Maximize your tax savings under Section 80C",
      duration: "12:45",
      views: 38920,
      likes: 987,
      category: "deductions",
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "New vs Old Tax Regime: Which is Better?",
      description: "Compare and choose the best tax regime for you",
      duration: "18:20",
      views: 52180,
      likes: 1456,
      category: "regime",
      thumbnail: "/api/placeholder/300/200"
    }
  ]

  const articles = [
    {
      id: 1,
      title: "Budget 2024: Key Tax Changes Explained",
      excerpt: "Understanding the latest tax amendments and their impact",
      readTime: "8 min read",
      category: "budget",
      publishDate: "2024-02-01",
      author: "Tax Expert Team"
    },
    {
      id: 2,
      title: "Top 10 Tax Saving Instruments for 2024",
      excerpt: "Best investment options to reduce your tax liability",
      readTime: "12 min read",
      category: "savings",
      publishDate: "2024-01-25",
      author: "Financial Advisors"
    },
    {
      id: 3,
      title: "Common Tax Filing Mistakes to Avoid",
      excerpt: "Don't make these errors when filing your tax returns",
      readTime: "6 min read",
      category: "mistakes",
      publishDate: "2024-01-20",
      author: "CA Team"
    }
  ]

  const calculators = [
    {
      id: 1,
      title: "Tax Liability Calculator",
      description: "Calculate your exact tax liability",
      icon: Calculator,
      category: "calculation"
    },
    {
      id: 2,
      title: "HRA Exemption Calculator",
      description: "Calculate House Rent Allowance exemption",
      icon: Calculator,
      category: "hra"
    },
    {
      id: 3,
      title: "Capital Gains Calculator",
      description: "Calculate tax on capital gains",
      icon: Calculator,
      category: "capital"
    },
    {
      id: 4,
      title: "TDS Calculator",
      description: "Calculate Tax Deducted at Source",
      icon: Calculator,
      category: "tds"
    }
  ]

  const webinars = [
    {
      id: 1,
      title: "Tax Planning for Freelancers",
      date: "2024-03-15",
      time: "6:00 PM IST",
      speaker: "CA Ananya Reddy",
      participants: 234,
      maxParticipants: 500,
      status: "upcoming"
    },
    {
      id: 2,
      title: "GST Return Filing Masterclass",
      date: "2024-03-20",
      time: "7:00 PM IST",
      speaker: "CA Vikram Mehta",
      participants: 189,
      maxParticipants: 1000,
      status: "upcoming"
    }
  ]

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "basics", name: "Basics" },
    { id: "advanced", name: "Advanced" },
    { id: "gst", name: "GST" },
    { id: "tds", name: "TDS" },
    { id: "filing", name: "Filing" },
    { id: "deductions", name: "Deductions" }
  ]

  const difficulties = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tax Education Center</h1>
          <p className="text-slate-600 dark:text-slate-400">Learn, understand, and master Indian taxation</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search courses, videos, articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Courses</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Videos</span>
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Articles</span>
          </TabsTrigger>
          <TabsTrigger value="calculators" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">Calculators</span>
          </TabsTrigger>
          <TabsTrigger value="webinars" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Webinars</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={course.difficulty === "beginner" ? "secondary" : course.difficulty === "intermediate" ? "default" : "destructive"}>
                      {course.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.lessons} lessons
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                    Instructor: {course.instructor}
                  </div>
                  
                  <Button className="w-full" size="sm">
                    {course.progress > 0 ? "Continue" : "Start Learning"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center relative">
                  <Play className="h-12 w-12 text-white" />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <div>{video.views.toLocaleString()} views</div>
                    <div>{video.likes.toLocaleString()} likes</div>
                  </div>
                  
                  <Button className="w-full" size="sm">
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-6">
          <div className="space-y-4">
            {articles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline">{article.category}</Badge>
                    <span className="text-sm text-slate-500">{article.publishDate}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                      By {article.author} • {article.readTime}
                    </div>
                    <Button variant="outline" size="sm">
                      Read Article
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calculators" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {calculators.map((calculator) => (
              <Card key={calculator.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <calculator.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">{calculator.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {calculator.description}
                  </p>
                  <Button className="w-full" size="sm">
                    Use Calculator
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webinars" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {webinars.map((webinar) => (
              <Card key={webinar.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={webinar.status === "upcoming" ? "default" : "secondary"}>
                      {webinar.status}
                    </Badge>
                    <Award className="h-4 w-4 text-yellow-500" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{webinar.title}</h3>
                  
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {webinar.date} at {webinar.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Speaker: {webinar.speaker}
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      {webinar.participants}/{webinar.maxParticipants} participants
                    </div>
                  </div>
                  
                  <Button className="w-full" size="sm">
                    {webinar.status === "upcoming" ? "Register Now" : "View Recording"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Your Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Courses Completed</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Hours Learned</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Certificates Earned</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">Beginner</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Current Level</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Missing import
import { Calendar } from "lucide-react"