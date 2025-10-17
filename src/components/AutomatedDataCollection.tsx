"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Download, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Database,
  FileText,
  Building,
  TrendingUp,
  Users,
  Info,
  Eye,
  Filter
} from "lucide-react"

interface TaxData {
  id: string
  type: string
  description: string
  amount: number
  date: string
  status: "imported" | "pending" | "failed"
  source: string
}

interface Form26ASData {
  tdsDetails: TaxData[]
  taxPaid: TaxData[]
  refund: TaxData[]
  interest: TaxData[]
}

interface AISData {
  salaryIncome: TaxData[]
  interestIncome: TaxData[]
  dividendIncome: TaxData[]
  capitalGains: TaxData[]
}

interface TISData {
  specifiedFinancialTransactions: TaxData[]
  mutualFundTransactions: TaxData[]
  shareTransactions: TaxData[]
  immovableProperty: TaxData[]
}

const mockForm26ASData: Form26ASData = {
  tdsDetails: [
    {
      id: "1",
      type: "TDS from Salary",
      description: "ABC Corp Ltd - Salary TDS",
      amount: 45000,
      date: "2024-03-31",
      status: "imported",
      source: "ABC Corp Ltd"
    },
    {
      id: "2",
      type: "TDS from Interest",
      description: "SBI Bank - Fixed Deposit Interest",
      amount: 8500,
      date: "2024-03-15",
      status: "imported",
      source: "SBI Bank"
    }
  ],
  taxPaid: [
    {
      id: "3",
      type: "Self Assessment Tax",
      description: "Advance Tax Payment - Q4",
      amount: 25000,
      date: "2024-03-15",
      status: "imported",
      source: "Self"
    }
  ],
  refund: [
    {
      id: "4",
      type: "Income Tax Refund",
      description: "Refund for AY 2023-24",
      amount: 8500,
      date: "2024-02-20",
      status: "imported",
      source: "Income Tax Department"
    }
  ],
  interest: [
    {
      id: "5",
      type: "Interest on Refund",
      description: "Interest on delayed refund",
      amount: 450,
      date: "2024-02-25",
      status: "imported",
      source: "Income Tax Department"
    }
  ]
}

const mockAISData: AISData = {
  salaryIncome: [
    {
      id: "6",
      type: "Salary Income",
      description: "ABC Corp Ltd - Annual Salary",
      amount: 1200000,
      date: "2024-03-31",
      status: "imported",
      source: "ABC Corp Ltd"
    }
  ],
  interestIncome: [
    {
      id: "7",
      type: "Interest Income",
      description: "SBI Bank - Savings Account Interest",
      amount: 12500,
      date: "2024-03-31",
      status: "imported",
      source: "SBI Bank"
    },
    {
      id: "8",
      type: "Interest Income",
      description: "HDFC Bank - Fixed Deposit Interest",
      amount: 45000,
      date: "2024-03-31",
      status: "imported",
      source: "HDFC Bank"
    }
  ],
  dividendIncome: [
    {
      id: "9",
      type: "Dividend Income",
      description: "Reliance Industries Ltd - Dividend",
      amount: 8500,
      date: "2024-03-15",
      status: "imported",
      source: "Reliance Industries Ltd"
    }
  ],
  capitalGains: [
    {
      id: "10",
      type: "Capital Gains",
      description: "Sale of Shares - Long Term",
      amount: 125000,
      date: "2024-02-28",
      status: "imported",
      source: "Share Trading"
    }
  ]
}

const mockTISData: TISData = {
  specifiedFinancialTransactions: [
    {
      id: "11",
      type: "Cash Deposit",
      description: "Cash deposit above ₹10 lakh",
      amount: 1500000,
      date: "2024-01-15",
      status: "imported",
      source: "SBI Bank"
    }
  ],
  mutualFundTransactions: [
    {
      id: "12",
      type: "Mutual Fund Investment",
      description: "Equity Mutual Fund Purchase",
      amount: 250000,
      date: "2024-02-10",
      status: "imported",
      source: "Mutual Fund Company"
    }
  ],
  shareTransactions: [
    {
      id: "13",
      type: "Share Purchase",
      description: "Purchase of Equity Shares",
      amount: 450000,
      date: "2024-01-20",
      status: "imported",
      source: "Stock Exchange"
    }
  ],
  immovableProperty: [
    {
      id: "14",
      type: "Property Purchase",
      description: "Purchase of Residential Property",
      amount: 8500000,
      date: "2024-03-01",
      status: "imported",
      source: "Property Registration"
    }
  ]
}

