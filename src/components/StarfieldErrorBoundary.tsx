import React, { Component, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface StarfieldErrorBoundaryProps {
  children: ReactNode
  /**
   * Custom fallback component for starfield-specific errors
   */
  fallback?: ReactNode
  /**
   * Error callback with additional starfield context
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo, context: StarfieldErrorContext) => void
  /**
   * Enable recovery attempts for certain error types
   */
  enableRecovery?: boolean
  /**
   * Maximum number of recovery attempts
   */
  maxRecoveryAttempts?: number
}

interface StarfieldErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
  errorContext: StarfieldErrorContext | null
  recoveryAttempts: number
  isRecovering: boolean
}

interface StarfieldErrorContext {
  type: 'initialization' | 'runtime' | 'security' | 'performance' | 'memory' | 'unknown'
  component: string
  timestamp: number
  userAgent: string
  url: string
  recoverySuggestions: string[]
  severity: 'low' | 'medium' | 'high' | 'critical'
}

/**
 * Specialized Error Boundary for Starfield integration
 * 
 * Features:
 * - Error categorization and context analysis
 * - Intelligent recovery mechanisms
 * - Graceful fallback components
 * - Development-friendly error reporting
 * - Production-safe error handling
 */
class StarfieldErrorBoundary extends Component<StarfieldErrorBoundaryProps, StarfieldErrorBoundaryState> {
  private recoveryTimeout: NodeJS.Timeout | null = null

