"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plug, 
  Key, 
  Smartphone, 
  Building, 
  FileText,
  Database,
  Cloud,
  Code,
  Copy,
  Check,
  AlertTriangle,
  RefreshCw,
  Download
} from "lucide-react"

interface IntegrationFeaturesProps {
  userId: string
  onBack: () => void
}

export default function IntegrationFeatures({ userId, onBack }: IntegrationFeaturesProps) {
  const [activeIntegrations, setActiveIntegrations] = useState({
    banking: false,
    accounting: false,
    payroll: false,
    gstPortal: false,
    incomeTaxPortal: false
  })
  
  const [apiKeys, setApiKeys] = useState({
    sandbox: "",
    production: ""
  })
  
  const [webhooks, setWebhooks] = useState({
    taxEvents: "",
    reportGeneration: "",
    aiInsights: ""
  })
  
  const [connectedServices, setConnectedServices] = useState([
    {
      id: "sbi",
      name: "State Bank of India",
      type: "banking",
      status: "connected",
      lastSync: "2 hours ago",
      icon: Building
    },
    {
      id: "icici",
      name: "ICICI Bank",
      type: "banking", 
      status: "disconnected",
      lastSync: "never",
      icon: Building
    },
    {
      id: "quickbooks",
      name: "QuickBooks",
      type: "accounting",
      status: "connected",
      lastSync: "1 day ago",
      icon: FileText
    },
    {
      id: "zoho",
      name: "Zoho Books",
      type: "accounting",
      status: "disconnected",
      lastSync: "never",
      icon: FileText
    },
    {
      id: "gstn",
      name: "GST Portal",
      type: "government",
      status: "connected",
      lastSync: "30 minutes ago",
      icon: Database
    }
  ])

  const [apiDocumentation, setApiDocumentation] = useState({
    endpoints: [
      {
        method: "GET",
        path: "/api/tax-entries",
        description: "Retrieve all tax entries",
        auth: "Bearer token"
      },
      {
        method: "POST",
        path: "/api/tax-entries",
        description: "Create new tax entry",
        auth: "Bearer token"
      },
      {
        method: "GET",
        path: "/api/analytics",
        description: "Get tax analytics and insights",
        auth: "Bearer token"
      },
      {
        method: "POST",
        path: "/api/ai-advisor",
        description: "Get AI tax recommendations",
        auth: "Bearer token"
      }
    ],
    webhooks: [
      {
        event: "tax_entry.created",
        description: "Fired when a new tax entry is created"
      },
      {
        event: "report.generated",
        description: "Fired when a new report is generated"
      },
      {
        event: "deadline.approaching",
        description: "Fired when tax deadline is approaching"
      }
    ]
  })

  const handleIntegrationToggle = (integration: string, enabled: boolean) => {
    setActiveIntegrations(prev => ({ ...prev, [integration]: enabled }))
  }

  const handleConnectService = (serviceId: string) => {
    setConnectedServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, status: service.status === "connected" ? "disconnected" : "connected" }
          : service
      )
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const generateApiKey = (type: "sandbox" | "production") => {
    const key = `tm_${type}_${Math.random().toString(36).substr(2, 32)}`
    setApiKeys(prev => ({ ...prev, [type]: key }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Integrations & API</h1>
          <p className="text-slate-600 dark:text-slate-400">Connect KnowYourTax.ai with your favorite services</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Plug className="h-4 w-4" />
            <span className="hidden sm:inline">Services</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">API Keys</span>
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Webhooks</span>
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Docs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plug className="h-5 w-5" />
                Connected Services
              </CardTitle>
              <CardDescription>
                Manage your third-party service connections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {connectedServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <service.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">{service.type}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          Last sync: {service.lastSync}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={service.status === "connected" ? "default" : "secondary"}
                        className={service.status === "connected" ? "bg-green-100 text-green-800" : ""}
                      >
                        {service.status}
                      </Badge>
                      <Button
                        variant={service.status === "connected" ? "outline" : "default"}
                        size="sm"
                        onClick={() => handleConnectService(service.id)}
                      >
                        {service.status === "connected" ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Integrations</CardTitle>
              <CardDescription>
                Browse and enable additional integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Building className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Banking Integration</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Connect your bank accounts for automatic transaction import
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={activeIntegrations.banking}
                    onCheckedChange={(checked) => handleIntegrationToggle("banking", checked)}
                  />
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="h-8 w-8 text-green-600" />
                    <div>
                      <h4 className="font-medium">Accounting Software</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Sync with QuickBooks, Zoho, and other accounting tools
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={activeIntegrations.accounting}
                    onCheckedChange={(checked) => handleIntegrationToggle("accounting", checked)}
                  />
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Smartphone className="h-8 w-8 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Payroll Systems</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Import salary data from your payroll provider
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={activeIntegrations.payroll}
                    onCheckedChange={(checked) => handleIntegrationToggle("payroll", checked)}
                  />
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Database className="h-8 w-8 text-orange-600" />
                    <div>
                      <h4 className="font-medium">Government Portals</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Direct integration with GST and Income Tax portals
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={activeIntegrations.gstPortal}
                    onCheckedChange={(checked) => handleIntegrationToggle("gstPortal", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </CardTitle>
              <CardDescription>
                Manage your API keys for accessing KnowYourTax.ai programmatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Sandbox API Key</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      value={apiKeys.sandbox} 
                      readOnly 
                      placeholder="No key generated"
                      className="font-mono text-sm"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(apiKeys.sandbox)}
                      disabled={!apiKeys.sandbox}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => generateApiKey("sandbox")}
                    >
                      Generate
                    </Button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Use this key for testing and development
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Production API Key</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      value={apiKeys.production} 
                      readOnly 
                      placeholder="No key generated"
                      className="font-mono text-sm"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(apiKeys.production)}
                      disabled={!apiKeys.production}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => generateApiKey("production")}
                    >
                      Generate
                    </Button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Use this key for production applications
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900 dark:text-yellow-100">
                      Security Notice
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Keep your API keys secure and never share them publicly. 
                      Rotate your keys regularly for better security.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rate Limits & Usage</CardTitle>
              <CardDescription>
                Monitor your API usage and rate limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1,000</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Requests Today</div>
                  <div className="text-xs text-slate-500">Limit: 10,000/day</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">25,000</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Requests This Month</div>
                  <div className="text-xs text-slate-500">Limit: 300,000/month</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">99.9%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Uptime</div>
                  <div className="text-xs text-slate-500">Last 30 days</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Webhook Configuration
              </CardTitle>
              <CardDescription>
                Configure webhooks to receive real-time updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(webhooks).map(([key, value]) => (
                <div key={key}>
                  <Label className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      value={value} 
                      onChange={(e) => setWebhooks(prev => ({ ...prev, [key]: e.target.value }))}
                      placeholder="https://your-webhook-url.com/endpoint"
                      className="font-mono text-sm"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(value)}
                      disabled={!value}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {getWebhookDescription(key)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhook Events</CardTitle>
              <CardDescription>
                Available webhook events you can subscribe to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {apiDocumentation.webhooks.map((webhook, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <code className="text-sm font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          {webhook.event}
                        </code>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {webhook.description}
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                API Documentation
              </CardTitle>
              <CardDescription>
                Complete API reference and integration guides
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Authentication</h4>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                  <code className="text-sm">
                    Authorization: Bearer your-api-key
                  </code>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">API Endpoints</h4>
                <div className="space-y-3">
                  {apiDocumentation.endpoints.map((endpoint, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono">{endpoint.path}</code>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {endpoint.description}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Auth: {endpoint.auth}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  View Full Docs
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>
                Quick start examples in popular programming languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="javascript" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>
                <TabsContent value="javascript" className="mt-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`const fetch = require('node-fetch');

const response = await fetch('https://api.taxmeter.in/v1/tax-entries', {
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`}
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="python" className="mt-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`import requests

headers = {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.taxmeter.in/v1/tax-entries', headers=headers)
data = response.json()
print(data)`}
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="curl" className="mt-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`curl -X GET "https://api.taxmeter.in/v1/tax-entries" \\
     -H "Authorization: Bearer your-api-key" \\
     -H "Content-Type: application/json"`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getWebhookDescription(key: string): string {
  const descriptions: Record<string, string> = {
    taxEvents: "Receive notifications for tax-related events",
    reportGeneration: "Get notified when reports are generated",
    aiInsights: "Receive AI-powered tax insights and recommendations"
  }
  return descriptions[key] || ""
}