/**
 * StarfieldSecurityManager
 * 
 * Manages security validation for external Starfield dependency
 * Implements integrity checking, function signature validation, and runtime monitoring
 */

import type { StarfieldAPI, StarfieldConfig } from '@/types/global'
import { devLog } from './logger'

/**
 * Security configuration interface
 */
interface SecurityConfig {
  /** Enable checksum validation for starfield.js */
  enableChecksumValidation: boolean
  /** Enable function signature validation */
  enableSignatureValidation: boolean
  /** Enable runtime monitoring */
  enableRuntimeMonitoring: boolean
  /** Maximum execution time for starfield operations (ms) */
  maxExecutionTime: number
  /** Expected checksum for starfield.js (SHA-256) */
  expectedChecksum?: string
}

/**
 * Security violation types
 */
type SecurityViolationType = 'checksum' | 'signature' | 'runtime' | 'execution_time' | 'memory_leak'

/**
 * Security violation details based on type
 */
interface SecurityViolationDetails {
  checksum: { expectedChecksum: string; actualChecksum: string }
  signature: { expected: string[]; received: string[] }
  runtime: { error: string; method?: string; args?: unknown[] }
  execution_time: { executionTime: number; maxAllowed: number }
  memory_leak: { trackedOperations: number }
}

/**
 * Generic security violation interface
 */
interface SecurityViolation<T extends SecurityViolationType = SecurityViolationType> {
  type: T
  message: string
  timestamp: number
  details?: T extends keyof SecurityViolationDetails
    ? SecurityViolationDetails[T]
    : Record<string, unknown>
}

/**
 * Validation result interface
 */
interface ValidationResult {
  isValid: boolean
  violations: SecurityViolation[]
}

/**
 * Performance metrics interface
 */
interface PerformanceMetrics {
  totalCalls: number
  averageExecutionTime: number
  maxExecutionTime: number
  minExecutionTime: number
  violationsCount: number
  performanceGrade: 'Excellent' | 'Good' | 'Fair' | 'Poor'
}

export class StarfieldSecurityManager {
  private config: SecurityConfig
  private violations: SecurityViolation[] = []
  private monitoringEnabled: boolean = false
  private executionTimes: Map<string, number> = new Map()
  
  // Expected function signatures for validation
  private readonly expectedSignatures: Record<keyof StarfieldAPI, string[]> = {
    setup: ['object'],
    setAccelerate: ['boolean'],
    setOrigin: ['number', 'number'],
    setOriginX: ['number'],
    setOriginY: ['number'],
    resize: ['number', 'number'],
    cleanup: [],
    config: [] // config is a property, not a method
  }

  constructor(config: SecurityConfig) {
    this.config = {
      enableChecksumValidation: true,
      enableSignatureValidation: true,
      enableRuntimeMonitoring: true,
      maxExecutionTime: 100, // 100ms max per operation
      ...config
    }
    
    if (this.config.enableRuntimeMonitoring) {
      this.startMonitoring()
    }
  }

