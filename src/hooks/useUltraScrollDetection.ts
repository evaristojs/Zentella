import { useState, useEffect, useCallback, useRef } from 'react'

interface ScrollState {
  scrollY: number
  isScrolled: boolean
  direction: 'up' | 'down' | 'idle'
  velocity: number
  isInHero: boolean
  currentSection: string
}

interface ScrollOptions {
  threshold?: number
  heroOffset?: number
  throttleMs?: number
  enableVelocity?: boolean
  enableSections?: boolean
}

type ScrollCallback = (state: ScrollState) => void

// Global state management for ultra-efficient scroll detection
class UltraScrollManager {
  private static instance: UltraScrollManager
  private listeners = new Set<ScrollCallback>()
  private rafId: number | null = null
  private lastScrollY = 0
  private lastTime = 0
  private velocity = 0
  private direction: 'up' | 'down' | 'idle' = 'idle'
  private scrollContainer: Element | null = null
  private isActive = false

  // Cached elements for section detection
  private heroElement: HTMLElement | null = null
  private sections = new Map<string, HTMLElement>()
  private sectionIds = ['hero', 'about', 'services', 'portfolio', 'testimonials', 'faq', 'contact']

  private constructor() {
    this.detectScrollContainer()
    this.cacheElements()
  }

  static getInstance(): UltraScrollManager {
    if (!UltraScrollManager.instance) {
      UltraScrollManager.instance = new UltraScrollManager()
    }
    return UltraScrollManager.instance
  }

  private detectScrollContainer(): void {
    // Check if body has overflow-y: auto (our case)
    const bodyStyles = window.getComputedStyle(document.body)
    const htmlStyles = window.getComputedStyle(document.documentElement)
    
    if (bodyStyles.overflowY === 'auto' || bodyStyles.overflow === 'auto') {
      this.scrollContainer = document.body
    } else if (htmlStyles.overflowY === 'auto' || htmlStyles.overflow === 'auto') {
      this.scrollContainer = document.documentElement
    } else {
      // Fallback to window
      this.scrollContainer = null
    }
  }

  private getScrollY(): number {
    // Always use the most reliable method for scroll position
    // window.scrollY works consistently across all scroll containers
    return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  }

  private cacheElements(): void {
    // Cache hero element
    if (!this.heroElement) {
      this.heroElement = document.getElementById('hero')
    }

    // Cache section elements
    this.sectionIds.forEach(id => {
      if (!this.sections.has(id)) {
        const element = document.getElementById(id)
        if (element) {
          this.sections.set(id, element)
        }
      }
    })
  }

  private getCurrentSection(scrollY: number, heroOffset: number): { currentSection: string; isInHero: boolean } {
    if (!this.heroElement) {
      return { currentSection: 'hero', isInHero: true }
    }

    const heroBottom = this.heroElement.offsetTop + this.heroElement.offsetHeight
    const scrollPosition = scrollY + heroOffset
    
    if (scrollPosition < heroBottom) {
      return { currentSection: 'hero', isInHero: true }
    }

    // Find current section
    for (const sectionId of this.sectionIds.slice(1)) { // Skip hero
      const element = this.sections.get(sectionId)
      if (element) {
        const sectionTop = element.offsetTop
        const sectionBottom = sectionTop + element.offsetHeight
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          return { currentSection: sectionId, isInHero: false }
        }
      }
    }

