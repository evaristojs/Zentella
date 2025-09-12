/**
 * Global Type Declarations for Zentella Website
 * 
 * Centralizes all global type definitions to ensure consistency
 * and avoid duplication across components.
 */

/**
 * Theme Types
 */
export type ThemeVariant = 'light' | 'dark'
export type ThemeSection = 'hero' | 'about' | 'services' | 'portfolio' | 'contact' | 'footer'

/**
 * Base Component Props
 */
export interface BaseComponentProps {
  className?: string
  id?: string
}

/**
 * Error Boundary Types
 */
export interface ErrorInfo {
  componentStack: string
}

export interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * Navigation Types
 */
export interface MenuItem {
  name: string
  href: string
  icon?: React.ComponentType
}

/**
 * Starfield Types
 */
export interface StarfieldConfig {
  numStars?: number
  baseSpeed?: number
  trailLength?: number
  starColor?: string
  trailOpacity?: number
  fadeInTime?: number
  minStarSize?: number
  maxStarSize?: number
  canvas?: HTMLCanvasElement
  width?: number
  height?: number
}

export interface StarfieldInstance {
  setup: (config?: StarfieldConfig) => void
  start: () => void
  stop: () => void
  destroy: () => void
  updateConfig: (config: Partial<StarfieldConfig>) => void
}

/**
 * Global Window Extensions
 */
declare global {
  interface Window {
    Starfield: StarfieldInstance
  }
}