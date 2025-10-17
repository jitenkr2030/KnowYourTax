"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Users, 
  TrendingUp, 
  Award, 
  MessageSquare, 
  Share2, 
  Heart, 
  ThumbsUp,
  ThumbsDown,
  Star,
  Building,
  MapPin,
  Briefcase,
  GraduationCap,
  Target,
  Globe,
  Trophy,
  Clock,
  Eye,
  Bookmark,
  Send,
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Shield,
  Lightbulb
} from "lucide-react"

interface SocialCommunityFeaturesProps {
  userId: string
}

interface LeaderboardEntry {
  id: string
  rank: number
  name: string
  avatar?: string
  incomeBracket: string
  taxEfficiency: number
  totalTaxes: number
  savings: number
  state: string
  isCurrentUser: boolean
}

interface TaxTip {
  id: string
  title: string
  content: string
  category: string
  author: {
    name: string
    avatar?: string
    expertise: string
  }
  likes: number
  dislikes: number
  comments: number
  shares: number
  createdAt: Date
  tags: string[]
  isVerified: boolean
}

interface Expert {
  id: string
  name: string
  avatar?: string
  expertise: string
  experience: string
  rating: number
  reviews: number
  consultationFee: number
  availability: string
  specialties: string[]
  isVerified: boolean
}

interface ImpactStory {
  id: string
  title: string
  description: string
  category: string
  location: string
  impact: string
  amount: number
  beneficiaries: number
  imageUrl?: string
  createdAt: Date
  verified: boolean
}

const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: '1',
    rank: 1,
    name: 'Rajesh Kumar',
    incomeBracket: '15-20 LPA',
    taxEfficiency: 92,
    totalTaxes: 185000,
    savings: 45000,
    state: 'Maharashtra',
    isCurrentUser: false
  },
  {
    id: '2',
    rank: 2,
    name: 'Priya Sharma',
    incomeBracket: '10-15 LPA',
    taxEfficiency: 88,
    totalTaxes: 145000,
    savings: 38000,
    state: 'Karnataka',
    isCurrentUser: false
  },
  {
    id: '3',
    rank: 3,
    name: 'You',
    incomeBracket: '10-15 LPA',
    taxEfficiency: 85,
    totalTaxes: 125000,
    savings: 35000,
    state: 'Maharashtra',
    isCurrentUser: true
  },
  {
    id: '4',
    rank: 4,
    name: 'Amit Patel',
    incomeBracket: '15-20 LPA',
    taxEfficiency: 82,
    totalTaxes: 195000,
    savings: 42000,
    state: 'Gujarat',
    isCurrentUser: false
  },
  {
    id: '5',
    rank: 5,
    name: 'Sneha Reddy',
    incomeBracket: '5-10 LPA',
    taxEfficiency: 78,
    totalTaxes: 95000,
    savings: 28000,
    state: 'Telangana',
    isCurrentUser: false
  }
]

const SAMPLE_TAX_TIPS: TaxTip[] = [
  {
    id: '1',
    title: 'Maximize HRA Benefits',
    content: 'If you live in a rented house, make sure to claim HRA exemption. Submit rent receipts and landlord\'s PAN to your employer. You can save up to ₹60,000 annually depending on your salary and rent amount.',
    category: 'Housing',
    author: {
      name: 'CA Ankit Verma',
      expertise: 'Tax Planning',
      avatar: ''
    },
    likes: 245,
    dislikes: 3,
    comments: 18,
    shares: 12,
    createdAt: new Date('2024-01-15'),
    tags: ['HRA', 'House Rent', 'Tax Saving'],
    isVerified: true
  },
  {
    id: '2',
    title: 'ELSS vs PPF: Which is Better?',
    content: 'ELSS offers higher returns (12-15%) with 3-year lock-in, while PPF gives guaranteed 7-8% with 15-year lock-in. Choose ELSS for aggressive growth and PPF for safety. Both offer 80C benefits.',
    category: 'Investments',
    author: {
      name: 'Financial Guru',
      expertise: 'Investment Advisor',
      avatar: ''
    },
    likes: 189,
    dislikes: 8,
    comments: 25,
    shares: 15,
    createdAt: new Date('2024-01-12'),
    tags: ['ELSS', 'PPF', '80C', 'Investment'],
    isVerified: true
  },
  {
    id: '3',
    title: 'Don\'t Forget Standard Deduction',
    content: 'Salaried individuals get ₹50,000 standard deduction automatically. No need to submit proofs. This reduces your taxable salary by ₹50,000 before applying tax slabs.',
    category: 'Income Tax',
    author: {
      name: 'Tax Helper',
      expertise: 'Income Tax',
      avatar: ''
    },
    likes: 156,
    dislikes: 2,
    comments: 12,
    shares: 8,
    createdAt: new Date('2024-01-10'),
    tags: ['Standard Deduction', 'Salary', 'Income Tax'],
    isVerified: false
  }
]

