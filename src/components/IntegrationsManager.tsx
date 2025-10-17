"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Link as LinkIcon, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ExternalLink,
  Settings,
  RefreshCw,
  Plus,
  Database,
  FileText,
  MessageSquare,
  Users,
  Building,
  Cloud,
  Zap
} from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  category: 'accounting' | 'productivity' | 'storage' | 'communication'
  enabled: boolean
  connected: boolean
  icon: any
  lastSync?: Date
  config: any
}

interface SyncStatus {
  id: string
  name: string
  status: 'syncing' | 'synced' | 'error'
  lastSync: Date
  nextSync: Date
}

const mockIntegrations: Integration[] = [
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Connect to QuickBooks for accounting integration',
    category: 'accounting',
    enabled: false,
    connected: false,
    icon: Building,
    config: {}
  },
  {
    id: 'zoho-books',
    name: 'Zoho Books',
    description: 'Connect to Zoho Books for accounting integration',
    category: 'accounting',
    enabled: false,
    connected: false,
    icon: FileText,
    config: {}
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Store and access tax documents on Google Drive',
    category: 'storage',
    enabled: true,
    connected: true,
    icon: Cloud,
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    config: {
      accessToken: 'mock-token',
      folderId: 'tax-documents'
    }
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Export tax data to Google Sheets',
    category: 'productivity',
    enabled: true,
    connected: true,
    icon: Database,
    lastSync: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    config: {
      accessToken: 'mock-token',
      spreadsheetId: 'tax-data-sheet'
    }
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get tax notifications and updates in Slack',
    category: 'communication',
    enabled: false,
    connected: false,
    icon: MessageSquare,
    config: {}
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Get tax notifications and updates in Teams',
    category: 'communication',
    enabled: false,
    connected: false,
    icon: Users,
    config: {}
  },
  {
    id: 'microsoft-excel',
    name: 'Microsoft Excel',
    description: 'Export tax data to Microsoft Excel Online',
    category: 'productivity',
    enabled: false,
    connected: false,
    icon: FileText,
    config: {}
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Store and access tax documents on Dropbox',
    category: 'storage',
    enabled: false,
    connected: false,
    icon: Cloud,
    config: {}
  }
]

const mockSyncStatus: SyncStatus[] = [
  {
    id: 'google-drive',
    name: 'Google Drive',
    status: 'synced',
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
    nextSync: new Date(Date.now() + 4 * 60 * 60 * 1000)
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    status: 'synced',
    lastSync: new Date(Date.now() - 30 * 60 * 1000),
    nextSync: new Date(Date.now() + 2 * 60 * 60 * 1000)
  }
]

