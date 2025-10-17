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
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
  FileText,
  Server,
  Database,
  Send,
  Download,
  Eye,
  Printer,
  Mail,
  MessageSquare,
  Smartphone,
  CreditCard,
  User,
  Fingerprint,
  Key,
  ArrowRight,
  ArrowLeft,
  Info,
  ExternalLink,
  RefreshCw
} from "lucide-react"

interface EfileSubmission {
  id: string
  acknowledgmentNumber: string
  submissionDate: string
  status: "pending" | "submitted" | "processed" | "rejected"
  xmlData: string
  verificationStatus: "pending" | "verified" | "failed"
}

interface DigitalSignature {
  id: string
  name: string
  type: "class2" | "class3" | "dgft"
  provider: string
  expiryDate: string
  status: "active" | "expired" | "not-configured"
}

interface TaxPayerDetails {
  pan: string
  name: string
  assessmentYear: string
  returnType: string
  jurisdiction: string
}

const mockDigitalSignatures: DigitalSignature[] = [
  {
    id: "1",
    name: "John Doe - Class 2",
    type: "class2",
    provider: "eMudhra",
    expiryDate: "2025-12-31",
    status: "active"
  },
  {
    id: "2",
    name: "John Doe - Class 3",
    type: "class3",
    provider: "Safescrypt",
    expiryDate: "2024-06-30",
    status: "expired"
  }
]

const mockSubmissions: EfileSubmission[] = [
  {
    id: "1",
    acknowledgmentNumber: "123456789012345",
    submissionDate: "2024-07-15",
    status: "processed",
    xmlData: "ITR-1 data for AY 2024-25",
    verificationStatus: "verified"
  }
]

interface EfilingIntegrationProps {
  onEfilingComplete: (submission: EfileSubmission) => void
  onBack: () => void
  userId: string
  taxCalculation: any
}

