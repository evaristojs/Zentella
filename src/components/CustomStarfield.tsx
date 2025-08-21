import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  prevX: number
  prevY: number
}

interface CustomStarfieldProps {
  isDarkMode: boolean
}

const CustomStarfield = ({ isDarkMode }: CustomStarfieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const starsRef = useRef<Star[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Initialize stars
    const initStars = () => {
      starsRef.current = []
      for (let i = 0; i < 800; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          prevX: 0,
          prevY: 0
        })
      }
    }

    initStars()

    // Animation loop
    const animate = () => {
      ctx.fillStyle = isDarkMode ? 'rgba(17, 17, 17, 0.1)' : 'rgba(253, 254, 255, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      starsRef.current.forEach((star) => {
        star.prevX = star.x
        star.prevY = star.y

        star.z -= 2

        if (star.z <= 0) {
          star.x = Math.random() * canvas.width
          star.y = Math.random() * canvas.height
          star.z = 1000
        }

        const k = 128 / star.z
        star.x = (star.x - centerX) * k + centerX
        star.y = (star.y - centerY) * k + centerY

        if (
          star.x >= 0 &&
          star.x <= canvas.width &&
          star.y >= 0 &&
          star.y <= canvas.height
        ) {
          const size = (1 - star.z / 1000) * 2
          const opacity = 1 - star.z / 1000

          ctx.lineWidth = size
          ctx.strokeStyle = isDarkMode 
            ? `rgba(255, 255, 255, ${opacity})` 
            : `rgba(103, 0, 248, ${opacity})`

          ctx.beginPath()
          ctx.moveTo(star.prevX, star.prevY)
          ctx.lineTo(star.x, star.y)
          ctx.stroke()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDarkMode])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

export default CustomStarfield