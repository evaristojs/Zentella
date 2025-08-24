import { Variants } from 'framer-motion'
import { DURATION, EASING, SCALE, TRANSLATE, STAGGER } from './constants'
import { transitions } from './transitions'

// Fade animations
export const fade: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: transitions.medium
  }
}

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: TRANSLATE.medium
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow
  }
}

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -TRANSLATE.medium
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow
  }
}

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -TRANSLATE.medium
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.slow
  }
}

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: TRANSLATE.medium
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.slow
  }
}

// Scale animations
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: SCALE.small
  },
  visible: {
    opacity: 1,
    scale: SCALE.normal,
    transition: transitions.medium
  }
}

export const scaleUp: Variants = {
  hidden: {
    scale: SCALE.small
  },
  visible: {
    scale: SCALE.normal,
    transition: transitions.spring
  }
}

// Slide animations
export const slideInUp: Variants = {
  hidden: {
    y: TRANSLATE.large,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: transitions.spring
  }
}

export const slideInDown: Variants = {
  hidden: {
    y: -TRANSLATE.large,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: transitions.spring
  }
}

export const slideInLeft: Variants = {
  hidden: {
    x: -TRANSLATE.large,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: transitions.spring
  }
}

export const slideInRight: Variants = {
  hidden: {
    x: TRANSLATE.large,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: transitions.spring
  }
}

// Container animations for stagger effects
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.normal,
      delayChildren: 0.1
    }
  }
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.fast,
      delayChildren: 0.05
    }
  }
}

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.slow,
      delayChildren: 0.2
    }
  }
}

// Navigation specific animations
export const navSlideIn: Variants = {
  hidden: {
    y: -100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASING.easeOut
    }
  }
}

export const mobileMenuSlide: Variants = {
  hidden: {
    x: '100%'
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      bounce: 0,
      duration: DURATION.normal * 1.5
    }
  },
  exit: {
    x: '100%',
    transition: {
      duration: DURATION.normal,
      ease: EASING.easeIn
    }
  }
}

// Button animations
export const buttonHover: Variants = {
  rest: {
    scale: 1
  },
  hover: {
    scale: SCALE.large,
    transition: transitions.fast
  },
  tap: {
    scale: SCALE.medium,
    transition: transitions.fast
  }
}

// Icon animations
export const iconRotate: Variants = {
  hidden: {
    opacity: 0,
    scale: SCALE.small,
    rotate: -90
  },
  visible: {
    opacity: 1,
    scale: SCALE.normal,
    rotate: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.easeOut
    }
  }
}

export const iconSpring: Variants = {
  rest: {
    scale: 1,
    rotate: 0
  },
  hover: {
    scale: SCALE.large,
    rotate: 15,
    transition: transitions.spring
  },
  tap: {
    scale: SCALE.medium,
    rotate: -15,
    transition: transitions.fast
  }
}

// Loading animations
export const pulse: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: EASING.easeInOut
    }
  }
}

// Page transition animations
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: TRANSLATE.small
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.easeOut
    }
  },
  exit: {
    opacity: 0,
    y: -TRANSLATE.small,
    transition: {
      duration: DURATION.normal,
      ease: EASING.easeIn
    }
  }
}