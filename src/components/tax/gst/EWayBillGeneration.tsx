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
  Truck, 
  FileText, 
  Plus, 
  Download, 
  RefreshCw, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Eye,
  QrCode,
  MapPin,
  Calendar
} from 'lucide-react'
import { format, addDays, differenceInHours } from 'date-fns'

interface EWayBill {
  id: string
  ewayBillNo: string
  generatedDate: Date
  validUntil: Date
  invoiceNumber: string
  invoiceDate: Date
  fromGSTIN: string
  toGSTIN: string
  fromPlace: string
  toPlace: string
  pinToPin: string
  supplyType: string
  subSupplyType: string
  documentType: string
  totalValue: number
  cgst: number
  sgst: number
  igst: number
  cess: number
  transporterId: string
  transporterName: string
  vehicleNumber: string
  distance: number
  status: 'Active' | 'Expired' | 'Cancelled' | 'Part-A Generated'
}

const mockEWayBills: EWayBill[] = [
  {
    id: '1',
    ewayBillNo: '331002345678',
    generatedDate: new Date('2024-01-20T10:30:00'),
    validUntil: addDays(new Date('2024-01-20T10:30:00'), 1),
    invoiceNumber: 'INV-2024-001',
    invoiceDate: new Date('2024-01-20'),
    fromGSTIN: '29ABCDE1234F1Z5',
    toGSTIN: '29FGHIJ5678F2Z6',
    fromPlace: 'Bangalore',
    toPlace: 'Chennai',
    pinToPin: '560001-600001',
    supplyType: 'Supply',
    subSupplyType: 'For Own Use',
    documentType: 'Tax Invoice',
    totalValue: 118000,
    cgst: 9000,
    sgst: 9000,
    igst: 0,
    cess: 0,
    transporterId: '29TRANS1234F1Z5',
    transporterName: 'ABC Transporters',
    vehicleNumber: 'KA01AB1234',
    distance: 350,
    status: 'Active'
  },
  {
    id: '2',
    ewayBillNo: '331002345679',
    generatedDate: new Date('2024-01-19T14:15:00'),
    validUntil: addDays(new Date('2024-01-19T14:15:00'), 1),
    invoiceNumber: 'INV-2024-002',
    invoiceDate: new Date('2024-01-19'),
    fromGSTIN: '29ABCDE1234F1Z5',
    toGSTIN: '29KLMNO9012F3Z7',
    fromPlace: 'Mumbai',
    toPlace: 'Pune',
    pinToPin: '400001-411001',
    supplyType: 'Supply',
    subSupplyType: 'Job Work',
    documentType: 'Tax Invoice',
    totalValue: 59000,
    cgst: 4500,
    sgst: 4500,
    igst: 0,
    cess: 0,
    transporterId: '27TRANS5678F2Z6',
    transporterName: 'XYZ Logistics',
    vehicleNumber: 'MH12CD5678',
    distance: 150,
    status: 'Expired'
  }
]

const getStatusColor = (status: EWayBill['status']) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-800'
    case 'Expired': return 'bg-red-100 text-red-800'
    case 'Cancelled': return 'bg-gray-100 text-gray-800'
    case 'Part-A Generated': return 'bg-blue-100 text-blue-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getValidityStatus = (validUntil: Date) => {
  const now = new Date()
  const hoursRemaining = differenceInHours(validUntil, now)
  
  if (hoursRemaining < 0) return { color: 'text-red-600', text: 'Expired' }
  if (hoursRemaining < 6) return { color: 'text-orange-600', text: `${Math.floor(hoursRemaining)}h left` }
  return { color: 'text-green-600', text: `${Math.floor(hoursRemaining)}h left` }
}

