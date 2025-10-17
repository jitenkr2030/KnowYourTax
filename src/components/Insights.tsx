"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  BarChart3, 
  BookOpen, 
  GraduationCap,
  Lightbulb,
  DollarSign,
  Building,
  Heart,
  Shield,
  Users,
  Info,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

interface InsightsProps {
  onBack: () => void
  totalTaxPaid: number
  taxBreakdown: Array<{ category: string; amount: number; percentage: number; color: string }>
}

export default function Insights({ onBack, totalTaxPaid, taxBreakdown }: InsightsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Tax allocation data
  const taxAllocation = [
    { category: "Education", amount: totalTaxPaid * 0.30, icon: GraduationCap, color: "bg-blue-500" },
    { category: "Infrastructure", amount: totalTaxPaid * 0.25, icon: Building, color: "bg-green-500" },
    { category: "Defense", amount: totalTaxPaid * 0.20, icon: Shield, color: "bg-red-500" },
    { category: "Healthcare", amount: totalTaxPaid * 0.15, icon: Heart, color: "bg-purple-500" },
    { category: "Other Services", amount: totalTaxPaid * 0.10, icon: Users, color: "bg-orange-500" }
  ]

  // Tax education content
  const taxEducation = [
    {
      title: "Understanding Tax Slabs",
      content: "Income tax in India is progressive, meaning higher income is taxed at higher rates. The current slabs range from 0% to 30% depending on your income level.",
      icon: BookOpen
    },
    {
      title: "Direct vs Indirect Tax",
      content: "Direct tax is paid directly by individuals (Income Tax), while indirect tax is collected by intermediaries (GST, Excise). Both contribute to nation building.",
      icon: PieChart
    },
    {
      title: "Tax Deductions",
      content: "Maximize your tax savings through deductions under Section 80C, 80D, HRA, and home loan benefits. Proper planning can significantly reduce your tax liability.",
      icon: TrendingUp
    }
  ]

  // Tax insights data
  const insights = [
    {
      title: "Tax Efficiency",
      value: "78%",
      description: "of your taxes contribute to development",
      trend: "up",
      icon: TrendingUp
    },
    {
      title: "Effective Tax Rate",
      value: "18.5%",
      description: "average rate on your total income",
      trend: "down",
      icon: TrendingDown
    },
    {
      title: "Tax Saving Potential",
      value: "₹45,000",
      description: "additional savings possible",
      trend: "up",
      icon: DollarSign
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tax Insights & Education</h2>
          <p className="text-slate-600 dark:text-slate-400">Understand where your taxes go and learn about tax concepts</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="allocation">Tax Allocation</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${insight.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                      <insight.icon className={`h-4 w-4 ${insight.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                    {insight.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{insight.value}</p>
                    <p className="text-sm font-medium">{insight.title}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{insight.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tax Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Tax Contribution</CardTitle>
              <CardDescription>How your taxes are making a difference</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">By Tax Type</h4>
                    {taxBreakdown.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm">₹{item.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                          </div>
                          <span className="text-xs text-slate-600 dark:text-slate-400">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Quick Facts</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>You've contributed ₹{totalTaxPaid.toLocaleString()} this year</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Rank in top 25% of taxpayers in your income bracket</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Your taxes support 5 key development areas</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Where Your Taxes Go</CardTitle>
              <CardDescription>See how your tax contributions are allocated to different sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {taxAllocation.map((item, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.category}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            ₹{item.amount.toLocaleString()} ({((item.amount / totalTaxPaid) * 100).toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">₹{item.amount.toLocaleString()}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {((item.amount / totalTaxPaid) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {item.category === "Education" && "Funds schools, universities, and educational programs across India."}
                        {item.category === "Infrastructure" && "Builds roads, railways, airports, and public infrastructure."}
                        {item.category === "Defense" && "Supports national security and armed forces modernization."}
                        {item.category === "Healthcare" && "Finances hospitals, public health programs, and medical research."}
                        {item.category === "Other Services" && "Covers agriculture, rural development, and social welfare schemes."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Impact Visualization</CardTitle>
              <CardDescription>Visual representation of your tax impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Your Contribution Helps</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Educate 50+ children for a year</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Build 2km of rural road</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Support 10 healthcare workers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Fund public safety for 100 families</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">National Development</h4>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                      Your tax contributions, combined with millions of other taxpayers, create the foundation for India's development:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Economic Growth</span>
                        <span>↑ 12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Infrastructure Development</span>
                        <span>↑ 18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Social Welfare</span>
                        <span>↑ 15%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {taxEducation.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {item.content}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tax Concepts Explained</CardTitle>
              <CardDescription>Key tax terms and concepts simplified</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Common Tax Terms</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-3">
                      <h5 className="font-medium text-sm">Assessment Year</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400">The year in which income is assessed and taxed</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-3">
                      <h5 className="font-medium text-sm">Financial Year</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400">The year in which income is earned</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-3">
                      <h5 className="font-medium text-sm">Tax Deduction</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Amounts that reduce your taxable income</p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-3">
                      <h5 className="font-medium text-sm">Tax Exemption</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Income that is not subject to tax</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Tax Planning Tips</h4>
                  <div className="space-y-3">
                    <Alert>
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>
                        Start tax planning early in the financial year to maximize benefits.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Keep all investment proofs and receipts organized for easy filing.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <BookOpen className="h-4 w-4" />
                      <AlertDescription>
                        Stay updated with the latest tax laws and changes in budget.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}