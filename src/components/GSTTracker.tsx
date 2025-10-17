"use client"

import { useState, useRef } from "react"
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
  Camera, 
  Upload, 
  FileText, 
  Calculator, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Trash2,
  QrCode,
  Image as ImageIcon
} from "lucide-react"

interface GSTTrackerProps {
  onBack: () => void
  userId: string
}

interface GSTEntry {
  id: string
  amount: number
  gstAmount: number
  cgstAmount?: number
  sgstAmount?: number
  igstAmount?: number
  cessAmount?: number
  billNumber?: string
  billDate?: string
  supplierName?: string
  supplierGSTIN?: string
  category?: string
  description?: string
  date: string
  isVerified: boolean
  verificationStatus: string
}

export default function GSTTracker({ onBack, userId }: GSTTrackerProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isScanning, setIsScanning] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [gstEntries, setGstEntries] = useState<GSTEntry[]>([
    {
      id: "1",
      amount: 1180,
      gstAmount: 180,
      cgstAmount: 90,
      sgstAmount: 90,
      billNumber: "INV-001",
      billDate: "2024-06-15",
      supplierName: "ABC Electronics",
      supplierGSTIN: "29ABCDE1234F1Z5",
      category: "ELECTRONICS",
      description: "Smartphone Purchase",
      date: "2024-06-15",
      isVerified: true,
      verificationStatus: "VERIFIED"
    },
    {
      id: "2",
      amount: 590,
      gstAmount: 90,
      cgstAmount: 45,
      sgstAmount: 45,
      billNumber: "INV-002",
      billDate: "2024-06-10",
      supplierName: "XYZ Restaurant",
      supplierGSTIN: "27FGHIJ5678K2L6",
      category: "RESTAURANT",
      description: "Dinner for 2",
      date: "2024-06-10",
      isVerified: true,
      verificationStatus: "VERIFIED"
    },
    {
      id: "3",
      amount: 2200,
      gstAmount: 200,
      igstAmount: 200,
      billNumber: "INV-003",
      billDate: "2024-06-05",
      supplierName: "Online Store",
      supplierGSTIN: "12LMNOP9012M3N7",
      category: "CLOTHING",
      description: "Online Shopping",
      date: "2024-06-05",
      isVerified: false,
      verificationStatus: "PENDING"
    }
  ])

  const [manualEntry, setManualEntry] = useState({
    amount: "",
    gstAmount: "",
    cgstAmount: "",
    sgstAmount: "",
    igstAmount: "",
    cessAmount: "",
    billNumber: "",
    billDate: "",
    supplierName: "",
    supplierGSTIN: "",
    category: "",
    description: ""
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const totalGSTPaid = gstEntries.reduce((sum, entry) => sum + entry.gstAmount, 0)
  const totalAmount = gstEntries.reduce((sum, entry) => sum + entry.amount, 0)
  const verifiedGST = gstEntries.filter(entry => entry.isVerified).reduce((sum, entry) => sum + entry.gstAmount, 0)
  const pendingGST = gstEntries.filter(entry => !entry.isVerified).reduce((sum, entry) => sum + entry.gstAmount, 0)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsProcessing(true)
      // Simulate OCR processing
      setTimeout(() => {
        setIsProcessing(false)
        // Add new GST entry
        const newEntry: GSTEntry = {
          id: Date.now().toString(),
          amount: Math.floor(Math.random() * 5000) + 500,
          gstAmount: Math.floor(Math.random() * 500) + 50,
          cgstAmount: Math.floor(Math.random() * 250) + 25,
          sgstAmount: Math.floor(Math.random() * 250) + 25,
          billNumber: `OCR-${Date.now()}`,
          billDate: new Date().toISOString().split('T')[0],
          supplierName: "Scanned Supplier",
          supplierGSTIN: "12ABCDE1234F1Z5",
          category: "ELECTRONICS",
          description: "Scanned Bill",
          date: new Date().toISOString().split('T')[0],
          isVerified: false,
          verificationStatus: "PENDING"
        }
        setGstEntries([...gstEntries, newEntry])
      }, 3000)
    }
  }

  const handleCameraScan = () => {
    setIsScanning(true)
    // Simulate camera scanning
    setTimeout(() => {
      setIsScanning(false)
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        // Add new GST entry
        const newEntry: GSTEntry = {
          id: Date.now().toString(),
          amount: Math.floor(Math.random() * 3000) + 300,
          gstAmount: Math.floor(Math.random() * 300) + 30,
          cgstAmount: Math.floor(Math.random() * 150) + 15,
          sgstAmount: Math.floor(Math.random() * 150) + 15,
          billNumber: `CAM-${Date.now()}`,
          billDate: new Date().toISOString().split('T')[0],
          supplierName: "Camera Scanned",
          supplierGSTIN: "29FGHIJ5678K2L6",
          category: "RESTAURANT",
          description: "Camera Scanned Bill",
          date: new Date().toISOString().split('T')[0],
          isVerified: false,
          verificationStatus: "PENDING"
        }
        setGstEntries([...gstEntries, newEntry])
      }, 2000)
    }, 1000)
  }

  const handleAddManualEntry = () => {
    if (manualEntry.amount && manualEntry.gstAmount) {
      const entry: GSTEntry = {
        id: Date.now().toString(),
        amount: parseFloat(manualEntry.amount),
        gstAmount: parseFloat(manualEntry.gstAmount),
        cgstAmount: manualEntry.cgstAmount ? parseFloat(manualEntry.cgstAmount) : undefined,
        sgstAmount: manualEntry.sgstAmount ? parseFloat(manualEntry.sgstAmount) : undefined,
        igstAmount: manualEntry.igstAmount ? parseFloat(manualEntry.igstAmount) : undefined,
        cessAmount: manualEntry.cessAmount ? parseFloat(manualEntry.cessAmount) : undefined,
        billNumber: manualEntry.billNumber || undefined,
        billDate: manualEntry.billDate || undefined,
        supplierName: manualEntry.supplierName || undefined,
        supplierGSTIN: manualEntry.supplierGSTIN || undefined,
        category: manualEntry.category || undefined,
        description: manualEntry.description || undefined,
        date: new Date().toISOString().split('T')[0],
        isVerified: false,
        verificationStatus: "PENDING"
      }
      setGstEntries([...gstEntries, entry])
      setManualEntry({
        amount: "",
        gstAmount: "",
        cgstAmount: "",
        sgstAmount: "",
        igstAmount: "",
        cessAmount: "",
        billNumber: "",
        billDate: "",
        supplierName: "",
        supplierGSTIN: "",
        category: "",
        description: ""
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">GST Tracker</h2>
          <p className="text-slate-600 dark:text-slate-400">Track your GST payments with OCR scanning</p>
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
                <p className="text-sm text-slate-600 dark:text-slate-400">Total GST Paid</p>
                <p className="text-2xl font-bold">₹{totalGSTPaid.toLocaleString()}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">on ₹{totalAmount.toLocaleString()} spent</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-2">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Verified GST</p>
                <p className="text-2xl font-bold">₹{verifiedGST.toLocaleString()}</p>
                <Progress value={(verifiedGST / totalGSTPaid) * 100} className="mt-2" />
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-2">
                <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Pending Verification</p>
                <p className="text-2xl font-bold">₹{pendingGST.toLocaleString()}</p>
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
          <TabsTrigger value="scan">Scan Bill</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="entries">Entries</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Common GST tracking tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={() => setActiveTab("scan")}>
                  <Camera className="h-4 w-4 mr-2" />
                  Scan GST Bill
                </Button>
                <Button className="w-full" variant="outline" onClick={() => setActiveTab("scan")}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Bill Image
                </Button>
                <Button className="w-full" variant="outline" onClick={() => setActiveTab("manual")}>
                  <FileText className="h-4 w-4 mr-2" />
                  Manual GST Entry
                </Button>
                <Button className="w-full" variant="outline" onClick={() => setActiveTab("entries")}>
                  <Eye className="h-4 w-4 mr-2" />
                  View All Entries
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">GST Summary</CardTitle>
                <CardDescription>Breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(
                    gstEntries.reduce((acc, entry) => {
                      acc[entry.category || "OTHER"] = (acc[entry.category || "OTHER"] || 0) + entry.gstAmount
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

        <TabsContent value="scan" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Camera Scan</CardTitle>
                <CardDescription>Scan GST bill using camera</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Point your camera at the GST bill to scan
                  </p>
                  <Button 
                    onClick={handleCameraScan}
                    disabled={isScanning || isProcessing}
                  >
                    {isScanning ? "Scanning..." : isProcessing ? "Processing..." : "Start Scanning"}
                  </Button>
                </div>
                <Alert>
                  <QrCode className="h-4 w-4" />
                  <AlertDescription>
                    Make sure the GST bill is clearly visible and contains the QR code for best results.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload Image</CardTitle>
                <CardDescription>Upload GST bill image for OCR processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Upload a clear image of your GST bill
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Image
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Processing image...</span>
                      <span>50%</span>
                    </div>
                    <Progress value={50} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Manual GST Entry</CardTitle>
              <CardDescription>Enter GST details manually</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Bill Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="1180"
                    value={manualEntry.amount}
                    onChange={(e) => setManualEntry({...manualEntry, amount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstAmount">GST Amount</Label>
                  <Input
                    id="gstAmount"
                    type="number"
                    placeholder="180"
                    value={manualEntry.gstAmount}
                    onChange={(e) => setManualEntry({...manualEntry, gstAmount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cgstAmount">CGST Amount (Optional)</Label>
                  <Input
                    id="cgstAmount"
                    type="number"
                    placeholder="90"
                    value={manualEntry.cgstAmount}
                    onChange={(e) => setManualEntry({...manualEntry, cgstAmount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sgstAmount">SGST Amount (Optional)</Label>
                  <Input
                    id="sgstAmount"
                    type="number"
                    placeholder="90"
                    value={manualEntry.sgstAmount}
                    onChange={(e) => setManualEntry({...manualEntry, sgstAmount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="igstAmount">IGST Amount (Optional)</Label>
                  <Input
                    id="igstAmount"
                    type="number"
                    placeholder="0"
                    value={manualEntry.igstAmount}
                    onChange={(e) => setManualEntry({...manualEntry, igstAmount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cessAmount">Cess Amount (Optional)</Label>
                  <Input
                    id="cessAmount"
                    type="number"
                    placeholder="0"
                    value={manualEntry.cessAmount}
                    onChange={(e) => setManualEntry({...manualEntry, cessAmount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplierName">Supplier Name</Label>
                  <Input
                    id="supplierName"
                    placeholder="ABC Electronics"
                    value={manualEntry.supplierName}
                    onChange={(e) => setManualEntry({...manualEntry, supplierName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplierGSTIN">Supplier GSTIN</Label>
                  <Input
                    id="supplierGSTIN"
                    placeholder="29ABCDE1234F1Z5"
                    value={manualEntry.supplierGSTIN}
                    onChange={(e) => setManualEntry({...manualEntry, supplierGSTIN: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billNumber">Bill Number</Label>
                  <Input
                    id="billNumber"
                    placeholder="INV-001"
                    value={manualEntry.billNumber}
                    onChange={(e) => setManualEntry({...manualEntry, billNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billDate">Bill Date</Label>
                  <Input
                    id="billDate"
                    type="date"
                    value={manualEntry.billDate}
                    onChange={(e) => setManualEntry({...manualEntry, billDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={manualEntry.category} 
                    onValueChange={(value) => setManualEntry({...manualEntry, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GROCERIES">Groceries</SelectItem>
                      <SelectItem value="ELECTRONICS">Electronics</SelectItem>
                      <SelectItem value="RESTAURANT">Restaurant</SelectItem>
                      <SelectItem value="CLOTHING">Clothing</SelectItem>
                      <SelectItem value="SERVICES">Services</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Smartphone Purchase"
                    value={manualEntry.description}
                    onChange={(e) => setManualEntry({...manualEntry, description: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={handleAddManualEntry} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add GST Entry
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">GST Entries</CardTitle>
              <CardDescription>All your GST entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {gstEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{entry.description}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {entry.supplierName} • {entry.category} • {entry.date}
                        </div>
                        {entry.billNumber && (
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            Bill: {entry.billNumber}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="font-medium text-sm">₹{entry.gstAmount.toLocaleString()}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          on ₹{entry.amount.toLocaleString()}
                        </div>
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