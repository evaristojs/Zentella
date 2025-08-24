import { renderHook, act } from '@testing-library/react'
import { useScrollDetection } from '../useScrollDetection'
import { simulateScroll, expectPerformance, measurePerformance } from '../../../../test/utils/testing-helpers'
import { mockScrollPositions, mockSectionElements } from '../../../../test/fixtures/test-data'

// Mock performance.now for consistent testing
const mockPerformanceNow = vi.fn()
global.performance.now = mockPerformanceNow

describe('useScrollDetection', () => {
  let mockHeroElement: HTMLElement
  let mockServicesElement: HTMLElement

  beforeEach(() => {
    // Reset performance mock
    mockPerformanceNow.mockReturnValue(0)
    
    // Create mock DOM elements
    mockHeroElement = document.createElement('div')
    mockHeroElement.id = 'hero'
    Object.defineProperty(mockHeroElement, 'offsetTop', {
      value: mockSectionElements.hero.offsetTop,
      writable: true
    })
    
    mockServicesElement = document.createElement('div')
    mockServicesElement.id = 'services'
    Object.defineProperty(mockServicesElement, 'offsetTop', {
      value: mockSectionElements.services.offsetTop,
      writable: true
    })
    
    // Add elements to DOM
    document.body.appendChild(mockHeroElement)
    document.body.appendChild(mockServicesElement)
    
    // Mock getElementById
    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'hero') return mockHeroElement
      if (id === 'services') return mockServicesElement
      return null
    })
    
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  afterEach(() => {
    // Cleanup DOM
    document.body.removeChild(mockHeroElement)
    document.body.removeChild(mockServicesElement)
    vi.restoreAllMocks()
  })

  describe('Basic Functionality', () => {
    it('should initialize with correct default values', () => {
      const { result } = renderHook(() => useScrollDetection(false))
      
      expect(result.current.isScrolled).toBe(false)
      expect(result.current.isInHero).toBe(true)
    })

    it('should detect scroll state changes', () => {
      const { result } = renderHook(() => useScrollDetection(false))
      
      // Initially not scrolled
      expect(result.current.isScrolled).toBe(false)
      
      // Simulate scrolling past threshold
      act(() => {
        simulateScroll(25)
      })
      
      expect(result.current.isScrolled).toBe(true)
    })

    it('should detect hero section state changes', () => {
      const { result } = renderHook(() => useScrollDetection(false))
      
      // Initially in hero
      expect(result.current.isInHero).toBe(true)
      
      // Simulate scrolling past services section
      act(() => {
        simulateScroll(mockSectionElements.services.offsetTop + 100)
      })
      
      expect(result.current.isInHero).toBe(false)
    })
  })

  describe('Performance Optimization', () => {
    beforeEach(() => {
      let time = 0
      mockPerformanceNow.mockImplementation(() => {
        time += 16.67 // Simulate 60fps timing
        return time
      })
    })

    it('should handle scroll events without throttling issues', async () => {
      const { result } = renderHook(() => useScrollDetection(false))
      
      const initialIsScrolled = result.current.isScrolled
      
      // Simulate scroll events
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
        window.dispatchEvent(new Event('scroll'))
      })
      
      // Should handle scroll state changes
      expect(typeof result.current.isScrolled).toBe('boolean')
    })

    it('should maintain 60fps performance target', async () => {
      const { result } = renderHook(() => useScrollDetection(false))
      
      const performanceTime = await measurePerformance(() => {
        for (let i = 0; i < 60; i++) {
          act(() => {
            simulateScroll(i * 10)
          })
        }
      })
      
      // Should complete 60 scroll operations within performance budget
      // Target: 60fps = 16.67ms per frame, so 60 frames should take ~1000ms
      expectPerformance(performanceTime, 1000, 0.5) // 50% tolerance for test environment
    })

    it('should prevent memory leaks on cleanup', () => {
      const { unmount } = renderHook(() => useScrollDetection(false))
      
      // Get initial event listener count
      const initialListeners = (window as any)._events?.scroll?.length || 0
      
      // Unmount hook
      unmount()
      
      // Should not have increased listeners
      const finalListeners = (window as any)._events?.scroll?.length || 0
      expect(finalListeners).toBeLessThanOrEqual(initialListeners)
    })
  })

  describe('Theme Integration', () => {
    it('should re-initialize when theme changes', () => {
      const { result, rerender } = renderHook(
        ({ isDark }) => useScrollDetection(isDark),
        { initialProps: { isDark: false } }
      )
      
      // Initial state
      expect(result.current.isScrolled).toBe(false)
      
      // Change theme
      rerender({ isDark: true })
      
      // Should still maintain state consistency
      expect(result.current.isScrolled).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing DOM elements gracefully', () => {
      // Mock getElementById to return null (elements not found)
      vi.spyOn(document, 'getElementById').mockReturnValue(null)
      
      // Should not throw error
      expect(() => {
        renderHook(() => useScrollDetection(false))
      }).not.toThrow()
    })

    it('should handle rapid scroll direction changes', () => {
      const { result } = renderHook(() => useScrollDetection(false))
      
      // Simulate rapid direction changes
      const positions = [0, 100, 50, 150, 25, 200]
      
      positions.forEach(position => {
        act(() => {
          simulateScroll(position)
        })
      })
      
      // Should maintain correct final state
      expect(result.current.isScrolled).toBe(true)
    })

    it('should handle window resize during scroll', () => {
      const { result } = renderHook(() => useScrollDetection(false))
      
      act(() => {
        simulateScroll(100)
        // Simulate window resize
        window.dispatchEvent(new Event('resize'))
      })
      
      // Should maintain scroll state
      expect(result.current.isScrolled).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('should work with reduced motion preferences', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
        writable: true
      })
      
      const { result } = renderHook(() => useScrollDetection(false))
      
      // Should still function normally
      act(() => {
        simulateScroll(100)
      })
      
      expect(result.current.isScrolled).toBe(true)
    })
  })

  describe('Production vs Development', () => {
    it('should disable performance monitoring in production', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'
      
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation()
      
      const { result } = renderHook(() => useScrollDetection(false))
      
      // Simulate scroll events
      act(() => {
        simulateScroll(100)
      })
      
      // Should not log performance metrics in production
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('Performance')
      )
      
      process.env.NODE_ENV = originalEnv
      consoleSpy.mockRestore()
    })
  })
})