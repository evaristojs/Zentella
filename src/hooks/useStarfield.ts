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
            starColor: "rgb(103, 0, 248)",
            hueJitter: 0,
            trailLength: 0.8,
            baseSpeed: 2,
            maxAcceleration: 1.5,
            accelerationRate: 0.03,
            decelerationRate: 0.03,
            minSpawnRadius: 100,
            maxSpawnRadius: 400,
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
          starColor: "rgb(103, 0, 248)",
          hueJitter: 0,
          trailLength: 0.8,
          baseSpeed: 2,
          maxAcceleration: 1.5,
          accelerationRate: 0.03,
          decelerationRate: 0.03,
          minSpawnRadius: 100,
          maxSpawnRadius: 400,
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