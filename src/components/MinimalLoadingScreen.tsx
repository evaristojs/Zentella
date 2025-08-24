import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { StarfieldConfig } from '@/types/global'

interface MinimalLoadingScreenProps {
  /** Callback fired when loading screen completes */
  onComplete: () => void
}

// ⚡ Config elegante con baja opacidad
const starfieldConfig: StarfieldConfig = {
  numStars: 400,
  starColor: "rgba(160, 120, 255, 0.3)", // Púrpura con baja opacidad
  hueJitter: 20,
  trailLength: 0.9,
  baseSpeed: 0.3,
  maxAcceleration: 12,
  accelerationRate: 0.18,
  decelerationRate: 0.06,
  minSpawnRadius: 120,
  maxSpawnRadius: 600,
  canvasColor: "rgba(10, 5, 25, 0.01)", // Fondo aún más sutil
}

const MinimalLoadingScreen = ({ onComplete }: MinimalLoadingScreenProps) => {

  // Solo mostrar pantalla de bienvenida por 2 segundos
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000) // Aumentado a 2000ms (2 segundos)
    return () => clearTimeout(timer)
  }, [onComplete])

  // Mantener starfield centrado
  useEffect(() => {
    const keepCentered = () => {
      if (window.Starfield) {
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        window.Starfield.setOrigin(centerX, centerY)
      }
    }
    
    setTimeout(keepCentered, 100)
    const centerInterval = setInterval(keepCentered, 1000)
    
    return () => clearInterval(centerInterval)
  }, [])

  // Inicializar Starfield.js
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "/starfield.js"
    script.async = true

    script.onload = () => {
      if (window.Starfield) {
        // Configuración con nueva API
        window.Starfield.setup({
          ...starfieldConfig,
          auto: false  // Desactivar auto para control manual completo
        })
        
        // Acelerar desde el inicio
        window.Starfield.setAccelerate(true)
        
        // Siempre centrar en el centro de la pantalla
        const centerScreen = () => {
          const centerX = window.innerWidth / 2
          const centerY = window.innerHeight / 2
          window.Starfield.setOrigin(centerX, centerY)
          console.log('Origin always centered at screen:', centerX, centerY)
        }
        
        // Centrar inmediatamente
        centerScreen()
        
        // Recentrar en resize
        window.addEventListener('resize', centerScreen)
      }
    }

    document.head.appendChild(script)

    return () => {
      if (window.Starfield) {
        window.Starfield.cleanup()
      }
      script.remove()
    }
  }, [])

  return (
    <div
      className="starfield fixed inset-0 z-50 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      }}
    >
      {/* Starfield canvas se crea automáticamente */}

      <AnimatePresence mode="wait">
        {/* Solo pantalla de bienvenida */}
        <motion.div
          key="welcome"
          className="flex items-center justify-center min-h-screen relative"
          style={{ zIndex: 10 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div className="text-center" initial={{ y: 50 }} animate={{ y: 0 }}>
            <motion.img
              id="final-logo"
              src="/isotipo-negativozentella2025.svg"
              alt="Zentella Logo"
              className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8"
              style={{
                filter: "drop-shadow(0 8px 50px rgba(255, 255, 255, 0.6))",
              }}
              animate={{ scale: [0.8, 1.1, 1] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <h1 className="text-3xl md:text-4xl font-light text-text-primary-dark mb-3">
              Bienvenido a
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Zentella
            </h2>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default MinimalLoadingScreen