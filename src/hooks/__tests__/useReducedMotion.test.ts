/**
 * @vitest-environment jsdom
 */
import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useReducedMotion } from '../useReducedMotion'

describe('useReducedMotion', () => {
  let matchMediaMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    // Mock matchMedia
    matchMediaMock = vi.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: matchMediaMock
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return false when prefers-reduced-motion is not set', () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))

    const { result } = renderHook(() => useReducedMotion())

    expect(result.current).toBe(false)
  })

  it('should return true when prefers-reduced-motion is set to reduce', () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))

    const { result } = renderHook(() => useReducedMotion())

    expect(result.current).toBe(true)
  })

  it('should update when media query changes', async () => {
    let eventListener: ((event: MediaQueryListEvent) => void) | null = null

    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn((event, callback) => {
        if (event === 'change') {
          eventListener = callback
        }
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))

    const { result } = renderHook(() => useReducedMotion())

    expect(result.current).toBe(false)

    // Simulate media query change
    if (eventListener) {
      eventListener({ matches: true } as MediaQueryListEvent)
    }

    // Wait for state update
    await waitFor(() => {
      expect(result.current).toBe(true)
    })
  })

  it('should clean up event listener on unmount', () => {
    const removeEventListenerMock = vi.fn()

    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerMock,
      dispatchEvent: vi.fn()
    }))

    const { unmount } = renderHook(() => useReducedMotion())

    unmount()

    expect(removeEventListenerMock).toHaveBeenCalled()
  })
})
