"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { 
  Smartphone, 
  Battery, 
  Wifi,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Moon,
  Sun,
  Zap,
  Fingerprint,
  Camera,
  Mic,
  MapPin,
  QrCode,
  Share2,
  Settings,
  Monitor,
  Tablet,
  Watch,
  Database
} from "lucide-react"

interface MobileEnhancementsProps {
  userId: string
  onBack: () => void
}

export default function MobileEnhancements({ userId, onBack }: MobileEnhancementsProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [connectionType, setConnectionType] = useState("wifi")
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [offlineMode, setOfflineMode] = useState(false)
  const [mobileSettings, setMobileSettings] = useState({
    dataSaver: false,
    backgroundSync: true,
    pushNotifications: true,
    locationServices: false,
    biometricAuth: true,
    hapticFeedback: true,
    autoUpdate: true,
    cloudBackup: true
  })
  const [appPerformance, setAppPerformance] = useState({
    loadTime: 1.2,
    memoryUsage: 45,
    storageUsed: 128,
    storageTotal: 512
  })
  const [quickActions, setQuickActions] = useState([
    { id: 1, name: "Add Tax Entry", icon: "plus", enabled: true },
    { id: 2, name: "Scan Receipt", icon: "camera", enabled: true },
    { id: 3, name: "Voice Input", icon: "mic", enabled: false },
    { id: 4, name: "Quick Calc", icon: "calculator", enabled: true }
  ])

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Simulate battery level changes
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => Math.max(0, prev - Math.random() * 2))
    }, 30000)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearInterval(batteryInterval)
    }
  }, [])

  const handleSettingChange = (setting: string, value: boolean) => {
    setMobileSettings(prev => ({ ...prev, [setting]: value }))
  }

  const handleQuickActionToggle = (id: number, enabled: boolean) => {
    setQuickActions(prev => 
      prev.map(action => 
        action.id === id ? { ...action, enabled } : action
      )
    )
  }

  const optimizeForMobile = () => {
    // Apply mobile optimizations
    setMobileSettings(prev => ({
      ...prev,
      dataSaver: true,
      backgroundSync: false,
      pushNotifications: true,
      hapticFeedback: true
    }))
  }

  const clearCache = () => {
    // Simulate cache clearing
    setAppPerformance(prev => ({
      ...prev,
      memoryUsage: Math.max(20, prev.memoryUsage - 20),
      loadTime: Math.max(0.5, prev.loadTime - 0.3)
    }))
  }

  const getBatteryColor = (level: number) => {
    if (level > 50) return "text-green-600"
    if (level > 20) return "text-yellow-600"
    return "text-red-600"
  }

  const getConnectionIcon = (type: string) => {
    switch (type) {
      case "wifi": return <Wifi className="h-4 w-4" />
      case "cellular": return <Smartphone className="h-4 w-4" />
      case "offline": return <Wifi className="h-4 w-4" />
      default: return <Wifi className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Mobile Optimization</h1>
          <p className="text-slate-600 dark:text-slate-400">
            {isMobile ? "Mobile Device Detected" : "Desktop Mode - Simulating Mobile Features"}
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      {/* Device Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Device Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                {getConnectionIcon(connectionType)}
              </div>
              <div className="text-sm font-medium capitalize">{connectionType}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Connection</div>
            </div>
            
            <div className="text-center p-3 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Battery className={`h-4 w-4 ${getBatteryColor(batteryLevel)}`} />
              </div>
              <div className={`text-sm font-medium ${getBatteryColor(batteryLevel)}`}>
                {batteryLevel}%
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Battery</div>
            </div>
            
            <div className="text-center p-3 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-sm font-medium">{appPerformance.loadTime}s</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Load Time</div>
            </div>
            
            <div className="text-center p-3 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Monitor className="h-4 w-4 text-purple-600" />
              </div>
              <div className="text-sm font-medium">{appPerformance.memoryUsage}%</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Memory</div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={optimizeForMobile} className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Optimize for Mobile
            </Button>
            <Button variant="outline" onClick={clearCache} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Clear Cache
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">Features</span>
          </TabsTrigger>
          <TabsTrigger value="storage" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Storage</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mobile Settings</CardTitle>
              <CardDescription>
                Optimize app behavior for mobile devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(mobileSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {getSettingDescription(key)}
                    </p>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => handleSettingChange(key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Customize quick actions for mobile home screen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {quickActions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        {getActionIcon(action.icon)}
                      </div>
                      <div>
                        <div className="font-medium">{action.name}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          Quick access from home screen
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={action.enabled}
                      onCheckedChange={(checked) => handleQuickActionToggle(action.id, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Monitor app performance on mobile devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Load Time</span>
                    <span className="text-sm">{appPerformance.loadTime}s</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${Math.max(0, 100 - (appPerformance.loadTime * 20))}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm">{appPerformance.memoryUsage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${appPerformance.memoryUsage}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Storage Used</span>
                    <span className="text-sm">{appPerformance.storageUsed}MB / {appPerformance.storageTotal}MB</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${(appPerformance.storageUsed / appPerformance.storageTotal) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Performance Tips</h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• Enable data saver for slow connections</li>
                    <li>• Clear cache regularly</li>
                    <li>• Disable background sync if needed</li>
                    <li>• Use offline mode for poor connectivity</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Network Optimization</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Image Quality</span>
                      <Badge variant="outline">Auto</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Video Auto-play</span>
                      <Badge variant="outline">WiFi Only</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sync Frequency</span>
                      <Badge variant="outline">Adaptive</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mobile-Specific Features</CardTitle>
              <CardDescription>
                Features optimized for mobile devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Fingerprint className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Biometric Authentication</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Use fingerprint or face ID for quick login
                        </p>
                      </div>
                    </div>
                    <Switch checked={mobileSettings.biometricAuth} />
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Camera className="h-8 w-8 text-green-600" />
                      <div>
                        <h4 className="font-medium">Receipt Scanner</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Scan receipts with your camera
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Enabled</Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Mic className="h-8 w-8 text-purple-600" />
                      <div>
                        <h4 className="font-medium">Voice Commands</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Control the app with your voice
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="h-8 w-8 text-orange-600" />
                      <div>
                        <h4 className="font-medium">Location Services</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Get location-based tax information
                        </p>
                      </div>
                    </div>
                    <Switch checked={mobileSettings.locationServices} />
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <QrCode className="h-8 w-8 text-red-600" />
                      <div>
                        <h4 className="font-medium">QR Code Scanner</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Scan QR codes for quick data entry
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Enabled</Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Share2 className="h-8 w-8 text-indigo-600" />
                      <div>
                        <h4 className="font-medium">Quick Share</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Share reports instantly
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mobile Gestures</CardTitle>
              <CardDescription>
                Intuitive touch controls for mobile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Smartphone className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-1">Swipe Navigation</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Swipe between sections
                  </p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-16 h-16 mx-auto mb-3 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <Fingerprint className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-medium mb-1">Pull to Refresh</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Update data with a gesture
                  </p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                    <QrCode className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-medium mb-1">Long Press</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Access context menus
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Management</CardTitle>
              <CardDescription>
                Manage app storage and offline data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">App Data</span>
                    <span className="text-sm">64 MB</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Cache</span>
                    <span className="text-sm">32 MB</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Offline Data</span>
                    <span className="text-sm">16 MB</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "12.5%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Downloads</span>
                    <span className="text-sm">16 MB</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "12.5%" }}></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Manage Downloads
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Backup to Cloud
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Offline Mode</CardTitle>
              <CardDescription>
                Use the app without internet connection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable Offline Mode</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Access essential features without internet
                    </p>
                  </div>
                  <Switch checked={offlineMode} onCheckedChange={setOfflineMode} />
                </div>

                {offlineMode && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Available Offline:</h5>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• View tax entries and reports</li>
                      <li>• Basic calculations</li>
                      <li>• Receipt scanning (stored locally)</li>
                      <li>• Profile information</li>
                    </ul>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Sync Settings</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Auto-sync on WiFi</span>
                        <Badge variant="default">On</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Sync frequency</span>
                        <Badge variant="outline">Every 2 hours</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Data Usage</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>This month</span>
                        <span>124 MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data saver active</span>
                        <Badge variant={mobileSettings.dataSaver ? "default" : "secondary"}>
                          {mobileSettings.dataSaver ? "On" : "Off"}
                        </Badge>
                      </div>
                    </div>
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

function getSettingDescription(key: string): string {
  const descriptions: Record<string, string> = {
    dataSaver: "Reduce data usage by compressing images and limiting background activity",
    backgroundSync: "Sync data in the background for up-to-date information",
    pushNotifications: "Receive notifications for tax deadlines and updates",
    locationServices: "Use location for region-specific tax information",
    biometricAuth: "Enable fingerprint or face ID authentication",
    hapticFeedback: "Provide touch feedback for better user experience",
    autoUpdate: "Automatically update app content and features",
    cloudBackup: "Backup your data to cloud storage"
  }
  return descriptions[key] || ""
}

function getActionIcon(icon: string) {
  const icons: Record<string, any> = {
    plus: "+",
    camera: <Camera className="h-4 w-4" />,
    mic: <Mic className="h-4 w-4" />,
    calculator: "🧮"
  }
  return icons[icon] || "+"
}

// Missing import
import { Database } from "lucide-react"