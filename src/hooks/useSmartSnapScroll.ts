import { useEffect, useRef } from 'react'

interface SmartSnapScrollOptions {
  enabled?: boolean
  scrollingClass?: string
  snapEnabledClass?: string
  scrollTimeout?: number
}

export const useSmartSnapScroll = (options: SmartSnapScrollOptions = {}) => {
  const {
    enabled = true,
    scrollingClass = 'scrolling',
    snapEnabledClass = 'snap-enabled',
    scrollTimeout = 150
  } = options

  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const isScrollingRef = useRef(false)

  useEffect(() => {
    if (!enabled) return

    const handleScroll = () => {
      // Add scrolling class immediately
      if (!isScrollingRef.current) {
        document.body.classList.add(scrollingClass)
        document.body.classList.remove(snapEnabledClass)
        isScrollingRef.current = true
      }

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        document.body.classList.remove(scrollingClass)
        document.body.classList.add(snapEnabledClass)
        isScrollingRef.current = false
      }, scrollTimeout)
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      // Reset classes on unmount
      document.body.classList.remove(scrollingClass, snapEnabledClass)
    }
  }, [enabled, scrollingClass, snapEnabledClass, scrollTimeout])

  return {
    isScrolling: isScrollingRef.current
  }
}