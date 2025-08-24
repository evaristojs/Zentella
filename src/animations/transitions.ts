import { Transition } from 'framer-motion'
import { DURATION, EASING, DELAY } from './constants'

// Common transition configurations
export const transitions = {
  // Basic transitions
  fast: {
    duration: DURATION.fast,
    ease: EASING.easeOut
  },
  
  normal: {
    duration: DURATION.normal,
    ease: EASING.easeOut
  },
  
  medium: {
    duration: DURATION.medium,
    ease: EASING.easeOut
  },
  
  slow: {
    duration: DURATION.slow,
    ease: EASING.easeOut
  },

  // Specialized transitions
  spring: {
    type: 'spring',
    damping: 20,
    stiffness: 100
  },
  
  bounce: {
    type: 'spring',
    bounce: 0.4,
    duration: DURATION.slow
  },
  
  smooth: {
    duration: DURATION.medium,
    ease: EASING.easeInOut
  },

  // Layout transitions
  layout: {
    type: 'spring',
    damping: 25,
    stiffness: 120
  },

  // Page transitions
  pageEnter: {
    duration: DURATION.slow,
    ease: EASING.easeOut
  },
  
  pageExit: {
    duration: DURATION.normal,
    ease: EASING.easeIn
  }
} as const

// Utility function to create custom transition
export const createTransition = (
  duration: number = DURATION.normal,
  ease: string | number[] = EASING.easeOut,
  delay: number = DELAY.none
): Transition => ({
  duration,
  ease,
  delay
})

// Utility function for stagger transitions
export const createStaggerTransition = (
  staggerChildren: number,
  duration: number = DURATION.normal,
  ease: string | number[] = EASING.easeOut
): Transition => ({
  duration,
  ease,
  staggerChildren,
  delayChildren: DELAY.short
})