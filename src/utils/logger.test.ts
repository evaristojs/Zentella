/**
 * Test file to verify logger functionality
 * This demonstrates that logging is properly controlled by environment
 */

import { logger, devLog } from './logger'

// Mock console methods for testing
const originalConsole = {
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error,
  log: console.log
}

beforeEach(() => {
  // Mock console methods
  console.debug = jest.fn()
  console.info = jest.fn()
  console.warn = jest.fn()
  console.error = jest.fn()
  console.log = jest.fn()
})

afterEach(() => {
  // Restore original console methods
  Object.assign(console, originalConsole)
})

describe('Logger', () => {
  test('should only log in development mode', () => {
    // In test environment, logger should recognize it's in development
    expect(logger.isDev()).toBe(true)
    
    // Test debug logging
    devLog.debug('Test debug message')
    expect(console.debug).toHaveBeenCalledWith(
      expect.stringContaining('Test debug message'),
      ''
    )
    
    // Test info logging
    devLog.info('Test info message', { data: 'test' })
    expect(console.info).toHaveBeenCalledWith(
      expect.stringContaining('Test info message'),
      { data: 'test' }
    )
    
    // Test warning
    devLog.warn('Test warning')
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('Test warning'),
      ''
    )
    
    // Test error (should always log, even in production)
    devLog.error('Test error')
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Test error'),
      ''
    )
  })
  
  test('should format performance logs correctly', () => {
    devLog.performance('test operation', 150.5, { details: 'test' }, 'TestComponent')
    
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('⚡'),
      expect.stringContaining('[TestComponent]'),
      expect.stringContaining('Performance: test operation took 150.5ms'),
      { details: 'test' }
    )
  })
  
  test('should format lifecycle logs correctly', () => {
    devLog.lifecycle('TestComponent', 'Component mounted', { prop: 'value' })
    
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('🔄'),
      expect.stringContaining('[TestComponent]'),
      expect.stringContaining('Component mounted'),
      { prop: 'value' }
    )
  })
  
  test('should format config logs correctly', () => {
    devLog.config('TestComponent', 'Config updated', { setting: 'new value' })
    
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('⚙️'),
      expect.stringContaining('[TestComponent]'),
      expect.stringContaining('Config updated'),
      { setting: 'new value' }
    )
  })
  
  test('should maintain logging history', () => {
    logger.clearHistory()
    
    devLog.info('First message')
    devLog.warn('Second message')
    devLog.debug('Third message')
    
    const history = logger.getHistory()
    expect(history).toHaveLength(3)
    expect(history[0].message).toBe('First message')
    expect(history[1].message).toBe('Second message')
    expect(history[2].message).toBe('Third message')
  })
  
  test('should limit history size', () => {
    logger.clearHistory()
    
    // Add more than max history size (100)
    for (let i = 0; i < 150; i++) {
      devLog.info(`Message ${i}`)
    }
    
    const history = logger.getHistory()
    expect(history.length).toBeLessThanOrEqual(100)
    
    // Should keep the most recent messages
    expect(history[history.length - 1].message).toBe('Message 149')
  })
})