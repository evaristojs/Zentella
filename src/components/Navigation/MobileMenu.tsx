import { motion, AnimatePresence } from 'framer-motion'
import { mobileMenuSlide, iconRotate, staggerContainer, fadeInRight, fadeInUp, buttonHover, transitions } from '../../animations'
import { MenuItem } from './hooks/useNavigationState'
import { useReducedMotion } from '../../hooks/useReducedMotion'

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
  const prefersReducedMotion = useReducedMotion()
  
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
        className={`md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-3 rounded-xl transition-all duration-200 relative z-[60] focus:outline-none shadow-sm hover:shadow-md ${
          isInHero && !isDark
            ? 'bg-bg-secondary-light/95 text-text-secondary-light hover:bg-bg-secondary-light hover:text-color-primary hover:scale-105'
            : 'bg-bg-secondary-light/90 dark:bg-bg-secondary-dark/90 text-text-secondary-light dark:text-text-secondary-dark hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark hover:text-color-primary dark:hover:text-color-primary hover:scale-105'
        }`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation-menu"
        variants={buttonHover}
        initial="rest"
        whileHover="hover"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isMenuOpen ? 'close' : 'open'}
            variants={iconRotate}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {isMenuOpen ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[40] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.fast}
          >
            <motion.div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div 
              id="mobile-navigation-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              className="absolute top-0 right-0 w-full max-w-[360px] h-full bg-white/98 dark:bg-bg-base-dark/98 backdrop-blur-xl shadow-2xl border-l border-color-primary/10 z-[50]"
              variants={mobileMenuSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="h-full flex flex-col">
                
                <div className="flex items-center justify-between p-4 border-b border-text-secondary-light/20 dark:border-text-secondary-dark/20">
                  <motion.img 
                    src={isDark ? "/positivozentella2025.svg" : "/regularzentella2025.svg"}
                    alt="Zentella" 
                    className="h-7 w-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.button 
                    onClick={closeMenu}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-bg-secondary-light/80 dark:hover:bg-bg-secondary-dark/80 transition-colors duration-200 focus:outline-none"
                    variants={buttonHover}
                    initial="rest"
                    whileHover="hover"
                    aria-label="Close navigation menu"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <motion.nav 
                  className="flex-1 px-4 py-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  role="navigation"
                  aria-label="Mobile navigation menu"
                >
                  <ul className="space-y-1" role="menubar" aria-orientation="vertical">
                    {menuItems.map((item) => (
                      <motion.li 
                        key={item.name}
                        variants={fadeInRight}
                      >
                        <motion.a 
                          href={item.href} 
                          onClick={closeMenu}
                          role="menuitem"
                          aria-current={isActive(item.href) ? 'page' : undefined}
                          className={`block min-h-[44px] flex items-center px-3 py-3 text-base font-medium rounded-xl transition-all duration-200 focus:outline-none ${
                            isActive(item.href)
                              ? 'text-color-primary bg-color-primary/10 border-l-4 border-color-primary'
                              : 'text-text-primary-light dark:text-text-primary-dark hover:text-color-primary dark:hover:text-color-primary hover:bg-bg-secondary-light/50 dark:hover:bg-bg-secondary-dark/50'
                          }`}
                          whileHover={{ x: 4 }}
                        >
                          {item.name}
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.nav>

                <motion.div 
                  className="p-4 border-t border-text-secondary-light/20 dark:border-text-secondary-dark/20"
  variants={prefersReducedMotion ? {} : fadeInUp}
                  initial={prefersReducedMotion ? undefined : "hidden"}
                  animate={prefersReducedMotion ? {} : "visible"}
                >
                  <motion.a
                    href="#contact"
                    onClick={closeMenu}
                    className="w-full inline-flex items-center justify-center min-h-[44px] px-4 py-3 bg-gradient-to-r from-purple-600 to-color-accent hover:from-purple-700 hover:to-color-accent/90 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
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

export default MobileMenu