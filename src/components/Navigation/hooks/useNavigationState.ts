import { useState, useCallback, useEffect } from 'react'
import { useFullScroll } from '../../../hooks/useUltraScrollDetection'

export interface MenuItem {
  name: string
  href: string
}

export interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

export const useNavigationState = (isMenuOpen: boolean, setIsMenuOpen: (isOpen: boolean) => void) => {
  const [activeSection, setActiveSection] = useState('hero')
  
  // Ultra-efficient scroll detection with section tracking
  const { currentSection } = useFullScroll({ enableSections: true })
  
  // Update active section from scroll detection
  useEffect(() => {
    if (currentSection && currentSection !== activeSection) {
      console.log('Setting active section to:', currentSection)
      setActiveSection(currentSection)
    }
  }, [currentSection, activeSection])
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const setActiveSectionManually = (section: string) => {
    setActiveSection(section)
  }

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