import { useEffect, useRef, useCallback } from 'react'

interface MagneticScrollOptions {
  sections: string[] // IDs of sections to magnetize
  threshold?: number // Distance from section top to activate magnetism
  snapDelay?: number // Time to wait before snapping (ms)
  enabled?: boolean // Enable/disable magnetic scroll
}

export const useMagneticScroll = (options: MagneticScrollOptions) => {
  const {
    sections,
    threshold = 200, // 200px threshold
    snapDelay = 300, // Wait 300ms after scroll stops
    enabled = true
  } = options

  const navbarHeight = 80 // Fixed navbar height
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

  // Apply magnetic effect to snap sections to top edge (below navbar)
  const applyMagneticEffect = useCallback(() => {
    if (!enabled || userScrolling.current) return

    const viewportHeight = window.innerHeight
    const scrollTop = window.pageYOffset

    let closestSection: HTMLElement | null = null
    let closestDistance = Infinity
    let targetScroll = 0

    // Find the section closest to top edge
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (!element) return

      const rect = element.getBoundingClientRect()
      const elementTop = scrollTop + rect.top
      const elementBottom = elementTop + rect.height
      
      // Check if section is visible in viewport
      const isVisible = elementTop < scrollTop + viewportHeight && elementBottom > scrollTop
      if (!isVisible) return

      // Distance from section top to viewport top (considering navbar)
      const distanceFromTop = Math.abs(rect.top - navbarHeight)
      
      // Only consider sections that are reasonably close to the top
      if (distanceFromTop > threshold) return

      if (distanceFromTop < closestDistance) {
        closestDistance = distanceFromTop
        closestSection = element
        // Target scroll position: section top minus navbar height
        targetScroll = Math.max(0, elementTop - navbarHeight)
      }
    })

    // Apply magnetic snap to top if close enough
    if (closestSection && closestDistance < threshold) {
      const currentDistance = Math.abs(scrollTop - targetScroll)
      
      // Apply magnetism if the adjustment is meaningful (more than 20px)
      if (currentDistance > 20 && currentDistance < viewportHeight / 2) {
        smoothScrollToPosition(targetScroll)
      }
    }
  }, [enabled, sections, threshold, navbarHeight])

  // Smooth scroll to position with easing
  const smoothScrollToPosition = useCallback((targetY: number) => {
    const startY = window.pageYOffset
    const distance = targetY - startY
    const duration = Math.min(600, Math.max(300, Math.abs(distance) * 1.5)) // Dynamic duration
    let startTime: number | null = null

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out cubic function for smooth deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      
      const currentY = startY + (distance * easeOutCubic)
      window.scrollTo(0, currentY)

      if (progress < 1) {
        magneticAnimationRef.current = requestAnimationFrame(step)
      } else {
        magneticAnimationRef.current = undefined
      }
    }

    magneticAnimationRef.current = requestAnimationFrame(step)
  }, [])

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

  // Manual scroll to section (for navigation) - snap to top edge
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    // Temporarily disable magnetic effect
    userScrolling.current = true
    
    const rect = element.getBoundingClientRect()
    const scrollTop = window.pageYOffset
    const elementTop = scrollTop + rect.top
    const targetScroll = Math.max(0, elementTop - navbarHeight)

    smoothScrollToPosition(targetScroll)

    // Re-enable magnetic effect after scroll
    setTimeout(() => {
      userScrolling.current = false
    }, 1000)
  }, [smoothScrollToPosition, navbarHeight])

  return { scrollToSection }
}