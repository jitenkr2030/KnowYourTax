'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  FileText, 
  Download, 
  Plus, 
  Eye, 
  CheckCircle,
  Clock,
  XCircle,
  IndianRupee,
  Building2,
  User
} from 'lucide-react'

interface GSTInvoice {
  id: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  customerName: string
  customerEmail: string
  customerAddress: string
  customerGSTIN?: string
  businessName: string
  businessAddress: string
  businessGSTIN: string
  items: GSTInvoiceItem[]
  subtotal: number
  cgstAmount: number
  sgstAmount: number
  igstAmount: number
  cessAmount: number
  totalAmount: number
  paymentStatus: 'DRAFT' | 'PENDING' | 'PAID' | 'CANCELLED'
  paymentMethod?: string
  paymentId?: string
  placeOfSupply: string
  reverseCharge: boolean
}

interface GSTInvoiceItem {
  id: string
  invoiceId: string
  description: string
  hsnCode?: string
  sacCode?: string
  quantity: number
  unitPrice: number
  discount?: number
  cgstRate: number
  sgstRate: number
  igstRate: number
  cessRate: number
  taxableAmount: number
  cgstAmount: number
  sgstAmount: number
  igstAmount: number
  cessAmount: number
  totalAmount: number
}

interface NewInvoiceItem {
  description: string
  hsnCode?: string
  sacCode?: string
  quantity: number
  unitPrice: number
  discount?: number
  cgstRate: number
  sgstRate: number
  igstRate: number
  cessRate: number
}

