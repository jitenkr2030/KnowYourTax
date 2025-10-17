"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  FileText, 
  Search, 
  Filter,
  TrendingUp,
  Building,
  ShoppingCart,
  Home,
  BookOpen,
  Calculator,
  Info,
  ArrowUpRight,
  ArrowDownRight,
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
  CreditCard
} from "lucide-react"

interface IndianTaxInformationProps {
  userId: string
  onBack: () => void
}

export default function IndianTaxInformation({ userId, onBack }: IndianTaxInformationProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const taxData = {
    direct: [
      {
        id: 1,
        name: "Income Tax",
        description: "Tax levied on individual income from various sources",
        category: "direct",
        type: "income",
        rate: "0% - 30%",
        applicable: "Individuals, HUFs, Firms",
        keyFeatures: ["Progressive taxation", "Deductions available", "Annual filing"],
        icon: Users,
        color: "blue",
        latestUpdate: "Budget 2024",
        importance: "High"
      },
      {
        id: 2,
        name: "Corporate Tax",
        description: "Tax on profits of companies and corporations",
        category: "direct",
        type: "corporate",
        rate: "15% - 25%",
        applicable: "Domestic & Foreign Companies",
        keyFeatures: ["Lower rate for manufacturing", "MAT applicable", "Dividend distribution tax"],
        icon: Building,
        color: "purple",
        latestUpdate: "Budget 2024",
        importance: "High"
      },
      {
        id: 3,
        name: "Securities Transaction Tax",
        description: "Tax on securities transactions in stock exchanges",
        category: "direct",
        type: "transaction",
        rate: "0.001% - 0.1%",
        applicable: "Equity traders, Investors",
        keyFeatures: ["Payable by buyer/seller", "No deductions available", "Exchange-specific"],
        icon: BarChart3,
        color: "green",
        latestUpdate: "Budget 2024",
        importance: "Medium"
      },
      {
        id: 4,
        name: "Capital Gains Tax",
        description: "Tax on profits from sale of capital assets",
        category: "direct",
        type: "gains",
        rate: "10% - 20%",
        applicable: "Property sellers, Investors",
        keyFeatures: ["Short-term vs Long-term", "Indexation benefit", "Exemptions available"],
        icon: TrendingUp,
        color: "orange",
        latestUpdate: "Budget 2024",
        importance: "High"
      },
      {
        id: 5,
        name: "Gift Tax",
        description: "Tax on gifts received above specified limits",
        category: "direct",
        type: "gift",
        rate: "As per income tax slab",
        applicable: "Gift recipients",
        keyFeatures: ["Exempt for relatives", "Wedding gifts exempt", "Cash limit ₹50,000"],
        icon: Gift,
        color: "pink",
        latestUpdate: "Budget 2024",
        importance: "Medium"
      },
      {
        id: 6,
        name: "Wealth Tax",
        description: "Tax on individual wealth above threshold (Historical)",
        category: "direct",
        type: "wealth",
        rate: "1%",
        applicable: "High net-worth individuals",
        keyFeatures: ["Abolished in 2015", "Replaced with surcharge", "Historical context"],
        icon: Crown,
        color: "yellow",
        latestUpdate: "Historical",
        importance: "Low"
      }
    ],
    indirect: [
      {
        id: 7,
        name: "Sales Tax",
        description: "Tax on sale of goods (Replaced by GST)",
        category: "indirect",
        type: "sales",
        rate: "Varied by state",
        applicable: "Retailers, Consumers",
        keyFeatures: ["State-specific", "VAT-based", "Replaced by GST"],
        icon: ShoppingCart,
        color: "red",
        latestUpdate: "Pre-GST Era",
        importance: "Low"
      },
      {
        id: 8,
        name: "Service Tax",
        description: "Tax on services provided (Replaced by GST)",
        category: "indirect",
        type: "service",
        rate: "15%",
        applicable: "Service providers",
        keyFeatures: ["Point of taxation", "Abatement available", "Replaced by GST"],
        icon: CreditCard,
        color: "indigo",
        latestUpdate: "Pre-GST Era",
        importance: "Low"
      },
      {
        id: 9,
        name: "Octroi Duty",
        description: "Tax on goods entering municipal limits",
        category: "indirect",
        type: "entry",
        rate: "Varied by municipality",
        applicable: "Transporters, Businesses",
        keyFeatures: ["Local tax", "Checkpost-based", "Mostly abolished"],
        icon: Truck,
        color: "brown",
        latestUpdate: "Historical",
        importance: "Low"
      },
      {
        id: 10,
        name: "Custom Duty",
        description: "Tax on imports and exports",
        category: "indirect",
        type: "trade",
        rate: "0% - 100%",
        applicable: "Importers, Exporters",
        keyFeatures: ["Protectionist measure", "WTO compliant", "AGOA benefits"],
        icon: Landmark,
        color: "teal",
        latestUpdate: "Budget 2024",
        importance: "High"
      },
      {
        id: 11,
        name: "Value Added Tax (VAT)",
        description: "Multi-stage tax on value addition (Replaced by GST)",
        category: "indirect",
        type: "consumption",
        rate: "5% - 20%",
        applicable: "Manufacturers, Retailers",
        keyFeatures: ["Input tax credit", "State-level", "Replaced by GST"],
        icon: Percent,
        color: "cyan",
        latestUpdate: "Pre-GST Era",
        importance: "Medium"
      },
      {
        id: 12,
        name: "Goods & Services Tax (GST)",
        description: "Comprehensive indirect tax on goods and services",
        category: "indirect",
        type: "consumption",
        rate: "0%, 5%, 12%, 18%, 28%",
        applicable: "All businesses",
        keyFeatures: ["One Nation One Tax", "Input tax credit", "Dual structure (CGST/SGST)"],
        icon: Briefcase,
        color: "emerald",
        latestUpdate: "Regular updates",
        importance: "Very High"
      }
    ],
    other: [
      {
        id: 13,
        name: "Property Tax",
        description: "Municipal tax on property ownership",
        category: "other",
        type: "property",
        rate: "Varies by municipality",
        applicable: "Property owners",
        keyFeatures: ["Annual levy", "Based on property value", "Local civic services"],
        icon: Home,
        color: "slate",
        latestUpdate: "Annual revisions",
        importance: "Medium"
      },
      {
        id: 14,
        name: "Registration Fees",
        description: "Fees for legal registration of documents",
        category: "other",
        type: "fees",
        rate: "Fixed percentage",
        applicable: "Property buyers, Businesses",
        keyFeatures: ["Stamp duty related", "State-specific", "Mandatory for registration"],
        icon: FileText,
        color: "gray",
        latestUpdate: "State-specific",
        importance: "Medium"
      },
      {
        id: 15,
        name: "Toll Tax",
        description: "Tax for using roads and bridges",
        category: "other",
        type: "usage",
        rate: "Fixed amount",
        applicable: "Vehicle owners",
        keyFeatures: ["User-pay principle", "Infrastructure funding", "Time-based passes"],
        icon: Truck,
        color: "amber",
        latestUpdate: "Regular revisions",
        importance: "Low"
      },
      {
        id: 16,
        name: "Education Cess",
        description: "Additional tax for education funding",
        category: "other",
        type: "cess",
        rate: "2% + 1%",
        applicable: "All taxpayers",
        keyFeatures: ["Primary & Higher education", "Applied on income tax", "Mandatory levy"],
        icon: GraduationCap,
        color: "blue",
        latestUpdate: "Budget 2024",
        importance: "High"
      },
      {
        id: 17,
        name: "Entertainment Tax",
        description: "Tax on entertainment activities",
        category: "other",
        type: "entertainment",
        rate: "Varies by state",
        applicable: "Cinemas, Events, OTT platforms",
        keyFeatures: ["State-specific", "Digital services included", "Cultural promotion"],
        icon: Film,
        color: "purple",
        latestUpdate: "State-specific",
        importance: "Medium"
      },
      {
        id: 18,
        name: "Professional Tax",
        description: "Tax on professions and trades",
        category: "other",
        type: "professional",
        rate: "Fixed amount",
        applicable: "Professionals, Employees",
        keyFeatures: ["State-level", "Employer deduction", "Professional licenses"],
        icon: Briefcase,
        color: "indigo",
        latestUpdate: "State-specific",
        importance: "Medium"
      }
    ]
  }

  const allTaxes = [...taxData.direct, ...taxData.indirect, ...taxData.other]

  const filteredTaxes = allTaxes.filter(tax => {
    const matchesSearch = tax.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tax.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || tax.category === selectedCategory
    const matchesType = selectedType === "all" || tax.type === selectedType
    
    return matchesSearch && matchesCategory && matchesType
  })

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "Very High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "High": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

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
      case "pink": return {
        bg: "bg-pink-100",
        darkBg: "dark:bg-pink-900/20",
        text: "text-pink-600",
        darkText: "dark:text-pink-400"
      }
      case "yellow": return {
        bg: "bg-yellow-100",
        darkBg: "dark:bg-yellow-900/20",
        text: "text-yellow-600",
        darkText: "dark:text-yellow-400"
      }
      case "red": return {
        bg: "bg-red-100",
        darkBg: "dark:bg-red-900/20",
        text: "text-red-600",
        darkText: "dark:text-red-400"
      }
      case "indigo": return {
        bg: "bg-indigo-100",
        darkBg: "dark:bg-indigo-900/20",
        text: "text-indigo-600",
        darkText: "dark:text-indigo-400"
      }
      case "brown": return {
        bg: "bg-amber-100",
        darkBg: "dark:bg-amber-900/20",
        text: "text-amber-600",
        darkText: "dark:text-amber-400"
      }
      case "teal": return {
        bg: "bg-teal-100",
        darkBg: "dark:bg-teal-900/20",
        text: "text-teal-600",
        darkText: "dark:text-teal-400"
      }
      case "cyan": return {
        bg: "bg-cyan-100",
        darkBg: "dark:bg-cyan-900/20",
        text: "text-cyan-600",
        darkText: "dark:text-cyan-400"
      }
      case "emerald": return {
        bg: "bg-emerald-100",
        darkBg: "dark:bg-emerald-900/20",
        text: "text-emerald-600",
        darkText: "dark:text-emerald-400"
      }
      case "slate": return {
        bg: "bg-slate-100",
        darkBg: "dark:bg-slate-900/20",
        text: "text-slate-600",
        darkText: "dark:text-slate-400"
      }
      case "gray": return {
        bg: "bg-gray-100",
        darkBg: "dark:bg-gray-900/20",
        text: "text-gray-600",
        darkText: "dark:text-gray-400"
      }
      case "amber": return {
        bg: "bg-amber-100",
        darkBg: "dark:bg-amber-900/20",
        text: "text-amber-600",
        darkText: "dark:text-amber-400"
      }
      default: return {
        bg: "bg-gray-100",
        darkBg: "dark:bg-gray-900/20",
        text: "text-gray-600",
        darkText: "dark:text-gray-400"
      }
    }
  }

  const getTaxStats = () => {
    return {
      total: allTaxes.length,
      direct: taxData.direct.length,
      indirect: taxData.indirect.length,
      other: taxData.other.length,
      veryHighImportance: allTaxes.filter(t => t.importance === "Very High").length,
      highImportance: allTaxes.filter(t => t.importance === "High").length
    }
  }

  const stats = getTaxStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Indian Tax Information</h1>
          <p className="text-slate-600 dark:text-slate-400">Comprehensive guide to taxes in India</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Total Taxes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.direct}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Direct Taxes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.indirect}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Indirect Taxes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.other}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Other Taxes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.veryHighImportance}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Very High Impact</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.highImportance}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">High Impact</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search taxes..."
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
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="transaction">Transaction</SelectItem>
                <SelectItem value="gains">Capital Gains</SelectItem>
                <SelectItem value="gift">Gift</SelectItem>
                <SelectItem value="wealth">Wealth</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="consumption">Consumption</SelectItem>
                <SelectItem value="property">Property</SelectItem>
                <SelectItem value="fees">Fees</SelectItem>
                <SelectItem value="cess">Cess</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Taxes ({stats.total})</TabsTrigger>
          <TabsTrigger value="direct">Direct ({stats.direct})</TabsTrigger>
          <TabsTrigger value="indirect">Indirect ({stats.indirect})</TabsTrigger>
          <TabsTrigger value="other">Other ({stats.other})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTaxes.map((tax) => {
              const colorClasses = getColorClasses(tax.color);
              return (
                <Card key={tax.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 ${colorClasses.bg} ${colorClasses.darkBg} rounded-lg flex items-center justify-center`}>
                        <div className={`${colorClasses.text} ${colorClasses.darkText}`}>
                          {tax.icon && <tax.icon className="h-6 w-6" />}
                        </div>
                      </div>
                      <Badge className={getImportanceColor(tax.importance)}>
                        {tax.importance}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{tax.name}</CardTitle>
                    <CardDescription className="text-sm">{tax.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Tax Rate</span>
                        <Badge variant="outline">{tax.rate}</Badge>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Applicable to:</span>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {tax.applicable}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm font-medium">Key Features:</span>
                        <ul className="text-xs text-slate-600 dark:text-slate-400 mt-1 space-y-1">
                          {tax.keyFeatures.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span className="text-blue-600">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-slate-500">{tax.latestUpdate}</span>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Learn More <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="direct" className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">Direct Taxes</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Taxes paid directly to the government by individuals and organizations
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Progressive:</span>
                <p className="text-blue-700 dark:text-blue-300">Based on ability to pay</p>
              </div>
              <div>
                <span className="font-medium">Direct Impact:</span>
                <p className="text-blue-700 dark:text-blue-300">Immediate tax burden</p>
              </div>
              <div>
                <span className="font-medium">Revenue Source:</span>
                <p className="text-blue-700 dark:text-blue-300">Major government revenue</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxData.direct.map((tax) => (
              <Card key={tax.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${getColorClasses(tax.color).bg} ${getColorClasses(tax.color).darkBg} rounded-lg flex items-center justify-center`}>
                      <div className={`${getColorClasses(tax.color).text} ${getColorClasses(tax.color).darkText}`}>
                        {tax.icon && <tax.icon className="h-6 w-6" />}
                      </div>
                    </div>
                    <Badge className={getImportanceColor(tax.importance)}>
                      {tax.importance}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{tax.name}</CardTitle>
                  <CardDescription className="text-sm">{tax.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Tax Rate</span>
                      <Badge variant="outline">{tax.rate}</Badge>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium">Applicable to:</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {tax.applicable}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-slate-500">{tax.latestUpdate}</span>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Learn More <ArrowUpRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="indirect" className="space-y-6">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">Indirect Taxes</h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Taxes collected by intermediaries from consumers and paid to government
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Regressive:</span>
                <p className="text-purple-700 dark:text-purple-300">Same rate for all</p>
              </div>
              <div>
                <span className="font-medium">Hidden Impact:</span>
                <p className="text-purple-700 dark:text-purple-300">Included in prices</p>
              </div>
              <div>
                <span className="font-medium">Consumption-based:</span>
                <p className="text-purple-700 dark:text-purple-300">Based on spending</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxData.indirect.map((tax) => (
              <Card key={tax.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${getColorClasses(tax.color).bg} ${getColorClasses(tax.color).darkBg} rounded-lg flex items-center justify-center`}>
                      <div className={`${getColorClasses(tax.color).text} ${getColorClasses(tax.color).darkText}`}>
                        {tax.icon && <tax.icon className="h-6 w-6" />}
                      </div>
                    </div>
                    <Badge className={getImportanceColor(tax.importance)}>
                      {tax.importance}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{tax.name}</CardTitle>
                  <CardDescription className="text-sm">{tax.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Tax Rate</span>
                      <Badge variant="outline">{tax.rate}</Badge>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium">Applicable to:</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {tax.applicable}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-slate-500">{tax.latestUpdate}</span>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Learn More <ArrowUpRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="other" className="space-y-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100">Other Taxes & Levies</h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Additional taxes, fees, and levies imposed by various authorities
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Local Authority:</span>
                <p className="text-green-700 dark:text-green-300">Municipal & state level</p>
              </div>
              <div>
                <span className="font-medium">Specific Purpose:</span>
                <p className="text-green-700 dark:text-green-300">Targeted funding</p>
              </div>
              <div>
                <span className="font-medium">Service-linked:</span>
                <p className="text-green-700 dark:text-green-300">User pays principle</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxData.other.map((tax) => (
              <Card key={tax.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${getColorClasses(tax.color).bg} ${getColorClasses(tax.color).darkBg} rounded-lg flex items-center justify-center`}>
                      <div className={`${getColorClasses(tax.color).text} ${getColorClasses(tax.color).darkText}`}>
                        {tax.icon && <tax.icon className="h-6 w-6" />}
                      </div>
                    </div>
                    <Badge className={getImportanceColor(tax.importance)}>
                      {tax.importance}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{tax.name}</CardTitle>
                  <CardDescription className="text-sm">{tax.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Rate/Fee</span>
                      <Badge variant="outline">{tax.rate}</Badge>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium">Applicable to:</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {tax.applicable}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-slate-500">{tax.latestUpdate}</span>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Learn More <ArrowUpRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Tax Calculator Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Quick Tax Calculators
          </CardTitle>
          <CardDescription>
            Access specialized tax calculators for different tax types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <Calculator className="h-6 w-6" />
              <span className="text-sm">Income Tax</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Capital Gains</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <Percent className="h-6 w-6" />
              <span className="text-sm">GST Calculator</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <Home className="h-6 w-6" />
              <span className="text-sm">Property Tax</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}