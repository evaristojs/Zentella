import { useState, useEffect } from 'react'

export const useFooterReveal = (threshold: number = 200) => {
  const [isFooterRevealed, setIsFooterRevealed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      // Calcular si estamos cerca del final de la página
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight)
      setIsFooterRevealed(distanceFromBottom <= threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Check initial position
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return isFooterRevealed
}