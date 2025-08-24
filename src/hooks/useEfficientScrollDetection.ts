import { useState, useEffect, useCallback, useRef } from 'react'

interface ScrollState {
  isScrolled: boolean
  isInHero: boolean
  scrollY: number
  scrollDirection: 'up' | 'down' | null
  currentSection: string
  showNavbar: boolean
}

interface ScrollDetectionOptions {
  throttleMs?: number
  scrollThreshold?: number
  heroOffset?: number
  enableDebug?: boolean
  navbarThreshold?: number
}

/**
 * Ultra-efficient scroll detection hook using:
 * - Single RAF-based throttling
 * - Minimal DOM queries with caching
 * - Batch state updates
 * - Passive event listeners
 * - Smart change detection
 */
export const useEfficientScrollDetection = (options: ScrollDetectionOptions = {}) => {
  const {
    throttleMs = 16.67, // 60fps
    scrollThreshold = 20,
    heroOffset = 80,
    enableDebug = false,
    navbarThreshold = 5
  } = options

  // Single state object to minimize re-renders
  const [state, setState] = useState<ScrollState>({
    isScrolled: false,
    isInHero: true,
    scrollY: 0,
    scrollDirection: null,
    currentSection: 'hero',
    showNavbar: false
  })

  // Performance refs
  const rafId = useRef<number>()
  const lastScrollY = useRef(0)
  const lastUpdateTime = useRef(0)
  const isUpdating = useRef(false)

  // Cache DOM elements
  const elementsCache = useRef<Map<string, HTMLElement>>(new Map())
  const heroElement = useRef<HTMLElement | null>(null)

  // Section IDs in order
  const sectionIds = ['hero', 'about', 'services', 'portfolio', 'testimonials', 'faq', 'contact']

  // Cache DOM elements efficiently
  const cacheElements = useCallback(() => {
    if (!heroElement.current) {
      heroElement.current = document.getElementById('hero')
    }

    sectionIds.forEach(id => {
      if (!elementsCache.current.has(id)) {
        const element = document.getElementById(id)
        if (element) {
          elementsCache.current.set(id, element)
          if (enableDebug) {
            console.log(`📍 Cached section: ${id}`)
          }
        }
      }
    })
  }, [enableDebug])

  // Ultra-optimized scroll handler
  const handleScroll = useCallback(() => {
    const now = performance.now()
    
    // Skip if too frequent
    if (now - lastUpdateTime.current < throttleMs) {
      return
    }

    if (isUpdating.current) {
      return
    }

    isUpdating.current = true

    // Get current scroll position
    const currentScrollY = window.scrollY
    
    // Skip if no significant change
    if (Math.abs(currentScrollY - lastScrollY.current) < 2) {
      isUpdating.current = false
      return
    }

    // Cache elements if needed
    cacheElements()

    // Calculate scroll properties
    const isScrolled = currentScrollY > scrollThreshold
    const showNavbar = currentScrollY > navbarThreshold
    const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 
                           currentScrollY < lastScrollY.current ? 'up' : null

    // Determine current section and hero status
    let currentSection = 'hero'
    let isInHero = true

    if (heroElement.current) {
      const heroBottom = heroElement.current.offsetTop + heroElement.current.offsetHeight
      const scrollPosition = currentScrollY + heroOffset
      
      if (scrollPosition >= heroBottom) {
        isInHero = false
        
        // Find current section
        for (const sectionId of sectionIds.slice(1)) { // Skip hero
          const element = elementsCache.current.get(sectionId)
          if (element) {
            const sectionTop = element.offsetTop
            const sectionBottom = sectionTop + element.offsetHeight
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
              currentSection = sectionId
              break
            }
          }
        }
      }
    }

    // Batch state update only if there are changes
    setState(prev => {
      const hasChanges = 
        prev.isScrolled !== isScrolled ||
        prev.isInHero !== isInHero ||
        prev.currentSection !== currentSection ||
        prev.scrollDirection !== scrollDirection ||
        prev.showNavbar !== showNavbar ||
        Math.abs(prev.scrollY - currentScrollY) > 10

      if (!hasChanges) {
        return prev
      }

      if (enableDebug) {
        console.log('🔄 Scroll Update:', {
          scrollY: currentScrollY,
          isScrolled,
          isInHero,
          currentSection,
          scrollDirection,
          showNavbar
        })
      }

      return {
        isScrolled,
        isInHero,
        scrollY: currentScrollY,
        scrollDirection,
        currentSection,
        showNavbar
      }
    })

    lastScrollY.current = currentScrollY
    lastUpdateTime.current = now
    isUpdating.current = false

  }, [throttleMs, scrollThreshold, heroOffset, enableDebug, cacheElements])

  // RAF-optimized scroll handler
  const rafScrollHandler = useCallback(() => {
    if (rafId.current) {
      return
    }

    rafId.current = requestAnimationFrame(() => {
      handleScroll()
      rafId.current = undefined
    })
  }, [handleScroll])

  // Setup and cleanup
  useEffect(() => {
    // Initial execution
    cacheElements()
    handleScroll()

    // Add passive listener for best performance
    window.addEventListener('scroll', rafScrollHandler, { 
      passive: true,
      capture: false
    })

    return () => {
      window.removeEventListener('scroll', rafScrollHandler)
      
      // Cancel pending RAF
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }

      // Clear caches
      elementsCache.current.clear()
      heroElement.current = null
      
      if (enableDebug) {
        console.log('🧹 Scroll detection cleanup completed')
      }
    }
  }, [rafScrollHandler, cacheElements, handleScroll, enableDebug])

  // Performance monitoring API
  const getMetrics = useCallback(() => {
    return {
      cachedElements: elementsCache.current.size,
      isActive: Boolean(rafId.current),
      lastScrollY: lastScrollY.current,
      lastUpdateTime: lastUpdateTime.current
    }
  }, [])

  return {
    ...state,
    // Performance API
    getMetrics,
    // Force update (for development)
    forceUpdate: handleScroll
  }
}

