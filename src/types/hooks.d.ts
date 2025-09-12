/**
 * Hook-specific Type Definitions
 * 
 * Defines TypeScript interfaces and types for custom hooks
 * to ensure type safety and better IntelliSense support.
 */

import type { RefObject } from 'react'

/**
 * Theme Hook Types
 */
export interface UseThemeReturn {
  isDark: boolean
  toggleTheme: () => void
  theme: 'light' | 'dark'
  isInitialized: boolean
}

/**
 * Intersection Observer Hook Types
 */
export interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  root?: Element | null
}

export interface UseIntersectionObserverReturn {
  ref: RefObject<Element>
  inView: boolean
  entry?: IntersectionObserverEntry
}