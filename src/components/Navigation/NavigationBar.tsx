import { motion } from 'framer-motion'
import { staggerContainerFast, fadeInDown } from '../../animations'
import { MenuItem } from './hooks/useNavigationState'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { spacing, interactive, motion as motionTokens, typography } from '../../design/tokens'
import { useState } from 'react'

interface NavigationBarProps {
  menuItems: MenuItem[]
  isInHero: boolean
  isDark: boolean
  activeSection?: string
  setActiveSectionManually: (section: string) => void
}

const NavigationBar = ({ menuItems, isInHero, isDark, activeSection, setActiveSectionManually }: NavigationBarProps) => {
  const prefersReducedMotion = useReducedMotion()
  const [clickedItem, setClickedItem] = useState<string | null>(null)
  
  console.log('NavigationBar activeSection:', activeSection) // Debug log
  
  // Get current page from URL for active state
  const getCurrentSection = (href: string) => {
    return href.replace('#', '')
  }
  
  const isActive = (href: string) => {
    const section = getCurrentSection(href)
    return activeSection === section
  }

  const handleItemClick = (itemName: string, itemHref: string) => {
    setClickedItem(itemName)
    setTimeout(() => setClickedItem(null), 2000) // Hide after 2 seconds
    
    // Set active section immediately when clicked
    const section = itemHref.replace('#', '')
    setActiveSectionManually(section)
  }
  return (
    <motion.div 
      className="hidden md:flex items-center space-x-1 lg:space-x-2"
      variants={staggerContainerFast}
      initial="hidden"
      animate="visible"
      role="menubar"
      aria-label="Main navigation menu"
    >
      {menuItems.map((item) => (
        <motion.a 
          key={item.name}
          href={item.href}
          role="menuitem"
          aria-current={isActive(item.href) ? 'page' : undefined}
          onClick={() => handleItemClick(item.name, item.href)}
          className={`relative flex items-center justify-center px-2 lg:px-3 py-0.5 text-sm lg:text-base font-semibold rounded-xl transition-all duration-200 ${
            isActive(item.href)
              ? 'text-white bg-gradient-to-r from-purple-600 to-color-accent shadow-lg'
              : isDark
                ? 'text-text-primary-dark hover:bg-white/5'
                : 'text-text-primary-light hover:bg-black/5'
          }`}
          style={{
            minHeight: '44px',
            minWidth: '44px',
          }}
        >
          {item.name}
          
          {/* Blurred tooltip when clicked */}
          {clickedItem === item.name && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-lg border border-white/30 dark:border-white/20 shadow-lg animate-pulse">
              <div className="text-xs font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                Navegando a {item.name}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20 dark:border-t-black/30"></div>
            </div>
          )}
        </motion.a>
      ))}
    </motion.div>
  )
}

export default NavigationBar