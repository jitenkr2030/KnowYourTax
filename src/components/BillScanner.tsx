"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Camera, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Scan,
  TrendingUp,
  Building,
  ShoppingCart,
  Home,
  BookOpen,
  Calculator,
  Info,
  ArrowUpRight,
  Percent,
  DollarSign,
  Users,
  Truck,
  Landmark,
  GraduationCap,
  Film,
  Briefcase,
  Gift,
  BarChart3,
  Crown,
  CreditCard,
  Search
} from "lucide-react"

interface ScannedBill {
  id: string
  fileName: string
  amount: number
  date: string
  merchant: string
  category: string
  taxCategory: string
  confidence: number
  status: "pending" | "processing" | "classified" | "confirmed"
  extractedText: string
  taxAmount: number
}

interface BillScannerProps {
  userId: string
  onBack: () => void
  onAddToTracker: (payment: any) => void
}

const taxCategories = [
  {
    id: "gst",
    name: "GST",
    description: "Goods and Services Tax",
    icon: Briefcase,
    color: "emerald",
    keywords: ["gst", "goods", "services", "restaurant", "hotel", "shopping", "retail"]
  },
  {
    id: "income-tax",
    name: "Income Tax",
    description: "Tax deducted at source",
    icon: Users,
    color: "blue",
    keywords: ["tds", "income tax", "salary", "professional fees", "commission"]
  },
  {
    id: "fuel-tax",
    name: "Fuel Tax",
    description: "Tax on petroleum products",
    icon: Truck,
    color: "amber",
    keywords: ["petrol", "diesel", "fuel", "gas", "cng", "lpg"]
  },
  {
    id: "property-tax",
    name: "Property Tax",
    description: "Municipal tax on property",
    icon: Home,
    color: "slate",
    keywords: ["property tax", "municipal", "house tax", "building tax"]
  },
  {
    id: "capital-gains",
    name: "Capital Gains Tax",
    description: "Tax on asset sales",
    icon: TrendingUp,
    color: "orange",
    keywords: ["capital gains", "asset sale", "property sale", "shares", "securities"]
  },
  {
    id: "securities-tax",
    name: "Securities Transaction Tax",
    description: "Tax on stock market transactions",
    icon: BarChart3,
    color: "green",
    keywords: ["stt", "securities", "stock market", "shares", "trading"]
  },
  {
    id: "custom-duty",
    name: "Custom Duty",
    description: "Tax on imports and exports",
    icon: Landmark,
    color: "teal",
    keywords: ["custom duty", "import", "export", "foreign", "shipping"]
  },
  {
    id: "education-cess",
    name: "Education Cess",
    description: "Additional tax for education",
    icon: GraduationCap,
    color: "blue",
    keywords: ["education cess", "cess", "education", "swachh bharat", "krishi kalyan"]
  },
  {
    id: "entertainment-tax",
    name: "Entertainment Tax",
    description: "Tax on entertainment activities",
    icon: Film,
    color: "purple",
    keywords: ["entertainment", "movie", "theatre", "event", "show"]
  },
  {
    id: "professional-tax",
    name: "Professional Tax",
    description: "Tax on professions",
    icon: Briefcase,
    color: "indigo",
    keywords: ["professional tax", "profession", "trade", "employment"]
  },
  {
    id: "stamp-duty",
    name: "Stamp Duty",
    description: "Tax on legal documents",
    icon: FileText,
    color: "gray",
    keywords: ["stamp duty", "registration", "legal", "document", "agreement"]
  }
]

