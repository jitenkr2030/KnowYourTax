"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  Shield, 
  Fingerprint, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock,
  Key,
  Bell,
  Database,
  Cloud,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  Info,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  BarChart3,
  FileText,
  Settings,
  Smartphone,
  Laptop,
  Globe,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  Fingerprint as FingerprintIcon
} from "lucide-react"

interface SecurityPrivacyFeaturesProps {
  userId: string
}

interface SecurityScore {
  overall: number
  password: number
  twoFactor: number
  dataEncryption: number
  privacySettings: number
  auditTrail: number
}

interface AuditLog {
  id: string
  action: string
  description: string
  timestamp: Date
  device: string
  location: string
  ipAddress: string
  risk: 'low' | 'medium' | 'high'
}

interface PrivacySetting {
  id: string
  name: string
  description: string
  enabled: boolean
  category: 'data' | 'sharing' | 'communication' | 'analytics'
}

interface ComplianceItem {
  id: string
  name: string
  status: 'compliant' | 'non_compliant' | 'pending'
  description: string
  lastChecked: Date
  nextDue: Date
}

const SAMPLE_SECURITY_SCORE: SecurityScore = {
  overall: 85,
  password: 90,
  twoFactor: 100,
  dataEncryption: 80,
  privacySettings: 75,
  auditTrail: 80
}

const SAMPLE_AUDIT_LOGS: AuditLog[] = [
  {
    id: '1',
    action: 'Login Attempt',
    description: 'Successful login from new device',
    timestamp: new Date('2024-01-15T10:30:00'),
    device: 'Chrome on Windows',
    location: 'Mumbai, Maharashtra',
    ipAddress: '192.168.1.100',
    risk: 'low'
  },
  {
    id: '2',
    action: 'Data Export',
    description: 'Tax data exported to PDF',
    timestamp: new Date('2024-01-14T15:45:00'),
    device: 'Mobile App',
    location: 'Mumbai, Maharashtra',
    ipAddress: '192.168.1.101',
    risk: 'low'
  },
  {
    id: '3',
    action: 'Password Change',
    description: 'Account password updated',
    timestamp: new Date('2024-01-13T09:15:00'),
    device: 'Chrome on Windows',
    location: 'Mumbai, Maharashtra',
    ipAddress: '192.168.1.100',
    risk: 'medium'
  },
  {
    id: '4',
    action: 'Failed Login',
    description: 'Multiple failed login attempts detected',
    timestamp: new Date('2024-01-12T22:30:00'),
    device: 'Unknown Device',
    location: 'Unknown Location',
    ipAddress: '203.0.113.1',
    risk: 'high'
  }
]

const SAMPLE_PRIVACY_SETTINGS: PrivacySetting[] = [
  {
    id: '1',
    name: 'Data Collection',
    description: 'Allow collection of usage data for app improvement',
    enabled: true,
    category: 'data'
  },
  {
    id: '2',
    name: 'Personalized Analytics',
    description: 'Use your data to provide personalized tax insights',
    enabled: true,
    category: 'analytics'
  },
  {
    id: '3',
    name: 'Marketing Communications',
    description: 'Receive promotional emails and notifications',
    enabled: false,
    category: 'communication'
  },
  {
    id: '4',
    name: 'Data Sharing with Partners',
    description: 'Share anonymized data with trusted partners',
    enabled: false,
    category: 'sharing'
  },
  {
    id: '5',
    name: 'Location Services',
    description: 'Use location for region-specific tax information',
    enabled: true,
    category: 'data'
  },
  {
    id: '6',
    name: 'Biometric Authentication',
    description: 'Enable fingerprint/face recognition for login',
    enabled: true,
    category: 'data'
  }
]

const SAMPLE_COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    id: '1',
    name: 'GDPR Compliance',
    status: 'compliant',
    description: 'Data processing and user rights compliant with GDPR',
    lastChecked: new Date('2024-01-01'),
    nextDue: new Date('2024-04-01')
  },
  {
    id: '2',
    name: 'Data Localization',
    status: 'compliant',
    description: 'All user data stored within India as per regulations',
    lastChecked: new Date('2024-01-01'),
    nextDue: new Date('2024-04-01')
  },
  {
    id: '3',
    name: 'Encryption Standards',
    status: 'compliant',
    description: 'Data encrypted using AES-256 encryption standards',
    lastChecked: new Date('2024-01-01'),
    nextDue: new Date('2024-02-01')
  },
  {
    id: '4',
    name: 'Audit Trail Maintenance',
    status: 'pending',
    description: 'Regular audit trail review and cleanup',
    lastChecked: new Date('2023-12-01'),
    nextDue: new Date('2024-01-20')
  }
]

export default function SecurityPrivacyFeatures({ userId }: SecurityPrivacyFeaturesProps) {
  const [securityScore, setSecurityScore] = useState<SecurityScore>(SAMPLE_SECURITY_SCORE)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(SAMPLE_AUDIT_LOGS)
  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>(SAMPLE_PRIVACY_SETTINGS)
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>(SAMPLE_COMPLIANCE_ITEMS)
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [showPassword, setShowPassword] = useState(false)

  const handlePrivacySettingToggle = (settingId: string, enabled: boolean) => {
    setPrivacySettings(prev => 
      prev.map(setting => 
        setting.id === settingId ? { ...setting, enabled } : setting
      )
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 70) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getComplianceStatus = (status: string) => {
    switch (status) {
      case 'compliant': return { color: 'text-green-600', icon: CheckCircle, text: 'Compliant' }
      case 'non_compliant': return { color: 'text-red-600', icon: AlertTriangle, text: 'Non-Compliant' }
      case 'pending': return { color: 'text-yellow-600', icon: Clock, text: 'Pending' }
      default: return { color: 'text-gray-600', icon: Info, text: 'Unknown' }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Security & Privacy</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Comprehensive protection for your tax data and privacy
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Shield className="h-3 w-3 mr-1" />
            Secure
          </Badge>
        </div>
      </div>

      {/* Security Score Overview */}
      <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Security Score: {securityScore.overall}/100
          </CardTitle>
          <CardDescription className="text-blue-100">Your account security health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${getScoreBgColor(securityScore.password)}`}>
                <Key className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-sm font-medium">Password</div>
              <div className={`text-xs ${getScoreColor(securityScore.password)}`}>
                {securityScore.password}/100
              </div>
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${getScoreBgColor(securityScore.twoFactor)}`}>
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-sm font-medium">2FA</div>
              <div className={`text-xs ${getScoreColor(securityScore.twoFactor)}`}>
                {securityScore.twoFactor}/100
              </div>
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${getScoreBgColor(securityScore.dataEncryption)}`}>
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-sm font-medium">Encryption</div>
              <div className={`text-xs ${getScoreColor(securityScore.dataEncryption)}`}>
                {securityScore.dataEncryption}/100
              </div>
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${getScoreBgColor(securityScore.privacySettings)}`}>
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-sm font-medium">Privacy</div>
              <div className={`text-xs ${getScoreColor(securityScore.privacySettings)}`}>
                {securityScore.privacySettings}/100
              </div>
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${getScoreBgColor(securityScore.auditTrail)}`}>
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-sm font-medium">Audit Trail</div>
              <div className={`text-xs ${getScoreColor(securityScore.auditTrail)}`}>
                {securityScore.auditTrail}/100
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Progress value={securityScore.overall} className="h-3 bg-white/20" />
            <div className="text-center text-sm mt-2">
              Overall Security Health: {securityScore.overall >= 90 ? 'Excellent' : securityScore.overall >= 70 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Settings</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Authentication Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Fingerprint className="h-5 w-5" />
                  Authentication Methods
                </CardTitle>
                <CardDescription>
                  Manage how you access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FingerprintIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Biometric Authentication</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Use fingerprint or face recognition</p>
                    </div>
                  </div>
                  <Switch
                    checked={biometricEnabled}
                    onCheckedChange={setBiometricEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Add extra security with 2FA</p>
                    </div>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Key className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Password Protection</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Strong password requirements</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Data Protection
                </CardTitle>
                <CardDescription>
                  How your data is secured and stored
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-200">End-to-End Encryption</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    All your data is encrypted using AES-256 encryption, both in transit and at rest.
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800 dark:text-blue-200">Secure Storage</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your data is stored in secure, compliant data centers within India.
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Cloud className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-purple-800 dark:text-purple-200">Regular Backups</span>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Automatic daily backups ensure your data is never lost.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                Security Recommendations
              </CardTitle>
              <CardDescription>
                Suggestions to improve your account security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Strong Password</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Your password meets all security requirements.
                  </p>
                  <Button size="sm" variant="outline">Change Password</Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium">2FA Enabled</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Two-factor authentication is active on your account.
                  </p>
                  <Button size="sm" variant="outline">Manage 2FA</Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium">Privacy Settings</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Review your privacy settings for optimal protection.
                  </p>
                  <Button size="sm">Review Settings</Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Data Encryption</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    All your data is securely encrypted.
                  </p>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
              <CardDescription>
                Control how your data is collected, used, and shared
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {privacySettings.map((setting) => (
                  <div key={setting.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{setting.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {setting.description}
                        </p>
                        <Badge variant="outline" className="text-xs mt-2">
                          {setting.category}
                        </Badge>
                      </div>
                      <Switch
                        checked={setting.enabled}
                        onCheckedChange={(enabled) => handlePrivacySettingToggle(setting.id, enabled)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Download className="h-5 w-5" />
                Data Management
              </CardTitle>
              <CardDescription>
                Download or delete your personal data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Download Your Data</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Export all your personal data in a portable format.
                  </p>
                  <Button size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-1" />
                    Download Data
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Delete Account</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Permanently delete your account and all associated data.
                  </p>
                  <Button size="sm" variant="destructive" className="w-full">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Audit Trail
              </CardTitle>
              <CardDescription>
                Complete log of all account activities and changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium">{log.action}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {log.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 mt-2">
                          <span className="flex items-center gap-1">
                            <Laptop className="h-3 w-3" />
                            {log.device}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {log.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {log.timestamp.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className={`text-xs ${getRiskColor(log.risk)}`}>
                        {log.risk}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Compliance Status
              </CardTitle>
              <CardDescription>
                Monitor compliance with data protection regulations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceItems.map((item) => {
                  const status = getComplianceStatus(item.status)
                  const StatusIcon = status.icon
                  return (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{item.name}</h4>
                            <Badge variant="outline" className={`text-xs ${status.color}`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.text}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600 dark:text-slate-400">Last Checked:</span>
                          <div className="font-medium">{item.lastChecked.toLocaleDateString()}</div>
                        </div>
                        <div>
                          <span className="text-slate-600 dark:text-slate-400">Next Due:</span>
                          <div className="font-medium">{item.nextDue.toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Data Processing Agreement
              </CardTitle>
              <CardDescription>
                Legal framework for data processing and user rights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    KnowYourTax.ai processes your data in accordance with applicable data protection laws including GDPR and Indian IT Act.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Your Rights</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Right to access your data</li>
                      <li>• Right to data portability</li>
                      <li>• Right to rectification</li>
                      <li>• Right to erasure</li>
                      <li>• Right to object</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Our Obligations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Process data lawfully and transparently</li>
                      <li>• Implement appropriate security measures</li>
                      <li>• Respect your privacy rights</li>
                      <li>• Notify you of data breaches</li>
                      <li>• Comply with regulations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}