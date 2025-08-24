import React, { Component, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    // Update state with error details
    this.setState({
      error,
      errorInfo
    })

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // In production, you might want to log this to an error reporting service
    // Example: Sentry, LogRocket, etc.
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
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
              {/* Error Icon */}
              <div className="mb-6">
                <motion.div 
                  className="w-20 h-20 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <svg 
                    className="w-10 h-10 text-red-600 dark:text-red-400" 
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
                ¡Oops! Algo salió mal
              </h1>
              
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">
                Se ha producido un error inesperado. No te preocupes, nuestro equipo ha sido notificado.
              </p>

              {/* Action Buttons */}
              <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <motion.button
                  onClick={this.handleRetry}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-color-accent hover:from-purple-700 hover:to-color-accent/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Intentar de nuevo
                </motion.button>
                
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
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <motion.details 
                  className="mt-8 text-left bg-red-50 dark:bg-red-900/20 rounded-lg p-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <summary className="cursor-pointer text-sm font-semibold text-red-700 dark:text-red-300 mb-2">
                    Detalles del error (solo en desarrollo)
                  </summary>
                  <div className="text-xs text-red-600 dark:text-red-400 font-mono space-y-2">
                    <div>
                      <strong>Error:</strong> {this.state.error.message}
                    </div>
                    <div>
                      <strong>Stack:</strong>
                      <pre className="mt-1 overflow-auto max-h-40 text-xs">
                        {this.state.error.stack}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="mt-1 overflow-auto max-h-40 text-xs">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
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

export default ErrorBoundary