export default function BillScanner({ userId, onBack, onAddToTracker }: BillScannerProps) {
  const [scannedBills, setScannedBills] = useState<ScannedBill[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState("scan")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      processBillFile(file)
    }
  }

  const processBillFile = (file: File) => {
    setIsScanning(true)
    
    // Simulate bill processing
    setTimeout(() => {
      const mockBill: ScannedBill = {
        id: Date.now().toString(),
        fileName: file.name,
        amount: Math.floor(Math.random() * 10000) + 1000,
        date: new Date().toISOString().split('T')[0],
        merchant: "Sample Merchant",
        category: "retail",
        taxCategory: "gst",
        confidence: 0.85,
        status: "classified",
        extractedText: "Invoice #INV-001\nDate: 15/06/2024\nAmount: ₹5,000\nGST: 18% (₹900)\nTotal: ₹5,900",
        taxAmount: 900
      }
      
      setScannedBills([mockBill, ...scannedBills])
      setIsScanning(false)
      setSelectedFile(null)
    }, 2000)
  }

  const classifyBill = (text: string) => {
    const lowerText = text.toLowerCase()
    
    for (const category of taxCategories) {
      for (const keyword of category.keywords) {
        if (lowerText.includes(keyword)) {
          return category
        }
      }
    }
    
    return taxCategories[0] // Default to GST
  }

  const handleCameraScan = () => {
    setIsScanning(true)
    
    // Simulate camera scanning
    setTimeout(() => {
      const mockBill: ScannedBill = {
        id: Date.now().toString(),
        fileName: "camera_scan.jpg",
        amount: Math.floor(Math.random() * 5000) + 500,
        date: new Date().toISOString().split('T')[0],
        merchant: "Gas Station",
        category: "fuel",
        taxCategory: "fuel-tax",
        confidence: 0.92,
        status: "classified",
        extractedText: "Fuel Station\nDate: 15/06/2024\nPetrol: 25L\nRate: ₹100/L\nAmount: ₹2,500\nTax: ₹300",
        taxAmount: 300
      }
      
      setScannedBills([mockBill, ...scannedBills])
      setIsScanning(false)
    }, 3000)
  }

  const confirmBill = (billId: string) => {
    setScannedBills(scannedBills.map(bill => 
      bill.id === billId ? { ...bill, status: "confirmed" } : bill
    ))
  }

  const addToTracker = (bill: ScannedBill) => {
    const taxCategory = taxCategories.find(cat => cat.id === bill.taxCategory)
    if (taxCategory) {
      onAddToTracker({
        taxId: taxCategories.findIndex(cat => cat.id === bill.taxCategory) + 1,
        taxName: taxCategory.name,
        amount: bill.taxAmount,
        date: bill.date,
        description: `${bill.merchant} - ${bill.fileName}`,
        category: taxCategory.name.includes("GST") ? "indirect" : 
                 taxCategory.name.includes("Income") ? "direct" : "other"
      })
    }
  }

  const getStatusBadge = (status: ScannedBill["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "processing":
        return <Badge variant="outline">Processing</Badge>
      case "classified":
        return <Badge className="bg-yellow-100 text-yellow-800">Classified</Badge>
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600"
    if (confidence >= 0.6) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Bill Scanner</h1>
          <p className="text-slate-600 dark:text-slate-400">Scan bills and automatically classify tax categories</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{scannedBills.length}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Bills Scanned</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {scannedBills.filter(b => b.status === "confirmed").length}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Confirmed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {scannedBills.filter(b => b.status === "classified").length}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Classified</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {scannedBills.reduce((sum, bill) => sum + bill.taxAmount, 0)}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Total Tax Found</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="scan" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scan">Scan Bills</TabsTrigger>
          <TabsTrigger value="classified">Classified Bills</TabsTrigger>
          <TabsTrigger value="categories">Tax Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="space-y-6">
          {/* Scan Options */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Camera Scan
                </CardTitle>
                <CardDescription>Take a photo of your bill</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8 text-center">
                  <Camera className="h-16 w-16 mx-auto mb-4 text-slate-400" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Point your camera at the bill and scan
                  </p>
                  <Button 
                    onClick={handleCameraScan}
                    disabled={isScanning}
                    className="w-full"
                  >
                    {isScanning ? "Scanning..." : "Open Camera"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Bill
                </CardTitle>
                <CardDescription>Upload bill image or PDF</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8 text-center">
                  <Upload className="h-16 w-16 mx-auto mb-4 text-slate-400" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Upload bill images or PDF files
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isScanning}
                    className="w-full"
                  >
                    {isScanning ? "Processing..." : "Choose File"}
                  </Button>
                  {selectedFile && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Supported Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Supported Tax Categories</CardTitle>
              <CardDescription>Bills are automatically classified into these tax categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {taxCategories.slice(0, 6).map((category) => (
                  <div key={category.id} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <category.icon className="h-4 w-4 text-slate-600" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classified" className="space-y-6">
          {/* Scanned Bills List */}
          <div className="space-y-4">
            {scannedBills.map((bill) => {
              const taxCategory = taxCategories.find(cat => cat.id === bill.taxCategory)
              return (
                <Card key={bill.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <Scan className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{bill.merchant}</h3>
                            {getStatusBadge(bill.status)}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            {bill.fileName} • {new Date(bill.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="font-medium">₹{bill.amount.toLocaleString()}</span>
                            <span className="text-green-600 font-medium">
                              Tax: ₹{bill.taxAmount.toLocaleString()}
                            </span>
                            {taxCategory && (
                              <Badge variant="outline">
                                {taxCategory.name}
                              </Badge>
                            )}
                            <span className={`text-xs ${getConfidenceColor(bill.confidence)}`}>
                              {Math.round(bill.confidence * 100)}% match
                            </span>
                          </div>
                          <div className="mt-2 p-2 bg-slate-50 dark:bg-slate-800 rounded text-xs text-slate-600 dark:text-slate-400">
                            {bill.extractedText}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {bill.status === "classified" && (
                          <Button 
                            size="sm" 
                            onClick={() => confirmBill(bill.id)}
                          >
                            Confirm
                          </Button>
                        )}
                        {bill.status === "confirmed" && (
                          <Button 
                            size="sm"
                            onClick={() => addToTracker(bill)}
                          >
                            Add to Tracker
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
            
            {scannedBills.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Scan className="h-16 w-16 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-600 dark:text-slate-400">
                    No bills scanned yet. Start by scanning or uploading a bill.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {/* Tax Categories Details */}
          <div className="space-y-4">
            {taxCategories.map((category) => (
              <Card key={category.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {category.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {category.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {scannedBills.filter(b => b.taxCategory === category.id).length} bills
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Processing Overlay */}
      {isScanning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Processing Bill</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Analyzing bill and extracting tax information...
              </p>
              <Progress value={75} className="mt-4" />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}