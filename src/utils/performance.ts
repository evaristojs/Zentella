// Performance monitoring utilities

interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  ttfb: number | null // Time to First Byte
}

let metrics: PerformanceMetrics = {
  fcp: null,
  lcp: null,
  fid: null,
  cls: null,
  ttfb: null
}

// Get navigation timing
const getNavigationTiming = (): number => {
  const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  return perfData ? (perfData.responseStart - perfData.requestStart) : 0
}

// Measure First Contentful Paint
const measureFCP = (): void => {
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntriesByName('first-contentful-paint')
      if (entries.length > 0) {
        metrics.fcp = entries[0]?.startTime || 0
        console.log('🎨 First Contentful Paint:', `${metrics.fcp.toFixed(0)}ms`)
        observer.disconnect()
      }
    })
    observer.observe({ entryTypes: ['paint'] })
  } catch (error) {
    console.warn('FCP measurement not supported')
  }
}

// Measure Largest Contentful Paint
const measureLCP = (): void => {
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      if (lastEntry) {
        metrics.lcp = lastEntry.startTime
        console.log('🖼️ Largest Contentful Paint:', `${metrics.lcp.toFixed(0)}ms`)
      }
    })
    observer.observe({ entryTypes: ['largest-contentful-paint'] })

    // Stop observing after 10 seconds
    setTimeout(() => observer.disconnect(), 10000)
  } catch (error) {
    console.warn('LCP measurement not supported')
  }
}

// Measure First Input Delay
const measureFID = (): void => {
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (entry.processingStart > entry.startTime) {
          metrics.fid = entry.processingStart - entry.startTime
          console.log('⚡ First Input Delay:', `${metrics.fid.toFixed(1)}ms`)
          observer.disconnect()
        }
      })
    })
    observer.observe({ entryTypes: ['first-input'] })
  } catch (error) {
    console.warn('FID measurement not supported')
  }
}

// Measure Cumulative Layout Shift
const measureCLS = (): void => {
  try {
    let clsValue = 0
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      metrics.cls = clsValue
      console.log('📐 Cumulative Layout Shift:', metrics.cls.toFixed(4))
    })
    observer.observe({ entryTypes: ['layout-shift'] })

    // Stop observing after 10 seconds
    setTimeout(() => observer.disconnect(), 10000)
  } catch (error) {
    console.warn('CLS measurement not supported')
  }
}

// Resource loading performance
const measureResourceLoading = (): void => {
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.name.includes('.jpg') ||
            entry.name.includes('.png') ||
            entry.name.includes('.webp') ||
            entry.name.includes('.gif')) {
          const size = (entry as any).transferSize || 0
          const loadTime = entry.duration
          console.log(`📸 Image loaded: ${entry.name.split('/').pop()} - ${loadTime.toFixed(0)}ms (${(size/1024).toFixed(1)}KB)`)
        }
      })
    })
    observer.observe({ entryTypes: ['resource'] })
  } catch (error) {
    console.warn('Resource timing not supported')
  }
}

// Bundle size analysis
const analyzeBundleSize = (): void => {
  try {
    const scripts = Array.from(document.querySelectorAll('script[src]'))
    let totalSize = 0

    scripts.forEach((script) => {
      const src = (script as HTMLScriptElement).src
      if (src && !src.includes('http')) {
        // Get from resource timing
        const entries = performance.getEntriesByName(src)
        if (entries.length > 0) {
          const size = (entries[0] as any).transferSize || 0
          totalSize += size
          console.log(`📦 Script: ${src.split('/').pop()} - ${(size/1024).toFixed(1)}KB`)
        }
      }
    })

    console.log(`📊 Total JavaScript size: ${(totalSize/1024).toFixed(1)}KB`)
  } catch (error) {
    console.warn('Bundle analysis failed')
  }
}

// Initialize performance monitoring
export const initPerformanceMonitoring = (): void => {
  if (typeof window === 'undefined') return

  console.log('🚀 Initializing performance monitoring...')

  // Measure TTFB immediately
  metrics.ttfb = getNavigationTiming()
  if (metrics.ttfb > 0) {
    console.log('⏱️ Time to First Byte:', `${metrics.ttfb.toFixed(0)}ms`)
  }

  // Start measurements
  measureFCP()
  measureLCP()
  measureFID()
  measureCLS()
  measureResourceLoading()

  // Analyze bundle after load
  window.addEventListener('load', () => {
    setTimeout(analyzeBundleSize, 1000)

    // Report final metrics
    setTimeout(() => {
      console.log('📊 Final Performance Report:')
      console.table(metrics)

      // Performance score calculation (simplified)
      const fcpScore = metrics.fcp ? (metrics.fcp < 1800 ? 100 : Math.max(0, 100 - (metrics.fcp - 1800) / 20)) : 0
      const lcpScore = metrics.lcp ? (metrics.lcp < 2500 ? 100 : Math.max(0, 100 - (metrics.lcp - 2500) / 50)) : 0
      const fidScore = metrics.fid ? (metrics.fid < 100 ? 100 : Math.max(0, 100 - metrics.fid)) : 0
      const clsScore = metrics.cls ? (metrics.cls < 0.1 ? 100 : Math.max(0, 100 - metrics.cls * 1000)) : 0

      const overallScore = Math.round((fcpScore + lcpScore + fidScore + clsScore) / 4)
      console.log(`🎯 Performance Score: ${overallScore}/100`)

      if (overallScore >= 90) {
        console.log('🏆 Excellent performance!')
      } else if (overallScore >= 70) {
        console.log('✅ Good performance')
      } else {
        console.log('⚠️ Performance needs improvement')
      }
    }, 5000)
  })
}

// Manual performance check
export const checkPerformance = (): PerformanceMetrics => {
  return { ...metrics }
}

// Memory usage monitoring
export const monitorMemoryUsage = (): void => {
  if ('memory' in performance) {
    const memory = (performance as any).memory
    console.log('💾 Memory Usage:')
    console.log(`  Used: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(1)}MB`)
    console.log(`  Total: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(1)}MB`)
    console.log(`  Limit: ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(1)}MB`)
  }
}

// Image optimization detection
export const detectImageOptimization = (): void => {
  const images = Array.from(document.querySelectorAll('img'))
  let webpCount = 0
  let lazyCount = 0

  images.forEach(img => {
    if (img.src.includes('.webp')) webpCount++
    if (img.loading === 'lazy') lazyCount++
  })

  console.log(`🖼️ Image Optimization Status:`)
  console.log(`  Total images: ${images.length}`)
  console.log(`  WebP images: ${webpCount} (${((webpCount/images.length)*100).toFixed(1)}%)`)
  console.log(`  Lazy loaded: ${lazyCount} (${((lazyCount/images.length)*100).toFixed(1)}%)`)
}