"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Smartphone, 
  Camera, 
  Fingerprint, 
  Wifi, 
  Battery, 
  Bell,
  MessageSquare,
  CreditCard,
  FileText,
  BarChart3,
  Settings,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Shield,
  Users,
  Database,
  Cloud,
  Activity
} from "lucide-react"

interface MobileFeature {
  id: string
  name: string
  description: string
  enabled: boolean
  icon: any
  category: 'core' | 'premium' | 'experimental'
  platform: ('ios' | 'android' | 'web')[]
}

const mobileFeatures: MobileFeature[] = [
  {
    id: 'tax-scanner',
    name: 'Tax Scanner',
    description: 'Scan and classify tax documents using AI',
    enabled: true,
    icon: Camera,
    category: 'core',
    platform: ['ios', 'android', 'web']
  },
  {
    id: 'payment-processor',
    name: 'Payment Processing',
    description: 'Process payments through RazorPay and Cashfree',
    enabled: true,
    icon: CreditCard,
    category: 'core',
    platform: ['ios', 'android', 'web']
  },
  {
    id: 'offline-mode',
    name: 'Offline Mode',
    description: 'Access tax data without internet connection',
    enabled: true,
    icon: Database,
    category: 'core',
    platform: ['ios', 'android']
  },
  {
    id: 'biometric-auth',
    name: 'Biometric Authentication',
    description: 'Secure login with fingerprint or face ID',
    enabled: false,
    icon: Fingerprint,
    category: 'premium',
    platform: ['ios', 'android']
  },
  {
    id: 'voice-assistant',
    name: 'Voice Assistant',
    description: 'Control the app with voice commands',
    enabled: false,
    icon: MessageSquare,
    category: 'experimental',
    platform: ['ios', 'android']
  },
  {
    id: 'ar-tax-viewer',
    name: 'AR Tax Visualization',
    description: 'View tax data in augmented reality',
    enabled: false,
    icon: Activity,
    category: 'experimental',
    platform: ['ios']
  },
  {
    id: 'smart-widgets',
    name: 'Smart Widgets',
    description: 'Home screen widgets for quick access',
    enabled: true,
    icon: BarChart3,
    category: 'premium',
    platform: ['ios', 'android']
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    description: 'Eye-friendly dark theme',
    enabled: true,
    icon: Shield,
    category: 'core',
    platform: ['ios', 'android', 'web']
  }
]

interface MobileStats {
  downloads: number
  activeUsers: number
  rating: number
  reviews: number
  platforms: {
    ios: number
    android: number
    web: number
  }
  features: {
    core: number
    premium: number
    experimental: number
  }
}

const mockStats: MobileStats = {
  downloads: 125000,
  activeUsers: 45000,
  rating: 4.6,
  reviews: 3200,
  platforms: {
    ios: 45,
    android: 40,
    web: 15
  },
  features: {
    core: 5,
    premium: 2,
    experimental: 1
  }
}

