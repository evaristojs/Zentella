/**
 * Hook-specific Type Definitions
 * 
 * Defines TypeScript interfaces and types for custom hooks
 * to ensure type safety and better IntelliSense support.
 */

import type { AnimationControls } from 'framer-motion'
import type { RefObject } from 'react'
import type { MenuItem } from './global'

/**
 * Scroll Animation Hook Types
 */
export interface UseScrollAnimationOptions {
  /** Intersection threshold (0-1) */
  threshold?: number
  /** Run animation only once */
  once?: boolean
  /** Custom root margin */
  rootMargin?: string
}

export interface UseScrollAnimationReturn {
  /** Ref to attach to the observed element */
  ref: RefObject<HTMLElement>
  /** Animation controls from framer-motion */
  controls: AnimationControls
  /** Whether element is currently in view */
  isInView: boolean
}

/**
 * Performance Monitor Hook Types
 */
export interface PerformanceMetrics {
  /** Frames per second measurement */
  fps: number
  /** Frame time in milliseconds */
  frameTime: number
  /** Memory usage (if available) */
  memoryUsage?: {
    used: number
    total: number
    percentage: number
  }
  /** Component render count */
  renderCount: number
  /** Time since last measurement */
  timestamp: number
  /** Performance grade */
  grade: 'Excellent' | 'Good' | 'Fair' | 'Poor'
}

export type PerformanceAlertType = 'fps_drop' | 'memory_leak' | 'excessive_renders' | 'slow_frame'
export type PerformanceAlertSeverity = 'low' | 'medium' | 'high' | 'critical'

export interface PerformanceAlert {
  type: PerformanceAlertType
  message: string
  severity: PerformanceAlertSeverity
  timestamp: number
  metrics: PerformanceMetrics
}

export interface UsePerformanceMonitorOptions {
  /** Enable FPS monitoring */
  enableFpsMonitoring?: boolean
  /** Enable memory monitoring */
  enableMemoryMonitoring?: boolean
  /** Enable render count monitoring */
  enableRenderMonitoring?: boolean
  /** Measurement interval in milliseconds */
  measurementInterval?: number
  /** FPS threshold for alerts */
  fpsAlertThreshold?: number
  /** Memory threshold percentage for alerts */
  memoryAlertThreshold?: number
  /** Maximum render count per interval before alert */
  maxRendersPerInterval?: number
  /** Alert callback */
  onAlert?: (alert: PerformanceAlert) => void
  /** Metrics callback */
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void
}

export interface UsePerformanceMonitorReturn {
  /** Current performance metrics */
  metrics: PerformanceMetrics | null
  /** Array of performance alerts */
  alerts: PerformanceAlert[]
  /** Whether monitoring is active */
  isMonitoring: boolean
  /** Start monitoring */
  startMonitoring: () => void
  /** Stop monitoring */
  stopMonitoring: () => void
  /** Clear alerts */
  clearAlerts: () => void
  /** Track render (call in component) */
  trackRender: () => void
  /** Get performance summary */
  getSummary: () => {
    isHealthy: boolean
    alertCount: number
    criticalAlerts: number
    currentGrade: string
  }
}

/**
 * Error Handler Hook Types
 */
export interface UseErrorHandlerOptions {
  /** Whether to log errors to console */
  logToConsole?: boolean
  /** Error reporting callback */
  onError?: (error: Error, errorInfo?: { componentStack?: string }) => void
  /** Custom error recovery callback */
  onRecover?: () => void
}

export interface UseErrorHandlerReturn {
  /** Current error state */
  error: Error | null
  /** Whether there's an active error */
  hasError: boolean
  /** Error information */
  errorInfo: { componentStack?: string } | null
  /** Clear the current error */
  clearError: () => void
  /** Manually trigger an error */
  setError: (error: Error, errorInfo?: { componentStack?: string }) => void
}

/**
 * Navigation Hook Types
 */
export interface UseNavigationStateOptions {
  /** Initial menu open state */
  initialMenuOpen?: boolean
  /** Close menu on navigation */
  closeOnNavigate?: boolean
}

export interface UseNavigationStateReturn {
  /** Whether menu is open */
  isMenuOpen: boolean
  /** Toggle menu open/closed */
  toggleMenu: () => void
  /** Close menu */
  closeMenu: () => void
  /** Open menu */
  openMenu: () => void
  /** Navigation menu items */
  menuItems: MenuItem[]
}

/**
 * Scroll Detection Hook Types
 */
export interface UseScrollDetectionOptions {
  /** Scroll threshold in pixels */
  threshold?: number
  /** Throttle delay in milliseconds */
  throttleMs?: number
}

export interface UseScrollDetectionReturn {
  /** Current scroll position Y */
  scrollY: number
  /** Whether user is scrolling up */
  isScrollingUp: boolean
  /** Whether user is scrolling down */
  isScrollingDown: boolean
  /** Whether scroll position is past threshold */
  isScrolled: boolean
  /** Whether user is at top of page */
  isAtTop: boolean
  /** Whether user is at bottom of page */
  isAtBottom: boolean
}

/**
 * Section Observer Hook Types
 */
export interface UseSectionObserverOptions {
  /** Intersection threshold */
  threshold?: number
  /** Root margin for intersection observer */
  rootMargin?: string
  /** Whether to update URL hash */
  updateHash?: boolean
}

export interface UseSectionObserverReturn {
  /** Currently active section */
  activeSection: string | null
  /** Array of observed sections */
  sections: string[]
  /** Register a section for observation */
  registerSection: (id: string, element: HTMLElement) => void
  /** Unregister a section */
  unregisterSection: (id: string) => void
}

/**
 * Theme Hook Types (extending existing)
 */
export interface UseThemeReturn {
  /** Current theme dark state */
  isDark: boolean
  /** Theme string value */
  theme: 'light' | 'dark'
  /** Whether theme is initialized */
  isInitialized: boolean
  /** Toggle between light and dark */
  toggleTheme: () => void
  /** Set specific theme */
  setTheme: (theme: 'light' | 'dark') => void
}

/**
 * Intersection Observer Hook Types
 */
export interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export interface UseIntersectionObserverReturn {
  /** Ref to attach to observed element */
  ref: RefObject<HTMLElement>
  /** Current intersection entry */
  entry: IntersectionObserverEntry | undefined
  /** Whether element is intersecting */
  isIntersecting: boolean
}