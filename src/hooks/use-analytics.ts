import { useEffect, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { analytics, trackLogin, trackSignup, trackPageView } from '@/lib/analytics-service'

// Hook for tracking page views
export function usePageTracking() {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Track initial page view
      trackPageView(window.location.pathname, {
        title: document.title,
        referrer: document.referrer,
      })

      // Track route changes
      const handleRouteChange = (url: string) => {
        trackPageView(url, {
          title: document.title,
          referrer: window.location.pathname,
        })
      }

      router.events?.on('routeChangeStart', handleRouteChange)

      return () => {
        router.events?.off('routeChangeStart', handleRouteChange)
      }
    }
  }, [router])

  useEffect(() => {
    if (session?.user) {
      // Identify user when session is available
      analytics.identifyUser(session.user.id, {
        email: session.user.email,
        name: session.user.name,
        plan: session.user.account?.subscriptionPlan || 'FREE',
        account_type: session.user.account ? 'business' : 'individual',
        signup_date: session.user.createdAt,
        last_login: new Date().toISOString(),
      })
    }
  }, [session])
}

// Hook for tracking user actions
export function useActionTracking() {
  const trackAction = (action: string, properties?: Record<string, any>) => {
    analytics.trackUserAction(action, {
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  const trackFeature = (feature: string, properties?: Record<string, any>) => {
    analytics.trackFeatureUsage(feature, {
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  const trackTaxEvent = (event: string, properties?: Record<string, any>) => {
    analytics.trackTaxEvent(event, {
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  const trackPaymentEvent = (event: string, properties?: Record<string, any>) => {
    analytics.trackPaymentEvent(event, {
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  const trackError = (error: string, properties?: Record<string, any>) => {
    analytics.trackError(error, {
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  return {
    trackAction,
    trackFeature,
    trackTaxEvent,
    trackPaymentEvent,
    trackError,
  }
}

// Hook for tracking form submissions
export function useFormTracking(formName: string) {
  const { trackAction } = useActionTracking()

  const trackFormStart = () => {
    trackAction('form_start', {
      form: formName,
      timestamp: new Date().toISOString(),
    })
  }

  const trackFormSubmit = (success: boolean, properties?: Record<string, any>) => {
    trackAction('form_submit', {
      form: formName,
      success,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  const trackFormFieldChange = (field: string, value: any) => {
    trackAction('form_field_change', {
      form: formName,
      field,
      timestamp: new Date().toISOString(),
    })
  }

  return {
    trackFormStart,
    trackFormSubmit,
    trackFormFieldChange,
  }
}

// Hook for tracking feature usage
export function useFeatureTracking(featureName: string) {
  const { trackFeature } = useActionTracking()

  const trackFeatureUse = (action: string = 'use', properties?: Record<string, any>) => {
    trackFeature(featureName, {
      action,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  const trackFeatureSuccess = (properties?: Record<string, any>) => {
    trackFeatureUse('success', properties)
  }

  const trackFeatureError = (error: string, properties?: Record<string, any>) => {
    trackFeatureUse('error', {
      error,
      ...properties,
    })
  }

  return {
    trackFeatureUse,
    trackFeatureSuccess,
    trackFeatureError,
  }
}

// Hook for tracking performance
export function usePerformanceTracking() {
  const trackPerformance = (metric: string, value: number, properties?: Record<string, any>) => {
    analytics.trackPerformance(metric, value, {
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  const trackPageLoad = (loadTime: number) => {
    trackPerformance('page_load', loadTime, {
      unit: 'milliseconds',
    })
  }

  const trackApiCall = (endpoint: string, responseTime: number, success: boolean) => {
    trackPerformance('api_call', responseTime, {
      endpoint,
      success,
      unit: 'milliseconds',
    })
  }

  const trackFeatureLoad = (feature: string, loadTime: number) => {
    trackPerformance('feature_load', loadTime, {
      feature,
      unit: 'milliseconds',
    })
  }

  return {
    trackPerformance,
    trackPageLoad,
    trackApiCall,
    trackFeatureLoad,
  }
}

// Hook for tracking engagement
export function useEngagementTracking() {
  const trackEngagement = (action: string, properties?: Record<string, any>) => {
    analytics.trackEngagement(action, {
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  const trackClick = (element: string, properties?: Record<string, any>) => {
    trackEngagement('click', {
      element,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  const trackScroll = (scrollDepth: number, properties?: Record<string, any>) => {
    trackEngagement('scroll', {
      scroll_depth: scrollDepth,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  const trackTimeOnPage = (timeSpent: number) => {
    trackEngagement('time_on_page', {
      time_spent: timeSpent,
      unit: 'seconds',
    })
  }

  return {
    trackEngagement,
    trackClick,
    trackScroll,
    trackTimeOnPage,
  }
}

// Hook for tracking conversions
export function useConversionTracking() {
  const trackConversion = (event: string, properties?: Record<string, any>) => {
    analytics.trackConversion(event, {
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }

  const trackSignupConversion = (properties?: Record<string, any>) => {
    trackConversion('signup', {
      ...properties,
    })
  }

  const trackPaymentConversion = (properties?: Record<string, any>) => {
    trackConversion('payment', {
      ...properties,
    })
  }

  const trackSubscriptionConversion = (properties?: Record<string, any>) => {
    trackConversion('subscription', {
      ...properties,
    })
  }

  const trackFeatureAdoption = (feature: string, properties?: Record<string, any>) => {
    trackConversion('feature_adoption', {
      feature,
      ...properties,
    })
  }

  return {
    trackConversion,
    trackSignupConversion,
    trackPaymentConversion,
    trackSubscriptionConversion,
    trackFeatureAdoption,
  }
}

// Main analytics hook that combines all tracking
export function useAnalytics() {
  return {
    usePageTracking,
    useActionTracking,
    useFormTracking,
    useFeatureTracking,
    usePerformanceTracking,
    useEngagementTracking,
    useConversionTracking,
    analytics,
  }
}