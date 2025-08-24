import { useEffect, useRef, useCallback, useState } from 'react'
import { devLog } from '../utils/logger'

interface PerformanceMetrics {
  /**
   * Frames per second measurement
   */
  fps: number
  
  /**
   * Frame time in milliseconds
   */
  frameTime: number
  
  /**
   * Memory usage (if available)
   */
  memoryUsage?: {
    used: number
    total: number
    percentage: number
  }
  
  /**
   * Component render count
   */
  renderCount: number
  
  /**
   * Time since last measurement
   */
  timestamp: number
  
  /**
   * Performance grade
   */
  grade: 'Excellent' | 'Good' | 'Fair' | 'Poor'
}

interface PerformanceAlert {
  type: 'fps_drop' | 'memory_leak' | 'excessive_renders' | 'slow_frame'
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: number
  metrics: PerformanceMetrics
}

interface PerformanceMonitorOptions {
  /**
   * Enable FPS monitoring
   * @default true in development
   */
  enableFpsMonitoring?: boolean
  
  /**
   * Enable memory monitoring
   * @default true in development
   */
  enableMemoryMonitoring?: boolean
  
  /**
   * Enable render count monitoring
   * @default true in development
   */
  enableRenderMonitoring?: boolean
  
  /**
   * Measurement interval in milliseconds
   * @default 1000
   */
  measurementInterval?: number
  
  /**
   * FPS threshold for alerts
   * @default 30
   */
  fpsAlertThreshold?: number
  
  /**
   * Memory threshold percentage for alerts
   * @default 80
   */
  memoryAlertThreshold?: number
  
  /**
   * Maximum render count per interval before alert
   * @default 10
   */
  maxRendersPerInterval?: number
  
  /**
   * Alert callback
   */
  onAlert?: (alert: PerformanceAlert) => void
  
  /**
   * Metrics callback
   */
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void
}

/**
 * usePerformanceMonitor Hook
 * 
 * Monitors application performance including:
 * - FPS (Frames Per Second)
 * - Memory usage
 * - Component render counts
 * - Frame timing
 * - Performance alerts and recommendations
 */
