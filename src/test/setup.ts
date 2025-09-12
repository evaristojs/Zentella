import '@testing-library/jest-dom'
import { vi, beforeAll, afterAll } from 'vitest'

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  root = null
  rootMargin = '0px'
  thresholds = [0]
  
  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
  disconnect() {}
  observe(_element: Element) {}
  unobserve(_element: Element) {}
  takeRecords(): IntersectionObserverEntry[] { return [] }
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock performance.now()
if (!global.performance) {
  global.performance = {} as Performance
}

if (!global.performance.now) {
  global.performance.now = vi.fn(() => Date.now())
}

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(callback, 16)
}

global.cancelAnimationFrame = (id: number): void => {
  clearTimeout(id)
}

// Mock scrollTo
global.scrollTo = vi.fn()

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock window.HTMLElement.prototype.scrollIntoView
Element.prototype.scrollIntoView = vi.fn()

// Setup fetch mock
global.fetch = vi.fn()

// Silence console errors in tests
const originalError = console.error
beforeAll(() => {
  console.error = vi.fn()
})

afterAll(() => {
  console.error = originalError
})