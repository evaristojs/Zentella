import { useState, useEffect, useMemo } from 'react'
import { useLogoScroll } from './useUltraScrollDetection'

export type LogoType = 'logotipo' | 'isotipo'

interface LogoState {
  type: LogoType
  isInHero: boolean
}

export const useAdaptiveLogo = (isDark: boolean) => {
  // Ultra-efficient scroll detection - use 0 threshold for precise hero detection
  const { isInHero, currentSection } = useLogoScroll(0)
  
  const [logoState, setLogoState] = useState<LogoState>({
    type: 'logotipo',
    isInHero: true
  })
  
  // Update logo state when scroll position changes (only when entering/leaving hero)
  useEffect(() => {
    const logoType: LogoType = isInHero ? 'logotipo' : 'isotipo'
    
    setLogoState(prev => {
      if (prev.type !== logoType || prev.isInHero !== isInHero) {
        if (process.env.NODE_ENV === 'development') {
          console.log('🔄 Logo type change:', { 
            logoType,
            isInHero,
            currentSection,
            theme: isDark ? 'dark' : 'light'
          })
        }
        return {
          type: logoType,
          isInHero
        }
      }
      return prev
    })
  }, [isInHero, currentSection, isDark])

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