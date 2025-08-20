import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const heroImages = [
    '/images/hero-1.jpg',
    '/images/hero-2.jpg',
    '/images/hero-3.jpg'
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
    <section id="hero" className="hero">
      <div className="hero-background">
        {!isVideoPlaying ? (
          <div className="hero-images">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`hero-image ${index === currentImageIndex ? 'active' : ''}`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
          </div>
        ) : (
          <video
            className="hero-video"
            autoPlay
            muted
            controls
            onEnded={() => setIsVideoPlaying(false)}
          >
            <source src="/videos/zentella-reel-2025.mp4" type="video/mp4" />
          </video>
        )}
        <div className="hero-overlay" />
      </div>

      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h1>
            <motion.span 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              AGENCIA DE MARKETING DIGITAL
            </motion.span>
            <motion.span 
              className="hero-title"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              ZENTELLA
            </motion.span>
            <motion.span 
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              Transforma tu marca en una estrella con la magia de Zentella.<br />
              <strong>Donde la creatividad se encuentra con el rendimiento.</strong>
            </motion.span>
          </h1>
        </motion.div>

        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <button className="play-reel-btn" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
            <span className="play-icon">🚀</span>
            ¡DESPEGAR CON NOSOTROS!
          </button>
        </motion.div>

        <motion.div 
          className="hero-coordinates"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <p>20°58'17.4"N 89°37'18.6"W</p>
        </motion.div>
      </motion.div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  )
}

export default Hero