import { useState, useEffect, useCallback, useRef } from 'react'

interface SectionInfo {
  id: string
  element: HTMLElement
  top: number
  bottom: number
  height: number
  isVisible: boolean
  visiblePercentage: number
}

interface SectionScrollOptions {
  threshold?: number
  rootMargin?: string
  smoothScrollDuration?: number
}

export const useSectionScroll = (options: SectionScrollOptions = {}) => {
  const {
    threshold = 0.3, // 30% visible to be considered active
    rootMargin = '-10% 0px -10% 0px', // Margin for intersection observer
    smoothScrollDuration = 800
  } = options

  const [currentSection, setCurrentSection] = useState<string>('hero')
  const [sections, setSections] = useState<SectionInfo[]>([])
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const observerRef = useRef<IntersectionObserver>()

  // Section IDs to track
  const sectionIds = ['hero', 'services', 'portfolio', 'about', 'testimonials', 'contact']

  // Initialize intersection observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin,
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
    }

    observerRef.current = new IntersectionObserver((entries) => {
      const updatedSections: SectionInfo[] = []

      entries.forEach((entry) => {
        const element = entry.target as HTMLElement
        const rect = element.getBoundingClientRect()
        
        const sectionInfo: SectionInfo = {
          id: element.id,
          element,
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height,
          isVisible: entry.isIntersecting,
          visiblePercentage: entry.intersectionRatio
        }

        updatedSections.push(sectionInfo)
      })

      if (updatedSections.length > 0) {
        setSections(prev => {
          const newSections = [...prev]
          updatedSections.forEach(updated => {
            const index = newSections.findIndex(s => s.id === updated.id)
            if (index !== -1) {
              newSections[index] = updated
            } else {
              newSections.push(updated)
            }
          })
          return newSections
        })

        // Determine current section based on visibility and position
        const mostVisible = updatedSections.reduce((prev, current) => {
          // Prioritize sections that are more visible
          if (current.visiblePercentage > prev.visiblePercentage) {
            return current
          }
          // If same visibility, prioritize the one closer to center
          if (current.visiblePercentage === prev.visiblePercentage) {
            const currentCenter = Math.abs(current.top + current.height / 2 - window.innerHeight / 2)
            const prevCenter = Math.abs(prev.top + prev.height / 2 - window.innerHeight / 2)
            return currentCenter < prevCenter ? current : prev
          }
          return prev
        })

        if (mostVisible.visiblePercentage >= threshold) {
          setCurrentSection(mostVisible.id)
        }
      }
    }, observerOptions)

    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id)
      if (element && observerRef.current) {
        observerRef.current.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, rootMargin])

  // Handle scroll events for scroll state detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    const startPosition = window.pageYOffset
    const targetPosition = element.offsetTop - 80 // Account for navbar height
    const distance = targetPosition - startPosition
    const duration = smoothScrollDuration

    let start: number | null = null

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      
      // Easing function (ease-in-out)
      const ease = progress < 0.5 
        ? 2 * progress * progress 
        : -1 + (4 - 2 * progress) * progress

      window.scrollTo(0, startPosition + (distance * ease))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [smoothScrollDuration])

  // Get section progress (how much of the section is visible)
  const getSectionProgress = useCallback((sectionId: string): number => {
    const section = sections.find(s => s.id === sectionId)
    if (!section) return 0

    const { top, bottom, height } = section
    const windowHeight = window.innerHeight

    // If section is completely above viewport
    if (bottom < 0) return 0
    
    // If section is completely below viewport
    if (top > windowHeight) return 0

    // Calculate visible portion
    const visibleTop = Math.max(0, -top)
    const visibleBottom = Math.min(height, windowHeight - top)
    const visibleHeight = visibleBottom - visibleTop

    return Math.max(0, Math.min(1, visibleHeight / height))
  }, [sections])

  // Check if section is in viewport
  const isSectionInViewport = useCallback((sectionId: string): boolean => {
    const section = sections.find(s => s.id === sectionId)
    return section ? section.isVisible : false
  }, [sections])

  return {
    currentSection,
    sections,
    isScrolling,
    scrollToSection,
    getSectionProgress,
    isSectionInViewport
  }
}