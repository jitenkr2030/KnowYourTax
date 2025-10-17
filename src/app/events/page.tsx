'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import EventLogger from '@/components/EventLogger'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import { Activity, BarChart3, Send } from 'lucide-react'

interface EventData {
  id: string
  eventType: string
  userId?: string
  accountId?: string
  properties: Record<string, any>
  timestamp: string
  ipAddress?: string
  userAgent?: string
}

export default function EventsPage() {
  const [recentEvents, setRecentEvents] = useState<EventData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentEvents()
  }, [])

  const fetchRecentEvents = async () => {
    try {
      const response = await fetch('/api/events?limit=50')
      const data = await response.json()
      setRecentEvents(data.data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'page_view':
        return <Activity className="w-4 h-4 text-blue-600" />
      case 'feature_usage':
        return <BarChart3 className="w-4 h-4 text-green-600" />
      case 'payment_event':
        return <Send className="w-4 h-4 text-purple-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Event Logging & Analytics</h1>
        <p className="text-gray-600">Track user behavior and system events in real-time</p>
      </div>

      <Tabs defaultValue="logger" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="logger">Event Logger</TabsTrigger>
          <TabsTrigger value="events">Recent Events</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="logger" className="mt-8">
          <EventLogger />
        </TabsContent>

        <TabsContent value="events" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>Latest system and user events</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading events...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {getEventIcon(event.eventType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{event.eventType}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          User: {event.userId || 'anonymous'} | Account: {event.accountId || 'N/A'}
                        </p>
                        {Object.keys(event.properties).length > 0 && (
                          <div className="mt-2">
                            <details className="text-sm">
                              <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                                Properties
                              </summary>
                              <pre className="mt-1 p-2 bg-gray-50 rounded text-xs overflow-x-auto">
                                {JSON.stringify(event.properties, null, 2)}
                              </pre>
                            </details>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {recentEvents.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No events found. Start by logging some events!</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-8">
          <AnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}