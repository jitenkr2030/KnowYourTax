"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Palette, 
  Bell, 
  Globe, 
  Shield, 
  Monitor,
  Moon,
  Sun,
  Smartphone,
  Laptop,
  Download,
  Upload,
  Save,
  RotateCcw
} from "lucide-react"

interface PersonalizationSettingsProps {
  userId: string
  onBack: () => void
}

export default function PersonalizationSettings({ userId, onBack }: PersonalizationSettingsProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto")
  const [language, setLanguage] = useState("en")
  const [currency, setCurrency] = useState("INR")
  const [fontSize, setFontSize] = useState([16])
  const [notifications, setNotifications] = useState({
    taxReminders: true,
    deadlineAlerts: true,
    aiInsights: true,
    communityUpdates: false,
    marketUpdates: false
  })
  const [privacy, setPrivacy] = useState({
    profileVisibility: "private",
    dataSharing: false,
    analyticsTracking: true,
    locationAccess: false
  })
  const [dashboardLayout, setDashboardLayout] = useState("default")
  const [dataSync, setDataSync] = useState({
    autoSync: true,
    syncFrequency: "daily",
    offlineMode: false
  })

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी (Hindi)" },
    { code: "ta", name: "தமிழ் (Tamil)" },
    { code: "te", name: "తెలుగు (Telugu)" },
    { code: "mr", name: "मराठी (Marathi)" },
    { code: "gu", name: "ગુજરાતી (Gujarati)" },
    { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
    { code: "ml", name: "മലയാളം (Malayalam)" },
    { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
    { code: "bn", name: "বাংলা (Bengali)" }
  ]

  const currencies = [
    { code: "INR", name: "Indian Rupee (₹)" },
    { code: "USD", name: "US Dollar ($)" },
    { code: "EUR", name: "Euro (€)" },
    { code: "GBP", name: "British Pound (£)" }
  ]

  const layouts = [
    { id: "default", name: "Default Layout", description: "Standard dashboard layout" },
    { id: "compact", name: "Compact Layout", description: "Minimalist design with quick access" },
    { id: "detailed", name: "Detailed Layout", description: "Comprehensive view with all metrics" },
    { id: "custom", name: "Custom Layout", description: "Personalized arrangement" }
  ]

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacy(prev => ({ ...prev, [key]: value }))
  }

  const handleDataSyncChange = (key: string, value: any) => {
    setDataSync(prev => ({ ...prev, [key]: value }))
  }

  const exportSettings = () => {
    const settings = {
      theme,
      language,
      currency,
      fontSize: fontSize[0],
      notifications,
      privacy,
      dashboardLayout,
      dataSync
    }
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'taxmeter-settings.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Personalization</h1>
          <p className="text-slate-600 dark:text-slate-400">Customize your KnowYourTax.ai experience</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">Advanced</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme & Display
              </CardTitle>
              <CardDescription>
                Customize the visual appearance of KnowYourTax.ai
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      className="flex-col gap-2 h-20"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-6 w-6" />
                      <span className="text-xs">Light</span>
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      className="flex-col gap-2 h-20"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-6 w-6" />
                      <span className="text-xs">Dark</span>
                    </Button>
                    <Button
                      variant={theme === "auto" ? "default" : "outline"}
                      className="flex-col gap-2 h-20"
                      onClick={() => setTheme("auto")}
                    >
                      <Monitor className="h-6 w-6" />
                      <span className="text-xs">Auto</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Font Size</label>
                  <div className="space-y-3">
                    <Slider
                      value={fontSize}
                      onValueChange={setFontSize}
                      max={24}
                      min={12}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                      <span>Small</span>
                      <span className="font-medium" style={{ fontSize: `${fontSize[0]}px` }}>
                        {fontSize[0]}px
                      </span>
                      <span>Large</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Dashboard Layout</label>
                  <Select value={dashboardLayout} onValueChange={setDashboardLayout}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      {layouts.map((layout) => (
                        <SelectItem key={layout.id} value={layout.id}>
                          <div>
                            <div className="font-medium">{layout.name}</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">
                              {layout.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language & Regional
              </CardTitle>
              <CardDescription>
                Set your preferred language and regional settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Currency</label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code}>
                          {curr.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">
                        Language Support
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        KnowYourTax.ai supports 10 major Indian languages. AI features and voice commands 
                        work best in English and Hindi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {getNotificationDescription(key)}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => handleNotificationChange(key, checked)}
                    />
                  </div>
                ))}
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Bell className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900 dark:text-orange-100">
                      Smart Notifications
                    </h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Enable tax reminders and deadline alerts to never miss important tax dates. 
                      AI insights provide personalized tax optimization tips.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Control your data privacy and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Profile Visibility</label>
                  <Select 
                    value={privacy.profileVisibility} 
                    onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private - Only you can see</SelectItem>
                      <SelectItem value="anonymous">Anonymous - Visible but no personal info</SelectItem>
                      <SelectItem value="public">Public - Full profile visible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  {Object.entries(privacy).filter(([key]) => key !== "profileVisibility").map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {getPrivacyDescription(key)}
                        </p>
                      </div>
                      <Switch
                        checked={value as boolean}
                        onCheckedChange={(checked) => handlePrivacyChange(key, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 dark:text-green-100">
                      Your Data is Secure
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      KnowYourTax.ai uses end-to-end encryption for all your financial data. 
                      You have complete control over what information is shared and stored.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Advanced Settings
              </CardTitle>
              <CardDescription>
                Advanced configuration and data management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Data Synchronization</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-sm">Auto Sync</label>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Automatically sync data across devices
                        </p>
                      </div>
                      <Switch
                        checked={dataSync.autoSync}
                        onCheckedChange={(checked) => handleDataSyncChange("autoSync", checked)}
                      />
                    </div>

                    {dataSync.autoSync && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Sync Frequency</label>
                        <Select 
                          value={dataSync.syncFrequency} 
                          onValueChange={(value) => handleDataSyncChange("syncFrequency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-sm">Offline Mode</label>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Use app without internet connection
                        </p>
                      </div>
                      <Switch
                        checked={dataSync.offlineMode}
                        onCheckedChange={(checked) => handleDataSyncChange("offlineMode", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <label className="text-sm font-medium mb-3 block">Data Management</label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="flex items-center gap-2" onClick={exportSettings}>
                      <Download className="h-4 w-4" />
                      Export Settings
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Import Settings
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Reset to Default
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Monitor className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900 dark:text-purple-100">
                      Pro Features
                    </h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Advanced users can enable experimental features, custom API integrations, 
                      and detailed analytics tracking.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Save Preferences</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your settings will be automatically saved
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save All Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getNotificationDescription(key: string): string {
  const descriptions: Record<string, string> = {
    taxReminders: "Get reminded about upcoming tax payments and deadlines",
    deadlineAlerts: "Critical alerts for tax filing deadlines",
    aiInsights: "Personalized AI recommendations and tax optimization tips",
    communityUpdates: "Updates from the KnowYourTax.ai community",
    marketUpdates: "Tax law changes and market updates"
  }
  return descriptions[key] || ""
}

function getPrivacyDescription(key: string): string {
  const descriptions: Record<string, string> = {
    dataSharing: "Allow sharing of anonymous data for research",
    analyticsTracking: "Help improve KnowYourTax.ai with usage analytics",
    locationAccess: "Enable location-based tax features"
  }
  return descriptions[key] || ""
}