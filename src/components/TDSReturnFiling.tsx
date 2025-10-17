"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  FileText,
  Calculator,
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Building,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Send,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  Info,
  Database,
  Shield,
  BarChart3,
  FileSignature
} from "lucide-react"

interface TDSEntry {
  id: string
  quarter: string
  month: string
  deducteeName: string
  deducteePAN: string
  amount: number
  tdsRate: number
  tdsAmount: number
  natureOfPayment: string
  section: string
  challanNo: string
  challanDate: string
  status: "draft" | "verified" | "filed" | "processed"
}

interface TDSReturn {
  id: string
  quarter: string
  formType: "24Q" | "26Q" | "27Q" | "27EQ"
  period: string
  totalDeductees: number
  totalAmount: number
  totalTDS: number
  status: "draft" | "prepared" | "filed" | "processed"
  submissionDate: string
  acknowledgmentNo: string
}

interface TDSChallan {
  id: string
  challanNo: string
  bsrCode: string
  date: string
  amount: number
  bank: string
  branch: string
  status: "matched" | "unmatched" | "partial"
}

const mockTDSEntries: TDSEntry[] = [
  {
    id: "1",
    quarter: "Q1",
    month: "April",
    deducteeName: "Raj Kumar",
    deducteePAN: "ABCDE1234F",
    amount: 50000,
    tdsRate: 10,
    tdsAmount: 5000,
    natureOfPayment: "Salary",
    section: "192",
    challanNo: "CHN001",
    challanDate: "2024-04-30",
    status: "verified"
  },
  {
    id: "2",
    quarter: "Q1",
    month: "May",
    deducteeName: "Priya Singh",
    deducteePAN: "FGHIJ5678K",
    amount: 75000,
    tdsRate: 10,
    tdsAmount: 7500,
    natureOfPayment: "Salary",
    section: "192",
    challanNo: "CHN002",
    challanDate: "2024-05-31",
    status: "verified"
  }
]

const mockTDSReturns: TDSReturn[] = [
  {
    id: "1",
    quarter: "Q1",
    formType: "24Q",
    period: "Apr-Jun 2024",
    totalDeductees: 25,
    totalAmount: 1250000,
    totalTDS: 125000,
    status: "filed",
    submissionDate: "2024-07-15",
    acknowledgmentNo: "ACK123456789"
  }
]

const mockTDSChallans: TDSChallan[] = [
  {
    id: "1",
    challanNo: "CHN001",
    bsrCode: "1234567",
    date: "2024-04-30",
    amount: 50000,
    bank: "State Bank of India",
    branch: "Mumbai Main",
    status: "matched"
  },
  {
    id: "2",
    challanNo: "CHN002",
    bsrCode: "7654321",
    date: "2024-05-31",
    amount: 75000,
    bank: "HDFC Bank",
    branch: "Andheri",
    status: "matched"
  }
]

interface TDSReturnFilingProps {
  onTDSFilingComplete: (tdsReturn: TDSReturn) => void
  onBack: () => void
  userId: string
}

