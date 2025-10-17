"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  FileSignature,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Database,
  Calculator,
  Upload,
  ArrowRight,
  ArrowLeft,
  Info,
  FileText,
  TrendingUp,
  Shield,
  Building,
  Server
} from "lucide-react"

interface ReturnFilingWorkflowProps {
  onBack: () => void
  userId: string
}

interface FilingStep {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  status: "pending" | "in-progress" | "completed" | "skipped"
  component: React.ComponentType<any>
}

export default function ReturnFilingWorkflow({ onBack, userId }: ReturnFilingWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [filingData, setFilingData] = useState<any>({})
  const [selectedForm, setSelectedForm] = useState<string>("")
  const [incomeData, setIncomeData] = useState<any>(null)
  const [deductionsData, setDeductionsData] = useState<any>(null)
  const [taxCalculation, setTaxCalculation] = useState<any>(null)

  const filingSteps: FilingStep[] = [
    {
      id: "form-selection",
      name: "ITR Form Selection",
      description: "Choose the correct Income Tax Return form",
      icon: FileText,
      status: currentStep === 0 ? "in-progress" : currentStep > 0 ? "completed" : "pending",
      component: () => null
    },
    {
      id: "data-collection",
      name: "Data Collection",
      description: "Import Form 26AS, AIS, and TIS data",
      icon: Database,
      status: currentStep === 1 ? "in-progress" : currentStep > 1 ? "completed" : "pending",
      component: () => null
    },
    {
      id: "deductions",
      name: "Deduction Optimization",
      description: "Maximize your tax savings with smart deductions",
      icon: Calculator,
      status: currentStep === 2 ? "in-progress" : currentStep > 2 ? "completed" : "pending",
      component: () => null
    },
    {
      id: "tax-calculation",
      name: "Tax Calculation",
      description: "Calculate your tax liability with real-time analysis",
      icon: TrendingUp,
      status: currentStep === 3 ? "in-progress" : currentStep > 3 ? "completed" : "pending",
      component: () => null
    },
    {
      id: "efiling",
      name: "E-filing Integration",
      description: "Submit return to Income Tax Department",
      icon: Upload,
      status: currentStep === 4 ? "in-progress" : currentStep > 4 ? "completed" : "pending",
      component: () => null
    },
    {
      id: "tds-filing",
      name: "TDS Return Filing",
      description: "Quarterly TDS preparation and filing",
      icon: FileSignature,
      status: currentStep === 5 ? "in-progress" : currentStep > 5 ? "completed" : "pending",
      component: () => null
    },
    {
      id: "form16-generation",
      name: "Form 16/16A Generation",
      description: "Generate TDS certificates with digital signature",
      icon: Shield,
      status: currentStep === 6 ? "in-progress" : currentStep > 6 ? "completed" : "pending",
      component: () => null
    }
  ]

  const handleFormSelect = (formId: string) => {
    setSelectedForm(formId)
    setCurrentStep(1)
  }

  const handleDataImport = (data: any) => {
    setIncomeData(data)
    setCurrentStep(2)
  }

  const handleDeductionsComplete = (data: any) => {
    setDeductionsData(data)
    setCurrentStep(3)
  }

  const handleTaxCalculationComplete = (data: any) => {
    setTaxCalculation(data)
    setCurrentStep(4)
  }

  const handleEfilingComplete = (data: any) => {
    setCurrentStep(5)
  }

  const handleTDSFilingComplete = (data: any) => {
    setCurrentStep(6)
  }

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex)
    }
  }

  const getStepIcon = (status: string, icon: React.ComponentType<any>) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />
      case "pending":
        return <icon className="w-5 h-5 text-gray-400" />
      default:
        return <icon className="w-5 h-5 text-gray-400" />
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Start Your ITR Filing</span>
                </CardTitle>
                <CardDescription>
                  KYT.ai will guide you through the entire tax filing process with our intelligent workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Info className="w-4 h-4" />
                    <AlertDescription>
                      Our AI-powered system will help you select the correct ITR form, import your tax data, 
                      optimize deductions, calculate tax liability, and submit your return - all in one place.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-center">
                        <FileText className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                        <h3 className="font-medium">Smart Form Selection</h3>
                        <p className="text-sm text-gray-600">AI recommends the right ITR form</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <Database className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <h3 className="font-medium">Automated Data Import</h3>
                        <p className="text-sm text-gray-600">Import Form 26AS, AIS & TIS</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <Calculator className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                        <h3 className="font-medium">Intelligent Optimization</h3>
                        <p className="text-sm text-gray-600">Maximize deductions & savings</p>
                      </div>
                    </Card>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => setCurrentStep(1)}
                  >
                    Start Filing Process
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ITR Form Selection</CardTitle>
                <CardDescription>
                  Our intelligent wizard will help you choose the correct ITR form based on your income sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Info className="w-4 h-4" />
                    <AlertDescription>
                      Answer a few questions about your income sources and we'll recommend the most appropriate ITR form for you.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4 border-2 border-blue-200 bg-blue-50">
                      <div className="flex items-center space-x-3">
                        <Users className="w-6 h-6 text-blue-500" />
                        <div>
                          <h3 className="font-medium">Individuals</h3>
                          <p className="text-sm text-gray-600">Salaried employees, professionals, business owners</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4 border-2 border-green-200 bg-green-50">
                      <div className="flex items-center space-x-3">
                        <Building className="w-6 h-6 text-green-500" />
                        <div>
                          <h3 className="font-medium">Business Entities</h3>
                          <p className="text-sm text-gray-600">Companies, LLPs, firms, trusts</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      // Simulate form selection
                      setSelectedForm("itr1")
                      setCurrentStep(2)
                    }}
                  >
                    Start Form Selection Wizard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Automated Data Collection</CardTitle>
                <CardDescription>
                  Import your tax data directly from Income Tax Department portals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Info className="w-4 h-4" />
                    <AlertDescription>
                      Connect with Income Tax Department to automatically import your Form 26AS, AIS, and TIS data.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-center">
                        <FileText className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                        <h3 className="font-medium">Form 26AS</h3>
                        <p className="text-sm text-gray-600">Tax credit statement</p>
                        <Badge className="mt-2 bg-green-100 text-green-800">Ready to Import</Badge>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <Database className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <h3 className="font-medium">AIS</h3>
                        <p className="text-sm text-gray-600">Annual Information Statement</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                        <h3 className="font-medium">TIS</h3>
                        <p className="text-sm text-gray-600">Tax Information Summary</p>
                      </div>
                    </Card>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      // Simulate data import
                      setIncomeData({ imported: true })
                      setCurrentStep(3)
                    }}
                  >
                    Import All Tax Data
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deduction Optimization</CardTitle>
                <CardDescription>
                  Maximize your tax savings with intelligent deduction planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Info className="w-4 h-4" />
                    <AlertDescription>
                      Our AI-powered optimizer will help you claim all eligible deductions and maximize your tax savings.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-6 h-6 text-blue-500" />
                        <div>
                          <h3 className="font-medium">Section 80C</h3>
                          <p className="text-sm text-gray-600">Up to ₹1.5 lakh deduction</p>
                          <div className="mt-2">
                            <Progress value={65} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">65% utilized</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center space-x-3">
                        <Users className="w-6 h-6 text-green-500" />
                        <div>
                          <h3 className="font-medium">Section 80D</h3>
                          <p className="text-sm text-gray-600">Health insurance premium</p>
                          <div className="mt-2">
                            <Progress value={40} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">40% utilized</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      // Simulate deduction optimization
                      setDeductionsData({ optimized: true })
                      setCurrentStep(4)
                    }}
                  >
                    Optimize Deductions
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Calculation & Review</CardTitle>
                <CardDescription>
                  Review your tax calculation and finalize your return
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-center">
                        <FileText className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                        <h3 className="font-medium">Taxable Income</h3>
                        <p className="text-2xl font-bold">₹12.4L</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <Calculator className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <h3 className="font-medium">Total Tax</h3>
                        <p className="text-2xl font-bold">₹1.8L</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                        <h3 className="font-medium">Refund</h3>
                        <p className="text-2xl font-bold text-green-600">₹8,500</p>
                      </div>
                    </Card>
                  </div>
                  
                  <Alert>
                    <CheckCircle className="w-4 h-4" />
                    <AlertDescription>
                      Your tax calculation is complete. Review the details and submit your return to the Income Tax Department.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      Download Tax Calculation Report
                    </Button>
                    <Button className="w-full" onClick={() => setCurrentStep(5)}>
                      Continue to E-filing
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 5:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>E-filing Integration</CardTitle>
                <CardDescription>
                  Submit your Income Tax Return directly to Income Tax Department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-center">
                        <Server className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                        <h3 className="font-medium">ITD Portal</h3>
                        <p className="text-sm text-gray-600">Connected</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <Shield className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <h3 className="font-medium">Security</h3>
                        <p className="text-sm text-gray-600">256-bit SSL</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                        <h3 className="font-medium">Compliance</h3>
                        <p className="text-sm text-gray-600">100% ITD Compliant</p>
                      </div>
                    </Card>
                  </div>
                  
                  <Alert>
                    <Info className="w-4 h-4" />
                    <AlertDescription>
                      KYT.ai will securely submit your return to Income Tax Department with digital signature and provide instant acknowledgment.
                    </AlertDescription>
                  </Alert>
                  
                  <Button className="w-full" onClick={() => setCurrentStep(6)}>
                    Submit Return to ITD
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 6:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>TDS Return Filing</CardTitle>
                <CardDescription>
                  Quarterly TDS preparation and filing system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-center">
                        <FileSignature className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                        <h3 className="font-medium">TDS Entries</h3>
                        <p className="text-2xl font-bold">25</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <Calculator className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <h3 className="font-medium">Total TDS</h3>
                        <p className="text-2xl font-bold">₹1.25L</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                        <h3 className="font-medium">Returns Filed</h3>
                        <p className="text-2xl font-bold">4</p>
                      </div>
                    </Card>
                  </div>
                  
                  <Alert>
                    <Info className="w-4 h-4" />
                    <AlertDescription>
                      KYT.ai automates quarterly TDS return filing with challan reconciliation and direct submission to TIN portal.
                    </AlertDescription>
                  </Alert>
                  
                  <Button className="w-full" onClick={() => setCurrentStep(7)}>
                    Continue to Form 16 Generation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 7:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Form 16/16A Generation</CardTitle>
                <CardDescription>
                  Automated certificate generation with digital signature
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-center">
                        <FileText className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                        <h3 className="font-medium">Form 16</h3>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <FileSignature className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <h3 className="font-medium">Form 16A</h3>
                        <p className="text-2xl font-bold">8</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <Shield className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                        <h3 className="font-medium">Signed</h3>
                        <p className="text-2xl font-bold">20</p>
                      </div>
                    </Card>
                  </div>
                  
                  <Alert>
                    <CheckCircle className="w-4 h-4" />
                    <AlertDescription>
                      Congratulations! All TDS certificates have been generated with digital signatures and distributed to employees/deductees.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="w-full" variant="outline">
                      Download All Certificates
                    </Button>
                    <Button className="w-full">
                      Complete Filing Process
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Income Tax Return Filing</h1>
        <p className="text-gray-600">Complete your tax filing with KYT.ai's intelligent workflow</p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Filing Progress</h3>
            <span className="text-sm text-gray-500">Step {currentStep + 1} of {filingSteps.length}</span>
          </div>
          <Progress value={((currentStep + 1) / filingSteps.length) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Workflow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {filingSteps.map((step, index) => (
          <div 
            key={step.id}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              currentStep === index 
                ? "bg-blue-100 border-2 border-blue-300" 
                : index < currentStep 
                  ? "bg-green-50 border-2 border-green-300" 
                  : "bg-gray-50 border-2 border-gray-200"
            }`}
            onClick={() => handleStepClick(index)}
          >
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {getStepIcon(step.status, step.icon)}
              </div>
              <h4 className="text-sm font-medium">{step.name}</h4>
              <p className="text-xs text-gray-600 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="space-y-6">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex space-x-2">
          {currentStep > 0 && (
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            >
              Previous Step
            </Button>
          )}
          {currentStep < filingSteps.length - 1 && (
            <Button onClick={() => setCurrentStep(prev => Math.min(filingSteps.length - 1, prev + 1))}>
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}