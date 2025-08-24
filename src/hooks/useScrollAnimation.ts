import { useEffect, useRef } from 'react'
import { useInView, useAnimation } from 'framer-motion'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, scaleIn } from '../animations'
import type { UseScrollAnimationOptions, UseScrollAnimationReturn } from '@/types/hooks'

/**
 * Custom hook for scroll-based animations
 * 
 * @param options - Configuration options for scroll animation
 * @returns Object containing ref, controls, and isInView state
 */
export const useScrollAnimation = (
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn => {
  const {
    threshold = 0.1,
    once = true,
    rootMargin = '0px'
  } = options

  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { 
    amount: threshold,
    once,
    margin: rootMargin
  })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return { ref, controls, isInView }
}

// Re-export animations from centralized system for backward compatibility
export { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, scaleIn }