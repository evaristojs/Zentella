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
          numStars: 150,
          baseSpeed: 0.3,
          trailLength: 0.95,
          starColor: isDarkMode 
            ? 'rgb(255, 255, 255)' 
            : 'rgb(103, 0, 248)',
          canvasColor: isDarkMode 
            ? 'rgb(17, 17, 17)' 
            : 'rgb(253, 254, 255)',
          hueJitter: isDarkMode ? 0 : 20,
          maxAcceleration: 2,
          accelerationRate: 0.1,
          decelerationRate: 0.15,
          minSpawnRadius: 0,
          maxSpawnRadius: 1000
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