'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  CheckCircle, 
  Circle, 
  AlertTriangle, 
  Info, 
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Save,
  Eye,
  Edit,
  Upload,
  Calculator,
  FileText,
  User,
  Building,
  CreditCard,
  Home,
  Briefcase,
  GraduationCap,
  Heart,
  Car
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface FilingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  required: boolean
  completed: boolean
  fields: Field[]
}

interface Field {
  id: string
  name: string
  type: 'text' | 'number' | 'select' | 'date' | 'textarea' | 'file'
  label: string
  placeholder?: string
  required: boolean
  validation?: {
    min?: number
    max?: number
    pattern?: string
    custom?: (value: any) => boolean | string
  }
  options?: { value: string; label: string }[]
  help?: string
  tooltip?: string
}

interface ValidationError {
  fieldId: string
  message: string
}

interface FormData {
  [key: string]: any
}

const filingSteps: FilingStep[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Basic personal and contact details',
    icon: <User className="h-5 w-5" />,
    required: true,
    completed: false,
    fields: [
      {
        id: 'fullName',
        name: 'fullName',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your full name as per PAN',
        required: true,
        help: 'Name should match exactly with your PAN card',
        tooltip: 'This should be your legal name as it appears on government documents'
      },
      {
        id: 'pan',
        name: 'pan',
        type: 'text',
        label: 'PAN Number',
        placeholder: 'ABCDE1234F',
        required: true,
        validation: {
          pattern: '[A-Z]{5}[0-9]{4}[A-Z]{1}',
          custom: (value: string) => {
            if (value.length !== 10) return 'PAN must be 10 characters long'
            if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) return 'Invalid PAN format'
            return true
          }
        },
        help: '10-character alphanumeric PAN',
        tooltip: 'Permanent Account Number issued by Income Tax Department'
      },
      {
        id: 'dob',
        name: 'dob',
        type: 'date',
        label: 'Date of Birth',
        required: true,
        help: 'As per your official records'
      },
      {
        id: 'email',
        name: 'email',
        type: 'text',
        label: 'Email Address',
        placeholder: 'your.email@example.com',
        required: true,
        validation: {
          custom: (value: string) => {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format'
            return true
          }
        }
      },
      {
        id: 'phone',
        name: 'phone',
        type: 'text',
        label: 'Mobile Number',
        placeholder: '+91 98765 43210',
        required: true,
        validation: {
          custom: (value: string) => {
            if (!/^\+91\s?\d{10}$/.test(value)) return 'Invalid mobile number format'
            return true
          }
        }
      }
    ]
  },
  {
    id: 'income',
    title: 'Income Details',
    description: 'Sources of income for the financial year',
    icon: <Briefcase className="h-5 w-5" />,
    required: true,
    completed: false,
    fields: [
      {
        id: 'employmentType',
        name: 'employmentType',
        type: 'select',
        label: 'Employment Type',
        required: true,
        options: [
          { value: 'salaried', label: 'Salaried Employee' },
          { value: 'self-employed', label: 'Self-Employed' },
          { value: 'business', label: 'Business Owner' },
          { value: 'professional', label: 'Professional' }
        ]
      },
      {
        id: 'grossSalary',
        name: 'grossSalary',
        type: 'number',
        label: 'Gross Salary Income (₹)',
        placeholder: 'Enter total salary before deductions',
        required: true,
        validation: {
          min: 0,
          custom: (value: number) => {
            if (value > 10000000) return 'Salary seems unusually high. Please verify.'
            return true
          }
        },
        tooltip: 'Total salary received from all employers during the financial year'
      },
      {
        id: 'otherIncome',
        name: 'otherIncome',
        type: 'number',
        label: 'Other Income (₹)',
        placeholder: 'Interest, rental, etc.',
        validation: {
          min: 0
        },
        help: 'Include interest income, rental income, etc.'
      },
      {
        id: 'incomeFromHouseProperty',
        name: 'incomeFromHouseProperty',
        type: 'number',
        label: 'Income from House Property (₹)',
        placeholder: 'Annual rental income',
        validation: {
          min: 0
        }
      }
    ]
  },
  {
    id: 'deductions',
    title: 'Tax Deductions',
    description: 'Claim deductions under various sections',
    icon: <Calculator className="h-5 w-5" />,
    required: true,
    completed: false,
    fields: [
      {
        id: 'section80C',
        name: 'section80C',
        type: 'number',
        label: 'Section 80C Deductions (₹)',
        placeholder: 'PF, PPF, LIC, etc. (Max ₹1,50,000)',
        validation: {
          min: 0,
          max: 150000
        },
        tooltip: 'Maximum deduction allowed is ₹1,50,000 per financial year'
      },
      {
        id: 'section80D',
        name: 'section80D',
        type: 'number',
        label: 'Section 80D - Health Insurance (₹)',
        placeholder: 'Medical insurance premium',
        validation: {
          min: 0
        },
        help: 'Premium paid for health insurance for self, family, and parents'
      },
      {
        id: 'hraExemption',
        name: 'hraExemption',
        type: 'number',
        label: 'HRA Exemption (₹)',
        placeholder: 'House Rent Allowance',
        validation: {
          min: 0
        },
        tooltip: 'Available if you receive HRA and live in rented accommodation'
      },
      {
        id: 'homeLoanInterest',
        name: 'homeLoanInterest',
        type: 'number',
        label: 'Home Loan Interest (₹)',
        placeholder: 'Interest paid on home loan',
        validation: {
          min: 0
        }
      }
    ]
  },
  {
    id: 'taxes',
    title: 'Taxes Paid',
    description: 'Details of taxes already paid during the year',
    icon: <CreditCard className="h-5 w-5" />,
    required: true,
    completed: false,
    fields: [
      {
        id: 'tdsSalary',
        name: 'tdsSalary',
        type: 'number',
        label: 'TDS on Salary (₹)',
        placeholder: 'Tax deducted by employer',
        required: true,
        validation: {
          min: 0
        }
      },
      {
        id: 'advanceTax',
        name: 'advanceTax',
        type: 'number',
        label: 'Advance Tax Paid (₹)',
        placeholder: 'Self-assessment tax paid',
        validation: {
          min: 0
        }
      },
      {
        id: 'selfAssessmentTax',
        name: 'selfAssessmentTax',
        type: 'number',
        label: 'Self-Assessment Tax (₹)',
        placeholder: 'Tax paid before filing',
        validation: {
          min: 0
        }
      }
    ]
  },
  {
    id: 'bank',
    title: 'Bank Details',
    description: 'Bank account for refund processing',
    icon: <Building className="h-5 w-5" />,
    required: true,
    completed: false,
    fields: [
      {
        id: 'bankName',
        name: 'bankName',
        type: 'text',
        label: 'Bank Name',
        placeholder: 'State Bank of India',
        required: true
      },
      {
        id: 'accountNumber',
        name: 'accountNumber',
        type: 'text',
        label: 'Account Number',
        placeholder: 'Enter your account number',
        required: true,
        validation: {
          custom: (value: string) => {
            if (!/^\d{9,18}$/.test(value)) return 'Invalid account number'
            return true
          }
        }
      },
      {
        id: 'ifscCode',
        name: 'ifscCode',
        type: 'text',
        label: 'IFSC Code',
        placeholder: 'SBIN0001234',
        required: true,
        validation: {
          pattern: '[A-Z]{4}0[A-Z0-9]{6}',
          custom: (value: string) => {
            if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) return 'Invalid IFSC code'
            return true
          }
        }
      },
      {
        id: 'accountType',
        name: 'accountType',
        type: 'select',
        label: 'Account Type',
        required: true,
        options: [
          { value: 'savings', label: 'Savings Account' },
          { value: 'current', label: 'Current Account' },
          { value: 'nro', label: 'NRO Account' },
          { value: 'nre', label: 'NRE Account' }
        ]
      }
    ]
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Review all information and submit your return',
    icon: <Eye className="h-5 w-5" />,
    required: true,
    completed: false,
    fields: [
      {
        id: 'declaration',
        name: 'declaration',
        type: 'textarea',
        label: 'Declaration',
        placeholder: 'I hereby declare that the information furnished is true and correct...',
        required: true,
        help: 'Please read and confirm the declaration before submitting'
      },
      {
        id: 'place',
        name: 'place',
        type: 'text',
        label: 'Place',
        placeholder: 'Enter your city',
        required: true
      },
      {
        id: 'date',
        name: 'date',
        type: 'date',
        label: 'Date',
        required: true
      }
    ]
  }
]

