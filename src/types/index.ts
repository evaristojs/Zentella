/**
 * Centralized Type Exports
 * 
 * This file serves as the main entry point for all TypeScript types
 * used throughout the Zentella website application.
 */

// Global types and interfaces  
export type {
  ThemeVariant,
  ThemeSection,
  BaseComponentProps,
  ErrorInfo,
  ErrorBoundaryState,
  MenuItem
} from './global'

// Hook-specific types
export type {
  UseIntersectionObserverOptions,
  UseIntersectionObserverReturn,
  UseThemeReturn
} from './hooks'

/**
 * Utility types for common patterns
 */

/** Make all properties optional recursively */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/** Component prop types for common patterns */
export interface WithChildren {
  children: React.ReactNode
}

export interface WithClassName {
  className?: string
}

export type StandardProps = WithChildren & WithClassName

/**
 * Event handler types
 */
export type EventHandler<T = Event> = (event: T) => void
export type ClickHandler = EventHandler<React.MouseEvent>
export type FormHandler = EventHandler<React.FormEvent>
export type ChangeHandler = EventHandler<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>>