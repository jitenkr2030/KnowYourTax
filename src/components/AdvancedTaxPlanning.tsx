"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Bell, 
  Target, 
  Calculator,
  TrendingUp,
  Building,
  Home,
  Car,
  PiggyBank,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  FileText,
  Upload,
  Download,
  BarChart3,
  PieChart
} from "lucide-react"

interface AdvancedTaxPlanningProps {
  userId: string
}

interface TaxDeadline {
  id: string
  title: string
  description: string
  date: Date
  type: 'payment' | 'filing' | 'investment'
  priority: 'high' | 'medium' | 'low'
  amount?: number
  category: string
  location: string
}

interface TaxEvent {
  id: string
  title: string
  description: string
  date: Date
  type: 'law_change' | 'policy_update' | 'deadline_reminder'
  impact: 'high' | 'medium' | 'low'
  category: string
}

interface Investment {
  id: string
  name: string
  type: string
  currentAmount: number
  maxLimit: number
  taxBenefit: number
  lockInPeriod: number
  riskLevel: 'low' | 'medium' | 'high'
  returns: number
}

interface CapitalGainsCalculation {
  assetType: string
  purchasePrice: number
  salePrice: number
  purchaseDate: Date
  saleDate: Date
  holdingPeriod: number
  gainType: 'short_term' | 'long_term'
  taxAmount: number
  effectiveRate: number
}

interface RentalIncome {
  propertyId: string
  propertyName: string
  monthlyRent: number
  annualRent: number
  municipalTaxes: number
  standardDeduction: number
  interestOnLoan: number
  otherExpenses: number
  netIncome: number
  taxAmount: number
}

const SAMPLE_DEADLINES: TaxDeadline[] = [
  {
    id: '1',
    title: 'Advance Tax Payment - Q4',
    description: 'Final installment of advance tax for FY 2023-24',
    date: new Date('2024-03-15'),
    type: 'payment',
    priority: 'high',
    amount: 25000,
    category: 'Income Tax',
    location: 'All India'
  },
  {
    id: '2',
    title: 'Income Tax Return Filing',
    description: 'File your income tax return for AY 2024-25',
    date: new Date('2024-07-31'),
    type: 'filing',
    priority: 'high',
    category: 'Income Tax',
    location: 'All India'
  },
  {
    id: '3',
    title: 'Tax Saving Investment Deadline',
    description: 'Last date for tax-saving investments under Section 80C',
    date: new Date('2024-03-31'),
    type: 'investment',
    priority: 'high',
    category: 'Investments',
    location: 'All India'
  },
  {
    id: '4',
    title: 'GST Return Filing - Monthly',
    description: 'Monthly GST return for March 2024',
    date: new Date('2024-04-20'),
    type: 'filing',
    priority: 'medium',
    category: 'GST',
    location: 'All India'
  }
]

const SAMPLE_INVESTMENTS: Investment[] = [
  {
    id: '1',
    name: 'Public Provident Fund (PPF)',
    type: 'Debt',
    currentAmount: 50000,
    maxLimit: 150000,
    taxBenefit: 15000,
    lockInPeriod: 15,
    riskLevel: 'low',
    returns: 7.1
  },
  {
    id: '2',
    name: 'Equity Linked Savings Scheme (ELSS)',
    type: 'Equity',
    currentAmount: 30000,
    maxLimit: 150000,
    taxBenefit: 9000,
    lockInPeriod: 3,
    riskLevel: 'medium',
    returns: 12.5
  },
  {
    id: '3',
    name: 'National Pension System (NPS)',
    type: 'Pension',
    currentAmount: 25000,
    maxLimit: 200000,
    taxBenefit: 7500,
    lockInPeriod: 60,
    riskLevel: 'medium',
    returns: 9.5
  },
  {
    id: '4',
    name: 'Tax-Saving Fixed Deposit',
    type: 'Debt',
    currentAmount: 20000,
    maxLimit: 150000,
    taxBenefit: 6000,
    lockInPeriod: 5,
    riskLevel: 'low',
    returns: 6.5
  }
]

