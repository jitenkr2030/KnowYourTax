"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  FunnelChart,
  Funnel,
  Tooltip as RechartsTooltip
} from "recharts"
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon, 
  Filter,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Clock,
  DollarSign,
  Percent,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

interface ReportConfig {
  name: string
  description: string
  type: 'tax-summary' | 'financial' | 'compliance' | 'custom'
  format: 'pdf' | 'excel' | 'csv'
  dateRange: {
    start: Date
    end: Date
  }
  includeCharts: boolean
  includeDetails: boolean
}

interface ReportData {
  summary: {
    totalTaxPaid: number
    averageMonthlyTax: number
    complianceRate: number
    riskScore: number
  }
  taxByCategory: Array<{
    category: string
    amount: number
    percentage: number
  }>
  monthlyTrend: Array<{
    month: string
    amount: number
    target: number
  }>
  compliance: {
    onTimePayments: number
    latePayments: number
    upcomingDeadlines: Array<{
      taxType: string
      dueDate: string
      amount: number
      daysLeft: number
    }>
  }
  financial: {
    income: number
    expenses: number
    taxDeductions: number
    netTaxable: number
  }
}

const reportTemplates = [
  {
    id: 'tax-summary-monthly',
    name: 'Monthly Tax Summary',
    description: 'Comprehensive monthly tax payment summary with analytics',
    type: 'tax-summary',
    icon: BarChart3
  },
  {
    id: 'financial-yearly',
    name: 'Yearly Financial Report',
    description: 'Complete financial analysis and tax optimization report',
    type: 'financial',
    icon: DollarSign
  },
  {
    id: 'compliance-quarterly',
    name: 'Quarterly Compliance Report',
    description: 'Tax compliance status and risk assessment',
    type: 'compliance',
    icon: CheckCircle
  },
  {
    id: 'custom-analysis',
    name: 'Custom Analysis',
    description: 'Create your own custom tax analysis report',
    type: 'custom',
    icon: Activity
  }
]

const mockReportData: ReportData = {
  summary: {
    totalTaxPaid: 185000,
    averageMonthlyTax: 15417,
    complianceRate: 85,
    riskScore: 25
  },
  taxByCategory: [
    { category: 'Income Tax', amount: 45000, percentage: 24.3 },
    { category: 'GST', amount: 32000, percentage: 17.3 },
    { category: 'Property Tax', amount: 28000, percentage: 15.1 },
    { category: 'Professional Tax', amount: 15000, percentage: 8.1 },
    { category: 'Fuel Tax', amount: 22000, percentage: 11.9 },
    { category: 'Entertainment Tax', amount: 8000, percentage: 4.3 },
    { category: 'Education Tax', amount: 12000, percentage: 6.5 },
    { category: 'Stamp Duty', amount: 18000, percentage: 9.7 }
  ],
  monthlyTrend: [
    { month: 'Jan', amount: 38000, target: 35000 },
    { month: 'Feb', amount: 32000, target: 35000 },
    { month: 'Mar', amount: 45000, target: 35000 },
    { month: 'Apr', amount: 28000, target: 35000 },
    { month: 'May', amount: 35000, target: 35000 },
    { month: 'Jun', amount: 42000, target: 35000 },
    { month: 'Jul', amount: 38000, target: 35000 },
    { month: 'Aug', amount: 40000, target: 35000 },
    { month: 'Sep', amount: 36000, target: 35000 },
    { month: 'Oct', amount: 39000, target: 35000 },
    { month: 'Nov', amount: 41000, target: 35000 },
    { month: 'Dec', amount: 44000, target: 35000 }
  ],
  compliance: {
    onTimePayments: 42,
    latePayments: 8,
    upcomingDeadlines: [
      { taxType: 'Income Tax', dueDate: '2024-02-15', amount: 15000, daysLeft: 30 },
      { taxType: 'GST', dueDate: '2024-02-20', amount: 8500, daysLeft: 35 },
      { taxType: 'Professional Tax', dueDate: '2024-02-25', amount: 2500, daysLeft: 40 }
    ]
  },
  financial: {
    income: 925000,
    expenses: 555000,
    taxDeductions: 185000,
    netTaxable: 370000
  }
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0', '#ffb347', '#87ceeb']

export default function AdvancedReports() {
  const [selectedTemplate, setSelectedTemplate] = useState(reportTemplates[0])
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    name: 'Monthly Tax Summary',
    description: 'Comprehensive monthly tax payment summary',
    type: 'tax-summary',
    format: 'pdf',
    dateRange: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      end: new Date()
    },
    includeCharts: true,
    includeDetails: true
  })
  const [reportData, setReportData] = useState<ReportData>(mockReportData)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateReport = async () => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user_123', // Mock user ID
          reportType: reportConfig.type,
          config: reportConfig
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setReportData(result.data)
        
        // Auto-download the report
        if (reportConfig.format === 'pdf') {
          downloadReport(result.data, 'pdf')
        }
      } else {
        alert('Failed to generate report')
      }
    } catch (error) {
      console.error('Report generation error:', error)
      alert('Failed to generate report')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadReport = async (data: any, format: string) => {
    try {
      const response = await fetch('/api/reports/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportData: data,
          format
        })
      })

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `${reportConfig.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Report download error:', error)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Advanced Reports</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Generate comprehensive tax reports with advanced analytics
        </p>
      </div>

      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Report Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Choose a report template</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors \${selectedTemplate.id === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => {
                      setSelectedTemplate(template)
                      setReportConfig(prev => ({
                        ...prev,
                        name: template.name,
                        description: template.description,
                        type: template.type
                      }))
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <template.icon className="h-5 w-5 text-blue-600" />
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Report Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>Configure your report settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-name">Report Name</Label>
                  <Input
                    id="report-name"
                    value={reportConfig.name}
                    onChange={(e) => setReportConfig(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="report-format">Format</Label>
                  <Select 
                    value={reportConfig.format}
                    onValueChange={(value: any) => setReportConfig(prev => ({ ...prev, format: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">From</Label>
                      <Input
                        type="date"
                        value={reportConfig.dateRange.start.toISOString().split('T')[0]}
                        onChange={(e) => setReportConfig(prev => ({
                          ...prev,
                          dateRange: {
                            ...prev.dateRange,
                            start: new Date(e.target.value)
                          }
                        }))}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">To</Label>
                      <Input
                        type="date"
                        value={reportConfig.dateRange.end.toISOString().split('T')[0]}
                        onChange={(e) => setReportConfig(prev => ({
                          ...prev,
                          dateRange: {
                            ...prev.dateRange,
                            end: new Date(e.target.value)
                          }
                        }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="include-charts">Include Charts</Label>
                  <input
                    id="include-charts"
                    type="checkbox"
                    checked={reportConfig.includeCharts}
                    onChange={(e) => setReportConfig(prev => ({ ...prev, includeCharts: e.target.checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="include-details">Include Details</Label>
                  <input
                    id="include-details"
                    type="checkbox"
                    checked={reportConfig.includeDetails}
                    onChange={(e) => setReportConfig(prev => ({ ...prev, includeDetails: e.target.checked }))}
                  />
                </div>

                <Button 
                  onClick={generateReport}
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Report Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Report Summary</CardTitle>
                <CardDescription>Quick overview of your report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatCurrency(reportData.summary.totalTaxPaid)}</div>
                    <div className="text-sm text-gray-600">Total Tax Paid</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatCurrency(reportData.summary.averageMonthlyTax)}</div>
                    <div className="text-sm text-gray-600">Monthly Average</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{reportData.summary.complianceRate}%</div>
                    <div className="text-sm text-gray-600">Compliance Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{reportData.summary.riskScore}</div>
                    <div className="text-sm text-gray-600">Risk Score</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Upcoming Deadlines</h4>
                  <div className="space-y-1">
                    {reportData.compliance.upcomingDeadlines.slice(0, 3).map((deadline, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{deadline.taxType}</span>
                        <span>{deadline.daysLeft} days</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tax Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Tax Category Breakdown</CardTitle>
                <CardDescription>Distribution of your tax payments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={reportData.taxByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {reportData.taxByCategory.map((entry, index) => (
                        <Cell key={`cell-\${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Payment Trend</CardTitle>
                <CardDescription>Your tax payment patterns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={reportData.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="target" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Financial Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Your financial position and tax impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold">{formatCurrency(reportData.financial.income)}</div>
                      <div className="text-sm text-gray-600">Total Income</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{formatCurrency(reportData.financial.expenses)}</div>
                      <div className="text-sm text-gray-600">Total Expenses</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{formatCurrency(reportData.financial.taxDeductions)}</div>
                      <div className="text-sm text-gray-600">Tax Deductions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{formatCurrency(reportData.financial.netTaxable)}</div>
                      <div className="text-sm text-gray-600">Net Taxable</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Your tax compliance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{reportData.compliance.onTimePayments}</div>
                      <div className="text-sm text-gray-600">On-time Payments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{reportData.compliance.latePayments}</div>
                      <div className="text-sm text-gray-600">Late Payments</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Upcoming Deadlines</h4>
                    <div className="space-y-2">
                      {reportData.compliance.upcomingDeadlines.map((deadline, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <div className="font-medium">{deadline.taxType}</div>
                            <div className="text-sm text-gray-600">{formatCurrency(deadline.amount)}</div>
                          </div>
                          <Badge variant={deadline.daysLeft <= 7 ? "destructive" : "secondary"}>
                            {deadline.daysLeft} days
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report History</CardTitle>
              <CardDescription>Your previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Monthly Tax Summary - January 2024</TableCell>
                    <TableCell>
                      <Badge variant="outline">Tax Summary</Badge>
                    </TableCell>
                    <TableCell>PDF</TableCell>
                    <TableCell>2024-01-31 14:30</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Financial Report - 2023</TableCell>
                    <TableCell>
                      <Badge variant="outline">Financial</Badge>
                    </TableCell>
                    <TableCell>Excel</TableCell>
                    <TableCell>2023-12-31 16:45</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Compliance Report - Q4 2023</TableCell>
                    <TableCell>
                      <Badge variant="outline">Compliance</Badge>
                    </TableCell>
                    <TableCell>PDF</TableCell>
                    <TableCell>2023-12-15 10:20</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
