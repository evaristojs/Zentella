import { useState, useEffect, useMemo, useRef } from 'react'

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

  const [currentSection, setCurrentSection] = useState<string>('hero')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Create intersection observer for hero section detection
    const heroElement = document.getElementById('hero')
    if (!heroElement) return

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isInHero = entry.isIntersecting && entry.intersectionRatio > 0.1
          const newSection = isInHero ? 'hero' : 'other'
          const logoType: LogoType = isInHero ? 'logotipo' : 'isotipo'

          setCurrentSection(newSection)
          setLogoState(prev => {
            if (prev.type !== logoType || prev.isInHero !== isInHero) {
              if (process.env.NODE_ENV === 'development') {
                console.log('🔄 Logo type change (IntersectionObserver):', {
                  logoType,
                  isInHero,
                  intersectionRatio: entry.intersectionRatio,
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
        })
      },
      {
        root: null,
        rootMargin: '-80px 0px 0px 0px', // Account for navbar height
        threshold: [0, 0.1, 0.5] // Multiple thresholds for better detection
      }
    )

    observerRef.current.observe(heroElement)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
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
    currentSection
  }
}