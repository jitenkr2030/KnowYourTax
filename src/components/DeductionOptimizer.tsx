"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Calculator,
  TrendingUp,
  Shield,
  GraduationCap,
  Heart,
  Home as HomeIcon,
  Users,
  Building,
  Car,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Info,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft
} from "lucide-react"

interface Deduction {
  id: string
  section: string
  name: string
  description: string
  maxLimit: number
  currentAmount: number
  category: string
  icon: React.ComponentType<any>
  documents: string[]
}

interface DeductionCategory {
  id: string
  name: string
  description: string
  deductions: Deduction[]
  totalLimit: number
  color: string
}

const deductionCategories: DeductionCategory[] = [
  {
    id: "80c",
    name: "Section 80C",
    description: "Investments and expenditures eligible for deduction up to ₹1.5 lakh",
    totalLimit: 150000,
    color: "bg-blue-500",
    deductions: [
      {
        id: "80c-1",
        section: "80C",
        name: "Life Insurance Premium",
        description: "Premium paid on life insurance policies",
        maxLimit: 150000,
        currentAmount: 0,
        category: "80c",
        icon: Shield,
        documents: ["Premium receipt", "Policy document"]
      },
      {
        id: "80c-2",
        section: "80C",
        name: "Provident Fund (PF)",
        description: "Employee's contribution to PF",
        maxLimit: 150000,
        currentAmount: 0,
        category: "80c",
        icon: Users,
        documents: ["PF statement", "Salary slip"]
      },
      {
        id: "80c-3",
        section: "80C",
        name: "Equity Linked Savings Scheme (ELSS)",
        description: "Investment in ELSS mutual funds",
        maxLimit: 150000,
        currentAmount: 0,
        category: "80c",
        icon: TrendingUp,
        documents: ["Fund statement", "Investment proof"]
      },
      {
        id: "80c-4",
        section: "80C",
        name: "Home Loan Principal",
        description: "Principal repayment on home loan",
        maxLimit: 150000,
        currentAmount: 0,
        category: "80c",
        icon: HomeIcon,
        documents: ["Loan statement", "Amortization schedule"]
      },
      {
        id: "80c-5",
        section: "80C",
        name: "Tuition Fees",
        description: "Tuition fees for children's education",
        maxLimit: 150000,
        currentAmount: 0,
        category: "80c",
        icon: GraduationCap,
        documents: ["Fee receipts", "School/College certificate"]
      },
      {
        id: "80c-6",
        section: "80C",
        name: "Fixed Deposits (Tax Saving)",
        description: "5-year tax-saving fixed deposits",
        maxLimit: 150000,
        currentAmount: 0,
        category: "80c",
        icon: Building,
        documents: ["FD certificate", "Bank statement"]
      }
    ]
  },
  {
    id: "80d",
    name: "Section 80D",
    description: "Health insurance premiums for self, family, and parents",
    totalLimit: 75000,
    color: "bg-green-500",
    deductions: [
      {
        id: "80d-1",
        section: "80D",
        name: "Health Insurance (Self & Family)",
        description: "Premium for health insurance of self, spouse, and children",
        maxLimit: 25000,
        currentAmount: 0,
        category: "80d",
        icon: Heart,
        documents: ["Insurance policy", "Premium receipts"]
      },
      {
        id: "80d-2",
        section: "80D",
        name: "Health Insurance (Parents)",
        description: "Premium for health insurance of parents (below 60 years)",
        maxLimit: 25000,
        currentAmount: 0,
        category: "80d",
        icon: Users,
        documents: ["Insurance policy", "Premium receipts", "Age proof"]
      },
      {
        id: "80d-3",
        section: "80D",
        name: "Preventive Health Check-up",
        description: "Expenses for preventive health check-up",
        maxLimit: 5000,
        currentAmount: 0,
        category: "80d",
        icon: Heart,
        documents: ["Medical bills", "Lab reports"]
      }
    ]
  },
  {
    id: "80e",
    name: "Section 80E",
    description: "Interest on education loan for higher studies",
    totalLimit: 0, // No limit
    color: "bg-purple-500",
    deductions: [
      {
        id: "80e-1",
        section: "80E",
        name: "Education Loan Interest",
        description: "Interest paid on education loan for higher studies",
        maxLimit: 0, // No limit
        currentAmount: 0,
        category: "80e",
        icon: GraduationCap,
        documents: ["Loan statement", "Interest certificate", "Admission proof"]
      }
    ]
  },
  {
    id: "80g",
    name: "Section 80G",
    description: "Donations to charitable institutions",
    totalLimit: 0, // Varies
    color: "bg-red-500",
    deductions: [
      {
        id: "80g-1",
        section: "80G",
        name: "Charitable Donations",
        description: "Donations to approved charitable institutions",
        maxLimit: 0, // Varies by institution
        currentAmount: 0,
        category: "80g",
        icon: Heart,
        documents: ["Donation receipt", "80G certificate"]
      }
    ]
  },
  {
    id: "eea",
    name: "Other Deductions",
    description: "House rent allowance, home loan interest, and other deductions",
    totalLimit: 200000,
    color: "bg-orange-500",
    deductions: [
      {
        id: "hra-1",
        section: "HRA",
        name: "House Rent Allowance",
        description: "HRA exemption for rented accommodation",
        maxLimit: 0, // Based on salary and rent
        currentAmount: 0,
        category: "eea",
        icon: HomeIcon,
        documents: ["Rent receipts", "Rent agreement", "PAN of landlord"]
      },
      {
        id: "24b-1",
        section: "24(b)",
        name: "Home Loan Interest",
        description: "Interest paid on home loan for self-occupied property",
        maxLimit: 200000,
        currentAmount: 0,
        category: "eea",
        icon: HomeIcon,
        documents: ["Loan statement", "Interest certificate"]
      }
    ]
  }
]

