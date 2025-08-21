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

export const useStarfield = (config: StarfieldConfig = {}) => {
  const containerRef = useRef<HTMLElement>(null)
  const starfieldRef = useRef<any>(null)

  useEffect(() => {
    // Load starfield script if not already loaded
    if (!window.Starfield) {
      const script = document.createElement('script')
      script.src = '/starfield.js'
      script.onload = () => {
        if (window.Starfield && containerRef.current) {
          starfieldRef.current = window.Starfield.setup({
            starColor: "rgba(103, 0, 248, 0.4)",
            hueJitter: 0,
            trailLength: 0.2,
            baseSpeed: 0.3,
            maxAcceleration: 0.2,
            accelerationRate: 0.005,
            decelerationRate: 0.005,
            minSpawnRadius: 250,
            maxSpawnRadius: 450,
            ...config
          })
        }
      }
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    } else {
      // Starfield already loaded
      if (containerRef.current) {
        starfieldRef.current = window.Starfield.setup({
          starColor: "rgba(103, 0, 248, 0.4)",
          hueJitter: 0,
          trailLength: 0.2,
          baseSpeed: 0.3,
          maxAcceleration: 0.2,
          accelerationRate: 0.005,
          decelerationRate: 0.005,
          minSpawnRadius: 250,
          maxSpawnRadius: 450,
          ...config
        })
      }
    }

    return () => {
      if (starfieldRef.current && window.Starfield) {
        window.Starfield.destroy()
      }
    }
  }, [config])

  return containerRef
}