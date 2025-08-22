import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
// Asegúrate de instalar heroicons: npm install @heroicons/react
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

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
      const heroSection = document.getElementById('hero')
      const servicesSection = document.getElementById('services')
      
      if (heroSection && servicesSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        const servicesTop = servicesSection.offsetTop
        const scrollPosition = window.scrollY + 80 // Offset for navbar height
        
        setIsScrolled(window.scrollY > 20)
        setIsInHero(scrollPosition < servicesTop)
      }
    }

    handleScroll() // Check initial position
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
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? (isInHero && !isDark
              ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/10' 
              : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg shadow-black/10 dark:shadow-black/30')
            : (isInHero && !isDark
              ? 'bg-white/20 backdrop-blur-sm'
              : 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm')
        }`}
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
                src={isDark ? "/positivozentella2025.svg" : "/regularzentella2025.svg"}
                alt="Zentella" 
                className="h-6 sm:h-8 lg:h-10 w-auto"
              />
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {menuItems.map((item, index) => (
                <motion.a 
                  key={item.name}
                  href={item.href}
                  className={`relative px-2 lg:px-4 py-2 text-xs lg:text-base font-medium transition-colors duration-200 rounded-lg ${
                    isInHero && !isDark
                      ? 'text-gray-800 hover:text-gray-900 hover:bg-gray-100/50'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                  }`}
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
                className={`p-2 sm:p-2.5 lg:p-3 rounded-xl transition-all duration-200 ${
                  isInHero && !isDark
                    ? 'bg-gray-100/90 text-gray-700 hover:bg-gray-200/90 hover:text-gray-900'
                    : 'bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
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
                      <SunIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : (
                      <MoonIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              <motion.button 
                className={`md:hidden p-2 sm:p-2.5 rounded-xl transition-all duration-200 relative z-[60] ${
                  isInHero && !isDark
                    ? 'bg-gray-100/90 text-gray-700 hover:bg-gray-200/90 hover:text-gray-900'
                    : 'bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
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
                      <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Bars3Icon className="w-4 h-4 sm:w-5 sm:h-5" />
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
              className="absolute top-0 right-0 w-full max-w-[340px] h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl z-[50]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            >
              <div className="h-full flex flex-col">
                
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700/60">
                  <img 
                    src={isDark ? "/positivozentella2025.svg" : "/regularzentella2025.svg"}
                    alt="Zentella" 
                    className="h-7 w-auto"
                  />
                  <motion.button 
                    onClick={closeMenu}
                    className="p-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Cerrar menú"
                  >
                    <XMarkIcon className="w-4 h-4" />
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
                          className="block px-3 py-2.5 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200"
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
                  className="p-4 border-t border-gray-200 dark:border-gray-700/60"
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