export default function IntegrationsManager() {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations)
  const [syncStatus, setSyncStatus] = useState<SyncStatus[]>(mockSyncStatus)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [connectingIntegration, setConnectingIntegration] = useState<string | null>(null)

  const categories = [
    { id: 'all', name: 'All', icon: Zap },
    { id: 'accounting', name: 'Accounting', icon: Building },
    { id: 'productivity', name: 'Productivity', icon: Database },
    { id: 'storage', name: 'Storage', icon: Cloud },
    { id: 'communication', name: 'Communication', icon: MessageSquare }
  ]

  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory)

  const toggleIntegration = (integrationId: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === integrationId 
        ? { ...integration, enabled: !integration.enabled }
        : integration
    ))
  }

  const connectIntegration = async (integrationId: string) => {
    setConnectingIntegration(integrationId)
    
    try {
      const authUrl = await getIntegrationAuthUrl(integrationId)
      if (authUrl) {
        // In a real app, this would open the OAuth flow
        window.open(authUrl, '_blank')
      }
    } catch (error) {
      console.error('Connection error:', error)
    } finally {
      setConnectingIntegration(null)
    }
  }

  const disconnectIntegration = async (integrationId: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === integrationId 
        ? { ...integration, connected: false, config: {} }
        : integration
    ))
  }

  const syncIntegration = async (integrationId: string) => {
    setSyncStatus(syncStatus.map(status => 
      status.id === integrationId 
        ? { ...status, status: 'syncing' as const }
        : status
    ))

    // Simulate sync process
    setTimeout(() => {
      setSyncStatus(syncStatus.map(status => 
        status.id === integrationId 
          ? { 
              ...status, 
              status: 'synced' as const,
              lastSync: new Date(),
              nextSync: new Date(Date.now() + 2 * 60 * 60 * 1000)
            }
          : status
      ))
      
      setIntegrations(integrations.map(integration => 
        integration.id === integrationId 
          ? { ...integration, lastSync: new Date() }
          : integration
      ))
    }, 2000)
  }

  const getIntegrationAuthUrl = async (integrationId: string): Promise<string | null> => {
    // Mock implementation - in real app, this would call the API
    const authUrls: Record<string, string> = {
      'quickbooks': 'https://quickbooks.api.intuit.com/connect/oauth2',
      'zoho-books': 'https://accounts.zoho.com/oauth/v2/auth',
      'google-drive': 'https://accounts.google.com/oauth2/auth',
      'google-sheets': 'https://accounts.google.com/oauth2/auth',
      'slack': 'https://slack.com/oauth/v2/authorize',
      'microsoft-teams': 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      'microsoft-excel': 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      'dropbox': 'https://www.dropbox.com/oauth2/authorize'
    }

    return authUrls[integrationId] || null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'bg-green-100 text-green-800'
      case 'syncing': return 'bg-blue-100 text-blue-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced': return <CheckCircle className="h-4 w-4" />
      case 'syncing': return <Clock className="h-4 w-4 animate-spin" />
      case 'error': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Integrations Manager</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Connect KnowYourTax.ai with your favorite apps and services
        </p>
      </div>

      <Tabs defaultValue="discover" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="sync">Sync Status</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          {/* Category Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center space-x-1"
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <integration.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                    <Switch
                      checked={integration.enabled}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm">
                    {integration.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge 
                      variant={integration.connected ? "default" : "secondary"}
                      className={integration.connected ? "bg-green-100 text-green-800" : ""}
                    >
                      {integration.connected ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>

                  {integration.lastSync && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Sync:</span>
                      <span className="text-sm">
                        {new Date(integration.lastSync).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {integration.connected ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => syncIntegration(integration.id)}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Sync
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => disconnectIntegration(integration.id)}
                        >
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => connectIntegration(integration.id)}
                        disabled={!integration.enabled || connectingIntegration === integration.id}
                      >
                        {connectingIntegration === integration.id ? (
                          <>
                            <Clock className="h-4 w-4 mr-1 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <LinkIcon className="h-4 w-4 mr-1" />
                            Connect
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connected" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Integrations</CardTitle>
              <CardDescription>Manage your active integrations</CardDescription>
            </CardHeader>
            <CardContent>
              {integrations.filter(i => i.connected).length === 0 ? (
                <div className="text-center py-8">
                  <LinkIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No connected integrations
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Connect your first integration to get started
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Integration</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Sync</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {integrations.filter(i => i.connected).map((integration) => (
                      <TableRow key={integration.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <integration.icon className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">{integration.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{integration.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Connected
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {integration.lastSync 
                            ? new Date(integration.lastSync).toLocaleString()
                            : 'Never'
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => syncIntegration(integration.id)}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => disconnectIntegration(integration.id)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sync Status</CardTitle>
              <CardDescription>Monitor your integration sync status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Integration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead>Next Sync</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {syncStatus.map((status) => {
                    const integration = integrations.find(i => i.id === status.id)
                    return (
                      <TableRow key={status.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {integration && (
                              <>
                                <integration.icon className="h-5 w-5 text-blue-600" />
                                <span className="font-medium">{status.name}</span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(status.status)}>
                            {getStatusIcon(status.status)}
                            <span className="ml-1 capitalize">{status.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(status.lastSync).toLocaleString()}</TableCell>
                        <TableCell>{new Date(status.nextSync).toLocaleString()}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => syncIntegration(status.id)}
                            disabled={status.status === 'syncing'}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
