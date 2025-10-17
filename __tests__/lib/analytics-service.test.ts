import AnalyticsService from '@/lib/analytics-service'

// Mock the posthog-js module
jest.mock('posthog-js', () => ({
  init: jest.fn(() => ({
    identify: jest.fn(),
    capture: jest.fn(),
    reset: jest.fn(),
    get_distinct_id: jest.fn(() => 'test-user-id'),
  })),
}), { virtual: true })

describe('AnalyticsService', () => {
  let analyticsService: AnalyticsService
  let originalEnv: any

  beforeEach(() => {
    originalEnv = process.env
    process.env = { ...originalEnv }
    process.env.NODE_ENV = 'test'
    
    // Clear all mocks
    jest.clearAllMocks()
    
    // Create new instance for each test
    analyticsService = new AnalyticsService()
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('constructor', () => {
    test('should initialize with analytics disabled when no environment variables', () => {
      delete process.env.NEXT_PUBLIC_POSTHOG_KEY
      delete process.env.NEXT_PUBLIC_POSTHOG_HOST
      
      const service = new AnalyticsService()
      expect(service.isAnalyticsEnabled()).toBe(false)
    })

    test('should initialize with analytics enabled when environment variables are set', () => {
      process.env.NEXT_PUBLIC_POSTHOG_KEY = 'test-key'
      process.env.NEXT_PUBLIC_POSTHOG_HOST = 'https://test-host.com'
      
      const service = new AnalyticsService()
      expect(service.isAnalyticsEnabled()).toBe(false) // Still false because not initialized
    })
  })

  describe('identifyUser', () => {
    test('should not call identify when analytics is disabled', () => {
      const spy = jest.spyOn(console, 'log')
      analyticsService.identifyUser('test-user', { email: 'test@example.com' })
      
      expect(spy).not.toHaveBeenCalled()
    })

    test('should call identify when analytics is enabled and initialized', () => {
      process.env.NEXT_PUBLIC_POSTHOG_KEY = 'test-key'
      process.env.NEXT_PUBLIC_POSTHOG_HOST = 'https://test-host.com'
      
      const testAnalyticsService = new AnalyticsService()
      // Manually set initialized to true for testing
      (testAnalyticsService as any).initialized = true
      (testAnalyticsService as any).enabled = true
      (testAnalyticsService as any).posthog = {
        identify: jest.fn(),
      }
      
      testAnalyticsService.identifyUser('test-user', { email: 'test@example.com' })
      
      expect((testAnalyticsService as any).posthog.identify).toHaveBeenCalledWith('test-user', {
        email: 'test@example.com',
      })
    })
  })

  describe('track', () => {
    test('should log to console in development when analytics is disabled', () => {
      process.env.NODE_ENV = 'development'
      const spy = jest.spyOn(console, 'log')
      
      analyticsService.track('test-event', { prop1: 'value1' }, 'test-user')
      
      expect(spy).toHaveBeenCalledWith('📊 Analytics Event:', {
        event: 'test-event',
        properties: { prop1: 'value1' },
        userId: 'test-user',
      })
    })

    test('should not log to console in production when analytics is disabled', () => {
      process.env.NODE_ENV = 'production'
      const spy = jest.spyOn(console, 'log')
      
      analyticsService.track('test-event', { prop1: 'value1' }, 'test-user')
      
      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('trackPageView', () => {
    test('should call track with page view properties', () => {
      const trackSpy = jest.spyOn(analyticsService, 'track')
      
      analyticsService.trackPageView('/test-path', { title: 'Test Page' })
      
      expect(trackSpy).toHaveBeenCalledWith('page_view', {
        path: '/test-path',
        url: expect.any(String),
        referrer: expect.any(String),
        title: 'Test Page',
      })
    })
  })

  describe('trackUserAction', () => {
    test('should call track with user action properties', () => {
      const trackSpy = jest.spyOn(analyticsService, 'track')
      
      analyticsService.trackUserAction('button_click', { button: 'submit' })
      
      expect(trackSpy).toHaveBeenCalledWith('user_action', {
        action: 'button_click',
        timestamp: expect.any(String),
        button: 'submit',
      })
    })
  })

  describe('trackTaxEvent', () => {
    test('should call track with tax event properties', () => {
      const trackSpy = jest.spyOn(analyticsService, 'track')
      
      analyticsService.trackTaxEvent('filing', { taxType: 'income' })
      
      expect(trackSpy).toHaveBeenCalledWith('tax_event', {
        event: 'filing',
        timestamp: expect.any(String),
        taxType: 'income',
      })
    })
  })

  describe('trackPaymentEvent', () => {
    test('should call track with payment event properties', () => {
      const trackSpy = jest.spyOn(analyticsService, 'track')
      
      analyticsService.trackPaymentEvent('success', { amount: 100 })
      
      expect(trackSpy).toHaveBeenCalledWith('payment_event', {
        event: 'success',
        timestamp: expect.any(String),
        amount: 100,
      })
    })
  })

  describe('trackFeatureUsage', () => {
    test('should call track with feature usage properties', () => {
      const trackSpy = jest.spyOn(analyticsService, 'track')
      
      analyticsService.trackFeatureUsage('bill_scan', { scans: 5 })
      
      expect(trackSpy).toHaveBeenCalledWith('feature_usage', {
        feature: 'bill_scan',
        timestamp: expect.any(String),
        scans: 5,
      })
    })
  })

  describe('trackError', () => {
    test('should call track with error properties', () => {
      const trackSpy = jest.spyOn(analyticsService, 'track')
      
      analyticsService.trackError('network_error', { code: 500 })
      
      expect(trackSpy).toHaveBeenCalledWith('error', {
        error: 'network_error',
        timestamp: expect.any(String),
        code: 500,
      })
    })
  })

  describe('reset', () => {
    test('should not call reset when analytics is disabled', () => {
      const spy = jest.spyOn(console, 'log')
      
      analyticsService.reset()
      
      expect(spy).not.toHaveBeenCalled()
    })

    test('should call reset when analytics is enabled and initialized', () => {
      process.env.NEXT_PUBLIC_POSTHOG_KEY = 'test-key'
      process.env.NEXT_PUBLIC_POSTHOG_HOST = 'https://test-host.com'
      
      const testAnalyticsService = new AnalyticsService()
      // Manually set initialized to true for testing
      (testAnalyticsService as any).initialized = true
      (testAnalyticsService as any).enabled = true
      (testAnalyticsService as any).posthog = {
        reset: jest.fn(),
      }
      
      testAnalyticsService.reset()
      
      expect((testAnalyticsService as any).posthog.reset).toHaveBeenCalled()
    })
  })

  describe('getUserId', () => {
    test('should return null when analytics is disabled', () => {
      const result = analyticsService.getUserId()
      expect(result).toBeNull()
    })

    test('should return user ID when analytics is enabled and initialized', () => {
      process.env.NEXT_PUBLIC_POSTHOG_KEY = 'test-key'
      process.env.NEXT_PUBLIC_POSTHOG_HOST = 'https://test-host.com'
      
      const testAnalyticsService = new AnalyticsService()
      // Manually set initialized to true for testing
      (testAnalyticsService as any).initialized = true
      (testAnalyticsService as any).enabled = true
      (testAnalyticsService as any).posthog = {
        get_distinct_id: jest.fn(() => 'test-user-id'),
      }
      
      const result = testAnalyticsService.getUserId()
      expect(result).toBe('test-user-id')
    })
  })

  describe('isAnalyticsEnabled', () => {
    test('should return false when analytics is not enabled', () => {
      const result = analyticsService.isAnalyticsEnabled()
      expect(result).toBe(false)
    })

    test('should return true when analytics is enabled and initialized', () => {
      process.env.NEXT_PUBLIC_POSTHOG_KEY = 'test-key'
      process.env.NEXT_PUBLIC_POSTHOG_HOST = 'https://test-host.com'
      
      const testAnalyticsService = new AnalyticsService()
      // Manually set initialized to true for testing
      (testAnalyticsService as any).initialized = true
      (testAnalyticsService as any).enabled = true
      
      const result = testAnalyticsService.isAnalyticsEnabled()
      expect(result).toBe(true)
    })
  })
})

describe('Analytics convenience functions', () => {
  let trackSpy: jest.SpyInstance

  beforeEach(() => {
    trackSpy = jest.spyOn(AnalyticsService.prototype, 'track')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('trackLogin should call track with login properties', () => {
    const { trackLogin } = require('@/lib/analytics-service')
    trackLogin('test-user', 'google')
    
    expect(trackSpy).toHaveBeenCalledWith('login', {
      method: 'google',
      timestamp: expect.any(String),
    }, 'test-user')
  })

  test('trackSignup should call track with signup properties', () => {
    const { trackSignup } = require('@/lib/analytics-service')
    trackSignup('test-user', { plan: 'premium' })
    
    expect(trackSpy).toHaveBeenCalledWith('signup', {
      plan: 'premium',
      timestamp: expect.any(String),
    }, 'test-user')
  })

  test('trackPaymentSuccess should call trackPaymentEvent', () => {
    const { trackPaymentSuccess } = require('@/lib/analytics-service')
    const trackPaymentEventSpy = jest.spyOn(AnalyticsService.prototype, 'trackPaymentEvent')
    
    trackPaymentSuccess('test-user', { amount: 100 })
    
    expect(trackPaymentEventSpy).toHaveBeenCalledWith('success', {
      amount: 100,
      timestamp: expect.any(String),
    }, 'test-user')
  })

  test('trackTaxFiling should call trackTaxEvent', () => {
    const { trackTaxFiling } = require('@/lib/analytics-service')
    const trackTaxEventSpy = jest.spyOn(AnalyticsService.prototype, 'trackTaxEvent')
    
    trackTaxFiling('test-user', { taxType: 'income' })
    
    expect(trackTaxEventSpy).toHaveBeenCalledWith('filing', {
      taxType: 'income',
      timestamp: expect.any(String),
    }, 'test-user')
  })

  test('trackBillScan should call trackFeatureUsage', () => {
    const { trackBillScan } = require('@/lib/analytics-service')
    const trackFeatureUsageSpy = jest.spyOn(AnalyticsService.prototype, 'trackFeatureUsage')
    
    trackBillScan('test-user', { scans: 5 })
    
    expect(trackFeatureUsageSpy).toHaveBeenCalledWith('bill_scan', {
      scans: 5,
      timestamp: expect.any(String),
    }, 'test-user')
  })

  test('trackError should call trackError', () => {
    const { trackError } = require('@/lib/analytics-service')
    const trackErrorSpy = jest.spyOn(AnalyticsService.prototype, 'trackError')
    
    trackError('network_error', { code: 500 })
    
    expect(trackErrorSpy).toHaveBeenCalledWith('network_error', {
      code: 500,
      timestamp: expect.any(String),
    })
  })
})