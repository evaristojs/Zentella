import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { buttonHover } from '../../animations'
import { MenuItem } from './hooks/useNavigationState'

interface MobileMenuProps {
  isMenuOpen: boolean
  menuItems: MenuItem[]
  isDark: boolean
  isInHero: boolean
  toggleMenu: () => void
  closeMenu: () => void
  activeSection?: string
}

const MobileMenu = ({ 
  isMenuOpen, 
  menuItems, 
  isDark, 
  isInHero, 
  toggleMenu, 
  closeMenu,
  activeSection 
}: MobileMenuProps) => {
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${window.scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
    }
  }, [isMenuOpen])
  
  // Improved menu item click handling
  const handleMenuItemClick = (href: string) => {
    closeMenu() // Always close the menu first
    
    // Smooth scroll to section after menu closes
    if (href.startsWith('#')) {
      setTimeout(() => {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 200) // Reduced timeout for faster response
    }
  }
  
  const getCurrentSection = (href: string) => {
    return href.replace('#', '')
  }
  
  const isActive = (href: string) => {
    const section = getCurrentSection(href)
    return activeSection === section
  }
  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <motion.button 
        className={`md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-3 rounded-xl transition-all duration-300 focus:outline-none ${
          isMenuOpen 
            ? 'bg-white/10 text-white backdrop-blur-sm shadow-lg hover:bg-white/20 z-[70]'
            : isInHero && !isDark
            ? 'bg-bg-secondary-light/95 text-text-secondary-light hover:bg-bg-secondary-light hover:text-color-primary hover:scale-105'
            : 'bg-bg-secondary-light/90 dark:bg-bg-secondary-dark/90 text-text-secondary-light dark:text-text-secondary-dark hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark hover:text-color-primary dark:hover:text-color-primary hover:scale-105'
        }`}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation-menu"
        variants={buttonHover}
        initial="rest"
        whileHover="hover"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isMenuOpen ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Modern Centered Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            id="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed top-0 left-0 w-screen h-screen z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              background: isDark 
                ? 'radial-gradient(ellipse at center, rgba(15, 15, 15, 0.98) 0%, rgba(8, 8, 8, 0.99) 100%)'
                : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.98) 0%, rgba(248, 248, 248, 0.99) 100%)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              minHeight: '100vh',
              margin: 0,
              padding: 0
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeMenu()
              }
            }}
          >
            
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: isDark 
                  ? `radial-gradient(circle at 25% 25%, #8502bb 0%, transparent 50%),
                     radial-gradient(circle at 75% 75%, #6700f4 0%, transparent 50%)`
                  : `radial-gradient(circle at 25% 25%, #8502bb 0%, transparent 50%),
                     radial-gradient(circle at 75% 75%, #6700f4 0%, transparent 50%)`
              }}
            />

            {/* Main Content Container - Full Screen */}
            <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full px-6 py-8">
              
              {/* Animated Logo */}
              <motion.div 
                className="mb-6 sm:mb-8 flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.img 
                  src={isDark ? "/logo-modo-oscuro.svg" : "/logo-modo-claro.svg"}
                  alt="Zentella" 
                  className="h-12 sm:h-16 w-auto max-w-[180px] sm:max-w-[200px]"
                  whileHover={{ 
                    scale: 1.05,
                    filter: "drop-shadow(0 10px 30px rgba(133, 2, 187, 0.3))"
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Navigation Links */}
              <motion.nav 
                className="mb-6 sm:mb-8 w-full flex-1 flex items-center justify-center"
                role="navigation"
                aria-label="Mobile navigation menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <ul className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 w-full" role="menubar" aria-orientation="vertical">
                  {menuItems.map((item, index) => (
                    <motion.li 
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.3 + index * 0.1, 
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      <motion.a 
                        href={item.href} 
                        onClick={(e) => {
                          e.preventDefault()
                          handleMenuItemClick(item.href)
                        }}
                        role="menuitem"
                        aria-current={isActive(item.href) ? 'page' : undefined}
                        className={`relative block text-lg sm:text-xl md:text-2xl font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-2xl transition-all duration-300 focus:outline-none group text-center ${
                          isActive(item.href)
                            ? 'text-color-primary'
                            : 'text-text-primary-light dark:text-text-primary-dark hover:text-color-primary'
                        }`}
                        whileHover={{ 
                          scale: 1.05,
                          textShadow: isDark 
                            ? "0 0 30px rgba(133, 2, 187, 0.6)"
                            : "0 0 30px rgba(133, 2, 187, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Background hover effect */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-color-primary/10 to-color-secondary/10 opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Active indicator */}
                        {isActive(item.href) && (
                          <motion.div
                            className="absolute -bottom-1 left-1/2 w-12 h-1 bg-color-primary rounded-full"
                            layoutId="activeIndicator"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ x: '-50%' }}
                          />
                        )}
                        
                        <span className="relative z-10">{item.name}</span>
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>

              {/* CTA Button */}
              <motion.div 
                className="w-full max-w-md px-8 flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    handleMenuItemClick('#contact')
                  }}
                  className="group relative w-full inline-flex items-center justify-center min-h-[48px] sm:min-h-[56px] px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-color-primary via-color-secondary to-color-primary bg-size-200 text-white text-base sm:text-lg font-bold rounded-2xl transition-all duration-500 shadow-2xl focus:outline-none overflow-hidden"
                  whileHover={{ 
                    scale: 1.02, 
                    y: -2,
                    boxShadow: "0 20px 40px rgba(133, 2, 187, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                    backgroundPosition: "right center"
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundSize: '200% 100%'
                  }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    Comenzar
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </span>
                </motion.a>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default MobileMenu