import { useState, useEffect, useCallback } from 'react'

interface UseScrollNavigationReturn {
  isSticky: boolean
  activeSection: string
  scrollProgress: number
  isScrollingUp: boolean
  sections: string[]
}

export const useScrollNavigation = (): UseScrollNavigationReturn => {
  const [isSticky, setIsSticky] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Define sections in order
  const sections = ['hero', 'about', 'services', 'portfolio', 'testimonials', 'contact']

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = Math.min(scrollTop / docHeight, 1)
    setScrollProgress(progress)
  }, [])

  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + 100 // Offset for better UX

    let currentActiveSection = sections[0]

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId)
      if (element) {
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY

        if (scrollPosition >= elementTop) {
          currentActiveSection = sectionId
        }
      }
    }

    setActiveSection(currentActiveSection)
  }, [sections])

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    // Determine if sticky (after hero section)
    const heroElement = document.getElementById('hero')
    const heroHeight = heroElement ? heroElement.offsetHeight : 0
    setIsSticky(currentScrollY > heroHeight * 0.8)

    // Determine scroll direction
    setIsScrollingUp(currentScrollY < lastScrollY)
    setLastScrollY(currentScrollY)

    // Update active section and progress
    updateActiveSection()
    updateScrollProgress()
  }, [lastScrollY, updateActiveSection, updateScrollProgress])

  useEffect(() => {
    // Throttled scroll handler for performance
    let ticking = false

    const throttledHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandler, { passive: true })

    // Initial calls
    handleScroll()

    return () => {
      window.removeEventListener('scroll', throttledHandler)
    }
  }, [handleScroll])

  return {
    isSticky,
    activeSection,
    scrollProgress,
    isScrollingUp,
    sections
  }
}

export default useScrollNavigation