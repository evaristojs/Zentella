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
    console.log('🔧 Initializing useSectionScroll observer with sections:', sectionIds)

    const observerOptions = {
      root: null,
      rootMargin,
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
    }

    observerRef.current = new IntersectionObserver((entries) => {
      console.log('📊 Observer triggered with entries:', entries.length)

      setSections(prev => {
        const newSections = [...prev]

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

          console.log(`📍 Section ${element.id}: visible=${entry.isIntersecting}, ratio=${Math.round(entry.intersectionRatio * 100)}%`)

          const index = newSections.findIndex(s => s.id === element.id)
          if (index !== -1) {
            newSections[index] = sectionInfo
          } else {
            newSections.push(sectionInfo)
          }
        })

        // Determine current section from all sections
        const visibleSections = newSections.filter(s => s.isVisible && s.visiblePercentage > 0)
        console.log('👁️ Visible sections:', visibleSections.map(s => `${s.id}(${Math.round(s.visiblePercentage * 100)}%)`))

        if (visibleSections.length > 0) {
          const mostVisible = visibleSections.reduce((prev, current) => {
            return current.visiblePercentage > prev.visiblePercentage ? current : prev
          })

          console.log('🎯 Most visible section:', mostVisible.id, `(${Math.round(mostVisible.visiblePercentage * 100)}% visible)`)
          setCurrentSection(mostVisible.id)
        }

        return newSections
      })
    }, observerOptions)

    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id)
      if (element && observerRef.current) {
        console.log(`✅ Observing section: ${id}`)
        observerRef.current.observe(element)
      } else {
        console.warn(`❌ Could not find element with id: ${id}`)
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