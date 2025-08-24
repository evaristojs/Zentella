import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { navSlideIn, transitions } from '../../animations'
import { useNavigationState, NavigationProps } from './hooks/useNavigationState'
import NavigationBar from './NavigationBar'
import ThemeToggle from './ThemeToggle'
import MobileMenu from './MobileMenu'


const Navigation = ({ isMenuOpen, setIsMenuOpen }: NavigationProps) => {
  const { toggleTheme, isDark } = useTheme()
  const { toggleMenu, closeMenu, menuItems, activeSection, setActiveSectionManually } = useNavigationState(isMenuOpen, setIsMenuOpen)
  
  // Simple scroll detection
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = (event) => {
      console.log("Page scrolled!", window.scrollY)
      const scrollPosition = window.scrollY || document.documentElement.scrollTop
      if (scrollPosition > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Define hasScrolled for compatibility with existing components
  const hasScrolled = scrolled
  
  // TEMPORARY: Isotope changes based on scroll state
  const selectedLogo = scrolled ? "/isotipo-modo-oscuro.svg" : "/isotipo-modo-claro.svg"
  
  // Debug logging (remove in production)
  console.log('🔄 Logo Debug:', { 
    scrolled,
    selectedLogo
  })

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 w-[calc(100%-17px)] z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-bg-base-dark/90 backdrop-blur-xl shadow-lg'
            : 'bg-white/20 dark:bg-bg-base-dark/20 backdrop-blur-sm'
        }`}
        variants={navSlideIn}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={transitions.fast}
            >
              <motion.img 
                key={selectedLogo} // Force re-render on logo change
                src={selectedLogo}
                alt="Zentella" 
                className="h-6 sm:h-8 lg:h-10 w-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={transitions.fast}
                style={{ 
                  border: scrolled ? '2px solid red' : '2px solid blue' 
                }}
              />
            </motion.div>
            
            {/* Desktop Navigation */}
            <NavigationBar 
              menuItems={menuItems}
              isInHero={!hasScrolled}
              isDark={isDark}
              activeSection={activeSection}
              setActiveSectionManually={setActiveSectionManually}
            />

            {/* Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <ThemeToggle 
                isDark={isDark}
                isInHero={!hasScrolled}
                toggleTheme={toggleTheme}
              />

              <MobileMenu 
                isMenuOpen={isMenuOpen}
                menuItems={menuItems}
                isDark={isDark}
                isInHero={!hasScrolled}
                toggleMenu={toggleMenu}
                closeMenu={closeMenu}
              />
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  )
}

export default Navigation