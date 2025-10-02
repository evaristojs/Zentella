import { useMemo } from 'react'
import { useLogoScroll } from './useUltraScrollDetection'

export type LogoType = 'logotipo' | 'isotipo'

interface LogoState {
  type: LogoType
  isInHero: boolean
}

/**
 * Adaptive logo hook using centralized scroll detection
 * No longer creates its own Intersection Observer
 */
export const useAdaptiveLogo = (isDark: boolean) => {
  // Use centralized scroll detection system instead of creating a new observer
  const { isInHero, currentSection } = useLogoScroll(0)

  // Determine logo type based on scroll position
  const logoType: LogoType = isInHero ? 'logotipo' : 'isotipo'

  const logoState: LogoState = {
    type: logoType,
    isInHero
  }

  // Memoized logo source calculation for optimal performance
  const logoSrc = useMemo(() => {
    if (logoState.type === 'isotipo') {
      // Outside hero: use isotipo based on current theme
      return isDark
        ? '/isotipo-modo-oscuro.svg'
        : '/isotipo-modo-claro.svg'
    } else {
      // In hero: use full logo based on current theme
      return isDark
        ? '/logo-modo-oscuro.svg'
        : '/logo-modo-claro.svg'
    }
  }, [logoState.type, isDark])

  return {
    logoSrc,
    logoState,
    currentSection
  }
}