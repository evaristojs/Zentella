import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { navSlideIn } from '../../animations'
import { useNavigationState, NavigationProps } from './hooks/useNavigationState'
import { useNavbarScroll } from '../../hooks/useUltraScrollDetection'
import NavigationBar from './NavigationBar'
import ThemeToggle from './ThemeToggle'
import MobileMenu from './MobileMenu'
import AdaptiveLogo from './AdaptiveLogo'


const Navigation = ({ isMenuOpen, setIsMenuOpen }: NavigationProps) => {
  const { toggleTheme, isDark } = useTheme()
  const { toggleMenu, closeMenu, menuItems, activeSection, setActiveSectionManually } = useNavigationState(isMenuOpen, setIsMenuOpen)
  
  // Ultra-efficient scroll detection - trigger at 2px
  const { isScrolled: scrolled } = useNavbarScroll(2)
  
  // Define hasScrolled for compatibility with existing components
  const hasScrolled = scrolled

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-b border-white/20 dark:border-gray-700/30 shadow-lg'
            : 'bg-transparent'
        }`}
        variants={navSlideIn}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-full mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-14 lg:h-16">
            
            {/* Adaptive Logo with ultra-smooth transitions - moved left with margin */}
            <AdaptiveLogo 
              isDark={isDark}
              className="flex-shrink-0 -ml-2 sm:-ml-3 lg:-ml-4"
            />
            
            {/* Desktop Navigation */}
            <NavigationBar 
              menuItems={menuItems}
              isInHero={!hasScrolled}
              isDark={isDark}
              activeSection={activeSection}
              setActiveSectionManually={setActiveSectionManually}
            />

            {/* Controls */}
            <div className="flex items-center space-x-2 sm:space-x-2 lg:space-x-3 transform translate-x-[10%]">
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
                activeSection={activeSection}
              />
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  )
}

export default Navigation