'use client'

import { useState } from 'react'
import { Cookie, Shield, Eye, Settings, CheckCircle, AlertTriangle, Info, X, Check, Smartphone, Monitor } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CookiePolicyPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const cookieTypes = [
    {
      category: "Essential Cookies",
      icon: <Shield className="h-5 w-5 text-red-600" />,
      description: "Required for the website to function properly",
      purpose: "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.",
      examples: [
        "Session cookies - Maintain your login state",
        "Security cookies - Prevent fraud and protect your data",
        "Preference cookies - Remember your language and region settings",
        "Shopping cart cookies - Keep track of items in your cart"
      ],
      duration: "Session to 1 year",
      optional: false,
      dataCollected: ["Session ID", "Authentication status", "Security tokens", "User preferences"]
    },
    {
      category: "Analytics Cookies",
      icon: <Eye className="h-5 w-5 text-blue-600" />,
      description: "Help us understand how visitors interact with our website",
      purpose: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.",
      examples: [
        "Google Analytics - Track website usage and performance",
        "Hotjar - Understand user behavior through heatmaps",
        "Mixpanel - Analyze user engagement and conversion",
        "Custom analytics - Track specific user journeys"
      ],
      duration: "1-2 years",
      optional: true,
      dataCollected: ["Pages visited", "Time spent on site", "Browser information", "Device type", "Geographic location"]
    },
    {
      category: "Marketing Cookies",
      icon: <Monitor className="h-5 w-5 text-purple-600" />,
      description: "Used to track advertising effectiveness and serve relevant ads",
      purpose: "These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device.",
      examples: [
        "Google Ads - Track ad performance and conversions",
        "Facebook Pixel - Show targeted ads on Facebook",
        "LinkedIn Insight Tag - Track professional audience engagement",
        "Twitter Ads - Serve relevant ads on Twitter platform"
      ],
      duration: "6 months to 2 years",
      optional: true,
      dataCollected: ["Ad interaction data", "Conversion tracking", "Device fingerprinting", "Interest categories"]
    },
    {
      category: "Preference Cookies",
      icon: <Settings className="h-5 w-5 text-green-600" />,
      description: "Remember your settings and preferences",
      purpose: "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies, some or all of these services may not function properly.",
      examples: [
        "Theme preferences - Remember dark/light mode selection",
        "Font size settings - Maintain your preferred text size",
        "Language selection - Keep your chosen language",
        "Layout preferences - Remember your dashboard layout"
      ],
      duration: "1-5 years",
      optional: true,
      dataCollected: ["Theme settings", "Font preferences", "Language choice", "Layout configuration"]
    },
    {
      category: "Functional Cookies",
      icon: <Check className="h-5 w-5 text-orange-600" />,
      description: "Enable enhanced functionality and personalization",
      purpose: "These cookies are used to make the website experience more personalized and relevant to you. They remember your preferences and help us understand how you use our site so we can improve your experience.",
      examples: [
        "Video player preferences - Remember volume and quality settings",
        "Chat widget settings - Maintain chat history and preferences",
        "Form autofill - Remember previously entered information",
        "Personalized content - Show relevant tax tips and articles"
      ],
      duration: "6 months to 2 years",
      optional: true,
      dataCollected: ["User preferences", "Interaction history", "Personalization data", "Feature usage"]
    }
  ]

  const thirdPartyCookies = [
    {
      provider: "Google Analytics",
      purpose: "Website analytics and performance measurement",
      privacyPolicy: "https://policies.google.com/privacy",
      cookies: ["_ga", "_gid", "_gat", "AMP_TOKEN"]
    },
    {
      provider: "Google Ads",
      purpose: "Advertising conversion tracking and remarketing",
      privacyPolicy: "https://policies.google.com/privacy",
      cookies: ["_gcl_au", "1P_JAR", "AEC", "NID"]
    },
    {
      provider: "Facebook",
      purpose: "Social media integration and advertising",
      privacyPolicy: "https://www.facebook.com/privacy/policy",
      cookies: ["fr", "sb", "datr", "c_user"]
    },
    {
      provider: "Hotjar",
      purpose: "User behavior analysis and heatmaps",
      privacyPolicy: "https://www.hotjar.com/legal/policies/privacy",
      cookies: ["_hjFirstSeen", "_hjIncludedInSample", "_hjAbsoluteSessionInProgress"]
    },
    {
      provider: "Stripe",
      purpose: "Payment processing and security",
      privacyPolicy: "https://stripe.com/privacy",
      cookies: ["__stripe_mid", "__stripe_sid", "m"]
    }
  ]

  const browserInstructions = [
    {
      browser: "Chrome",
      steps: [
        "Click on the three dots in the top-right corner",
        "Select 'Settings'",
        "Click on 'Privacy and security'",
        "Select 'Cookies and other site data'",
        "Choose your preferred cookie settings"
      ],
      icon: <Monitor className="h-6 w-6" />
    },
    {
      browser: "Firefox",
      steps: [
        "Click on the three lines in the top-right corner",
        "Select 'Options'",
        "Click on 'Privacy & Security'",
        "Scroll to 'Cookies and Site Data'",
        "Choose your preferred cookie settings"
      ],
      icon: <Monitor className="h-6 w-6" />
    },
    {
      browser: "Safari",
      steps: [
        "Click on 'Safari' in the menu bar",
        "Select 'Preferences'",
        "Click on the 'Privacy' tab",
        "Choose your cookie preferences",
        "Select 'Block all cookies' or 'Block third-party cookies'"
      ],
      icon: <Monitor className="h-6 w-6" />
    },
    {
      browser: "Edge",
      steps: [
        "Click on the three dots in the top-right corner",
        "Select 'Settings'",
        "Click on 'Privacy, search, and services'",
        "Scroll to 'Cookies'",
        "Choose your preferred cookie settings"
      ],
      icon: <Monitor className="h-6 w-6" />
    },
    {
      browser: "Mobile (iOS/Android)",
      steps: [
        "Open your device's 'Settings' app",
        "Select 'Privacy' or 'Security'",
        "Find 'Cookies' or 'Website Data'",
        "Choose your preferred settings",
        "For specific apps, check app settings"
      ],
      icon: <Smartphone className="h-6 w-6" />
    }
  ]

  const cookieManagement = [
    {
      title: "Cookie Consent Banner",
      description: "Our cookie consent banner appears when you first visit our website, allowing you to make informed choices about which cookies to accept.",
      features: [
        "Clear categorization of cookie types",
        "Granular control over each category",
        "Remember your preferences for future visits",
        "Easy access to detailed cookie information"
      ]
    },
    {
      title: "Preference Center",
      description: "Access our cookie preference center anytime to update your cookie choices and manage your privacy settings.",
      features: [
        "Real-time cookie status updates",
        "Detailed information about each cookie type",
        "One-click acceptance or rejection",
        "Export your cookie preferences"
      ]
    },
    {
      title: "Do Not Track",
      description: "We respect the Do Not Track (DNT) signal sent by your browser to indicate that you do not want to be tracked.",
      features: [
        "Automatic detection of DNT signals",
        "Limited data collection when DNT is enabled",
        "Compliance with industry standards",
        "User control over tracking preferences"
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Last updated: March 15, 2024
        </p>
        <p className="text-gray-500 mt-2">
          Learn about the cookies we use, why we use them, and how you can manage your preferences.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="types">Cookie Types</TabsTrigger>
          <TabsTrigger value="third-party">Third Party</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
          <TabsTrigger value="browser">Browser Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cookie className="h-5 w-5" />
                  What Are Cookies?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, making your experience more efficient and personalized.
                </p>
                <p className="text-gray-600 mb-4">
                  At KYT.ai, we use cookies to enhance your experience, analyze website performance, and provide relevant content. This policy explains the different types of cookies we use and how you can manage your preferences.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Essential for website functionality</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Enhanced user experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Performance analytics</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Personalized content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Security and fraud prevention</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">User control and preferences</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why We Use Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Essential Functions</h4>
                    <p className="text-sm text-gray-600">Required for basic website operations like login and security.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2">Performance</h4>
                    <p className="text-sm text-gray-600">Help us understand how you use our site to improve performance.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium mb-2">Personalization</h4>
                    <p className="text-sm text-gray-600">Remember your preferences to provide a tailored experience.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="types" className="mt-8">
          <div className="grid gap-6">
            {cookieTypes.map((cookie, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {cookie.icon}
                      <div>
                        <CardTitle className="text-lg">{cookie.category}</CardTitle>
                        <CardDescription>{cookie.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={cookie.optional ? "secondary" : "default"}>
                      {cookie.optional ? "Optional" : "Required"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Purpose</h4>
                      <p className="text-sm text-gray-600">{cookie.purpose}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Examples</h4>
                      <ul className="space-y-1">
                        {cookie.examples.map((example, exIndex) => (
                          <li key={exIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2">Duration</h4>
                        <p className="text-sm text-gray-600">{cookie.duration}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Data Collected</h4>
                        <div className="flex flex-wrap gap-1">
                          {cookie.dataCollected.map((data, dataIndex) => (
                            <Badge key={dataIndex} variant="outline" className="text-xs">
                              {data}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="third-party" className="mt-8">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Third-Party Cookies</CardTitle>
                <CardDescription>
                  We work with trusted third-party service providers who may set cookies on your device when you visit our website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {thirdPartyCookies.map((provider, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{provider.provider}</h4>
                        <Button variant="outline" size="sm">
                          View Policy
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{provider.purpose}</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.cookies.map((cookie, cookieIndex) => (
                          <Badge key={cookieIndex} variant="outline" className="text-xs">
                            {cookie}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Third-Party Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We carefully select our third-party partners and ensure they comply with our privacy standards. All partners are required to:
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Comply with GDPR and Indian privacy laws</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Use data only for specified purposes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Provide transparent privacy policies</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Implement appropriate security measures</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Respect user consent and preferences</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Allow data deletion upon request</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="management" className="mt-8">
          <div className="grid gap-8">
            {cookieManagement.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.features.map((feature, featIndex) => (
                      <li key={featIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader>
                <CardTitle>Managing Your Cookie Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  You have several options to manage your cookie preferences:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-medium">Our Preference Center</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Accept Essential Cookies Only
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Accept All Cookies
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Customize Preferences
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Browser Settings</h4>
                    <p className="text-sm text-gray-600">
                      You can also manage cookies through your browser settings. See the "Browser Settings" tab for detailed instructions.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">Blocking essential cookies may affect website functionality</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Changes apply to all websites you visit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="browser" className="mt-8">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Browser-Specific Instructions</CardTitle>
                <CardDescription>
                  Follow these instructions to manage cookies in your preferred browser.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {browserInstructions.map((browser, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        {browser.icon}
                        <h4 className="font-medium">{browser.browser}</h4>
                      </div>
                      <ol className="space-y-2">
                        {browser.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                              {stepIndex + 1}
                            </span>
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Private/Incognito Mode</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Use private browsing mode to prevent cookies from being stored on your device.
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">No browsing history saved</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Cookies deleted after session</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Cookie Management Extensions</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Browser extensions can help you manage cookies more effectively.
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Real-time cookie blocking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Automatic cookie cleanup</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Need Help with Cookies?</CardTitle>
            <CardDescription>
              If you have any questions about our cookie policy or need assistance managing your preferences, our support team is here to help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Contact Support Team</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}