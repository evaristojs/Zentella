import { act } from '@testing-library/react'

/**
 * Utility function to simulate scroll events
 */
export const simulateScroll = (scrollY: number) => {
  act(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: scrollY,
      writable: true,
    })
    
    // Dispatch scroll event
    window.dispatchEvent(new Event('scroll'))
  })
}

/**
 * Utility function to simulate resize events
 */
export const simulateResize = (width: number, height: number) => {
  act(() => {
    Object.defineProperty(window, 'innerWidth', {
      value: width,
      writable: true,
    })
    
    Object.defineProperty(window, 'innerHeight', {
      value: height,
      writable: true,
    })
    
    window.dispatchEvent(new Event('resize'))
  })
}

/**
 * Utility function to wait for next tick
 */
export const waitForNextTick = () => new Promise(resolve => setTimeout(resolve, 0))

/**
 * Mock DOM element with getBoundingClientRect
 */
export const createMockElement = (rect: Partial<DOMRect>): HTMLElement => {
  const element = document.createElement('div')
  element.getBoundingClientRect = jest.fn(() => ({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    top: 0,
    left: 0,
    bottom: 100,
    right: 100,
    ...rect,
  })) as jest.Mock
  
  return element
}

/**
 * Mock intersection observer entries
 */
export const createMockIntersectionObserverEntry = (
  target: Element,
  isIntersecting: boolean = true,
  intersectionRatio: number = isIntersecting ? 1 : 0
): IntersectionObserverEntry => ({
  target,
  isIntersecting,
  intersectionRatio,
  boundingClientRect: target.getBoundingClientRect(),
  rootBounds: null,
  intersectionRect: target.getBoundingClientRect(),
  time: Date.now(),
})

/**
 * Performance testing utility
 */
export const measurePerformance = async (fn: () => void | Promise<void>): Promise<number> => {
  const start = performance.now()
  await fn()
  return performance.now() - start
}

/**
 * Assert performance benchmark
 */
export const expectPerformance = (actualMs: number, expectedMs: number, tolerance: number = 0.1) => {
  const toleranceMs = expectedMs * tolerance
  expect(actualMs).toBeLessThanOrEqual(expectedMs + toleranceMs)
}