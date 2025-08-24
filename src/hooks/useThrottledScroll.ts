import { useEffect, useCallback, useRef } from 'react'

/**
 * Custom hook for throttled scroll events with requestAnimationFrame
 * Provides better performance than standard throttling methods
 */
export const useThrottledScroll = (callback: () => void, deps: React.DependencyList = []) => {
  const callbackRef = useRef(callback)
  const frameRef = useRef<number>()
  
  // Update callback ref when dependencies change
  useEffect(() => {
    callbackRef.current = callback
  }, [callback, ...deps])
  
  const throttledCallback = useCallback(() => {
    if (frameRef.current) {
      return
    }
    
    frameRef.current = requestAnimationFrame(() => {
      callbackRef.current()
      frameRef.current = undefined
    })
  }, [])
  
  useEffect(() => {
    // Run initially
    callbackRef.current()
    
    // Add event listener with passive option for better performance
    window.addEventListener('scroll', throttledCallback, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledCallback)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [throttledCallback])
}

/**
 * Optimized scroll detection with reduced DOM queries
 */
export const useOptimizedScrollDetection = () => {
  const sectionsRef = useRef<Record<string, HTMLElement>>({})
  
  const getCachedSections = useCallback(() => {
    const sectionIds = ['hero', 'about', 'services', 'portfolio', 'testimonials', 'faq', 'contact']
    
    sectionIds.forEach(id => {
      if (!sectionsRef.current[id]) {
        const element = document.getElementById(id)
        if (element) {
          sectionsRef.current[id] = element
          console.log(`🔍 Cached section: ${id}`)
        }
      }
    })
    
    return sectionsRef.current
  }, [])
  
  return { getCachedSections }
}