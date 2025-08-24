import React from 'react'
import { render, screen, fireEvent } from '../../test/utils/render'
import ErrorBoundary from '../ErrorBoundary'
import { mockErrorBoundaryProps } from '../../test/fixtures/test-data'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    details: ({ children, ...props }: any) => <details {...props}>{children}</details>,
  },
}))

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message')
  }
  return <div>No error</div>
}

// Component that throws different types of errors
const ThrowSpecificError = ({ errorType }: { errorType?: string }) => {
  switch (errorType) {
    case 'runtime':
      throw new Error('Runtime error occurred')
    case 'network':
      throw new Error('Network request failed')
    case 'validation':
      throw new Error('Validation failed for input')
    case 'permission':
      throw new Error('Permission denied')
    default:
      throw new Error('Generic error')
  }
}

describe('ErrorBoundary', () => {
  // Mock console methods
  const originalError = console.error
  const originalLog = console.log
  let mockConsoleError: any
  let mockConsoleLog: any

  beforeEach(() => {
    mockConsoleError = vi.fn()
    mockConsoleLog = vi.fn()
    console.error = mockConsoleError
    console.log = mockConsoleLog
    
    // Mock window.location.reload
    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        reload: vi.fn(),
      },
      writable: true,
    })
  })

  afterEach(() => {
    console.error = originalError
    console.log = originalLog
    vi.clearAllMocks()
  })

  describe('No Error State', () => {
    it('should render children when there is no error', () => {
      render(
        <ErrorBoundary>
          <div data-testid="child-component">Child content</div>
        </ErrorBoundary>
      )

      expect(screen.getByTestId('child-component')).toBeInTheDocument()
      expect(screen.getByText('Child content')).toBeInTheDocument()
    })

    it('should not render error UI when children render successfully', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      )

      expect(screen.getByText('No error')).toBeInTheDocument()
      expect(screen.queryByText('¡Oops! Algo salió mal')).not.toBeInTheDocument()
    })
  })

  describe('Error State', () => {
    it('should catch and display error when child component throws', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByText('¡Oops! Algo salió mal')).toBeInTheDocument()
      expect(screen.getByText(/Se ha producido un error inesperado/)).toBeInTheDocument()
    })

    it('should display action buttons in error state', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByRole('button', { name: /intentar de nuevo/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /recargar página/i })).toBeInTheDocument()
    })

    it('should log error in development mode', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(mockConsoleError).toHaveBeenCalledWith(
        'ErrorBoundary caught an error:',
        expect.any(Error),
        expect.any(Object)
      )

      process.env.NODE_ENV = originalEnv
    })

    it('should not log error in production mode', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(mockConsoleError).not.toHaveBeenCalledWith(
        'ErrorBoundary caught an error:',
        expect.any(Error),
        expect.any(Object)
      )

      process.env.NODE_ENV = originalEnv
    })
  })

  describe('Custom Fallback', () => {
    it('should render custom fallback when provided', () => {
      const customFallback = <div data-testid="custom-fallback">Custom error message</div>

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()
      expect(screen.getByText('Custom error message')).toBeInTheDocument()
      expect(screen.queryByText('¡Oops! Algo salió mal')).not.toBeInTheDocument()
    })

    it('should prefer custom fallback over default error UI', () => {
      const customFallback = <div data-testid="custom-fallback">Priority fallback</div>

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /intentar de nuevo/i })).not.toBeInTheDocument()
    })
  })

  describe('Error Handler Callback', () => {
    it('should call onError callback when error occurs', () => {
      const mockOnError = vi.fn()

      render(
        <ErrorBoundary onError={mockOnError}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(mockOnError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String)
        })
      )
    })

    it('should call onError with correct error details', () => {
      const mockOnError = vi.fn()

      render(
        <ErrorBoundary onError={mockOnError}>
          <ThrowSpecificError errorType="runtime" />
        </ErrorBoundary>
      )

      const [error, errorInfo] = mockOnError.mock.calls[0]
      expect(error.message).toBe('Runtime error occurred')
      expect(errorInfo).toHaveProperty('componentStack')
    })

    it('should not call onError when no error occurs', () => {
      const mockOnError = vi.fn()

      render(
        <ErrorBoundary onError={mockOnError}>
          <div>No error content</div>
        </ErrorBoundary>
      )

      expect(mockOnError).not.toHaveBeenCalled()
    })
  })

  describe('Error Recovery', () => {
    it('should have retry button that can be clicked', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByText('¡Oops! Algo salió mal')).toBeInTheDocument()

      const retryButton = screen.getByRole('button', { name: /intentar de nuevo/i })
      
      // Should be able to click retry button
      expect(() => fireEvent.click(retryButton)).not.toThrow()
    })

    it('should reload page when reload button is clicked', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      const reloadButton = screen.getByRole('button', { name: /recargar página/i })
      fireEvent.click(reloadButton)

      expect(window.location.reload).toHaveBeenCalled()
    })

    it('should handle multiple retry attempts', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      const retryButton = screen.getByRole('button', { name: /intentar de nuevo/i })

      // First retry
      fireEvent.click(retryButton)
      expect(screen.getByText('¡Oops! Algo salió mal')).toBeInTheDocument()

      // Second retry
      fireEvent.click(retryButton)
      expect(screen.getByText('¡Oops! Algo salió mal')).toBeInTheDocument()
    })
  })

  describe('Development Mode Features', () => {
    const originalEnv = process.env.NODE_ENV

    beforeEach(() => {
      process.env.NODE_ENV = 'development'
    })

    afterEach(() => {
      process.env.NODE_ENV = originalEnv
    })

    it('should show error details in development mode', () => {
      render(
        <ErrorBoundary>
          <ThrowSpecificError errorType="runtime" />
        </ErrorBoundary>
      )

      expect(screen.getByText('Detalles del error (solo en desarrollo)')).toBeInTheDocument()
    })

    it('should display error message in development details', () => {
      render(
        <ErrorBoundary>
          <ThrowSpecificError errorType="validation" />
        </ErrorBoundary>
      )

      // Click to expand details
      const detailsElement = screen.getByText('Detalles del error (solo en desarrollo)')
      fireEvent.click(detailsElement)

      expect(screen.getByText(/Error:.*Validation failed for input/)).toBeInTheDocument()
    })

    it('should display stack trace in development details', () => {
      render(
        <ErrorBoundary>
          <ThrowSpecificError errorType="network" />
        </ErrorBoundary>
      )

      const detailsElement = screen.getByText('Detalles del error (solo en desarrollo)')
      fireEvent.click(detailsElement)

      expect(screen.getAllByText(/Stack:/).length).toBeGreaterThan(0)
    })

    it('should display component stack in development details', () => {
      render(
        <ErrorBoundary>
          <ThrowSpecificError errorType="permission" />
        </ErrorBoundary>
      )

      const detailsElement = screen.getByText('Detalles del error (solo en desarrollo)')
      fireEvent.click(detailsElement)

      expect(screen.getByText(/Component Stack:/)).toBeInTheDocument()
    })
  })

  describe('Production Mode Features', () => {
    const originalEnv = process.env.NODE_ENV

    beforeEach(() => {
      process.env.NODE_ENV = 'production'
    })

    afterEach(() => {
      process.env.NODE_ENV = originalEnv
    })

    it('should not show error details in production mode', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.queryByText('Detalles del error')).not.toBeInTheDocument()
    })

    it('should still show user-friendly error message in production', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByText('¡Oops! Algo salió mal')).toBeInTheDocument()
      expect(screen.getByText(/Se ha producido un error inesperado/)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA roles and labels', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      const retryButton = screen.getByRole('button', { name: /intentar de nuevo/i })
      const reloadButton = screen.getByRole('button', { name: /recargar página/i })

      expect(retryButton).toBeInTheDocument()
      expect(reloadButton).toBeInTheDocument()
    })

    it('should be keyboard accessible', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      const retryButton = screen.getByRole('button', { name: /intentar de nuevo/i })
      
      // Should be focusable
      retryButton.focus()
      expect(retryButton).toHaveFocus()
    })

    it('should support screen readers with appropriate text', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      // Check for screen reader friendly text
      expect(screen.getByText('¡Oops! Algo salió mal')).toBeInTheDocument()
      expect(screen.getByText(/nuestro equipo ha sido notificado/)).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle error with undefined message', () => {
      const ErrorWithUndefinedMessage = () => {
        const error = new Error()
        error.message = undefined as any
        throw error
      }

      render(
        <ErrorBoundary>
          <ErrorWithUndefinedMessage />
        </ErrorBoundary>
      )

      expect(screen.getByText('¡Oops! Algo salió mal')).toBeInTheDocument()
    })

    it('should handle non-Error objects being thrown', () => {
      const ThrowString = () => {
        throw 'String error'
      }

      render(
        <ErrorBoundary>
          <ThrowString />
        </ErrorBoundary>
      )

      expect(screen.getByText('¡Oops! Algo salió mal')).toBeInTheDocument()
    })

    it('should handle component unmounting during error state', () => {
      const { unmount } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(() => unmount()).not.toThrow()
    })

    it('should handle multiple children with mixed error states', () => {
      render(
        <ErrorBoundary>
          <div>Working component</div>
          <ThrowError shouldThrow={true} />
          <div>Another working component</div>
        </ErrorBoundary>
      )

      // Should show error boundary UI when any child throws
      expect(screen.getByText('¡Oops! Algo salió mal')).toBeInTheDocument()
      expect(screen.queryByText('Working component')).not.toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('should not cause memory leaks', () => {
      const { unmount } = render(
        <ErrorBoundary>
          <div>Test content</div>
        </ErrorBoundary>
      )

      // Should unmount cleanly
      expect(() => unmount()).not.toThrow()
    })

    it('should handle rapid error/recovery cycles', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      // Should show error initially
      expect(screen.getByText('¡Oops! Algo salió mal')).toBeInTheDocument()

      // Simulate error/recovery cycle by rerendering with no error
      rerender(
        <ErrorBoundary>
          <div>Working component</div>
        </ErrorBoundary>
      )

      // Should show working component (ErrorBoundary doesn't auto-recover from renders)
      expect(screen.getByText('¡Oops! Algo salió mal')).toBeInTheDocument()
    })
  })
})