"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Calculator, 
  Plus, 
  TrendingUp, 
  Building,
  ShoppingCart,
  Home,
  BookOpen,
  Info,
  ArrowUpRight,
  Percent,
  DollarSign,
  Users,
  Truck,
  Landmark,
  GraduationCap,
  Film,
  Briefcase,
  Gift,
  BarChart3,
  Crown,
  CreditCard,
  FileText,
  Search
} from "lucide-react"

interface TaxPayment {
  id: string
  taxId: number
  taxName: string
  taxCategory: string
  amount: number
  date: string
  description: string
  month: string
  year: string
}

interface TaxPaymentTrackerProps {
  userId: string
  onBack: () => void
}

const taxData = [
  {
    id: 1,
    name: "Income Tax",
    description: "Tax on personal income",
    category: "direct",
    type: "income",
    icon: Users,
    color: "blue"
  },
  {
    id: 2,
    name: "Corporate Tax",
    description: "Tax on company profits",
    category: "direct", 
    type: "corporate",
    icon: Building,
    color: "purple"
  },
  {
    id: 3,
    name: "Securities Transaction Tax",
    description: "Tax on stock market transactions",
    category: "direct",
    type: "transaction",
    icon: BarChart3,
    color: "green"
  },
  {
    id: 4,
    name: "Capital Gains Tax",
    description: "Tax on profits from asset sales",
    category: "direct",
    type: "gains",
    icon: TrendingUp,
    color: "orange"
  },
  {
    id: 5,
    name: "GST",
    description: "Goods and Services Tax",
    category: "indirect",
    type: "consumption",
    icon: Briefcase,
    color: "emerald"
  },
  {
    id: 6,
    name: "Custom Duty",
    description: "Tax on imports and exports",
    category: "indirect",
    type: "trade",
    icon: Landmark,
    color: "teal"
  },
  {
    id: 7,
    name: "Property Tax",
    description: "Municipal tax on property",
    category: "other",
    type: "property",
    icon: Home,
    color: "slate"
  },
  {
    id: 8,
    name: "Fuel Tax",
    description: "Tax on petroleum products",
    category: "other",
    type: "fuel",
    icon: Truck,
    color: "amber"
  },
  {
    id: 9,
    name: "Education Cess",
    description: "Additional tax for education",
    category: "other",
    type: "cess",
    icon: GraduationCap,
    color: "blue"
  },
  {
    id: 10,
    name: "Entertainment Tax",
    description: "Tax on entertainment activities",
    category: "other",
    type: "entertainment",
    icon: Film,
    color: "purple"
  },
  {
    id: 11,
    name: "Professional Tax",
    description: "Tax on professions and trades",
    category: "other",
    type: "professional",
    icon: Briefcase,
    color: "indigo"
  },
  {
    id: 12,
    name: "Stamp Duty",
    description: "Tax on legal documents",
    category: "other",
    type: "fees",
    icon: FileText,
    color: "gray"
  }
]

