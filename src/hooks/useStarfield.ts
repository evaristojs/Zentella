import { useEffect, useRef } from 'react'

interface StarfieldConfig {
  starColor?: string
  hueJitter?: number
  trailLength?: number
  baseSpeed?: number
  maxAcceleration?: number
  accelerationRate?: number
  decelerationRate?: number
  minSpawnRadius?: number
  maxSpawnRadius?: number
}

declare global {
  interface Window {
    Starfield: {
      setup: (config: StarfieldConfig) => any
      destroy: () => void
      updateConfig: (config: StarfieldConfig) => any
    }
  }
}

export const useStarfield = () => {
  const containerRef = useRef<HTMLElement>(null)
  const starfieldRef = useRef<any>(null)

  useEffect(() => {
    const setupStarfield = () => {
      if (!window.Starfield || !containerRef.current) return

      const isDarkMode = document.documentElement.classList.contains('dark')
      
      const config = {
        starColor: isDarkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(103, 0, 248, 0.6)",
        hueJitter: 0,
        trailLength: 0.15,
        baseSpeed: 0.2,
        maxAcceleration: 0.1,
        accelerationRate: 0.003,
        decelerationRate: 0.003,
        minSpawnRadius: 300,
        maxSpawnRadius: 500
      }

      if (starfieldRef.current) {
        window.Starfield.destroy()
      }
      
      starfieldRef.current = window.Starfield.setup(config)
    }

    // Load starfield script if not already loaded
    if (!window.Starfield) {
      const script = document.createElement('script')
      script.src = '/starfield.js'
      script.onload = setupStarfield
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    } else {
      setupStarfield()
    }

    // Listen for theme changes
    const observer = new MutationObserver(setupStarfield)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })

    return () => {
      observer.disconnect()
      if (starfieldRef.current && window.Starfield) {
        window.Starfield.destroy()
      }
    }
  }, [])

  return containerRef
}