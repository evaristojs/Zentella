import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { useAdaptiveLogo } from '../hooks/useAdaptiveLogo'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../contexts/LanguageContext'
import { useRef, useEffect, useState, useCallback } from 'react'

interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
  currentSection?: string
}

const Navigation = ({ isMenuOpen, setIsMenuOpen }: NavigationProps) => {
  const { toggleTheme, isDark } = useTheme()
  const { currentLanguage, setLanguage, t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const navRef = useRef<HTMLElement>(null)

  // Estados para scroll personalizado
  const [isScrolled, setIsScrolled] = useState(false)
  const [detectedSection, setDetectedSection] = useState('hero')

  // Hook del logo con nuestro estado personalizado
  const { logoSrc, logoState } = useAdaptiveLogo(isDark)

  // Función para detectar la sección actual basada en la posición del scroll
  const detectCurrentSection = useCallback((scrollY: number) => {
    const sections = ['hero', 'services', 'portfolio', 'about', 'testimonials', 'contact']
    const viewportCenter = scrollY + window.innerHeight / 2

    let currentSectionId = 'hero'
    let closestSection = { id: 'hero', distance: Infinity }

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId)
      if (!element) continue

      const elementTop = element.offsetTop
      const elementBottom = elementTop + element.offsetHeight
      const elementCenter = elementTop + element.offsetHeight / 2

      // Si el centro de la pantalla está dentro de la sección
      if (viewportCenter >= elementTop && viewportCenter <= elementBottom) {
        currentSectionId = sectionId
        break
      }

      // Si no, encontrar la sección más cercana
      const distanceToCenter = Math.abs(elementCenter - viewportCenter)
      if (distanceToCenter < closestSection.distance) {
        closestSection = { id: sectionId, distance: distanceToCenter }
      }
    }

    // Si ninguna sección contiene el centro, usar la más cercana
    return currentSectionId === 'hero' && closestSection.id !== 'hero'
      ? closestSection.id
      : currentSectionId
  }, [])

  // Throttle helper para optimizar eventos de scroll
  const throttle = useCallback(<T extends (...args: any[]) => void>(
    func: T,
    limit: number
  ): [(...args: Parameters<T>) => void, () => void] => {
    let inThrottle: boolean
    let timeoutId: NodeJS.Timeout | null = null

    const throttledFunc = function(this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        timeoutId = setTimeout(() => {
          inThrottle = false
          timeoutId = null
        }, limit)
      }
    }

    const cancel = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
        inThrottle = false
      }
    }

    return [throttledFunc, cancel]
  }, [])

  // Efecto para detectar scroll y cambiar estilo del navbar + lógica del logo
  useEffect(() => {
    const handleScroll = () => {
      // Usar document.body.scrollTop ya que el scroll está en body
      const currentScrollY = document.body.scrollTop || window.scrollY
      const shouldBeScrolled = currentScrollY > 1.5
      setIsScrolled(shouldBeScrolled)

      // Detectar sección actual usando la función consolidada
      const currentSectionId = detectCurrentSection(currentScrollY)
      setDetectedSection(currentSectionId)
    }

    // Aplicar throttle de 100ms al handler de scroll para optimizar rendimiento
    const [throttledScrollHandler, cancelThrottle] = throttle(handleScroll, 100)

    // Escuchar scroll solo en body (donde está configurado overflow-y: auto)
    // Usar {passive: true} para mejorar el rendimiento del scroll
    document.body.addEventListener('scroll', throttledScrollHandler, { passive: true })

    // Llamada inicial para establecer el estado correcto
    handleScroll()

    return () => {
      document.body.removeEventListener('scroll', throttledScrollHandler)
      cancelThrottle()
    }
  }, [detectCurrentSection, throttle])

  // Función para forzar actualización (reemplaza forceUpdate del hook original)
  const forceUpdate = useCallback(() => {
    const currentScrollY = document.body.scrollTop || window.scrollY
    setIsScrolled(currentScrollY > 1.5)

    // Usar la función consolidada para detectar sección
    setDetectedSection(detectCurrentSection(currentScrollY))
  }, [detectCurrentSection])

  // Efecto para forzar actualización inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      forceUpdate();
    }, 50);

    return () => clearTimeout(timer);
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen)
  }, [isMenuOpen])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(currentLanguage === 'es' ? 'en' : 'es')
  }, [currentLanguage, setLanguage])

  const menuItems = [
    { name: t('nav.inicio'), href: '#hero', id: 'hero' },
    { name: t('nav.servicios'), href: '#services', id: 'services' },
    { name: t('nav.portafolio'), href: '#portfolio', id: 'portfolio' },
    { name: t('nav.nosotros'), href: '#about', id: 'about' },
    { name: t('nav.contacto'), href: '#contact', id: 'contact' }
  ]

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    closeMenu()

    if (href === '#hero') {
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        forceUpdate();
      }, 300);
    } else {
      const sectionId = href.replace('#', '')
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }, [closeMenu, forceUpdate])

  const getNavbarClasses = () => {
    const baseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300"

    if (isScrolled) {
      return `${baseClasses} bg-white/90 dark:bg-bg-base-dark/90 navbar-glass shadow-lg shadow-black/10 dark:shadow-black/30`
    }
    return `${baseClasses} bg-transparent`
  }

  return (
    <>
      <nav
        ref={navRef}
        id="navbar"
        className={getNavbarClasses()}
      >
        <div className="max-w-full mx-auto px-2 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            
            <motion.button
              className="flex-shrink-0 relative h-10 sm:h-8 lg:h-10 w-44 sm:w-44 lg:w-56 flex items-center justify-start focus:outline-none rounded-lg p-1 cursor-pointer"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                document.body.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                  forceUpdate();
                }, 300);
              }}
              aria-label={t('nav.inicio')}
            >
              <AnimatePresence mode="wait">
                {logoState.type === 'isotipo' ? (
                  shouldReduceMotion ? (
                    // Simplified animation for reduced motion - just fade in
                    <motion.svg
                      key="isotipo-simple"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 332.61 156.13"
                      className="w-auto h-full object-contain scale-75 sm:scale-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <polygon
                        points="0,0 154.79,61.06 77.39,139.26 332.61,156.13 193.89,90.52 255.22,24.91"
                        fill={isDark ? '#ffffff' : '#252425'}
                      />
                    </motion.svg>
                  ) : (
                    // Full animation for normal users - optimized
                    <motion.svg
                      key="isotipo-combined"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 332.61 156.13"
                      className="w-auto h-full object-contain scale-75 sm:scale-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Line drawing path - removed expensive filter animation */}
                      <motion.path
                        d="M0,0 L154.79,61.06 L77.39,139.26 L332.61,156.13 L193.89,90.52 L255.22,24.91 Z"
                        fill="none"
                        stroke={isDark ? '#ffffff' : '#252425'}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{
                          pathLength: 0,
                          opacity: 0
                        }}
                        animate={{
                          pathLength: 1,
                          opacity: 1
                        }}
                        transition={{
                          pathLength: { duration: 0.6, ease: "easeInOut" },
                          opacity: { duration: 0.15 }
                        }}
                      />

                      {/* Solid fill that appears exactly when line drawing completes */}
                      <motion.polygon
                        points="0,0 154.79,61.06 77.39,139.26 332.61,156.13 193.89,90.52 255.22,24.91"
                        fill={isDark ? '#ffffff' : '#252425'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.15,
                          delay: 0.6,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.svg>
                  )
                ) : (
                  <motion.img
                    key={logoState.type}
                    src={logoSrc}
                    alt="Zentella"
                    className="w-auto h-full object-contain scale-110 sm:scale-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
            
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              {menuItems.slice(0, -1).map((item, index) => {
                const sectionId = item.id
                const isActive = detectedSection === sectionId

                return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3 lg:px-4 py-2 text-xs md:text-base lg:text-base font-medium rounded-full transition-colors duration-200 whitespace-nowrap ${
                    isActive ? 'text-color-primary dark:text-white' : 'text-text-secondary-light dark:text-text-secondary-dark'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      className="absolute inset-1 bg-gradient-to-r from-color-primary/10 to-color-secondary/10 dark:from-color-primary/20 dark:to-color-secondary/20 rounded-full shadow-lg shadow-color-primary/10"
                      layoutId="active-nav-badge"
                      transition={{
                        type: 'spring',
                        stiffness: 150,
                        damping: 20,
                        mass: 1.2,
                        bounce: 0.6
                      }}
                      style={{
                        borderRadius: 9999,
                        backdropFilter: 'blur(8px)'
                      }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    />
                  )}
                </motion.a>
                )
              })}
              
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`relative ml-2 lg:ml-4 px-3 lg:px-6 py-2 lg:py-2.5 text-xs lg:text-sm font-bold rounded-lg lg:rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl ${
                  detectedSection === 'contact'
                    ? 'bg-gradient-to-r from-color-primary to-color-accent text-white ring-2 ring-color-primary/30'
                    : 'bg-gradient-to-r from-purple-600 to-color-accent hover:from-purple-700 hover:to-color-accent/90 text-white'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                {t('nav.trabajemos')}
              </motion.a>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 mr-2">
              <motion.button
                onClick={toggleLanguage}
                className="hidden md:flex p-2 sm:p-2.5 lg:p-3 rounded-full transition-all duration-200 bg-bg-secondary-light/80 dark:bg-bg-secondary-dark/80 text-text-secondary-light dark:text-text-secondary-dark hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark items-center justify-center"
                aria-label={t('nav.cambiar_idioma')}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <span className="text-xs font-bold uppercase tracking-wider">
                  {currentLanguage === 'es' ? 'EN' : 'ES'}
                </span>
              </motion.button>

              <motion.button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 lg:p-3 rounded-full transition-all duration-200 bg-bg-secondary-light/80 dark:bg-bg-secondary-dark/80 text-text-secondary-light dark:text-text-secondary-dark hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
                aria-label={t('nav.cambiar_tema')}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 15 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95, rotate: -15 }}
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

              <div className="md:hidden flex items-center space-x-1.5 mr-0">
                <motion.button
                  onClick={toggleLanguage}
                  className="p-2 sm:p-2.5 rounded-full transition-all duration-200 bg-bg-secondary-light/80 dark:bg-bg-secondary-dark/80 text-text-secondary-light dark:text-text-secondary-dark hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark flex items-center justify-center"
                  aria-label={t('nav.cambiar_idioma')}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {currentLanguage === 'es' ? 'EN' : 'ES'}
                  </span>
                </motion.button>

                <motion.button
                  className="p-2 sm:p-2.5 rounded-xl transition-all duration-200 relative z-[60] bg-bg-secondary-light/80 dark:bg-bg-secondary-dark/80 text-text-secondary-light dark:text-text-secondary-dark hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
                  onClick={toggleMenu}
                  aria-label={t('nav.abrir_menu')}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
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
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[40] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.menu_movil')}
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
              className="absolute top-0 left-0 w-full h-full bg-white/90 dark:bg-bg-base-dark/90 navbar-glass shadow-2xl z-[50]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            >
              <div className="h-full flex flex-col items-center justify-center max-w-md mx-auto">
                <nav className="flex-1 px-4 pt-8 py-4 w-full flex flex-col justify-center">
                  <ul className="space-y-3 flex flex-col items-center">
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
                          onClick={(e) => handleNavClick(e, item.href)}
                          className={`relative inline-block px-6 py-4 text-xl font-medium rounded-xl transition-colors duration-200 ${
                            detectedSection === item.id
                              ? 'text-color-primary dark:text-white'
                              : 'text-text-primary-light dark:text-text-primary-dark hover:text-color-primary dark:hover:text-color-primary'
                          }`}
                          whileHover={shouldReduceMotion ? {} : { x: 4 }}
                          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                        >
                          <span className="relative z-10 font-semibold">{item.name}</span>
                          {detectedSection === item.id && (
                            <motion.div
                              className="absolute inset-1 bg-gradient-to-r from-color-primary/10 to-color-secondary/10 dark:from-color-primary/20 dark:to-color-secondary/20 rounded-full shadow-lg shadow-color-primary/10"
                              transition={{
                                type: 'spring',
                                stiffness: 150,
                                damping: 20,
                                mass: 1.2,
                                bounce: 0.6
                              }}
                              style={{
                                borderRadius: 9999,
                                backdropFilter: 'blur(8px)'
                              }}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                            />
                          )}
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <motion.div 
                  className="p-6 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <motion.a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, '#contact')}
                    className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-600 to-color-accent hover:from-purple-700 hover:to-color-accent/90 text-white text-lg font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  >
                    {t('nav.trabajemos')}
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