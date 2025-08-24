import React, { useEffect, useRef, useState, useCallback } from 'react'
import { StarfieldSecurityManager } from '../utils/StarfieldSecurityManager'
import type { StarfieldConfig, StarfieldAPI } from '@/types/global'

interface StarfieldCanvasProps {
  /**
   * Container class name for styling
   */
  className?: string
  
  /**
   * Origin element selector for starfield focus
   */
  originSelector?: string
  
  /**
   * Starfield configuration options
   */
  config?: {
    numStars?: number
    baseSpeed?: number
    trailLength?: number
    starColor?: string
    canvasColor?: string
    hueJitter?: number
    maxAcceleration?: number
    accelerationRate?: number
    decelerationRate?: number
    minSpawnRadius?: number
    maxSpawnRadius?: number
  }
  
  /**
   * Security configuration
   */
  securityConfig?: {
    enableChecksumValidation?: boolean
    enableSignatureValidation?: boolean
    enableRuntimeMonitoring?: boolean
    maxExecutionTime?: number
    expectedChecksum?: string
  }
  
  /**
   * Fallback component to render if Starfield fails
   */
  fallback?: React.ReactNode
  
  /**
   * Error callback when Starfield operations fail
   */
  onError?: (error: Error, context: string) => void
  
  /**
   * Success callback when Starfield is successfully initialized
   */
  onSuccess?: () => void
  
  /**
   * Enable development logging
   */
  enableLogging?: boolean
}

interface StarfieldState {
  isLoaded: boolean
  isInitialized: boolean
  hasError: boolean
  error: Error | null
  securityViolations: number
}

/**
 * Secure StarfieldCanvas wrapper component
 * 
 * Provides:
 * - Security validation and monitoring
 * - Error handling with graceful fallbacks
 * - Performance monitoring
 * - Memory leak prevention
 * - Development logging
 */
