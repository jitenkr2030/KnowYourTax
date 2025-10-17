'use client'

import { useCallback } from 'react'

interface EventLogData {
  eventType: string
  userId?: string
  accountId?: string
  properties?: Record<string, any>
}

export function useEventLog() {
  const logEvent = useCallback(async (data: EventLogData) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        console.error('Failed to log event:', await response.text())
        return null
      }

      const result = await response.json()
      return result.data
    } catch (error) {
      console.error('Error logging event:', error)
      return null
    }
  }, [])

  const logPageView = useCallback((page: string, properties?: Record<string, any>) => {
    return logEvent({
      eventType: 'page_view',
      properties: {
        page,
        ...properties,
      },
    })
  }, [logEvent])

  const logFeatureUsage = useCallback((feature: string, action?: string, properties?: Record<string, any>) => {
    return logEvent({
      eventType: 'feature_usage',
      properties: {
        feature,
        action,
        ...properties,
      },
    })
  }, [logEvent])

  const logPaymentEvent = useCallback((event: string, properties?: Record<string, any>) => {
    return logEvent({
      eventType: 'payment_event',
      properties: {
        event,
        ...properties,
      },
    })
  }, [logEvent])

  const logTaxEvent = useCallback((event: string, properties?: Record<string, any>) => {
    return logEvent({
      eventType: 'tax_event',
      properties: {
        event,
        ...properties,
      },
    })
  }, [logEvent])

  const logError = useCallback((error: string, properties?: Record<string, any>) => {
    return logEvent({
      eventType: 'error',
      properties: {
        error,
        ...properties,
      },
    })
  }, [logEvent])

  return {
    logEvent,
    logPageView,
    logFeatureUsage,
    logPaymentEvent,
    logTaxEvent,
    logError,
  }
}