export default function GuidedFilingExperience() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({})
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentStepData = filingSteps[currentStep]
  const progress = ((currentStep + 1) / filingSteps.length) * 100

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
    
    // Clear validation error for this field
    setValidationErrors(prev => prev.filter(error => error.fieldId !== fieldId))
  }

  const validateStep = (): boolean => {
    const errors: ValidationError[] = []
    
    currentStepData.fields.forEach(field => {
      if (field.required && !formData[field.id]) {
        errors.push({
          fieldId: field.id,
          message: `${field.label} is required`
        })
        return
      }

      if (formData[field.id] && field.validation) {
        const value = formData[field.id]
        
        if (field.validation.min !== undefined && Number(value) < field.validation.min) {
          errors.push({
            fieldId: field.id,
            message: `${field.label} must be at least ${field.validation.min}`
          })
        }
        
        if (field.validation.max !== undefined && Number(value) > field.validation.max) {
          errors.push({
            fieldId: field.id,
            message: `${field.label} cannot exceed ${field.validation.max}`
          })
        }
        
        if (field.validation.pattern && typeof value === 'string') {
          const regex = new RegExp(field.validation.pattern)
          if (!regex.test(value)) {
            errors.push({
              fieldId: field.id,
              message: `${field.label} format is invalid`
            })
          }
        }
        
        if (field.validation.custom) {
          const customResult = field.validation.custom(value)
          if (typeof customResult === 'string') {
            errors.push({
              fieldId: field.id,
              message: customResult
            })
          } else if (!customResult) {
            errors.push({
              fieldId: field.id,
              message: `${field.label} is invalid`
            })
          }
        }
      }
    })
    
    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < filingSteps.length - 1) {
        setCurrentStep(prev => prev + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (validateStep()) {
      setIsSubmitting(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      setIsSubmitting(false)
      // Handle success
      alert('Tax return submitted successfully!')
    }
  }

  const getFieldError = (fieldId: string): string | undefined => {
    return validationErrors.find(error => error.fieldId === fieldId)?.message
  }

  const renderField = (field: Field) => {
    const error = getFieldError(field.id)
    const value = formData[field.id] || ''

    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor={field.id} className={field.required ? 'required' : ''}>
                {field.label}
              </Label>
              {field.tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{field.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {field.help && <p className="text-sm text-muted-foreground">{field.help}</p>}
          </div>
        )

      case 'select':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor={field.id} className={field.required ? 'required' : ''}>
                {field.label}
              </Label>
              {field.tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{field.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <Select
              value={value}
              onValueChange={(v) => handleFieldChange(field.id, v)}
            >
              <SelectTrigger className={error ? 'border-red-500' : ''}>
                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {field.help && <p className="text-sm text-muted-foreground">{field.help}</p>}
          </div>
        )

      case 'textarea':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor={field.id} className={field.required ? 'required' : ''}>
                {field.label}
              </Label>
              {field.tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{field.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={error ? 'border-red-500' : ''}
              rows={4}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {field.help && <p className="text-sm text-muted-foreground">{field.help}</p>}
          </div>
        )

      case 'date':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor={field.id} className={field.required ? 'required' : ''}>
                {field.label}
              </Label>
              {field.tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{field.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <Input
              id={field.id}
              type="date"
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {field.help && <p className="text-sm text-muted-foreground">{field.help}</p>}
          </div>
        )

      case 'file':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor={field.id} className={field.required ? 'required' : ''}>
                {field.label}
              </Label>
              {field.tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{field.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PDF, JPG, PNG up to 10MB
              </p>
              <Button size="sm" className="mt-2">Choose File</Button>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {field.help && <p className="text-sm text-muted-foreground">{field.help}</p>}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">File Your Tax Return</h1>
          <p className="text-muted-foreground">Step-by-step guided filing experience</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          ITR-1 AY 2024-25
        </Badge>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep + 1} of {filingSteps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar - Step Navigation */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Filing Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {filingSteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  index === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : index < currentStep
                    ? 'bg-green-50 text-green-800'
                    : 'hover:bg-muted'
                }`}
              >
                <div className={`flex-shrink-0 ${
                  index === currentStep
                    ? 'text-primary-foreground'
                    : index < currentStep
                    ? 'text-green-600'
                    : 'text-muted-foreground'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{step.title}</div>
                  <div className="text-xs opacity-80">{step.description}</div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  currentStepData.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {currentStepData.icon}
                </div>
                <div>
                  <CardTitle>{currentStepData.title}</CardTitle>
                  <CardDescription>{currentStepData.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Smart Help Section */}
              <Alert className="mb-6">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Smart Tip:</strong> {currentStepData.id === 'personal' && 'Ensure your name matches exactly with your PAN card to avoid processing delays.'}
                  {currentStepData.id === 'income' && 'Include all sources of income to ensure accurate tax calculation.'}
                  {currentStepData.id === 'deductions' && 'Maximize your tax savings by claiming all eligible deductions.'}
                  {currentStepData.id === 'taxes' && 'Enter the exact amounts as per your Form 16/16A and Form 26AS.'}
                  {currentStepData.id === 'bank' && 'Use your primary bank account for faster refund processing.'}
                  {currentStepData.id === 'review' && 'Double-check all information before submitting. You can edit any section if needed.'}
                </AlertDescription>
              </Alert>

              {/* Form Fields */}
              <div className="space-y-6">
                {currentStepData.fields.map((field) => (
                  <div key={field.id}>
                    {renderField(field)}
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  {currentStep === filingSteps.length - 1 ? (
                    <>
                      <Button variant="outline" onClick={() => setShowPreview(true)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <FileText className="h-4 w-4 mr-2" />
                            Submit Return
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleNext}>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validation Summary */}
          {validationErrors.length > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                Please fix the following errors before proceeding:
                <ul className="mt-2 list-disc list-inside">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error.message}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tax Return Preview</DialogTitle>
            <DialogDescription>
              Review all your information before submitting
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {filingSteps.map((step) => (
              <div key={step.id} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  {step.icon}
                  {step.title}
                </h3>
                <div className="grid gap-2 text-sm">
                  {step.fields.map((field) => (
                    <div key={field.id} className="flex justify-between">
                      <span className="text-muted-foreground">{field.label}:</span>
                      <span className="font-medium">
                        {formData[field.id] || 'Not provided'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}