interface AutomatedDataCollectionProps {
  onDataImported: (data: any) => void
  onBack: () => void
  userId: string
}

export default function AutomatedDataCollection({ onDataImported, onBack, userId }: AutomatedDataCollectionProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [importStatus, setImportStatus] = useState<{[key: string]: "pending" | "loading" | "completed" | "failed"}>({
    "form26as": "pending",
    "ais": "pending",
    "tis": "pending"
  })
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)

  const handleImportData = async (dataType: string) => {
    setImportStatus(prev => ({ ...prev, [dataType]: "loading" }))
    setIsImporting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setImportStatus(prev => ({ ...prev, [dataType]: "completed" }))
    setImportProgress(prev => prev + 33)
    
    if (importProgress >= 66) {
      setIsImporting(false)
      onDataImported({
        form26as: mockForm26ASData,
        ais: mockAISData,
        tis: mockTISData
      })
    }
  }

  const handleImportAll = async () => {
    setIsImporting(true)
    setImportProgress(0)
    
    // Import Form 26AS
    setImportStatus(prev => ({ ...prev, "form26as": "loading" }))
    await new Promise(resolve => setTimeout(resolve, 1500))
    setImportStatus(prev => ({ ...prev, "form26as": "completed" }))
    setImportProgress(33)
    
    // Import AIS
    setImportStatus(prev => ({ ...prev, "ais": "loading" }))
    await new Promise(resolve => setTimeout(resolve, 1500))
    setImportStatus(prev => ({ ...prev, "ais": "completed" }))
    setImportProgress(66)
    
    // Import TIS
    setImportStatus(prev => ({ ...prev, "tis": "loading" }))
    await new Promise(resolve => setTimeout(resolve, 1500))
    setImportStatus(prev => ({ ...prev, "tis": "completed" }))
    setImportProgress(100)
    
    setIsImporting(false)
    onDataImported({
      form26as: mockForm26ASData,
      ais: mockAISData,
      tis: mockTISData
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "loading":
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Imported</Badge>
      case "loading":
        return <Badge className="bg-blue-100 text-blue-800">Importing...</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
    }
  }

  const renderDataTable = (data: TaxData[], title: string) => (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-900">{title}</h3>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                {getStatusIcon(item.status)}
                <span className="font-medium text-sm">{item.type}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{item.description}</p>
              <p className="text-xs text-gray-500">Source: {item.source} • Date: {item.date}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">₹{item.amount.toLocaleString()}</p>
              {getStatusBadge(item.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Automated Data Collection</h1>
        <p className="text-gray-600">Import your tax data directly from Income Tax Department</p>
      </div>

      {/* Import Progress */}
      {isImporting && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Importing tax data...</span>
                <span>{importProgress}%</span>
              </div>
              <Progress value={importProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Sources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Form 26AS</span>
              {getStatusIcon(importStatus["form26as"])}
            </CardTitle>
            <CardDescription>
              Tax credit statement showing TDS, tax paid, and refund details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>TDS Details</span>
                <span className="font-medium">{mockForm26ASData.tdsDetails.length} entries</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax Paid</span>
                <span className="font-medium">{mockForm26ASData.taxPaid.length} entries</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Refunds</span>
                <span className="font-medium">{mockForm26ASData.refund.length} entries</span>
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={() => handleImportData("form26as")}
                disabled={importStatus["form26as"] === "completed" || isImporting}
              >
                {importStatus["form26as"] === "completed" ? "Imported" : "Import Form 26AS"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>AIS (Annual Information Statement)</span>
              {getStatusIcon(importStatus["ais"])}
            </CardTitle>
            <CardDescription>
              Comprehensive statement of all financial transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Salary Income</span>
                <span className="font-medium">{mockAISData.salaryIncome.length} entries</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Interest Income</span>
                <span className="font-medium">{mockAISData.interestIncome.length} entries</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Capital Gains</span>
                <span className="font-medium">{mockAISData.capitalGains.length} entries</span>
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={() => handleImportData("ais")}
                disabled={importStatus["ais"] === "completed" || isImporting}
              >
                {importStatus["ais"] === "completed" ? "Imported" : "Import AIS"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>TIS (Tax Information Summary)</span>
              {getStatusIcon(importStatus["tis"])}
            </CardTitle>
            <CardDescription>
              Summary of specified financial transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Property Transactions</span>
                <span className="font-medium">{mockTISData.immovableProperty.length} entries</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Share Transactions</span>
                <span className="font-medium">{mockTISData.shareTransactions.length} entries</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Mutual Funds</span>
                <span className="font-medium">{mockTISData.mutualFundTransactions.length} entries</span>
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={() => handleImportData("tis")}
                disabled={importStatus["tis"] === "completed" || isImporting}
              >
                {importStatus["tis"] === "completed" ? "Imported" : "Import TIS"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Import All Button */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Import All Data</h3>
              <p className="text-sm text-gray-600">Import Form 26AS, AIS, and TIS data in one go</p>
            </div>
            <Button 
              onClick={handleImportAll}
              disabled={isImporting || Object.values(importStatus).every(status => status === "completed")}
            >
              {isImporting ? "Importing..." : "Import All Data"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Preview */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="form26as">Form 26AS</TabsTrigger>
          <TabsTrigger value="ais-tis">AIS & TIS</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Total TDS</span>
                </div>
                <p className="text-2xl font-bold mt-1">₹53,500</p>
                <p className="text-xs text-gray-500">From 2 sources</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Total Income</span>
                </div>
                <p className="text-2xl font-bold mt-1">₹13.4L</p>
                <p className="text-xs text-gray-500">From 4 sources</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Transactions</span>
                </div>
                <p className="text-2xl font-bold mt-1">₹1.1Cr</p>
                <p className="text-xs text-gray-500">4 high-value transactions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Data Status</span>
                </div>
                <p className="text-2xl font-bold mt-1">
                  {Object.values(importStatus).filter(status => status === "completed").length}/3
                </p>
                <p className="text-xs text-gray-500">Sources imported</p>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Info className="w-4 h-4" />
            <AlertDescription>
              Your tax data has been successfully imported and categorized. Review the details in the Form 26AS and AIS & TIS tabs.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="form26as" className="space-y-6">
          {renderDataTable(mockForm26ASData.tdsDetails, "TDS Details")}
          {renderDataTable(mockForm26ASData.taxPaid, "Tax Paid")}
          {renderDataTable(mockForm26ASData.refund, "Refunds")}
          {renderDataTable(mockForm26ASData.interest, "Interest on Refund")}
        </TabsContent>

        <TabsContent value="ais-tis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">AIS Data</h3>
              {renderDataTable(mockAISData.salaryIncome, "Salary Income")}
              {renderDataTable(mockAISData.interestIncome, "Interest Income")}
              {renderDataTable(mockAISData.dividendIncome, "Dividend Income")}
              {renderDataTable(mockAISData.capitalGains, "Capital Gains")}
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">TIS Data</h3>
              {renderDataTable(mockTISData.specifiedFinancialTransactions, "Specified Financial Transactions")}
              {renderDataTable(mockTISData.mutualFundTransactions, "Mutual Fund Transactions")}
              {renderDataTable(mockTISData.shareTransactions, "Share Transactions")}
              {renderDataTable(mockTISData.immovableProperty, "Immovable Property")}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Form Selection
        </Button>
        <Button 
          onClick={() => onDataImported({
            form26as: mockForm26ASData,
            ais: mockAISData,
            tis: mockTISData
          })}
          disabled={Object.values(importStatus).some(status => status !== "completed")}
        >
          Continue to Deductions
        </Button>
      </div>
    </div>
  )
}