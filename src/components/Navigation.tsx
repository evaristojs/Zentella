import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

const Navigation = ({ isMenuOpen, setIsMenuOpen }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { toggleTheme, isDark } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    { name: 'Contacto', href: '#contact' }
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 hover-smooth ${
        isScrolled 
          ? 'bg-white/90 dark:bg-bg-base-dark/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700' 
          : 'bg-transparent'
      }`}>
        <div className="layout-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                src="/Zentella Logo Web/isotipo-colorzentella2025.svg" 
                alt="Zentella" 
                className="h-8 w-auto hover-smooth hover:scale-105"
              />
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="text-small font-medium text-text-secondary-light dark:text-text-secondary-dark hover:text-color-primary hover-smooth relative group focus-ring rounded-md px-2 py-1"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-color-primary hover-smooth group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <motion.button 
                onClick={toggleTheme}
                className="btn-ghost"
                aria-label="Toggle theme"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isDark ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isDark ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </motion.div>
              </motion.button>

              <motion.button 
                className="btn-ghost md:hidden"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col gap-1">
                  <motion.div 
                    className="w-4 h-0.5 bg-current origin-center"
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 6 : 0
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="w-4 h-0.5 bg-current"
                    animate={{
                      opacity: isMenuOpen ? 0 : 1
                    }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="w-4 h-0.5 bg-current origin-center"
                    animate={{
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? -6 : 0
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                </div>
              </motion.button>

              <motion.button 
                className="btn-primary hidden lg:flex"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Trabajemos juntos
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <motion.div 
        className="fixed inset-0 z-40 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <motion.div 
          className="absolute inset-0 bg-white dark:bg-bg-base-dark"
          initial={{ x: "100%" }}
          animate={{ x: isMenuOpen ? "0%" : "100%" }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <div className="layout-container h-full flex flex-col">
            
            <motion.div 
              className="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: isMenuOpen ? 1 : 0 }}
              transition={{ duration: 0.2, delay: isMenuOpen ? 0.1 : 0 }}
            >
              <img 
                src="/Zentella Logo Web/isotipo-colorzentella2025.svg" 
                alt="Zentella" 
                className="h-8 w-auto"
              />
              <motion.button 
                className="btn-ghost"
                onClick={closeMenu}
                aria-label="Close menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>

            <nav className="flex-1 py-8">
              <ul className="space-y-6">
                {menuItems.map((item, index) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: isMenuOpen ? 1 : 0, 
                      x: isMenuOpen ? 0 : 20 
                    }}
                    transition={{ 
                      duration: 0.2, 
                      delay: isMenuOpen ? 0.15 + index * 0.05 : 0,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.a 
                      href={item.href} 
                      onClick={closeMenu}
                      className="block heading-3 text-text-primary-light dark:text-text-primary-dark hover:text-color-primary hover-smooth focus-ring rounded-md px-2 py-2"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div 
              className="py-6 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0, 
                y: isMenuOpen ? 0 : 20 
              }}
              transition={{ 
                duration: 0.2, 
                delay: isMenuOpen ? 0.3 : 0,
                ease: "easeInOut"
              }}
            >
              <motion.button 
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Trabajemos juntos
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Navigation