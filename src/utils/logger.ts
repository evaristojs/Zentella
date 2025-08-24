/**
 * Conditional logging utility for development/production environments
 * Only logs in development mode, silent in production
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  data?: Record<string, unknown> | string | number | boolean | null;
  component?: string;
}

class Logger {
  private isDevelopment: boolean;
  private logHistory: LogEntry[] = [];
  private maxHistorySize = 100;

  constructor() {
    // Check if we're in development mode
    this.isDevelopment = this.checkDevelopmentMode();
  }

  private checkDevelopmentMode(): boolean {
    // Check Vite environment variables
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env.DEV === true || import.meta.env.MODE === 'development';
    }
    
    // Fallback to Node.js environment
    if (typeof process !== 'undefined' && process.env) {
      return process.env.NODE_ENV === 'development';
    }
    
    // Default to production
    return false;
  }

  private shouldLog(): boolean {
    return this.isDevelopment;
  }

  private createLogEntry(level: LogLevel, message: string, data?: Record<string, unknown> | string | number | boolean | null, component?: string): LogEntry {
    return {
      timestamp: new Date(),
      level,
      message,
      data,
      component
    };
  }

  private addToHistory(entry: LogEntry): void {
    if (!this.shouldLog()) return;
    
    this.logHistory.push(entry);
    if (this.logHistory.length > this.maxHistorySize) {
      this.logHistory.shift();
    }
  }

  private formatMessage(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const component = entry.component ? `[${entry.component}]` : '';
    return `${timestamp} ${component} ${entry.message}`;
  }

  /**
   * Debug level logging - for detailed development info
   */
  debug(message: string, data?: Record<string, unknown> | string | number | boolean | null, component?: string): void {
    if (!this.shouldLog()) return;
    
    const entry = this.createLogEntry('debug', message, data, component);
    this.addToHistory(entry);
    
    console.debug(this.formatMessage(entry), data ? data : '');
  }

  /**
   * Info level logging - for general information
   */
  info(message: string, data?: Record<string, unknown> | string | number | boolean | null, component?: string): void {
    if (!this.shouldLog()) return;
    
    const entry = this.createLogEntry('info', message, data, component);
    this.addToHistory(entry);
    
    console.info(this.formatMessage(entry), data ? data : '');
  }

  /**
   * Warning level logging - for potential issues
   */
  warn(message: string, data?: Record<string, unknown> | string | number | boolean | null, component?: string): void {
    if (!this.shouldLog()) return;
    
    const entry = this.createLogEntry('warn', message, data, component);
    this.addToHistory(entry);
    
    console.warn(this.formatMessage(entry), data ? data : '');
  }

  /**
   * Error level logging - for errors (always logs, even in production)
   */
  error(message: string, data?: Record<string, unknown> | string | number | boolean | null, component?: string): void {
    const entry = this.createLogEntry('error', message, data, component);
    
    // Always add errors to history
    this.logHistory.push(entry);
    if (this.logHistory.length > this.maxHistorySize) {
      this.logHistory.shift();
    }
    
    // Always log errors, even in production
    console.error(this.formatMessage(entry), data ? data : '');
  }

  /**
   * Performance logging - specialized for performance metrics
   */
  performance(operation: string, duration: number, details?: Record<string, unknown> | string | number | boolean | null, component?: string): void {
    if (!this.shouldLog()) return;
    
    const message = `Performance: ${operation} took ${duration}ms`;
    const entry = this.createLogEntry('info', message, { duration, details }, component);
    this.addToHistory(entry);
    
    // Use a distinct style for performance logs
    console.log(
      `%c⚡ ${this.formatMessage(entry)}`,
      'color: #22c55e; font-weight: bold;',
      details ? details : ''
    );
  }

  /**
   * Component lifecycle logging
   */
  lifecycle(component: string, event: string, details?: Record<string, unknown> | string | number | boolean | null): void {
    if (!this.shouldLog()) return;
    
    const message = `${event}`;
    const entry = this.createLogEntry('debug', message, details, component);
    this.addToHistory(entry);
    
    console.log(
      `%c🔄 ${this.formatMessage(entry)}`,
      'color: #3b82f6; font-weight: bold;',
      details ? details : ''
    );
  }

  /**
   * Configuration logging - for setup and config changes
   */
  config(component: string, message: string, config?: Record<string, unknown> | string | number | boolean | null): void {
    if (!this.shouldLog()) return;
    
    const entry = this.createLogEntry('info', message, config, component);
    this.addToHistory(entry);
    
    console.log(
      `%c⚙️ ${this.formatMessage(entry)}`,
      'color: #8b5cf6; font-weight: bold;',
      config ? config : ''
    );
  }

  /**
   * Get logging history for debugging
   */
  getHistory(): LogEntry[] {
    return [...this.logHistory];
  }

  /**
   * Clear logging history
   */
  clearHistory(): void {
    this.logHistory = [];
  }

  /**
   * Check if logger is in development mode
   */
  isDev(): boolean {
    return this.isDevelopment;
  }
}

// Create singleton instance
const logger = new Logger();

export { logger };
export default logger;

// Convenience exports for easier usage
export const log = logger;
export const devLog = {
  debug: (message: string, data?: Record<string, unknown> | string | number | boolean | null, component?: string) => logger.debug(message, data, component),
  info: (message: string, data?: Record<string, unknown> | string | number | boolean | null, component?: string) => logger.info(message, data, component),
  warn: (message: string, data?: Record<string, unknown> | string | number | boolean | null, component?: string) => logger.warn(message, data, component),
  error: (message: string, data?: Record<string, unknown> | string | number | boolean | null, component?: string) => logger.error(message, data, component),
  performance: (operation: string, duration: number, details?: Record<string, unknown> | string | number | boolean | null, component?: string) => 
    logger.performance(operation, duration, details, component),
  lifecycle: (component: string, event: string, details?: Record<string, unknown> | string | number | boolean | null) => 
    logger.lifecycle(component, event, details),
  config: (component: string, message: string, config?: Record<string, unknown> | string | number | boolean | null) => 
    logger.config(component, message, config)
};