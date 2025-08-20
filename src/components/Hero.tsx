import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const heroImages = [
    '/images/hero/hero-1.jpg',
    '/images/hero/hero-2.jpg',
    '/images/hero/hero-3.jpg'
  ]

  useEffect(() => {
    if (!isVideoPlaying) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isVideoPlaying])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images/Video */}
      <div className="absolute inset-0 z-0">
        {!isVideoPlaying ? (
          <div className="relative w-full h-full">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-2000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
          </div>
        ) : (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            controls
            onEnded={() => setIsVideoPlaying(false)}
          >
            <source src="/videos/zentella-reel-2025.mp4" type="video/mp4" />
          </video>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-base-100/70 via-primary/30 to-base-100/80"></div>
      </div>

      {/* Hero Content */}
      <motion.div 
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Subtitle */}
          <motion.div
            className="badge badge-lg glass-effect mb-8 font-mono tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            AGENCIA DE MARKETING DIGITAL
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-hero gradient-text mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            ZENTELLA
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl mb-12 text-base-content/90 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            Transforma tu marca en una estrella con la magia de Zentella.
            <br />
            <span className="font-semibold gradient-text">
              Donde la creatividad se encuentra con el rendimiento.
            </span>
          </motion.p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <button 
            className="btn btn-primary btn-lg glass-effect hover-glow group"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-2xl group-hover:animate-pulse">🚀</span>
            ¡DESPEGAR CON NOSOTROS!
            <svg 
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>

        {/* Coordinates */}
        <motion.div
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <div className="badge badge-ghost glass-effect font-mono text-xs">
            20°58'17.4"N 89°37'18.6"W
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-base-content/60 hover:text-base-content/80 transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="w-px h-8 bg-gradient-to-b from-primary to-secondary animate-pulse"></div>
        <span className="text-xs font-mono tracking-wider uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}

export default Hero