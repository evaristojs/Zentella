import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const Hero = () => {
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const heroRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })
  
  const phrases = [
    "tu marca brille",
    "tu negocio crezca", 
    "cada clic cuente",
    "tu mensaje impacte",
    "tus ideas vivan",
    "tu marketing funcione",
    "tus ventas suban",
    "tu marca destaque",
    "tu proyecto triunfe",
    "tu éxito sea real"
  ]

  const testimonials = [
    { text: "Zentella transformó completamente nuestra presencia digital", author: "CEO, TechStart" },
    { text: "ROI del 300% en los primeros 6 meses", author: "Director, GrowthCo" },
    { text: "El mejor equipo creativo con el que hemos trabajado", author: "Fundador, InnovateNow" }
  ]

  // Typing effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    let timeoutId: NodeJS.Timeout

    const typeText = async () => {
      setIsTyping(true)
      setDisplayText('')
      
      for (let i = 0; i <= currentPhrase.length; i++) {
        await new Promise(resolve => {
          timeoutId = setTimeout(() => {
            setDisplayText(currentPhrase.slice(0, i))
            resolve(void 0)
          }, 100)
        })
      }
      
      setIsTyping(false)
      
      // Wait before starting next phrase
      timeoutId = setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
      }, 2000)
    }

    typeText()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [currentPhraseIndex, phrases])

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(interval)
  }, [])

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  const stats = [
    { value: '50+', label: 'Proyectos' },
    { value: '5+', label: 'Años' },
    { value: '100%', label: 'Satisfacción' },
  ]

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="min-h-screen relative overflow-hidden cursor-none"
      style={{ 
        background: 'linear-gradient(-45deg, #f8fafc, #e2e8f0, #cbd5e1, #94a3b8)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite'
      }}
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-color-primary to-color-secondary rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: springX,
          top: springY,
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-color-primary/30 rounded-full"
            animate={{
              y: [Math.random() * window.innerHeight, -50],
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-16 pb-16 px-2 sm:px-4" style={{ width: '100%', maxWidth: '100vw' }}>
        <div className="w-full" style={{ maxWidth: '100%' }}>
          
          {/* Main Content - Centered Layout */}
          <div className="text-center space-y-4" style={{ width: '100%', maxWidth: '100%' }}>
            

            {/* Main Headline with Rotating Phrases */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="heading-1 text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black leading-tight tracking-tight flex flex-col items-center justify-center px-2 w-full">
                <span className="block text-text-primary-light dark:text-text-primary-dark mb-2 font-black text-center">
                  Haz que
                </span>
                <div className="relative w-full text-center h-[1.6em] flex items-center justify-center overflow-hidden">
                  <motion.span
                    className="flex items-center justify-center bg-gradient-to-r from-color-primary via-color-accent to-color-secondary bg-clip-text text-transparent font-black"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ 
                      backgroundSize: "400% 400%",
                      fontSize: 'clamp(2.5rem, 9vw, 11rem)',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%',
                      width: '100%',
                      lineHeight: '1.1'
                    }}
                  >
                    {displayText}
                    <motion.span
                      className="ml-1 text-color-primary"
                      animate={{ opacity: showCursor ? 1 : 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      |
                    </motion.span>
                  </motion.span>
                </div>
                <span className="block text-text-primary-light dark:text-text-primary-dark mt-2 text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black text-center">
                  con Zentella
                </span>
              </h1>
            </motion.div>


            {/* New Promo Badge */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-full text-green-600 dark:text-green-400 text-sm font-medium"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(34, 197, 94, 0.3)',
                    '0 0 40px rgba(34, 197, 94, 0.5)',
                    '0 0 20px rgba(34, 197, 94, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎉 Nuevos clientes: 20% descuento
              </motion.div>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 pt-4 px-4 w-full"
              style={{ maxWidth: '100%' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.button 
                className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-color-primary to-color-secondary text-white rounded-2xl font-semibold text-sm shadow-2xl min-h-[44px] touch-manipulation backdrop-blur-sm border border-white/20"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: '0 20px 40px rgba(103, 0, 248, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <motion.span
                    whileHover={{ x: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    🚀
                  </motion.span>
                  Comenzar Proyecto
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ x: 3, rotate: 15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-color-secondary to-color-primary opacity-0 rounded-2xl"
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.button 
                className="group px-6 py-3 bg-white/10 dark:bg-black/20 border-2 border-color-primary/50 text-color-primary dark:text-color-primary rounded-2xl font-semibold text-sm min-h-[44px] touch-manipulation backdrop-blur-md shadow-lg"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  borderColor: 'rgba(103, 0, 248, 0.8)',
                  backgroundColor: 'rgba(103, 0, 248, 0.1)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    👁️
                  </motion.span>
                  Ver Portfolio
                </span>
              </motion.button>

              <motion.button 
                className="group px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 text-amber-600 dark:text-amber-400 rounded-2xl font-semibold text-sm min-h-[44px] touch-manipulation backdrop-blur-md shadow-lg"
                onClick={() => window.open('https://calendly.com/zentella', '_blank')}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: '0 20px 40px rgba(245, 158, 11, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💬
                  </motion.span>
                  Consulta Gratis
                </span>
              </motion.button>
            </motion.div>

            {/* Testimonial Rotativo */}
            <motion.div
              className="max-w-2xl mx-auto pt-8 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhraseIndex % testimonials.length}
                  className="text-center p-6 bg-white/5 dark:bg-black/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3 italic">
                    "{testimonials[currentPhraseIndex % testimonials.length].text}"
                  </div>
                  <div className="text-sm text-color-primary font-semibold">
                    - {testimonials[currentPhraseIndex % testimonials.length].author}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 lg:gap-16 pt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -5
                  }}
                >
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold text-color-primary mb-3 relative"
                    animate={{ 
                      textShadow: [
                        '0 0 10px rgba(103, 0, 248, 0.5)',
                        '0 0 20px rgba(103, 0, 248, 0.8)',
                        '0 0 10px rgba(103, 0, 248, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.value}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-color-primary to-color-secondary bg-clip-text text-transparent"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {stat.value}
                    </motion.div>
                  </motion.div>
                  <div className="text-sm uppercase tracking-wide text-text-secondary-light dark:text-text-secondary-dark font-medium group-hover:text-color-primary transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Services Pills */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              {[
                { name: 'Branding', icon: '🎨', color: 'from-pink-500/20 to-purple-500/20 border-pink-500/30' },
                { name: 'Diseño Web', icon: '💻', color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
                { name: 'Fotografía', icon: '📸', color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30' },
                { name: 'Video', icon: '🎬', color: 'from-orange-500/20 to-red-500/20 border-orange-500/30' },
                { name: 'Animación', icon: '✨', color: 'from-violet-500/20 to-indigo-500/20 border-violet-500/30' }
              ].map((service, index) => (
                <motion.div
                  key={service.name}
                  className={`px-4 py-2 bg-gradient-to-r ${service.color} backdrop-blur-sm border rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer group relative overflow-hidden`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.4, type: "spring" }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -3,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2 relative z-10">
                    <motion.span
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {service.icon}
                    </motion.span>
                    {service.name}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-color-primary/10 to-color-secondary/10 opacity-0 rounded-2xl"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="flex justify-center pt-16 pb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <motion.div
                className="flex flex-col items-center gap-2 cursor-pointer group"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium group-hover:text-color-primary transition-colors">
                  Descubre más
                </span>
                <motion.svg
                  className="w-6 h-6 text-color-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero