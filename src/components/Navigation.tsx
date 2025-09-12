import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

const Navigation = ({ isMenuOpen, setIsMenuOpen }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isInHero, setIsInHero] = useState(true)
  const { toggleTheme, isDark } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)
      // Better hero detection: check if hero section exists and use its height
      const heroSection = document.getElementById('hero')
      const heroHeight = heroSection?.offsetHeight || 600 // fallback to 600px
      const newIsInHero = scrollY < heroHeight * 0.7 // 70% of hero height
      
      // Debug log to check logo switching
      if (process.env.NODE_ENV === 'development') {
        console.log('🔄 Logo state:', { 
          scrollY, 
          heroHeight, 
          threshold: heroHeight * 0.7,
          isInHero: newIsInHero,
          isDark,
          logoSrc: newIsInHero 
            ? (isDark ? "/logo-modo-oscuro.svg" : "/logo-modo-claro.svg")
            : (isDark ? "/isotipo-modo-oscuro.svg" : "/isotipo-modo-claro.svg")
        })
      }
      
      setIsInHero(newIsInHero)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDark])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const menuItems = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Servicios', href: '#services' },
    { name: 'Portafolio', href: '#portfolio' },
    { name: 'Nosotros', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contacto', href: '#contact' }
  ]

  // Simplified navbar styling logic
  const getNavbarClasses = () => {
    const baseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    
    if (isScrolled) {
      return `${baseClasses} bg-white/90 dark:bg-bg-base-dark/90 backdrop-blur-xl shadow-lg shadow-black/10 dark:shadow-black/30`
    }
    
    return `${baseClasses} bg-white/20 dark:bg-bg-base-dark/20 backdrop-blur-sm`
  }

  return (
    <>
      <motion.nav className={getNavbarClasses()}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src={
                  isInHero 
                    ? (isDark ? "/logo-modo-oscuro.svg" : "/logo-modo-claro.svg")
                    : (isDark ? "/isotipo-modo-oscuro.svg" : "/isotipo-modo-claro.svg")
                }
                alt="Zentella" 
                className={`w-auto transition-all duration-300 ${
                  isInHero 
                    ? "h-6 sm:h-8 lg:h-10" 
                    : "h-5 sm:h-6 lg:h-8"
                }`}
              />
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {menuItems.map((item, index) => (
                <motion.a 
                  key={item.name}
                  href={item.href}
                  className="relative px-2 lg:px-4 py-2 text-xs lg:text-base font-medium transition-colors duration-200 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-bg-secondary-light/50 dark:hover:bg-bg-secondary-dark/50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <motion.button 
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 lg:p-3 rounded-xl transition-all duration-200 bg-bg-secondary-light/80 dark:bg-bg-secondary-dark/80 text-text-secondary-light dark:text-text-secondary-dark hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
                aria-label="Cambiar tema"
                whileHover={{ scale: 1.05, rotate: 15 }}
                whileTap={{ scale: 0.95, rotate: -15 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                    transition={{ duration: 0.25 }}
                  >
                    {isDark ? (
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              <motion.button 
                className="md:hidden p-2 sm:p-2.5 rounded-xl transition-all duration-200 relative z-[60] bg-bg-secondary-light/80 dark:bg-bg-secondary-dark/80 text-text-secondary-light dark:text-text-secondary-dark hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
                onClick={toggleMenu}
                aria-label="Abrir menú"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? 'close' : 'open'}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMenuOpen ? (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[40] md:hidden" // Reduced z-index to be below nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div 
              className="absolute top-0 right-0 w-full max-w-[340px] h-full bg-white/95 dark:bg-bg-base-dark/95 backdrop-blur-xl shadow-2xl z-[50]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            >
              <div className="h-full flex flex-col">
                
                <div className="flex items-center justify-between p-4 border-b border-text-secondary-light/20 dark:border-text-secondary-dark/20">
                  <img 
                    src={isDark ? "/logo-modo-oscuro.svg" : "/logo-modo-claro.svg"}
                    alt="Zentella" 
                    className="h-7 w-auto"
                  />
                  <motion.button 
                    onClick={closeMenu}
                    className="p-1.5 rounded-xl bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-bg-secondary-light/80 dark:hover:bg-bg-secondary-dark/80 transition-colors duration-200"
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Cerrar menú"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <nav className="flex-1 px-4 py-4">
                  <ul className="space-y-1">
                    {menuItems.map((item, index) => (
                      <motion.li 
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.1 + index * 0.1,
                          ease: "easeOut"
                        }}
                      >
                        <motion.a 
                          href={item.href} 
                          onClick={closeMenu}
                          className="block px-3 py-2.5 text-base font-medium text-text-primary-light dark:text-text-primary-dark hover:text-color-primary dark:hover:text-color-primary hover:bg-bg-secondary-light/50 dark:hover:bg-bg-secondary-dark/50 rounded-xl transition-all duration-200"
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {item.name}
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <motion.div 
                  className="p-4 border-t border-text-secondary-light/20 dark:border-text-secondary-dark/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <motion.a
                    href="#contact"
                    onClick={closeMenu}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-purple-600 to-color-accent hover:from-purple-700 hover:to-color-accent/90 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Trabajemos juntos
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation