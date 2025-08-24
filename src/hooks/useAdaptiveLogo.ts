import { useState, useEffect, useRef, useCallback } from 'react'
import { debounce } from '../utils/debounce'

export type LogoVariant = 'regular' | 'positive' | 'negative'
export type LogoType = 'logotipo' | 'isotipo'

interface LogoState {
  variant: LogoVariant
  type: LogoType
  isScrolled: boolean
}

interface SectionBackground {
  sectionId: string
  lightBg: boolean
  darkBg: boolean
}

// Configuration for each section's background characteristics
const SECTION_BACKGROUNDS: SectionBackground[] = [
  { sectionId: 'hero', lightBg: true, darkBg: false }, // White bg in light mode, black in dark mode
  { sectionId: 'about', lightBg: true, darkBg: true }, // Light bg in light mode, dark bg in dark mode
  { sectionId: 'services', lightBg: true, darkBg: true },
  { sectionId: 'portfolio', lightBg: true, darkBg: true },
  { sectionId: 'testimonials', lightBg: true, darkBg: true },
  { sectionId: 'faq', lightBg: true, darkBg: true },
  { sectionId: 'contact', lightBg: true, darkBg: true },
]

export const useAdaptiveLogo = (isDark: boolean) => {
  const [logoState, setLogoState] = useState<LogoState>({
    variant: 'regular',
    type: 'logotipo',
    isScrolled: false
  })

  
  const [currentSection, setCurrentSection] = useState<string>('hero')
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sectionsRef = useRef<NodeListOf<Element> | null>(null)

  // Debounced scroll handler
  const handleScroll = useCallback(
    debounce(() => {
      const scrollY = window.scrollY
      const scrollThreshold = 50 // When to switch to isotipo
      
      const isScrolled = scrollY > scrollThreshold
      // Switch to isotipo when scrolled (on all screen sizes)
      const logoType = isScrolled ? 'isotipo' : 'logotipo'
      
      setLogoState(prev => {
        // Only update if there's actually a change to avoid unnecessary re-renders
        if (prev.isScrolled !== isScrolled || prev.type !== logoType) {
          console.log('🔄 Logo change:', { 
            isScrolled, 
            logoType,
            theme: isDark ? 'dark' : 'light',
            scrollY 
          })
          return {
            ...prev,
            isScrolled,
            type: logoType
          }
        }
        return prev
      })
    }, 30), // Smooth debounce
    []
  )

  // Function to determine logo variant based on section and theme
  const getLogoVariant = useCallback((sectionId: string, isDark: boolean): LogoVariant => {
    const sectionConfig = SECTION_BACKGROUNDS.find(s => s.sectionId === sectionId)
    
    if (!sectionConfig) return 'regular'
    
    // Hero section special logic
    if (sectionId === 'hero') {
      return isDark ? 'positive' : 'negative'
    }
    
    // For other sections, use regular variant as default
    // You can extend this logic based on specific section requirements
    if (isDark) {
      return sectionConfig.darkBg ? 'regular' : 'positive'
    } else {
      return sectionConfig.lightBg ? 'regular' : 'negative'
    }
  }, [])

  // Update logo variant when section or theme changes
  useEffect(() => {
    const newVariant = getLogoVariant(currentSection, isDark)
    setLogoState(prev => ({
      ...prev,
      variant: newVariant
    }))
  }, [currentSection, isDark, getLogoVariant])

  // Set up intersection observer for section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section is 30% from top
      threshold: 0.1
    }

    observerRef.current = new IntersectionObserver((entries) => {
      let topSection = ''
      let maxRatio = 0

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio
          topSection = entry.target.id
        }
      })

      if (topSection && topSection !== currentSection) {
        console.log('Section changed:', topSection)
        setCurrentSection(topSection)
      }
    }, observerOptions)

    // Observe all sections - wait for DOM to be ready
    const setupObserver = () => {
      sectionsRef.current = document.querySelectorAll('section[id]')
      if (sectionsRef.current.length === 0) {
        // Retry after a short delay if sections aren't found yet
        setTimeout(setupObserver, 100)
        return
      }
      
      sectionsRef.current.forEach((section) => {
        if (observerRef.current) {
          observerRef.current.observe(section)
        }
      })
    }

    setupObserver()

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [currentSection])

  // Handle window resize to update mobile state
  const handleResize = useCallback(
    debounce(() => {
      // Trigger handleScroll to recalculate logo type based on new screen size
      handleScroll()
    }, 100),
    [handleScroll]
  )

  // Set up scroll and resize listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    
    // Initial call
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      handleScroll.cancel?.()
      handleResize.cancel?.()
    }
  }, [handleScroll, handleResize])

  // Get logo source based on current state and theme - siguiendo instrucciones exactas
  const getLogoSrc = useCallback(() => {
    const { isScrolled } = logoState
    
    if (isScrolled) {
      // Cuando el usuario haga scroll hacia abajo, el logo debe cambiar al isotipo
      return isDark 
        ? '/isotipo-negativozentella2025.svg' // modo oscuro: isotipo-negativozentella2025.svg
        : '/isotipo-positivozentella2025.svg'  // modo claro: isotipo-positivozentella2025.svg
    } else {
      // En la parte superior de la página (sin scroll) el logo debe ser el archivo completo
      return isDark 
        ? '/positivozentella2025.svg'         // modo oscuro: positivozentella2025.svg
        : '/negativozentella2025.svg'         // modo claro: negativozentella2025.svg
    }
  }, [logoState, isDark])

  return {
    logoSrc: getLogoSrc(),
    logoState,
    currentSection
  }
}