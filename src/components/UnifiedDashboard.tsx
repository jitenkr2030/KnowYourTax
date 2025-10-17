'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  FileText, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Upload, 
  Download,
  TrendingUp,
  TrendingDown,
  Bell,
  Settings,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  BarChart3,
  PieChart,
  Activity,
  Users,
  CreditCard,
  Shield,
  Database,
  FolderOpen
} from 'lucide-react'
import { format, addDays, differenceInDays } from 'date-fns'

interface FilingDeadline {
  id: string
  taxType: 'Income Tax' | 'GST' | 'TDS' | 'Customs'
  formName: string
  dueDate: Date
  status: 'Pending' | 'In Progress' | 'Filed' | 'Overdue'
  priority: 'High' | 'Medium' | 'Low'
  progress: number
}

interface Document {
  id: string
  name: string
  type: 'Invoice' | 'Receipt' | 'Form' | 'Certificate' | 'Statement'
  category: string
  uploadedDate: Date
  expiryDate?: Date
  size: string
  status: 'Active' | 'Expired' | 'Expiring Soon'
}

const filingDeadlines: FilingDeadline[] = [
  {
    id: '1',
    taxType: 'Income Tax',
    formName: 'ITR-1 (AY 2024-25)',
    dueDate: new Date('2024-07-31'),
    status: 'Pending',
    priority: 'High',
    progress: 0
  },
  {
    id: '2',
    taxType: 'GST',
    formName: 'GSTR-3B (January 2024)',
    dueDate: addDays(new Date(), 5),
    status: 'In Progress',
    priority: 'High',
    progress: 45
  },
  {
    id: '3',
    taxType: 'TDS',
    formName: 'Form 24Q (Q4 FY 2023-24)',
    dueDate: addDays(new Date(), 15),
    status: 'Pending',
    priority: 'Medium',
    progress: 0
  },
  {
    id: '4',
    taxType: 'GST',
    formName: 'GSTR-1 (January 2024)',
    dueDate: addDays(new Date(), 10),
    status: 'Pending',
    priority: 'Medium',
    progress: 0
  },
  {
    id: '5',
    taxType: 'Customs',
    formName: 'Bill of Entry #1234',
    dueDate: addDays(new Date(), -2),
    status: 'Overdue',
    priority: 'High',
    progress: 75
  }
]

const documents: Document[] = [
  {
    id: '1',
    name: 'PAN Card',
    type: 'Certificate',
    category: 'Identity Proof',
    uploadedDate: new Date('2023-01-15'),
    expiryDate: new Date('2028-01-15'),
    size: '2.4 MB',
    status: 'Active'
  },
  {
    id: '2',
    name: 'GST Registration Certificate',
    type: 'Certificate',
    category: 'Tax Registration',
    uploadedDate: new Date('2023-06-20'),
    size: '1.8 MB',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Form 16 - FY 2023-24',
    type: 'Form',
    category: 'Income Tax',
    uploadedDate: new Date('2024-05-15'),
    size: '3.2 MB',
    status: 'Active'
  },
  {
    id: '4',
    name: 'Trade License - 2024',
    type: 'Certificate',
    category: 'Business License',
    uploadedDate: new Date('2024-01-01'),
    expiryDate: addDays(new Date(), 30),
    size: '1.1 MB',
    status: 'Expiring Soon'
  },
  {
    id: '5',
    name: 'Bank Statement - Dec 2023',
    type: 'Statement',
    category: 'Financial',
    uploadedDate: new Date('2024-01-05'),
    size: '4.7 MB',
    status: 'Active'
  }
]

