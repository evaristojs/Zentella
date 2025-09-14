import { useState, useEffect, useCallback, useRef } from 'react'

interface ScrollState {
  isScrolled: boolean
  currentSection: string
  isScrolling: boolean
}

interface UseOptimizedScrollOptions {
  scrollThreshold?: number
  sectionThreshold?: number
  rootMargin?: string
  smoothScrollDuration?: number
}

export const useOptimizedScroll = (options: UseOptimizedScrollOptions = {}) => {
  const {
    scrollThreshold = 20,
    sectionThreshold = 0.3,
    rootMargin = '-10% 0px -10% 0px',
    smoothScrollDuration = 800
  } = options

  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolled: false,
    currentSection: 'hero',
    isScrolling: false
  })

  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const observerRef = useRef<IntersectionObserver>()

  // Section IDs to track
  const sectionIds = ['hero', 'services', 'portfolio', 'about', 'testimonials', 'contact']

  // Combined scroll handler
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const isScrolled = scrollY > scrollThreshold

    setScrollState(prev => ({
      ...prev,
      isScrolled,
      isScrolling: true
    }))

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Set timeout to detect when scrolling stops
    scrollTimeoutRef.current = setTimeout(() => {
      setScrollState(prev => ({ ...prev, isScrolling: false }))
    }, 150)
  }, [scrollThreshold])

  // Initialize intersection observer for sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin,
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
    }

    observerRef.current = new IntersectionObserver((entries) => {
      // Find the most visible section
      const visibleSections = entries.filter(entry => entry.isIntersecting)

      if (visibleSections.length > 0) {
        const mostVisible = visibleSections.reduce((prev, current) => {
          if (current.intersectionRatio > prev.intersectionRatio) {
            return current
          }
          // If same ratio, prioritize the one closer to center
          if (current.intersectionRatio === prev.intersectionRatio) {
            const currentRect = current.target.getBoundingClientRect()
            const prevRect = prev.target.getBoundingClientRect()
            const currentCenter = Math.abs(currentRect.top + currentRect.height / 2 - window.innerHeight / 2)
            const prevCenter = Math.abs(prevRect.top + prevRect.height / 2 - window.innerHeight / 2)
            return currentCenter < prevCenter ? current : prev
          }
          return prev
        })

        if (mostVisible.intersectionRatio >= sectionThreshold) {
          const sectionId = (mostVisible.target as HTMLElement).id
          setScrollState(prev => ({ ...prev, currentSection: sectionId }))
        }
      }
    }, observerOptions)

    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id)
      if (element && observerRef.current) {
        observerRef.current.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [sectionThreshold, rootMargin])

  // Handle scroll events
  useEffect(() => {
    // Throttled scroll handler
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll])

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    const startPosition = window.pageYOffset
    const targetPosition = element.offsetTop - 80 // Account for navbar height
    const distance = targetPosition - startPosition
    const duration = smoothScrollDuration

    let start: number | null = null

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)

      // Easing function (ease-in-out)
      const ease = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress

      window.scrollTo(0, startPosition + (distance * ease))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [smoothScrollDuration])

  return {
    ...scrollState,
    scrollToSection
  }
}