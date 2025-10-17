"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Car, 
  Droplets, 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  MapPin,
  Plus,
  Eye,
  Edit,
  Trash2,
  Info,
  DollarSign
} from "lucide-react"

interface FuelCalculatorProps {
  onBack: () => void
  userId: string
}

interface FuelEntry {
  id: string
  fuelType: string
  quantity: number
  amount: number
  taxAmount: number
  pricePerLiter: number
  city: string
  state: string
  date: string
}

interface CityFuelPrice {
  city: string
  state: string
  petrolPrice: number
  dieselPrice: number
  petrolTax: number
  dieselTax: number
  petrolTaxPercentage: number
  dieselTaxPercentage: number
}

const cityFuelPrices: CityFuelPrice[] = [
  {
    city: "Mumbai",
    state: "Maharashtra",
    petrolPrice: 106.31,
    dieselPrice: 94.27,
    petrolTax: 32.50,
    dieselTax: 21.50,
    petrolTaxPercentage: 30.6,
    dieselTaxPercentage: 22.8
  },
  {
    city: "Delhi",
    state: "Delhi",
    petrolPrice: 96.72,
    dieselPrice: 89.62,
    petrolTax: 28.50,
    dieselTax: 18.50,
    petrolTaxPercentage: 29.5,
    dieselTaxPercentage: 20.6
  },
  {
    city: "Bangalore",
    state: "Karnataka",
    petrolPrice: 101.94,
    dieselPrice: 87.89,
    petrolTax: 30.20,
    dieselTax: 19.80,
    petrolTaxPercentage: 29.6,
    dieselTaxPercentage: 22.5
  },
  {
    city: "Chennai",
    state: "Tamil Nadu",
    petrolPrice: 102.63,
    dieselPrice: 94.24,
    petrolTax: 31.00,
    dieselTax: 20.50,
    petrolTaxPercentage: 30.2,
    dieselTaxPercentage: 21.8
  },
  {
    city: "Kolkata",
    state: "West Bengal",
    petrolPrice: 104.95,
    dieselPrice: 91.76,
    petrolTax: 32.00,
    dieselTax: 21.00,
    petrolTaxPercentage: 30.5,
    dieselTaxPercentage: 22.9
  }
]

