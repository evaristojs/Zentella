import { useEffect, useState } from 'react'

/**
 * Hook to detect user's motion preferences
 * Respects prefers-reduced-motion setting for accessibility
 */
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)
    
    // Listen for changes
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    
    // Modern browsers support addEventListener, fallback for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      // @ts-ignore - Legacy support
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * Animation variants that respect motion preferences
 */
export const getAccessibleAnimations = (prefersReducedMotion: boolean) => ({
  duration: prefersReducedMotion ? 0 : undefined,
  transition: prefersReducedMotion ? { duration: 0 } : undefined,
  animate: prefersReducedMotion ? {} : undefined,
})