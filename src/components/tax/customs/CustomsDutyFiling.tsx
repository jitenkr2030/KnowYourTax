'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { 
  Ship, 
  Plane, 
  Truck, 
  FileText, 
  Plus, 
  Download, 
  Search,
  Eye,
  Edit,
  Calculator,
  Package,
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  Barcode
} from 'lucide-react'
import { format } from 'date-fns'

interface BillOfEntry {
  id: string
  beNumber: string
  beDate: Date
  importType: 'Sea' | 'Air' | 'Land'
  portOfEntry: string
  shippingBillNumber: string
  shippingBillDate: Date
  importerName: string
  importerIEC: string
  supplierName: string
  supplierCountry: string
  hsCode: string
  itemDescription: string
  quantity: number
  unit: string
  assessableValue: number
  customsDuty: number
  educationCess: number
  socialWelfareCess: number
  totalDuty: number
  status: 'Draft' | 'Filed' | 'Under Process' | 'Assessed' | 'Clearance Granted'
  icegateStatus: 'Not Submitted' | 'Submitted' | 'Processed' | 'Error'
}

const hsCodeDatabase = [
  { code: '8471', description: 'Automatic data processing machines and units thereof', dutyRate: 15 },
  { code: '8517', description: 'Telephone sets, including telephones for cellular networks', dutyRate: 10 },
  { code: '3004', description: 'Medicaments consisting of mixed or unmixed products', dutyRate: 10 },
  { code: '7308', description: 'Structures and parts of structures', dutyRate: 7.5 },
  { code: '8703', description: 'Motor cars and other motor vehicles', dutyRate: 100 }
]

const mockBills: BillOfEntry[] = [
  {
    id: '1',
    beNumber: 'BE/BLR/2024/0001',
    beDate: new Date('2024-01-15'),
    importType: 'Sea',
    portOfEntry: 'Jawaharlal Nehru Port Trust (JNPT)',
    shippingBillNumber: 'SB/BLR/2024/001',
    shippingBillDate: new Date('2024-01-10'),
    importerName: 'Tech Solutions India Pvt Ltd',
    importerIEC: '0512345678',
    supplierName: 'ABC Electronics Ltd',
    supplierCountry: 'China',
    hsCode: '8471',
    itemDescription: 'Laptop Computers - Model XYZ',
    quantity: 100,
    unit: 'NOS',
    assessableValue: 5000000,
    customsDuty: 750000,
    educationCess: 22500,
    socialWelfareCess: 7500,
    totalDuty: 780000,
    status: 'Clearance Granted',
    icegateStatus: 'Processed'
  },
  {
    id: '2',
    beNumber: 'BE/DEL/2024/0002',
    beDate: new Date('2024-01-18'),
    importType: 'Air',
    portOfEntry: 'Indira Gandhi International Airport (IGI)',
    shippingBillNumber: 'SB/DEL/2024/002',
    shippingBillDate: new Date('2024-01-16'),
    importerName: 'Pharma Corp Ltd',
    importerIEC: '0587654321',
    supplierName: 'Global Pharma Inc',
    supplierCountry: 'USA',
    hsCode: '3004',
    itemDescription: 'Pharmaceutical Tablets - 500mg',
    quantity: 5000,
    unit: 'STRIPS',
    assessableValue: 2500000,
    customsDuty: 250000,
    educationCess: 7500,
    socialWelfareCess: 2500,
    totalDuty: 260000,
    status: 'Under Process',
    icegateStatus: 'Submitted'
  },
  {
    id: '3',
    beNumber: 'BE/MUM/2024/0003',
    beDate: new Date('2024-01-20'),
    importType: 'Sea',
    portOfEntry: 'Mumbai Port Trust',
    shippingBillNumber: 'SB/MUM/2024/003',
    shippingBillDate: new Date('2024-01-18'),
    importerName: 'Auto Parts India Ltd',
    importerIEC: '0511223344',
    supplierName: 'Auto Components GmbH',
    supplierCountry: 'Germany',
    hsCode: '8703',
    itemDescription: 'Automotive Spare Parts',
    quantity: 2000,
    unit: 'KGS',
    assessableValue: 8000000,
    customsDuty: 8000000,
    educationCess: 240000,
    socialWelfareCess: 80000,
    totalDuty: 8320000,
    status: 'Filed',
    icegateStatus: 'Submitted'
  }
]