const SAMPLE_EVENTS: TaxEvent[] = [
  {
    id: '1',
    title: 'New Tax Regime Changes',
    description: 'Government announces changes in new tax regime slabs',
    date: new Date('2024-02-01'),
    type: 'law_change',
    impact: 'high',
    category: 'Income Tax'
  },
  {
    id: '2',
    title: 'GST Rate Rationalization',
    description: 'GST Council announces rate changes for various goods and services',
    date: new Date('2024-01-18'),
    type: 'policy_update',
    impact: 'medium',
    category: 'GST'
  },
  {
    id: '3',
    title: 'TDS Rate Changes',
    description: 'Updated TDS rates for various payments effective from April 1',
    date: new Date('2024-03-01'),
    type: 'law_change',
    impact: 'medium',
    category: 'Income Tax'
  }
]

export default function AdvancedTaxPlanning({ userId }: AdvancedTaxPlanningProps) {
  const [deadlines, setDeadlines] = useState<TaxDeadline[]>(SAMPLE_DEADLINES)
  const [events, setEvents] = useState<TaxEvent[]>(SAMPLE_EVENTS)
  const [investments, setInvestments] = useState<Investment[]>(SAMPLE_INVESTMENTS)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [activeTab, setActiveTab] = useState("calendar")
  const [capitalGains, setCapitalGains] = useState<CapitalGainsCalculation | null>(null)
  const [rentalIncome, setRentalIncome] = useState<RentalIncome | null>(null)

  const [capitalGainsForm, setCapitalGainsForm] = useState({
    assetType: '',
    purchasePrice: '',
    salePrice: '',
    purchaseDate: '',
    saleDate: ''
  })

  const [rentalForm, setRentalForm] = useState({
    monthlyRent: '',
    municipalTaxes: '',
    interestOnLoan: '',
    otherExpenses: ''
  })

  useEffect(() => {
    // Sort deadlines by date
    setDeadlines(prev => prev.sort((a, b) => a.date.getTime() - b.date.getTime()))
    setEvents(prev => prev.sort((a, b) => b.date.getTime() - a.date.getTime()))
  }, [])

  const calculateCapitalGains = () => {
    const purchaseDate = new Date(capitalGainsForm.purchaseDate)
    const saleDate = new Date(capitalGainsForm.saleDate)
    const holdingPeriod = Math.floor((saleDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365))
    
    const gainType = holdingPeriod < 1 ? 'short_term' : 'long_term'
    const gain = parseFloat(capitalGainsForm.salePrice) - parseFloat(capitalGainsForm.purchasePrice)
    
    let taxAmount = 0
    let effectiveRate = 0
    
    if (gainType === 'short_term') {
      taxAmount = gain * 0.15 // 15% for short term capital gains
      effectiveRate = 15
    } else {
      taxAmount = gain * 0.10 // 10% for long term capital gains
      effectiveRate = 10
    }
    
    setCapitalGains({
      assetType: capitalGainsForm.assetType,
      purchasePrice: parseFloat(capitalGainsForm.purchasePrice),
      salePrice: parseFloat(capitalGainsForm.salePrice),
      purchaseDate,
      saleDate,
      holdingPeriod,
      gainType,
      taxAmount,
      effectiveRate
    })
  }

  const calculateRentalIncome = () => {
    const monthlyRent = parseFloat(rentalForm.monthlyRent)
    const annualRent = monthlyRent * 12
    const municipalTaxes = parseFloat(rentalForm.municipalTaxes)
    const standardDeduction = annualRent * 0.3 // 30% standard deduction
    const interestOnLoan = parseFloat(rentalForm.interestOnLoan)
    const otherExpenses = parseFloat(rentalForm.otherExpenses)
    
    const netIncome = Math.max(0, annualRent - standardDeduction - municipalTaxes - interestOnLoan - otherExpenses)
    const taxAmount = netIncome * 0.3 // Assuming 30% tax rate
    
    setRentalIncome({
      propertyId: '1',
      propertyName: 'Sample Property',
      monthlyRent,
      annualRent,
      municipalTaxes,
      standardDeduction,
      interestOnLoan,
      otherExpenses,
      netIncome,
      taxAmount
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment': return <Calculator className="h-4 w-4" />
      case 'filing': return <FileText className="h-4 w-4" />
      case 'investment': return <PiggyBank className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getUpcomingDeadlines = () => {
    const now = new Date()
    return deadlines.filter(deadline => deadline.date > now)
  }

  const getDaysUntilDeadline = (date: Date) => {
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Advanced Tax Planning</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Comprehensive tools for strategic tax management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Target className="h-3 w-3 mr-1" />
            Planning Tools
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <Badge variant="outline">{getUpcomingDeadlines().length}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{getUpcomingDeadlines().filter(d => d.priority === 'high').length}</p>
              <p className="text-sm font-medium">Urgent Deadlines</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Require immediate attention</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <PiggyBank className="h-4 w-4 text-green-600" />
              </div>
              <Badge variant="outline">{investments.length}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">₹{investments.reduce((sum, inv) => sum + inv.currentAmount, 0).toLocaleString()}</p>
              <p className="text-sm font-medium">Total Investments</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Tax-saving portfolio</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <Badge variant="outline">{events.length}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{events.filter(e => e.impact === 'high').length}</p>
              <p className="text-sm font-medium">High Impact Events</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Recent tax updates</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-purple-600" />
              </div>
              <Badge variant="outline">85%</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">₹{investments.reduce((sum, inv) => sum + inv.taxBenefit, 0).toLocaleString()}</p>
              <p className="text-sm font-medium">Tax Benefits</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Current year savings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calendar">Tax Calendar</TabsTrigger>
          <TabsTrigger value="investments">Investment Tracker</TabsTrigger>
          <TabsTrigger value="calculators">Calculators</TabsTrigger>
          <TabsTrigger value="events">Tax Events</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar View */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Tax Calendar
                </CardTitle>
                <CardDescription>
                  View and manage tax deadlines and important dates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Deadlines
                </CardTitle>
                <CardDescription>
                  Important tax deadlines that require your attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getUpcomingDeadlines().map((deadline) => (
                    <div key={deadline.id} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(deadline.type)}
                          <div>
                            <h4 className="font-medium text-sm">{deadline.title}</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              {deadline.description}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(deadline.priority)} text-white`}>
                          {deadline.priority}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {deadline.date.toLocaleDateString()}
                        </span>
                        <span className="font-medium">
                          {getDaysUntilDeadline(deadline.date)} days left
                        </span>
                      </div>
                      
                      {deadline.amount && (
                        <div className="mt-2 text-xs">
                          <span className="text-slate-600 dark:text-slate-400">Amount: </span>
                          <span className="font-medium">₹{deadline.amount.toLocaleString()}</span>
                        </div>
                      )}
                      
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Bell className="h-3 w-3 mr-1" />
                          Remind Me
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PiggyBank className="h-5 w-5" />
                Tax-Saving Investments
              </CardTitle>
              <CardDescription>
                Track and manage your tax-saving investment portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.map((investment) => (
                  <div key={investment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold">{investment.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {investment.type} • {investment.lockInPeriod} years lock-in
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className={`flex items-center gap-1 ${getRiskColor(investment.riskLevel)}`}>
                            <AlertTriangle className="h-3 w-3" />
                            Risk: {investment.riskLevel}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Returns: {investment.returns}%
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ₹{investment.taxBenefit.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          Tax benefit
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Current:</span>
                        <span className="ml-2 font-medium">₹{investment.currentAmount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Max Limit:</span>
                        <span className="ml-2 font-medium">₹{investment.maxLimit.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Utilization:</span>
                        <span className="ml-2 font-medium">
                          {Math.round((investment.currentAmount / investment.maxLimit) * 100)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Balance:</span>
                        <span className="ml-2 font-medium">
                          ₹{(investment.maxLimit - investment.currentAmount).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="flex-1">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Investment
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculators" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Capital Gains Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Capital Gains Calculator
                </CardTitle>
                <CardDescription>
                  Calculate tax on capital gains from asset sales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="assetType">Asset Type</Label>
                    <Select value={capitalGainsForm.assetType} onValueChange={(value) => setCapitalGainsForm(prev => ({...prev, assetType: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equity">Equity Shares</SelectItem>
                        <SelectItem value="property">Property</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="bonds">Bonds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="purchasePrice">Purchase Price (₹)</Label>
                    <Input
                      id="purchasePrice"
                      type="number"
                      value={capitalGainsForm.purchasePrice}
                      onChange={(e) => setCapitalGainsForm(prev => ({...prev, purchasePrice: e.target.value}))}
                      placeholder="Enter purchase price"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="salePrice">Sale Price (₹)</Label>
                    <Input
                      id="salePrice"
                      type="number"
                      value={capitalGainsForm.salePrice}
                      onChange={(e) => setCapitalGainsForm(prev => ({...prev, salePrice: e.target.value}))}
                      placeholder="Enter sale price"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="purchaseDate">Purchase Date</Label>
                      <Input
                        id="purchaseDate"
                        type="date"
                        value={capitalGainsForm.purchaseDate}
                        onChange={(e) => setCapitalGainsForm(prev => ({...prev, purchaseDate: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="saleDate">Sale Date</Label>
                      <Input
                        id="saleDate"
                        type="date"
                        value={capitalGainsForm.saleDate}
                        onChange={(e) => setCapitalGainsForm(prev => ({...prev, saleDate: e.target.value}))}
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateCapitalGains} className="w-full">
                    Calculate Capital Gains Tax
                  </Button>
                </div>
                
                {capitalGains && (
                  <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <h4 className="font-semibold mb-3">Capital Gains Tax Calculation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Capital Gain:</span>
                        <span className="font-medium">₹{(capitalGains.salePrice - capitalGains.purchasePrice).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Holding Period:</span>
                        <span className="font-medium">{capitalGains.holdingPeriod} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gain Type:</span>
                        <span className="font-medium">{capitalGains.gainType === 'short_term' ? 'Short Term' : 'Long Term'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax Rate:</span>
                        <span className="font-medium">{capitalGains.effectiveRate}%</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Tax Amount:</span>
                        <span className="text-red-600">₹{capitalGains.taxAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Rental Income Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Rental Income Calculator
                </CardTitle>
                <CardDescription>
                  Calculate taxable income from rental properties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="monthlyRent">Monthly Rent (₹)</Label>
                    <Input
                      id="monthlyRent"
                      type="number"
                      value={rentalForm.monthlyRent}
                      onChange={(e) => setRentalForm(prev => ({...prev, monthlyRent: e.target.value}))}
                      placeholder="Enter monthly rent"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="municipalTaxes">Municipal Taxes (₹)</Label>
                    <Input
                      id="municipalTaxes"
                      type="number"
                      value={rentalForm.municipalTaxes}
                      onChange={(e) => setRentalForm(prev => ({...prev, municipalTaxes: e.target.value}))}
                      placeholder="Enter municipal taxes paid"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="interestOnLoan">Interest on Loan (₹)</Label>
                    <Input
                      id="interestOnLoan"
                      type="number"
                      value={rentalForm.interestOnLoan}
                      onChange={(e) => setRentalForm(prev => ({...prev, interestOnLoan: e.target.value}))}
                      placeholder="Enter interest on home loan"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="otherExpenses">Other Expenses (₹)</Label>
                    <Input
                      id="otherExpenses"
                      type="number"
                      value={rentalForm.otherExpenses}
                      onChange={(e) => setRentalForm(prev => ({...prev, otherExpenses: e.target.value}))}
                      placeholder="Enter other expenses"
                    />
                  </div>
                  
                  <Button onClick={calculateRentalIncome} className="w-full">
                    Calculate Rental Income Tax
                  </Button>
                </div>
                
                {rentalIncome && (
                  <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <h4 className="font-semibold mb-3">Rental Income Tax Calculation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Annual Rent:</span>
                        <span className="font-medium">₹{rentalIncome.annualRent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Standard Deduction (30%):</span>
                        <span className="font-medium">₹{rentalIncome.standardDeduction.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Municipal Taxes:</span>
                        <span className="font-medium">₹{rentalIncome.municipalTaxes.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest on Loan:</span>
                        <span className="font-medium">₹{rentalIncome.interestOnLoan.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Other Expenses:</span>
                        <span className="font-medium">₹{rentalIncome.otherExpenses.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Net Taxable Income:</span>
                        <span className="text-red-600">₹{rentalIncome.netIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Tax Amount (30%):</span>
                        <span className="text-red-600">₹{rentalIncome.taxAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Tax Events & Updates
              </CardTitle>
              <CardDescription>
                Stay informed about tax law changes and important updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {event.date.toLocaleDateString()}
                          </span>
                          <span className={`flex items-center gap-1 ${getImpactColor(event.impact)}`}>
                            <AlertTriangle className="h-3 w-3" />
                            Impact: {event.impact}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {event.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        <FileText className="h-4 w-4 mr-1" />
                        Read More
                      </Button>
                      <Button size="sm" variant="outline">
                        <Bell className="h-4 w-4 mr-1" />
                        Follow
                      </Button>
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