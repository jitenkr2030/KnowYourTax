"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  FileText,
  Download,
  Send,
  Mail,
  Printer,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
  Fingerprint,
  Key,
  Users,
  Building,
  Calendar,
  Calculator,
  TrendingUp,
  FileSignature,
  Upload,
  Database,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  Info,
  RefreshCw,
  ExternalLink
} from "lucide-react"

interface EmployeeDetails {
  id: string
  name: string
  pan: string
  employeeId: string
  department: string
  designation: string
  dateOfJoining: string
}

interface SalaryDetails {
  employeeId: string
  financialYear: string
  grossSalary: number
  taxableSalary: number
  incomeTax: number
  surcharge: number
  cess: number
  totalTax: number
  taxDeducted: number
  taxPayable: number
  refund: number
}

interface Form16Data {
  id: string
  certificateNumber: string
  employee: EmployeeDetails
  salary: SalaryDetails
  employerDetails: {
    name: string
    tan: string
    address: string
    city: string
    state: string
    pincode: string
  }
  assessmentYear: string
  period: string
  dateOfIssue: string
  dateOfGeneration: string
  status: "draft" | "generated" | "signed" | "sent"
  signatureStatus: "pending" | "signed" | "verified"
}

interface Form16AData {
  id: string
  certificateNumber: string
  deducteeName: string
  deducteePAN: string
  natureOfPayment: string
  financialYear: string
  quarter: string
  amountPaid: number
  taxDeducted: number
  dateOfDeduction: string
  dateOfPayment: string
  employerDetails: {
    name: string
    tan: string
  }
  dateOfIssue: string
  status: "draft" | "generated" | "signed" | "sent"
}

const mockEmployees: EmployeeDetails[] = [
  {
    id: "1",
    name: "Raj Kumar",
    pan: "ABCDE1234F",
    employeeId: "EMP001",
    department: "Engineering",
    designation: "Software Engineer",
    dateOfJoining: "2022-01-15"
  },
  {
    id: "2",
    name: "Priya Singh",
    pan: "FGHIJ5678K",
    employeeId: "EMP002",
    department: "Marketing",
    designation: "Marketing Manager",
    dateOfJoining: "2021-06-10"
  }
]

const mockForm16Data: Form16Data[] = [
  {
    id: "1",
    certificateNumber: "F16-2024-001",
    employee: mockEmployees[0],
    salary: {
      employeeId: "1",
      financialYear: "2023-24",
      grossSalary: 1200000,
      taxableSalary: 1050000,
      incomeTax: 117000,
      surcharge: 0,
      cess: 4680,
      totalTax: 121680,
      taxDeducted: 125000,
      taxPayable: 0,
      refund: 3320
    },
    employerDetails: {
      name: "ABC Technologies Pvt Ltd",
      tan: "MUMA12345A",
      address: "123 Tech Park, Andheri East",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400069"
    },
    assessmentYear: "2024-25",
    period: "April 2023 - March 2024",
    dateOfIssue: "2024-05-15",
    dateOfGeneration: "2024-05-10",
    status: "generated",
    signatureStatus: "pending"
  }
]

const mockForm16AData: Form16AData[] = [
  {
    id: "1",
    certificateNumber: "F16A-2024-Q1-001",
    deducteeName: "XYZ Consulting Services",
    deducteePAN: "LMNOP9012Z",
    natureOfPayment: "Professional Fees",
    financialYear: "2023-24",
    quarter: "Q1",
    amountPaid: 250000,
    taxDeducted: 25000,
    dateOfDeduction: "2024-04-30",
    dateOfPayment: "2024-05-05",
    employerDetails: {
      name: "ABC Technologies Pvt Ltd",
      tan: "MUMA12345A"
    },
    dateOfIssue: "2024-05-15",
    status: "generated"
  }
]

interface Form16GenerationProps {
  onGenerationComplete: (certificates: { form16: Form16Data[], form16A: Form16AData[] }) => void
  onBack: () => void
  userId: string
}

