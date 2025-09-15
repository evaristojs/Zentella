import { motion } from 'framer-motion'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

import { useLanguage } from '../hooks/useLanguage'

interface HeroProps {
  scrollToSection?: (sectionId: string) => void
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const { t, currentLanguage } = useLanguage()
  
  
  // Dynamic phrases based on language
  const phrases = useMemo(() => [
    t('hero.phrase.tu_marca'),
    t('hero.phrase.tu_negocio'),
    t('hero.phrase.tu_exito'),
    t('hero.phrase.tu_historia'),
    t('hero.phrase.tus_ventas'),
    t('hero.phrase.tus_redes'),
    t('hero.phrase.tu_contenido'),
    t('hero.phrase.tu_comunidad'),
    t('hero.phrase.tu_presencia'),
    t('hero.phrase.tu_crecimiento'),
    t('hero.phrase.tu_impacto'),
    t('hero.phrase.tu_alcance'),
    t('hero.phrase.tu_audiencia'),
    t('hero.phrase.tu_estrategia'),
    t('hero.phrase.tu_vision')
  ], [currentLanguage, t])

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [carouselX, setCarouselX] = useState(0)

  // Logo data array
  const clientLogos = [
    { name: 'Regularzentella2025', logo: '/regularzentella2025.png' },
    { name: 'Zentella Mesa 7', logo: '/zentella-clientesMesa-de-trabajo-7.png' },
    { name: 'Zentella Mesa 10', logo: '/zentella-clientesMesa-de-trabajo-10.png' },
    { name: 'Zentella Mesa 8 Copia', logo: '/zentella-clientesMesa-de-trabajo-8-copia.png' },
    { name: 'Zentella Mesa 6', logo: '/zentella-clientesMesa-de-trabajo-6.png' },
    { name: 'Revel', logo: '/clientes-Revel.png' },
    { name: 'Mantra', logo: '/clientes-Mantra.png' },
    { name: 'River Hill', logo: '/clientes-River-Hill.png' },
    { name: 'Zentella Mesa 3', logo: '/zentella-clientesMesa-de-trabajo-3.png' },
    { name: 'Zentella Mesa 2', logo: '/zentella-Mesa-de-trabajo-2.png' },
    { name: 'Zentella Mesa 8', logo: '/zentella-clientesMesa-de-trabajo-8.png' },
    { name: 'Zentella Mesa 9 Copia', logo: '/zentella-clientesMesa-de-trabajo-9-copia.png' }
  ]

  // Reset typewriter when language changes
  useEffect(() => {
    setCurrentPhraseIndex(0)
    setDisplayText('')
  }, [currentLanguage])

