"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building, 
  Car, 
  Home, 
  Calculator, 
  TrendingUp, 
  MapPin,
  Plus,
  Eye,
  Edit,
  Trash2,
  Info,
  Calendar,
  FileText
} from "lucide-react"

interface PropertyTrackerProps {
  onBack: () => void
  userId: string
}

interface PropertyEntry {
  id: string
  propertyType: string
  taxType: string
  amount: number
  propertyAddress?: string
  propertyCity?: string
  propertyState?: string
  vehicleType?: string
  vehicleNumber?: string
  date: string
  isVerified: boolean
  verificationStatus: string
}

const propertyTypes = [
  { value: "RESIDENTIAL", label: "Residential Property" },
  { value: "COMMERCIAL", label: "Commercial Property" },
  { value: "LAND", label: "Land" },
  { value: "VEHICLE", label: "Vehicle" }
]

const taxTypes = [
  { value: "PROPERTY_TAX", label: "Property Tax" },
  { value: "MUNICIPAL_TAX", label: "Municipal Tax" },
  { value: "ROAD_TAX", label: "Road Tax" },
  { value: "STAMP_DUTY", label: "Stamp Duty" },
  { value: "REGISTRATION_FEE", label: "Registration Fee" }
]

const vehicleTypes = [
  { value: "CAR", label: "Car" },
  { value: "BIKE", label: "Motorcycle" },
  { value: "TRUCK", label: "Truck" },
  { value: "AUTO", label: "Auto Rickshaw" }
]

