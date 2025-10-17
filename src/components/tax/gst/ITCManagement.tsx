'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Search,
  Filter,
  Download,
  Eye,
  Sync,
  BarChart3
} from 'lucide-react'
import { format } from 'date-fns'

interface ITCRecord {
  id: string
  gstin: string
  supplierName: string
  invoiceNumber: string
  invoiceDate: Date
  taxAmount: number
  igst: number
  cgst: number
  sgst: number
  status: 'Matched' | 'Unmatched' | 'Partially Matched' | 'Pending'
  gstr2bStatus: 'Available' | 'Not Available' | 'Mismatch'
  lastUpdated: Date
}

interface ReconciliationSummary {
  totalITC: number
  matchedITC: number
  unmatchedITC: number
  pendingITC: number
  matchPercentage: number
}

const mockITCRecords: ITCRecord[] = [
  {
    id: '1',
    gstin: '29ABCDE1234F1Z5',
    supplierName: 'ABC Supplies Ltd',
    invoiceNumber: 'INV-2024-001',
    invoiceDate: new Date('2024-01-15'),
    taxAmount: 1800,
    igst: 0,
    cgst: 900,
    sgst: 900,
    status: 'Matched',
    gstr2bStatus: 'Available',
    lastUpdated: new Date('2024-01-20')
  },
  {
    id: '2',
    gstin: '29FGHIJ5678F2Z6',
    supplierName: 'XYZ Services Pvt Ltd',
    invoiceNumber: 'INV-2024-002',
    invoiceDate: new Date('2024-01-18'),
    taxAmount: 4500,
    igst: 4500,
    cgst: 0,
    sgst: 0,
    status: 'Unmatched',
    gstr2bStatus: 'Not Available',
    lastUpdated: new Date('2024-01-20')
  },
  {
    id: '3',
    gstin: '29KLMNO9012F3Z7',
    supplierName: 'Tech Solutions',
    invoiceNumber: 'INV-2024-003',
    invoiceDate: new Date('2024-01-20'),
    taxAmount: 2700,
    igst: 0,
    cgst: 1350,
    sgst: 1350,
    status: 'Partially Matched',
    gstr2bStatus: 'Mismatch',
    lastUpdated: new Date('2024-01-21')
  },
  {
    id: '4',
    gstin: '29PQRST3456F4Z8',
    supplierName: 'Global Trading Co',
    invoiceNumber: 'INV-2024-004',
    invoiceDate: new Date('2024-01-22'),
    taxAmount: 3600,
    igst: 3600,
    cgst: 0,
    sgst: 0,
    status: 'Pending',
    gstr2bStatus: 'Available',
    lastUpdated: new Date('2024-01-22')
  }
]

const reconciliationSummary: ReconciliationSummary = {
  totalITC: 12600,
  matchedITC: 1800,
  unmatchedITC: 4500,
  pendingITC: 6300,
  matchPercentage: 14.29
}