  // Simple hover handlers
  const handleMouseEnter = useCallback(() => {
    setIsCarouselPaused(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsCarouselPaused(false)
  }, [])

  // Drag functionality with useEffect
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let isDragging = false
    let startX = 0
    let currentX = 0
    let animationId: number

    const handleStart = (clientX: number) => {
      isDragging = true
      startX = clientX
      setIsCarouselPaused(true)
      if (carousel) {
        carousel.style.cursor = 'grabbing'
      }
    }

    const handleMove = (clientX: number) => {
      if (!isDragging || !carousel) return

      currentX = clientX - startX
      carousel.style.transform = `translateX(${currentX}px)`
    }

    const handleEnd = () => {
      if (!isDragging) return

      isDragging = false
      carousel.style.cursor = 'grab'

      // Smooth return to original position
      const startPos = currentX
      const startTime = performance.now()
      const duration = 300

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const position = startPos * (1 - easeOut)

        carousel.style.transform = `translateX(${position}px)`

        if (progress < 1) {
          animationId = requestAnimationFrame(animate)
        } else {
          carousel.style.transform = 'translateX(0px)'
          setTimeout(() => setIsCarouselPaused(false), 100)
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    // Mouse events
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      handleStart(e.clientX)
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX)
    }

    const handleMouseUp = () => {
      handleEnd()
    }

    // Touch events removidos - carousel es desktop-only (hidden lg:block)

    // Add event listeners - Solo mouse para desktop
    carousel.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)

      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  // Optimized carousel animation - adaptive to device capabilities
  useEffect(() => {
    if (isCarouselPaused) return

    let animationId: number
    let lastTime = 0

    // Adaptive FPS based on device capabilities
    const getTargetFPS = () => {
      const ua = navigator.userAgent
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
      const isLowEnd = /Android.*Chrome\/[0-6][0-9]/i.test(ua) // Older Chrome versions

      if (isMobile || isLowEnd) return 30
      if (window.devicePixelRatio > 1.5) return 60
      return 60 // Default smooth rate
    }

    const targetFPS = getTargetFPS()
    const interval = 1000 / targetFPS

    const animateCarousel = (currentTime: number) => {
      if (currentTime - lastTime >= interval) {
        setCarouselX(prev => {
          // When we reach -50%, reset smoothly to 0%
          if (prev <= -50) {
            return 0
          }
          // Adaptive move speed based on FPS
          const moveSpeed = targetFPS === 30 ? 0.1 : 0.05
          return prev - moveSpeed
        })
        lastTime = currentTime
      }

      if (!isCarouselPaused) {
        animationId = requestAnimationFrame(animateCarousel)
      }
    }

    animationId = requestAnimationFrame(animateCarousel)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isCarouselPaused])

  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const themeObserverRef = useRef<MutationObserver | null>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Typing effect
  useEffect(() => {
    const typeNextCharacter = (i: number) => {
      if (i > (phrases[currentPhraseIndex]?.length || 0)) {
        // Wait 2 seconds after typing is complete, then start next phrase
        const nextPhraseTimeout = setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        }, 2000)
        timeoutsRef.current.push(nextPhraseTimeout)
        return
      }

      const timeoutId = setTimeout(() => {
        setDisplayText(phrases[currentPhraseIndex]?.slice(0, i) || '')
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
  }, [currentPhraseIndex, phrases])

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
            baseSpeed: 1.2, // Velocidad normal para mejor visibilidad
            trailLength: 0,
            // Colores mejorados para mejor visibilidad
            starColor: isDarkMode
              ? 'rgb(200, 160, 255)' // Púrpura claro en modo oscuro
              : 'rgba(60, 20, 180, 0.15)',   // Púrpura muy translúcido en modo claro
            canvasColor: isDarkMode
              ? 'rgb(8, 8, 12)'      // Azul muy oscuro en lugar de negro puro
              : 'rgb(248, 248, 252)', // Gris muy claro para modo claro
            hueJitter: 25, // Variación de color para ambos modos
            maxAcceleration: 6,
            accelerationRate: 0.15,
            decelerationRate: 0.12,
            minSpawnRadius: 100,
            maxSpawnRadius: 500,
            auto: false,                // Desactivar auto para control manual
            accelerate: false,          // Comenzar en modo normal, no hiper
            container: document.querySelector('.starfield') as HTMLElement | null,
            originElement: document.querySelector('.starfield-origin') as HTMLElement | null
          } as any)

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
              : 'rgba(60, 20, 180, 0.15)'   // Púrpura muy translúcido en modo claro

            window.Starfield.config.canvasColor = isDarkMode
              ? 'rgb(8, 8, 12)'      // Azul muy oscuro
              : 'rgb(248, 248, 252)' // Gris muy claro para modo claro

          })

          themeObserverRef.current.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
          })
        }
      }
    }

    script.onerror = () => {
      scriptRef.current = null
    }

    document.head.appendChild(script)

    return () => {
      // Robust cleanup
      if (window.Starfield) {
        try {
          window.Starfield.cleanup()
        } catch (error) {
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

  // Event handlers para el botón Comenzar - Aceleración en hover
  const handleComenzarHover = () => {
    // Activar aceleración del starfield en hover
    if (window.Starfield && window.Starfield.setAccelerate) {
      window.Starfield.setAccelerate(true)
    }
  }

  const handleComenzarLeave = () => {
    // Desactivar aceleración del starfield al salir del hover
    if (window.Starfield && window.Starfield.setAccelerate) {
      // Pequeño delay para que si inmediatamente después hay click, no interfiera
      setTimeout(() => {
        window.Starfield.setAccelerate(false)
      }, 100)
    }
  }



  const handleComenzarClick = () => {
    // Activar aceleración del starfield
    if (window.Starfield) {
      window.Starfield.setAccelerate(true)
    }

    // Esperar menos tiempo para mejor UX y luego hacer scroll
    const scrollTimeout = setTimeout(() => {
      // Verificar si existe el elemento antes de hacer scroll
      const contactElement = document.getElementById('contact')

      // Temporarily disable scroll snap for smooth navigation
      document.body.classList.add('navigating')

      if (scrollToSection) {
        try {
          scrollToSection('contact')
        } catch (error) {
          // Fallback to native scroll
          if (contactElement) {
            contactElement.scrollIntoView({ behavior: 'smooth' })
          }
        }
      } else if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' })
      }

      // Re-enable scroll snap after navigation
      setTimeout(() => {
        document.body.classList.remove('navigating')
      }, 1000)
      
      // Desactivar aceleración después del scroll con un pequeño delay
      setTimeout(() => {
        if (window.Starfield) {
          window.Starfield.setAccelerate(false)
        }
      }, 300)
    }, 500)

    // Store timeout for cleanup if component unmounts
    timeoutsRef.current.push(scrollTimeout)
  }

  return (
    <>
    <section
      id="hero"
      className="starfield min-h-screen relative overflow-hidden bg-white dark:bg-black"
      style={{
        height: '100vh',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        position: 'relative',
        // backgroundColor handled by Tailwind classes
      }}
    >
      <style>{`
        @media (min-width: 1024px) {
          .hero-content {
            top: 47% !important;
          }
        }
      `}</style>
      {/* Video Background - Eliminado para mejor visibilidad del starfield */}

      {/* Starfield canvas se insertará aquí automáticamente por starfield.js */}

      {/* Hero Content - starfield-origin según especificaciones oficiales */}
      <div
        className="hero-content starfield-origin absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center"
        style={{
          top: '52%', // Default para móvil
          maxWidth: '100vw',
          padding: '0'
        }}
      >
        <div className="w-full px-4" style={{ maxWidth: '100%' }}>

          {/* Main Content - Centered Layout */}
          <div className="text-center space-y-4" style={{ width: '100%', maxWidth: '100%', overflow: 'visible' }}>


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
                    fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em'
                    // textShadow handled by Tailwind classes
                  }}
                >
                  {t('hero.haz_que')}
                </span>
                <div
                  className="relative w-full text-center flex items-center justify-center overflow-visible -mt-1"
                  style={{
                    minHeight: 'clamp(4rem, 8vw, 8rem)',
                    maxWidth: '100vw',
                    padding: '0 0.5rem'
                  }}
                >
                  <motion.span
                    className="flex items-center justify-center font-black bg-gradient-to-r from-color-primary to-color-secondary bg-clip-text text-transparent"
                    style={{
                      fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                      whiteSpace: 'normal',
                      lineHeight: '1.1',
                      letterSpacing: '-0.02em',
                      color: '#6700f8', // Fallback color
                      maxWidth: '100%',
                      wordBreak: 'normal',
                      overflow: 'visible'
                    }}
                  >
                    {displayText}
                    <motion.span
                      className="ml-1 bg-gradient-to-r from-color-primary to-color-secondary bg-clip-text text-transparent"
                      animate={{ opacity: showCursor ? 1 : 0 }}
                      transition={{ duration: 0.1 }}
                      style={{
                        fontSize: 'inherit',
                        fontWeight: 'bold'
                      }}
                    >
                      |
                    </motion.span>
                  </motion.span>
                </div>
                <span
                  className="block font-black text-center text-black dark:text-white -mt-1"
                  style={{
                    fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em'
                    // textShadow handled by Tailwind classes
                  }}
                >
                  {t('hero.con_zentella')}
                </span>
              </h1>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-row gap-3 justify-center items-center px-4 w-full"
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
                  {t('hero.comenzar')}
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
                  // Temporarily disable scroll snap for smooth navigation
                  document.body.classList.add('navigating')

                  if (scrollToSection) {
                    scrollToSection('portfolio')
                  } else {
                    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
                  }

                  // Re-enable scroll snap after navigation
                  setTimeout(() => {
                    document.body.classList.remove('navigating')
                  }, 1000)
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="flex items-center justify-center gap-1.5">
                  {t('hero.portfolio')}
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
              className="flex flex-wrap justify-center gap-3 pt-6 lg:hidden max-w-sm mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              {[
                { key: 'photography', text: t('hero.fotografia') },
                { key: 'design', text: t('hero.diseno') },
                { key: 'video', text: t('hero.video') },
                { key: 'animation', text: t('hero.animacion') }
              ].map((service, index) => (
                <motion.div
                  key={service.key}
                  className="group relative px-4 py-2.5 bg-white/90 dark:bg-white/15 backdrop-blur-sm border border-gray-300 dark:border-transparent rounded-full text-sm font-medium text-gray-800 dark:text-white drop-shadow-sm cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderColor: "rgba(156, 163, 175, 0.8)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {service.text}
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

      {/* Client Logos Banner - Desktop Only - Fixed at bottom */}
      <motion.div
        className="hidden lg:block w-full overflow-y-hidden absolute bottom-0 left-0 right-0"
        style={{ zIndex: 50 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
              <div
                className="w-full overflow-hidden relative cursor-grab active:cursor-grabbing"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <motion.div
                  ref={carouselRef}
                  className="flex whitespace-nowrap"
                  animate={{
                    x: `${carouselX}%`
                  }}
                  transition={{
                    duration: 0,
                    ease: "linear",
                    type: "tween"
                  }}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                  }}
                >
                  {/* Primer conjunto */}
                  {clientLogos.map((client, index) => (
                    <motion.div
                      key={`first-${client.name}-${index}`}
                      className="flex-shrink-0 mx-10 inline-block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                    >
                      <motion.img
                        src={client.logo}
                        alt={`${client.name} logo`}
                        className={`h-20 w-auto object-contain opacity-60 hover:opacity-90 transition-all duration-300 filter ${
                          client.logo === '/zentella-Mesa-de-trabajo-2.png'
                            ? 'grayscale contrast-200 dark:invert'
                            : 'brightness-0 dark:brightness-0 dark:invert'
                        }`}
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                          display: 'block'
                        }}
                        loading="lazy"
                        whileHover={{
                          scale: 1.05,
                          y: -3,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      />
                    </motion.div>
                  ))}
                  {/* Segundo conjunto para seamless loop */}
                  {clientLogos.map((client, index) => (
                    <motion.div
                      key={`second-${client.name}-${index}`}
                      className="flex-shrink-0 mx-10 inline-block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: (index + clientLogos.length) * 0.05,
                        ease: "easeOut"
                      }}
                    >
                      <motion.img
                        src={client.logo}
                        alt={`${client.name} logo`}
                        className={`h-20 w-auto object-contain opacity-60 hover:opacity-90 transition-all duration-300 filter ${
                          client.logo === '/zentella-Mesa-de-trabajo-2.png'
                            ? 'grayscale contrast-200 dark:invert'
                            : 'brightness-0 dark:brightness-0 dark:invert'
                        }`}
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                          display: 'block'
                        }}
                        loading="lazy"
                        whileHover={{
                          scale: 1.05,
                          y: -3,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
      </motion.div>

    </section>
    </>
  )
}



export default Hero