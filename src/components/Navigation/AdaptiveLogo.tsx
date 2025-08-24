import { motion, AnimatePresence } from 'framer-motion'
import { useAdaptiveLogo } from '../../hooks/useAdaptiveLogo'
import { transitions } from '../../animations'

interface AdaptiveLogoProps {
  isDark: boolean
  className?: string
}

const AdaptiveLogo = ({ isDark, className = '' }: AdaptiveLogoProps) => {
  const { logoSrc, logoState } = useAdaptiveLogo(isDark)

  // Animation variants for smooth transitions
  const logoVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.95,
      filter: 'blur(2px)'
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: { 
      opacity: 0, 
      scale: 1.05,
      filter: 'blur(2px)'
    }
  }

  // Dynamic sizing based on logo type and scroll state
  const getLogoSize = () => {
    const { type, isScrolled } = logoState
    
    if (type === 'isotipo') {
      // Isotipo (icon only) - when scrolled
      return 'h-8 w-auto md:h-10 lg:h-12 transition-all duration-300'
    } else {
      // Logotipo (full logo) - at top
      return isScrolled 
        ? 'h-6 w-auto md:h-8 lg:h-10 transition-all duration-300' // Should not happen
        : 'h-8 w-auto md:h-10 lg:h-12 transition-all duration-300'  // Full size at top
    }
  }


  return (
    <motion.div 
      className={`flex-shrink-0 relative ${className}`}
      whileHover={{ 
        scale: 1.05,
        filter: isDark ? 'drop-shadow(0 0 8px rgba(103, 0, 248, 0.3))' : 'drop-shadow(0 0 8px rgba(103, 0, 248, 0.2))'
      }}
      transition={transitions.fast}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={`${logoState.variant}-${logoState.type}`}
          src={logoSrc}
          alt="Zentella"
          className={`${getLogoSize()} object-contain transition-all duration-300 ${
            logoState.isScrolled 
              ? 'filter brightness-110' 
              : ''
          }`}
          variants={logoVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ 
            duration: 0.3, 
            ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smoother feel
            scale: { duration: 0.2 },
            opacity: { duration: 0.15 }
          }}
          onLoad={() => {
            if (process.env.NODE_ENV === 'development') {
              console.log('Logo loaded successfully:', logoSrc)
            }
          }}
          onError={(e) => {
            if (process.env.NODE_ENV === 'development') {
              console.error('Logo failed to load:', logoSrc)
            }
            // Fallback to regular logo if adaptive logo fails
            const target = e.currentTarget
            target.src = '/regularzentella2025.svg'
          }}
        />
      </AnimatePresence>
      
    </motion.div>
  )
}

export default AdaptiveLogo