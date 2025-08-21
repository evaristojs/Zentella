import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const Hero = () => {
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  
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

  // Typing effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    let timeoutId: number

    const typeText = async () => {
      setDisplayText('')
      
      for (let i = 0; i <= currentPhrase.length; i++) {
        await new Promise(resolve => {
          timeoutId = setTimeout(() => {
            setDisplayText(currentPhrase.slice(0, i))
            resolve(void 0)
          }, 100)
        })
      }
      
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
  
  const stats = [
    { value: '50+', label: 'Proyectos' },
    { value: '5+', label: 'Años' },
    { value: '100%', label: 'Satisfacción' },
  ]

  return (
    <section 
      id="hero" 
      className="min-h-screen relative overflow-hidden"
      style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.3) contrast(1.2) saturate(0.8) blur(1px)' }}
        >
          <source src="/videos/portfolio/videography/timehomes-maria-teresa-condos.mp4" type="video/mp4" />
          <source src="/videos/portfolio/videography/ambiente-chic-grand-opening.mp4" type="video/mp4" />
          <source src="/videos/portfolio/videography/beeroclock-navidad.mp4" type="video/mp4" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-base-light/20 dark:to-bg-base-dark/20"></div>
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
                <span className="block text-white mb-2 font-black text-center drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Haz que
                </span>
                <div className="relative w-full text-center h-[1.6em] flex items-center justify-center overflow-hidden">
                  <motion.span
                    className="flex items-center justify-center bg-gradient-to-r from-color-primary via-color-accent to-color-secondary bg-clip-text text-transparent font-black"
                    style={{ 
                      backgroundSize: "400% 400%",
                      backgroundPosition: "0% 50%",
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
                <span className="block text-white mt-2 text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black text-center drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
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
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
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
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
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

            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 lg:gap-16 pt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-md" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm uppercase tracking-wide text-gray-200 font-medium drop-shadow-sm" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Services Pills */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              {['Branding', 'Diseño Web', 'Fotografía', 'Video', 'Animación'].map((service, index) => (
                <motion.div
                  key={service}
                  className="px-5 py-3 bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium text-white drop-shadow-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(103, 0, 248, 0.1)",
                    borderColor: "rgba(103, 0, 248, 0.5)" 
                  }}
                >
                  {service}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero