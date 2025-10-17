'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Key, 
  Fingerprint,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  FileText,
  Users,
  Settings,
  Activity,
  BarChart3,
  Server,
  Wifi,
  WifiOff,
  Smartphone,
  Laptop,
  Monitor,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  UserCheck,
  UserX,
  KeyRound,
  ShieldHalf,
  LockKeyhole,
  UnlockKeyhole
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { format } from 'date-fns'

interface SecurityEvent {
  id: string
  type: 'login' | 'logout' | 'failed_login' | 'password_change' | 'data_access' | 'data_export'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  timestamp: Date
  ipAddress: string
  userAgent: string
  userId: string
  userName: string
  location: string
  status: 'success' | 'failed' | 'blocked'
}

interface DataProtectionMetric {
  id: string
  name: string
  value: number
  target: number
  status: 'good' | 'warning' | 'poor'
  description: string
}

interface ComplianceCertification {
  id: string
  name: string
  authority: string
  issuedDate: Date
  expiryDate: Date
  status: 'active' | 'expired' | 'pending'
  score: number
}

const securityEvents: SecurityEvent[] = [
  {
    id: '1',
    type: 'login',
    severity: 'low',
    description: 'Successful login from new device',
    timestamp: new Date('2024-01-20T10:30:00'),
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome/120.0.0.0',
    userId: 'user123',
    userName: 'John Doe',
    location: 'Bangalore, India',
    status: 'success'
  },
  {
    id: '2',
    type: 'failed_login',
    severity: 'medium',
    description: 'Failed login attempt - incorrect password',
    timestamp: new Date('2024-01-20T09:15:00'),
    ipAddress: '203.0.113.1',
    userAgent: 'Mozilla/5.0',
    userId: 'user123',
    userName: 'John Doe',
    location: 'Unknown',
    status: 'failed'
  },
  {
    id: '3',
    type: 'data_access',
    severity: 'medium',
    description: 'Access to sensitive tax documents',
    timestamp: new Date('2024-01-19T15:45:00'),
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome/120.0.0.0',
    userId: 'user456',
    userName: 'Jane Smith',
    location: 'Mumbai, India',
    status: 'success'
  },
  {
    id: '4',
    type: 'data_export',
    severity: 'high',
    description: 'Bulk export of financial data',
    timestamp: new Date('2024-01-18T14:20:00'),
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome/120.0.0.0',
    userId: 'user123',
    userName: 'John Doe',
    location: 'Bangalore, India',
    status: 'success'
  }
]

const dataProtectionMetrics: DataProtectionMetric[] = [
  {
    id: '1',
    name: 'Data Encryption Coverage',
    value: 98,
    target: 100,
    status: 'good',
    description: 'Percentage of data encrypted at rest and in transit'
  },
  {
    id: '2',
    name: 'Access Control Compliance',
    value: 95,
    target: 100,
    status: 'good',
    description: 'Implementation of role-based access controls'
  },
  {
    id: '3',
    name: 'Audit Trail Completeness',
    value: 100,
    target: 100,
    status: 'good',
    description: 'Completeness of security audit logs'
  },
  {
    id: '4',
    name: 'Vulnerability Resolution',
    value: 85,
    target: 95,
    status: 'warning',
    description: 'Time to resolve security vulnerabilities'
  },
  {
    id: '5',
    name: 'Incident Response Time',
    value: 75,
    target: 90,
    status: 'poor',
    description: 'Average time to respond to security incidents'
  }
]

const complianceCertifications: ComplianceCertification[] = [
  {
    id: '1',
    name: 'ISO 27001:2022',
    authority: 'ISO',
    issuedDate: new Date('2023-06-15'),
    expiryDate: new Date('2026-06-15'),
    status: 'active',
    score: 92
  },
  {
    id: '2',
    name: 'SOC 2 Type II',
    authority: 'AICPA',
    issuedDate: new Date('2023-09-20'),
    expiryDate: new Date('2024-09-20'),
    status: 'active',
    score: 88
  },
  {
    id: '3',
    name: 'GDPR Compliance',
    authority: 'EU Commission',
    issuedDate: new Date('2023-01-10'),
    expiryDate: new Date('2024-01-10'),
    status: 'expired',
    score: 85
  }
]

const getSeverityColor = (severity: SecurityEvent['severity']) => {
  switch (severity) {
    case 'critical': return 'bg-red-100 text-red-800 border-red-200'
    case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusColor = (status: SecurityEvent['status']) => {
  switch (status) {
    case 'success': return 'bg-green-100 text-green-800'
    case 'failed': return 'bg-red-100 text-red-800'
    case 'blocked': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getMetricStatusColor = (status: DataProtectionMetric['status']) => {
  switch (status) {
    case 'good': return 'text-green-600'
    case 'warning': return 'text-yellow-600'
    case 'poor': return 'text-red-600'
    default: return 'text-gray-600'
  }
}

const getCertificationStatusColor = (status: ComplianceCertification['status']) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800'
    case 'expired': return 'bg-red-100 text-red-800'
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function SecurityComplianceFeatures() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [encryptionEnabled, setEncryptionEnabled] = useState(true)
  const [auditLoggingEnabled, setAuditLoggingEnabled] = useState(true)

  const criticalEvents = securityEvents.filter(event => event.severity === 'critical' || event.severity === 'high')
  const recentEvents = securityEvents.slice(0, 5)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security & Compliance</h1>
          <p className="text-muted-foreground">Manage data protection, privacy controls, and compliance monitoring</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Enterprise Grade Security
        </Badge>
      </div>

      {/* Security Alert Banner */}
      {criticalEvents.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <ShieldAlert className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {criticalEvents.length} critical security event{criticalEvents.length > 1 ? 's' : ''} detected. Immediate attention required.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data-protection">Data Protection</TabsTrigger>
          <TabsTrigger value="access-control">Access Control</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="audit-trail">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Security Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                <ShieldCheck className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">92%</div>
                <p className="text-xs text-muted-foreground">
                  Excellent security posture
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  Currently logged in
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Events</CardTitle>
                <Activity className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {securityEvents.filter(e => e.severity === 'high' || e.severity === 'critical').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last 24 hours
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">88%</div>
                <p className="text-xs text-muted-foreground">
                  Regulatory compliant
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Security Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Recent Security Events
              </CardTitle>
              <CardDescription>
                Latest security monitoring and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getSeverityColor(event.severity)}`}>
                          {event.type === 'login' && <UserCheck className="h-4 w-4" />}
                          {event.type === 'failed_login' && <UserX className="h-4 w-4" />}
                          {event.type === 'data_access' && <Database className="h-4 w-4" />}
                          {event.type === 'data_export' && <FileText className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className="font-medium">{event.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.userName} • {event.location} • {format(event.timestamp, 'MMM dd, yyyy HH:mm')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      <Badge className={getSeverityColor(event.severity)}>
                        {event.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Controls */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Security Controls</CardTitle>
                <CardDescription>
                  Manage your security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Encryption</Label>
                    <p className="text-sm text-muted-foreground">Encrypt sensitive data at rest</p>
                  </div>
                  <Switch
                    checked={encryptionEnabled}
                    onCheckedChange={setEncryptionEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all system activities</p>
                  </div>
                  <Switch
                    checked={auditLoggingEnabled}
                    onCheckedChange={setAuditLoggingEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common security tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <KeyRound className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Fingerprint className="h-4 w-4 mr-2" />
                  Setup 2FA
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <ShieldHalf className="h-4 w-4 mr-2" />
                  Security Audit
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Compliance Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data-protection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Protection Metrics</CardTitle>
              <CardDescription>
                Monitor your data protection and privacy controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dataProtectionMetrics.map((metric) => (
                  <div key={metric.id} className="space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{metric.name}</div>
                        <div className="text-sm text-muted-foreground">{metric.description}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getMetricStatusColor(metric.status)}`}>
                          {metric.value}%
                        </div>
                        <div className="text-sm text-muted-foreground">Target: {metric.target}%</div>
                      </div>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Encryption Status</CardTitle>
              <CardDescription>
                Overview of data encryption across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <Lock className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="font-medium">Data at Rest</div>
                  <div className="text-sm text-muted-foreground">AES-256</div>
                  <Badge className="bg-green-100 text-green-800 mt-2">Encrypted</Badge>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <Wifi className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="font-medium">Data in Transit</div>
                  <div className="text-sm text-muted-foreground">TLS 1.3</div>
                  <Badge className="bg-green-100 text-green-800 mt-2">Encrypted</Badge>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <Database className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="font-medium">Backup Data</div>
                  <div className="text-sm text-muted-foreground">Encrypted</div>
                  <Badge className="bg-green-100 text-green-800 mt-2">Protected</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Privacy Settings</CardTitle>
              <CardDescription>
                Configure your data privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Your data is protected with end-to-end encryption. We comply with all major data protection regulations including GDPR, CCPA, and Indian IT Act.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Data Collection</div>
                    <div className="text-sm text-muted-foreground">Minimal data collection for essential services</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Optimized</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Data Retention</div>
                    <div className="text-sm text-muted-foreground">Data retained only as long as necessary</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Third-party Sharing</div>
                    <div className="text-sm text-muted-foreground">No data shared with third parties without consent</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Restricted</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access-control" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Control Overview</CardTitle>
              <CardDescription>
                Manage user permissions and access levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-4">User Roles</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Administrator</div>
                        <div className="text-sm text-muted-foreground">Full system access</div>
                      </div>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Tax Professional</div>
                        <div className="text-sm text-muted-foreground">Tax filing and compliance</div>
                      </div>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Viewer</div>
                        <div className="text-sm text-muted-foreground">Read-only access</div>
                      </div>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Laptop className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">John Doe</div>
                          <div className="text-sm text-muted-foreground">Chrome • Bangalore</div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Jane Smith</div>
                          <div className="text-sm text-muted-foreground">Safari • Mumbai</div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Admin User</div>
                          <div className="text-sm text-muted-foreground">Firefox • Delhi</div>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Idle</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permission Management</CardTitle>
              <CardDescription>
                Granular control over user permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Tax Return Access</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Create tax returns</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Edit tax returns</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Submit tax returns</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>View tax returns</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Document Access</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Upload documents</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Download documents</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Share documents</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Delete documents</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Certifications</CardTitle>
              <CardDescription>
                Our compliance with industry standards and regulations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceCertifications.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">{cert.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {cert.authority} • Score: {cert.score}/100
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Issued: {format(cert.issuedDate, 'MMM dd, yyyy')} • 
                            Expires: {format(cert.expiryDate, 'MMM dd, yyyy')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge className={getCertificationStatusColor(cert.status)}>
                      {cert.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance</CardTitle>
              <CardDescription>
                Compliance with tax and data protection regulations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Tax Regulations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Income Tax Act, 1961</div>
                        <div className="text-sm text-muted-foreground">Indian tax regulations</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">GST Act, 2017</div>
                        <div className="text-sm text-muted-foreground">Goods and Services Tax</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">TDS Provisions</div>
                        <div className="text-sm text-muted-foreground">Tax deduction at source</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Data Protection</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">GDPR</div>
                        <div className="text-sm text-muted-foreground">General Data Protection Regulation</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">CCPA</div>
                        <div className="text-sm text-muted-foreground">California Consumer Privacy Act</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">IT Act, 2000</div>
                        <div className="text-sm text-muted-foreground">Indian Information Technology Act</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit-trail" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>
                Complete log of all system activities and changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input placeholder="Search audit events..." />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="data_access">Data Access</SelectItem>
                      <SelectItem value="data_export">Data Export</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Severity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {securityEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>{format(event.timestamp, 'dd MMM yyyy, HH:mm')}</TableCell>
                          <TableCell>{event.userName}</TableCell>
                          <TableCell className="capitalize">{event.type.replace('_', ' ')}</TableCell>
                          <TableCell className="max-w-xs truncate">{event.description}</TableCell>
                          <TableCell className="font-mono">{event.ipAddress}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getSeverityColor(event.severity)}>
                              {event.severity}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audit Log Analytics</CardTitle>
              <CardDescription>
                Insights from audit trail data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{securityEvents.length}</div>
                  <div className="text-sm text-muted-foreground">Total Events</div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {securityEvents.filter(e => e.status === 'success').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Successful</div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {securityEvents.filter(e => e.status === 'failed').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Failed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}