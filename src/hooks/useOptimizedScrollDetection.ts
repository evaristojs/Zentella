import { useState, useEffect, useCallback, useRef } from 'react'
import { devLog } from '../utils/logger'

interface ScrollDetectionOptions {
  /**
   * Throttle scroll events to this many milliseconds
   * @default 16.67 (60fps)
   */
  throttleMs?: number
  
  /**
   * Scroll offset threshold to consider scrolled
   * @default 20
   */
  scrollThreshold?: number
  
  /**
   * Navigation bar height offset for hero detection
   * @default 80
   */
  navOffset?: number
  
  /**
   * Enable performance monitoring in development
   * @default true in development
   */
  enablePerformanceMonitoring?: boolean
}

interface ScrollState {
  isScrolled: boolean
  isInHero: boolean
  scrollY: number
  previousScrollY: number
  scrollDirection: 'up' | 'down' | null
}

/**
 * Optimized scroll detection hook with performance improvements
 * - Uses requestAnimationFrame for 60fps throttling
 * - Implements memory leak prevention
 * - Provides performance monitoring in development
 * - Reduces unnecessary re-renders with state batching
 */
export const useOptimizedScrollDetection = (
  isDark: boolean,
  options: ScrollDetectionOptions = {}
) => {
  const {
    throttleMs = 16.67, // 60fps
    scrollThreshold = 20,
    navOffset = 80,
    enablePerformanceMonitoring = process.env.NODE_ENV === 'development'
  } = options

  // State management
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolled: false,
    isInHero: true,
    scrollY: 0,
    previousScrollY: 0,
    scrollDirection: null
  })

  // Performance monitoring refs
  const frameCountRef = useRef(0)
  const lastFrameTimeRef = useRef(0)
  const performanceLogRef = useRef<number[]>([])

  // Throttling refs
  const rafIdRef = useRef<number>()
  const lastThrottleTimeRef = useRef(0)
  const isThrottledRef = useRef(false)

  // Cache DOM elements
  const heroElementRef = useRef<HTMLElement | null>(null)
  const servicesElementRef = useRef<HTMLElement | null>(null)

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    const now = performance.now()
    
    // Performance monitoring
    if (enablePerformanceMonitoring) {
      if (lastFrameTimeRef.current > 0) {
        const frameTime = now - lastFrameTimeRef.current
        performanceLogRef.current.push(frameTime)
        
        // Keep only last 60 frames for analysis
        if (performanceLogRef.current.length > 60) {
          performanceLogRef.current.shift()
        }
        
        // Log performance warnings
        if (frameTime > 33.33) { // Slower than 30fps
          devLog.warn(`Scroll performance warning: ${frameTime.toFixed(2)}ms frame time`, null, 'ScrollDetection')
        }
      }
      lastFrameTimeRef.current = now
      frameCountRef.current++
    }

    // Throttling logic
    if (now - lastThrottleTimeRef.current < throttleMs) {
      if (!isThrottledRef.current) {
        isThrottledRef.current = true
        rafIdRef.current = requestAnimationFrame(() => {
          isThrottledRef.current = false
          handleScroll()
        })
      }
      return
    }

    lastThrottleTimeRef.current = now

    // Get current scroll position
    const currentScrollY = window.scrollY
    
    // Cache DOM elements if not already cached
    if (!heroElementRef.current) {
      heroElementRef.current = document.getElementById('hero')
    }
    if (!servicesElementRef.current) {
      servicesElementRef.current = document.getElementById('services')
    }

    const heroSection = heroElementRef.current
    const servicesSection = servicesElementRef.current
    
    if (heroSection && servicesSection) {
      const servicesTop = servicesSection.offsetTop
      const scrollPosition = currentScrollY + navOffset
      
      const newIsScrolled = currentScrollY > scrollThreshold
      const newIsInHero = scrollPosition < servicesTop
      
      const scrollDirection = currentScrollY > scrollState.scrollY ? 'down' : 
                             currentScrollY < scrollState.scrollY ? 'up' : null

      // Batch state updates to reduce re-renders
      setScrollState(prev => {
        const hasChanges = 
          prev.isScrolled !== newIsScrolled ||
          prev.isInHero !== newIsInHero ||
          Math.abs(prev.scrollY - currentScrollY) > 5 || // Only update if significant change
          prev.scrollDirection !== scrollDirection

        if (!hasChanges) {
          return prev // Prevent unnecessary re-render
        }

        return {
          isScrolled: newIsScrolled,
          isInHero: newIsInHero,
          scrollY: currentScrollY,
          previousScrollY: prev.scrollY,
          scrollDirection
        }
      })
    }
  }, [throttleMs, scrollThreshold, navOffset, enablePerformanceMonitoring, scrollState.scrollY])

  // Effect for setting up scroll listener
  useEffect(() => {
    // Initial execution
    handleScroll()
    
    // Add optimized scroll listener
    let ticking = false
    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true })
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', optimizedScrollHandler)
      
      // Cancel pending RAF
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      
      // Clear element refs
      heroElementRef.current = null
      servicesElementRef.current = null
      
      // Performance logging on cleanup
      if (enablePerformanceMonitoring && performanceLogRef.current.length > 0) {
        const avgFrameTime = performanceLogRef.current.reduce((a, b) => a + b, 0) / performanceLogRef.current.length
        const maxFrameTime = Math.max(...performanceLogRef.current)
        const frameRate = 1000 / avgFrameTime
        
        devLog.performance('Scroll Performance Summary', frameRate, {
          totalFrames: frameCountRef.current,
          averageFrameTime: `${avgFrameTime.toFixed(2)}ms`,
          maxFrameTime: `${maxFrameTime.toFixed(2)}ms`,
          averageFrameRate: `${frameRate.toFixed(1)}fps`,
          performanceGrade: frameRate >= 55 ? 'Excellent' : frameRate >= 45 ? 'Good' : frameRate >= 30 ? 'Fair' : 'Poor'
        }, 'ScrollDetection')
      }
    }
  }, [isDark, handleScroll])

  // Performance monitoring API for development
  const getPerformanceMetrics = useCallback(() => {
    if (!enablePerformanceMonitoring || performanceLogRef.current.length === 0) {
      return null
    }
    
    const frameTimes = performanceLogRef.current
    const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length
    const maxFrameTime = Math.max(...frameTimes)
    const minFrameTime = Math.min(...frameTimes)
    const frameRate = 1000 / avgFrameTime
    
    return {
      totalFrames: frameCountRef.current,
      averageFrameTime: avgFrameTime,
      maxFrameTime: maxFrameTime,
      minFrameTime: minFrameTime,
      averageFrameRate: frameRate,
      frameTimes: [...frameTimes],
      performanceGrade: frameRate >= 55 ? 'Excellent' : frameRate >= 45 ? 'Good' : frameRate >= 30 ? 'Fair' : 'Poor'
    }
  }, [enablePerformanceMonitoring])

  return {
    ...scrollState,
    // Legacy compatibility
    isScrolled: scrollState.isScrolled,
    isInHero: scrollState.isInHero,
    // Enhanced API
    getPerformanceMetrics,
  }
}