  constructor(props: StarfieldErrorBoundaryProps) {
    super(props)

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorContext: null,
      recoveryAttempts: 0,
      isRecovering: false
    }
  }

  static getDerivedStateFromError(error: Error): Partial<StarfieldErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorContext = this.analyzeError(error, errorInfo)
    
    // Log error details in development
    if (process.env.NODE_ENV === 'development') {
      console.group('StarfieldErrorBoundary - Error Details')
      console.error('Error:', error)
      console.error('Error Info:', errorInfo)
      console.error('Context:', errorContext)
      console.groupEnd()
    }

    // Update state with error details
    this.setState({
      error,
      errorInfo,
      errorContext,
      recoveryAttempts: 0,
      isRecovering: false
    })

    // Call error handler with context
    if (this.props.onError) {
      this.props.onError(error, errorInfo, errorContext)
    }

    // Attempt recovery if enabled and error is recoverable
    if (this.props.enableRecovery && this.isRecoverableError(errorContext)) {
      this.attemptRecovery()
    }

    // Report to error tracking service in production
    this.reportError(error, errorInfo, errorContext)
  }

  /**
   * Analyze error to determine type and context
   */
  private analyzeError(error: Error, errorInfo: React.ErrorInfo): StarfieldErrorContext {
    const errorMessage = error.message.toLowerCase()
    const componentStack = errorInfo.componentStack.toLowerCase()
    
    let type: StarfieldErrorContext['type'] = 'unknown'
    let severity: StarfieldErrorContext['severity'] = 'medium'
    const recoverySuggestions: string[] = []

    // Analyze error type based on message and stack
    if (errorMessage.includes('starfield') || componentStack.includes('starfield')) {
      if (errorMessage.includes('setup') || errorMessage.includes('initialization')) {
        type = 'initialization'
        severity = 'high'
        recoverySuggestions.push('Retry starfield initialization')
        recoverySuggestions.push('Check if starfield.js is loaded')
        recoverySuggestions.push('Verify container element exists')
      } else if (errorMessage.includes('security') || errorMessage.includes('validation')) {
        type = 'security'
        severity = 'critical'
        recoverySuggestions.push('Disable starfield integration')
        recoverySuggestions.push('Use CSS fallback animation')
      } else if (errorMessage.includes('memory') || errorMessage.includes('leak')) {
        type = 'memory'
        severity = 'high'
        recoverySuggestions.push('Restart starfield instance')
        recoverySuggestions.push('Clear starfield cache')
      } else if (errorMessage.includes('performance') || errorMessage.includes('timeout')) {
        type = 'performance'
        severity = 'medium'
        recoverySuggestions.push('Reduce starfield complexity')
        recoverySuggestions.push('Enable performance optimizations')
      } else {
        type = 'runtime'
        severity = 'medium'
        recoverySuggestions.push('Restart starfield animation')
      }
    }

    return {
      type,
      component: this.extractComponentName(errorInfo.componentStack),
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      recoverySuggestions,
      severity
    }
  }

  /**
   * Extract component name from stack trace
   */
  private extractComponentName(componentStack: string): string {
    const lines = componentStack.split('\n')
    for (const line of lines) {
      const match = line.match(/in (\w+)/)
      if (match && match[1] !== 'ErrorBoundary') {
        return match[1]
      }
    }
    return 'Unknown'
  }

  /**
   * Check if error is recoverable
   */
  private isRecoverableError(errorContext: StarfieldErrorContext): boolean {
    const recoverableTypes: StarfieldErrorContext['type'][] = [
      'initialization',
      'runtime',
      'performance'
    ]
    
    return recoverableTypes.includes(errorContext.type) && 
           errorContext.severity !== 'critical'
  }

  /**
   * Attempt to recover from error
   */
  private attemptRecovery = () => {
    const maxAttempts = this.props.maxRecoveryAttempts || 2
    
    if (this.state.recoveryAttempts >= maxAttempts) {
      return
    }

    this.setState({
      isRecovering: true,
      recoveryAttempts: this.state.recoveryAttempts + 1
    })

    // Delay recovery attempt to avoid immediate re-error
    this.recoveryTimeout = setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorContext: null,
        isRecovering: false
      })
    }, 2000)
  }

  /**
   * Manual retry handler
   */
  private handleRetry = () => {
    this.attemptRecovery()
  }

  /**
   * Report error to monitoring service
   */
  private reportError(error: Error, errorInfo: React.ErrorInfo, context: StarfieldErrorContext) {
    // In production, report to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry, LogRocket, Bugsnag, etc.
      try {
        // window.errorTracker?.captureException(error, {
        //   tags: {
        //     component: 'StarfieldErrorBoundary',
        //     errorType: context.type,
        //     severity: context.severity
        //   },
        //   extra: {
        //     errorInfo,
        //     context
        //   }
        // })
      } catch (reportingError) {
        console.error('Failed to report error:', reportingError)
      }
    }
  }

  /**
   * Cleanup on unmount
   */
  componentWillUnmount() {
    if (this.recoveryTimeout) {
      clearTimeout(this.recoveryTimeout)
    }
  }

  render() {
    if (this.state.hasError) {
      // Show recovery state
      if (this.state.isRecovering) {
        return (
          <motion.div 
            className="min-h-screen bg-bg-base-light dark:bg-bg-base-dark flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 mx-auto mb-4 border-4 border-purple-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                Recuperando...
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                Intentando restaurar la experiencia visual
              </p>
            </div>
          </motion.div>
        )
      }

      // Custom fallback
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <motion.div 
          className="min-h-screen bg-bg-base-light dark:bg-bg-base-dark flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-lg w-full text-center">
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Error Icon based on severity */}
              <div className="mb-6">
                <motion.div 
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
                    this.state.errorContext?.severity === 'critical' 
                      ? 'bg-red-100 dark:bg-red-900/30'
                      : this.state.errorContext?.severity === 'high'
                      ? 'bg-orange-100 dark:bg-orange-900/30'
                      : 'bg-yellow-100 dark:bg-yellow-900/30'
                  }`}
                  animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <svg 
                    className={`w-10 h-10 ${
                      this.state.errorContext?.severity === 'critical' 
                        ? 'text-red-600 dark:text-red-400'
                        : this.state.errorContext?.severity === 'high'
                        ? 'text-orange-600 dark:text-orange-400'
                        : 'text-yellow-600 dark:text-yellow-400'
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Error Message */}
              <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                {this.state.errorContext?.type === 'security' 
                  ? 'Error de Seguridad' 
                  : this.state.errorContext?.type === 'initialization'
                  ? 'Error de Inicialización'
                  : 'Error en la Animación'}
              </h1>
              
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
                {this.state.errorContext?.type === 'security' 
                  ? 'Se detectó un problema de seguridad. La experiencia continúa en modo seguro.'
                  : this.state.errorContext?.type === 'initialization'
                  ? 'No se pudo cargar la animación de fondo. El sitio funciona normalmente.'
                  : 'Ocurrió un error con la animación de fondo. Todas las funciones del sitio están disponibles.'}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                {this.props.enableRecovery && this.state.recoveryAttempts < (this.props.maxRecoveryAttempts || 2) && (
                  <motion.button
                    onClick={this.handleRetry}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-color-accent hover:from-purple-700 hover:to-color-accent/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reintentar ({(this.props.maxRecoveryAttempts || 2) - this.state.recoveryAttempts} restantes)
                  </motion.button>
                )}
                
                <motion.button
                  onClick={() => window.location.reload()}
                  className="w-full sm:w-auto px-6 py-3 bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-primary-light dark:text-text-primary-dark font-semibold rounded-xl transition-all duration-200 hover:bg-bg-secondary-light/80 dark:hover:bg-bg-secondary-dark/80"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Recargar página
                </motion.button>
              </div>

              {/* Development Error Details */}
              {process.env.NODE_ENV === 'development' && this.state.error && this.state.errorContext && (
                <motion.details 
                  className="mt-8 text-left bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <summary className="cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Detalles de desarrollo
                  </summary>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-mono space-y-2">
                    <div>
                      <strong>Error Type:</strong> {this.state.errorContext.type}
                    </div>
                    <div>
                      <strong>Severity:</strong> {this.state.errorContext.severity}
                    </div>
                    <div>
                      <strong>Component:</strong> {this.state.errorContext.component}
                    </div>
                    <div>
                      <strong>Recovery Attempts:</strong> {this.state.recoveryAttempts}
                    </div>
                    <div>
                      <strong>Suggestions:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {this.state.errorContext.recoverySuggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong>Error:</strong> {this.state.error.message}
                    </div>
                    <div>
                      <strong>Stack:</strong>
                      <pre className="mt-1 overflow-auto max-h-32 text-xs">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  </div>
                </motion.details>
              )}
            </motion.div>
          </div>
        </motion.div>
      )
    }

    return this.props.children
  }
}

export default StarfieldErrorBoundary