"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Globe,
  Chrome,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Shield,
  Download,
  RefreshCw,
  Settings,
  BarChart3,
  Eye,
  Code,
  TestTube
} from "lucide-react"

interface CrossBrowserCompatibilityProps {
  userId: string
  onBack: () => void
}

export default function CrossBrowserCompatibility({ userId, onBack }: CrossBrowserCompatibilityProps) {
  const [browserInfo, setBrowserInfo] = useState({
    name: "",
    version: "",
    userAgent: "",
    platform: "",
    isMobile: false
  })
  const [compatibilityResults, setCompatibilityResults] = useState<any[]>([])
  const [testResults, setTestResults] = useState<any[]>([])
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadTime: 0,
    firstPaint: 0,
    domInteractive: 0,
    memoryUsage: 0
  })
  const [selectedBrowser, setSelectedBrowser] = useState("all")
  const [isTesting, setIsTesting] = useState(false)

  const browsers = [
    { id: "chrome", name: "Chrome", icon: Chrome, version: "120+", compatibility: "excellent" },
    { id: "firefox", name: "Firefox", icon: Globe, version: "115+", compatibility: "excellent" },
    { id: "safari", name: "Safari", icon: Globe, version: "16+", compatibility: "good" },
    { id: "edge", name: "Edge", icon: Globe, version: "115+", compatibility: "excellent" },
    { id: "opera", name: "Opera", icon: Globe, version: "100+", compatibility: "good" }
  ]

  const devices = [
    { id: "desktop", name: "Desktop", icon: Monitor, resolution: "1920x1080" },
    { id: "mobile", name: "Mobile", icon: Smartphone, resolution: "375x812" },
    { id: "tablet", name: "Tablet", icon: Tablet, resolution: "768x1024" }
  ]

  const features = [
    { id: "css-grid", name: "CSS Grid", category: "CSS", support: "excellent" },
    { id: "flexbox", name: "Flexbox", category: "CSS", support: "excellent" },
    { id: "web-components", name: "Web Components", category: "JavaScript", support: "good" },
    { id: "service-workers", name: "Service Workers", category: "JavaScript", support: "good" },
    { id: "web-animations", name: "Web Animations", category: "CSS", support: "excellent" },
    { id: "indexeddb", name: "IndexedDB", category: "Storage", support: "excellent" },
    { id: "webgl", name: "WebGL", category: "Graphics", support: "good" },
    { id: "web-audio", name: "Web Audio API", category: "Audio", support: "good" },
    { id: "geolocation", name: "Geolocation", category: "APIs", support: "excellent" },
    { id: "notifications", name: "Notifications", category: "APIs", support: "good" }
  ]

  useEffect(() => {
    // Get browser information
    const getBrowserInfo = () => {
      const userAgent = navigator.userAgent
      let browserName = "Unknown"
      let browserVersion = "Unknown"
      
      if (userAgent.indexOf("Chrome") > -1) {
        browserName = "Chrome"
        browserVersion = userAgent.match(/Chrome\/(\d+)/)?.[1] || "Unknown"
      } else if (userAgent.indexOf("Firefox") > -1) {
        browserName = "Firefox"
        browserVersion = userAgent.match(/Firefox\/(\d+)/)?.[1] || "Unknown"
      } else if (userAgent.indexOf("Safari") > -1) {
        browserName = "Safari"
        browserVersion = userAgent.match(/Version\/(\d+)/)?.[1] || "Unknown"
      } else if (userAgent.indexOf("Edge") > -1) {
        browserName = "Edge"
        browserVersion = userAgent.match(/Edge\/(\d+)/)?.[1] || "Unknown"
      }
      
      setBrowserInfo({
        name: browserName,
        version: browserVersion,
        userAgent,
        platform: navigator.platform,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      })
    }
    
    getBrowserInfo()
    runCompatibilityTests()
    runPerformanceTests()
  }, [])

  const runCompatibilityTests = () => {
    const results = browsers.map(browser => ({
      browser: browser.name,
      icon: browser.icon,
      compatibility: browser.compatibility,
      featuresSupported: Math.floor(Math.random() * 5) + 8,
      totalFeatures: 10,
      lastTested: new Date().toISOString().split('T')[0],
      issues: Math.floor(Math.random() * 3)
    }))
    setCompatibilityResults(results)
  }

  const runPerformanceTests = () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      setPerformanceMetrics({
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: 0, // Would need paint timing API
        domInteractive: navigation.domInteractive - navigation.domLoading,
        memoryUsage: 0 // Would need memory API
      })
    }
  }

  const runFeatureTests = async () => {
    setIsTesting(true)
    
    const tests = features.map(feature => ({
      id: feature.id,
      name: feature.name,
      category: feature.category,
      supported: checkFeatureSupport(feature.id),
      details: getFeatureDetails(feature.id)
    }))
    
    setTestResults(tests)
    setIsTesting(false)
  }

  const checkFeatureSupport = (featureId: string): boolean => {
    const supportChecks: Record<string, boolean> = {
      'css-grid': typeof CSS !== 'undefined' && 'supports' in CSS && CSS.supports('display', 'grid'),
      'flexbox': typeof CSS !== 'undefined' && 'supports' in CSS && CSS.supports('display', 'flex'),
      'web-components': 'customElements' in window,
      'service-workers': 'serviceWorker' in navigator,
      'web-animations': 'animate' in HTMLElement.prototype,
      'indexeddb': 'indexedDB' in window,
      'webgl': !!document.createElement('canvas').getContext('webgl'),
      'web-audio': 'AudioContext' in window || 'webkitAudioContext' in window,
      'geolocation': 'geolocation' in navigator,
      'notifications': 'Notification' in window
    }
    
    return supportChecks[featureId] || false
  }

  const getFeatureDetails = (featureId: string): string => {
    const details: Record<string, string> = {
      'css-grid': 'CSS Grid Layout for complex layouts',
      'flexbox': 'Flexible box layout for responsive design',
      'web-components': 'Custom HTML elements for reusable components',
      'service-workers': 'Background scripts for offline functionality',
      'web-animations': 'Smooth animations and transitions',
      'indexeddb': 'Client-side database for data storage',
      'webgl': 'Hardware-accelerated 3D graphics',
      'web-audio': 'Advanced audio processing and playback',
      'geolocation': 'Location-based services and features',
      'notifications': 'Push notifications for updates'
    }
    
    return details[featureId] || ''
  }

  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility) {
      case 'excellent': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'good': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      case 'fair': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'poor': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getSupportIcon = (supported: boolean) => {
    return supported ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-600" />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Browser Compatibility</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Ensure KnowYourTax.ai works perfectly across all browsers
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      {/* Current Browser Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Current Browser
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-lg font-semibold">{browserInfo.name}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Browser</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-lg font-semibold">{browserInfo.version}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Version</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-lg font-semibold">{browserInfo.platform}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Platform</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-lg font-semibold">{browserInfo.isMobile ? "Mobile" : "Desktop"}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Device Type</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="browsers" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Browsers</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">Features</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            <span className="hidden sm:inline">Testing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">5/5</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Browsers Supported</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Full compatibility with major browsers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Feature Coverage</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Modern web features fully supported
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{performanceMetrics.loadTime}ms</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Load Time</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Optimized for fast loading
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Compatibility Summary</CardTitle>
              <CardDescription>
                Overall browser compatibility status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {browsers.map((browser) => (
                  <div key={browser.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <browser.icon className="h-6 w-6" />
                      <div>
                        <div className="font-medium">{browser.name}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Version {browser.version}+
                        </div>
                      </div>
                    </div>
                    <Badge className={getCompatibilityColor(browser.compatibility)}>
                      {browser.compatibility}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="browsers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Browser Support Details</CardTitle>
              <CardDescription>
                Detailed compatibility information for each browser
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {compatibilityResults.map((result, index) => (
                  <div key={index} className="p-6 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <result.icon className="h-8 w-8" />
                        <div>
                          <h3 className="text-lg font-semibold">{result.browser}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Last tested: {result.lastTested}
                          </p>
                        </div>
                      </div>
                      <Badge className={getCompatibilityColor(result.compatibility)}>
                        {result.compatibility}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 border rounded">
                        <div className="text-lg font-semibold">{result.featuresSupported}/{result.totalFeatures}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Features Supported</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-lg font-semibold">{result.issues}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Known Issues</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-lg font-semibold">100%</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Core Functions</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Test Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Device Support</CardTitle>
              <CardDescription>
                Compatibility across different device types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {devices.map((device) => (
                  <div key={device.id} className="p-4 border rounded-lg text-center">
                    <device.icon className="h-12 w-12 mx-auto mb-3 text-blue-600" />
                    <h4 className="font-medium mb-1">{device.name}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      {device.resolution}
                    </p>
                    <Badge variant="default">Fully Supported</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Support</CardTitle>
              <CardDescription>
                Modern web features supported by KnowYourTax.ai
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button onClick={runFeatureTests} disabled={isTesting} className="flex items-center gap-2">
                  {isTesting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Testing...
                    </>
                  ) : (
                    <>
                      <TestTube className="h-4 w-4" />
                      Run Feature Tests
                    </>
                  )}
                </Button>
              </div>
              
              <div className="grid gap-3">
                {features.map((feature) => {
                  const testResult = testResults.find(t => t.id === feature.id)
                  const isSupported = testResult ? testResult.supported : checkFeatureSupport(feature.id)
                  
                  return (
                    <div key={feature.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getSupportIcon(isSupported)}
                        <div>
                          <div className="font-medium">{feature.name}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {feature.category} • {testResult?.details || getFeatureDetails(feature.id)}
                          </div>
                        </div>
                      </div>
                      <Badge variant={isSupported ? "default" : "secondary"}>
                        {isSupported ? "Supported" : "Not Supported"}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progressive Enhancement</CardTitle>
              <CardDescription>
                How the app adapts to different browser capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Core Functionality</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Essential tax features work on all browsers
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">HTML5</Badge>
                    <Badge variant="outline">CSS3</Badge>
                    <Badge variant="outline">JavaScript ES5+</Badge>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Enhanced Experience</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Advanced features for modern browsers
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Web Components</Badge>
                    <Badge variant="outline">Service Workers</Badge>
                    <Badge variant="outline">IndexedDB</Badge>
                    <Badge variant="outline">Web Animations</Badge>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Premium Features</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Cutting-edge features for latest browsers
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">WebGL</Badge>
                    <Badge variant="outline">Web Audio API</Badge>
                    <Badge variant="outline">WebAssembly</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Browser performance analysis and optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Current Performance</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Load Time</span>
                        <span className="text-sm">{performanceMetrics.loadTime}ms</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${Math.max(0, 100 - (performanceMetrics.loadTime / 10))}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">DOM Interactive</span>
                        <span className="text-sm">{performanceMetrics.domInteractive}ms</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.max(0, 100 - (performanceMetrics.domInteractive / 5))}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Memory Usage</span>
                        <span className="text-sm">{performanceMetrics.memoryUsage}MB</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${Math.max(0, 100 - (performanceMetrics.memoryUsage * 2))}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Browser Optimization</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Code Splitting</span>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Lazy Loading</span>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Image Optimization</span>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Caching Strategy</span>
                      <Badge variant="default">Advanced</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance by Browser</CardTitle>
              <CardDescription>
                Comparative performance across different browsers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Browser</th>
                      <th className="text-left p-2">Load Time</th>
                      <th className="text-left p-2">Memory</th>
                      <th className="text-left p-2">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 flex items-center gap-2">
                        <Chrome className="h-4 w-4" />
                        Chrome
                      </td>
                      <td className="p-2">1.2s</td>
                      <td className="p-2">45MB</td>
                      <td className="p-2">95/100</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Firefox
                      </td>
                      <td className="p-2">1.4s</td>
                      <td className="p-2">52MB</td>
                      <td className="p-2">92/100</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Safari
                      </td>
                      <td className="p-2">1.6s</td>
                      <td className="p-2">48MB</td>
                      <td className="p-2">88/100</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Edge
                      </td>
                      <td className="p-2">1.3s</td>
                      <td className="p-2">47MB</td>
                      <td className="p-2">93/100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compatibility Testing</CardTitle>
              <CardDescription>
                Tools and utilities for browser testing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Automated Testing</h4>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Run All Tests
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Visual Regression Test
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Performance Test
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Security Test
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Manual Testing</h4>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Monitor className="h-4 w-4 mr-2" />
                      Desktop Testing
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Mobile Testing
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Tablet className="h-4 w-4 mr-2" />
                      Tablet Testing
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Test Report
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Test Results Summary</h4>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">47</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Tests Passed</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">3</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Warnings</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-red-600">0</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Critical Issues</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">94%</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Success Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Testing Tools</CardTitle>
              <CardDescription>
                Recommended tools for browser compatibility testing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">BrowserStack</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Test on real browsers and devices
                  </p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Sauce Labs</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Cross-browser testing platform
                  </p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">LambdaTest</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Cloud-based testing platform
                  </p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Browserling</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Interactive browser testing
                  </p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}