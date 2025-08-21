import { useEffect, useRef } from 'react'

interface CustomStarfieldProps {
  isDarkMode: boolean
}

const CustomStarfield = ({ isDarkMode }: CustomStarfieldProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load starfield script dynamically
    const script = document.createElement('script')
    script.src = '/starfield.js'
    script.async = true
    
    script.onload = () => {
      if (window.Starfield && containerRef.current) {
        // Configure starfield based on theme
        const config = {
          numStars: 200,
          baseSpeed: 0.8,
          trailLength: 0.9,
          starColor: isDarkMode 
            ? 'rgb(255, 255, 255)' 
            : 'rgb(103, 0, 248)',
          canvasColor: isDarkMode 
            ? 'rgb(17, 17, 17)' 
            : 'rgb(253, 254, 255)',
          hueJitter: isDarkMode ? 0 : 30,
          maxAcceleration: 8,
          accelerationRate: 0.15,
          decelerationRate: 0.25,
          minSpawnRadius: 60,
          maxSpawnRadius: 400
        }
        
        window.Starfield.setup(config)
      }
    }
    
    document.head.appendChild(script)
    
    return () => {
      if (window.Starfield) {
        window.Starfield.destroy()
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [isDarkMode])

  return (
    <div 
      ref={containerRef}
      className="starfield absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

export default CustomStarfield