  /**
   * Validate starfield.js integrity and API
   */
  public async validateStarfieldSecurity(): Promise<ValidationResult> {
    const violations: SecurityViolation[] = []

    try {
      // 1. Checksum validation
      if (this.config.enableChecksumValidation && this.config.expectedChecksum) {
        const checksumValid = await this.validateChecksum()
        if (!checksumValid) {
          violations.push({
            type: 'checksum',
            message: 'Starfield.js checksum validation failed',
            timestamp: Date.now(),
          })
        }
      }

      // 2. Function signature validation
      if (this.config.enableSignatureValidation) {
        const signatureViolations = this.validateFunctionSignatures()
        violations.push(...signatureViolations)
      }

      // 3. Runtime behavior validation
      const runtimeViolations = await this.validateRuntimeBehavior()
      violations.push(...runtimeViolations)

    } catch (error) {
      violations.push({
        type: 'runtime',
        message: `Security validation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: Date.now(),
        details: { error: error instanceof Error ? error.stack : String(error) }
      })
    }

    this.violations.push(...violations)
    
    return {
      isValid: violations.length === 0,
      violations
    }
  }

  /**
   * Create secure wrapper for Starfield API
   */
  public createSecureWrapper(starfield: StarfieldAPI): StarfieldAPI {
    if (!starfield) {
      throw new Error('Starfield API not available')
    }

    const secureWrapper: StarfieldAPI = {} as StarfieldAPI

    // Wrap each method with security monitoring
    Object.keys(this.expectedSignatures).forEach(methodName => {
      const originalMethod = (starfield as any)[methodName]
      
      if (typeof originalMethod !== 'function') {
        this.logViolation({
          type: 'signature',
          message: `Missing or invalid method: ${methodName}`,
          timestamp: Date.now(),
        })
        return
      }

      ;(secureWrapper as any)[methodName] = (...args: any[]) => {
        try {
          // Validate arguments
          const expectedArgTypes = this.expectedSignatures[methodName]
          if (!this.validateArguments(args, expectedArgTypes)) {
            this.logViolation({
              type: 'signature',
              message: `Invalid arguments for ${methodName}`,
              timestamp: Date.now(),
              details: { 
                expected: expectedArgTypes,
                received: args.map(arg => typeof arg)
              }
            })
            return
          }

          // Monitor execution time
          const startTime = performance.now()
          const result = originalMethod.apply(starfield, args)
          const executionTime = performance.now() - startTime

          // Log execution time
          this.executionTimes.set(`${methodName}_${Date.now()}`, executionTime)

          // Check for excessive execution time
          if (executionTime > this.config.maxExecutionTime) {
            this.logViolation({
              type: 'execution_time',
              message: `${methodName} exceeded maximum execution time`,
              timestamp: Date.now(),
              details: {
                executionTime,
                maxAllowed: this.config.maxExecutionTime
              }
            })
          }

          return result
        } catch (error) {
          this.logViolation({
            type: 'runtime',
            message: `Runtime error in ${methodName}: ${error instanceof Error ? error.message : 'Unknown error'}`,
            timestamp: Date.now(),
            details: { 
              method: methodName,
              args,
              error: error instanceof Error ? error.stack : String(error)
            }
          })
          
          // Re-throw to maintain original behavior
          throw error
        }
      }
    })

    // Copy config object safely
    secureWrapper.config = this.createSecureConfigProxy(starfield.config)

    return secureWrapper
  }

  /**
   * Get security violations
   */
  public getViolations(): SecurityViolation[] {
    return [...this.violations]
  }

  /**
   * Get performance metrics
   */
  public getPerformanceMetrics(): PerformanceMetrics | null {
    const executionTimes = Array.from(this.executionTimes.values())
    
    if (executionTimes.length === 0) {
      return null
    }

    const avgTime = executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length
    const maxTime = Math.max(...executionTimes)
    const minTime = Math.min(...executionTimes)

    return {
      totalCalls: executionTimes.length,
      averageExecutionTime: avgTime,
      maxExecutionTime: maxTime,
      minExecutionTime: minTime,
      violationsCount: this.violations.length,
      performanceGrade: maxTime <= 16 ? 'Excellent' : maxTime <= 33 ? 'Good' : maxTime <= 50 ? 'Fair' : 'Poor'
    }
  }

  /**
   * Clear violations and reset monitoring
   */
  public reset(): void {
    this.violations = []
    this.executionTimes.clear()
  }

  /**
   * Stop monitoring and cleanup
   */
  public cleanup(): void {
    this.monitoringEnabled = false
    this.reset()
  }

  /**
   * Validate starfield.js checksum
   */
  private async validateChecksum(): Promise<boolean> {
    if (!this.config.expectedChecksum) {
      return true // Skip if no checksum provided
    }

    try {
      // In a real implementation, you would fetch the file and calculate its hash
      // For now, we'll simulate this check
      const response = await fetch('/starfield.js')
      const content = await response.text()
      
      // Calculate SHA-256 hash (simplified for demo)
      const encoder = new TextEncoder()
      const data = encoder.encode(content)
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

      return hashHex === this.config.expectedChecksum
    } catch (error) {
      devLog.error('Checksum validation failed', error, 'StarfieldSecurity')
      return false
    }
  }

  /**
   * Validate function signatures
   */
  private validateFunctionSignatures(): SecurityViolation[] {
    const violations: SecurityViolation[] = []

    if (typeof (window as any).Starfield !== 'object') {
      violations.push({
        type: 'signature',
        message: 'Starfield API not found or invalid',
        timestamp: Date.now(),
      })
      return violations
    }

    // Check if all expected methods exist
    Object.keys(this.expectedSignatures).forEach(methodName => {
      const method = ((window as any).Starfield as any)[methodName]
      
      if (methodName !== 'config' && typeof method !== 'function') {
        violations.push({
          type: 'signature',
          message: `Missing or invalid method: ${methodName}`,
          timestamp: Date.now(),
        })
      }
    })

    return violations
  }

  /**
   * Validate runtime behavior
   */
  private async validateRuntimeBehavior(): Promise<SecurityViolation[]> {
    const violations: SecurityViolation[] = []

    try {
      // Test basic functionality without side effects
      if ((window as any).Starfield && typeof (window as any).Starfield.config === 'object') {
        // Verify config has expected properties
        const requiredConfigProps = ['numStars', 'baseSpeed', 'trailLength']
        const missingProps = requiredConfigProps.filter(
          prop => !(prop in (window as any).Starfield.config)
        )

        if (missingProps.length > 0) {
          violations.push({
            type: 'runtime',
            message: 'Missing required config properties',
            timestamp: Date.now(),
            details: { missingProperties: missingProps }
          })
        }
      }
    } catch (error) {
      violations.push({
        type: 'runtime',
        message: `Runtime behavior validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: Date.now(),
        details: { error: error instanceof Error ? error.stack : String(error) }
      })
    }

    return violations
  }

