"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Brain, 
  TrendingUp, 
  DollarSign, 
  PiggyBank, 
  Lightbulb, 
  Calculator,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart
} from "lucide-react"

interface AITaxAdvisorProps {
  userId: string
  totalTaxPaid: number
  taxBreakdown: Array<{ category: string; amount: number; percentage: number; color: string }>
}

interface TaxRecommendation {
  id: string
  title: string
  description: string
  category: string
  potentialSavings: number
  priority: "high" | "medium" | "low"
  implementation: string
  deadline?: string
}

interface TaxPrediction {
  category: string
  currentAmount: number
  predictedAmount: number
  confidence: number
  trend: "up" | "down" | "stable"
}

interface InvestmentSuggestion {
  name: string
  type: string
  description: string
  maxInvestment: number
  taxBenefit: number
  riskLevel: "low" | "medium" | "high"
  liquidity: "high" | "medium" | "low"
}

export default function AITaxAdvisor({ userId, totalTaxPaid, taxBreakdown }: AITaxAdvisorProps) {
  const [recommendations, setRecommendations] = useState<TaxRecommendation[]>([])
  const [predictions, setPredictions] = useState<TaxPrediction[]>([])
  const [investments, setInvestments] = useState<InvestmentSuggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("recommendations")

  useEffect(() => {
    // Simulate AI-powered analysis
    const analyzeTaxData = async () => {
      setLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock AI recommendations
      const mockRecommendations: TaxRecommendation[] = [
        {
          id: "1",
          title: "Maximize Section 80C Deductions",
          description: "You're currently utilizing only 60% of your 80C limit. Consider increasing PPF or ELSS investments.",
          category: "Deductions",
          potentialSavings: 45000,
          priority: "high",
          implementation: "Invest additional ₹45,000 in PPF or ELSS funds before March 31st",
          deadline: "2024-03-31"
        },
        {
          id: "2",
          title: "Health Insurance Optimization",
          description: "Your current health insurance premium is eligible for additional deductions under Section 80D.",
          category: "Insurance",
          potentialSavings: 15000,
          priority: "medium",
          implementation: "Increase health insurance coverage for family members",
          deadline: "2024-03-31"
        },
        {
          id: "3",
          title: "Home Loan Benefits",
          description: "You're eligible for additional home loan interest deductions under Section 24.",
          category: "Housing",
          potentialSavings: 30000,
          priority: "high",
          implementation: "Submit home loan interest certificate to employer",
          deadline: "2024-02-28"
        },
        {
          id: "4",
          title: "Donation Tax Benefits",
          description: "Consider making donations to approved charitable institutions for 80G benefits.",
          category: "Donations",
          potentialSavings: 10000,
          priority: "low",
          implementation: "Donate to PM Relief Fund or other approved institutions",
          deadline: "2024-03-31"
        }
      ]

      // Mock tax predictions
      const mockPredictions: TaxPrediction[] = [
        {
          category: "Income Tax",
          currentAmount: 85000,
          predictedAmount: 78000,
          confidence: 85,
          trend: "down"
        },
        {
          category: "GST",
          currentAmount: 25000,
          predictedAmount: 28000,
          confidence: 75,
          trend: "up"
        },
        {
          category: "Fuel Taxes",
          currentAmount: 10000,
          predictedAmount: 9500,
          confidence: 70,
          trend: "down"
        }
      ]

      // Mock investment suggestions
      const mockInvestments: InvestmentSuggestion[] = [
        {
          name: "Public Provident Fund (PPF)",
          type: "Debt",
          description: "Government-backed scheme with tax-free returns and sovereign guarantee",
          maxInvestment: 150000,
          taxBenefit: 46500,
          riskLevel: "low",
          liquidity: "low"
        },
        {
          name: "Equity Linked Savings Scheme (ELSS)",
          type: "Equity",
          description: "Market-linked investment with potential for higher returns and tax benefits",
          maxInvestment: 150000,
          taxBenefit: 46500,
          riskLevel: "medium",
          liquidity: "medium"
        },
        {
          name: "National Pension System (NPS)",
          type: "Pension",
          description: "Retirement-focused investment with additional tax benefits",
          maxInvestment: 200000,
          taxBenefit: 62000,
          riskLevel: "medium",
          liquidity: "low"
        },
        {
          name: "Tax-Saving Fixed Deposits",
          type: "Debt",
          description: "Bank deposits with 5-year lock-in period and tax benefits",
          maxInvestment: 150000,
          taxBenefit: 46500,
          riskLevel: "low",
          liquidity: "low"
        }
      ]

      setRecommendations(mockRecommendations)
      setPredictions(mockPredictions)
      setInvestments(mockInvestments)
      setLoading(false)
    }

    analyzeTaxData()
  }, [userId, totalTaxPaid])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500"
      case "medium": return "bg-yellow-500"
      case "low": return "bg-green-500"
      default: return "bg-gray-500"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-red-600"
      case "medium": return "text-yellow-600"
      case "low": return "text-green-600"
      default: return "text-gray-600"
    }
  }

  const getLiquidityColor = (liquidity: string) => {
    switch (liquidity) {
      case "high": return "text-green-600"
      case "medium": return "text-yellow-600"
      case "low": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const totalPotentialSavings = recommendations.reduce((sum, rec) => sum + rec.potentialSavings, 0)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <Brain className="h-12 w-12 mx-auto mb-4 text-blue-500 animate-pulse" />
            <h3 className="text-lg font-semibold mb-2">AI Analyzing Your Tax Data</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Our AI is analyzing your tax patterns and preparing personalized recommendations...
            </p>
            <Progress value={75} className="mt-4 w-64 mx-auto" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">AI Tax Advisor</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Smart recommendations powered by artificial intelligence
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Brain className="h-3 w-3 mr-1" />
            AI-Powered
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">₹{totalPotentialSavings.toLocaleString()}</p>
              <p className="text-sm font-medium">Potential Savings</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Through optimization</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Brain className="h-4 w-4 text-blue-600" />
              </div>
              <Badge variant="outline" className="text-xs">
                {recommendations.length} Tips
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{recommendations.filter(r => r.priority === 'high').length}</p>
              <p className="text-sm font-medium">High Priority</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Action items</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <PiggyBank className="h-4 w-4 text-purple-600" />
              </div>
              <Badge variant="outline" className="text-xs">
                {investments.length} Options
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">₹{Math.max(...investments.map(i => i.taxBenefit)).toLocaleString()}</p>
              <p className="text-sm font-medium">Max Tax Benefit</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">From investments</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI Tax Recommendations
              </CardTitle>
              <CardDescription>
                Personalized suggestions to optimize your tax strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{rec.title}</h4>
                          <Badge variant="outline" className={`text-xs ${getPriorityColor(rec.priority)} text-white`}>
                            {rec.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {rec.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            Category: {rec.category}
                          </span>
                          {rec.deadline && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Deadline: {new Date(rec.deadline).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ₹{rec.potentialSavings.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          Potential savings
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-1">How to implement:</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {rec.implementation}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark as Done
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calculator className="h-4 w-4 mr-1" />
                        Calculate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Tax Predictions
              </CardTitle>
              <CardDescription>
                AI-powered forecasts for your future tax obligations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((pred, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{pred.category}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{pred.confidence}% confidence</Badge>
                        {pred.trend === 'up' ? (
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        ) : pred.trend === 'down' ? (
                          <ArrowDownRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <div className="h-4 w-4 bg-gray-400 rounded-full" />
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Current</p>
                        <p className="text-lg font-bold">₹{pred.currentAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Predicted</p>
                        <p className="text-lg font-bold">₹{pred.predictedAmount.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Trend</span>
                        <span className={pred.trend === 'up' ? 'text-red-600' : pred.trend === 'down' ? 'text-green-600' : 'text-gray-600'}>
                          {pred.trend === 'up' ? 'Increasing' : pred.trend === 'down' ? 'Decreasing' : 'Stable'}
                        </span>
                      </div>
                      <Progress 
                        value={pred.confidence} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Tax-Saving Investment Options
              </CardTitle>
              <CardDescription>
                AI-recommended investment options to maximize tax benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.map((inv, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold">{inv.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {inv.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className={`flex items-center gap-1 ${getRiskColor(inv.riskLevel)}`}>
                            <AlertCircle className="h-3 w-3" />
                            Risk: {inv.riskLevel}
                          </span>
                          <span className={`flex items-center gap-1 ${getLiquidityColor(inv.liquidity)}`}>
                            <Clock className="h-3 w-3" />
                            Liquidity: {inv.liquidity}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ₹{inv.taxBenefit.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          Tax benefit
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Max Investment:</span>
                        <span className="ml-2 font-medium">₹{inv.maxInvestment.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Type:</span>
                        <span className="ml-2 font-medium">{inv.type}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="flex-1">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Invest Now
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calculator className="h-4 w-4 mr-1" />
                        Details
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