const getStatusColor = (status: ITCRecord['status']) => {
  switch (status) {
    case 'Matched': return 'bg-green-100 text-green-800'
    case 'Partially Matched': return 'bg-yellow-100 text-yellow-800'
    case 'Unmatched': return 'bg-red-100 text-red-800'
    case 'Pending': return 'bg-blue-100 text-blue-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getGSTR2BStatusColor = (status: ITCRecord['gstr2bStatus']) => {
  switch (status) {
    case 'Available': return 'bg-green-100 text-green-800'
    case 'Mismatch': return 'bg-red-100 text-red-800'
    case 'Not Available': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function ITCManagement() {
  const [itcRecords, setITCRecords] = useState<ITCRecord[]>(mockITCRecords)
  const [activeTab, setActiveTab] = useState('overview')
  const [isReconciling, setIsReconciling] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('current-month')

  const handleReconcile = async () => {
    setIsReconciling(true)
    // Simulate reconciliation process
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsReconciling(false)
  }

  const handleExport = () => {
    // Export functionality
    console.log('Exporting ITC data...')
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Input Tax Credit Management</h1>
          <p className="text-muted-foreground">Automate ITC matching and reconciliation with GSTR-2B</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleReconcile} disabled={isReconciling}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isReconciling ? 'animate-spin' : ''}`} />
            {isReconciling ? 'Reconciling...' : 'Reconcile Now'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
          <TabsTrigger value="gstr2b">GSTR-2B</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total ITC</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{reconciliationSummary.totalITC.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Available for claim
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Matched ITC</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹{reconciliationSummary.matchedITC.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {reconciliationSummary.matchPercentage}% of total
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unmatched ITC</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">₹{reconciliationSummary.unmatchedITC.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Requires attention
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending ITC</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">₹{reconciliationSummary.pendingITC.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting GSTR-2B
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Match Progress */}
          <Card>
            <CardHeader>
              <CardTitle>ITC Matching Progress</CardTitle>
              <CardDescription>
                Overview of your ITC reconciliation status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Overall Match Rate</span>
                    <span className="text-sm text-muted-foreground">{reconciliationSummary.matchPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={reconciliationSummary.matchPercentage} className="h-3" />
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Matched: {((reconciliationSummary.matchedITC / reconciliationSummary.totalITC) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Unmatched: {((reconciliationSummary.unmatchedITC / reconciliationSummary.totalITC) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Pending: {((reconciliationSummary.pendingITC / reconciliationSummary.totalITC) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent ITC Activity</CardTitle>
              <CardDescription>
                Latest ITC records and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Tax Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>GSTR-2B</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itcRecords.slice(0, 5).map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{record.supplierName}</div>
                            <div className="text-sm text-muted-foreground font-mono">{record.gstin}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{record.invoiceNumber}</TableCell>
                        <TableCell>₹{record.taxAmount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getGSTR2BStatusColor(record.gstr2bStatus)}>
                            {record.gstr2bStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{format(record.lastUpdated, 'dd MMM yyyy')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ITC Reconciliation Dashboard</CardTitle>
              <CardDescription>
                Detailed view of matched and unmatched ITC
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex gap-4">
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-month">Current Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="current-quarter">Current Quarter</SelectItem>
                      <SelectItem value="current-year">Current Year</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="matched">Matched</SelectItem>
                      <SelectItem value="unmatched">Unmatched</SelectItem>
                      <SelectItem value="partial">Partially Matched</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* ITC Records Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>IGST</TableHead>
                        <TableHead>CGST</TableHead>
                        <TableHead>SGST</TableHead>
                        <TableHead>Total Tax</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>GSTR-2B</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {itcRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{record.supplierName}</div>
                              <div className="text-sm text-muted-foreground font-mono">{record.gstin}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{record.invoiceNumber}</TableCell>
                          <TableCell>{format(record.invoiceDate, 'dd MMM yyyy')}</TableCell>
                          <TableCell>₹{record.igst.toLocaleString()}</TableCell>
                          <TableCell>₹{record.cgst.toLocaleString()}</TableCell>
                          <TableCell>₹{record.sgst.toLocaleString()}</TableCell>
                          <TableCell className="font-medium">₹{record.taxAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(record.status)}>
                              {record.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getGSTR2BStatusColor(record.gstr2bStatus)}>
                              {record.gstr2bStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Sync className="h-4 w-4" />
                              </Button>
                            </div>
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

        <TabsContent value="gstr2b" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>GSTR-2B Auto-Pull</CardTitle>
                <CardDescription>
                  Automatically download and match GSTR-2B data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Sync className="h-4 w-4" />
                  <AlertDescription>
                    Our system automatically downloads GSTR-2B data from the GST portal and matches it with your purchase invoices.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Last Downloaded</span>
                    <span className="text-sm font-medium">Today, 09:30 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Next Scheduled</span>
                    <span className="text-sm font-medium">Tomorrow, 09:30 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Records Found</span>
                    <span className="text-sm font-medium">247</span>
                  </div>
                </div>
                
                <Button className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Download Now
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GSTR-2B Matching Rules</CardTitle>
                <CardDescription>
                  Configure how ITC is matched with GSTR-2B
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">GSTIN Matching</div>
                      <div className="text-sm text-muted-foreground">Match supplier GSTIN</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Invoice Number</div>
                      <div className="text-sm text-muted-foreground">Match invoice numbers</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Tax Amount</div>
                      <div className="text-sm text-muted-foreground">Match tax amounts (±5%)</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Invoice Date</div>
                      <div className="text-sm text-muted-foreground">Match invoice dates</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
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
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  ITC Trend Analysis
                </CardTitle>
                <CardDescription>
                  Monthly ITC trends and patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Chart Placeholder</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Visual representation of ITC trends over time
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supplier-wise ITC Analysis</CardTitle>
                <CardDescription>
                  Top suppliers by ITC amount
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {itcRecords.slice(0, 5).map((record, index) => (
                    <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{record.supplierName}</div>
                        <div className="text-sm text-muted-foreground">{record.gstin}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{record.taxAmount.toLocaleString()}</div>
                        <Badge className={getStatusColor(record.status)} variant="secondary">
                          {record.status}
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
    </div>
  )
}