export default function Form16Generation({ onGenerationComplete, onBack, userId }: Form16GenerationProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedEmployee, setSelectedEmployee] = useState<string>("")
  const [form16Data, setForm16Data] = useState<Form16Data[]>(mockForm16Data)
  const [form16AData, setForm16AData] = useState<Form16AData[]>(mockForm16AData)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [isSigning, setIsSigning] = useState(false)
  const [signingProgress, setSigningProgress] = useState(0)

  const financialYears = [
    { id: "2023-24", name: "2023-2024" },
    { id: "2024-25", name: "2024-2025" }
  ]

  const quarters = [
    { id: "Q1", name: "Quarter 1 (Apr-Jun)" },
    { id: "Q2", name: "Quarter 2 (Jul-Sep)" },
    { id: "Q3", name: "Quarter 3 (Oct-Dec)" },
    { id: "Q4", name: "Quarter 4 (Jan-Mar)" }
  ]

  const generateForm16 = async () => {
    if (!selectedEmployee) {
      alert("Please select an employee")
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

    const steps = [
      { name: "Validating employee data", progress: 20 },
      { name: "Calculating salary details", progress: 40 },
      { name: "Computing tax liability", progress: 60 },
      { name: "Generating certificate", progress: 80 },
      { name: "Finalizing Form 16", progress: 100 }
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setGenerationProgress(steps[i].progress)
    }

    const employee = mockEmployees.find(emp => emp.id === selectedEmployee)
    if (employee) {
      const newForm16: Form16Data = {
        id: Date.now().toString(),
        certificateNumber: `F16-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
        employee: employee,
        salary: {
          employeeId: employee.id,
          financialYear: "2023-24",
          grossSalary: 1200000,
          taxableSalary: 1050000,
          incomeTax: 117000,
          surcharge: 0,
          cess: 4680,
          totalTax: 121680,
          taxDeducted: 125000,
          taxPayable: 0,
          refund: 3320
        },
        employerDetails: {
          name: "ABC Technologies Pvt Ltd",
          tan: "MUMA12345A",
          address: "123 Tech Park, Andheri East",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400069"
        },
        assessmentYear: "2024-25",
        period: "April 2023 - March 2024",
        dateOfIssue: new Date().toISOString().split('T')[0],
        dateOfGeneration: new Date().toISOString().split('T')[0],
        status: "generated",
        signatureStatus: "pending"
      }

      setForm16Data(prev => [...prev, newForm16])
    }

    setIsGenerating(false)
  }

  const signCertificate = async (certificateId: string, type: "form16" | "form16A") => {
    setIsSigning(true)
    setSigningProgress(0)

    const steps = [
      { name: "Validating certificate", progress: 25 },
      { name: "Connecting to DSC", progress: 50 },
      { name: "Applying digital signature", progress: 75 },
      { name: "Verifying signature", progress: 100 }
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600))
      setSigningProgress(steps[i].progress)
    }

    if (type === "form16") {
      setForm16Data(prev => prev.map(cert => 
        cert.id === certificateId 
          ? { ...cert, signatureStatus: "signed", status: "signed" }
          : cert
      ))
    } else {
      setForm16AData(prev => prev.map(cert => 
        cert.id === certificateId 
          ? { ...cert, status: "signed" }
          : cert
      ))
    }

    setIsSigning(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "signed":
        return <Badge className="bg-green-100 text-green-800">Signed</Badge>
      case "generated":
        return <Badge className="bg-blue-100 text-blue-800">Generated</Badge>
      case "sent":
        return <Badge className="bg-purple-100 text-purple-800">Sent</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const getSignatureStatusBadge = (status: string) => {
    switch (status) {
      case "signed":
        return <Badge className="bg-green-100 text-green-800">Signed</Badge>
      case "verified":
        return <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Form 16/16A Generation</h1>
        <p className="text-gray-600">Automated certificate generation with digital signature</p>
      </div>

      {/* Generation Progress */}
      {isGenerating && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Generating Form 16...</span>
                <span>{generationProgress}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {generationProgress < 20 ? "Validating employee data..." :
                 generationProgress < 40 ? "Calculating salary details..." :
                 generationProgress < 60 ? "Computing tax liability..." :
                 generationProgress < 80 ? "Generating certificate..." :
                 "Finalizing Form 16..."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Signing Progress */}
      {isSigning && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Applying Digital Signature...</span>
                <span>{signingProgress}%</span>
              </div>
              <Progress value={signingProgress} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {signingProgress < 25 ? "Validating certificate..." :
                 signingProgress < 50 ? "Connecting to DSC..." :
                 signingProgress < 75 ? "Applying digital signature..." :
                 "Verifying signature..."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="form16">Form 16</TabsTrigger>
          <TabsTrigger value="form16A">Form 16A</TabsTrigger>
          <TabsTrigger value="digital-signature">Digital Signature</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Form 16</span>
                </div>
                <p className="text-2xl font-bold mt-1">{form16Data.length}</p>
                <p className="text-xs text-gray-500">Certificates generated</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileSignature className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Form 16A</span>
                </div>
                <p className="text-2xl font-bold mt-1">{form16AData.length}</p>
                <p className="text-xs text-gray-500">Certificates generated</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Signed</span>
                </div>
                <p className="text-2xl font-bold mt-1">
                  {form16Data.filter(f => f.signatureStatus === "signed").length + 
                   form16AData.filter(f => f.status === "signed").length}
                </p>
                <p className="text-xs text-gray-500">Digitally signed</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Form 16/16A Generation Process</CardTitle>
              <CardDescription>
                KYT.ai automates TDS certificate generation with compliance and security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Database className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Data Integration</h3>
                    <p className="text-sm text-gray-600">Auto-import salary and TDS data from payroll system</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Calculator className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Tax Calculation</h3>
                    <p className="text-sm text-gray-600">Automatic computation of tax liability and deductions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Certificate Generation</h3>
                    <p className="text-sm text-gray-600">Generate Form 16/16A in prescribed format</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Fingerprint className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Digital Signature</h3>
                    <p className="text-sm text-gray-600">Apply legally valid digital signatures</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Send className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Distribution</h3>
                    <p className="text-sm text-gray-600">Send certificates via email or download</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Info className="w-4 h-4" />
            <AlertDescription>
              KYT.ai ensures 100% compliance with Income Tax Department requirements for Form 16/16A generation.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="form16" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Form 16 Generation</span>
                <div className="flex space-x-2">
                  <select 
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="">Select Employee</option>
                    {mockEmployees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                  </select>
                  <Button onClick={generateForm16} disabled={isGenerating || !selectedEmployee}>
                    {isGenerating ? "Generating..." : "Generate Form 16"}
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Generate Form 16 certificates for salary income
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {form16Data.map((form16) => (
                  <div key={form16.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{form16.employee.name}</h3>
                        <p className="text-sm text-gray-600">
                          {form16.employee.employeeId} • {form16.employee.designation}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(form16.status)}
                        {getSignatureStatusBadge(form16.signatureStatus)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div>
                        <Label className="text-xs">Gross Salary</Label>
                        <p className="font-medium">₹{form16.salary.grossSalary.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Taxable Salary</Label>
                        <p className="font-medium">₹{form16.salary.taxableSalary.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Tax Deducted</Label>
                        <p className="font-medium">₹{form16.salary.taxDeducted.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Refund</Label>
                        <p className="font-medium text-green-600">₹{form16.salary.refund.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      {form16.signatureStatus !== "signed" && (
                        <Button 
                          size="sm" 
                          onClick={() => signCertificate(form16.id, "form16")}
                          disabled={isSigning}
                        >
                          <Fingerprint className="w-4 h-4 mr-2" />
                          Sign
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form16A" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Form 16A Generation</span>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Generate Form 16A
                </Button>
              </CardTitle>
              <CardDescription>
                Generate Form 16A certificates for non-salary payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {form16AData.map((form16A) => (
                  <div key={form16A.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{form16A.deducteeName}</h3>
                        <p className="text-sm text-gray-600">
                          {form16A.deducteePAN} • {form16A.natureOfPayment}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(form16A.status)}
                        <Badge className="bg-blue-100 text-blue-800">
                          {form16A.quarter}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div>
                        <Label className="text-xs">Amount Paid</Label>
                        <p className="font-medium">₹{form16A.amountPaid.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Tax Deducted</Label>
                        <p className="font-medium">₹{form16A.taxDeducted.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Quarter</Label>
                        <p className="font-medium">{form16A.quarter}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Date of Issue</Label>
                        <p className="font-medium">{form16A.dateOfIssue}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      {form16A.status !== "signed" && (
                        <Button 
                          size="sm" 
                          onClick={() => signCertificate(form16A.id, "form16A")}
                          disabled={isSigning}
                        >
                          <Fingerprint className="w-4 h-4 mr-2" />
                          Sign
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="digital-signature" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Digital Signature Management</CardTitle>
              <CardDescription>
                Configure and manage digital signatures for Form 16/16A
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Fingerprint className="w-8 h-8 text-blue-500" />
                      <div>
                        <h3 className="font-medium">Class 2 Digital Signature</h3>
                        <p className="text-sm text-gray-600">For Form 16 signing</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Provider:</span>
                        <span>eMudhra</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expiry:</span>
                        <span>2025-12-31</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Shield className="w-8 h-8 text-green-500" />
                      <div>
                        <h3 className="font-medium">Security Features</h3>
                        <p className="text-sm text-gray-600">Advanced protection</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>256-bit encryption</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Timestamp verification</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Audit trail logging</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-2">Digital Signature Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Legal Validity</h4>
                      <p className="text-sm text-gray-600">Digitally signed Form 16/16A are legally valid as per IT Act</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Authenticity</h4>
                      <p className="text-sm text-gray-600">Ensures authenticity and integrity of certificates</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Non-repudiation</h4>
                      <p className="text-sm text-gray-600">Prevents denial of signature by signer</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Efficiency</h4>
                      <p className="text-sm text-gray-600">Fast and secure certificate generation</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium mb-2">Compliance Information</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    KYT.ai ensures all Form 16/16A certificates comply with:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Income Tax Department guidelines</li>
                    <li>• Information Technology Act, 2000</li>
                    <li>• Digital Signature Rules</li>
                    <li>• TDS provisions under Income Tax Act</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to TDS Filing
        </Button>
        <Button onClick={() => onGenerationComplete({ form16: form16Data, form16A: form16AData })}>
          Complete Generation Process
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}