    return { currentSection: 'contact', isInHero: false } // Default to last section
  }

  private handleScroll = (): void => {
    const now = performance.now()
    const currentScrollY = this.getScrollY()
    
    // Calculate velocity and direction
    const deltaY = currentScrollY - this.lastScrollY
    const deltaTime = now - this.lastTime
    
    if (deltaTime > 0) {
      this.velocity = Math.abs(deltaY / deltaTime)
      
      if (Math.abs(deltaY) > 1) { // Minimum threshold to avoid micro-movements
        this.direction = deltaY > 0 ? 'down' : 'up'
      } else if (this.velocity < 0.1) {
        this.direction = 'idle'
      }
    }

    // Cache elements if needed
    this.cacheElements()

    // Notify all listeners
    this.listeners.forEach(callback => {
      const sectionInfo = this.getCurrentSection(currentScrollY, 80)
      
      const state: ScrollState = {
        scrollY: currentScrollY,
        isScrolled: currentScrollY > 20,
        direction: this.direction,
        velocity: this.velocity,
        isInHero: sectionInfo.isInHero,
        currentSection: sectionInfo.currentSection
      }
      
      callback(state)
    })

    this.lastScrollY = currentScrollY
    this.lastTime = now
  }

  private scheduleUpdate = (): void => {
    if (this.rafId) return
    
    this.rafId = requestAnimationFrame(() => {
      this.handleScroll()
      this.rafId = null
    })
  }

  addListener(callback: ScrollCallback): void {
    this.listeners.add(callback)
    
    // Start listening if this is the first listener
    if (this.listeners.size === 1 && !this.isActive) {
      this.startListening()
    }
    
    // Immediately call with current state
    const currentScrollY = this.getScrollY()
    const sectionInfo = this.getCurrentSection(currentScrollY, 80)
    
    callback({
      scrollY: currentScrollY,
      isScrolled: currentScrollY > 20,
      direction: this.direction,
      velocity: this.velocity,
      isInHero: sectionInfo.isInHero,
      currentSection: sectionInfo.currentSection
    })
  }

  removeListener(callback: ScrollCallback): void {
    this.listeners.delete(callback)
    
    // Stop listening if no more listeners
    if (this.listeners.size === 0 && this.isActive) {
      this.stopListening()
    }
  }

  private startListening(): void {
    if (this.isActive) return
    
    this.isActive = true
    const target = this.scrollContainer || window
    
    target.addEventListener('scroll', this.scheduleUpdate, { 
      passive: true,
      capture: false
    })
    
    // Initial call
    this.handleScroll()
  }

  private stopListening(): void {
    if (!this.isActive) return
    
    this.isActive = false
    const target = this.scrollContainer || window
    
    target.removeEventListener('scroll', this.scheduleUpdate)
    
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    
    // Clean up cached elements to prevent memory leaks
    this.heroElement = null
    this.sections.clear()
  }

  // Public methods for debugging/monitoring
  getMetrics() {
    return {
      listenerCount: this.listeners.size,
      isActive: this.isActive,
      scrollContainer: this.scrollContainer?.tagName || 'window',
      cachedSections: this.sections.size,
      lastScrollY: this.lastScrollY,
      velocity: this.velocity,
      direction: this.direction
    }
  }

  forceUpdate(): void {
    this.handleScroll()
  }
  
  // Clean reset of singleton (useful for testing or SPA navigation)
  static resetInstance(): void {
    if (UltraScrollManager.instance) {
      UltraScrollManager.instance.stopListening()
      UltraScrollManager.instance.listeners.clear()
      UltraScrollManager.instance = null as any
    }
  }
}

/**
 * Ultra-efficient scroll detection hook
 * 
 * Features:
 * - Single global scroll listener for entire app
 * - Automatic scroll container detection (window/body/html)
 * - RAF-based throttling
 * - Velocity and direction calculation
 * - Section detection with caching
 * - Zero re-renders when values don't change
 */
export const useUltraScrollDetection = (options: ScrollOptions = {}) => {
  const {
    threshold = 20,
    heroOffset = 80,
    enableVelocity = false,
    enableSections = false
  } = options

  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    isScrolled: false,
    direction: 'idle',
    velocity: 0,
    isInHero: true,
    currentSection: 'hero'
  })

  const stateRef = useRef(state)

  const handleScrollUpdate = useCallback((newState: ScrollState) => {
    // Only update if values actually changed to prevent unnecessary re-renders
    const prevState = stateRef.current
    
    const hasChanges = 
      prevState.scrollY !== newState.scrollY ||
      prevState.isScrolled !== newState.isScrolled ||
      prevState.direction !== newState.direction ||
      (enableVelocity && Math.abs(prevState.velocity - newState.velocity) > 0.01) ||
      (enableSections && (
        prevState.isInHero !== newState.isInHero ||
        prevState.currentSection !== newState.currentSection
      ))

    if (hasChanges) {
      const filteredState = {
        scrollY: newState.scrollY,
        isScrolled: newState.scrollY > threshold,
        direction: newState.direction,
        velocity: enableVelocity ? newState.velocity : 0,
        isInHero: enableSections ? newState.isInHero : true,
        currentSection: enableSections ? newState.currentSection : 'hero'
      }
      
      stateRef.current = filteredState
      setState(filteredState)
    }
  }, [threshold, enableVelocity, enableSections])

  useEffect(() => {
    const manager = UltraScrollManager.getInstance()
    
    manager.addListener(handleScrollUpdate)
    
    return () => {
      manager.removeListener(handleScrollUpdate)
    }
  }, [handleScrollUpdate])

  return {
    ...state,
    // Utility methods
    getMetrics: useCallback(() => UltraScrollManager.getInstance().getMetrics(), []),
    forceUpdate: useCallback(() => UltraScrollManager.getInstance().forceUpdate(), [])
  }
}

// Convenience hooks for common use cases

/**
 * Simple scroll detection - just isScrolled state
 */
export const useSimpleScroll = (threshold = 20) => {
  const { isScrolled } = useUltraScrollDetection({ threshold })
  return { isScrolled }
}

/**
 * Navbar scroll detection - isScrolled + direction for hide/show
 */
export const useNavbarScroll = (threshold = 20) => {
  const { isScrolled, direction, scrollY } = useUltraScrollDetection({ 
    threshold,
    enableVelocity: false 
  })
  return { isScrolled, direction, scrollY }
}

/**
 * Logo scroll detection - for adaptive logo switching
 */
export const useLogoScroll = (threshold = 0) => {
  const { isScrolled, isInHero, currentSection } = useUltraScrollDetection({ 
    threshold,
    enableSections: true 
  })
  return { isScrolled, isInHero, currentSection }
}

/**
 * Full featured scroll detection - everything enabled
 */
export const useFullScroll = (options: ScrollOptions = {}) => {
  return useUltraScrollDetection({
    ...options,
    enableVelocity: true,
    enableSections: true
  })
}