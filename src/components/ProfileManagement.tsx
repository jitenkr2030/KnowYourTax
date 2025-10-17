"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  User, 
  Shield, 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Save,
  Camera
} from "lucide-react"

interface ProfileManagementProps {
  user: {
    id: string
    email: string
    name?: string
    phone?: string
    dateOfBirth?: string
    panNumber?: string
    aadhaarNumber?: string
    kycStatus: string
    preferredLanguage: string
  }
  profile?: {
    id: string
    employmentType?: string
    employerName?: string
    designation?: string
    businessName?: string
    businessType?: string
    addressLine1?: string
    addressLine2?: string
    city?: string
    state?: string
    pincode?: string
    taxRegime?: string
    taxSlab?: string
  }
  onSave: (userData: any, profileData: any) => void
}

export default function ProfileManagement({ user, profile, onSave }: ProfileManagementProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    dateOfBirth: user.dateOfBirth || "",
    panNumber: user.panNumber || "",
    aadhaarNumber: user.aadhaarNumber || "",
    preferredLanguage: user.preferredLanguage
  })

  const [profileData, setProfileData] = useState({
    employmentType: profile?.employmentType || "",
    employerName: profile?.employerName || "",
    designation: profile?.designation || "",
    businessName: profile?.businessName || "",
    businessType: profile?.businessType || "",
    addressLine1: profile?.addressLine1 || "",
    addressLine2: profile?.addressLine2 || "",
    city: profile?.city || "",
    state: profile?.state || "",
    pincode: profile?.pincode || "",
    taxRegime: profile?.taxRegime || "",
    taxSlab: profile?.taxSlab || ""
  })

  const handleSave = () => {
    onSave(userData, profileData)
    setIsEditing(false)
  }

  const getKYCStatusBadge = () => {
    switch (user.kycStatus) {
      case "VERIFIED":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )
      case "REJECTED":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Profile Management</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage your personal and KYC information</p>
        </div>
        <div className="flex items-center gap-2">
          {getKYCStatusBadge()}
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </div>

      {/* KYC Status Alert */}
      {user.kycStatus === "PENDING" && (
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Your KYC verification is pending. Please complete your profile and upload required documents for verification.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Basic personal details and KYC information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  value={user.email}
                  disabled
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  disabled={!isEditing}
                  placeholder="+91 98765 43210"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={userData.dateOfBirth}
                  onChange={(e) => setUserData({...userData, dateOfBirth: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input
                  id="panNumber"
                  value={userData.panNumber}
                  onChange={(e) => setUserData({...userData, panNumber: e.target.value.toUpperCase()})}
                  disabled={!isEditing}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                <Input
                  id="aadhaarNumber"
                  value={userData.aadhaarNumber}
                  onChange={(e) => setUserData({...userData, aadhaarNumber: e.target.value})}
                  disabled={!isEditing}
                  placeholder="1234 5678 9012"
                  maxLength={14}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferredLanguage">Preferred Language</Label>
                <Select 
                  value={userData.preferredLanguage} 
                  onValueChange={(value) => setUserData({...userData, preferredLanguage: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EN">English</SelectItem>
                    <SelectItem value="HI">Hindi</SelectItem>
                    <SelectItem value="BN">Bengali</SelectItem>
                    <SelectItem value="TA">Tamil</SelectItem>
                    <SelectItem value="TE">Telugu</SelectItem>
                    <SelectItem value="MR">Marathi</SelectItem>
                    <SelectItem value="GU">Gujarati</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employment/Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Employment & Business Information
            </CardTitle>
            <CardDescription>Your professional details for tax calculations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select 
                  value={profileData.employmentType} 
                  onValueChange={(value) => setProfileData({...profileData, employmentType: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SALARIED">Salaried</SelectItem>
                    <SelectItem value="SELF_EMPLOYED">Self Employed</SelectItem>
                    <SelectItem value="BUSINESS">Business</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employerName">Employer/Business Name</Label>
                <Input
                  id="employerName"
                  value={profileData.employerName}
                  onChange={(e) => setProfileData({...profileData, employerName: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={profileData.designation}
                  onChange={(e) => setProfileData({...profileData, designation: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type (if applicable)</Label>
                <Input
                  id="businessType"
                  value={profileData.businessType}
                  onChange={(e) => setProfileData({...profileData, businessType: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="taxRegime">Tax Regime</Label>
                <Select 
                  value={profileData.taxRegime} 
                  onValueChange={(value) => setProfileData({...profileData, taxRegime: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tax regime" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OLD">Old Regime</SelectItem>
                    <SelectItem value="NEW">New Regime</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="taxSlab">Tax Slab</Label>
                <Select 
                  value={profileData.taxSlab} 
                  onValueChange={(value) => setProfileData({...profileData, taxSlab: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tax slab" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0% (Up to ₹2.5L)</SelectItem>
                    <SelectItem value="5">5% (₹2.5L - ₹5L)</SelectItem>
                    <SelectItem value="10">10% (₹5L - ₹7.5L)</SelectItem>
                    <SelectItem value="15">15% (₹7.5L - ₹10L)</SelectItem>
                    <SelectItem value="20">20% (₹10L - ₹12.5L)</SelectItem>
                    <SelectItem value="25">25% (₹12.5L - ₹15L)</SelectItem>
                    <SelectItem value="30">30% (Above ₹15L)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Information
            </CardTitle>
            <CardDescription>Your residential address for communication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  value={profileData.addressLine1}
                  onChange={(e) => setProfileData({...profileData, addressLine1: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Street address, apartment number"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  value={profileData.addressLine2}
                  onChange={(e) => setProfileData({...profileData, addressLine2: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Landmark, area, locality"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={profileData.city}
                  onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={profileData.state}
                  onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input
                  id="pincode"
                  value={profileData.pincode}
                  onChange={(e) => setProfileData({...profileData, pincode: e.target.value})}
                  disabled={!isEditing}
                  placeholder="110001"
                  maxLength={6}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KYC Document Upload */}
        {user.kycStatus !== "VERIFIED" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                KYC Document Upload
              </CardTitle>
              <CardDescription>Upload documents for KYC verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <p className="font-medium">PAN Card</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Upload PAN card front</p>
                    </div>
                    <Button variant="outline" size="sm">Upload</Button>
                  </div>
                </div>
                
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <p className="font-medium">Aadhaar Card</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Upload Aadhaar card front</p>
                    </div>
                    <Button variant="outline" size="sm">Upload</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Submit for Verification</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}