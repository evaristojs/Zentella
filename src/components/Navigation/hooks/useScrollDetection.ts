import { useState, useCallback } from 'react'
import { useThrottledScroll, useOptimizedScrollDetection } from '../../../hooks/useThrottledScroll'

// Mapeo de secciones en orden
const SECTION_IDS = ['hero', 'about', 'services', 'portfolio', 'testimonials', 'faq', 'contact']

export const useScrollDetection = (isDark: boolean) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isInHero, setIsInHero] = useState(true)
  const [currentSection, setCurrentSection] = useState('hero')
  const { getCachedSections } = useOptimizedScrollDetection()

  const handleScroll = useCallback(() => {
    const sections = getCachedSections()
    const scrollY = window.scrollY
    const scrollPosition = scrollY + 100 // Offset for navbar height
    
    // Determinar sección actual
    let newCurrentSection = 'hero'
    let newIsInHero = true
    
    for (let i = 0; i < SECTION_IDS.length; i++) {
      const sectionId = SECTION_IDS[i]
      const section = sections[sectionId]
      
      if (section) {
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          newCurrentSection = sectionId
          newIsInHero = sectionId === 'hero'
          break
        }
      }
    }
    
    console.log('🔄 Scroll Detection:', { 
      scrollY,
      scrollPosition,
      currentSection: newCurrentSection,
      isInHero: newIsInHero,
      sectionsFound: Object.keys(sections).length
    })
    
    setIsScrolled(scrollY > 20)
    setIsInHero(newIsInHero)
    setCurrentSection(newCurrentSection)
  }, [getCachedSections])
  
  // Use the optimized throttled scroll hook
  useThrottledScroll(handleScroll, [isDark])

  return { isScrolled, isInHero, currentSection }
}