'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEventLog } from '@/hooks/use-event-log'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function EventLogger() {
  const { logEvent, logPageView, logFeatureUsage, logPaymentEvent, logTaxEvent, logError } = useEventLog()
  const [eventType, setEventType] = useState('')
  const [properties, setProperties] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleLogEvent = async () => {
    if (!eventType) {
      setResult({ success: false, message: 'Event type is required' })
      return
    }

    setLoading(true)
    try {
      let parsedProperties = {}
      if (properties.trim()) {
        try {
          parsedProperties = JSON.parse(properties)
        } catch (e) {
          setResult({ success: false, message: 'Invalid JSON in properties' })
          setLoading(false)
          return
        }
      }

      const eventResult = await logEvent({
        eventType,
        properties: parsedProperties,
      })

      if (eventResult) {
        setResult({ success: true, message: 'Event logged successfully' })
      } else {
        setResult({ success: false, message: 'Failed to log event' })
      }
    } catch (error) {
      setResult({ success: false, message: 'Error logging event' })
    } finally {
      setLoading(false)
    }
  }

  const handleQuickEvent = async (type: string) => {
    setLoading(true)
    try {
      let eventResult
      switch (type) {
        case 'page_view':
          eventResult = await logPageView('/dashboard', { referrer: 'direct' })
          break
        case 'feature_usage':
          eventResult = await logFeatureUsage('bill_scanner', 'scan', { pages: 3 })
          break
        case 'payment_event':
          eventResult = await logPaymentEvent('payment_success', { amount: 999, plan: 'PRO' })
          break
        case 'tax_event':
          eventResult = await logTaxEvent('tax_entry_created', { type: 'INCOME_TAX', amount: 50000 })
          break
        case 'error':
          eventResult = await logError('validation_error', { field: 'email', message: 'Invalid email format' })
          break
        default:
          eventResult = await logEvent({ eventType: type, properties: { quick: true } })
      }

      if (eventResult) {
        setResult({ success: true, message: `${type} event logged successfully` })
      } else {
        setResult({ success: false, message: `Failed to log ${type} event` })
      }
    } catch (error) {
      setResult({ success: false, message: `Error logging ${type} event` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Event Logger</CardTitle>
          <CardDescription>Test event logging functionality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eventType">Event Type</Label>
            <Input
              id="eventType"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              placeholder="e.g., page_view, feature_usage, error"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="properties">Properties (JSON)</Label>
            <Textarea
              id="properties"
              value={properties}
              onChange={(e) => setProperties(e.target.value)}
              placeholder='{"key": "value", "number": 123}'
              rows={3}
            />
          </div>

          <Button onClick={handleLogEvent} disabled={loading || !eventType}>
            <Send className="w-4 h-4 mr-2" />
            {loading ? 'Logging...' : 'Log Event'}
          </Button>

          {result && (
            <div className={`flex items-center space-x-2 p-3 rounded-lg ${
              result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {result.success ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{result.message}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Events</CardTitle>
          <CardDescription>Test common event types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickEvent('page_view')}
              disabled={loading}
            >
              Page View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickEvent('feature_usage')}
              disabled={loading}
            >
              Feature Usage
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickEvent('payment_event')}
              disabled={loading}
            >
              Payment Event
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickEvent('tax_event')}
              disabled={loading}
            >
              Tax Event
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickEvent('error')}
              disabled={loading}
            >
              Error
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickEvent('user_action')}
              disabled={loading}
            >
              User Action
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}