export function MobileApp() {
  const [features, setFeatures] = useState<MobileFeature[]>(mobileFeatures)
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isDownloading, setIsDownloading] = useState(false)

  const toggleFeature = (featureId: string) => {
    setFeatures(features.map(feature => 
      feature.id === featureId 
        ? { ...feature, enabled: !feature.enabled }
        : feature
    ))
  }

  const filteredFeatures = features.filter(feature => {
    const platformMatch = selectedPlatform === 'all' || feature.platform.includes(selectedPlatform as any)
    const categoryMatch = selectedCategory === 'all' || feature.category === selectedCategory
    return platformMatch && categoryMatch
  })

  const handleDownload = async (platform: string) => {
    setIsDownloading(true)
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false)
      alert(`Download started for ${platform} app!`)
    }, 2000)
  }

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: Smartphone },
    { id: 'ios', name: 'iOS', icon: Apple },
    { id: 'android', name: 'Android', icon: Android }
  ]

  const categories = [
    { id: 'all', name: 'All Features', icon: Zap },
    { id: 'core', name: 'Core Features', icon: Shield },
    { id: 'premium', name: 'Premium Features', icon: Users },
    { id: 'experimental', name: 'Experimental', icon: Activity }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'bg-blue-100 text-blue-800'
      case 'premium': return 'bg-purple-100 text-purple-800'
      case 'experimental': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">KnowYourTax.ai Mobile App</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Take your tax management on the go with our powerful mobile application
        </p>
      </div>

      {/* App Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.downloads.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total downloads</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Monthly active</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.rating}/5</div>
            <p className="text-xs text-muted-foreground">{mockStats.reviews} reviews</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Features</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{features.filter(f => f.enabled).length}</div>
            <p className="text-xs text-muted-foreground">Active features</p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Distribution</CardTitle>
          <CardDescription>User distribution across platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{mockStats.platforms.ios}%</div>
              <div className="text-sm text-gray-600">iOS</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${mockStats.platforms.ios}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mockStats.platforms.android}%</div>
              <div className="text-sm text-gray-600">Android</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${mockStats.platforms.android}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mockStats.platforms.web}%</div>
              <div className="text-sm text-gray-600">Web</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${mockStats.platforms.web}%` }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Section */}
      <Card>
        <CardHeader>
          <CardTitle>Download KnowYourTax.ai Mobile</CardTitle>
          <CardDescription>Get the app on your preferred platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Apple className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">iOS App</h3>
                <p className="text-sm text-gray-600 mb-4">Available on App Store</p>
                <Button 
                  className="w-full" 
                  onClick={() => handleDownload('iOS')}
                  disabled={isDownloading}
                >
                  {isDownloading ? 'Downloading...' : 'Download for iOS'}
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Android className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Android App</h3>
                <p className="text-sm text-gray-600 mb-4">Available on Google Play</p>
                <Button 
                  className="w-full" 
                  onClick={() => handleDownload('Android')}
                  disabled={isDownloading}
                >
                  {isDownloading ? 'Downloading...' : 'Download for Android'}
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Web App</h3>
                <p className="text-sm text-gray-600 mb-4">Access from any browser</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('/mobile', '_blank')}
                >
                  Open Web App
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Features */}
      <Tabs defaultValue="features" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          <TabsTrigger value="tech">Technology</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          {/* Feature Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Platform</h4>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((platform) => (
                      <Button
                        key={platform.id}
                        variant={selectedPlatform === platform.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedPlatform(platform.id)}
                        className="flex items-center space-x-1"
                      >
                        <platform.icon className="h-4 w-4" />
                        <span>{platform.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Category</h4>
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
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatures.map((feature) => (
              <Card key={feature.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <feature.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feature.name}</CardTitle>
                        <Badge className={getCategoryColor(feature.category)}>
                          {feature.category}
                        </Badge>
                      </div>
                    </div>
                    <Switch
                      checked={feature.enabled}
                      onCheckedChange={() => toggleFeature(feature.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Supported Platforms</h4>
                    <div className="flex gap-1">
                      {feature.platform.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge variant={feature.enabled ? "default" : "secondary"}>
                      {feature.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="capabilities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Smart Document Scanning</span>
                </CardTitle>
                <CardDescription>
                  AI-powered document scanning and classification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Automatic tax category detection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>OCR text extraction</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Multi-format support (PDF, images)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Cloud backup and sync</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Secure Payments</span>
                </CardTitle>
                <CardDescription>
                  Multiple payment options with Indian payment gateways
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>RazorPay integration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Cashfree integration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>UPI, cards, net banking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Secure transaction processing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Smart Notifications</span>
                </CardTitle>
                <CardDescription>
                  Real-time notifications via email and WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Payment confirmations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Tax deadline reminders</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Subscription alerts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Bill processing updates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Advanced Analytics</span>
                </CardTitle>
                <CardDescription>
                  Comprehensive tax analytics and reporting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Interactive charts and graphs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Tax optimization insights</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Compliance tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Export reports (PDF, Excel)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tech" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
                <CardDescription>Powered by modern mobile technologies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Framework</span>
                    <Badge variant="outline">React Native</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Language</span>
                    <Badge variant="outline">TypeScript</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">State Management</span>
                    <Badge variant="outline">Redux Toolkit</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Navigation</span>
                    <Badge variant="outline">React Navigation</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">UI Components</span>
                    <Badge variant="outline">Native Base</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Storage</span>
                    <Badge variant="outline">AsyncStorage + Secure Storage</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Features</CardTitle>
                <CardDescription>Optimized for speed and efficiency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    <span>Fast loading and navigation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-blue-600" />
                    <span>Offline data synchronization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Cloud className="h-4 w-4 text-purple-600" />
                    <span>Cloud backup and restore</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>End-to-end encryption</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Battery className="h-4 w-4 text-red-600" />
                    <span>Battery optimization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-indigo-600" />
                    <span>Connectivity optimization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Mock icons for platforms
const Apple = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.19-.84-3.06-1.72C3 15.92 1.88 12.7 2.82 9.26c.87-3.19 3.02-4.79 5.09-4.83 1.27-.02 2.47.72 3.32.72.84 0 2.42-.91 3.92-.77.65.03 2.5.26 3.61 1.98-.09.06-1.59.89-1.59 2.72 0 2.14 1.74 3.25 3.55 3.25.92 0 1.44-.53 2.74-.53 1.27 0 1.81.53 2.74.53 1.84 0 2.58-1.26 3.1-2.04.64-1.02.96-2.05.96-2.36 0-.14-.01-.27-.03-.41.96-.68 1.8-1.55 2.44-2.53-.88-.52-1.49-1.34-1.8-2.31-.3-.97-.23-1.94-.06-2.88.17-.94.63-1.74 1.35-2.32.72-.58 1.61-.89 2.53-.89.92 0 1.81.31 2.53.89.72.58 1.18 1.38 1.35 2.32.17.94.24 1.91-.06 2.88-.31.97-.92 1.79-1.8 2.31z"/>
  </svg>
)

const Android = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.67-.04-.83.26l-1.85 3.19c-1.47-.72-3.09-1.12-4.8-1.12s-3.33.4-4.8 1.12L4.55 5.71c-.16-.31-.54-.43-.83-.26-.31.16-.43.54-.26.85L5.3 9.48C2.91 11.3 1.34 14.05 1.18 17.22h21.64c-.16-3.17-1.73-5.92-4.22-7.74zM8 15.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm8 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </svg>
)

const Globe = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
)

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)
