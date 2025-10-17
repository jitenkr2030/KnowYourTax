"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Send, 
  Settings, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Smartphone,
  Filter
} from "lucide-react"

interface NotificationTemplate {
  id: string
  name: string
  description: string
  type: 'email' | 'whatsapp' | 'both'
  category: string
  enabled: boolean
}

interface NotificationHistory {
  id: string
  type: 'email' | 'whatsapp'
  template: string
  recipient: string
  status: 'sent' | 'pending' | 'failed'
  sentAt: string
  message: string
}

const notificationTemplates: NotificationTemplate[] = [
  {
    id: 'payment-confirmation',
    name: 'Payment Confirmation',
    description: 'Sent when a payment is successfully processed',
    type: 'both',
    category: 'Payment',
    enabled: true
  },
  {
    id: 'subscription-reminder',
    name: 'Subscription Reminder',
    description: 'Sent before subscription expires',
    type: 'both',
    category: 'Subscription',
    enabled: true
  },
  {
    id: 'tax-payment-reminder',
    name: 'Tax Payment Reminder',
    description: 'Reminds about upcoming tax payments',
    type: 'both',
    category: 'Tax',
    enabled: true
  },
  {
    id: 'bill-processing-update',
    name: 'Bill Processing Update',
    description: 'Updates on bill scanning and processing status',
    type: 'both',
    category: 'Processing',
    enabled: true
  },
  {
    id: 'monthly-report',
    name: 'Monthly Report',
    description: 'Monthly tax summary and analytics report',
    type: 'email',
    category: 'Reports',
    enabled: true
  },
  {
    id: 'security-alert',
    name: 'Security Alert',
    description: 'Important security notifications',
    type: 'both',
    category: 'Security',
    enabled: true
  }
]

const mockHistory: NotificationHistory[] = [
  {
    id: '1',
    type: 'email',
    template: 'payment-confirmation',
    recipient: 'user@example.com',
    status: 'sent',
    sentAt: '2024-01-15 10:30:00',
    message: 'Payment confirmation for Professional Plan subscription'
  },
  {
    id: '2',
    type: 'whatsapp',
    template: 'subscription-reminder',
    recipient: '+919876543210',
    status: 'sent',
    sentAt: '2024-01-14 09:00:00',
    message: 'Your subscription will expire in 7 days'
  },
  {
    id: '3',
    type: 'email',
    template: 'tax-payment-reminder',
    recipient: 'user@example.com',
    status: 'pending',
    sentAt: '2024-01-13 14:15:00',
    message: 'Income Tax payment reminder for January 2024'
  },
  {
    id: '4',
    type: 'whatsapp',
    template: 'bill-processing-update',
    recipient: '+919876543210',
    status: 'failed',
    sentAt: '2024-01-12 16:45:00',
    message: 'Bill processing completed for restaurant_bill.jpg'
  }
]

interface NotificationSettings {
  email: {
    enabled: boolean
    address: string
    frequency: 'immediate' | 'daily' | 'weekly'
  }
  whatsapp: {
    enabled: boolean
    number: string
    frequency: 'immediate' | 'daily' | 'weekly'
  }
  sound: boolean
  vibration: boolean
}

export default function NotificationsManager() {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      enabled: true,
      address: 'user@example.com',
      frequency: 'immediate'
    },
    whatsapp: {
      enabled: true,
      number: '+919876543210',
      frequency: 'immediate'
    },
    sound: true,
    vibration: true
  })

  const [templates, setTemplates] = useState<NotificationTemplate[]>(notificationTemplates)
  const [history, setHistory] = useState<NotificationHistory[]>(mockHistory)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [testMessage, setTestMessage] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'failed': return <AlertCircle className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const toggleTemplate = (templateId: string) => {
    setTemplates(templates.map(template => 
      template.id === templateId 
        ? { ...template, enabled: !template.enabled }
        : template
    ))
  }

  const sendTestNotification = async () => {
    if (!selectedTemplate || !testMessage) return

    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: selectedTemplate,
          userEmail: settings.email.address,
          userPhone: settings.whatsapp.number,
          // Mock data based on template type
          ...(selectedTemplate === 'payment-confirmation' && {
            paymentDetails: {
              amount: 1999,
              orderId: 'test_order_123',
              paymentId: 'test_payment_123',
              taxType: 'Subscription',
              date: new Date().toISOString()
            }
          }),
          ...(selectedTemplate === 'subscription-reminder' && {
            subscriptionDetails: {
              plan: 'Professional',
              expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              daysLeft: 7
            }
          })
        })
      })

      const result = await response.json()
      
      if (result.success) {
        // Add to history
        const newHistory: NotificationHistory = {
          id: Date.now().toString(),
          type: 'email',
          template: selectedTemplate,
          recipient: settings.email.address,
          status: 'sent',
          sentAt: new Date().toISOString(),
          message: testMessage
        }
        
        setHistory([newHistory, ...history])
        setTestMessage('')
        alert('Test notification sent successfully!')
      } else {
        alert('Failed to send test notification')
      }
    } catch (error) {
      console.error('Test notification error:', error)
      alert('Failed to send test notification')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications Manager</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your notification preferences and view history
        </p>
      </div>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="test">Test</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Email Notifications</span>
                </CardTitle>
                <CardDescription>Configure email notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-enabled">Enable Email Notifications</Label>
                  <Switch
                    id="email-enabled"
                    checked={settings.email.enabled}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, enabled: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-address">Email Address</Label>
                  <Input
                    id="email-address"
                    type="email"
                    value={settings.email.address}
                    onChange={(e) => 
                      setSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, address: e.target.value }
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-frequency">Frequency</Label>
                  <Select 
                    value={settings.email.frequency}
                    onValueChange={(value: any) => 
                      setSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, frequency: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>WhatsApp Notifications</span>
                </CardTitle>
                <CardDescription>Configure WhatsApp notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="whatsapp-enabled">Enable WhatsApp Notifications</Label>
                  <Switch
                    id="whatsapp-enabled"
                    checked={settings.whatsapp.enabled}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        whatsapp: { ...prev.whatsapp, enabled: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-number">Phone Number</Label>
                  <Input
                    id="whatsapp-number"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={settings.whatsapp.number}
                    onChange={(e) => 
                      setSettings(prev => ({
                        ...prev,
                        whatsapp: { ...prev.whatsapp, number: e.target.value }
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp-frequency">Frequency</Label>
                  <Select 
                    value={settings.whatsapp.frequency}
                    onValueChange={(value: any) => 
                      setSettings(prev => ({
                        ...prev,
                        whatsapp: { ...prev.whatsapp, frequency: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>General Settings</span>
                </CardTitle>
                <CardDescription>General notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-enabled">Sound</Label>
                  <Switch
                    id="sound-enabled"
                    checked={settings.sound}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, sound: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="vibration-enabled">Vibration</Label>
                  <Switch
                    id="vibration-enabled"
                    checked={settings.vibration}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, vibration: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>Manage which notifications you receive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline">{template.category}</Badge>
                        <div className="flex items-center space-x-1">
                          {template.type === 'email' && <Mail className="h-3 w-3" />}
                          {template.type === 'whatsapp' && <MessageSquare className="h-3 w-3" />}
                          {template.type === 'both' && (
                            <>
                              <Mail className="h-3 w-3" />
                              <MessageSquare className="h-3 w-3" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={template.enabled}
                      onCheckedChange={() => toggleTemplate(template.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Send Test Notification</CardTitle>
              <CardDescription>Test your notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-select">Select Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="test-message">Test Message</Label>
                <Textarea
                  id="test-message"
                  placeholder="Enter your test message..."
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                />
              </div>

              <Button 
                onClick={sendTestNotification}
                disabled={!selectedTemplate || !testMessage}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Test Notification
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>View your recent notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent At</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {notification.type === 'email' ? (
                            <Mail className="h-4 w-4" />
                          ) : (
                            <MessageSquare className="h-4 w-4" />
                          )}
                          <span className="capitalize">{notification.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {templates.find(t => t.id === notification.template)?.name || notification.template}
                      </TableCell>
                      <TableCell>{notification.recipient}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(notification.status)}>
                          {getStatusIcon(notification.status)}
                          <span className="ml-1 capitalize">{notification.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(notification.sentAt).toLocaleString()}</TableCell>
                      <TableCell className="max-w-xs truncate">{notification.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
