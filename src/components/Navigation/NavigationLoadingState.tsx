import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface NavigationLoadingStateProps {
  isLoading: boolean
  className?: string
}

/**
 * Modern loading indicator for navigation states
 * Respects reduced motion preferences
 */
const NavigationLoadingState = ({ isLoading, className = '' }: NavigationLoadingStateProps) => {
  const prefersReducedMotion = useReducedMotion()

  const pulseVariants = {
    pulse: prefersReducedMotion 
      ? {}
      : {
          scale: [1, 1.05, 1],
          opacity: [1, 0.7, 1],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        }
  }

  const shimmerVariants = {
    shimmer: prefersReducedMotion
      ? {}
      : {
          x: ['-100%', '100%'],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }
        }
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-color-primary/20 to-transparent"
            variants={shimmerVariants}
            animate="shimmer"
          />
          
          {/* Pulse indicator */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-color-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
            variants={pulseVariants}
            animate="pulse"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NavigationLoadingState