const SAMPLE_EXPERTS: Expert[] = [
  {
    id: '1',
    name: 'CA Neha Sharma',
    expertise: 'Income Tax & GST',
    experience: '12 years',
    rating: 4.9,
    reviews: 234,
    consultationFee: 1500,
    availability: 'Available Today',
    specialties: ['ITR Filing', 'GST Registration', 'Tax Planning'],
    isVerified: true
  },
  {
    id: '2',
    name: 'CS Rajesh Kumar',
    expertise: 'Corporate Tax',
    experience: '15 years',
    rating: 4.8,
    reviews: 189,
    consultationFee: 2000,
    availability: 'Available Tomorrow',
    specialties: ['Company Law', 'Corporate Compliance', 'Tax Audit'],
    isVerified: true
  },
  {
    id: '3',
    name: 'CA Priya Singh',
    expertise: 'International Tax',
    experience: '10 years',
    rating: 4.7,
    reviews: 145,
    consultationFee: 2500,
    availability: 'Busy This Week',
    specialties: ['Foreign Income', 'DTAA', 'Transfer Pricing'],
    isVerified: true
  }
]

const SAMPLE_IMPACT_STORIES: ImpactStory[] = [
  {
    id: '1',
    title: 'Building Schools in Rural Maharashtra',
    description: 'Your tax contributions helped build 5 new schools in rural areas, providing education to over 2,000 children.',
    category: 'Education',
    location: 'Maharashtra',
    impact: 'Education Infrastructure',
    amount: 25000000,
    beneficiaries: 2000,
    createdAt: new Date('2024-01-08'),
    verified: true
  },
  {
    id: '2',
    title: 'Rural Road Development in Bihar',
    description: 'Tax funds were used to construct 50km of rural roads, connecting 15 villages to main highways.',
    category: 'Infrastructure',
    location: 'Bihar',
    impact: 'Rural Connectivity',
    amount: 18000000,
    beneficiaries: 50000,
    createdAt: new Date('2024-01-05'),
    verified: true
  },
  {
    id: '3',
    title: 'Healthcare Center in Tamil Nadu',
    description: 'New primary healthcare center established serving 10 villages with basic medical facilities.',
    category: 'Healthcare',
    location: 'Tamil Nadu',
    impact: 'Healthcare Access',
    amount: 12000000,
    beneficiaries: 15000,
    createdAt: new Date('2024-01-03'),
    verified: true
  }
]

