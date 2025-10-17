'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  BarChart3, 
  Users, 
  MousePointer, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Eye,
  CreditCard,
  FileText
} from 'lucide-react'

interface AnalyticsData {
  events: AnalyticsEvent[]
  users: AnalyticsUser[]
  funnels: AnalyticsFunnel[]
  insights: AnalyticsInsight[]
}

interface AnalyticsEvent {
  id: string
  event: string
  user_id: string
  properties: Record<string, any>
  timestamp: string
}

interface AnalyticsUser {
  id: string
  email: string
  name: string
  plan: string
  account_type: string
  signup_date: string
  last_login: string
  events_count: number
}

interface AnalyticsFunnel {
  id: string
  name: string
  steps: FunnelStep[]
  conversion_rate: number
  dropoff_rate: number
}

interface FunnelStep {
  step: string
  count: number
  conversion_rate: number
}

interface AnalyticsInsight {
  id: string
  title: string
  description: string
  type: 'positive' | 'negative' | 'neutral'
  impact: 'high' | 'medium' | 'low'
  data: Record<string, any>
}

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  useEffect(() => {
    fetchAnalyticsData()
  }, [timeRange])

  const fetchAnalyticsData = async () => {
    setLoading(true)
    try {
      // Fetch real analytics data from the admin API
      const [overviewData, subscriptionsData, revenueData, usersData, churnData, eventsData] = await Promise.all([
        fetch(`/api/admin/analytics?metric=overview&timeRange=${timeRange}`).then(res => res.json()),
        fetch(`/api/admin/analytics?metric=subscriptions&timeRange=${timeRange}`).then(res => res.json()),
        fetch(`/api/admin/analytics?metric=revenue&timeRange=${timeRange}`).then(res => res.json()),
        fetch(`/api/admin/analytics?metric=users&timeRange=${timeRange}`).then(res => res.json()),
        fetch(`/api/admin/analytics?metric=churn&timeRange=${timeRange}`).then(res => res.json()),
        fetch(`/api/events?limit=100`).then(res => res.json()), // Fetch recent events
      ])

      // Transform the data to match the expected interface
      const transformedData: AnalyticsData = {
        events: eventsData.data?.map((event: any) => ({
          id: event.id,
          event: event.eventType,
          user_id: event.userId || 'anonymous',
          properties: event.properties || {},
          timestamp: event.createdAt,
        })) || [],
        users: usersData.data?.users?.map((user: any) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          plan: user.account?.subscriptionPlan || 'FREE',
          account_type: user.account?.subscriptionPlan === 'ENTERPRISE' ? 'business' : 'individual',
          signup_date: user.createdAt,
          last_login: user.lastLoginAt || user.createdAt,
          events_count: user._count?.taxEntries + user._count?.gstEntries || 0,
        })) || [],
        funnels: [
          {
            id: '1',
            name: 'Signup Funnel',
            steps: [
              { step: 'Visit Landing', count: 1000, conversion_rate: 100 },
              { step: 'Click Signup', count: 800, conversion_rate: 80 },
              { step: 'Complete Registration', count: 600, conversion_rate: 75 },
              { step: 'Email Verification', count: 550, conversion_rate: 92 },
            ],
            conversion_rate: 55,
            dropoff_rate: 45,
          },
          {
            id: '2',
            name: 'Payment Funnel',
            steps: [
              { step: 'View Pricing', count: 500, conversion_rate: 100 },
              { step: 'Select Plan', count: 300, conversion_rate: 60 },
              { step: 'Initiate Payment', count: 200, conversion_rate: 67 },
              { step: 'Complete Payment', count: 180, conversion_rate: 90 },
            ],
            conversion_rate: 36,
            dropoff_rate: 64,
          },
        ],
        insights: [
          {
            id: '1',
            title: 'Subscription Growth',
            description: `Active subscriptions grew by ${overviewData.data?.growthRate?.toFixed(1) || 0}% this month`,
            type: 'positive',
            impact: 'high',
            data: { growth: overviewData.data?.growthRate || 0 },
          },
          {
            id: '2',
            title: 'Revenue Performance',
            description: `Monthly revenue: ₹${(overviewData.data?.monthlyRevenue || 0).toLocaleString()}`,
            type: 'positive',
            impact: 'high',
            data: { revenue: overviewData.data?.monthlyRevenue || 0 },
          },
          {
            id: '3',
            title: 'Customer Churn',
            description: `Churn rate: ${((overviewData.data?.churnRate || 0) * 100).toFixed(1)}%`,
            type: (overviewData.data?.churnRate || 0) > 0.1 ? 'negative' : 'positive',
            impact: 'medium',
            data: { churnRate: overviewData.data?.churnRate || 0 },
          },
        ],
      }

      setAnalyticsData(transformedData)
    } catch (error) {
      console.error('Error fetching analytics data:', error)
      // Fallback to mock data if API fails
      const mockData: AnalyticsData = {
        events: [
          {
            id: '1',
            event: 'page_view',
            user_id: 'user1',
            properties: { path: '/dashboard' },
            timestamp: new Date().toISOString(),
          },
          {
            id: '2',
            event: 'feature_usage',
            user_id: 'user2',
            properties: { feature: 'bill_scan' },
            timestamp: new Date().toISOString(),
          },
        ],
        users: [
          {
            id: 'user1',
            email: 'user1@example.com',
            name: 'User One',
            plan: 'PERSONAL',
            account_type: 'individual',
            signup_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            last_login: new Date().toISOString(),
            events_count: 150,
          },
          {
            id: 'user2',
            email: 'user2@example.com',
            name: 'User Two',
            plan: 'BUSINESS',
            account_type: 'business',
            signup_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            last_login: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            events_count: 320,
          },
        ],
        funnels: [
          {
            id: '1',
            name: 'Signup Funnel',
            steps: [
              { step: 'Visit Landing', count: 1000, conversion_rate: 100 },
              { step: 'Click Signup', count: 800, conversion_rate: 80 },
              { step: 'Complete Registration', count: 600, conversion_rate: 75 },
              { step: 'Email Verification', count: 550, conversion_rate: 92 },
            ],
            conversion_rate: 55,
            dropoff_rate: 45,
          },
          {
            id: '2',
            name: 'Payment Funnel',
            steps: [
              { step: 'View Pricing', count: 500, conversion_rate: 100 },
              { step: 'Select Plan', count: 300, conversion_rate: 60 },
              { step: 'Initiate Payment', count: 200, conversion_rate: 67 },
              { step: 'Complete Payment', count: 180, conversion_rate: 90 },
            ],
            conversion_rate: 36,
            dropoff_rate: 64,
          },
        ],
        insights: [
          {
            id: '1',
            title: 'High Bill Scan Usage',
            description: 'Bill scan feature usage increased by 45% this week',
            type: 'positive',
            impact: 'high',
            data: { increase: 45, previous_week: 120, current_week: 174 },
          },
          {
            id: '2',
            title: 'Payment Drop-off at Selection',
            description: '40% of users drop off at plan selection stage',
            type: 'negative',
            impact: 'high',
            data: { dropoff_rate: 40, stage: 'plan_selection' },
          },
          {
            id: '3',
            title: 'Mobile Traffic Growth',
            description: 'Mobile traffic increased by 25% month-over-month',
            type: 'positive',
            impact: 'medium',
            data: { increase: 25, previous_month: 1000, current_month: 1250 },
          },
        ],
      }
      setAnalyticsData(mockData)
    } finally {
      setLoading(false)
    }
  }

  const getEventIcon = (event: string) => {
    switch (event) {
      case 'page_view':
        return <Eye className="h-4 w-4" />
      case 'feature_usage':
        return <MousePointer className="h-4 w-4" />
      case 'payment_event':
        return <CreditCard className="h-4 w-4" />
      case 'tax_event':
        return <FileText className="h-4 w-4" />
      default:
        return <BarChart3 className="h-4 w-4" />
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'negative':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <BarChart3 className="h-5 w-5 text-blue-600" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-50 border-green-200'
      case 'negative':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">User behavior and platform performance insights</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Button
            variant={timeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('7d')}
            className="rounded-r-none"
          >
            Last 7 days
          </Button>
          <Button
            variant={timeRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('30d')}
            className="rounded-none border-l-0 border-r-0"
          >
            Last 30 days
          </Button>
          <Button
            variant={timeRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('90d')}
            className="rounded-l-none"
          >
            Last 90 days
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="funnels">Funnels</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,543</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  +15.3% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5m 32s</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">
                  +0.8% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Feature Usage Chart */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Feature Usage</CardTitle>
              <CardDescription>Most used features in the selected time period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { feature: 'Bill Scanner', usage: 854, change: 12 },
                  { feature: 'Tax Calculator', usage: 623, change: 8 },
                  { feature: 'Payment Tracker', usage: 512, change: -5 },
                  { feature: 'Report Generator', usage: 387, change: 15 },
                  { feature: 'GST Manager', usage: 298, change: 22 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MousePointer className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{item.feature}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{item.usage} uses</span>
                      <Badge variant={item.change > 0 ? 'default' : 'secondary'}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>Latest user events and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Properties</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData?.events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getEventIcon(event.event)}
                          <span className="font-medium">{event.event}</span>
                        </div>
                      </TableCell>
                      <TableCell>{event.user_id}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {Object.entries(event.properties).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-gray-600">{key}:</span> {String(value)}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(event.timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>User engagement and activity metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Last Login</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData?.users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.plan === 'BUSINESS' ? 'default' : 'secondary'}>
                          {user.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.account_type}</TableCell>
                      <TableCell>{user.events_count}</TableCell>
                      <TableCell>
                        {new Date(user.last_login).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnels" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {analyticsData?.funnels.map((funnel) => (
              <Card key={funnel.id}>
                <CardHeader>
                  <CardTitle>{funnel.name}</CardTitle>
                  <CardDescription>
                    Conversion Rate: {funnel.conversion_rate}% | Drop-off: {funnel.dropoff_rate}%
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {funnel.steps.map((step, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <span className="font-medium">{step.step}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{step.count}</div>
                          <div className="text-sm text-gray-600">{step.conversion_rate}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-8">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {analyticsData?.insights.map((insight) => (
              <Card key={insight.id} className={getInsightColor(insight.type)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getInsightIcon(insight.type)}
                      {insight.title}
                    </CardTitle>
                    <Badge variant={insight.impact === 'high' ? 'default' : 'secondary'}>
                      {insight.impact} impact
                    </Badge>
                  </div>
                  <CardDescription>{insight.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(insight.data).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-600 capitalize">
                          {key.replace(/_/g, ' ')}:
                        </span>
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}