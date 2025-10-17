"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  FileText, 
  Download, 
  Share2, 
  Mail,
  Printer,
  Calendar,
  Filter,
  BarChart3,
  PieChart,
  TrendingUp,
  FileSpreadsheet,
  FileImage,
  File,
  Database,
  Eye,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"

interface AdvancedReportingProps {
  userId: string
  onBack: () => void
}

export default function AdvancedReporting({ userId, onBack }: AdvancedReportingProps) {
  const [activeTab, setActiveTab] = useState("reports")
  const [selectedReportType, setSelectedReportType] = useState("comprehensive")
  const [dateRange, setDateRange] = useState("fy2023-24")
  const [exportFormat, setExportFormat] = useState("pdf")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeRawData, setIncludeRawData] = useState(false)
  const [emailReport, setEmailReport] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const reportTypes = [
    {
      id: "comprehensive",
      name: "Comprehensive Tax Report",
      description: "Complete overview of all tax-related activities",
      icon: FileText,
      sections: ["income", "deductions", "taxes", "analytics"]
    },
    {
      id: "income",
      name: "Income Analysis Report",
      description: "Detailed breakdown of income sources",
      icon: TrendingUp,
      sections: ["salary", "business", "investments", "other"]
    },
    {
      id: "deductions",
      name: "Tax Deductions Report",
      description: "All claimed and available deductions",
      icon: BarChart3,
      sections: ["80c", "80d", "housing", "education"]
    },
    {
      id: "compliance",
      name: "Compliance Status Report",
      description: "Tax filing and payment compliance status",
      icon: CheckCircle,
      sections: ["filings", "payments", "deadlines", "status"]
    },
    {
      id: "forecast",
      name: "Tax Forecast Report",
      description: "Projected tax liability for future periods",
      icon: Calendar,
      sections: ["projections", "assumptions", "scenarios"]
    },
    {
      id: "comparison",
      name: "Year-over-Year Comparison",
      description: "Compare tax data across multiple years",
      icon: PieChart,
      sections: ["yoy", "trends", "changes", "analysis"]
    }
  ]

  const exportFormats = [
    { id: "pdf", name: "PDF Document", icon: FileText, description: "Professional report with charts" },
    { id: "excel", name: "Excel Spreadsheet", icon: FileSpreadsheet, description: "Raw data with formulas" },
    { id: "csv", name: "CSV Data", icon: Database, description: "Comma-separated values" },
    { id: "json", name: "JSON Format", icon: File, description: "Structured data format" },
    { id: "image", name: "Image Charts", icon: FileImage, description: "Charts as PNG images" }
  ]

  const recentReports = [
    {
      id: 1,
      name: "Comprehensive Tax Report - FY 2023-24",
      type: "comprehensive",
      generated: "2024-03-15 14:30",
      size: "2.4 MB",
      format: "PDF",
      status: "completed"
    },
    {
      id: 2,
      name: "Income Analysis - Q4 2023",
      type: "income",
      generated: "2024-03-10 09:15",
      size: "1.8 MB",
      format: "Excel",
      status: "completed"
    },
    {
      id: 3,
      name: "Tax Forecast - 2024-25",
      type: "forecast",
      generated: "2024-03-08 16:45",
      size: "956 KB",
      format: "PDF",
      status: "completed"
    }
  ]

  const scheduledReports = [
    {
      id: 1,
      name: "Monthly Tax Summary",
      frequency: "monthly",
      nextRun: "2024-04-01",
      format: "PDF",
      recipients: ["john.doe@email.com"]
    },
    {
      id: 2,
      name: "Quarterly Compliance Report",
      frequency: "quarterly",
      nextRun: "2024-06-30",
      format: "Excel",
      recipients: ["john.doe@email.com", "accountant@company.com"]
    }
  ]

  const reportTemplates = [
    {
      id: 1,
      name: "CA/Accountant Template",
      description: "Professional format for chartered accountants",
      category: "professional"
    },
    {
      id: 2,
      name: "Personal Finance Template",
      description: "Simplified format for personal use",
      category: "personal"
    },
    {
      id: 3,
      name: "Business Tax Template",
      description: "Comprehensive business tax reporting",
      category: "business"
    },
    {
      id: 4,
      name: "Audit Template",
      description: "Detailed format for tax audits",
      category: "audit"
    }
  ]

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGenerating(false)
  }

  const handleDownloadReport = (reportId: number) => {
    // Simulate download
    console.log(`Downloading report ${reportId}`)
  }

  const handleEmailReport = () => {
    if (emailReport) {
      console.log(`Emailing report to ${emailReport}`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Advanced Reporting</h1>
          <p className="text-slate-600 dark:text-slate-400">Generate, customize, and export comprehensive tax reports</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Generate</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Scheduled</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTypes.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <report.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{report.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {report.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-slate-500">Sections:</div>
                    <div className="flex flex-wrap gap-1">
                      {report.sections.map((section) => (
                        <Badge key={section} variant="secondary" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={() => {
                      setSelectedReportType(report.id)
                      setActiveTab("generate")
                    }}
                  >
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription>
                Customize and generate your tax report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium">Report Type</Label>
                  <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((report) => (
                        <SelectItem key={report.id} value={report.id}>
                          {report.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fy2023-24">FY 2023-24</SelectItem>
                      <SelectItem value="fy2022-23">FY 2022-23</SelectItem>
                      <SelectItem value="q4-2023">Q4 2023</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Export Format</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      {exportFormats.map((format) => (
                        <SelectItem key={format.id} value={format.id}>
                          <div className="flex items-center gap-2">
                            <format.icon className="h-4 w-4" />
                            {format.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Email Report (Optional)</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={emailReport}
                    onChange={(e) => setEmailReport(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">Include in Report</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-charts"
                      checked={includeCharts}
                      onCheckedChange={setIncludeCharts}
                    />
                    <Label htmlFor="include-charts" className="text-sm">
                      Include charts and visualizations
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-raw-data"
                      checked={includeRawData}
                      onCheckedChange={setIncludeRawData}
                    />
                    <Label htmlFor="include-raw-data" className="text-sm">
                      Include raw data tables
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  Print Preview
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Format Options</CardTitle>
              <CardDescription>
                Learn about different export formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exportFormats.map((format) => (
                  <div key={format.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <format.icon className="h-6 w-6 text-blue-600" />
                      <h4 className="font-medium">{format.name}</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {format.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>
                Choose from pre-designed report templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {reportTemplates.map((template) => (
                  <div key={template.id} className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant="outline" className="mt-1">{template.category}</Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        Use Template
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {template.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Template Builder</CardTitle>
              <CardDescription>
                Create your own report templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Settings className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <h4 className="font-medium mb-2">Template Builder Coming Soon</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Create custom report templates with drag-and-drop interface
                </p>
                <Button variant="outline">Get Notified</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>
                Automate report generation and delivery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mt-1">
                          <span>Frequency: {report.frequency}</span>
                          <span>Next: {report.nextRun}</span>
                          <span>Format: {report.format}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Recipients: {report.recipients.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4">
                Create New Schedule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                View and download your previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{report.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mt-1">
                        <span>{report.generated}</span>
                        <span>{report.size}</span>
                        <span>{report.format}</span>
                        <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Analytics</CardTitle>
              <CardDescription>
                Insights about your report generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{recentReports.length}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total Reports</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">5.2 MB</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total Size</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">3</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Formats Used</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Success Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}