export default function GSTInvoiceManager() {
  const [invoices, setInvoices] = useState<GSTInvoice[]>([])
  const [selectedInvoice, setSelectedInvoice] = useState<GSTInvoice | null>(null)
  const [loading, setLoading] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newInvoiceItems, setNewInvoiceItems] = useState<NewInvoiceItem[]>([
    {
      description: '',
      quantity: 1,
      unitPrice: 0,
      cgstRate: 9,
      sgstRate: 9,
      igstRate: 0,
      cessRate: 0,
    }
  ])

  // Mock customer ID
  const customerId = 'user123'

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      const response = await fetch(`/api/invoices?customerId=${customerId}`)
      const data = await response.json()
      if (data.success) {
        setInvoices(data.invoices)
      }
    } catch (error) {
      console.error('Error fetching invoices:', error)
    }
  }

  const handleCreateInvoice = async () => {
    setLoading(true)
    try {
      const invoiceRequest = {
        customerId,
        items: newInvoiceItems,
        placeOfSupply: 'Karnataka',
        reverseCharge: false,
      }

      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceRequest),
      })

      const data = await response.json()
      if (data.success) {
        setShowCreateForm(false)
        setNewInvoiceItems([{
          description: '',
          quantity: 1,
          unitPrice: 0,
          cgstRate: 9,
          sgstRate: 9,
          igstRate: 0,
          cessRate: 0,
        }])
        fetchInvoices()
      }
    } catch (error) {
      console.error('Error creating invoice:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadInvoice = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/invoices?invoiceId=${invoiceId}&action=generate-pdf`)
      const htmlContent = await response.text()
      
      // Create a blob and download
      const blob = new Blob([htmlContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `invoice-${invoiceId}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading invoice:', error)
    }
  }

  const addNewInvoiceItem = () => {
    setNewInvoiceItems([
      ...newInvoiceItems,
      {
        description: '',
        quantity: 1,
        unitPrice: 0,
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cessRate: 0,
      }
    ])
  }

  const updateInvoiceItem = (index: number, field: keyof NewInvoiceItem, value: any) => {
    const updatedItems = [...newInvoiceItems]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    setNewInvoiceItems(updatedItems)
  }

  const removeInvoiceItem = (index: number) => {
    if (newInvoiceItems.length > 1) {
      setNewInvoiceItems(newInvoiceItems.filter((_, i) => i !== index))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case 'CANCELLED':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
    }
  }

  const calculateTotals = () => {
    return newInvoiceItems.reduce((totals, item) => {
      const taxableAmount = (item.unitPrice * item.quantity) - (item.discount || 0)
      const cgstAmount = (taxableAmount * item.cgstRate) / 100
      const sgstAmount = (taxableAmount * item.sgstRate) / 100
      const igstAmount = (taxableAmount * item.igstRate) / 100
      const cessAmount = (taxableAmount * item.cessRate) / 100
      const totalAmount = taxableAmount + cgstAmount + sgstAmount + igstAmount + cessAmount

      totals.subtotal += taxableAmount
      totals.cgst += cgstAmount
      totals.sgst += sgstAmount
      totals.igst += igstAmount
      totals.cess += cessAmount
      totals.total += totalAmount

      return totals
    }, { subtotal: 0, cgst: 0, sgst: 0, igst: 0, cess: 0, total: 0 })
  }

  const totals = calculateTotals()

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">GST Invoice Manager</h1>
        <p className="text-gray-600">Create, manage, and download GST-compliant invoices</p>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Invoice List</TabsTrigger>
          <TabsTrigger value="create">Create Invoice</TabsTrigger>
          <TabsTrigger value="view">View Invoice</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Your Invoices
              </CardTitle>
              <CardDescription>
                List of all your GST invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice Number</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                      <TableCell>{new Date(invoice.invoiceDate).toLocaleDateString()}</TableCell>
                      <TableCell>{invoice.customerName}</TableCell>
                      <TableCell>₹{invoice.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(invoice.paymentStatus)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedInvoice(invoice)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Invoice
              </CardTitle>
              <CardDescription>
                Create a GST-compliant invoice with proper tax calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Invoice Items */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Invoice Items</h3>
                    <Button onClick={addNewInvoiceItem} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {newInvoiceItems.map((item, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <Label>Description</Label>
                            <Input
                              value={item.description}
                              onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                              placeholder="Item description"
                            />
                          </div>
                          <div>
                            <Label>Quantity</Label>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateInvoiceItem(index, 'quantity', parseFloat(e.target.value))}
                            />
                          </div>
                          <div>
                            <Label>Unit Price (₹)</Label>
                            <Input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => updateInvoiceItem(index, 'unitPrice', parseFloat(e.target.value))}
                            />
                          </div>
                          <div className="flex items-end">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeInvoiceItem(index)}
                              disabled={newInvoiceItems.length === 1}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <Label>CGST Rate (%)</Label>
                            <Input
                              type="number"
                              value={item.cgstRate}
                              onChange={(e) => updateInvoiceItem(index, 'cgstRate', parseFloat(e.target.value))}
                            />
                          </div>
                          <div>
                            <Label>SGST Rate (%)</Label>
                            <Input
                              type="number"
                              value={item.sgstRate}
                              onChange={(e) => updateInvoiceItem(index, 'sgstRate', parseFloat(e.target.value))}
                            />
                          </div>
                          <div>
                            <Label>IGST Rate (%)</Label>
                            <Input
                              type="number"
                              value={item.igstRate}
                              onChange={(e) => updateInvoiceItem(index, 'igstRate', parseFloat(e.target.value))}
                            />
                          </div>
                          <div>
                            <Label>Cess Rate (%)</Label>
                            <Input
                              type="number"
                              value={item.cessRate}
                              onChange={(e) => updateInvoiceItem(index, 'cessRate', parseFloat(e.target.value))}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <Card>
                  <CardHeader>
                    <CardTitle>Invoice Totals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Subtotal</p>
                        <p className="font-semibold">₹{totals.subtotal.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">CGST</p>
                        <p className="font-semibold">₹{totals.cgst.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">SGST</p>
                        <p className="font-semibold">₹{totals.sgst.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">IGST</p>
                        <p className="font-semibold">₹{totals.igst.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Cess</p>
                        <p className="font-semibold">₹{totals.cess.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-semibold text-lg">₹{totals.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={handleCreateInvoice} 
                  disabled={loading || totals.total === 0}
                  className="w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {loading ? 'Creating...' : 'Create Invoice'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="view" className="mt-8">
          {selectedInvoice ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Invoice {selectedInvoice.invoiceNumber}
                    </CardTitle>
                    <CardDescription>
                      {new Date(selectedInvoice.invoiceDate).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Button onClick={() => handleDownloadInvoice(selectedInvoice.id)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Billed From
                    </h3>
                    <div className="space-y-2">
                      <p className="font-medium">{selectedInvoice.businessName}</p>
                      <p className="text-sm text-gray-600">{selectedInvoice.businessAddress}</p>
                      <p className="text-sm text-gray-600">GSTIN: {selectedInvoice.businessGSTIN}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Billed To
                    </h3>
                    <div className="space-y-2">
                      <p className="font-medium">{selectedInvoice.customerName}</p>
                      <p className="text-sm text-gray-600">{selectedInvoice.customerAddress}</p>
                      {selectedInvoice.customerGSTIN && (
                        <p className="text-sm text-gray-600">GSTIN: {selectedInvoice.customerGSTIN}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Invoice Items</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>HSN/SAC</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Taxable Amt</TableHead>
                        <TableHead>Tax</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.hsnCode || item.sacCode || '-'}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>₹{item.unitPrice.toFixed(2)}</TableCell>
                          <TableCell>₹{item.taxableAmount.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="text-xs">
                              {item.cgstRate > 0 && `CGST ${item.cgstRate}% `}
                              {item.sgstRate > 0 && `SGST ${item.sgstRate}% `}
                              {item.igstRate > 0 && `IGST ${item.igstRate}%`}
                            </div>
                          </TableCell>
                          <TableCell>₹{item.totalAmount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="font-semibold">₹{selectedInvoice.subtotal.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">CGST</p>
                    <p className="font-semibold">₹{selectedInvoice.cgstAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">SGST</p>
                    <p className="font-semibold">₹{selectedInvoice.sgstAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">IGST</p>
                    <p className="font-semibold">₹{selectedInvoice.igstAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cess</p>
                    <p className="font-semibold">₹{selectedInvoice.cessAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-semibold text-lg">₹{selectedInvoice.totalAmount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    {getStatusBadge(selectedInvoice.paymentStatus)}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Place of Supply</p>
                    <p className="font-medium">{selectedInvoice.placeOfSupply}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                Select an invoice from the list to view details
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}