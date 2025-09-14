import { useEffect } from 'react'

/**
 * Hook to dynamically update CSS custom property --nav-height
 * based on the actual navbar height, handling responsive changes
 */
export const useNavbarHeight = (navbarId: string = 'navbar') => {
  useEffect(() => {
    const updateNavHeight = () => {
      const navbar = document.getElementById(navbarId) || document.querySelector('nav')
      if (!navbar) return

      const height = navbar.getBoundingClientRect().height
      document.documentElement.style.setProperty('--nav-height', `${height}px`)
    }

    // Set initial height
    updateNavHeight()

    // Use ResizeObserver for accurate height tracking
    let resizeObserver: ResizeObserver | null = null

    if ('ResizeObserver' in window) {
      const navbar = document.getElementById(navbarId) || document.querySelector('nav')
      if (navbar) {
        resizeObserver = new ResizeObserver(updateNavHeight)
        resizeObserver.observe(navbar)
      }
    }

    // Fallback for older browsers
    window.addEventListener('resize', updateNavHeight)
    window.addEventListener('orientationchange', updateNavHeight)

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateNavHeight)
      window.removeEventListener('orientationchange', updateNavHeight)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [navbarId])
}