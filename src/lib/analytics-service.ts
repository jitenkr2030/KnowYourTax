// PostHog Analytics Service for KYT.ai

interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  user_id?: string
  timestamp?: Date
}

interface UserProperties {
  email?: string
  name?: string
  plan?: string
  account_type?: 'individual' | 'business'
  signup_date?: string
  last_login?: string
  features_used?: string[]
}

class AnalyticsService {
  private posthog: any
  private initialized: boolean = false
  private enabled: boolean = false

  constructor() {
    // Check if PostHog is available and configured
    this.enabled = !!process.env.NEXT_PUBLIC_POSTHOG_KEY && !!process.env.NEXT_PUBLIC_POSTHOG_HOST
    
    if (this.enabled && typeof window !== 'undefined') {
      this.initialize()
    }
  }

  private initialize() {
    try {
      // Dynamic import for PostHog (client-side only)
      import('posthog-js').then((posthogModule) => {
        const posthog = posthogModule.default
        this.posthog = posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST!,
          autocapture: false, // We'll manually capture important events
          capture_pageview: false, // We'll manually capture page views
          capture_pageleave: false,
          loaded: (posthog: any) => {
            this.initialized = true
            console.log('PostHog initialized successfully')
          },
        })
      }).catch((error) => {
        console.error('Failed to load PostHog:', error)
      })
    } catch (error) {
      console.error('PostHog initialization error:', error)
    }
  }

  // Identify user
  identifyUser(userId: string, properties: UserProperties) {
    if (!this.enabled || !this.initialized || !this.posthog) return

    try {
      this.posthog.identify(userId, properties)
      console.log('User identified:', userId, properties)
    } catch (error) {
      console.error('Error identifying user:', error)
    }
  }

  // Track event
  track(event: string, properties?: Record<string, any>, userId?: string) {
    if (!this.enabled || !this.initialized || !this.posthog) {
      // Fallback to console logging in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Analytics Event:', { event, properties, userId })
      }
      return
    }

    try {
      this.posthog.capture(event, {
        ...properties,
        ...(userId && { distinct_id: userId }),
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Error tracking event:', error)
    }
  }

  // Track page view
  trackPageView(path: string, properties?: Record<string, any>) {
    this.track('page_view', {
      path,
      url: window.location.href,
      referrer: document.referrer,
      ...properties,
    })
  }

  // Track user actions
  trackUserAction(action: string, properties?: Record<string, any>) {
    this.track('user_action', {
      action,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  // Track tax-related events
  trackTaxEvent(event: string, properties?: Record<string, any>) {
    this.track('tax_event', {
      event,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  // Track payment events
  trackPaymentEvent(event: string, properties?: Record<string, any>) {
    this.track('payment_event', {
      event,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  // Track subscription events
  trackSubscriptionEvent(event: string, properties?: Record<string, any>) {
    this.track('subscription_event', {
      event,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  // Track feature usage
  trackFeatureUsage(feature: string, properties?: Record<string, any>) {
    this.track('feature_usage', {
      feature,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  // Track errors
  trackError(error: string, properties?: Record<string, any>) {
    this.track('error', {
      error,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  // Track performance metrics
  trackPerformance(metric: string, value: number, properties?: Record<string, any>) {
    this.track('performance', {
      metric,
      value,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  // Track user engagement
  trackEngagement(action: string, properties?: Record<string, any>) {
    this.track('engagement', {
      action,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  // Track conversion events
  trackConversion(event: string, properties?: Record<string, any>) {
    this.track('conversion', {
      event,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  // Reset user identification (on logout)
  reset() {
    if (!this.enabled || !this.initialized || !this.posthog) return

    try {
      this.posthog.reset()
      console.log('User identification reset')
    } catch (error) {
      console.error('Error resetting user:', error)
    }
  }

  // Get user ID from PostHog
  getUserId(): string | null {
    if (!this.enabled || !this.initialized || !this.posthog) return null
    
    try {
      return this.posthog.get_distinct_id()
    } catch (error) {
      console.error('Error getting user ID:', error)
      return null
    }
  }

  // Check if analytics is enabled
  isAnalyticsEnabled(): boolean {
    return this.enabled && this.initialized
  }

  // Manually capture page view (for SPA navigation)
  capturePageView() {
    if (!this.enabled || !this.initialized || !this.posthog) return

    try {
      this.posthog.capture('$pageview')
    } catch (error) {
      console.error('Error capturing page view:', error)
    }
  }
}

// Create a singleton instance
export const analytics = new AnalyticsService()

// Convenience functions for common events
export const trackLogin = (userId: string, method: string = 'email') => {
  analytics.track('login', {
    method,
    timestamp: new Date().toISOString(),
  }, userId)
}

export const trackSignup = (userId: string, properties: Record<string, any>) => {
  analytics.track('signup', {
    ...properties,
    timestamp: new Date().toISOString(),
  }, userId)
}

export const trackPaymentSuccess = (userId: string, properties: Record<string, any>) => {
  analytics.trackPaymentEvent('success', {
    ...properties,
    timestamp: new Date().toISOString(),
  }, userId)
}

export const trackPaymentFailure = (userId: string, properties: Record<string, any>) => {
  analytics.trackPaymentEvent('failure', {
    ...properties,
    timestamp: new Date().toISOString(),
  }, userId)
}

export const trackSubscriptionUpgrade = (userId: string, properties: Record<string, any>) => {
  analytics.trackSubscriptionEvent('upgrade', {
    ...properties,
    timestamp: new Date().toISOString(),
  }, userId)
}

export const trackSubscriptionDowngrade = (userId: string, properties: Record<string, any>) => {
  analytics.trackSubscriptionEvent('downgrade', {
    ...properties,
    timestamp: new Date().toISOString(),
  }, userId)
}

export const trackSubscriptionCancellation = (userId: string, properties: Record<string, any>) => {
  analytics.trackSubscriptionEvent('cancellation', {
    ...properties,
    timestamp: new Date().toISOString(),
  }, userId)
}

export const trackTaxFiling = (userId: string, properties: Record<string, any>) => {
  analytics.trackTaxEvent('filing', {
    ...properties,
    timestamp: new Date().toISOString(),
  }, userId)
}

export const trackTaxCalculation = (userId: string, properties: Record<string, any>) => {
  analytics.trackTaxEvent('calculation', {
    ...properties,
    timestamp: new Date().toISOString(),
  }, userId)
}

export const trackBillScan = (userId: string, properties: Record<string, any>) => {
  analytics.trackFeatureUsage('bill_scan', {
    ...properties,
    timestamp: new Date().toISOString(),
  }, userId)
}

export const trackReportGeneration = (userId: string, properties: Record<string, any>) => {
  analytics.trackFeatureUsage('report_generation', {
    ...properties,
    timestamp: new Date().toISOString(),
  }, userId)
}

export const trackError = (error: string, properties: Record<string, any>) => {
  analytics.trackError(error, {
    ...properties,
    timestamp: new Date().toISOString(),
  })
}

export default AnalyticsService