export default function TDSReturnFiling({ onTDSFilingComplete, onBack, userId }: TDSReturnFilingProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedQuarter, setSelectedQuarter] = useState<string>("Q1")
  const [tdsEntries, setTdsEntries] = useState<TDSEntry[]>(mockTDSEntries)
  const [tdsReturns, setTdsReturns] = useState<TDSReturn[]>(mockTDSReturns)
  const [tdsChallans, setTdsChallans] = useState<TDSChallan[]>(mockTDSChallans)
  const [isPreparing, setIsPreparing] = useState(false)
  const [preparationProgress, setPreparationProgress] = useState(0)
  const [currentReturn, setCurrentReturn] = useState<TDSReturn | null>(null)

  const quarters = [
    { id: "Q1", name: "Quarter 1", period: "April - June", months: ["April", "May", "June"] },
    { id: "Q2", name: "Quarter 2", period: "July - September", months: ["July", "August", "September"] },
    { id: "Q3", name: "Quarter 3", period: "October - December", months: ["October", "November", "December"] },
    { id: "Q4", name: "Quarter 4", period: "January - March", months: ["January", "February", "March"] }
  ]

  const prepareTDSReturn = async () => {
    setIsPreparing(true)
    setPreparationProgress(0)

    const steps = [
      { name: "Validating entries", progress: 20 },
      { name: "Reconciling challans", progress: 40 },
      { name: "Generating TDS return", progress: 60 },
      { name: "Calculating totals", progress: 80 },
      { name: "Finalizing return", progress: 100 }
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setPreparationProgress(steps[i].progress)
    }

    const newReturn: TDSReturn = {
      id: Date.now().toString(),
      quarter: selectedQuarter,
      formType: "24Q",
      period: quarters.find(q => q.id === selectedQuarter)?.period || "",
      totalDeductees: tdsEntries.length,
      totalAmount: tdsEntries.reduce((sum, entry) => sum + entry.amount, 0),
      totalTDS: tdsEntries.reduce((sum, entry) => sum + entry.tdsAmount, 0),
      status: "prepared",
      submissionDate: new Date().toISOString().split('T')[0],
      acknowledgmentNo: ""
    }

    setCurrentReturn(newReturn)
    setTdsReturns(prev => [...prev, newReturn])
    setIsPreparing(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processed":
        return <Badge className="bg-green-100 text-green-800">Processed</Badge>
      case "filed":
        return <Badge className="bg-blue-100 text-blue-800">Filed</Badge>
      case "prepared":
        return <Badge className="bg-purple-100 text-purple-800">Prepared</Badge>
      case "verified":
        return <Badge className="bg-yellow-100 text-yellow-800">Verified</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const getChallanStatusBadge = (status: string) => {
    switch (status) {
      case "matched":
        return <Badge className="bg-green-100 text-green-800">Matched</Badge>
      case "unmatched":
        return <Badge className="bg-red-100 text-red-800">Unmatched</Badge>
      case "partial":
        return <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const getQuarterEntries = (quarter: string) => {
    return tdsEntries.filter(entry => entry.quarter === quarter)
  }

  const getQuarterTotal = (quarter: string) => {
    const entries = getQuarterEntries(quarter)
    return {
      totalAmount: entries.reduce((sum, entry) => sum + entry.amount, 0),
      totalTDS: entries.reduce((sum, entry) => sum + entry.tdsAmount, 0),
      count: entries.length
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">TDS Return Filing</h1>
        <p className="text-gray-600">Quarterly TDS preparation and filing system</p>
      </div>

      {/* Preparation Progress */}
      {isPreparing && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Preparing TDS Return...</span>
                <span>{preparationProgress}%</span>
              </div>
              <Progress value={preparationProgress} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {preparationProgress < 20 ? "Validating TDS entries..." :
                 preparationProgress < 40 ? "Reconciling with challans..." :
                 preparationProgress < 60 ? "Generating TDS return file..." :
                 preparationProgress < 80 ? "Calculating totals..." :
                 "Finalizing TDS return..."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quarter Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Quarter</CardTitle>
          <CardDescription>Choose the quarter for TDS return preparation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quarters.map((quarter) => {
              const totals = getQuarterTotal(quarter.id)
              return (
                <div 
                  key={quarter.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedQuarter === quarter.id 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedQuarter(quarter.id)}
                >
                  <div className="text-center">
                    <h3 className="font-bold text-lg">{quarter.name}</h3>
                    <p className="text-sm text-gray-600">{quarter.period}</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs">
                        <span className="text-gray-500">Entries:</span>
                        <span className="font-medium ml-1">{totals.count}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-500">Amount:</span>
                        <span className="font-medium ml-1">₹{totals.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-500">TDS:</span>
                        <span className="font-medium ml-1">₹{totals.totalTDS.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="entries">TDS Entries</TabsTrigger>
          <TabsTrigger value="challans">Challan Reconciliation</TabsTrigger>
          <TabsTrigger value="returns">TDS Returns</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Total Entries</span>
                </div>
                <p className="text-2xl font-bold mt-1">{tdsEntries.length}</p>
                <p className="text-xs text-gray-500">Across all quarters</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calculator className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Total TDS</span>
                </div>
                <p className="text-2xl font-bold mt-1">
                  ₹{tdsEntries.reduce((sum, entry) => sum + entry.tdsAmount, 0).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Tax deducted</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Returns Filed</span>
                </div>
                <p className="text-2xl font-bold mt-1">{tdsReturns.filter(r => r.status === "filed").length}</p>
                <p className="text-xs text-gray-500">Successfully filed</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>TDS Filing Process</CardTitle>
              <CardDescription>
                KYT.ai simplifies quarterly TDS return filing with automated reconciliation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Database className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Entry Management</h3>
                    <p className="text-sm text-gray-600">Add and manage TDS entries with automatic PAN validation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Challan Reconciliation</h3>
                    <p className="text-sm text-gray-600">Auto-match TDS entries with bank challans</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <FileSignature className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Return Generation</h3>
                    <p className="text-sm text-gray-600">Generate TDS returns in prescribed format</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Upload className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">E-filing</h3>
                    <p className="text-sm text-gray-600">Submit returns directly to TIN portal</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Info className="w-4 h-4" />
            <AlertDescription>
              KYT.ai ensures 100% compliance with TDS regulations and provides real-time status tracking.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="entries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>TDS Entries - {quarters.find(q => q.id === selectedQuarter)?.name}</span>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Entry
                </Button>
              </CardTitle>
              <CardDescription>
                Manage TDS entries for the selected quarter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getQuarterEntries(selectedQuarter).map((entry) => (
                  <div key={entry.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{entry.deducteeName}</h3>
                          {getStatusBadge(entry.status)}
                        </div>
                        <p className="text-sm text-gray-600">{entry.deducteePAN} • {entry.natureOfPayment}</p>
                        <div className="flex space-x-4 mt-1 text-xs">
                          <span>Amount: ₹{entry.amount.toLocaleString()}</span>
                          <span>TDS: ₹{entry.tdsAmount.toLocaleString()}</span>
                          <span>Rate: {entry.tdsRate}%</span>
                          <span>Sec: {entry.section}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Challan Reconciliation</CardTitle>
              <CardDescription>
                Match TDS entries with bank challans for accurate reporting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-3">TDS Entries Summary</h3>
                    <div className="space-y-2">
                      {getQuarterEntries(selectedQuarter).map((entry) => (
                        <div key={entry.id} className="p-2 bg-gray-50 rounded">
                          <div className="flex justify-between text-sm">
                            <span>{entry.deducteeName}</span>
                            <span>₹{entry.tdsAmount.toLocaleString()}</span>
                          </div>
                          <div className="text-xs text-gray-500">{entry.challanNo}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Bank Challans</h3>
                    <div className="space-y-2">
                      {tdsChallans.map((challan) => (
                        <div key={challan.id} className="p-2 bg-blue-50 rounded">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-sm font-medium">{challan.challanNo}</div>
                              <div className="text-xs text-gray-500">{challan.bank} • {challan.branch}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">₹{challan.amount.toLocaleString()}</div>
                              {getChallanStatusBadge(challan.status)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium mb-2">Reconciliation Summary</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{tdsChallans.filter(c => c.status === "matched").length}</div>
                      <div className="text-sm text-gray-600">Matched</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">{tdsChallans.filter(c => c.status === "unmatched").length}</div>
                      <div className="text-sm text-gray-600">Unmatched</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">{tdsChallans.filter(c => c.status === "partial").length}</div>
                      <div className="text-sm text-gray-600">Partial</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="returns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>TDS Returns</span>
                <Button onClick={prepareTDSReturn} disabled={isPreparing}>
                  {isPreparing ? "Preparing..." : "Prepare Return"}
                  <FileSignature className="w-4 h-4 ml-2" />
                </Button>
              </CardTitle>
              <CardDescription>
                Generate and file quarterly TDS returns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentReturn && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Current Return - {currentReturn.quarter}</h3>
                      {getStatusBadge(currentReturn.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <Label className="text-xs">Form Type</Label>
                        <p className="font-medium">{currentReturn.formType}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Period</Label>
                        <p className="font-medium">{currentReturn.period}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Total Deductees</Label>
                        <p className="font-medium">{currentReturn.totalDeductees}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Total TDS</Label>
                        <p className="font-medium">₹{currentReturn.totalTDS.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Return
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button size="sm">
                        <Send className="w-4 h-4 mr-2" />
                        File Return
                      </Button>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-medium mb-3">Previous Returns</h3>
                  <div className="space-y-3">
                    {tdsReturns.map((tdsReturn) => (
                      <div key={tdsReturn.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{tdsReturn.quarter} - {tdsReturn.formType}</h3>
                              {getStatusBadge(tdsReturn.status)}
                            </div>
                            <p className="text-sm text-gray-600">{tdsReturn.period}</p>
                            <div className="flex space-x-4 mt-1 text-xs">
                              <span>Deductees: {tdsReturn.totalDeductees}</span>
                              <span>Amount: ₹{tdsReturn.totalAmount.toLocaleString()}</span>
                              <span>TDS: ₹{tdsReturn.totalTDS.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to E-filing
        </Button>
        <Button onClick={() => currentReturn && onTDSFilingComplete(currentReturn)}>
          Continue to Form Generation
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}