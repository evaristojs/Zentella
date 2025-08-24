import { motion, AnimatePresence } from 'framer-motion'
import { iconRotate, iconSpring } from '../../animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ThemeToggleProps {
  isDark: boolean
  isInHero: boolean
  toggleTheme: () => void
}

const ThemeToggle = ({ isDark, isInHero, toggleTheme }: ThemeToggleProps) => {
  const prefersReducedMotion = useReducedMotion()
  return (
    <motion.button 
      onClick={toggleTheme}
      className={`min-h-[44px] min-w-[44px] flex items-center justify-center p-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-color-primary focus:ring-offset-2 focus:ring-offset-transparent shadow-sm hover:shadow-md ${
        isInHero && !isDark
          ? 'bg-bg-secondary-light/95 text-text-secondary-light hover:bg-bg-secondary-light hover:text-color-primary hover:scale-105'
          : 'bg-bg-secondary-light/90 dark:bg-bg-secondary-dark/90 text-text-secondary-light dark:text-text-secondary-dark hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark hover:text-color-primary dark:hover:text-color-primary hover:scale-105'
      }`}
      aria-pressed={isDark}
      role="switch"
      variants={prefersReducedMotion ? {} : iconSpring}
      initial={prefersReducedMotion ? undefined : "rest"}
      whileHover={prefersReducedMotion ? {} : "hover"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          variants={prefersReducedMotion ? {} : iconRotate}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? {} : "visible"}
          exit={prefersReducedMotion ? undefined : "hidden"}
        >
          {isDark ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}

export default ThemeToggle