"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  ArrowLeft, 
  Smartphone, 
  Mail, 
  Chrome, 
  Apple, 
  Eye, 
  EyeOff,
  Shield,
  Users,
  BarChart3,
  FileText,
  Calculator
} from "lucide-react"

interface OnboardingProps {
  onComplete: () => void
  onGuestMode: () => void
}

export default function Onboarding({ onComplete, onGuestMode }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")

  const steps = [
    {
      title: "Welcome to KnowYourTax.ai",
      description: "Track all your taxes in one place",
      icon: BarChart3
    },
    {
      title: "Choose Your Path",
      description: "Sign up or explore as guest",
      icon: Users
    },
    {
      title: "Create Account",
      description: "Join thousands of informed taxpayers",
      icon: Shield
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSendOTP = () => {
    // Simulate sending OTP
    console.log("Sending OTP to:", phoneNumber)
  }

  const handleVerifyOTP = () => {
    // Simulate OTP verification
    console.log("Verifying OTP:", otp)
    onComplete()
  }

  const StepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {steps[currentStep].title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {steps[currentStep].description}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                  Why KnowYourTax.ai?
                </h3>
                <ul className="space-y-2 text-sm text-orange-700 dark:text-orange-300">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    Track all your taxes in one place
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    Understand where your money goes
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    Get insights on your tax contributions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    Plan better with tax calculations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {steps[currentStep].title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {steps[currentStep].description}
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => setCurrentStep(2)} 
                className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <div className="flex items-center justify-center gap-3">
                  <Shield className="h-5 w-5" />
                  <span>Create Account</span>
                </div>
              </Button>
              
              <Button 
                onClick={onGuestMode} 
                variant="outline" 
                className="w-full h-14"
              >
                <div className="flex items-center justify-center gap-3">
                  <Eye className="h-5 w-5" />
                  <span>Continue as Guest</span>
                </div>
              </Button>
              
              <div className="relative">
                <Separator className="my-4" />
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 px-2 text-xs text-slate-500">
                  OR
                </span>
              </div>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full h-12">
                  <Chrome className="h-4 w-4 mr-2" />
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <Apple className="h-4 w-4 mr-2" />
                  Continue with Apple
                </Button>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {steps[currentStep].title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {steps[currentStep].description}
              </p>
            </div>

            <Tabs defaultValue="mobile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mobile" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Mobile
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="mobile" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={handleSendOTP} 
                  className="w-full"
                  disabled={!phoneNumber}
                >
                  Send OTP
                </Button>
                
                {phoneNumber && (
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                    />
                    <Button 
                      onClick={handleVerifyOTP} 
                      className="w-full"
                      disabled={otp.length !== 6}
                    >
                      Verify & Continue
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  onClick={onComplete} 
                  className="w-full"
                  disabled={!email || !password}
                >
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">₹</span>
            </div>
          </div>
          <div className="flex justify-center gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? "bg-orange-500" : "bg-slate-300 dark:bg-slate-600"
                }`}
              />
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <StepContent />
          
          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            {currentStep === 0 && (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}