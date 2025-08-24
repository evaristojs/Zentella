import { useState, useCallback } from 'react'
import { devLog } from '../utils/logger'

export interface ErrorState {
  error: Error | null
  isError: boolean
  errorMessage: string
}

export interface ErrorHandlerOptions {
  onError?: (error: Error) => void
  showToast?: boolean
  logToConsole?: boolean
}

export const useErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const { onError, logToConsole = true } = options

  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isError: false,
    errorMessage: ''
  })

  const handleError = useCallback((error: Error | string, context?: string) => {
    const errorObj = error instanceof Error ? error : new Error(error)
    const contextMessage = context ? `[${context}] ` : ''
    const fullMessage = `${contextMessage}${errorObj.message}`

    // Log error with development-only logging
    if (logToConsole) {
      devLog.error('Error caught by useErrorHandler', {
        error: errorObj,
        context,
        stack: errorObj.stack
      }, 'ErrorHandler')
    }

    // Update error state
    setErrorState({
      error: errorObj,
      isError: true,
      errorMessage: fullMessage
    })

    // Call custom error handler if provided
    if (onError) {
      onError(errorObj)
    }

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      // errorReportingService.captureException(errorObj, { context })
    }
  }, [onError, logToConsole])

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isError: false,
      errorMessage: ''
    })
  }, [])

  const retry = useCallback((callback: () => void | Promise<void>) => {
    clearError()
    try {
      const result = callback()
      if (result instanceof Promise) {
        result.catch(handleError)
      }
    } catch (error) {
      handleError(error as Error)
    }
  }, [clearError, handleError])

  return {
    ...errorState,
    handleError,
    clearError,
    retry
  }
}

// Utility function for async error handling
export const withErrorHandling = <T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  errorHandler: (error: Error) => void
) => {
  return async (...args: T): Promise<R | void> => {
    try {
      return await fn(...args)
    } catch (error) {
      errorHandler(error as Error)
    }
  }
}

// Common error types for better error categorization
export class NetworkError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class ComponentError extends Error {
  constructor(message: string, public component?: string) {
    super(message)
    this.name = 'ComponentError'
  }
}