export default function EWayBillGeneration() {
  const [eWayBills, setEWayBills] = useState<EWayBill[]>(mockEWayBills)
  const [activeTab, setActiveTab] = useState('overview')
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false)
  const [selectedEWayBill, setSelectedEWayBill] = useState<EWayBill | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateEWayBill = async () => {
    setIsGenerating(true)
    // Simulate API call to NIC portal
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGenerating(false)
    setIsGenerateDialogOpen(false)
  }

  const handleExtendValidity = (ewayBillId: string) => {
    console.log('Extending validity for e-way bill:', ewayBillId)
  }

  const handleCancelEWayBill = (ewayBillId: string) => {
    console.log('Cancelling e-way bill:', ewayBillId)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">E-way Bill Generation</h1>
          <p className="text-muted-foreground">Generate and manage e-way bills with NIC portal integration</p>
        </div>
        <Button onClick={() => setIsGenerateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Generate E-way Bill
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="track">Track</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total E-way Bills</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{eWayBills.length}</div>
                <p className="text-xs text-muted-foreground">
                  Generated this month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Bills</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {eWayBills.filter(bill => bill.status === 'Active').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently valid
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expiring Today</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">2</div>
                <p className="text-xs text-muted-foreground">
                  Need attention
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{eWayBills.reduce((sum, bill) => sum + bill.totalValue, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Goods value
                </p>
              </CardContent>
            </Card>
          </div>

          {/* E-way Bills List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent E-way Bills</CardTitle>
              <CardDescription>
                View and manage all your e-way bills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>E-way Bill No</TableHead>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>From → To</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Validity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eWayBills.map((bill) => {
                      const validityStatus = getValidityStatus(bill.validUntil)
                      
                      return (
                        <TableRow key={bill.id}>
                          <TableCell className="font-mono font-medium">{bill.ewayBillNo}</TableCell>
                          <TableCell>{bill.invoiceNumber}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span className="text-sm">{bill.fromPlace} → {bill.toPlace}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{bill.vehicleNumber}</TableCell>
                          <TableCell>₹{bill.totalValue.toLocaleString()}</TableCell>
                          <TableCell>
                            <span className={`text-sm font-medium ${validityStatus.color}`}>
                              {validityStatus.text}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(bill.status)}>
                              {bill.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button size="sm" variant="outline" onClick={() => setSelectedEWayBill(bill)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4" />
                              </Button>
                              {bill.status === 'Active' && (
                                <Button size="sm" variant="outline" onClick={() => handleExtendValidity(bill.id)}>
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate New E-way Bill</CardTitle>
              <CardDescription>
                Create e-way bill by entering transport and invoice details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert>
                  <Truck className="h-4 w-4" />
                  <AlertDescription>
                    E-way bills are required for goods movement valued more than ₹50,000. Our system integrates directly with NIC portal for generation.
                  </AlertDescription>
                </Alert>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Invoice Details</h3>
                    <div>
                      <Label htmlFor="invoice-no">Invoice Number</Label>
                      <Input id="invoice-no" placeholder="INV-2024-001" />
                    </div>
                    <div>
                      <Label htmlFor="invoice-date">Invoice Date</Label>
                      <Input id="invoice-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="invoice-value">Invoice Value (₹)</Label>
                      <Input id="invoice-value" type="number" placeholder="118000" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Transport Details</h3>
                    <div>
                      <Label htmlFor="transporter-id">Transporter GSTIN</Label>
                      <Input id="transporter-id" placeholder="29TRANS1234F1Z5" />
                    </div>
                    <div>
                      <Label htmlFor="vehicle-no">Vehicle Number</Label>
                      <Input id="vehicle-no" placeholder="KA01AB1234" />
                    </div>
                    <div>
                      <Label htmlFor="distance">Distance (km)</Label>
                      <Input id="distance" type="number" placeholder="350" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">From</h3>
                    <div>
                      <Label htmlFor="from-gstin">From GSTIN</Label>
                      <Input id="from-gstin" placeholder="29ABCDE1234F1Z5" />
                    </div>
                    <div>
                      <Label htmlFor="from-place">From Place</Label>
                      <Input id="from-place" placeholder="Bangalore" />
                    </div>
                    <div>
                      <Label htmlFor="from-pin">From PIN</Label>
                      <Input id="from-pin" placeholder="560001" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">To</h3>
                    <div>
                      <Label htmlFor="to-gstin">To GSTIN</Label>
                      <Input id="to-gstin" placeholder="29FGHIJ5678F2Z6" />
                    </div>
                    <div>
                      <Label htmlFor="to-place">To Place</Label>
                      <Input id="to-place" placeholder="Chennai" />
                    </div>
                    <div>
                      <Label htmlFor="to-pin">To PIN</Label>
                      <Input id="to-pin" placeholder="600001" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1" onClick={handleGenerateEWayBill} disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Truck className="h-4 w-4 mr-2" />
                        Generate E-way Bill
                      </>
                    )}
                  </Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="track" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Track E-way Bill</CardTitle>
                <CardDescription>
                  Track real-time status of your e-way bills
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="eway-track">Enter E-way Bill Number</Label>
                  <div className="flex gap-2 mt-1">
                    <Input id="eway-track" placeholder="331002345678" />
                    <Button>Track</Button>
                  </div>
                </div>
                
                <Alert>
                  <QrCode className="h-4 w-4" />
                  <AlertDescription>
                    You can also track e-way bills by scanning QR codes or entering vehicle numbers.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Validity Management</CardTitle>
                <CardDescription>
                  Extend or manage e-way bill validity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">331002345678</div>
                      <div className="text-sm text-muted-foreground">Expires in 4 hours</div>
                    </div>
                    <Button size="sm" onClick={() => handleExtendValidity('1')}>
                      Extend
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">331002345679</div>
                      <div className="text-sm text-muted-foreground">Already expired</div>
                    </div>
                    <Button size="sm" variant="outline" disabled>
                      Expired
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>E-way Bill Statistics</CardTitle>
                <CardDescription>
                  Monthly generation and usage patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Analytics Chart</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Visual representation of e-way bill trends
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transporter Performance</CardTitle>
                <CardDescription>
                  Top transporters by e-way bills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {eWayBills.map((bill, index) => (
                    <div key={bill.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{bill.transporterName}</div>
                        <div className="text-sm text-muted-foreground">{bill.transporterId}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{bill.distance} km</div>
                        <Badge className={getStatusColor(bill.status)} variant="secondary">
                          {bill.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* E-way Bill Details Dialog */}
      <Dialog open={!!selectedEWayBill} onOpenChange={() => setSelectedEWayBill(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>E-way Bill Details</DialogTitle>
            <DialogDescription>
              Complete information for e-way bill {selectedEWayBill?.ewayBillNo}
            </DialogDescription>
          </DialogHeader>
          {selectedEWayBill && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-3">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>E-way Bill No:</span>
                      <span className="font-mono font-medium">{selectedEWayBill.ewayBillNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Generated Date:</span>
                      <span>{format(selectedEWayBill.generatedDate, 'dd MMM yyyy, HH:mm')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valid Until:</span>
                      <span>{format(selectedEWayBill.validUntil, 'dd MMM yyyy, HH:mm')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Invoice Number:</span>
                      <span>{selectedEWayBill.invoiceNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Document Type:</span>
                      <span>{selectedEWayBill.documentType}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Transport Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Transporter:</span>
                      <span>{selectedEWayBill.transporterName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transporter ID:</span>
                      <span className="font-mono">{selectedEWayBill.transporterId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vehicle Number:</span>
                      <span className="font-mono">{selectedEWayBill.vehicleNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Distance:</span>
                      <span>{selectedEWayBill.distance} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className={getStatusColor(selectedEWayBill.status)}>
                        {selectedEWayBill.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-3">From</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>GSTIN:</span>
                      <span className="font-mono">{selectedEWayBill.fromGSTIN}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Place:</span>
                      <span>{selectedEWayBill.fromPlace}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PIN Code:</span>
                      <span>{selectedEWayBill.pinToPin.split('-')[0]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">To</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>GSTIN:</span>
                      <span className="font-mono">{selectedEWayBill.toGSTIN}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Place:</span>
                      <span>{selectedEWayBill.toPlace}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PIN Code:</span>
                      <span>{selectedEWayBill.pinToPin.split('-')[1]}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Tax Details</h3>
                <div className="grid gap-4 md:grid-cols-4 text-sm">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-bold">₹{selectedEWayBill.totalValue.toLocaleString()}</div>
                    <div className="text-muted-foreground">Total Value</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-bold">₹{selectedEWayBill.cgst.toLocaleString()}</div>
                    <div className="text-muted-foreground">CGST</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-bold">₹{selectedEWayBill.sgst.toLocaleString()}</div>
                    <div className="text-muted-foreground">SGST</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-bold">₹{selectedEWayBill.igst.toLocaleString()}</div>
                    <div className="text-muted-foreground">IGST</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <QrCode className="h-4 w-4 mr-2" />
                  View QR Code
                </Button>
                {selectedEWayBill.status === 'Active' && (
                  <Button variant="outline" onClick={() => handleExtendValidity(selectedEWayBill.id)}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Extend Validity
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}