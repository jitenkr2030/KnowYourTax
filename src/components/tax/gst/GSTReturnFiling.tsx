'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Calendar, FileText, Upload, CheckCircle, Clock, AlertTriangle, Download } from 'lucide-react'
import { format } from 'date-fns'

interface GSTReturn {
  id: string
  name: string
  description: string
  frequency: 'Monthly' | 'Quarterly' | 'Annually'
  dueDate: Date
  status: 'Not Filed' | 'In Progress' | 'Filed' | 'Under Review'
  lastFiled?: Date
  progress: number
}

const gstReturns: GSTReturn[] = [
  {
    id: 'gstr1',
    name: 'GSTR-1',
    description: 'Outward Supplies Return - Details of all outward supplies of goods and services',
    frequency: 'Monthly',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    status: 'Not Filed',
    progress: 0
  },
  {
    id: 'gstr3b',
    name: 'GSTR-3B',
    description: 'Monthly Summary Return - Summary of outward supplies, input tax credit and tax liability',
    frequency: 'Monthly',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    status: 'In Progress',
    progress: 45
  },
  {
    id: 'gstr9',
    name: 'GSTR-9',
    description: 'Annual Return - Consolidated statement of all monthly/quarterly returns',
    frequency: 'Annually',
    dueDate: new Date(new Date().getFullYear() + 1, 0, 31), // Next year Jan 31
    status: 'Not Filed',
    progress: 0
  },
  {
    id: 'gstr9c',
    name: 'GSTR-9C',
    description: 'Reconciliation Statement - Reconciliation between audited financial statements and GST returns',
    frequency: 'Annually',
    dueDate: new Date(new Date().getFullYear() + 1, 0, 31), // Next year Jan 31
    status: 'Not Filed',
    progress: 0
  }
]

const getStatusColor = (status: GSTReturn['status']) => {
  switch (status) {
    case 'Filed': return 'bg-green-100 text-green-800'
    case 'In Progress': return 'bg-blue-100 text-blue-800'
    case 'Under Review': return 'bg-yellow-100 text-yellow-800'
    case 'Not Filed': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: GSTReturn['status']) => {
  switch (status) {
    case 'Filed': return <CheckCircle className="h-4 w-4" />
    case 'In Progress': return <Clock className="h-4 w-4" />
    case 'Under Review': return <AlertTriangle className="h-4 w-4" />
    case 'Not Filed': return <FileText className="h-4 w-4" />
    default: return <FileText className="h-4 w-4" />
  }
}

const getDaysRemaining = (dueDate: Date) => {
  const today = new Date()
  const diffTime = dueDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export default function GSTReturnFiling() {
  const [selectedReturn, setSelectedReturn] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  const handleStartFiling = (returnId: string) => {
    setSelectedReturn(returnId)
    setActiveTab('filing')
  }

  const selectedGSTReturn = gstReturns.find(r => r.id === selectedReturn)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">GST Return Filing</h1>
          <p className="text-muted-foreground">Manage and file all your GST returns in one place</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          GSTIN: 29ABCDE1234F1Z5
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="filing" disabled={!selectedReturn}>File Return</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Filing Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Filing Status Overview
              </CardTitle>
              <CardDescription>
                Track all your GST return filing status and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {gstReturns.map((gstReturn) => {
                  const daysRemaining = getDaysRemaining(gstReturn.dueDate)
                  const isUrgent = daysRemaining <= 7 && gstReturn.status !== 'Filed'
                  
                  return (
                    <Card key={gstReturn.id} className={`relative ${isUrgent ? 'border-orange-200 bg-orange-50' : ''}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{gstReturn.name}</CardTitle>
                          <Badge className={getStatusColor(gstReturn.status)}>
                            {getStatusIcon(gstReturn.status)}
                            <span className="ml-1">{gstReturn.status}</span>
                          </Badge>
                        </div>
                        <CardDescription className="text-sm">
                          {gstReturn.frequency} • Due {format(gstReturn.dueDate, 'MMM dd, yyyy')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-3">
                          {gstReturn.description}
                        </p>
                        
                        {gstReturn.progress > 0 && (
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{gstReturn.progress}%</span>
                            </div>
                            <Progress value={gstReturn.progress} className="h-2" />
                          </div>
                        )}
                        
                        {isUrgent && (
                          <Alert className="mb-3">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              Due in {daysRemaining} day{daysRemaining !== 1 ? 's' : ''}!
                            </AlertDescription>
                          </Alert>
                        )}
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleStartFiling(gstReturn.id)}
                          >
                            {gstReturn.status === 'In Progress' ? 'Continue' : 'Start Filing'}
                          </Button>
                          {gstReturn.status === 'Filed' && (
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common GST-related tasks and utilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                  <Upload className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-medium">Import Invoices</div>
                    <div className="text-sm text-muted-foreground">Bulk upload from Excel/CSV</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                  <FileText className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-medium">Generate E-way Bill</div>
                    <div className="text-sm text-muted-foreground">Create and manage e-way bills</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                  <CheckCircle className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-medium">Reconcile ITC</div>
                    <div className="text-sm text-muted-foreground">Match input tax credits</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filing" className="space-y-6">
          {selectedGSTReturn ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  File {selectedGSTReturn.name}
                  <Badge className={getStatusColor(selectedGSTReturn.status)}>
                    {selectedGSTReturn.status}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {selectedGSTReturn.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Filing Progress */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Filing Progress</span>
                      <span className="text-sm text-muted-foreground">{selectedGSTReturn.progress}%</span>
                    </div>
                    <Progress value={selectedGSTReturn.progress} className="h-3" />
                  </div>

                  {/* Filing Steps */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Filing Steps</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Basic Information</div>
                          <div className="text-sm text-muted-foreground">GSTIN and period details</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Invoice Details</div>
                          <div className="text-sm text-muted-foreground">Add outward supply invoices</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Tax Calculation</div>
                          <div className="text-sm text-muted-foreground">Auto-calculate tax liability</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Review & Submit</div>
                          <div className="text-sm text-muted-foreground">Validate and file return</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1">
                      Continue to Invoice Details
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab('overview')}>
                      Back to Overview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Return to File</h3>
                  <p className="text-muted-foreground mb-4">
                    Choose a GST return from the overview to start filing
                  </p>
                  <Button onClick={() => setActiveTab('overview')}>
                    Go to Overview
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filing History</CardTitle>
              <CardDescription>
                View all your previously filed GST returns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Filing History</h3>
                  <p className="text-muted-foreground">
                    Your filed GST returns will appear here once submitted
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}