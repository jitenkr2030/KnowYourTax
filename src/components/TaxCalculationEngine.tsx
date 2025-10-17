"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Info,
  Download,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  FileText,
  Eye,
  Lightbulb
} from "lucide-react"

interface TaxSlab {
  min: number
  max: number
  rate: number
  description: string
}

interface IncomeBreakdown {
  salary: number
  houseProperty: number
  business: number
  capitalGains: number
  otherSources: number
  total: number
}

interface DeductionBreakdown {
  section80C: number
  section80D: number
  section80E: number
  section80G: number
  hra: number
  homeLoanInterest: number
  total: number
}

interface TaxCalculation {
  grossIncome: number
  totalDeductions: number
  taxableIncome: number
  taxBeforeRebate: number
  rebate87A: number
  cess: number
  totalTax: number
  tds: number
  taxPayable: number
  refund: number
}

interface TaxComparison {
  currentYear: TaxCalculation
  previousYear: TaxCalculation
  difference: {
    income: number
    deductions: number
    tax: number
  }
}

const taxSlabsOld: TaxSlab[] = [
  { min: 0, max: 250000, rate: 0, description: "Exempt" },
  { min: 250000, max: 500000, rate: 5, description: "5% on income above ₹2.5L" },
  { min: 500000, max: 1000000, rate: 20, description: "20% on income above ₹5L" },
  { min: 1000000, max: Infinity, rate: 30, description: "30% on income above ₹10L" }
]

const taxSlabsNew: TaxSlab[] = [
  { min: 0, max: 300000, rate: 0, description: "Exempt" },
  { min: 300000, max: 600000, rate: 5, description: "5% on income above ₹3L" },
  { min: 600000, max: 900000, rate: 10, description: "10% on income above ₹6L" },
  { min: 900000, max: 1200000, rate: 15, description: "15% on income above ₹9L" },
  { min: 1200000, max: 1500000, rate: 20, description: "20% on income above ₹12L" },
  { min: 1500000, max: Infinity, rate: 30, description: "30% on income above ₹15L" }
]

interface TaxCalculationEngineProps {
  onCalculationComplete: (calculation: TaxCalculation) => void
  onBack: () => void
  userId: string
  incomeData: any
  deductionsData: any
}

