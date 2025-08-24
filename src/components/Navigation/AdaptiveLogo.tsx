import { motion, AnimatePresence } from 'framer-motion'
import { useAdaptiveLogo } from '../../hooks/useAdaptiveLogo'
import { transitions } from '../../animations'

interface AdaptiveLogoProps {
  isDark: boolean
  className?: string
}

const AdaptiveLogo = ({ isDark, className = '' }: AdaptiveLogoProps) => {
  const { logoSrc, logoState } = useAdaptiveLogo(isDark)

  // Animation variants for ultra-smooth transitions
  const logoVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.92,
      rotateY: 15,
      filter: 'blur(4px)'
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px)'
    },
    exit: { 
      opacity: 0, 
      scale: 0.92,
      rotateY: -15,
      filter: 'blur(4px)'
    }
  }

  // Dynamic sizing - tamaños coherentes y alineación consistente
  const getLogoSize = () => {
    const { type } = logoState
    
    // Tamaño y positioning para alinear las "Z" del logo e isotipo
    const baseClasses = 'transition-all duration-500 ease-in-out object-contain'
    
    if (type === 'isotipo') {
      // Isotipo: alineado al inicio del contenedor
      return `h-12 w-12 md:h-18 lg:h-36 ${baseClasses}`
    } else {
      // Logotipo: alineado al inicio del contenedor
      return `h-11 w-auto md:h-16 lg:h-19 ${baseClasses}`
    }
  }


  return (
    <motion.div 
      className={`flex-shrink-0 relative ${className} w-36 md:w-46 lg:w-50 flex items-center justify-start`}
      whileHover={{ 
        scale: 1.05,
        filter: isDark ? 'drop-shadow(0 0 8px rgba(103, 0, 248, 0.3))' : 'drop-shadow(0 0 8px rgba(103, 0, 248, 0.2))'
      }}
      transition={transitions.fast}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={logoState.type}
          src={logoSrc}
          alt="Zentella"
          className={`${getLogoSize()} object-contain`}
          variants={logoVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ 
            duration: 0.6, 
            ease: [0.165, 0.84, 0.44, 1], // Cubic bezier para transición premium
            scale: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
            opacity: { duration: 0.4 },
            rotateY: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
            filter: { duration: 0.3 }
          }}
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
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