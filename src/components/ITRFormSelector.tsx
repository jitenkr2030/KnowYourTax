"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Building, 
  TrendingUp, 
  Home as HomeIcon,
  Briefcase,
  GraduationCap,
  Heart,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Info
} from "lucide-react"

interface ITRForm {
  id: string
  name: string
  description: string
  eligibility: string[]
  features: string[]
  icon: React.ComponentType<any>
  color: string
}

interface IncomeSource {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
}

const itrForms: ITRForm[] = [
  {
    id: "itr1",
    name: "ITR-1 (Sahaj)",
    description: "For individuals with salary, pension, or interest income",
    eligibility: [
      "Resident individuals",
      "Total income up to ₹50 lakh",
      "Income from salary/pension",
      "Income from one house property",
      "Income from other sources (excluding lottery)",
      "Agricultural income up to ₹5,000"
    ],
    features: [
      "Simple and easy to file",
      "Suitable for salaried employees",
      "Supports pension income",
      "House property income",
      "Interest income"
    ],
    icon: Users,
    color: "bg-blue-500"
  },
  {
    id: "itr2",
    name: "ITR-2",
    description: "For individuals and HUFs not having income from business/profession",
    eligibility: [
      "Resident individuals/HUFs",
      "No income from business/profession",
      "Capital gains income",
      "Foreign assets/income",
      "Agricultural income above ₹5,000"
    ],
    features: [
      "Capital gains reporting",
      "Foreign income disclosure",
      "Multiple house properties",
      "Agricultural income above ₹5,000",
      "Director in a company"
    ],
    icon: TrendingUp,
    color: "bg-green-500"
  },
  {
    id: "itr3",
    name: "ITR-3",
    description: "For individuals and HUFs having income from business/profession",
    eligibility: [
      "Individuals/HUFs",
      "Income from business/profession",
      "Presumptive taxation (Section 44AD, 44AE)",
      "Partnership firm income"
    ],
    features: [
      "Business income reporting",
      "Balance sheet & P&L",
      "Presumptive taxation",
      "Partnership firm details",
      "Business assets"
    ],
    icon: Briefcase,
    color: "bg-purple-500"
  },
  {
    id: "itr4",
    name: "ITR-4 (Sugam)",
    description: "For individuals, HUFs and firms with presumptive income",
    eligibility: [
      "Resident individuals/HUFs/firms",
      "Presumptive business income (Section 44AD, 44ADA, 44AE)",
      "Total income up to ₹50 lakh"
    ],
    features: [
      "Simplified business filing",
      "Presumptive taxation",
      "No balance sheet required",
      "Easy for small businesses",
      "Lower compliance burden"
    ],
    icon: FileText,
    color: "bg-orange-500"
  },
  {
    id: "itr5",
    name: "ITR-5",
    description: "For firms, AOPs, BOIs (not individuals)",
    eligibility: [
      "Firms",
      "Association of Persons (AOP)",
      "Body of Individuals (BOI)",
      "LLPs",
      "Co-operative societies"
    ],
    features: [
      "Business entity filing",
      "Partnership details",
      "LLP compliance",
      "AOP/BOI reporting",
      "Co-operative society"
    ],
    icon: Building,
    color: "bg-red-500"
  },
  {
    id: "itr6",
    name: "ITR-6",
    description: "For companies other than those claiming exemption under Section 11",
    eligibility: [
      "Companies (except Section 11)",
      "Domestic companies",
      "Foreign companies",
      "Not claiming exemption under Section 11"
    ],
    features: [
      "Company compliance",
      "Foreign company reporting",
      "MAT calculation",
      "Corporate tax",
      "Dividend distribution tax"
    ],
    icon: Building,
    color: "bg-indigo-500"
  },
  {
    id: "itr7",
    name: "ITR-7",
    description: "For persons including companies required to furnish return under Section 139(4A)",
    eligibility: [
      "Trusts",
      "Political parties",
      "Educational institutions",
      "Hospitals",
      "Section 139(4A) filing"
    ],
    features: [
      "Trust compliance",
      "Political party filing",
      "Educational institution",
      "Hospital/medical institution",
      "Charitable organization"
    ],
    icon: Heart,
    color: "bg-pink-500"
  }
]

const incomeSources: IncomeSource[] = [
  {
    id: "salary",
    name: "Salary/Pension",
    description: "Income from employment or pension",
    icon: Users
  },
  {
    id: "house-property",
    name: "House Property",
    description: "Income from rented or self-occupied property",
    icon: HomeIcon
  },
  {
    id: "business",
    name: "Business/Profession",
    description: "Income from business activities or profession",
    icon: Briefcase
  },
  {
    id: "capital-gains",
    name: "Capital Gains",
    description: "Income from sale of assets like shares, property",
    icon: TrendingUp
  },
  {
    id: "other-sources",
    name: "Other Sources",
    description: "Interest, dividends, lottery winnings, etc.",
    icon: FileText
  },
  {
    id: "agriculture",
    name: "Agricultural Income",
    description: "Income from agricultural activities",
    icon: GraduationCap
  }
]

interface ITRFormSelectorProps {
  onFormSelect: (formId: string) => void
  onBack: () => void
  userId: string
}

