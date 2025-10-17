"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Upload, 
  Calculator, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Plus,
  Eye,
  Edit,
  Trash2
} from "lucide-react"

interface IncomeTaxTrackerProps {
  onBack: () => void
  userId: string
}

interface TaxEntry {
  id: string
  taxType: string
  amount: number
  description: string
  category: string
  date: string
  source: string
  isVerified: boolean
  verificationStatus: string
}

export default function IncomeTaxTracker({ onBack, userId }: IncomeTaxTrackerProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isImporting, setIsImporting] = useState(false)
  const [taxEntries, setTaxEntries] = useState<TaxEntry[]>([
    {
      id: "1",
      taxType: "TDS",
      amount: 9000,
      description: "June Salary Deduction",
      category: "SALARY",
      date: "2024-06-30",
      source: "Employer",
      isVerified: true,
      verificationStatus: "VERIFIED"
    },
    {
      id: "2",
      taxType: "TDS",
      amount: 8500,
      description: "May Salary Deduction",
      category: "SALARY",
      date: "2024-05-31",
      source: "Employer",
      isVerified: true,
      verificationStatus: "VERIFIED"
    },
    {
      id: "3",
      taxType: "INTEREST",
      amount: 2000,
      description: "Bank FD Interest TDS",
      category: "INTEREST",
      date: "2024-06-15",
      source: "Bank",
      isVerified: false,
      verificationStatus: "PENDING"
    }
  ])

  const [formData, setFormData] = useState({
    panNumber: "",
    password: "",
    assessmentYear: "2024-25"
  })

  const [newTaxEntry, setNewTaxEntry] = useState({
    taxType: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    source: ""
  })

  const totalTaxPaid = taxEntries.reduce((sum, entry) => sum + entry.amount, 0)
  const verifiedTax = taxEntries.filter(entry => entry.isVerified).reduce((sum, entry) => sum + entry.amount, 0)
  const pendingTax = taxEntries.filter(entry => !entry.isVerified).reduce((sum, entry) => sum + entry.amount, 0)

  const handleImportForm16 = async () => {
    setIsImporting(true)
    // Simulate API call
    setTimeout(() => {
      setIsImporting(false)
      // Add new tax entry
      const newEntry: TaxEntry = {
        id: Date.now().toString(),
        taxType: "TDS",
        amount: 10000,
        description: "Form-16 Import - July Salary",
        category: "SALARY",
        date: new Date().toISOString().split('T')[0],
        source: "Form-16",
        isVerified: true,
        verificationStatus: "VERIFIED"
      }
      setTaxEntries([...taxEntries, newEntry])
    }, 2000)
  }

  const handleImportForm26AS = async () => {
    setIsImporting(true)
    // Simulate API call
    setTimeout(() => {
      setIsImporting(false)
      // Add multiple tax entries
      const newEntries: TaxEntry[] = [
        {
          id: Date.now().toString(),
          taxType: "TDS",
          amount: 5000,
          description: "Bank Interest TDS",
          category: "INTEREST",
          date: new Date().toISOString().split('T')[0],
          source: "Form-26AS",
          isVerified: true,
          verificationStatus: "VERIFIED"
        },
        {
          id: (Date.now() + 1).toString(),
          taxType: "TDS",
          amount: 3000,
          description: "Dividend TDS",
          category: "DIVIDEND",
          date: new Date().toISOString().split('T')[0],
          source: "Form-26AS",
          isVerified: true,
          verificationStatus: "VERIFIED"
        }
      ]
      setTaxEntries([...taxEntries, ...newEntries])
    }, 2000)
  }

  const handleAddTaxEntry = () => {
    if (newTaxEntry.taxType && newTaxEntry.amount) {
      const entry: TaxEntry = {
        id: Date.now().toString(),
        taxType: newTaxEntry.taxType,
        amount: parseFloat(newTaxEntry.amount),
        description: newTaxEntry.description || "",
        category: newTaxEntry.category || "",
        date: newTaxEntry.date || new Date().toISOString().split('T')[0],
        source: newTaxEntry.source || "Manual",
        isVerified: false,
        verificationStatus: "PENDING"
      }
      setTaxEntries([...taxEntries, entry])
      setNewTaxEntry({
        taxType: "",
        amount: "",
        description: "",
        category: "",
        date: "",
        source: ""
      })
    }
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Verified
        </Badge>
      case "REJECTED":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Income Tax Tracker</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage your income tax calculations and imports</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Tax Paid</p>
                <p className="text-2xl font-bold">₹{totalTaxPaid.toLocaleString()}</p>
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
                <p className="text-sm text-slate-600 dark:text-slate-400">Verified Tax</p>
                <p className="text-2xl font-bold">₹{verifiedTax.toLocaleString()}</p>
                <Progress value={(verifiedTax / totalTaxPaid) * 100} className="mt-2" />
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Pending Verification</p>
                <p className="text-2xl font-bold">₹{pendingTax.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded-full p-2">
                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="import">Import</TabsTrigger>
          <TabsTrigger value="calculate">Calculate</TabsTrigger>
          <TabsTrigger value="entries">Entries</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Common income tax tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={() => setActiveTab("import")}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Form-16
                </Button>
                <Button className="w-full" variant="outline" onClick={() => setActiveTab("import")}>
                  <Download className="h-4 w-4 mr-2" />
                  Import Form-26AS
                </Button>
                <Button className="w-full" variant="outline" onClick={() => setActiveTab("calculate")}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Advance Tax
                </Button>
                <Button className="w-full" variant="outline" onClick={() => setActiveTab("entries")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Manual Entry
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tax Summary</CardTitle>
                <CardDescription>Breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(
                    taxEntries.reduce((acc, entry) => {
                      acc[entry.category] = (acc[entry.category] || 0) + entry.amount
                      return acc
                    }, {} as Record<string, number>)
                  ).map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{category}</span>
                      <span className="text-sm">₹{amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="import" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Import Form-16</CardTitle>
                <CardDescription>Import your salary Form-16 details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pan">PAN Number</Label>
                  <Input
                    id="pan"
                    placeholder="ABCDE1234F"
                    value={formData.panNumber}
                    onChange={(e) => setFormData({...formData, panNumber: e.target.value.toUpperCase()})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Form-16 password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Assessment Year</Label>
                  <Select value={formData.assessmentYear} onValueChange={(value) => setFormData({...formData, assessmentYear: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-25">2024-25</SelectItem>
                      <SelectItem value="2023-24">2023-24</SelectItem>
                      <SelectItem value="2022-23">2022-23</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleImportForm16}
                  disabled={isImporting || !formData.panNumber || !formData.password}
                >
                  {isImporting ? "Importing..." : "Import Form-16"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Import Form-26AS</CardTitle>
                <CardDescription>Import your tax credit statement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pan26as">PAN Number</Label>
                  <Input
                    id="pan26as"
                    placeholder="ABCDE1234F"
                    value={formData.panNumber}
                    onChange={(e) => setFormData({...formData, panNumber: e.target.value.toUpperCase()})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year26as">Assessment Year</Label>
                  <Select value={formData.assessmentYear} onValueChange={(value) => setFormData({...formData, assessmentYear: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-25">2024-25</SelectItem>
                      <SelectItem value="2023-24">2023-24</SelectItem>
                      <SelectItem value="2022-23">2022-23</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Form-26AS contains all tax deductions made on your behalf. This includes TDS from salary, interest, dividends, etc.
                  </AlertDescription>
                </Alert>
                <Button 
                  className="w-full" 
                  onClick={handleImportForm26AS}
                  disabled={isImporting || !formData.panNumber}
                >
                  {isImporting ? "Importing..." : "Import Form-26AS"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calculate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Advance Tax Calculator</CardTitle>
              <CardDescription>Calculate your advance tax liability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="income">Estimated Annual Income</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="1500000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deductions">Total Deductions</Label>
                  <Input
                    id="deductions"
                    type="number"
                    placeholder="150000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regime">Tax Regime</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select regime" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Regime</SelectItem>
                      <SelectItem value="old">Old Regime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tds">TDS Already Deducted</Label>
                  <Input
                    id="tds"
                    type="number"
                    placeholder="100000"
                  />
                </div>
              </div>
              <Button className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Tax
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Tax Entry</CardTitle>
              <CardDescription>Manually add a tax entry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxType">Tax Type</Label>
                  <Select 
                    value={newTaxEntry.taxType} 
                    onValueChange={(value) => setNewTaxEntry({...newTaxEntry, taxType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tax type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TDS">TDS</SelectItem>
                      <SelectItem value="ADVANCE_TAX">Advance Tax</SelectItem>
                      <SelectItem value="SELF_ASSESSMENT">Self Assessment Tax</SelectItem>
                      <SelectItem value="INTEREST">Interest Income</SelectItem>
                      <SelectItem value="DIVIDEND">Dividend Income</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="5000"
                    value={newTaxEntry.amount}
                    onChange={(e) => setNewTaxEntry({...newTaxEntry, amount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newTaxEntry.category} 
                    onValueChange={(value) => setNewTaxEntry({...newTaxEntry, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SALARY">Salary</SelectItem>
                      <SelectItem value="INTEREST">Interest</SelectItem>
                      <SelectItem value="BUSINESS">Business</SelectItem>
                      <SelectItem value="DIVIDEND">Dividend</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTaxEntry.date}
                    onChange={(e) => setNewTaxEntry({...newTaxEntry, date: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter description"
                  value={newTaxEntry.description}
                  onChange={(e) => setNewTaxEntry({...newTaxEntry, description: e.target.value})}
                />
              </div>
              <Button onClick={handleAddTaxEntry}>
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tax Entries</CardTitle>
              <CardDescription>All your tax entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {taxEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{entry.description}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {entry.category} • {entry.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="font-medium text-sm">₹{entry.amount.toLocaleString()}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">{entry.source}</div>
                      </div>
                      {getVerificationBadge(entry.verificationStatus)}
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