export default function TaxCalculationEngine({ 
  onCalculationComplete, 
  onBack, 
  userId, 
  incomeData, 
  deductionsData 
}: TaxCalculationEngineProps) {
  const [activeTab, setActiveTab] = useState("calculation")
  const [taxRegime, setTaxRegime] = useState<"old" | "new">("old")
  const [incomeBreakdown, setIncomeBreakdown] = useState<IncomeBreakdown>({
    salary: 1200000,
    houseProperty: 0,
    business: 0,
    capitalGains: 125000,
    otherSources: 66000,
    total: 1391000
  })
  const [deductionBreakdown, setDeductionBreakdown] = useState<DeductionBreakdown>({
    section80C: 120000,
    section80D: 25000,
    section80E: 0,
    section80G: 0,
    hra: 0,
    homeLoanInterest: 0,
    total: 145000
  })
  const [taxCalculation, setTaxCalculation] = useState<TaxCalculation | null>(null)
  const [comparison, setComparison] = useState<TaxComparison | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateTax = (income: number, deductions: number, regime: "old" | "new"): TaxCalculation => {
    const taxableIncome = Math.max(0, income - deductions)
    const slabs = regime === "old" ? taxSlabsOld : taxSlabsNew
    
    let taxBeforeRebate = 0
    for (const slab of slabs) {
      if (income > slab.min) {
        const taxableInSlab = Math.min(income, slab.max) - slab.min
        taxBeforeRebate += taxableInSlab * (slab.rate / 100)
      }
    }

    // Rebate under Section 87A
    const rebate87A = income <= 500000 ? Math.min(taxBeforeRebate, 12500) : 0
    
    // Health and Education Cess (4%)
    const cess = (taxBeforeRebate - rebate87A) * 0.04
    
    const totalTax = taxBeforeRebate - rebate87A + cess
    
    // Assume TDS already deducted
    const tds = 53500
    const taxPayable = Math.max(0, totalTax - tds)
    const refund = Math.max(0, tds - totalTax)

    return {
      grossIncome: income,
      totalDeductions: deductions,
      taxableIncome,
      taxBeforeRebate,
      rebate87A,
      cess,
      totalTax,
      tds,
      taxPayable,
      refund
    }
  }

  const performCalculation = () => {
    setIsCalculating(true)
    
    setTimeout(() => {
      const currentYear = calculateTax(
        incomeBreakdown.total,
        deductionBreakdown.total,
        taxRegime
      )
      
      const previousYear = calculateTax(
        1250000, // Previous year income
        120000,  // Previous year deductions
        taxRegime
      )
      
      const difference = {
        income: incomeBreakdown.total - previousYear.grossIncome,
        deductions: deductionBreakdown.total - previousYear.totalDeductions,
        tax: currentYear.totalTax - previousYear.totalTax
      }
      
      setTaxCalculation(currentYear)
      setComparison({ currentYear, previousYear, difference })
      setIsCalculating(false)
    }, 1000)
  }

  useEffect(() => {
    performCalculation()
  }, [taxRegime, incomeBreakdown, deductionBreakdown])

  const getRegimeComparison = () => {
    const oldRegime = calculateTax(incomeBreakdown.total, deductionBreakdown.total, "old")
    const newRegime = calculateTax(incomeBreakdown.total, 0, "new") // New regime has no deductions
    
    return {
      old: oldRegime,
      new: newRegime,
      savings: oldRegime.totalTax - newRegime.totalTax
    }
  }

  const regimeComparison = getRegimeComparison()

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`

  const renderTaxSlabs = (slabs: TaxSlab[]) => (
    <div className="space-y-3">
      {slabs.map((slab, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <span className="font-medium">{slab.description}</span>
          </div>
          <div className="text-right">
            <span className="font-bold">{slab.rate}%</span>
            {slab.max !== Infinity && (
              <span className="text-sm text-gray-500 block">
                Up to {formatCurrency(slab.max)}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Tax Calculation Engine</h1>
        <p className="text-gray-600">Real-time tax liability calculation with smart analysis</p>
      </div>

      {/* Tax Regime Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Tax Regime</CardTitle>
          <CardDescription>
            Choose between old tax regime (with deductions) and new tax regime (lower rates, no deductions)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                taxRegime === "old" ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => setTaxRegime("old")}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">Old Tax Regime</h3>
                {taxRegime === "old" && <CheckCircle className="w-5 h-5 text-blue-500" />}
              </div>
              <p className="text-sm text-gray-600 mb-2">Higher rates with deductions</p>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Estimated Tax:</span>
                  <span className="font-medium">{formatCurrency(regimeComparison.old.totalTax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Effective Rate:</span>
                  <span className="font-medium">
                    {((regimeComparison.old.totalTax / incomeBreakdown.total) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                taxRegime === "new" ? "border-green-500 bg-green-50" : "border-gray-200"
              }`}
              onClick={() => setTaxRegime("new")}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">New Tax Regime</h3>
                {taxRegime === "new" && <CheckCircle className="w-5 h-5 text-green-500" />}
              </div>
              <p className="text-sm text-gray-600 mb-2">Lower rates, no deductions</p>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Estimated Tax:</span>
                  <span className="font-medium">{formatCurrency(regimeComparison.new.totalTax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Effective Rate:</span>
                  <span className="font-medium">
                    {((regimeComparison.new.totalTax / incomeBreakdown.total) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {regimeComparison.savings !== 0 && (
            <Alert className="mt-4">
              <Info className="w-4 h-4" />
              <AlertDescription>
                {regimeComparison.savings > 0 ? 
                  `New regime saves you ${formatCurrency(Math.abs(regimeComparison.savings))}` :
                  `Old regime saves you ${formatCurrency(Math.abs(regimeComparison.savings))}`
                }
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Main Calculation */}
      {isCalculating ? (
        <Card>
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-500" />
              <p>Calculating your tax liability...</p>
              <Progress value={75} className="w-64 mx-auto" />
            </div>
          </CardContent>
        </Card>
      ) : taxCalculation && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calculation">Tax Calculation</TabsTrigger>
            <TabsTrigger value="breakdown">Income Breakdown</TabsTrigger>
            <TabsTrigger value="comparison">Year Comparison</TabsTrigger>
            <TabsTrigger value="slabs">Tax Slabs</TabsTrigger>
          </TabsList>

          <TabsContent value="calculation" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Gross Income</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">{formatCurrency(taxCalculation.grossIncome)}</p>
                  <p className="text-xs text-gray-500">Total annual income</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <PieChart className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Taxable Income</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">{formatCurrency(taxCalculation.taxableIncome)}</p>
                  <p className="text-xs text-gray-500">After deductions</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">Total Tax</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">{formatCurrency(taxCalculation.totalTax)}</p>
                  <p className="text-xs text-gray-500">Including cess</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    {taxCalculation.refund > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm font-medium">
                      {taxCalculation.refund > 0 ? "Refund" : "Payable"}
                    </span>
                  </div>
                  <p className="text-2xl font-bold mt-1">
                    {formatCurrency(taxCalculation.refund > 0 ? taxCalculation.refund : taxCalculation.taxPayable)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {taxCalculation.refund > 0 ? "You'll get back" : "You need to pay"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tax Calculation Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Gross Income</span>
                    <span className="font-medium">{formatCurrency(taxCalculation.grossIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Less: Total Deductions</span>
                    <span className="font-medium text-red-600">- {formatCurrency(taxCalculation.totalDeductions)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Taxable Income</span>
                      <span className="font-medium">{formatCurrency(taxCalculation.taxableIncome)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax before Rebate</span>
                    <span>{formatCurrency(taxCalculation.taxBeforeRebate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Less: Rebate u/s 87A</span>
                    <span className="text-red-600">- {formatCurrency(taxCalculation.rebate87A)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Add: Health & Education Cess (4%)</span>
                    <span className="text-green-600">+ {formatCurrency(taxCalculation.cess)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-bold">Total Tax Liability</span>
                      <span className="font-bold">{formatCurrency(taxCalculation.totalTax)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Less: TDS Deducted</span>
                    <span className="text-red-600">- {formatCurrency(taxCalculation.tds)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className={`font-bold ${taxCalculation.refund > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {taxCalculation.refund > 0 ? 'Refund' : 'Tax Payable'}
                      </span>
                      <span className={`font-bold ${taxCalculation.refund > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(taxCalculation.refund > 0 ? taxCalculation.refund : taxCalculation.taxPayable)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Income Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(incomeBreakdown).map(([key, value]) => (
                      key !== 'total' && (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-medium">{formatCurrency(value)}</span>
                        </div>
                      )
                    ))}
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total Income</span>
                        <span>{formatCurrency(incomeBreakdown.total)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deduction Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(deductionBreakdown).map(([key, value]) => (
                      key !== 'total' && (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-medium">{formatCurrency(value)}</span>
                        </div>
                      )
                    ))}
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total Deductions</span>
                        <span>{formatCurrency(deductionBreakdown.total)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            {comparison && (
              <Card>
                <CardHeader>
                  <CardTitle>Year-over-Year Comparison</CardTitle>
                  <CardDescription>Compare current year with previous year's tax calculation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Income</h3>
                      <p className="text-2xl font-bold">
                        {comparison.difference.income > 0 ? '+' : ''}
                        {formatCurrency(Math.abs(comparison.difference.income))}
                      </p>
                      <p className="text-sm text-gray-500">
                        {comparison.difference.income > 0 ? 'Increase' : 'Decrease'} from last year
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Deductions</h3>
                      <p className="text-2xl font-bold">
                        {comparison.difference.deductions > 0 ? '+' : ''}
                        {formatCurrency(Math.abs(comparison.difference.deductions))}
                      </p>
                      <p className="text-sm text-gray-500">
                        {comparison.difference.deductions > 0 ? 'Increase' : 'Decrease'} from last year
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Tax</h3>
                      <p className="text-2xl font-bold">
                        {comparison.difference.tax > 0 ? '+' : ''}
                        {formatCurrency(Math.abs(comparison.difference.tax))}
                      </p>
                      <p className="text-sm text-gray-500">
                        {comparison.difference.tax > 0 ? 'Increase' : 'Decrease'} from last year
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="slabs" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Old Tax Regime Slabs</CardTitle>
                  <CardDescription>Applicable if you opt for old regime with deductions</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderTaxSlabs(taxSlabsOld)}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>New Tax Regime Slabs</CardTitle>
                  <CardDescription>Applicable if you opt for new regime without deductions</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderTaxSlabs(taxSlabsNew)}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Smart Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5" />
            <span>Smart Tax Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <h4 className="font-medium">Optimal Tax Regime</h4>
                <p className="text-sm text-gray-600">
                  Based on your income and deductions, {regimeComparison.savings > 0 ? 'new' : 'old'} tax regime is 
                  {regimeComparison.savings > 0 ? ' more beneficial' : ' more beneficial'} for you.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <h4 className="font-medium">Deduction Optimization</h4>
                <p className="text-sm text-gray-600">
                  You're utilizing {(deductionBreakdown.total / 150000 * 100).toFixed(0)}% of available 80C deductions. 
                  Consider maximizing this limit for better tax savings.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
              <div>
                <h4 className="font-medium">Tax Planning</h4>
                <p className="text-sm text-gray-600">
                  Your effective tax rate is {taxCalculation ? ((taxCalculation.totalTax / incomeBreakdown.total) * 100).toFixed(1) : 0}%. 
                  Consider tax-saving investments to reduce this further.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Deductions
        </Button>
        <Button onClick={() => taxCalculation && onCalculationComplete(taxCalculation)}>
          Continue to E-filing
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}