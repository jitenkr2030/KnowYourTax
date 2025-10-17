"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Calendar, 
  ZoomIn, 
  ZoomOut,
  Download,
  Filter,
  RefreshCw,
  Activity,
  Target,
  Users,
  MapPin
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  LineChart,
  Line,
  Area,
  AreaChart,
  Brush,
  ReferenceLine
} from "recharts"

interface EnhancedDataVisualizationProps {
  userId: string
  taxData: any[]
  monthlyData: Array<{ month: string; income: number; tax: number }>
  taxBreakdown: Array<{ category: string; amount: number; percentage: number; color: string }>
}

interface TaxTimelineData {
  date: string
  amount: number
  category: string
  description: string
}

interface ComparativeData {
  bracket: string
  userAverage: number
  peerAverage: number
  percentile: number
}

interface HeatMapData {
  month: string
  category: string
  amount: number
  intensity: number
}

export default function EnhancedDataVisualization({ 
  userId, 
  taxData, 
  monthlyData, 
  taxBreakdown 
}: EnhancedDataVisualizationProps) {
  const [timelineData, setTimelineData] = useState<TaxTimelineData[]>([])
  const [comparativeData, setComparativeData] = useState<ComparativeData[]>([])
  const [heatMapData, setHeatMapData] = useState<HeatMapData[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("12months")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    // Generate mock timeline data
    const mockTimelineData: TaxTimelineData[] = [
      { date: "2024-01-15", amount: 7500, category: "Income Tax", description: "Monthly TDS" },
      { date: "2024-01-20", amount: 1200, category: "GST", description: "Restaurant bill" },
      { date: "2024-02-01", amount: 7800, category: "Income Tax", description: "Monthly TDS" },
      { date: "2024-02-14", amount: 850, category: "GST", description: "Electronics purchase" },
      { date: "2024-02-25", amount: 2000, category: "Fuel Tax", description: "Monthly fuel" },
      { date: "2024-03-01", amount: 8200, category: "Income Tax", description: "Monthly TDS" },
      { date: "2024-03-10", amount: 1500, category: "GST", description: "Grocery shopping" },
      { date: "2024-03-20", amount: 1800, category: "Fuel Tax", description: "Monthly fuel" },
      { date: "2024-04-01", amount: 8500, category: "Income Tax", description: "Monthly TDS" },
      { date: "2024-04-15", amount: 2200, category: "GST", description: "Home appliances" },
      { date: "2024-05-01", amount: 8700, category: "Income Tax", description: "Monthly TDS" },
      { date: "2024-05-12", amount: 950, category: "GST", description: "Online shopping" },
    ]

    // Generate mock comparative data
    const mockComparativeData: ComparativeData[] = [
      { bracket: "5-10 LPA", userAverage: 125000, peerAverage: 145000, percentile: 75 },
      { bracket: "10-15 LPA", userAverage: 125000, peerAverage: 185000, percentile: 85 },
      { bracket: "15-20 LPA", userAverage: 125000, peerAverage: 225000, percentile: 95 },
    ]

    // Generate mock heatmap data
    const mockHeatMapData: HeatMapData[] = [
      { month: "Jan", category: "Income Tax", amount: 7500, intensity: 0.8 },
      { month: "Jan", category: "GST", amount: 1200, intensity: 0.3 },
      { month: "Jan", category: "Fuel Tax", amount: 0, intensity: 0.0 },
      { month: "Feb", category: "Income Tax", amount: 7800, intensity: 0.85 },
      { month: "Feb", category: "GST", amount: 850, intensity: 0.2 },
      { month: "Feb", category: "Fuel Tax", amount: 2000, intensity: 0.6 },
      { month: "Mar", category: "Income Tax", amount: 8200, intensity: 0.9 },
      { month: "Mar", category: "GST", amount: 1500, intensity: 0.4 },
      { month: "Mar", category: "Fuel Tax", amount: 1800, intensity: 0.55 },
      { month: "Apr", category: "Income Tax", amount: 8500, intensity: 0.95 },
      { month: "Apr", category: "GST", amount: 2200, intensity: 0.6 },
      { month: "Apr", category: "Fuel Tax", amount: 0, intensity: 0.0 },
      { month: "May", category: "Income Tax", amount: 8700, intensity: 1.0 },
      { month: "May", category: "GST", amount: 950, intensity: 0.25 },
      { month: "May", category: "Fuel Tax", amount: 0, intensity: 0.0 },
    ]

    setTimelineData(mockTimelineData)
    setComparativeData(mockComparativeData)
    setHeatMapData(mockHeatMapData)
  }, [userId, taxData])

  const getIntensityColor = (intensity: number) => {
    if (intensity === 0) return "#f3f4f6"
    if (intensity <= 0.3) return "#dbeafe"
    if (intensity <= 0.6) return "#93c5fd"
    if (intensity <= 0.8) return "#3b82f6"
    return "#1d4ed8"
  }

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => direction === 'in' ? Math.min(prev + 0.2, 2) : Math.max(prev - 0.2, 0.5))
  }

  const filteredTimelineData = timelineData.filter(item => {
    if (selectedCategory !== "all" && item.category !== selectedCategory) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Advanced Analytics</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Interactive data visualization and insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Period:</span>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="12months">12 Months</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Category:</span>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Income Tax">Income Tax</SelectItem>
                  <SelectItem value="GST">GST</SelectItem>
                  <SelectItem value="Fuel Tax">Fuel Tax</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Zoom:</span>
              <Button variant="outline" size="sm" onClick={() => handleZoom('out')}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm w-8 text-center">{Math.round(zoomLevel * 100)}%</span>
              <Button variant="outline" size="sm" onClick={() => handleZoom('in')}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Visualization */}
      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Interactive Timeline</TabsTrigger>
          <TabsTrigger value="comparative">Comparative Analysis</TabsTrigger>
          <TabsTrigger value="heatmap">Tax Heat Map</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Tax Payment Timeline
              </CardTitle>
              <CardDescription>
                Interactive timeline of your tax payments throughout the year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                      labelFormatter={(label) => new Date(label).toLocaleDateString()}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Brush dataKey="date" height={30} stroke="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Timeline Insights</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Peak tax payments in April (financial year end)</li>
                    <li>• Consistent monthly income tax deductions</li>
                    <li>• GST payments vary with spending patterns</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Observations</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Average monthly tax: ₹9,250</li>
                    <li>• Highest single payment: ₹8,700</li>
                    <li>• Most active month: May 2024</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Actions</h4>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full">
                      <Activity className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-1" />
                      Download Data
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparative" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Comparative Analysis
              </CardTitle>
              <CardDescription>
                Compare your tax patterns with peers in similar income brackets (anonymized)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparativeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bracket" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                    />
                    <Legend />
                    <Bar dataKey="userAverage" fill="#3b82f6" name="Your Average" />
                    <Bar dataKey="peerAverage" fill="#10b981" name="Peer Average" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {comparativeData.map((data, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{data.bracket} Bracket</h4>
                      <Badge variant="outline">
                        {data.percentile}th percentile
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Your Average:</span>
                        <span className="font-medium">₹{data.userAverage.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Peer Average:</span>
                        <span className="font-medium">₹{data.peerAverage.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Difference:</span>
                        <span className={`font-medium ${data.userAverage < data.peerAverage ? 'text-green-600' : 'text-red-600'}`}>
                          {data.userAverage < data.peerAverage ? '₹' + (data.peerAverage - data.userAverage).toLocaleString() + ' less' : '₹' + (data.userAverage - data.peerAverage).toLocaleString() + ' more'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Tax Concentration Heat Map
              </CardTitle>
              <CardDescription>
                Visual representation of tax concentration by month and category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-2 mb-6">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => (
                  <div key={month} className="text-center">
                    <div className="text-sm font-medium mb-2">{month}</div>
                    {['Income Tax', 'GST', 'Fuel Tax'].map(category => {
                      const data = heatMapData.find(d => d.month === month && d.category === category)
                      return (
                        <div
                          key={`${month}-${category}`}
                          className="h-8 rounded mb-1 flex items-center justify-center text-xs"
                          style={{ 
                            backgroundColor: data ? getIntensityColor(data.intensity) : '#f3f4f6',
                            color: data && data.intensity > 0.6 ? 'white' : 'black'
                          }}
                        >
                          {data ? `₹${data.amount}` : '0'}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span>Low</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: getIntensityColor(0) }}></div>
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: getIntensityColor(0.3) }}></div>
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: getIntensityColor(0.6) }}></div>
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: getIntensityColor(0.8) }}></div>
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: getIntensityColor(1.0) }}></div>
                  </div>
                  <span>High</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Heat Map Insights</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Income Tax shows consistent high intensity</li>
                    <li>• GST payments are sporadic but significant</li>
                    <li>• Fuel Tax shows seasonal patterns</li>
                    <li>• April shows highest overall tax activity</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Recommendations</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Plan for April tax payments in advance</li>
                    <li>• Monitor GST spending patterns</li>
                    <li>• Consider tax optimization strategies</li>
                    <li>• Track seasonal tax variations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}