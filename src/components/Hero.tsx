import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { devLog } from '../utils/logger'

const phrases = [
  "brilles más",
  "crezcas hoy",
  "todo cuente",
  "impactes ya",
  "vivas libre",
  "funcione bien",
  "vendas más",
  "destaques ya",
  "triunfes hoy",
  "seas único"
]

import { useTheme } from '../hooks/useTheme'

const Hero: React.FC = () => {
  const { isDark } = useTheme()

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const themeObserverRef = useRef<MutationObserver | null>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Typing effect
  useEffect(() => {
    const typeNextCharacter = (i: number) => {
      if (i > phrases[currentPhraseIndex].length) {
        // Wait 2 seconds after typing is complete, then start next phrase
        const nextPhraseTimeout = setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        }, 2000)
        timeoutsRef.current.push(nextPhraseTimeout)
        return
      }

      const timeoutId = setTimeout(() => {
        setDisplayText(phrases[currentPhraseIndex].slice(0, i))
        typeNextCharacter(i + 1)
      }, 80) // 80ms between characters
      timeoutsRef.current.push(timeoutId)
    }

    // Clear existing timeouts before starting a new phrase
    timeoutsRef.current.forEach(id => clearTimeout(id))
    timeoutsRef.current = []
    setDisplayText('')
    typeNextCharacter(1)

    return () => {
      timeoutsRef.current.forEach(id => clearTimeout(id))
      timeoutsRef.current = []
    }
  }, [currentPhraseIndex])

  // Cursor blink effect
  useEffect(() => {
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current)
        cursorIntervalRef.current = null
      }
    }
  }, [])

  // Starfield.js initialization
  useEffect(() => {
    // Check if script already exists to prevent duplicates
    const existingScript = document.querySelector('script[src="/starfield.js"]')
    if (existingScript) {
      return
    }

    // Load starfield.js script
    const script = document.createElement('script')
    script.src = '/starfield.js'
    script.async = true
    scriptRef.current = script

    script.onload = () => {
      // Initialize Starfield with custom configuration
      if (window.Starfield) {
        // Función para configurar el starfield según el tema
        const setupStarfield = () => {
          const isDarkMode = document.documentElement.classList.contains('dark')

          window.Starfield.setup({
            numStars: 400,
            baseSpeed: 1.8,
            trailLength: 0.2,
            // Colores mejorados para mejor visibilidad
            starColor: isDarkMode
              ? 'rgb(200, 160, 255)' // Púrpura claro en modo oscuro
              : 'rgb(60, 20, 180)',   // Púrpura más oscuro para mayor contraste en modo claro
            canvasColor: isDarkMode
              ? 'rgb(8, 8, 12)'      // Azul muy oscuro en lugar de negro puro
              : 'rgb(248, 248, 252)', // Gris muy claro en lugar de blanco puro
            hueJitter: 25, // Variación de color para ambos modos
            maxAcceleration: 6,
            accelerationRate: 0.15,
            decelerationRate: 0.12,
            minSpawnRadius: 100,
            maxSpawnRadius: 500,
            auto: false,                // Desactivar auto para control manual
            container: document.querySelector('.starfield') as HTMLElement | null,
            originElement: document.querySelector('.starfield-origin') as HTMLElement | null
          })

          devLog.config('Hero', 'Starfield configurado', { mode: isDarkMode ? 'oscuro' : 'claro' })
        }

        setupStarfield()

        // Observer para cambios de tema - Solo actualizar colores
        // Prevent double observer creation
        if (!themeObserverRef.current) {
          themeObserverRef.current = new MutationObserver(() => {
            if (!window.Starfield || !window.Starfield.config) return

            const isDarkMode = document.documentElement.classList.contains('dark')

            // Actualizar solo los colores sin recrear el starfield
            window.Starfield.config.starColor = isDarkMode
              ? 'rgb(200, 160, 255)' // Púrpura claro en modo oscuro
              : 'rgb(60, 20, 180)'   // Púrpura más oscuro para mayor contraste en modo claro

            window.Starfield.config.canvasColor = isDarkMode
              ? 'rgb(8, 8, 12)'      // Azul muy oscuro
              : 'rgb(248, 248, 252)' // Gris muy claro

            devLog.config('Hero', 'Colores del starfield actualizados', { mode: isDarkMode ? 'oscuro' : 'claro' })
          })

          themeObserverRef.current.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
          })
        }
      }
    }

    script.onerror = () => {
      devLog.error('Failed to load starfield.js', null, 'Hero')
      scriptRef.current = null
    }

    document.head.appendChild(script)

    return () => {
      // Robust cleanup
      if (window.Starfield) {
        try {
          window.Starfield.cleanup()
        } catch (error) {
          devLog.warn('Error during starfield cleanup', error, 'Hero')
        }
      }

      // Clean up script
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current)
        scriptRef.current = null
      }

      // Clean up observer
      if (themeObserverRef.current) {
        themeObserverRef.current.disconnect()
        themeObserverRef.current = null
      }
    }
  }, [])

  // Event handlers para el botón Comenzar - Solo aceleración al hacer clic
  const handleComenzarHover = () => {
    // Sin aceleración en hover
  }

  const handleComenzarLeave = () => {
    // Sin aceleración en hover
  }



  const handleComenzarClick = () => {
    // Activar aceleración del starfield
    if (window.Starfield) {
      window.Starfield.setAccelerate(true)
    }

    // Esperar 1.5 segundos antes de hacer scroll para mostrar la aceleración
    const scrollTimeout = setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      // Desactivar aceleración después del scroll
      if (window.Starfield) {
        window.Starfield.setAccelerate(false)
      }
    }, 1500)

    // Store timeout for cleanup if component unmounts
    timeoutsRef.current.push(scrollTimeout)
  }

  return (
    <>
    <section
      id="hero"
      className="starfield min-h-screen relative overflow-hidden snap-start bg-white dark:bg-black"
      style={{
        height: '100vh',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {/* Video Background - Eliminado para mejor visibilidad del starfield */}

      {/* Starfield canvas se insertará aquí automáticamente por starfield.js */}

      {/* Hero Content - starfield-origin según especificaciones oficiales */}
      <div
        className="hero-content starfield-origin"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          width: '100%',
          maxWidth: '100vw',
          textAlign: 'center',
          padding: '0 1rem'
        }}
      >
        <div className="w-full" style={{ maxWidth: '100%' }}>

          {/* Main Content - Centered Layout */}
          <div className="text-center space-y-4" style={{ width: '100%', maxWidth: '100%' }}>


            {/* Main Headline with Rotating Phrases */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="heading-1 font-black leading-none tracking-tight flex flex-col items-center justify-center w-full">
                <span
                  className="block font-black text-center text-black dark:text-white"
                  style={{
                    fontSize: 'clamp(3.5rem, 7vw, 7rem)',
                    lineHeight: '0.9',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Haz que
                </span>
                <div
                  className="relative w-full text-center flex items-center justify-center overflow-hidden -mt-1"
                  style={{
                    height: 'clamp(4rem, 8vw, 8rem)',
                    minHeight: '4rem'
                  }}
                >
                  <motion.span
                    className="flex items-center justify-center font-black"
                    style={{
                      background: 'linear-gradient(135deg, #6700f8 0%, #ac00d3 50%, #ff0080 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: 'clamp(3.5rem, 7vw, 7rem)',
                      whiteSpace: 'nowrap',
                      lineHeight: '0.9',
                      letterSpacing: '-0.02em',
                      color: '#6700f8' // Fallback color
                    }}
                  >
                    {displayText}
                    <motion.span
                      className="ml-1 bg-gradient-to-r from-color-primary to-color-secondary bg-clip-text text-transparent"
                      animate={{ opacity: showCursor ? 1 : 0 }}
                      transition={{ duration: 0.1 }}
                      style={{
                        fontSize: 'inherit'
                      }}
                    >
                      |
                    </motion.span>
                  </motion.span>
                </div>
                <span
                  className="block font-black text-center text-black dark:text-white -mt-1"
                  style={{
                    fontSize: 'clamp(3.5rem, 7vw, 7rem)',
                    lineHeight: '0.9',
                    letterSpacing: '-0.02em'
                  }}
                >
                  con Zentella
                </span>
              </h1>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-row gap-3 justify-center items-center pt-4 px-4 w-full"
              style={{ maxWidth: '100%' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.button
                className="group relative overflow-hidden flex-1 max-w-[160px] px-4 py-2.5 bg-gradient-to-r from-color-primary to-color-secondary text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 min-h-[40px] touch-manipulation border border-color-primary/20"
                onClick={handleComenzarClick}
                onMouseEnter={handleComenzarHover}
                onMouseLeave={handleComenzarLeave}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5">
                  Comenzar
                  <motion.svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-color-secondary to-color-primary opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"
                  whileHover={{ opacity: 1 }}
                />
              </motion.button>

              <motion.button
                className="group flex-1 max-w-[160px] px-4 py-2.5 bg-transparent border-2 border-color-primary/40 text-color-primary dark:text-color-primary rounded-full font-semibold text-sm hover:border-color-primary hover:bg-gradient-to-r hover:from-color-primary/10 hover:to-color-secondary/10 transition-all duration-300 min-h-[40px] touch-manipulation backdrop-blur-sm"
                onClick={() => {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="flex items-center justify-center gap-1.5">
                  Portfolio
                  <motion.svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </motion.svg>
                </span>
              </motion.button>
            </motion.div>

            {/* Services Pills - Mobile/Tablet Only */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 pt-8 lg:hidden max-w-sm mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              {['Fotografía', 'Diseño', 'Video', 'Animación'].map((service, index) => (
                <motion.div
                  key={service}
                  className={`group relative px-5 py-3 bg-white/15 dark:bg-black/25 backdrop-blur-sm border border-white/40 rounded-full text-sm font-medium ${isDark ? 'text-white' : 'text-black'} drop-shadow-sm cursor-pointer`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    borderColor: "rgba(255, 255, 255, 0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {service}
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
    </>
  )
}



export default Hero