const getStatusColor = (status: BillOfEntry['status']) => {
  switch (status) {
    case 'Clearance Granted': return 'bg-green-100 text-green-800'
    case 'Assessed': return 'bg-blue-100 text-blue-800'
    case 'Under Process': return 'bg-yellow-100 text-yellow-800'
    case 'Filed': return 'bg-purple-100 text-purple-800'
    case 'Draft': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getICEGateStatusColor = (status: BillOfEntry['icegateStatus']) => {
  switch (status) {
    case 'Processed': return 'bg-green-100 text-green-800'
    case 'Submitted': return 'bg-blue-100 text-blue-800'
    case 'Error': return 'bg-red-100 text-red-800'
    case 'Not Submitted': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getImportTypeIcon = (type: BillOfEntry['importType']) => {
  switch (type) {
    case 'Sea': return <Ship className="h-4 w-4" />
    case 'Air': return <Plane className="h-4 w-4" />
    case 'Land': return <Truck className="h-4 w-4" />
    default: return <Package className="h-4 w-4" />
  }
}

export default function CustomsDutyFiling() {
  const [bills, setBills] = useState<BillOfEntry[]>(mockBills)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedBill, setSelectedBill] = useState<BillOfEntry | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [hsCodeSearch, setHsCodeSearch] = useState('')

  const filteredHSCodes = hsCodeDatabase.filter(hs =>
    hs.code.includes(hsCodeSearch) || hs.description.toLowerCase().includes(hsCodeSearch.toLowerCase())
  )

  const handleCreateBill = () => {
    setIsCreateDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customs Duty Filing</h1>
          <p className="text-muted-foreground">Manage Bill of Entry processing with ICEGATE integration</p>
        </div>
        <Button onClick={handleCreateBill}>
          <Plus className="h-4 w-4 mr-2" />
          Create Bill of Entry
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bills">Bills of Entry</TabsTrigger>
          <TabsTrigger value="hs-codes">HS Codes</TabsTrigger>
          <TabsTrigger value="duty-calculator">Duty Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bills.length}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cleared</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {bills.filter(bill => bill.status === 'Clearance Granted').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Clearance granted
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Under Process</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {bills.filter(bill => bill.status === 'Under Process').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  In progress
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Duty</CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{bills.reduce((sum, bill) => sum + bill.totalDuty, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Customs duty paid
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Bills */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bills of Entry</CardTitle>
              <CardDescription>
                Latest customs filings and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>BE Number</TableHead>
                      <TableHead>Importer</TableHead>
                      <TableHead>HS Code</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Duty</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>ICEGATE</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bills.map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell className="font-mono font-medium">{bill.beNumber}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{bill.importerName}</div>
                            <div className="text-sm text-muted-foreground">{bill.importerIEC}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">{bill.hsCode}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getImportTypeIcon(bill.importType)}
                            <span className="text-sm">{bill.importType}</span>
                          </div>
                        </TableCell>
                        <TableCell>₹{bill.assessableValue.toLocaleString()}</TableCell>
                        <TableCell>₹{bill.totalDuty.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(bill.status)}>
                            {bill.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getICEGateStatusColor(bill.icegateStatus)}>
                            {bill.icegateStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button size="sm" variant="outline" onClick={() => setSelectedBill(bill)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Bills of Entry</CardTitle>
              <CardDescription>
                Complete list of customs filings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>BE Number</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Importer</TableHead>
                      <TableHead>Port of Entry</TableHead>
                      <TableHead>Item Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Assessable Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bills.map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell className="font-mono font-medium">{bill.beNumber}</TableCell>
                        <TableCell>{format(bill.beDate, 'dd MMM yyyy')}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{bill.importerName}</div>
                            <div className="text-sm text-muted-foreground">{bill.importerIEC}</div>
                          </div>
                        </TableCell>
                        <TableCell>{bill.portOfEntry}</TableCell>
                        <TableCell className="max-w-xs truncate">{bill.itemDescription}</TableCell>
                        <TableCell>{bill.quantity} {bill.unit}</TableCell>
                        <TableCell>₹{bill.assessableValue.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(bill.status)}>
                            {bill.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedBill(bill)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hs-codes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>HS Code Classification</CardTitle>
              <CardDescription>
                Search and find correct HS codes for your imports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="hs-search">Search HS Codes</Label>
                    <Input
                      id="hs-search"
                      placeholder="Search by HS code or description..."
                      value={hsCodeSearch}
                      onChange={(e) => setHsCodeSearch(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button className="self-end">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>HS Code</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Duty Rate</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHSCodes.map((hs) => (
                        <TableRow key={hs.code}>
                          <TableCell className="font-mono font-medium">{hs.code}</TableCell>
                          <TableCell>{hs.description}</TableCell>
                          <TableCell>{hs.dutyRate}%</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">Use Code</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Alert>
                  <Barcode className="h-4 w-4" />
                  <AlertDescription>
                    HS codes are standardized international codes to classify traded products. Using the correct HS code is crucial for accurate duty calculation and compliance.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="duty-calculator" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customs Duty Calculator</CardTitle>
                <CardDescription>
                  Calculate customs duty, cess, and other charges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="item-value">Assessable Value (₹)</Label>
                  <Input id="item-value" type="number" placeholder="100000" />
                </div>
                
                <div>
                  <Label htmlFor="hs-code-select">HS Code</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select HS Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {hsCodeDatabase.map((hs) => (
                        <SelectItem key={hs.code} value={hs.code}>
                          {hs.code} - {hs.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="import-type-select">Import Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select import type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sea">Sea</SelectItem>
                      <SelectItem value="air">Air</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Duty
                </Button>
                
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    This is an estimate. Actual duty may vary based on various factors including trade agreements, anti-dumping duties, etc.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Duty Calculation Result</CardTitle>
                <CardDescription>
                  Breakdown of customs duty and charges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Assessable Value:</span>
                      <span className="font-medium">₹100,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Basic Customs Duty (10%):</span>
                      <span className="font-medium">₹10,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Education Cess (3%):</span>
                      <span className="font-medium">₹300</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Social Welfare Cess (1%):</span>
                      <span className="font-medium">₹100</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total Duty:</span>
                        <span>₹10,400</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-800">
                      <div className="font-semibold mb-1">Effective Duty Rate:</div>
                      <div>10.4% of assessable value</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bill Details Dialog */}
      <Dialog open={!!selectedBill} onOpenChange={() => setSelectedBill(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bill of Entry Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedBill?.beNumber}
            </DialogDescription>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-3">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>BE Number:</span>
                      <span className="font-mono font-medium">{selectedBill.beNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>BE Date:</span>
                      <span>{format(selectedBill.beDate, 'dd MMM yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Import Type:</span>
                      <span>{selectedBill.importType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Port of Entry:</span>
                      <span>{selectedBill.portOfEntry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping Bill:</span>
                      <span>{selectedBill.shippingBillNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping Bill Date:</span>
                      <span>{format(selectedBill.shippingBillDate, 'dd MMM yyyy')}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Party Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Importer:</span>
                      <span className="font-medium">{selectedBill.importerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IEC Code:</span>
                      <span className="font-mono">{selectedBill.importerIEC}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Supplier:</span>
                      <span className="font-medium">{selectedBill.supplierName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Supplier Country:</span>
                      <span>{selectedBill.supplierCountry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className={getStatusColor(selectedBill.status)}>
                        {selectedBill.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>ICEGATE Status:</span>
                      <Badge className={getICEGateStatusColor(selectedBill.icegateStatus)}>
                        {selectedBill.icegateStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Item Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>HS Code:</span>
                      <span className="font-mono font-medium">{selectedBill.hsCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Description:</span>
                      <span className="text-right">{selectedBill.itemDescription}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span>{selectedBill.quantity} {selectedBill.unit}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Assessable Value:</span>
                      <span className="font-medium">₹{selectedBill.assessableValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customs Duty:</span>
                      <span>₹{selectedBill.customsDuty.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Education Cess:</span>
                      <span>₹{selectedBill.educationCess.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Duty Breakdown</h3>
                <div className="grid gap-4 md:grid-cols-4 text-sm">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-bold">₹{selectedBill.assessableValue.toLocaleString()}</div>
                    <div className="text-muted-foreground">Assessable Value</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-bold">₹{selectedBill.customsDuty.toLocaleString()}</div>
                    <div className="text-muted-foreground">Customs Duty</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-bold">₹{selectedBill.educationCess.toLocaleString()}</div>
                    <div className="text-muted-foreground">Education Cess</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-bold">₹{selectedBill.totalDuty.toLocaleString()}</div>
                    <div className="text-muted-foreground">Total Duty</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download BE
                </Button>
                <Button variant="outline">
                  <Globe className="h-4 w-4 mr-2" />
                  View on ICEGATE
                </Button>
                {selectedBill.status === 'Draft' && (
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Bill Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Bill of Entry</DialogTitle>
            <DialogDescription>
              Enter details to create a new Bill of Entry
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <Alert>
              <Globe className="h-4 w-4" />
              <AlertDescription>
                This Bill of Entry will be submitted to ICEGATE for processing. Ensure all details are accurate before submission.
              </AlertDescription>
            </Alert>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Details</h3>
                <div>
                  <Label htmlFor="import-type">Import Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select import type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sea">Sea</SelectItem>
                      <SelectItem value="air">Air</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="port-entry">Port of Entry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select port" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jnp">Jawaharlal Nehru Port Trust (JNPT)</SelectItem>
                      <SelectItem value="igi">Indira Gandhi International Airport (IGI)</SelectItem>
                      <SelectItem value="mpt">Mumbai Port Trust</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="shipping-bill">Shipping Bill Number</Label>
                  <Input id="shipping-bill" placeholder="SB/BLR/2024/001" />
                </div>
                <div>
                  <Label htmlFor="shipping-date">Shipping Bill Date</Label>
                  <Input id="shipping-date" type="date" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Importer Details</h3>
                <div>
                  <Label htmlFor="importer-name">Importer Name</Label>
                  <Input id="importer-name" placeholder="Tech Solutions India Pvt Ltd" />
                </div>
                <div>
                  <Label htmlFor="importer-iec">Importer IEC Code</Label>
                  <Input id="importer-iec" placeholder="0512345678" />
                </div>
                <div>
                  <Label htmlFor="supplier-name">Supplier Name</Label>
                  <Input id="supplier-name" placeholder="ABC Electronics Ltd" />
                </div>
                <div>
                  <Label htmlFor="supplier-country">Supplier Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="china">China</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Item Details</h3>
                <div>
                  <Label htmlFor="hs-code">HS Code</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select HS Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {hsCodeDatabase.map((hs) => (
                        <SelectItem key={hs.code} value={hs.code}>
                          {hs.code} - {hs.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="item-desc">Item Description</Label>
                  <Textarea id="item-desc" placeholder="Detailed description of goods" />
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="100" />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nos">NOS</SelectItem>
                        <SelectItem value="kgs">KGS</SelectItem>
                        <SelectItem value="ltr">LTR</SelectItem>
                        <SelectItem value="mts">MTS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Value Details</h3>
                <div>
                  <Label htmlFor="assessable-value">Assessable Value (₹)</Label>
                  <Input id="assessable-value" type="number" placeholder="5000000" />
                </div>
                <div>
                  <Label htmlFor="customs-duty">Customs Duty (₹)</Label>
                  <Input id="customs-duty" type="number" placeholder="750000" />
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <div>
                    <Label htmlFor="edu-cess">Education Cess (₹)</Label>
                    <Input id="edu-cess" type="number" placeholder="22500" />
                  </div>
                  <div>
                    <Label htmlFor="sw-cess">Social Welfare Cess (₹)</Label>
                    <Input id="sw-cess" type="number" placeholder="7500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Create Bill of Entry
              </Button>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}