export const StarfieldCanvas: React.FC<StarfieldCanvasProps> = ({
  className = 'starfield',
  originSelector = '.starfield-origin',
  config = {},
  securityConfig = {},
  fallback = null,
  onError,
  onSuccess,
  enableLogging = process.env.NODE_ENV === 'development'
}) => {
  // Component state
  const [state, setState] = useState<StarfieldState>({
    isLoaded: false,
    isInitialized: false,
    hasError: false,
    error: null,
    securityViolations: 0
  })

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const securityManagerRef = useRef<StarfieldSecurityManager | null>(null)
  const starfieldInstanceRef = useRef<StarfieldAPI | null>(null)
  const cleanupTimeoutRef = useRef<NodeJS.Timeout>()

  // Default configuration
  const starfieldConfig = {
    numStars: 250,
    baseSpeed: 1,
    trailLength: 0.8,
    starColor: 'rgb(255, 255, 255)',
    canvasColor: 'rgb(0, 0, 0)',
    hueJitter: 0,
    maxAcceleration: 10,
    accelerationRate: 0.2,
    decelerationRate: 0.2,
    minSpawnRadius: 80,
    maxSpawnRadius: 500,
    auto: true,
    originX: null,
    originY: null,
    container: null,
    originElement: null,
    ...config
  }

  // Error logging utility
  const logError = useCallback((error: Error, context: string) => {
    if (enableLogging) {
      console.error(`StarfieldCanvas [${context}]:`, error)
    }
    
    setState(prev => ({
      ...prev,
      hasError: true,
      error
    }))

    onError?.(error, context)
  }, [enableLogging, onError])

  // Success logging utility
  const logSuccess = useCallback((message: string) => {
    if (enableLogging) {
      console.log(`StarfieldCanvas: ${message}`)
    }
  }, [enableLogging])

  // Initialize security manager
  const initializeSecurityManager = useCallback(() => {
    try {
      const securityManagerConfig = {
        enableChecksumValidation: false, // Disabled by default for demo
        enableSignatureValidation: true,
        enableRuntimeMonitoring: true,
        maxExecutionTime: 100,
        ...securityConfig
      }

      securityManagerRef.current = new StarfieldSecurityManager(securityManagerConfig)
      logSuccess('Security manager initialized')
      
      return true
    } catch (error) {
      logError(error as Error, 'Security Manager Initialization')
      return false
    }
  }, [securityConfig, logError, logSuccess])

  // Load and validate Starfield
  const loadStarfield = useCallback(async () => {
    try {
      // Check if Starfield is available
      if (!window.Starfield) {
        throw new Error('Starfield library not loaded')
      }

      // Initialize security manager
      if (!initializeSecurityManager()) {
        throw new Error('Failed to initialize security manager')
      }

      // Validate Starfield security
      const securityManager = securityManagerRef.current!
      const { isValid, violations } = await securityManager.validateStarfieldSecurity()

      if (!isValid) {
        const violationMessages = violations.map(v => v.message).join(', ')
        throw new Error(`Security validation failed: ${violationMessages}`)
      }

      if (violations.length > 0 && enableLogging) {
        console.warn('Starfield security warnings:', violations)
      }

      setState(prev => ({
        ...prev,
        isLoaded: true,
        securityViolations: violations.length
      }))

      logSuccess(`Starfield loaded with ${violations.length} security warnings`)
      
      return securityManager.createSecureWrapper(window.Starfield)
    } catch (error) {
      logError(error as Error, 'Starfield Loading')
      return null
    }
  }, [initializeSecurityManager, enableLogging, logError, logSuccess])

  // Initialize Starfield
  const initializeStarfield = useCallback(async () => {
    if (!containerRef.current) {
      logError(new Error('Container not available'), 'Initialization')
      return
    }

    try {
      const secureStarfield = await loadStarfield()
      if (!secureStarfield) {
        throw new Error('Failed to load secure Starfield instance')
      }

      // Find origin element
      const originElement = document.querySelector(originSelector)
      if (!originElement && starfieldConfig.auto) {
        logError(new Error(`Origin element not found: ${originSelector}`), 'Initialization')
        return
      }

      // Setup Starfield with security wrapper
      const setupConfig = {
        ...starfieldConfig,
        container: containerRef.current,
        originElement: originElement || undefined
      }

      await secureStarfield.setup(setupConfig)
      starfieldInstanceRef.current = secureStarfield

      setState(prev => ({
        ...prev,
        isInitialized: true
      }))

      logSuccess('Starfield initialized successfully')
      onSuccess?.()

    } catch (error) {
      logError(error as Error, 'Starfield Initialization')
    }
  }, [loadStarfield, originSelector, starfieldConfig, logError, logSuccess, onSuccess])

  // Cleanup function
  const cleanup = useCallback(() => {
    try {
      // Clear any pending timeouts
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current)
      }

      // Cleanup Starfield instance
      if (starfieldInstanceRef.current && starfieldInstanceRef.current.cleanup) {
        starfieldInstanceRef.current.cleanup()
        starfieldInstanceRef.current = null
      }

      // Cleanup security manager
      if (securityManagerRef.current) {
        if (enableLogging) {
          const metrics = securityManagerRef.current.getPerformanceMetrics()
          if (metrics) {
            console.log('Starfield Performance Summary:', metrics)
          }
        }

        securityManagerRef.current.cleanup()
        securityManagerRef.current = null
      }

      logSuccess('Cleanup completed')
    } catch (error) {
      logError(error as Error, 'Cleanup')
    }
  }, [enableLogging, logError, logSuccess])

  // Initialize on mount
  useEffect(() => {
    const initWithDelay = () => {
      cleanupTimeoutRef.current = setTimeout(initializeStarfield, 100)
    }

    initWithDelay()

    return cleanup
  }, [initializeStarfield, cleanup])

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (starfieldInstanceRef.current && containerRef.current) {
        try {
          const { clientWidth, clientHeight } = containerRef.current
          starfieldInstanceRef.current.resize(clientWidth, clientHeight)
        } catch (error) {
          logError(error as Error, 'Resize Handler')
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [logError])

  // Render fallback if error or fallback provided
  if (state.hasError && fallback) {
    return <>{fallback}</>
  }

  // Render CSS-only fallback if Starfield fails to load
  if (state.hasError) {
    return (
      <div className={`${className} starfield-fallback`}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-black opacity-50" />
        <div 
          className="absolute inset-0 animate-pulse" 
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Cdefs%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3C/defs%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"0.1\"/%3E%3C/svg%3E')"
          }}
        />
        
        {/* Static stars fallback */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={className}
      data-testid="starfield-container"
      data-initialized={state.isInitialized}
      data-security-violations={state.securityViolations}
    >
      {/* Development info overlay */}
      {enableLogging && process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 text-xs text-white/50 font-mono bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
          Loaded: {state.isLoaded ? '✓' : '✗'} | 
          Init: {state.isInitialized ? '✓' : '✗'} | 
          Security: {state.securityViolations} warnings
        </div>
      )}
    </div>
  )
}

export default StarfieldCanvas