export default function ITRFormSelector({ onFormSelect, onBack, userId }: ITRFormSelectorProps) {
  const [selectedStep, setSelectedStep] = useState(1)
  const [selectedIncomeSources, setSelectedIncomeSources] = useState<string[]>([])
  const [annualIncome, setAnnualIncome] = useState<string>("")
  const [isResident, setIsResident] = useState<string>("yes")
  const [hasBusinessIncome, setHasBusinessIncome] = useState<string>("no")
  const [recommendedForm, setRecommendedForm] = useState<string>("")
  const [showRecommendation, setShowRecommendation] = useState(false)

  const handleIncomeSourceToggle = (sourceId: string) => {
    setSelectedIncomeSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    )
  }

  const calculateRecommendedForm = () => {
    let form = "itr1" // Default

    // Business income logic
    if (hasBusinessIncome === "yes") {
      if (annualIncome && parseInt(annualIncome) <= 5000000) {
        form = "itr4" // Sugam for presumptive
      } else {
        form = "itr3" // Regular business
      }
    }
    // Capital gains or foreign income
    else if (selectedIncomeSources.includes("capital-gains")) {
      form = "itr2"
    }
    // Only salary and basic income
    else if (selectedIncomeSources.includes("salary") && 
             selectedIncomeSources.length <= 3 &&
             annualIncome && parseInt(annualIncome) <= 5000000) {
      form = "itr1"
    }
    // Complex cases
    else {
      form = "itr2"
    }

    setRecommendedForm(form)
    setShowRecommendation(true)
  }

  const handleContinue = () => {
    if (selectedStep === 1) {
      setSelectedStep(2)
    } else if (selectedStep === 2) {
      calculateRecommendedForm()
      setSelectedStep(3)
    } else if (selectedStep === 3) {
      onFormSelect(recommendedForm)
    }
  }

  const handleBack = () => {
    if (selectedStep === 1) {
      onBack()
    } else {
      setSelectedStep(prev => prev - 1)
    }
  }

  const getProgress = () => {
    return (selectedStep / 3) * 100
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">ITR Form Selection Wizard</h1>
        <p className="text-gray-600">Let us help you choose the right Income Tax Return form</p>
        <div className="w-full max-w-md mx-auto">
          <Progress value={getProgress()} className="h-2" />
          <p className="text-sm text-gray-500 mt-1">Step {selectedStep} of 3</p>
        </div>
      </div>

      {/* Step 1: Income Sources */}
      {selectedStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Select Your Income Sources</span>
            </CardTitle>
            <CardDescription>
              Choose all sources of income you had during the financial year
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {incomeSources.map((source) => (
                <div
                  key={source.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedIncomeSources.includes(source.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleIncomeSourceToggle(source.id)}
                >
                  <div className="flex items-start space-x-3">
                    <source.icon className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium">{source.name}</h3>
                      <p className="text-sm text-gray-600">{source.description}</p>
                    </div>
                    {selectedIncomeSources.includes(source.id) && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Estimated Annual Income</Label>
                <select
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select income range</option>
                  <option value="2500000">Up to ₹25 Lakh</option>
                  <option value="5000000">₹25 Lakh - ₹50 Lakh</option>
                  <option value="10000000">₹50 Lakh - ₹1 Crore</option>
                  <option value="50000000">Above ₹1 Crore</option>
                </select>
              </div>

              <div>
                <Label className="text-sm font-medium">Residential Status</Label>
                <RadioGroup value={isResident} onValueChange={setIsResident} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="resident-yes" />
                    <Label htmlFor="resident-yes">Resident Indian</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="resident-no" />
                    <Label htmlFor="resident-no">Non-Resident Indian</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Business Income */}
      {selectedStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Business Income Details</span>
            </CardTitle>
            <CardDescription>
              Help us understand if you have business or professional income
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium">Do you have income from business or profession?</Label>
              <RadioGroup value={hasBusinessIncome} onValueChange={setHasBusinessIncome} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="business-yes" />
                  <Label htmlFor="business-yes">Yes, I have business/professional income</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="business-no" />
                  <Label htmlFor="business-no">No, I don't have business/professional income</Label>
                </div>
              </RadioGroup>
            </div>

            {hasBusinessIncome === "yes" && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-900">Business Income Detected</h3>
                    <p className="text-sm text-blue-700">
                      Based on your business income, you'll need to file either ITR-3 (regular business) or ITR-4 (presumptive business).
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {itrForms.filter(form => form.id === "itr3" || form.id === "itr4").map((form) => (
                <div key={form.id} className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-8 h-8 ${form.color} rounded-full flex items-center justify-center`}>
                      <form.icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-medium">{form.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{form.description}</p>
                  <div className="space-y-1">
                    {form.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Recommendation */}
      {selectedStep === 3 && recommendedForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Recommended ITR Form</span>
            </CardTitle>
            <CardDescription>
              Based on your income sources and profile, we recommend the following form
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {(() => {
              const form = itrForms.find(f => f.id === recommendedForm)
              if (!form) return null

              return (
                <div className="space-y-4">
                  <div className="p-6 border-2 border-blue-200 rounded-lg bg-blue-50">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 ${form.color} rounded-full flex items-center justify-center`}>
                        <form.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{form.name}</h2>
                        <p className="text-gray-600">{form.description}</p>
                      </div>
                    </div>

                    <Tabs defaultValue="eligibility" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                        <TabsTrigger value="features">Features</TabsTrigger>
                      </TabsList>
                      <TabsContent value="eligibility" className="space-y-2">
                        {form.eligibility.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </TabsContent>
                      <TabsContent value="features" className="space-y-2">
                        {form.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-yellow-900">Important Note</h3>
                        <p className="text-sm text-yellow-700">
                          This is an automated recommendation. Please verify that all details are correct before proceeding. 
                          You can change the form type later if needed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {selectedStep === 1 ? "Back" : "Previous"}
        </Button>
        <Button onClick={handleContinue} disabled={selectedStep === 1 && selectedIncomeSources.length === 0}>
          {selectedStep === 3 ? "Start Filing" : "Continue"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}