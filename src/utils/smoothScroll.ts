/**
 * High-performance cross-browser smooth scrolling utility
 * Optimized for Chrome mobile and Safari mobile compatibility
 */

// Cached browser detection - computed once and reused
let cachedBrowserInfo: {
  isChromeMobile: boolean
  isSafariMobile: boolean
  needsCustomScroll: boolean
} | null = null

const getBrowserInfo = () => {
  if (cachedBrowserInfo) return cachedBrowserInfo

  const userAgent = navigator.userAgent
  const isChrome = /Chrome|CriOS/.test(userAgent) && !/Edge|OPR/.test(userAgent)
  const isSafari = /Safari/.test(userAgent) && !/Chrome|CriOS/.test(userAgent)
  const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent)

  cachedBrowserInfo = {
    isChromeMobile: isChrome && isMobile,
    isSafariMobile: isSafari && isMobile,
    needsCustomScroll: (isChrome && isMobile) || (isSafari && isMobile)
  }

  return cachedBrowserInfo
}

/**
 * Smooth scroll to element with cross-browser compatibility
 * @param element Target element to scroll to
 * @param navbarHeight Height of fixed navbar to offset
 * @param options Additional options for scroll behavior
 */
export const smoothScrollToElement = (
  element: HTMLElement,
  navbarHeight: number,
  options: {
    onStart?: () => void
    onComplete?: () => void
    duration?: number
  } = {}
) => {
  const startTime = performance.now()
  const browserInfo = getBrowserInfo()
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight

  // Call onStart callback if provided
  options.onStart?.()

  if (browserInfo.needsCustomScroll) {
    // Custom smooth scroll for problematic browsers
    document.documentElement.style.scrollBehavior = 'auto'

    const startPosition = window.pageYOffset
    const distance = Math.max(0, targetPosition) - startPosition
    const duration = options.duration || (browserInfo.isSafariMobile ? 600 : 800)
    let animationStart: number | null = null
    let frameCount = 0

    function animate(timestamp: number) {
      if (!animationStart) animationStart = timestamp

      frameCount++
      const progress = timestamp - animationStart
      const percentage = Math.min(progress / duration, 1)

      // Optimized easing calculations with minimal operations
      const ease = browserInfo.isSafariMobile
        ? percentage < 0.5
          ? 4 * percentage ** 3
          : 1 - ((-2 * percentage + 2) ** 3) / 2
        : 0.5 * (1 - Math.cos(Math.PI * percentage))

      // Single DOM write per frame
      window.scrollTo(0, startPosition + (distance * ease))

      if (percentage < 1) {
        requestAnimationFrame(animate)
      } else {
        // Animation complete
        if (process.env.NODE_ENV === 'development') {
          const totalTime = performance.now() - startTime
          // Custom scroll performance metrics
        }

        // Restore CSS scroll-behavior
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = 'smooth'
          options.onComplete?.()
        }, browserInfo.isSafariMobile ? 50 : 100)
      }
    }

    requestAnimationFrame(animate)
  } else {
    // Native smooth scroll for optimized browsers (Firefox, etc.)
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth'
    })

    if (process.env.NODE_ENV === 'development') {
      const totalTime = performance.now() - startTime
      // Native scroll performance metrics
    }

    // For native scroll, we can't detect completion easily, so use timeout
    setTimeout(() => {
      options.onComplete?.()
    }, 800) // Approximate duration for native smooth scroll
  }
}

/**
 * Get the current navbar height from CSS custom property
 * @param fallback Fallback height if CSS property is not available
 * @returns Navbar height in pixels
 */
export const getNavbarHeight = (fallback: number = 80): number => {
  try {
    const cssHeight = getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-height')
    return parseInt(cssHeight) || fallback
  } catch {
    return fallback
  }
}

/**
 * Performance metrics for scroll operations (development only)
 */
export const getScrollPerformanceMetrics = () => {
  if (process.env.NODE_ENV !== 'development') return null

  return {
    browserInfo: getBrowserInfo(),
    isHighPerformanceDevice: navigator.hardwareConcurrency >= 4,
    memoryInfo: (performance as any).memory ? {
      usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
      totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
      jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
    } : null
  }
}