// Singleton pattern for shared scroll state across components
let globalScrollState: ScrollState | null = null
let globalScrollListeners: Set<(state: ScrollState) => void> = new Set()
let globalRafId: number | undefined
let globalLastUpdate = 0

/**
 * Shared scroll detection - single listener for entire app
 * Most efficient for apps with multiple components needing scroll state
 */
export const useSharedScrollDetection = (options: ScrollDetectionOptions = {}) => {
  const [state, setState] = useState<ScrollState>(
    globalScrollState || {
      isScrolled: false,
      isInHero: true,
      scrollY: 0,
      scrollDirection: null,
      currentSection: 'hero',
      showNavbar: false
    }
  )

  const {
    throttleMs = 16.67,
    scrollThreshold = 20,
    heroOffset = 80,
    enableDebug = false,
    navbarThreshold = 5
  } = options

  // Global scroll handler
  const updateGlobalState = useCallback((newState: ScrollState) => {
    globalScrollState = newState
    globalScrollListeners.forEach(listener => listener(newState))
  }, [])

  useEffect(() => {
    // Add this component to listeners
    globalScrollListeners.add(setState)

    // Setup global scroll handler if first component
    if (globalScrollListeners.size === 1) {
      const elementsCache = new Map<string, HTMLElement>()
      let heroElement: HTMLElement | null = null
      let lastScrollY = 0

      const handleGlobalScroll = () => {
        const now = performance.now()
        
        if (now - globalLastUpdate < throttleMs) {
          return
        }

        const currentScrollY = window.scrollY
        
        if (Math.abs(currentScrollY - lastScrollY) < 2) {
          return
        }

        // Cache elements
        if (!heroElement) {
          heroElement = document.getElementById('hero')
        }

        const sectionIds = ['hero', 'about', 'services', 'portfolio', 'testimonials', 'faq', 'contact']
        sectionIds.forEach(id => {
          if (!elementsCache.has(id)) {
            const element = document.getElementById(id)
            if (element) {
              elementsCache.set(id, element)
            }
          }
        })

        // Calculate state
        const isScrolled = currentScrollY > scrollThreshold
        const showNavbar = currentScrollY > navbarThreshold
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 
                               currentScrollY < lastScrollY ? 'up' : null

        let currentSection = 'hero'
        let isInHero = true

        if (heroElement) {
          const heroBottom = heroElement.offsetTop + heroElement.offsetHeight
          const scrollPosition = currentScrollY + heroOffset
          
          if (scrollPosition >= heroBottom) {
            isInHero = false
            
            for (const sectionId of sectionIds.slice(1)) {
              const element = elementsCache.get(sectionId)
              if (element) {
                const sectionTop = element.offsetTop
                const sectionBottom = sectionTop + element.offsetHeight
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                  currentSection = sectionId
                  break
                }
              }
            }
          }
        }

        const newState: ScrollState = {
          isScrolled,
          isInHero,
          scrollY: currentScrollY,
          scrollDirection: scrollDirection as 'up' | 'down' | null,
          currentSection,
          showNavbar
        }

        updateGlobalState(newState)
        lastScrollY = currentScrollY
        globalLastUpdate = now

        if (enableDebug) {
          console.log('🌍 Global Scroll:', newState)
        }
      }

      const rafHandler = () => {
        if (globalRafId) return
        
        globalRafId = requestAnimationFrame(() => {
          handleGlobalScroll()
          globalRafId = undefined
        })
      }

      window.addEventListener('scroll', rafHandler, { passive: true })

      // Store cleanup function
      ;(globalScrollListeners as any)._cleanup = () => {
        window.removeEventListener('scroll', rafHandler)
        if (globalRafId) {
          cancelAnimationFrame(globalRafId)
        }
        elementsCache.clear()
      }
    }

    return () => {
      // Remove this component from listeners
      globalScrollListeners.delete(setState)

      // Cleanup if last component
      if (globalScrollListeners.size === 0) {
        ;(globalScrollListeners as any)._cleanup?.()
        globalScrollState = null
        globalLastUpdate = 0
      }
    }
  }, [updateGlobalState, throttleMs, scrollThreshold, heroOffset, enableDebug])

  return state
}