import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const Hero = () => {
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  
  const phrases = [
    "tu marca brille",
    "tu negocio despegue", 
    "cada clic cuente",
    "tu mensaje resuene",
    "tus ideas cobren vida",
    "tu marketing impacte",
    "tus resultados sorprendan",
    "tu creatividad inspire",
    "tu marca deslumbre",
    "tu éxito sea imparable"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
    }, 3000) // Cambia cada 3 segundos

    return () => clearInterval(interval)
  }, [phrases.length])
  
  const stats = [
    { value: '50+', label: 'Proyectos' },
    { value: '5+', label: 'Años' },
    { value: '100%', label: 'Satisfacción' },
  ]

  return (
    <section 
      id="hero" 
      className="min-h-screen relative bg-bg-base-light dark:bg-bg-base-dark"
      style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}
    >
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
              <h1 className="heading-1 text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight flex flex-col items-center justify-center px-2 w-full">
                <span className="block text-text-primary-light dark:text-text-primary-dark mb-2 font-black text-center">
                  Haz que
                </span>
                <div className="relative w-full text-center h-[1.4em] flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentPhraseIndex}
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-color-primary via-color-accent to-color-secondary bg-clip-text text-transparent font-black"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                      style={{ 
                        backgroundSize: "400% 400%",
                        backgroundPosition: "0% 50%",
                        fontSize: 'clamp(1.5rem, 6vw, 8rem)',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                        width: '100%'
                      }}
                    >
                      {phrases[currentPhraseIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="block text-text-primary-light dark:text-text-primary-dark mt-2 text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-black text-center">
                  con Zentella
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-sm sm:text-base md:text-xl mx-auto leading-relaxed text-text-secondary-light dark:text-text-secondary-dark px-4 mt-4 w-full"
              style={{ maxWidth: '100%' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Transformamos tu visión en realidad exitosa.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-row gap-3 justify-center items-center pt-6 px-4 w-full"
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
                  <div className="text-4xl md:text-5xl font-bold text-color-primary mb-3">
                    {stat.value}
                  </div>
                  <div className="text-sm uppercase tracking-wide text-text-secondary-light dark:text-text-secondary-dark font-medium">
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
                  className="px-5 py-3 bg-bg-secondary-light dark:bg-bg-secondary-dark border border-color-primary/20 rounded-full text-sm font-medium text-text-primary-light dark:text-text-primary-dark"
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