/**
 * Global Type Declarations for Zentella Website
 * 
 * Centralizes all global type definitions to ensure consistency
 * and avoid duplication across components.
 */

/**
 * Starfield Configuration Interface
 * Defines the shape of configuration objects for Starfield
 */
export interface StarfieldConfig {
  /** Number of stars to render */
  numStars?: number
  /** Base speed multiplier */
  baseSpeed?: number
  /** Trail length factor (0-1) */
  trailLength?: number
  /** Star color (CSS color format) */
  starColor?: string
  /** Canvas background color (CSS color format) */
  canvasColor?: string
  /** Hue variation amount */
  hueJitter?: number
  /** Maximum acceleration value */
  maxAcceleration?: number
  /** Rate of acceleration */
  accelerationRate?: number
  /** Rate of deceleration */
  decelerationRate?: number
  /** Minimum spawn radius */
  minSpawnRadius?: number
  /** Maximum spawn radius */
  maxSpawnRadius?: number
  /** Auto-start animation */
  auto?: boolean
  /** Initial X origin coordinate */
  originX?: number | null
  /** Initial Y origin coordinate */
  originY?: number | null
  /** Target container element */
  container?: HTMLElement | null
  /** Origin element reference */
  originElement?: Element | null
}

/**
 * Starfield API Interface
 * Defines the public API contract for the Starfield library
 */
export interface StarfieldAPI {
  /** Initialize starfield with configuration */
  setup(config: StarfieldConfig): void
  /** Enable/disable acceleration */
  setAccelerate(state: boolean): void
  /** Set origin coordinates */
  setOrigin(x: number, y: number): void
  /** Set X origin coordinate */
  setOriginX(x: number): void
  /** Set Y origin coordinate */
  setOriginY(y: number): void
  /** Resize starfield canvas */
  resize(width: number, height: number): void
  /** Cleanup resources */
  cleanup(): void
  /** Current configuration object */
  config: StarfieldConfig
}

/**
 * Global Window interface extensions
 */
declare global {
  interface Window {
    /**
     * Starfield global instance
     * External library loaded from public/starfield.js
     */
    Starfield: StarfieldAPI
  }

  /**
   * Performance memory interface (Chrome/Edge specific)
   */
  interface Performance {
    memory?: {
      /** Used JS heap size in bytes */
      usedJSHeapSize: number
      /** Total JS heap size in bytes */
      totalJSHeapSize: number
      /** JS heap size limit in bytes */
      jsHeapSizeLimit: number
    }
  }
}

/**
 * Theme types
 */
export type ThemeVariant = 'light' | 'dark'
export type ThemeSection = 'hero' | 'services' | 'portfolio' | 'about' | 'testimonials' | 'contact' | 'faq'

/**
 * Animation types
 */
export type AnimationDuration = 'fast' | 'normal' | 'slow'
export type AnimationEasing = 'easeIn' | 'easeOut' | 'easeInOut' | 'linear'

/**
 * Component state types
 */
export interface BaseComponentProps {
  /** Custom className for styling */
  className?: string
  /** Component test identifier */
  'data-testid'?: string
}

/**
 * Error boundary types
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
 * Navigation types
 */
export interface MenuItem {
  /** Display name */
  name: string
  /** Target href/anchor */
  href: string
  /** Optional icon name */
  icon?: string
  /** External link indicator */
  external?: boolean
}

/**
 * Framer Motion types re-exports
 */
export type { Variants, Transition } from 'framer-motion'

/**
 * Asset declarations for TypeScript
 */
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}