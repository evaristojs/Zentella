/**
 * Centralized Type Exports
 * 
 * This file serves as the main entry point for all TypeScript types
 * used throughout the Zentella website application.
 * 
 * Import types like: import { StarfieldConfig, PerformanceMetrics } from '@/types'
 */

// Global types and interfaces
export type {
  StarfieldConfig,
  StarfieldAPI,
  ThemeVariant,
  ThemeSection,
  AnimationDuration,
  AnimationEasing,
  BaseComponentProps,
  ErrorInfo,
  ErrorBoundaryState,
  MenuItem,
  Variants,
  Transition
} from './global'

// Hook-specific types
export type {
  UseScrollAnimationOptions,
  UseScrollAnimationReturn,
  PerformanceMetrics,
  PerformanceAlert,
  PerformanceAlertType,
  PerformanceAlertSeverity,
  UsePerformanceMonitorOptions,
  UsePerformanceMonitorReturn,
  UseErrorHandlerOptions,
  UseErrorHandlerReturn,
  UseNavigationStateOptions,
  UseNavigationStateReturn,
  UseScrollDetectionOptions,
  UseScrollDetectionReturn,
  UseSectionObserverOptions,
  UseSectionObserverReturn,
  UseThemeReturn,
  UseIntersectionObserverOptions,
  UseIntersectionObserverReturn
} from './hooks'

/**
 * Utility types for common patterns
 */

/** Make all properties optional recursively */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/** Make specific properties required */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>

/** Extract function parameters as tuple type */
export type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never

/** Extract function return type */
export type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

/** Create a type with all properties set to a specific value type */
export type MapToType<T, U> = {
  [K in keyof T]: U
}

/** Extract keys that have values of a specific type */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

/** Create a strict object type that doesn't allow extra properties */
export type Exact<T> = T extends infer U ? { [K in keyof U]: T[K] } : never

/**
 * Component prop types for common patterns
 */

/** Standard component props with children */
export interface WithChildren {
  children: React.ReactNode
}

/** Component props with optional className */
export interface WithClassName {
  className?: string
}

/** Component props with optional style */
export interface WithStyle {
  style?: React.CSSProperties
}

/** Combination of common component props */
export type StandardProps = WithChildren & WithClassName & WithStyle

/**
 * Event handler types
 */

/** Generic event handler */
export type EventHandler<T = Event> = (event: T) => void

/** Click event handler */
export type ClickHandler = EventHandler<React.MouseEvent>

/** Form event handler */
export type FormHandler = EventHandler<React.FormEvent>

/** Change event handler for inputs */
export type ChangeHandler = EventHandler<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>>

/**
 * API response types
 */

/** Standard API response wrapper */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string | number
    details?: Record<string, unknown>
  }
  meta?: {
    timestamp: string
    version: string
    requestId: string
  }
}

/** Paginated API response */
export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

/**
 * Form types
 */

/** Generic form field */
export interface FormField<T = string> {
  value: T
  error?: string
  touched: boolean
  valid: boolean
}

/** Form validation result */
export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

/** Form state */
export interface FormState<T extends Record<string, any> = Record<string, any>> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isValid: boolean
  isSubmitting: boolean
  isDirty: boolean
}