interface HRAInput {
  basicSalary: number
  hraReceived: number
  rentPaid: number
  isMetroCity: boolean
}

interface DeductionOptimizerProps {
  onDeductionsComplete: (deductions: any) => void
  onBack: () => void
  userId: string
}

export default function DeductionOptimizer({ onDeductionsComplete, onBack, userId }: DeductionOptimizerProps) {
  const [activeTab, setActiveTab] = useState("80c")
  const [deductions, setDeductions] = useState<Deduction[][]>(deductionCategories.map(cat => cat.deductions))
  const [hraInput, setHraInput] = useState<HRAInput>({
    basicSalary: 0,
    hraReceived: 0,
    rentPaid: 0,
    isMetroCity: true
  })
  const [hraExemption, setHraExemption] = useState(0)
  const [totalDeductions, setTotalDeductions] = useState(0)
  const [taxSaved, setTaxSaved] = useState(0)

  const updateDeductionAmount = (categoryIndex: number, deductionIndex: number, amount: number) => {
    const newDeductions = [...deductions]
    newDeductions[categoryIndex][deductionIndex].currentAmount = Math.max(0, amount)
    setDeductions(newDeductions)
  }

  const calculateHRAExemption = () => {
    const { basicSalary, hraReceived, rentPaid, isMetroCity } = hraInput
    
    if (basicSalary === 0 || hraReceived === 0 || rentPaid === 0) {
      setHraExemption(0)
      return
    }

    // HRA exemption calculation
    const actualHRA = hraReceived
    const rentExcess = rentPaid - (basicSalary * 0.1)
    const salaryLimit = isMetroCity ? basicSalary * 0.5 : basicSalary * 0.4

    const exemption = Math.min(actualHRA, rentExcess, salaryLimit)
    setHraExemption(Math.max(0, exemption))
  }

  const calculateTotals = () => {
    let total = 0
    
    deductions.forEach((categoryDeductions, categoryIndex) => {
      if (categoryIndex === 0) { // 80C
        const categoryTotal = categoryDeductions.reduce((sum, deduction) => sum + deduction.currentAmount, 0)
        total += Math.min(categoryTotal, 150000)
      } else if (categoryIndex === 1) { // 80D
        let categoryTotal = categoryDeductions.reduce((sum, deduction) => sum + deduction.currentAmount, 0)
        // Add preventive health check-up if other deductions exist
        if (categoryTotal > 0 && categoryDeductions[2].currentAmount > 0) {
          categoryTotal = Math.min(categoryTotal, 5000) + Math.min(categoryTotal - 5000, 75000)
        } else {
          categoryTotal = Math.min(categoryTotal, 75000)
        }
        total += categoryTotal
      } else if (categoryIndex === 2) { // 80E
        total += categoryDeductions[0].currentAmount
      } else if (categoryIndex === 3) { // 80G
        total += categoryDeductions[0].currentAmount
      } else if (categoryIndex === 4) { // Other
        total += hraExemption
        total += Math.min(categoryDeductions[1].currentAmount, 200000) // Home loan interest
      }
    })

    setTotalDeductions(total)
    setTaxSaved(total * 0.3) // Assuming 30% tax rate
  }

  useEffect(() => {
    calculateHRAExemption()
  }, [hraInput])

  useEffect(() => {
    calculateTotals()
  }, [deductions, hraExemption])

  const getCategoryProgress = (categoryIndex: number) => {
    const category = deductionCategories[categoryIndex]
    const categoryDeductions = deductions[categoryIndex]
    const total = categoryDeductions.reduce((sum, deduction) => sum + deduction.currentAmount, 0)
    
    if (category.totalLimit === 0) return 100 // No limit
    return Math.min((total / category.totalLimit) * 100, 100)
  }

  const getCategoryTotal = (categoryIndex: number) => {
    const categoryDeductions = deductions[categoryIndex]
    return categoryDeductions.reduce((sum, deduction) => sum + deduction.currentAmount, 0)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Deduction Optimizer</h1>
        <p className="text-gray-600">Maximize your tax savings with smart deduction planning</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Total Deductions</span>
            </div>
            <p className="text-2xl font-bold mt-1">₹{totalDeductions.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Across all sections</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Tax Saved</span>
            </div>
            <p className="text-2xl font-bold mt-1">₹{taxSaved.toLocaleString()}</p>
            <p className="text-xs text-gray-500">At 30% tax rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Optimization Score</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {Math.min(Math.round((totalDeductions / 500000) * 100), 100)}%
            </p>
            <p className="text-xs text-gray-500">Of optimal deductions</p>
          </CardContent>
        </Card>
      </div>

      {/* Deduction Categories */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {deductionCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {deductionCategories.map((category, categoryIndex) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className={`w-8 h-8 ${category.color} rounded-full flex items-center justify-center`}>
                    <Calculator className="w-4 h-4 text-white" />
                  </div>
                  <span>{category.name}</span>
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Category Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Category Progress</span>
                      <span>₹{getCategoryTotal(categoryIndex).toLocaleString()} 
                        {category.totalLimit > 0 && ` / ₹${category.totalLimit.toLocaleString()}`}
                      </span>
                    </div>
                    <Progress value={getCategoryProgress(categoryIndex)} className="h-2" />
                  </div>

                  {/* Deductions List */}
                  <div className="space-y-4">
                    {category.deductions.map((deduction, deductionIndex) => (
                      <div key={deduction.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <deduction.icon className="w-5 h-5 text-gray-600" />
                              <h3 className="font-medium">{deduction.name}</h3>
                              {deduction.currentAmount > 0 && (
                                <Badge className="bg-green-100 text-green-800">Added</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{deduction.description}</p>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Label className="text-xs">Amount (₹)</Label>
                                <Input
                                  type="number"
                                  value={deduction.currentAmount}
                                  onChange={(e) => updateDeductionAmount(categoryIndex, deductionIndex, Number(e.target.value))}
                                  className="w-32"
                                  placeholder="0"
                                />
                                {deduction.maxLimit > 0 && (
                                  <span className="text-xs text-gray-500">
                                    Max: ₹{deduction.maxLimit.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">
                                <span className="font-medium">Documents required:</span> {deduction.documents.join(", ")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Special HRA Calculator */}
                  {category.id === "eea" && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-lg">HRA Exemption Calculator</CardTitle>
                        <CardDescription>
                          Calculate your House Rent Allowance exemption
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm">Basic Salary (Annual)</Label>
                            <Input
                              type="number"
                              value={hraInput.basicSalary}
                              onChange={(e) => setHraInput(prev => ({ ...prev, basicSalary: Number(e.target.value) }))}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">HRA Received (Annual)</Label>
                            <Input
                              type="number"
                              value={hraInput.hraReceived}
                              onChange={(e) => setHraInput(prev => ({ ...prev, hraReceived: Number(e.target.value) }))}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Rent Paid (Annual)</Label>
                            <Input
                              type="number"
                              value={hraInput.rentPaid}
                              onChange={(e) => setHraInput(prev => ({ ...prev, rentPaid: Number(e.target.value) }))}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">City Type</Label>
                            <select
                              value={hraInput.isMetroCity ? "metro" : "non-metro"}
                              onChange={(e) => setHraInput(prev => ({ 
                                ...prev, 
                                isMetroCity: e.target.value === "metro" 
                              }))}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            >
                              <option value="metro">Metro City</option>
                              <option value="non-metro">Non-Metro City</option>
                            </select>
                          </div>
                        </div>
                        {hraExemption > 0 && (
                          <Alert>
                            <CheckCircle className="w-4 h-4" />
                            <AlertDescription>
                              Your HRA exemption is <strong>₹{hraExemption.toLocaleString()}</strong>
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Recommendations</CardTitle>
          <CardDescription>
            AI-powered suggestions to maximize your tax savings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <h4 className="font-medium">Maximize 80C Limit</h4>
                <p className="text-sm text-gray-600">
                  You've used ₹{getCategoryTotal(0).toLocaleString()} of ₹150,000 limit. 
                  Consider investing in ELSS or tax-saving FDs to maximize this deduction.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <h4 className="font-medium">Health Insurance Coverage</h4>
                <p className="text-sm text-gray-600">
                  Ensure you have health insurance for yourself and your parents to claim 80D deductions.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
              <div>
                <h4 className="font-medium">Home Loan Benefits</h4>
                <p className="text-sm text-gray-600">
                  If you have a home loan, don't forget to claim both principal (80C) and interest (24(b)) deductions.
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
          Back to Data Collection
        </Button>
        <Button onClick={() => onDeductionsComplete({ deductions, totalDeductions, taxSaved })}>
          Continue to Tax Calculation
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}