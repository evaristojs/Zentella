import { useEffect, useRef, useCallback } from 'react'

interface MagneticScrollOptions {
  sections: string[] // IDs of sections to magnetize
  magneticForce?: number // How strong the magnetic pull is (0-1)
  threshold?: number // Distance from section center to activate magnetism
  snapDelay?: number // Time to wait before snapping (ms)
  enabled?: boolean // Enable/disable magnetic scroll
}

export const useMagneticScroll = (options: MagneticScrollOptions) => {
  const {
    sections,
    magneticForce = 0.3, // Moderate magnetic force
    threshold = 200, // 200px threshold
    snapDelay = 300, // Wait 300ms after scroll stops
    enabled = true
  } = options

  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const lastScrollTime = useRef(0)
  const userScrolling = useRef(false)
  const magneticAnimationRef = useRef<number>()

  // Detect if user is actively scrolling vs programmatic scroll
  const handleScroll = useCallback(() => {
    if (!enabled) return

    const now = Date.now()
    lastScrollTime.current = now
    userScrolling.current = true
    isScrollingRef.current = true

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Cancel any existing magnetic animation
    if (magneticAnimationRef.current) {
      cancelAnimationFrame(magneticAnimationRef.current)
      magneticAnimationRef.current = undefined
    }

    // Set timeout to detect when scrolling stops
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
      userScrolling.current = false
      
      // Only apply magnetic effect if enough time has passed since last scroll
      if (Date.now() - lastScrollTime.current >= snapDelay) {
        applyMagneticEffect()
      }
    }, snapDelay)
  }, [enabled, snapDelay])

  // Apply magnetic effect to snap to nearest section
  const applyMagneticEffect = useCallback(() => {
    if (!enabled || userScrolling.current) return

    const viewportHeight = window.innerHeight
    const scrollTop = window.pageYOffset
    const viewportCenter = scrollTop + (viewportHeight / 2)

    let closestSection: HTMLElement | null = null
    let closestDistance = Infinity
    let targetScroll = 0

    // Find the section most centered in viewport
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (!element) return

      const rect = element.getBoundingClientRect()
      const elementTop = scrollTop + rect.top
      const elementBottom = elementTop + rect.height
      
      // Check if section is significantly visible in viewport
      const visibleTop = Math.max(elementTop, scrollTop)
      const visibleBottom = Math.min(elementBottom, scrollTop + viewportHeight)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const visibilityRatio = visibleHeight / viewportHeight

      // Only consider sections that are at least 30% visible
      if (visibilityRatio < 0.3) return

      const elementCenter = elementTop + (rect.height / 2)
      const distance = Math.abs(viewportCenter - elementCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestSection = element
        // Calculate optimal scroll position to center the section
        targetScroll = Math.max(0, elementTop - (viewportHeight - rect.height) / 2)
      }
    })

    // Apply gentle magnetic scroll if close enough and worth adjusting
    if (closestSection && closestDistance < threshold) {
      const currentDistance = Math.abs(scrollTop - targetScroll)
      
      // Only apply magnetism if the adjustment is meaningful (more than 80px)
      // but not too large (less than viewport height)
      if (currentDistance > 80 && currentDistance < viewportHeight) {
        smoothScrollToPosition(targetScroll)
      }
    }
  }, [enabled, sections, threshold])

  // Smooth scroll to position with easing
  const smoothScrollToPosition = useCallback((targetY: number) => {
    const startY = window.pageYOffset
    const distance = targetY - startY
    const duration = Math.min(800, Math.abs(distance) * 2) // Dynamic duration
    let startTime: number | null = null

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out cubic function for smooth deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      
      // Apply magnetic force - less aggressive snapping
      const adjustedProgress = progress * magneticForce + (1 - magneticForce) * easeOutCubic
      
      const currentY = startY + (distance * adjustedProgress)
      window.scrollTo(0, currentY)

      if (progress < 1) {
        magneticAnimationRef.current = requestAnimationFrame(step)
      } else {
        magneticAnimationRef.current = undefined
      }
    }

    magneticAnimationRef.current = requestAnimationFrame(step)
  }, [magneticForce])

  // Setup scroll listener
  useEffect(() => {
    if (!enabled) return

    const options: AddEventListenerOptions = { passive: true }
    window.addEventListener('scroll', handleScroll, options)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll, options)
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      if (magneticAnimationRef.current) {
        cancelAnimationFrame(magneticAnimationRef.current)
      }
    }
  }, [handleScroll, enabled])

  // Manual scroll to section (for navigation)
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    // Temporarily disable magnetic effect
    userScrolling.current = true
    
    const viewportHeight = window.innerHeight
    const rect = element.getBoundingClientRect()
    const scrollTop = window.pageYOffset
    const elementTop = scrollTop + rect.top
    const targetScroll = elementTop - ((viewportHeight - rect.height) / 2)

    smoothScrollToPosition(targetScroll)

    // Re-enable magnetic effect after scroll
    setTimeout(() => {
      userScrolling.current = false
    }, 1000)
  }, [smoothScrollToPosition])

  return { scrollToSection }
}