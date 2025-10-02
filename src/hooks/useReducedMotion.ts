import { useState, useEffect } from 'react'

/**
 * Hook to detect if the user prefers reduced motion
 *
 * This hook checks the user's system preference for reduced motion
 * (prefers-reduced-motion: reduce) and updates when the preference changes.
 *
 * @returns {boolean} shouldReduceMotion - True if user prefers reduced motion
 *
 * @example
 * const shouldReduceMotion = useReducedMotion()
 *
 * // Use in animations
 * animate={{
 *   opacity: 1,
 *   ...(shouldReduceMotion ? {} : { scale: 1.2, rotate: 360 })
 * }}
 */
export const useReducedMotion = (): boolean => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setShouldReduceMotion(mediaQuery.matches)

    const listener = (event: MediaQueryListEvent) => {
      setShouldReduceMotion(event.matches)
    }

    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  return shouldReduceMotion
}