export default function EfilingIntegration({ onEfilingComplete, onBack, userId, taxCalculation }: EfilingIntegrationProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedSignature, setSelectedSignature] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionProgress, setSubmissionProgress] = useState(0)
  const [currentSubmission, setCurrentSubmission] = useState<EfileSubmission | null>(null)
  const [taxPayerDetails, setTaxPayerDetails] = useState<TaxPayerDetails>({
    pan: "ABCDE1234F",
    name: "John Doe",
    assessmentYear: "2024-25",
    returnType: "ITR-1",
    jurisdiction: "Mumbai"
  })

  const handleSubmitReturn = async () => {
    if (!selectedSignature) {
      alert("Please select a digital signature")
      return
    }

    setIsSubmitting(true)
    setSubmissionProgress(0)

    // Simulate submission process
    const steps = [
      { name: "Validating data", progress: 20 },
      { name: "Generating XML", progress: 40 },
      { name: "Connecting to ITD portal", progress: 60 },
      { name: "Uploading return", progress: 80 },
      { name: "Processing submission", progress: 100 }
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmissionProgress(steps[i].progress)
    }

    // Create submission record
    const submission: EfileSubmission = {
      id: Date.now().toString(),
      acknowledgmentNumber: Math.floor(Math.random() * 1000000000000000).toString(),
      submissionDate: new Date().toISOString().split('T')[0],
      status: "submitted",
      xmlData: "Generated ITR XML data",
      verificationStatus: "pending"
    }

    setCurrentSubmission(submission)
    setIsSubmitting(false)
    onEfilingComplete(submission)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processed":
        return <Badge className="bg-green-100 text-green-800">Processed</Badge>
      case "submitted":
        return <Badge className="bg-blue-100 text-blue-800">Submitted</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const getSignatureStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>
      case "not-configured":
        return <Badge className="bg-gray-100 text-gray-800">Not Configured</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">E-filing Integration</h1>
        <p className="text-gray-600">Submit your Income Tax Return directly to Income Tax Department</p>
      </div>

      {/* Submission Progress */}
      {isSubmitting && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Submitting to ITD Portal...</span>
                <span>{submissionProgress}%</span>
              </div>
              <Progress value={submissionProgress} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {submissionProgress < 20 ? "Validating your data..." :
                 submissionProgress < 40 ? "Generating XML file..." :
                 submissionProgress < 60 ? "Connecting to Income Tax Department..." :
                 submissionProgress < 80 ? "Uploading return..." :
                 "Processing submission..."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="digital-signature">Digital Signature</TabsTrigger>
          <TabsTrigger value="submission">Submit Return</TabsTrigger>
          <TabsTrigger value="status">Submission Status</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">ITD Portal</span>
                </div>
                <p className="text-2xl font-bold mt-1">Connected</p>
                <p className="text-xs text-gray-500">Income Tax Department</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Security</span>
                </div>
                <p className="text-2xl font-bold mt-1">256-bit</p>
                <p className="text-xs text-gray-500">SSL Encryption</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Compliance</span>
                </div>
                <p className="text-2xl font-bold mt-1">100%</p>
                <p className="text-xs text-gray-500">ITD Compliant</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>E-filing Process Overview</CardTitle>
              <CardDescription>
                KYT.ai streamlines the entire e-filing process with direct ITD integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Data Validation</h3>
                    <p className="text-sm text-gray-600">Automated validation of all tax data before submission</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Database className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">XML Generation</h3>
                    <p className="text-sm text-gray-600">Generate ITD-compliant XML files automatically</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Digital Signature</h3>
                    <p className="text-sm text-gray-600">Secure signing with your digital certificate</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Upload className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Direct Submission</h3>
                    <p className="text-sm text-gray-600">Submit directly to Income Tax Department portal</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Acknowledgment</h3>
                    <p className="text-sm text-gray-600">Instant acknowledgment with verification status</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Info className="w-4 h-4" />
            <AlertDescription>
              KYT.ai ensures 100% compliance with Income Tax Department requirements and provides real-time submission tracking.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="digital-signature" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Digital Signature Configuration</CardTitle>
              <CardDescription>
                Configure and manage your digital signatures for e-filing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockDigitalSignatures.map((signature) => (
                    <div 
                      key={signature.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedSignature === signature.id 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => signature.status === "active" && setSelectedSignature(signature.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{signature.name}</h3>
                        {getSignatureStatusBadge(signature.status)}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <span className="font-medium">{signature.type.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Provider:</span>
                          <span>{signature.provider}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expiry:</span>
                          <span>{signature.expiryDate}</span>
                        </div>
                      </div>
                      {signature.status === "active" && selectedSignature === signature.id && (
                        <div className="mt-2 flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">Selected for signing</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-2">Need a Digital Signature?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Get your digital signature from authorized providers for secure e-filing
                  </p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Authorized Providers
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Fingerprint className="w-5 h-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium">Biometric Authentication</h4>
                    <p className="text-sm text-gray-600">Multi-factor authentication</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Key className="w-5 h-5 text-green-500" />
                  <div>
                    <h4 className="font-medium">Encryption</h4>
                    <p className="text-sm text-gray-600">256-bit SSL encryption</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <div>
                    <h4 className="font-medium">Audit Trail</h4>
                    <p className="text-sm text-gray-600">Complete activity tracking</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Server className="w-5 h-5 text-orange-500" />
                  <div>
                    <h4 className="font-medium">Secure Storage</h4>
                    <p className="text-sm text-gray-600">Encrypted data storage</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Return</CardTitle>
              <CardDescription>
                Review and submit your Income Tax Return to Income Tax Department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Tax Payer Details */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-3">Tax Payer Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div>
                      <Label className="text-xs">PAN</Label>
                      <p className="font-medium">{taxPayerDetails.pan}</p>
                    </div>
                    <div>
                      <Label className="text-xs">Name</Label>
                      <p className="font-medium">{taxPayerDetails.name}</p>
                    </div>
                    <div>
                      <Label className="text-xs">Assessment Year</Label>
                      <p className="font-medium">{taxPayerDetails.assessmentYear}</p>
                    </div>
                    <div>
                      <Label className="text-xs">Return Type</Label>
                      <p className="font-medium">{taxPayerDetails.returnType}</p>
                    </div>
                    <div>
                      <Label className="text-xs">Jurisdiction</Label>
                      <p className="font-medium">{taxPayerDetails.jurisdiction}</p>
                    </div>
                  </div>
                </div>

                {/* Tax Summary */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-3">Tax Summary</h3>
                  {taxCalculation && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <Label className="text-xs">Gross Income</Label>
                        <p className="font-medium">₹{taxCalculation.grossIncome.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Total Deductions</Label>
                        <p className="font-medium">₹{taxCalculation.totalDeductions.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Taxable Income</Label>
                        <p className="font-medium">₹{taxCalculation.taxableIncome.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Total Tax</Label>
                        <p className="font-medium">₹{taxCalculation.totalTax.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submission Checklist */}
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium mb-3">Submission Checklist</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Digital signature configured and selected</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">All tax calculations verified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Supporting documents uploaded</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Bank details verified</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  className="w-full" 
                  onClick={handleSubmitReturn}
                  disabled={isSubmitting || !selectedSignature}
                >
                  {isSubmitting ? "Submitting..." : "Submit Return to ITD"}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submission Status</CardTitle>
              <CardDescription>
                Track your return submission and acknowledgment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentSubmission ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Submission Successful</h3>
                      {getStatusBadge(currentSubmission.status)}
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Acknowledgment Number:</span>
                        <p className="font-medium">{currentSubmission.acknowledgmentNumber}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Submission Date:</span>
                        <p className="font-medium">{currentSubmission.submissionDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Verification Status:</span>
                        <p className="font-medium">{currentSubmission.verificationStatus}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">ITD Reference:</span>
                        <p className="font-medium">{currentSubmission.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download XML
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Acknowledgment
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer className="w-4 h-4 mr-2" />
                      Print Receipt
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Receipt
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No submissions yet. Submit your return to see status here.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Previous Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockSubmissions.map((submission) => (
                  <div key={submission.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{submission.acknowledgmentNumber}</p>
                        <p className="text-sm text-gray-600">{submission.submissionDate}</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(submission.status)}
                        <p className="text-xs text-gray-500 mt-1">{submission.verificationStatus}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tax Calculation
        </Button>
        <Button onClick={() => currentSubmission && onEfilingComplete(currentSubmission)}>
          Complete Filing Process
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}