export default function TaxPaymentTracker({ userId, onBack }: TaxPaymentTrackerProps) {
  const [payments, setPayments] = useState<TaxPayment[]>([
    {
      id: "1",
      taxId: 1,
      taxName: "Income Tax",
      taxCategory: "direct",
      amount: 15000,
      date: "2024-06-15",
      description: "TDS for June salary",
      month: "Jun",
      year: "2024"
    },
    {
      id: "2", 
      taxId: 5,
      taxName: "GST",
      taxCategory: "indirect",
      amount: 2500,
      date: "2024-06-10",
      description: "GST on services",
      month: "Jun",
      year: "2024"
    },
    {
      id: "3",
      taxId: 8,
      taxName: "Fuel Tax",
      taxCategory: "other", 
      amount: 1200,
      date: "2024-06-08",
      description: "Petrol tax",
      month: "Jun",
      year: "2024"
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedTax, setSelectedTax] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.taxName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || payment.taxCategory === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalTaxPaid = payments.reduce((sum, payment) => sum + payment.amount, 0)
  
  const taxCategoryTotals = taxData.map(tax => {
    const categoryTotal = payments
      .filter(p => p.taxId === tax.id)
      .reduce((sum, p) => sum + p.amount, 0)
    return {
      ...tax,
      totalPaid: categoryTotal,
      paymentCount: payments.filter(p => p.taxId === tax.id).length
    }
  }).filter(tax => tax.totalPaid > 0)

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue": return {
        bg: "bg-blue-100",
        darkBg: "dark:bg-blue-900/20", 
        text: "text-blue-600",
        darkText: "dark:text-blue-400"
      }
      case "purple": return {
        bg: "bg-purple-100",
        darkBg: "dark:bg-purple-900/20",
        text: "text-purple-600", 
        darkText: "dark:text-purple-400"
      }
      case "green": return {
        bg: "bg-green-100",
        darkBg: "dark:bg-green-900/20",
        text: "text-green-600",
        darkText: "dark:text-green-400"
      }
      case "orange": return {
        bg: "bg-orange-100", 
        darkBg: "dark:bg-orange-900/20",
        text: "text-orange-600",
        darkText: "dark:text-orange-400"
      }
      case "emerald": return {
        bg: "bg-emerald-100",
        darkBg: "dark:bg-emerald-900/20", 
        text: "text-emerald-600",
        darkText: "dark:text-emerald-400"
      }
      case "teal": return {
        bg: "bg-teal-100",
        darkBg: "dark:bg-teal-900/20",
        text: "text-teal-600",
        darkText: "dark:text-teal-400"
      }
      case "slate": return {
        bg: "bg-slate-100",
        darkBg: "dark:bg-slate-900/20",
        text: "text-slate-600",
        darkText: "dark:text-slate-400"
      }
      case "amber": return {
        bg: "bg-amber-100",
        darkBg: "dark:bg-amber-900/20",
        text: "text-amber-600",
        darkText: "dark:text-amber-400"
      }
      case "indigo": return {
        bg: "bg-indigo-100",
        darkBg: "dark:bg-indigo-900/20",
        text: "text-indigo-600",
        darkText: "dark:text-indigo-400"
      }
      case "gray": return {
        bg: "bg-gray-100",
        darkBg: "dark:bg-gray-900/20",
        text: "text-gray-600",
        darkText: "dark:text-gray-400"
      }
      default: return {
        bg: "bg-gray-100",
        darkBg: "dark:bg-gray-900/20",
        text: "text-gray-600",
        darkText: "dark:text-gray-400"
      }
    }
  }

  const handleAddPayment = () => {
    if (!selectedTax || !amount || !date) return

    const tax = taxData.find(t => t.id.toString() === selectedTax)
    if (!tax) return

    const newPayment: TaxPayment = {
      id: Date.now().toString(),
      taxId: tax.id,
      taxName: tax.name,
      taxCategory: tax.category,
      amount: parseFloat(amount),
      date: date,
      description: description || `${tax.name} payment`,
      month: new Date(date).toLocaleString('default', { month: 'short' }),
      year: new Date(date).getFullYear().toString()
    }

    setPayments([...payments, newPayment])
    setShowAddForm(false)
    setSelectedTax("")
    setAmount("")
    setDescription("")
    setDate("")
  }

  const getTaxIcon = (IconComponent: any) => {
    return IconComponent && <IconComponent className="h-6 w-6" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tax Payment Tracker</h1>
          <p className="text-slate-600 dark:text-slate-400">Track and manage all your tax payments</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Tax Paid</p>
                <p className="text-2xl font-bold">₹{totalTaxPaid.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400">Tax Categories</p>
                <p className="text-2xl font-bold">{taxCategoryTotals.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400">Total Transactions</p>
                <p className="text-2xl font-bold">{payments.length}</p>
              </div>
              <FileText className="h-8 w-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Tax Categories Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {taxData.map((tax) => {
              const categoryTotal = payments
                .filter(p => p.taxId === tax.id)
                .reduce((sum, p) => sum + p.amount, 0)
              const paymentCount = payments.filter(p => p.taxId === tax.id).length
              const colorClasses = getColorClasses(tax.color)
              
              return (
                <Card key={tax.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 ${colorClasses.bg} ${colorClasses.darkBg} rounded-lg flex items-center justify-center`}>
                        <div className={`${colorClasses.text} ${colorClasses.darkText}`}>
                          {getTaxIcon(tax.icon)}
                        </div>
                      </div>
                      <Badge variant={categoryTotal > 0 ? "default" : "secondary"}>
                        {paymentCount} payments
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{tax.name}</CardTitle>
                    <CardDescription className="text-sm">{tax.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Amount Paid</span>
                        <span className="font-semibold">₹{categoryTotal.toLocaleString()}</span>
                      </div>
                      <Button 
                        className="w-full" 
                        size="sm"
                        onClick={() => {
                          setSelectedTax(tax.id.toString())
                          setShowAddForm(true)
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {/* Category Breakdown */}
          <div className="space-y-4">
            {taxCategoryTotals.map((tax) => {
              const percentage = totalTaxPaid > 0 ? (tax.totalPaid / totalTaxPaid) * 100 : 0
              const colorClasses = getColorClasses(tax.color)
              
              return (
                <Card key={tax.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${colorClasses.bg} ${colorClasses.darkBg} rounded-lg flex items-center justify-center`}>
                          <div className={`${colorClasses.text} ${colorClasses.darkText}`}>
                            {getTaxIcon(tax.icon)}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{tax.name}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {tax.paymentCount} payment{tax.paymentCount !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{tax.totalPaid.toLocaleString()}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">{percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search payments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="direct">Direct Taxes</SelectItem>
                    <SelectItem value="indirect">Indirect Taxes</SelectItem>
                    <SelectItem value="other">Other Taxes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <div className="space-y-3">
            {filteredPayments.map((payment) => {
              const tax = taxData.find(t => t.id === payment.taxId)
              const colorClasses = tax ? getColorClasses(tax.color) : getColorClasses("gray")
              
              return (
                <Card key={payment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${colorClasses.bg} ${colorClasses.darkBg} rounded-lg flex items-center justify-center`}>
                          <div className={`${colorClasses.text} ${colorClasses.darkText}`}>
                            {tax ? getTaxIcon(tax.icon) : <FileText className="h-5 w-5" />}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{payment.taxName}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {payment.description} • {new Date(payment.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{payment.amount.toLocaleString()}</div>
                        <Badge variant="outline" className="text-xs">
                          {payment.taxCategory}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Payment Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add Tax Payment</CardTitle>
              <CardDescription>Record a new tax payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Tax Type</label>
                <Select value={selectedTax} onValueChange={setSelectedTax}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tax type" />
                  </SelectTrigger>
                  <SelectContent>
                    {taxData.map((tax) => (
                      <SelectItem key={tax.id} value={tax.id.toString()}>
                        {tax.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Description (Optional)</label>
                <Input
                  placeholder="Payment description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleAddPayment} className="flex-1">
                  Add Payment
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}