export default function PropertyTracker({ onBack, userId }: PropertyTrackerProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [propertyEntries, setPropertyEntries] = useState<PropertyEntry[]>([
    {
      id: "1",
      propertyType: "RESIDENTIAL",
      taxType: "PROPERTY_TAX",
      amount: 5000,
      propertyAddress: "123 Main Street, Apartment 4B",
      propertyCity: "Mumbai",
      propertyState: "Maharashtra",
      date: "2024-06-15",
      isVerified: true,
      verificationStatus: "VERIFIED"
    },
    {
      id: "2",
      propertyType: "VEHICLE",
      taxType: "ROAD_TAX",
      amount: 2500,
      vehicleType: "CAR",
      vehicleNumber: "MH01AB1234",
      date: "2024-06-10",
      isVerified: true,
      verificationStatus: "VERIFIED"
    },
    {
      id: "3",
      propertyType: "RESIDENTIAL",
      taxType: "STAMP_DUTY",
      amount: 50000,
      propertyAddress: "456 Park Avenue",
      propertyCity: "Mumbai",
      propertyState: "Maharashtra",
      date: "2024-05-20",
      isVerified: false,
      verificationStatus: "PENDING"
    }
  ])

  const [manualEntry, setManualEntry] = useState({
    propertyType: "",
    taxType: "",
    amount: "",
    propertyAddress: "",
    propertyCity: "",
    propertyState: "",
    vehicleType: "",
    vehicleNumber: "",
    date: ""
  })

  const totalPropertyTax = propertyEntries.reduce((sum, entry) => sum + entry.amount, 0)
  const verifiedTax = propertyEntries.filter(entry => entry.isVerified).reduce((sum, entry) => sum + entry.amount, 0)
  const pendingTax = propertyEntries.filter(entry => !entry.isVerified).reduce((sum, entry) => sum + entry.amount, 0)

  const handleAddManualEntry = () => {
    if (manualEntry.propertyType && manualEntry.taxType && manualEntry.amount) {
      const entry: PropertyEntry = {
        id: Date.now().toString(),
        propertyType: manualEntry.propertyType,
        taxType: manualEntry.taxType,
        amount: parseFloat(manualEntry.amount),
        propertyAddress: manualEntry.propertyAddress || undefined,
        propertyCity: manualEntry.propertyCity || undefined,
        propertyState: manualEntry.propertyState || undefined,
        vehicleType: manualEntry.vehicleType || undefined,
        vehicleNumber: manualEntry.vehicleNumber || undefined,
        date: manualEntry.date || new Date().toISOString().split('T')[0],
        isVerified: false,
        verificationStatus: "PENDING"
      }
      setPropertyEntries([...propertyEntries, entry])
      setManualEntry({
        propertyType: "",
        taxType: "",
        amount: "",
        propertyAddress: "",
        propertyCity: "",
        propertyState: "",
        vehicleType: "",
        vehicleNumber: "",
        date: ""
      })
    }
  }

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case "RESIDENTIAL":
      case "COMMERCIAL":
        return <Home className="h-4 w-4" />
      case "LAND":
        return <MapPin className="h-4 w-4" />
      case "VEHICLE":
        return <Car className="h-4 w-4" />
      default:
        return <Building className="h-4 w-4" />
    }
  }

  const getPropertyTypeColor = (type: string) => {
    switch (type) {
      case "RESIDENTIAL":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "COMMERCIAL":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "LAND":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "VEHICLE":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200"
    }
  }

  const getTaxTypeLabel = (type: string) => {
    const taxType = taxTypes.find(t => t.value === type)
    return taxType ? taxType.label : type
  }

  const getPropertyTypeLabel = (type: string) => {
    const propType = propertyTypes.find(t => t.value === type)
    return propType ? propType.label : type
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          Verified
        </Badge>
      case "REJECTED":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          Rejected
        </Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          Pending
        </Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Property & Local Levies</h2>
          <p className="text-slate-600 dark:text-slate-400">Track property taxes and local government levies</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Property Tax</p>
                <p className="text-2xl font-bold">₹{totalPropertyTax.toLocaleString()}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{propertyEntries.length} entries</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-2">
                <Building className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Verified Tax</p>
                <p className="text-2xl font-bold">₹{verifiedTax.toLocaleString()}</p>
                <Progress value={(verifiedTax / totalPropertyTax) * 100} className="mt-2" />
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-2">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Pending Verification</p>
                <p className="text-2xl font-bold">₹{pendingTax.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded-full p-2">
                <Calendar className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="add">Add Entry</TabsTrigger>
          <TabsTrigger value="entries">Entries</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Property Types</CardTitle>
                <CardDescription>Breakdown by property type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(
                    propertyEntries.reduce((acc, entry) => {
                      acc[entry.propertyType] = (acc[entry.propertyType] || 0) + entry.amount
                      return acc
                    }, {} as Record<string, number>)
                  ).map(([type, amount]) => (
                    <div key={type} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {getPropertyTypeIcon(type)}
                        <span className="text-sm font-medium">{getPropertyTypeLabel(type)}</span>
                      </div>
                      <span className="text-sm">₹{amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tax Types</CardTitle>
                <CardDescription>Breakdown by tax type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(
                    propertyEntries.reduce((acc, entry) => {
                      acc[entry.taxType] = (acc[entry.taxType] || 0) + entry.amount
                      return acc
                    }, {} as Record<string, number>)
                  ).map(([type, amount]) => (
                    <div key={type} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{getTaxTypeLabel(type)}</span>
                      <span className="text-sm">₹{amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Common property tax tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button className="h-16 flex-col gap-1" onClick={() => setActiveTab("add")}>
                <Plus className="h-5 w-5" />
                <span className="text-xs">Add Property Tax</span>
              </Button>
              <Button className="h-16 flex-col gap-1" variant="outline">
                <Car className="h-5 w-5" />
                <span className="text-xs">Add Vehicle Tax</span>
              </Button>
              <Button className="h-16 flex-col gap-1" variant="outline">
                <FileText className="h-5 w-5" />
                <span className="text-xs">Stamp Duty</span>
              </Button>
              <Button className="h-16 flex-col gap-1" variant="outline">
                <Calculator className="h-5 w-5" />
                <span className="text-xs">Calculate Tax</span>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Property Tax Entry</CardTitle>
              <CardDescription>Enter property tax details manually</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select 
                    value={manualEntry.propertyType} 
                    onValueChange={(value) => setManualEntry({...manualEntry, propertyType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxType">Tax Type</Label>
                  <Select 
                    value={manualEntry.taxType} 
                    onValueChange={(value) => setManualEntry({...manualEntry, taxType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tax type" />
                    </SelectTrigger>
                    <SelectContent>
                      {taxTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="5000"
                    value={manualEntry.amount}
                    onChange={(e) => setManualEntry({...manualEntry, amount: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={manualEntry.date}
                    onChange={(e) => setManualEntry({...manualEntry, date: e.target.value})}
                  />
                </div>
              </div>

              {manualEntry.propertyType === "VEHICLE" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Select 
                      value={manualEntry.vehicleType} 
                      onValueChange={(value) => setManualEntry({...manualEntry, vehicleType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                    <Input
                      id="vehicleNumber"
                      placeholder="MH01AB1234"
                      value={manualEntry.vehicleNumber}
                      onChange={(e) => setManualEntry({...manualEntry, vehicleNumber: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {(manualEntry.propertyType === "RESIDENTIAL" || manualEntry.propertyType === "COMMERCIAL" || manualEntry.propertyType === "LAND") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyAddress">Property Address</Label>
                    <Textarea
                      id="propertyAddress"
                      placeholder="123 Main Street, Apartment 4B"
                      value={manualEntry.propertyAddress}
                      onChange={(e) => setManualEntry({...manualEntry, propertyAddress: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyCity">City</Label>
                    <Input
                      id="propertyCity"
                      placeholder="Mumbai"
                      value={manualEntry.propertyCity}
                      onChange={(e) => setManualEntry({...manualEntry, propertyCity: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyState">State</Label>
                    <Input
                      id="propertyState"
                      placeholder="Maharashtra"
                      value={manualEntry.propertyState}
                      onChange={(e) => setManualEntry({...manualEntry, propertyState: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Keep your property tax receipts safe for future reference and tax filing. 
                  Property taxes paid are eligible for deduction under Section 24 of the Income Tax Act.
                </AlertDescription>
              </Alert>

              <Button onClick={handleAddManualEntry} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Property Entry
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Property Entries</CardTitle>
              <CardDescription>All your property tax entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {propertyEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getPropertyTypeColor(entry.propertyType)}`}>
                        {getPropertyTypeIcon(entry.propertyType)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{getTaxTypeLabel(entry.taxType)}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {getPropertyTypeLabel(entry.propertyType)}
                          {entry.propertyAddress && ` • ${entry.propertyAddress}`}
                          {entry.vehicleNumber && ` • ${entry.vehicleNumber}`}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {entry.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="font-medium text-sm">₹{entry.amount.toLocaleString()}</div>
                      </div>
                      {getVerificationBadge(entry.verificationStatus)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tax Efficiency</CardTitle>
                <CardDescription>Your property tax contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {propertyEntries.length}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      property tax payments tracked
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Tax Benefits</h4>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Home loan interest deduction (Section 24)</li>
                      <li>• Property tax deduction (Section 24)</li>
                      <li>• Stamp duty deduction (Section 80C)</li>
                      <li>• Municipal tax deduction</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Timeline</CardTitle>
                <CardDescription>Your property tax payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">This Year</span>
                    <span className="text-sm">₹{propertyEntries.filter(e => e.date.startsWith('2024')).reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Year</span>
                    <span className="text-sm">₹{propertyEntries.filter(e => e.date.startsWith('2023')).reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Payment</span>
                    <span className="text-sm">₹{Math.round(totalPropertyTax / propertyEntries.length).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}