export default function FuelCalculator({ onBack, userId }: FuelCalculatorProps) {
  const [activeTab, setActiveTab] = useState("calculator")
  const [selectedCity, setSelectedCity] = useState<CityFuelPrice>(cityFuelPrices[0])
  const [fuelType, setFuelType] = useState("PETROL")
  const [quantity, setQuantity] = useState("")
  const [fuelEntries, setFuelEntries] = useState<FuelEntry[]>([
    {
      id: "1",
      fuelType: "PETROL",
      quantity: 25,
      amount: 2657.75,
      taxAmount: 812.50,
      pricePerLiter: 106.31,
      city: "Mumbai",
      state: "Maharashtra",
      date: "2024-06-15"
    },
    {
      id: "2",
      fuelType: "DIESEL",
      quantity: 30,
      amount: 2828.10,
      taxAmount: 645.00,
      pricePerLiter: 94.27,
      city: "Mumbai",
      state: "Maharashtra",
      date: "2024-06-10"
    }
  ])

  const totalFuelTax = fuelEntries.reduce((sum, entry) => sum + entry.taxAmount, 0)
  const totalFuelAmount = fuelEntries.reduce((sum, entry) => sum + entry.amount, 0)
  const totalQuantity = fuelEntries.reduce((sum, entry) => sum + entry.quantity, 0)

  const calculateTax = () => {
    if (!quantity || !selectedCity) return null
    
    const qty = parseFloat(quantity)
    const price = fuelType === "PETROL" ? selectedCity.petrolPrice : selectedCity.dieselPrice
    const tax = fuelType === "PETROL" ? selectedCity.petrolTax : selectedCity.dieselTax
    
    return {
      quantity: qty,
      amount: qty * price,
      taxAmount: qty * tax,
      pricePerLiter: price,
      taxPerLiter: tax
    }
  }

  const handleAddEntry = () => {
    const calculation = calculateTax()
    if (calculation) {
      const entry: FuelEntry = {
        id: Date.now().toString(),
        fuelType,
        quantity: calculation.quantity,
        amount: calculation.amount,
        taxAmount: calculation.taxAmount,
        pricePerLiter: calculation.pricePerLiter,
        city: selectedCity.city,
        state: selectedCity.state,
        date: new Date().toISOString().split('T')[0]
      }
      setFuelEntries([...fuelEntries, entry])
      setQuantity("")
    }
  }

  const getFuelTypeIcon = (type: string) => {
    return type === "PETROL" ? <Droplets className="h-4 w-4" /> : <Car className="h-4 w-4" />
  }

  const getFuelTypeColor = (type: string) => {
    return type === "PETROL" ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Fuel & Excise Calculator</h2>
          <p className="text-slate-600 dark:text-slate-400">Calculate fuel taxes with city-wise prices</p>
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
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Fuel Tax</p>
                <p className="text-2xl font-bold">₹{totalFuelTax.toLocaleString()}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">on {totalQuantity} liters</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-2">
                <DollarSign className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Spent</p>
                <p className="text-2xl font-bold">₹{totalFuelAmount.toLocaleString()}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {((totalFuelTax / totalFuelAmount) * 100).toFixed(1)}% tax
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-2">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Entries</p>
                <p className="text-2xl font-bold">{fuelEntries.length}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">fuel purchases</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-2">
                <Car className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="prices">City Prices</TabsTrigger>
          <TabsTrigger value="entries">Entries</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fuel Calculator</CardTitle>
                <CardDescription>Calculate fuel tax for your purchase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Select City</Label>
                  <Select 
                    value={selectedCity.city} 
                    onValueChange={(value) => {
                      const city = cityFuelPrices.find(c => c.city === value)
                      if (city) setSelectedCity(city)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cityFuelPrices.map((city) => (
                        <SelectItem key={city.city} value={city.city}>
                          {city.city}, {city.state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select 
                    value={fuelType} 
                    onValueChange={setFuelType}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PETROL">Petrol</SelectItem>
                      <SelectItem value="DIESEL">Diesel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (in liters)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="25"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Current {fuelType.toLowerCase()} price in {selectedCity.city}: ₹{fuelType === "PETROL" ? selectedCity.petrolPrice : selectedCity.dieselPrice}/liter
                  </AlertDescription>
                </Alert>

                <Button onClick={handleAddEntry} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Fuel Entry
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tax Breakdown</CardTitle>
                <CardDescription>See how much tax you're paying</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quantity && (
                  <>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Base Price</span>
                        <span className="text-sm">
                          ₹{(fuelType === "PETROL" ? selectedCity.petrolPrice - selectedCity.petrolTax : selectedCity.dieselPrice - selectedCity.dieselTax).toFixed(2)}/liter
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Tax Amount</span>
                        <span className="text-sm">
                          ₹{(fuelType === "PETROL" ? selectedCity.petrolTax : selectedCity.dieselTax).toFixed(2)}/liter
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Price</span>
                        <span className="text-sm font-medium">
                          ₹{(fuelType === "PETROL" ? selectedCity.petrolPrice : selectedCity.dieselPrice).toFixed(2)}/liter
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Tax Percentage</span>
                          <span className="text-sm font-medium">
                            {fuelType === "PETROL" ? selectedCity.petrolTaxPercentage : selectedCity.dieselTaxPercentage}%
                          </span>
                        </div>
                        {quantity && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Total Amount</span>
                              <span className="text-sm font-medium">
                                ₹{(parseFloat(quantity) * (fuelType === "PETROL" ? selectedCity.petrolPrice : selectedCity.dieselPrice)).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Total Tax</span>
                              <span className="text-sm font-medium text-red-600">
                                ₹{(parseFloat(quantity) * (fuelType === "PETROL" ? selectedCity.petrolTax : selectedCity.dieselTax)).toFixed(2)}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="prices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">City-wise Fuel Prices</CardTitle>
              <CardDescription>Current fuel prices and tax breakdown across major cities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cityFuelPrices.map((city, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-600" />
                        <span className="font-semibold">{city.city}, {city.state}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-orange-600" />
                          <span className="font-medium">Petrol</span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Price:</span>
                            <span>₹{city.petrolPrice}/liter</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax:</span>
                            <span>₹{city.petrolTax}/liter</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax %:</span>
                            <span>{city.petrolTaxPercentage}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Diesel</span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Price:</span>
                            <span>₹{city.dieselPrice}/liter</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax:</span>
                            <span>₹{city.dieselTax}/liter</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax %:</span>
                            <span>{city.dieselTaxPercentage}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fuel Entries</CardTitle>
              <CardDescription>Your fuel purchase history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fuelEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getFuelTypeColor(entry.fuelType)}`}>
                        {getFuelTypeIcon(entry.fuelType)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{entry.quantity} liters {entry.fuelType.toLowerCase()}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {entry.city}, {entry.state} • {entry.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">₹{entry.amount.toLocaleString()}</div>
                      <div className="text-xs text-red-600">₹{entry.taxAmount.toLocaleString()} tax</div>
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
                <CardTitle className="text-lg">Fuel Type Analysis</CardTitle>
                <CardDescription>Your fuel consumption by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    fuelEntries.reduce((acc, entry) => {
                      acc[entry.fuelType] = (acc[entry.fuelType] || 0) + entry.quantity
                      return acc
                    }, {} as Record<string, number>)
                  ).map(([type, quantity]) => (
                    <div key={type} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {getFuelTypeIcon(type)}
                        <span className="text-sm font-medium">{type.toLowerCase()}</span>
                      </div>
                      <span className="text-sm">{quantity} liters</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tax Efficiency</CardTitle>
                <CardDescription>How much tax you're paying on fuel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {((totalFuelTax / totalFuelAmount) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      of your fuel spending is tax
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Did you know?</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Fuel taxes in India include central excise duty, state VAT, and other cesses. 
                      These taxes contribute significantly to government revenue for infrastructure development.
                    </p>
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