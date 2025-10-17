import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from '@/hooks/use-mobile'

// Mock window.matchMedia
const mockMatchMedia = jest.fn()
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
})

describe('useIsMobile Hook', () => {
  beforeEach(() => {
    // Reset window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    
    // Clear all mocks
    jest.clearAllMocks()
  })

  test('should return false when window width is greater than mobile breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const mockMediaQueryList = {
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    const { result } = renderHook(() => useIsMobile())
    
    expect(result.current).toBe(false)
  })

  test('should return true when window width is less than mobile breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    const mockMediaQueryList = {
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    const { result } = renderHook(() => useIsMobile())
    
    expect(result.current).toBe(true)
  })

  test('should add and remove event listener on mount and unmount', () => {
    const mockMediaQueryList = {
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    const { unmount } = renderHook(() => useIsMobile())
    
    expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    
    unmount()
    
    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  test('should update isMobile when window width changes', () => {
    // Initial setup - desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    let changeCallback: ((event: MediaQueryListEvent) => void) | null = null

    const mockMediaQueryList = {
      matches: false,
      addEventListener: jest.fn((event: string, callback: (event: MediaQueryListEvent) => void) => {
        if (event === 'change') {
          changeCallback = callback
        }
      }),
      removeEventListener: jest.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    const { result } = renderHook(() => useIsMobile())
    
    expect(result.current).toBe(false)
    
    // Simulate window resize to mobile
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      })
      
      if (changeCallback) {
        const mockEvent = {
          matches: true,
        } as MediaQueryListEvent
        changeCallback(mockEvent)
      }
    })
    
    expect(result.current).toBe(true)
  })

  test('should handle undefined initial state correctly', () => {
    const mockMediaQueryList = {
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    const { result } = renderHook(() => useIsMobile())
    
    // The hook should return a boolean, not undefined
    expect(typeof result.current).toBe('boolean')
  })

  test('should use correct mobile breakpoint (768px)', () => {
    // Test exactly at breakpoint (should be desktop)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })

    const mockMediaQueryList = {
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    const { result } = renderHook(() => useIsMobile())
    
    expect(result.current).toBe(false)
    
    // Test just below breakpoint (should be mobile)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767,
    })

    const mockMediaQueryList2 = {
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMediaQueryList2)

    const { result: result2 } = renderHook(() => useIsMobile())
    
    expect(result2.current).toBe(true)
  })

  test('should handle multiple media query changes', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    let changeCallback: ((event: MediaQueryListEvent) => void) | null = null

    const mockMediaQueryList = {
      matches: false,
      addEventListener: jest.fn((event: string, callback: (event: MediaQueryListEvent) => void) => {
        if (event === 'change') {
          changeCallback = callback
        }
      }),
      removeEventListener: jest.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    const { result } = renderHook(() => useIsMobile())
    
    expect(result.current).toBe(false)
    
    // Change to mobile
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      })
      
      if (changeCallback) {
        const mockEvent = {
          matches: true,
        } as MediaQueryListEvent
        changeCallback(mockEvent)
      }
    })
    
    expect(result.current).toBe(true)
    
    // Change back to desktop
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      })
      
      if (changeCallback) {
        const mockEvent = {
          matches: false,
        } as MediaQueryListEvent
        changeCallback(mockEvent)
      }
    })
    
    expect(result.current).toBe(false)
  })
})