export const usePerformanceMonitor = (
  options: PerformanceMonitorOptions = {}
) => {
  const {
    enableFpsMonitoring = process.env.NODE_ENV === 'development',
    enableMemoryMonitoring = process.env.NODE_ENV === 'development',
    enableRenderMonitoring = process.env.NODE_ENV === 'development',
    measurementInterval = 1000,
    fpsAlertThreshold = 30,
    memoryAlertThreshold = 80,
    maxRendersPerInterval = 10,
    onAlert,
    onMetricsUpdate
  } = options

  // State
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([])
  const [isMonitoring, setIsMonitoring] = useState(false)

  // Refs for tracking
  const frameCountRef = useRef(0)
  const renderCountRef = useRef(0)
  const lastTimestampRef = useRef(0)
  const frameTimesRef = useRef<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout>()
  const rafRef = useRef<number>()
  const lastMemoryCheckRef = useRef(0)
  const alertHistoryRef = useRef<Map<string, number>>(new Map())

  // Performance observer for paint timing
  const paintObserverRef = useRef<PerformanceObserver>()

  // Calculate FPS and frame timing
  const calculateFPS = useCallback(() => {
    const now = performance.now()
    
    if (lastTimestampRef.current === 0) {
      lastTimestampRef.current = now
      return { fps: 0, frameTime: 0 }
    }

    const elapsed = now - lastTimestampRef.current
    frameTimesRef.current.push(elapsed)
    frameCountRef.current++

    // Keep only last 60 frames for calculation
    if (frameTimesRef.current.length > 60) {
      frameTimesRef.current.shift()
    }

    const avgFrameTime = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length
    const fps = 1000 / avgFrameTime

    lastTimestampRef.current = now

    return { fps: Math.round(fps), frameTime: Math.round(avgFrameTime * 100) / 100 }
  }, [])

  // Get memory usage
  const getMemoryUsage = useCallback(() => {
    if (!enableMemoryMonitoring) return undefined

    // Use performance.memory if available (Chrome/Edge)
    if ('memory' in performance && (performance as any).memory) {
      const memory = (performance as any).memory
      return {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        percentage: Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100)
      }
    }

    return undefined
  }, [enableMemoryMonitoring])

  // Generate performance grade
  const getPerformanceGrade = useCallback((fps: number, frameTime: number): PerformanceMetrics['grade'] => {
    if (fps >= 55 && frameTime <= 18) return 'Excellent'
    if (fps >= 45 && frameTime <= 25) return 'Good'
    if (fps >= 30 && frameTime <= 35) return 'Fair'
    return 'Poor'
  }, [])

  // Create alert
  const createAlert = useCallback((
    type: PerformanceAlert['type'],
    message: string,
    severity: PerformanceAlert['severity'],
    currentMetrics: PerformanceMetrics
  ) => {
    // Prevent spam alerts (same type within 5 seconds)
    const alertKey = `${type}_${severity}`
    const lastAlertTime = alertHistoryRef.current.get(alertKey) || 0
    const now = Date.now()
    
    if (now - lastAlertTime < 5000) {
      return
    }
    
    alertHistoryRef.current.set(alertKey, now)

    const alert: PerformanceAlert = {
      type,
      message,
      severity,
      timestamp: now,
      metrics: currentMetrics
    }

    setAlerts(prev => [...prev.slice(-9), alert]) // Keep last 10 alerts
    onAlert?.(alert)

    // Log performance alerts
    if (severity === 'critical' || severity === 'high') {
      devLog.error('Performance Alert', alert, 'PerformanceMonitor')
    } else {
      devLog.warn('Performance Alert', alert, 'PerformanceMonitor')
    }
  }, [onAlert])

  // Measure performance
  const measurePerformance = useCallback(() => {
    if (!isMonitoring) return

    const { fps, frameTime } = calculateFPS()
    const memoryUsage = getMemoryUsage()
    const grade = getPerformanceGrade(fps, frameTime)

    const currentMetrics: PerformanceMetrics = {
      fps,
      frameTime,
      memoryUsage,
      renderCount: renderCountRef.current,
      timestamp: Date.now(),
      grade
    }

    setMetrics(currentMetrics)
    onMetricsUpdate?.(currentMetrics)

    // Check for alerts
    if (fps < fpsAlertThreshold && fps > 0) {
      createAlert(
        'fps_drop',
        `FPS dropped to ${fps} (threshold: ${fpsAlertThreshold})`,
        fps < 15 ? 'critical' : fps < 25 ? 'high' : 'medium',
        currentMetrics
      )
    }

    if (memoryUsage && memoryUsage.percentage > memoryAlertThreshold) {
      createAlert(
        'memory_leak',
        `Memory usage at ${memoryUsage.percentage}% (${memoryUsage.used}MB used)`,
        memoryUsage.percentage > 95 ? 'critical' : memoryUsage.percentage > 90 ? 'high' : 'medium',
        currentMetrics
      )
    }

    if (renderCountRef.current > maxRendersPerInterval) {
      createAlert(
        'excessive_renders',
        `${renderCountRef.current} renders in ${measurementInterval}ms`,
        renderCountRef.current > 20 ? 'high' : 'medium',
        currentMetrics
      )
    }

    if (frameTime > 50) {
      createAlert(
        'slow_frame',
        `Slow frame detected: ${frameTime}ms`,
        frameTime > 100 ? 'high' : 'medium',
        currentMetrics
      )
    }

    // Reset render count for next interval
    renderCountRef.current = 0
  }, [
    isMonitoring,
    calculateFPS,
    getMemoryUsage,
    getPerformanceGrade,
    fpsAlertThreshold,
    memoryAlertThreshold,
    maxRendersPerInterval,
    measurementInterval,
    createAlert,
    onMetricsUpdate
  ])

  // RAF loop for FPS monitoring
  const rafLoop = useCallback(() => {
    if (!enableFpsMonitoring || !isMonitoring) return

    frameCountRef.current++
    rafRef.current = requestAnimationFrame(rafLoop)
  }, [enableFpsMonitoring, isMonitoring])

  // Track renders
  const trackRender = useCallback(() => {
    if (enableRenderMonitoring) {
      renderCountRef.current++
    }
  }, [enableRenderMonitoring])

  // Start monitoring
  const startMonitoring = useCallback(() => {
    if (isMonitoring) return

    setIsMonitoring(true)
    
    // Start RAF loop for FPS
    if (enableFpsMonitoring) {
      rafRef.current = requestAnimationFrame(rafLoop)
    }

    // Start measurement interval
    intervalRef.current = setInterval(measurePerformance, measurementInterval)

    // Setup paint observer if available
    if ('PerformanceObserver' in window && enableFpsMonitoring) {
      try {
        paintObserverRef.current = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach(entry => {
            if (entry.entryType === 'paint') {
              devLog.performance('Paint timing', entry.startTime, { name: entry.name }, 'PerformanceMonitor')
            }
          })
        })
        
        paintObserverRef.current.observe({ entryTypes: ['paint', 'measure'] })
      } catch (error) {
        devLog.warn('PerformanceObserver not supported', error, 'PerformanceMonitor')
      }
    }

    devLog.lifecycle('PerformanceMonitor', 'Performance monitoring started')
  }, [
    isMonitoring,
    enableFpsMonitoring,
    rafLoop,
    measurePerformance,
    measurementInterval
  ])

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    if (!isMonitoring) return

    setIsMonitoring(false)

    // Clear RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = undefined
    }

    // Clear interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }

    // Disconnect observer
    if (paintObserverRef.current) {
      paintObserverRef.current.disconnect()
      paintObserverRef.current = undefined
    }

    devLog.lifecycle('PerformanceMonitor', 'Performance monitoring stopped')
  }, [isMonitoring])

  // Clear alerts
  const clearAlerts = useCallback(() => {
    setAlerts([])
    alertHistoryRef.current.clear()
  }, [])

  // Auto-start monitoring
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      startMonitoring()
    }

    return stopMonitoring
  }, [startMonitoring, stopMonitoring])

  // Track render on every render
  useEffect(() => {
    trackRender()
  })

  return {
    // State
    metrics,
    alerts,
    isMonitoring,
    
    // Actions
    startMonitoring,
    stopMonitoring,
    clearAlerts,
    
    // Utilities
    trackRender,
    
    // Summary
    getSummary: useCallback(() => ({
      isHealthy: metrics ? metrics.fps >= fpsAlertThreshold && (metrics.memoryUsage?.percentage || 0) < memoryAlertThreshold : true,
      alertCount: alerts.length,
      criticalAlerts: alerts.filter(a => a.severity === 'critical').length,
      currentGrade: metrics?.grade || 'Unknown'
    }), [metrics, alerts, fpsAlertThreshold, memoryAlertThreshold])
  }
}