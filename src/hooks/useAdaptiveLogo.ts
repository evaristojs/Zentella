import { useState, useEffect, useMemo } from 'react'

export type LogoType = 'logotipo' | 'isotipo'

interface LogoState {
  type: LogoType
  isInHero: boolean
}

export const useAdaptiveLogo = (isDark: boolean) => {
  const [logoState, setLogoState] = useState<LogoState>({
    type: 'logotipo',
    isInHero: true
  })
  
  // Simple scroll detection for hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const isInHero = scrollY < 500 // Simple threshold
      const logoType: LogoType = isInHero ? 'logotipo' : 'isotipo'
      
      setLogoState(prev => {
        if (prev.type !== logoType || prev.isInHero !== isInHero) {
          if (process.env.NODE_ENV === 'development') {
            console.log('🔄 Logo type change:', { 
              logoType,
              isInHero,
              scrollY,
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
    }

    handleScroll() // Initial check
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDark])

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
    currentSection: logoState.isInHero ? 'hero' : 'other'
  }
}