"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  Calculator, 
  Car, 
  Building,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Target,
  Brain,
  BarChart3,
  Mic,
  Calendar,
  Star,
  Users,
  Briefcase,
  Truck,
  Home,
  Landmark,
  GraduationCap,
  Camera,
  Scan,
  FileSignature
} from "lucide-react"

interface EnhancedDashboardProps {
  totalTaxPaid: number
  monthlyData: Array<{ month: string; income: number; tax: number }>
  taxBreakdown: Array<{ category: string; amount: number; percentage: number; color: string }>
  onAddTaxEntry: () => void
  onCalculateTax: () => void
  onPropertyTax: () => void
  onTaxTracker: () => void
  onBillScanner: () => void
  onReturnFiling: () => void
}

const chartConfig = {
  incomeTax: {
    label: "Income Tax",
    color: "hsl(var(--chart-1))",
  },
  gst: {
    label: "GST",
    color: "hsl(var(--chart-2))",
  },
  fuelTax: {
    label: "Fuel Tax",
    color: "hsl(var(--chart-3))",
  },
  propertyTax: {
    label: "Property Tax",
    color: "hsl(var(--chart-4))",
  },
}

export default function EnhancedDashboard({ 
  totalTaxPaid, 
  monthlyData, 
  taxBreakdown, 
  onAddTaxEntry, 
  onCalculateTax,
  onPropertyTax,
  onTaxTracker,
  onBillScanner,
  onReturnFiling
}: EnhancedDashboardProps) {
  const [animatedTaxAmount, setAnimatedTaxAmount] = useState(0)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  
  // Animate tax counter
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 50
    const increment = totalTaxPaid / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= totalTaxPaid) {
        current = totalTaxPaid
        clearInterval(timer)
      }
      setAnimatedTaxAmount(Math.floor(current))
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [totalTaxPaid])

  // Prepare chart data
  const pieChartData = taxBreakdown.map(item => ({
    name: item.category,
    value: item.amount,
    color: item.color
  }))

  const barChartData = monthlyData.map(item => ({
    month: item.month,
    tax: item.tax,
    income: item.income
  }))

  // Calculate metrics
  const currentMonthTax = monthlyData[currentMonth]?.tax || 0
  const previousMonthTax = monthlyData[currentMonth - 1]?.tax || 0
  const taxGrowth = previousMonthTax > 0 ? ((currentMonthTax - previousMonthTax) / previousMonthTax) * 100 : 0
  const averageMonthlyTax = totalTaxPaid / monthlyData.length
  const projectedAnnualTax = averageMonthlyTax * 12

  return (
    <div className="space-y-6">
      {/* Tax Counter Card */}
      <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <CardHeader className="relative z-10 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">My Total Tax Paid (2024)</CardTitle>
              <CardDescription className="text-orange-100">This financial year</CardDescription>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold">₹{animatedTaxAmount.toLocaleString()}</span>
            <span className="text-sm text-orange-100">/ ₹{projectedAnnualTax.toLocaleString()} projected</span>
          </div>
          <div className="text-sm text-orange-100 mb-3">≈ ₹{Math.round(averageMonthlyTax).toLocaleString()} per month</div>
          <Progress value={(totalTaxPaid / projectedAnnualTax) * 100} className="mt-3 bg-orange-400" />
          <div className="text-xs text-orange-100 mt-1">
            {Math.round((totalTaxPaid / projectedAnnualTax) * 100)}% of projected annual tax
          </div>
        </CardContent>
      </Card>

      {/* Return Filing Card */}
      <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <CardHeader className="relative z-10 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">File Your Income Tax Return</CardTitle>
              <CardDescription className="text-green-100">Complete ITR filing with AI assistance</CardDescription>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <FileSignature className="h-5 w-5" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-lg font-bold">5 Steps</div>
                <div className="text-xs text-green-100">Complete Process</div>
              </div>
              <div>
                <div className="text-lg font-bold">100%</div>
                <div className="text-xs text-green-100">Automated</div>
              </div>
              <div>
                <div className="text-lg font-bold">24/7</div>
                <div className="text-xs text-green-100">Support</div>
              </div>
            </div>
            <Button 
              className="w-full bg-white text-green-600 hover:bg-green-50" 
              onClick={onReturnFiling}
            >
              Start ITR Filing
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">This Month</p>
                <p className="text-2xl font-bold">₹{currentMonthTax.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  {taxGrowth > 0 ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs ${taxGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(taxGrowth).toFixed(1)}% from last month
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-2">
                <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Tax Categories</p>
                <p className="text-2xl font-bold">{taxBreakdown.length}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Active categories</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full p-2">
                <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tax Breakdown Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tax Breakdown</CardTitle>
            <CardDescription>Where your taxes go</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            
            <div className="mt-4 space-y-2">
              {taxBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">₹{item.amount.toLocaleString()}</span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 ml-1">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Tax Trend</CardTitle>
            <CardDescription>Your tax payments over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <BarChart data={barChartData}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Bar dataKey="tax" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ChartContainer>
            
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Highest Month</span>
                <span className="text-sm">
                  {monthlyData.reduce((max, curr) => curr.tax > max.tax ? curr : max, monthlyData[0]).month}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-medium">Lowest Month</span>
                <span className="text-sm">
                  {monthlyData.reduce((min, curr) => curr.tax < min.tax ? curr : min, monthlyData[0]).month}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Features */}
      <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Tax Assistant
          </CardTitle>
          <CardDescription className="text-blue-100">Smart recommendations and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4" />
                <span className="text-sm font-medium">Tax Advisor</span>
              </div>
              <p className="text-xs text-blue-100 mb-2">Personalized tax optimization tips</p>
              <Badge variant="secondary" className="bg-white/20 text-white">
                4 Recommendations
              </Badge>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm font-medium">Analytics</span>
              </div>
              <p className="text-xs text-blue-100 mb-2">Advanced data visualization</p>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Interactive Charts
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Enhanced Features</CardTitle>
          <CardDescription>Access advanced tax management tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button className="h-16 flex-col gap-1" variant="outline">
              <Brain className="h-5 w-5 text-blue-600" />
              <span className="text-xs">AI Advisor</span>
            </Button>
            <Button className="h-16 flex-col gap-1" variant="outline">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span className="text-xs">Analytics</span>
            </Button>
            <Button className="h-16 flex-col gap-1" variant="outline">
              <Mic className="h-5 w-5 text-purple-600" />
              <span className="text-xs">Voice Assistant</span>
            </Button>
            <Button className="h-16 flex-col gap-1" variant="outline">
              <Calendar className="h-5 w-5 text-orange-600" />
              <span className="text-xs">Tax Planning</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Basic Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Actions</CardTitle>
          <CardDescription>Common tax-related tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              className="h-16 flex-col gap-1" 
              variant="outline"
              onClick={onAddTaxEntry}
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs">Add Tax Entry</span>
            </Button>
            <Button 
              className="h-16 flex-col gap-1" 
              variant="outline"
              onClick={onCalculateTax}
            >
              <Calculator className="h-5 w-5" />
              <span className="text-xs">Calculate Tax</span>
            </Button>
            <Button className="h-16 flex-col gap-1" variant="outline">
              <Car className="h-5 w-5" />
              <span className="text-xs">Fuel Tax</span>
            </Button>
            <Button className="h-16 flex-col gap-1" variant="outline" onClick={onPropertyTax}>
              <Building className="h-5 w-5" />
              <span className="text-xs">Property Tax</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bill Scanner */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bill Scanner</CardTitle>
          <CardDescription>Scan bills and automatically classify tax categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-20 flex-col gap-2" variant="outline" onClick={onBillScanner}>
              <Camera className="h-6 w-6 text-blue-600" />
              <div className="text-center">
                <span className="text-sm font-medium">Scan Bill</span>
                <span className="text-xs text-slate-600 dark:text-slate-400 block">Camera or Upload</span>
              </div>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline" onClick={onTaxTracker}>
              <Scan className="h-6 w-6 text-green-600" />
              <div className="text-center">
                <span className="text-sm font-medium">Tax Tracker</span>
                <span className="text-xs text-slate-600 dark:text-slate-400 block">View All Payments</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>Your latest tax transactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="font-medium text-sm">Income Tax - TDS</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">June Salary</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-sm">₹9,000</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">2 days ago</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Car className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="font-medium text-sm">Fuel Tax</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Petrol 25L</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-sm">₹1,250</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">1 week ago</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Building className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="font-medium text-sm">Property Tax</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Q1 Payment</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-sm">₹1,250</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">2 weeks ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}