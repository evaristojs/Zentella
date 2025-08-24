// Export all animation constants
export * from './constants'

// Export all transitions
export * from './transitions'

// Export all variants
export * from './variants'

// Common animation utilities
export const animations = {
  // Quick access to most used animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// Pre-configured animation sets for common use cases
export const animationSets = {
  // Hero section animations
  hero: {
    container: 'staggerContainer',
    title: 'fadeInUp',
    subtitle: 'fadeInUp',
    cta: 'scaleIn'
  },
  
  // Card animations
  card: {
    container: 'scaleIn',
    hover: 'buttonHover'
  },
  
  // Navigation animations
  navigation: {
    container: 'navSlideIn',
    items: 'staggerContainerFast',
    mobileMenu: 'mobileMenuSlide'
  },
  
  // Form animations
  form: {
    container: 'fadeInUp',
    fields: 'staggerContainerSlow'
  }
}