const getPriorityColor = (priority: FilingDeadline['priority']) => {
  switch (priority) {
    case 'High': return 'bg-red-100 text-red-800'
    case 'Medium': return 'bg-yellow-100 text-yellow-800'
    case 'Low': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusColor = (status: FilingDeadline['status']) => {
  switch (status) {
    case 'Filed': return 'bg-green-100 text-green-800'
    case 'In Progress': return 'bg-blue-100 text-blue-800'
    case 'Pending': return 'bg-yellow-100 text-yellow-800'
    case 'Overdue': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getDocumentStatusColor = (status: Document['status']) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-800'
    case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800'
    case 'Expired': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getDaysRemaining = (dueDate: Date) => {
  const today = new Date()
  const diffTime = dueDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export default function UnifiedDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const urgentDeadlines = filingDeadlines.filter(deadline => 
    deadline.priority === 'High' && deadline.status !== 'Filed'
  )

  const upcomingDeadlines = filingDeadlines.filter(deadline => 
    getDaysRemaining(deadline.dueDate) <= 7 && deadline.status !== 'Filed'
  )

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory)

  const documentCategories = ['all', ...Array.from(new Set(documents.map(doc => doc.category)))]

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tax Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your tax compliance overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Filing
          </Button>
        </div>
      </div>

      {/* Alert Banner */}
      {urgentDeadlines.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            You have {urgentDeadlines.length} urgent tax filing deadline{urgentDeadlines.length > 1 ? 's' : ''} that require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="filings">Filings</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Filings</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  This year
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Filings</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {filingDeadlines.filter(f => f.status === 'Pending').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Require attention
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {filingDeadlines.filter(f => f.status === 'Overdue').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Immediate action needed
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">87%</div>
                <p className="text-xs text-muted-foreground">
                  Good standing
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription>
                Tax filing deadlines that need your attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filingDeadlines.slice(0, 5).map((deadline) => {
                  const daysRemaining = getDaysRemaining(deadline.dueDate)
                  const isOverdue = daysRemaining < 0
                  
                  return (
                    <div key={deadline.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-medium">{deadline.formName}</div>
                            <div className="text-sm text-muted-foreground">{deadline.taxType}</div>
                          </div>
                          <Badge className={getPriorityColor(deadline.priority)}>
                            {deadline.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`text-sm font-medium ${isOverdue ? 'text-red-600' : 'text-muted-foreground'}`}>
                            {isOverdue ? `${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? 's' : ''} overdue` : 
                             `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining`}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(deadline.dueDate, 'MMM dd, yyyy')}
                          </div>
                        </div>
                        
                        <Badge className={getStatusColor(deadline.status)}>
                          {deadline.status}
                        </Badge>
                        
                        {deadline.progress > 0 && (
                          <div className="w-16">
                            <Progress value={deadline.progress} className="h-2" />
                          </div>
                        )}
                        
                        <Button size="sm" variant="outline">
                          {deadline.status === 'In Progress' ? 'Continue' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>
                  Latest uploaded documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.slice(0, 4).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-3">
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">{doc.name}</div>
                          <div className="text-xs text-muted-foreground">{doc.category}</div>
                        </div>
                      </div>
                      <Badge className={getDocumentStatusColor(doc.status)} variant="secondary">
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tax-related tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                    <Upload className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-medium">Upload Documents</div>
                      <div className="text-sm text-muted-foreground">Add tax documents</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                    <FileText className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-medium">File Return</div>
                      <div className="text-sm text-muted-foreground">Start new filing</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                    <BarChart3 className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-medium">View Reports</div>
                      <div className="text-sm text-muted-foreground">Analytics & insights</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="filings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Tax Filings</CardTitle>
              <CardDescription>
                Complete overview of all your tax filings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filingDeadlines.map((deadline) => {
                  const daysRemaining = getDaysRemaining(deadline.dueDate)
                  const isOverdue = daysRemaining < 0
                  
                  return (
                    <div key={deadline.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-medium">{deadline.formName}</div>
                            <div className="text-sm text-muted-foreground">{deadline.taxType}</div>
                          </div>
                          <Badge className={getPriorityColor(deadline.priority)}>
                            {deadline.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`text-sm font-medium ${isOverdue ? 'text-red-600' : 'text-muted-foreground'}`}>
                            {isOverdue ? `${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? 's' : ''} overdue` : 
                             `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining`}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(deadline.dueDate, 'MMM dd, yyyy')}
                          </div>
                        </div>
                        
                        <Badge className={getStatusColor(deadline.status)}>
                          {deadline.status}
                        </Badge>
                        
                        {deadline.progress > 0 && (
                          <div className="w-16">
                            <Progress value={deadline.progress} className="h-2" />
                            <div className="text-xs text-center mt-1">{deadline.progress}%</div>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm">
                            {deadline.status === 'In Progress' ? 'Continue' : 'Start'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Center</CardTitle>
              <CardDescription>
                Secure vault for all your tax-related documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                  {documentCategories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </Button>
                  ))}
                </div>

                {/* Documents Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FolderOpen className="h-5 w-5 text-muted-foreground" />
                            <CardTitle className="text-sm">{doc.name}</CardTitle>
                          </div>
                          <Badge className={getDocumentStatusColor(doc.status)} variant="secondary">
                            {doc.status}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs">
                          {doc.type} • {doc.category}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 text-xs text-muted-foreground">
                          <div>Size: {doc.size}</div>
                          <div>Uploaded: {format(doc.uploadedDate, 'MMM dd, yyyy')}</div>
                          {doc.expiryDate && (
                            <div>Expires: {format(doc.expiryDate, 'MMM dd, yyyy')}</div>
                          )}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop documents here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Supports: PDF, JPG, PNG, DOC, XLS (Max 10MB)
                  </p>
                  <Button>Upload Documents</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Filing Trends
                </CardTitle>
                <CardDescription>
                  Monthly filing activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Filing Trends Chart</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Tax Type Distribution
                </CardTitle>
                <CardDescription>
                  Breakdown by tax type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <PieChart className="h-12 w-12 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Distribution Chart</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Compliance Metrics
                </CardTitle>
                <CardDescription>
                  Key compliance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">On-Time Filing Rate</span>
                      <span className="text-sm text-muted-foreground">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Accuracy Score</span>
                      <span className="text-sm text-muted-foreground">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Document Compliance</span>
                      <span className="text-sm text-muted-foreground">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity Log</CardTitle>
                <CardDescription>
                  Latest system activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 border rounded">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">GSTR-3B filed successfully</div>
                      <div className="text-xs text-muted-foreground">2 hours ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 border rounded">
                    <Upload className="h-4 w-4 text-blue-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Form 16 uploaded</div>
                      <div className="text-xs text-muted-foreground">5 hours ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 border rounded">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">TDS return deadline approaching</div>
                      <div className="text-xs text-muted-foreground">1 day ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}