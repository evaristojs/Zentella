export interface MenuItem {
  name: string
  href: string
}

export interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

import { useState, useCallback } from 'react'
import { useThrottledScroll } from '../../../hooks/useThrottledScroll'

export const useNavigationState = (isMenuOpen: boolean, setIsMenuOpen: (isOpen: boolean) => void) => {
  const [activeSection, setActiveSection] = useState('hero')
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const setActiveSectionManually = (section: string) => {
    setActiveSection(section)
  }
  
  // Track active section based on scroll position with optimized performance
  const handleActiveSection = useCallback(() => {
    const sections = ['contact', 'portfolio', 'services', 'about', 'hero'] // Reverse order for efficiency
    const scrollPosition = window.scrollY + 100 // Offset for navbar height
    
    console.log('Current scroll position:', scrollPosition) // Debug log
    
    for (const section of sections) {
      const element = document.getElementById(section)
      if (element && scrollPosition >= element.offsetTop) {
        console.log('Setting active section to:', section) // Debug log
        setActiveSection(section)
        break
      }
    }
  }, [])
  
  // Use optimized throttled scroll hook
  useThrottledScroll(handleActiveSection, [])

  const menuItems: MenuItem[] = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Portafolio', href: '#portfolio' },
    { name: 'Contacto', href: '#contact' }
  ]

  return {
    toggleMenu,
    closeMenu,
    menuItems,
    activeSection,
    setActiveSectionManually
  }
}