  /**
   * Validate function arguments
   */
  private validateArguments(args: any[], expectedTypes: string[]): boolean {
    if (args.length !== expectedTypes.length) {
      return false
    }

    return args.every((arg, index) => {
      const expectedType = expectedTypes[index]
      const actualType = typeof arg
      
      return actualType === expectedType || 
             (expectedType === 'number' && !isNaN(Number(arg))) ||
             (expectedType === 'boolean' && (arg === true || arg === false))
    })
  }

  /**
   * Create secure proxy for config object
   */
  private createSecureConfigProxy(config: StarfieldConfig): StarfieldConfig {
    return new Proxy(config, {
      set: (target, property, value) => {
        // Log configuration changes for monitoring
        if (this.config.enableRuntimeMonitoring) {
          devLog.config('StarfieldSecurity', 'Starfield config changed', { property, value })
        }
        
        target[property as string] = value
        return true
      },
      get: (target, property) => {
        return target[property as string]
      }
    })
  }

  /**
   * Log security violation
   */
  private logViolation(violation: SecurityViolation): void {
    this.violations.push(violation)
    
    devLog.warn('Starfield Security Violation', violation, 'StarfieldSecurity')
  }

  /**
   * Start performance monitoring
   */
  private startMonitoring(): void {
    this.monitoringEnabled = true
    
    // Monitor memory usage periodically in development
    if (process.env.NODE_ENV === 'development') {
      const memoryMonitor = setInterval(() => {
        if (!this.monitoringEnabled) {
          clearInterval(memoryMonitor)
          return
        }

        // Check for potential memory leaks
        if (this.executionTimes.size > 1000) {
          this.logViolation({
            type: 'memory_leak',
            message: 'Potential memory leak detected in execution time tracking',
            timestamp: Date.now(),
            details: { trackedOperations: this.executionTimes.size }
          })

          // Clear old entries to prevent actual memory leak
          const entries = Array.from(this.executionTimes.entries())
          this.executionTimes.clear()
          
          // Keep only recent entries
          entries.slice(-100).forEach(([key, value]) => {
            this.executionTimes.set(key, value)
          })
        }
      }, 30000) // Check every 30 seconds
    }
  }
}