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
import { 
  Upload, 
  Camera, 
  FileText, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  Barcode,
  Package
} from 'lucide-react'
import { format } from 'date-fns'

interface Invoice {
  id: string
  invoiceNumber: string
  date: Date
  vendorName: string
  vendorGSTIN: string
  amount: number
  cgst: number
  sgst: number
  igst: number
  totalTax: number
  hsnSacCode: string
  status: 'Pending' | 'Verified' | 'Mismatch' | 'Processed'
  ocrStatus: 'Not Processed' | 'Processing' | 'Completed' | 'Failed'
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    date: new Date('2024-01-15'),
    vendorName: 'ABC Supplies Ltd',
    vendorGSTIN: '29ABCDE1234F1Z5',
    amount: 10000,
    cgst: 900,
    sgst: 900,
    igst: 0,
    totalTax: 1800,
    hsnSacCode: '8471',
    status: 'Verified',
    ocrStatus: 'Completed'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    date: new Date('2024-01-18'),
    vendorName: 'XYZ Services Pvt Ltd',
    vendorGSTIN: '29FGHIJ5678F2Z6',
    amount: 25000,
    cgst: 0,
    sgst: 0,
    igst: 4500,
    totalTax: 4500,
    hsnSacCode: '9983',
    status: 'Pending',
    ocrStatus: 'Processing'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    date: new Date('2024-01-20'),
    vendorName: 'Tech Solutions',
    vendorGSTIN: '29KLMNO9012F3Z7',
    amount: 15000,
    cgst: 1350,
    sgst: 1350,
    igst: 0,
    totalTax: 2700,
    hsnSacCode: '8517',
    status: 'Mismatch',
    ocrStatus: 'Completed'
  }
]

const hsnSacCodes = [
  { code: '8471', description: 'Automatic data processing machines' },
  { code: '8517', description: 'Telephone sets, including telephones for cellular networks' },
  { code: '9983', description: 'Other professional, technical and business services' },
  { code: '3004', description: 'Medicaments consisting of mixed or unmixed products' },
  { code: '7308', description: 'Structures and parts of structures' }
]

const getStatusColor = (status: Invoice['status']) => {
  switch (status) {
    case 'Verified': return 'bg-green-100 text-green-800'
    case 'Processed': return 'bg-blue-100 text-blue-800'
    case 'Mismatch': return 'bg-red-100 text-red-800'
    case 'Pending': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getOCRStatusColor = (status: Invoice['ocrStatus']) => {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800'
    case 'Processing': return 'bg-blue-100 text-blue-800'
    case 'Failed': return 'bg-red-100 text-red-800'
    case 'Not Processed': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function InvoiceManagement() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [activeTab, setActiveTab] = useState('invoices')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isOCRDialogOpen, setIsOCRDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.vendorGSTIN.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOCRUpload = () => {
    setIsOCRDialogOpen(true)
  }

  const handleAddInvoice = () => {
    setIsAddDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoice Management System</h1>
          <p className="text-muted-foreground">Manage, validate, and process your GST invoices with OCR technology</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleOCRUpload}>
            <Camera className="h-4 w-4 mr-2" />
            OCR Upload
          </Button>
          <Button onClick={handleAddInvoice}>
            <Plus className="h-4 w-4 mr-2" />
            Add Invoice
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="validation">GST Validation</TabsTrigger>
          <TabsTrigger value="hsn-sac">HSN/SAC Codes</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice List</CardTitle>
              <CardDescription>
                View and manage all your invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by invoice number, vendor, or GSTIN..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="mismatch">Mismatch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Invoices Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>GSTIN</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Tax</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>OCR</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                        <TableCell>{format(invoice.date, 'dd MMM yyyy')}</TableCell>
                        <TableCell>{invoice.vendorName}</TableCell>
                        <TableCell className="font-mono text-sm">{invoice.vendorGSTIN}</TableCell>
                        <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
                        <TableCell>₹{invoice.totalTax.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getOCRStatusColor(invoice.ocrStatus)}>
                            {invoice.ocrStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button size="sm" variant="outline" onClick={() => setSelectedInvoice(invoice)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
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

        <TabsContent value="validation" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  GSTIN Validation
                </CardTitle>
                <CardDescription>
                  Validate vendor and customer GSTINs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="gstin">Enter GSTIN</Label>
                  <Input id="gstin" placeholder="29ABCDE1234F1Z5" className="mt-1" />
                </div>
                <Button className="w-full">Validate GSTIN</Button>
                
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    GSTIN validation will check the format and verify with GST portal
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Validation Results
                </CardTitle>
                <CardDescription>
                  Recent validation activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">29ABCDE1234F1Z5</div>
                      <div className="text-sm text-muted-foreground">ABC Supplies Ltd</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Valid</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">29INVALID1234F1Z5</div>
                      <div className="text-sm text-muted-foreground">Test Vendor</div>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Invalid</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hsn-sac" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                HSN/SAC Code Management
              </CardTitle>
              <CardDescription>
                Search and manage HSN/SAC codes for your invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="hsn-search">Search HSN/SAC Codes</Label>
                    <Input id="hsn-search" placeholder="Search by code or description..." className="mt-1" />
                  </div>
                  <Button className="self-end">Search</Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Tax Rate</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hsnSacCodes.map((hsn) => (
                        <TableRow key={hsn.code}>
                          <TableCell className="font-mono font-medium">{hsn.code}</TableCell>
                          <TableCell>{hsn.description}</TableCell>
                          <TableCell>18%</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">Use Code</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{invoices.length}</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Total Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ₹{invoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Invoice value</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Total Tax</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ₹{invoices.reduce((sum, inv) => sum + inv.totalTax, 0).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">GST collected</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* OCR Upload Dialog */}
      <Dialog open={isOCRDialogOpen} onOpenChange={setIsOCRDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>OCR Invoice Upload</DialogTitle>
            <DialogDescription>
              Upload invoice images for automatic data extraction
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop invoice images here, or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Supports: JPG, PNG, PDF (Max 10MB)
              </p>
              <Button className="mt-4">Select Files</Button>
            </div>
            
            <Alert>
              <Camera className="h-4 w-4" />
              <AlertDescription>
                Our OCR engine will automatically extract invoice details including vendor information, amounts, and GST breakdown.
              </AlertDescription>
            </Alert>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Invoice Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Manual Invoice</DialogTitle>
            <DialogDescription>
              Enter invoice details manually
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="inv-number">Invoice Number</Label>
                <Input id="inv-number" placeholder="INV-2024-001" />
              </div>
              <div>
                <Label htmlFor="inv-date">Invoice Date</Label>
                <Input id="inv-date" type="date" />
              </div>
              <div>
                <Label htmlFor="vendor-name">Vendor Name</Label>
                <Input id="vendor-name" placeholder="ABC Supplies Ltd" />
              </div>
              <div>
                <Label htmlFor="vendor-gstin">Vendor GSTIN</Label>
                <Input id="vendor-gstin" placeholder="29ABCDE1234F1Z5" />
              </div>
              <div>
                <Label htmlFor="amount">Invoice Amount</Label>
                <Input id="amount" type="number" placeholder="10000" />
              </div>
              <div>
                <Label htmlFor="hsn-code">HSN/SAC Code</Label>
                <Input id="hsn-code" placeholder="8471" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Invoice description..." />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button className="flex-1">Save Invoice</Button>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}