export default function SocialCommunityFeatures({ userId }: SocialCommunityFeaturesProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(SAMPLE_LEADERBOARD)
  const [taxTips, setTaxTips] = useState<TaxTip[]>(SAMPLE_TAX_TIPS)
  const [experts, setExperts] = useState<Expert[]>(SAMPLE_EXPERTS)
  const [impactStories, setImpactStories] = useState<ImpactStory[]>(SAMPLE_IMPACT_STORIES)
  const [newTip, setNewTip] = useState({ title: '', content: '', category: '' })
  const [activeTab, setActiveTab] = useState("leaderboard")

  const handleLikeTip = (tipId: string) => {
    setTaxTips(prev => prev.map(tip => 
      tip.id === tipId ? { ...tip, likes: tip.likes + 1 } : tip
    ))
  }

  const handleDislikeTip = (tipId: string) => {
    setTaxTips(prev => prev.map(tip => 
      tip.id === tipId ? { ...tip, dislikes: tip.dislikes + 1 } : tip
    ))
  }

  const handleSubmitTip = () => {
    if (newTip.title && newTip.content) {
      const tip: TaxTip = {
        id: Date.now().toString(),
        title: newTip.title,
        content: newTip.content,
        category: newTip.category || 'General',
        author: {
          name: 'You',
          expertise: 'Taxpayer',
          avatar: ''
        },
        likes: 0,
        dislikes: 0,
        comments: 0,
        shares: 0,
        createdAt: new Date(),
        tags: [],
        isVerified: false
      }
      setTaxTips(prev => [tip, ...prev])
      setNewTip({ title: '', content: '', category: '' })
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-500'
      case 2: return 'bg-gray-400'
      case 3: return 'bg-orange-600'
      default: return 'bg-slate-400'
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-4 w-4 text-yellow-500" />
      case 2: return <Trophy className="h-4 w-4 text-gray-400" />
      case 3: return <Trophy className="h-4 w-4 text-orange-600" />
      default: return <span className="text-sm font-bold">#{rank}</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Social & Community</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Connect, share, and learn from the tax community
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Users className="h-3 w-3 mr-1" />
            Community
          </Badge>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <Badge variant="outline">{leaderboard.length}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">#{leaderboard.find(e => e.isCurrentUser)?.rank}</p>
              <p className="text-sm font-medium">Your Rank</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">In tax efficiency</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-green-600" />
              </div>
              <Badge variant="outline">{taxTips.length}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{taxTips.reduce((sum, tip) => sum + tip.likes, 0)}</p>
              <p className="text-sm font-medium">Total Likes</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">On tax tips</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-purple-600" />
              </div>
              <Badge variant="outline">{experts.length}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{Math.round(experts.reduce((sum, exp) => sum + exp.rating, 0) / experts.length)}</p>
              <p className="text-sm font-medium">Avg Rating</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Expert advisors</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-orange-600" />
              </div>
              <Badge variant="outline">{impactStories.length}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{impactStories.reduce((sum, story) => sum + story.beneficiaries, 0).toLocaleString()}</p>
              <p className="text-sm font-medium">Lives Impacted</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Through tax contributions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="tips">Tax Tips</TabsTrigger>
          <TabsTrigger value="experts">Experts</TabsTrigger>
          <TabsTrigger value="impact">Social Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Tax Efficiency Leaderboard
              </CardTitle>
              <CardDescription>
                Compare your tax efficiency with peers (anonymized by income bracket)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((entry) => (
                  <div 
                    key={entry.id} 
                    className={`border rounded-lg p-4 ${entry.isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankColor(entry.rank)}`}>
                            {getRankIcon(entry.rank)}
                          </div>
                          <Avatar>
                            <AvatarImage src={entry.avatar} />
                            <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <h4 className="font-semibold">{entry.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {entry.incomeBracket}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {entry.state}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-right">
                        <div>
                          <p className="text-lg font-bold text-green-600">{entry.taxEfficiency}%</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Efficiency</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">₹{entry.totalTaxes.toLocaleString()}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Total Tax</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-600">₹{entry.savings.toLocaleString()}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Saved</p>
                        </div>
                      </div>
                    </div>
                    
                    {entry.isCurrentUser && (
                      <div className="mt-3">
                        <Progress value={entry.taxEfficiency} className="h-2" />
                        <div className="flex justify-between text-xs mt-1">
                          <span>Your tax efficiency</span>
                          <span>{entry.taxEfficiency}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Community Tax Tips
              </CardTitle>
              <CardDescription>
                Share and discover tax-saving strategies from the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add New Tip */}
                <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
                  <h4 className="font-medium mb-3">Share Your Tax Tip</h4>
                  <div className="space-y-3">
                    <Input
                      placeholder="Tip title..."
                      value={newTip.title}
                      onChange={(e) => setNewTip(prev => ({...prev, title: e.target.value}))}
                    />
                    <Textarea
                      placeholder="Share your tax-saving tip..."
                      value={newTip.content}
                      onChange={(e) => setNewTip(prev => ({...prev, content: e.target.value}))}
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Select value={newTip.category} onValueChange={(value) => setNewTip(prev => ({...prev, category: value}))}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Income Tax">Income Tax</SelectItem>
                          <SelectItem value="GST">GST</SelectItem>
                          <SelectItem value="Housing">Housing</SelectItem>
                          <SelectItem value="Investments">Investments</SelectItem>
                          <SelectItem value="General">General</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleSubmitTip}>
                        <Send className="h-4 w-4 mr-1" />
                        Share Tip
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Tax Tips List */}
                {taxTips.map((tip) => (
                  <div key={tip.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{tip.title}</h4>
                          {tip.isVerified && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          {tip.content}
                        </p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={tip.author.avatar} />
                              <AvatarFallback>{tip.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {tip.author.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {tip.author.expertise}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {tip.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tip.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikeTip(tip.id)}
                          className="flex items-center gap-1"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          {tip.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDislikeTip(tip.id)}
                          className="flex items-center gap-1"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          {tip.dislikes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {tip.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <Share2 className="h-4 w-4" />
                          {tip.shares}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Tax Experts
              </CardTitle>
              <CardDescription>
                Connect with verified tax professionals for personalized advice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {experts.map((expert) => (
                  <div key={expert.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarImage src={expert.avatar} />
                        <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{expert.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{expert.expertise}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Experience:</span>
                        <span>{expert.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{expert.rating}</span>
                          <span className="text-slate-600 dark:text-slate-400">({expert.reviews})</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Fee:</span>
                        <span className="font-medium">₹{expert.consultationFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Availability:</span>
                        <span className={expert.availability.includes('Today') ? 'text-green-600' : 'text-orange-600'}>
                          {expert.availability}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {expert.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Consult
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                        Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Social Impact Dashboard
              </CardTitle>
              <CardDescription>
                See how your tax contributions are making a difference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {impactStories.map((story) => (
                  <div key={story.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{story.title}</h4>
                          {story.verified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          {story.description}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Category:</span>
                            <div className="font-medium">{story.category}</div>
                          </div>
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Location:</span>
                            <div className="font-medium">{story.location}</div>
                          </div>
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Amount:</span>
                            <div className="font-medium">₹{(story.amount / 10000000).toFixed(1)} Cr</div>
                          </div>
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Beneficiaries:</span>
                            <div className="font-medium">{story.beneficiaries.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <Calendar className="h-3 w-3" />
                        {story.createdAt.toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}