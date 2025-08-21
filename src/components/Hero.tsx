import { motion } from 'framer-motion'
import { useStarfield } from '../hooks/useStarfield'

const Hero = () => {
  const starfieldRef = useStarfield({
    starColor: "rgb(103, 0, 248)",
    hueJitter: 0,
    trailLength: 0.6,
    baseSpeed: 1.5,
    maxAcceleration: 1,
    accelerationRate: 0.02,
    decelerationRate: 0.02,
    minSpawnRadius: 120,
    maxSpawnRadius: 350
  })
  const stats = [
    { value: '50+', label: 'Proyectos' },
    { value: '5+', label: 'Años' },
    { value: '100%', label: 'Satisfacción' },
  ]

  return (
    <section 
      id="hero" 
      ref={starfieldRef}
      className="min-h-screen relative overflow-hidden bg-bg-base-light dark:bg-bg-base-dark"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-color-primary" />
        </svg>
      </div>

      {/* Abstract Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-80 h-80"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.1, rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full border-4 border-color-primary rounded-full"></div>
          <div className="absolute top-4 left-4 w-72 h-72 border-2 border-color-secondary rounded-full"></div>
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-10 w-60 h-60"
          initial={{ opacity: 0, rotate: 180 }}
          animate={{ opacity: 0.05, rotate: -180 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-color-primary to-color-accent rounded-2xl transform rotate-45"></div>
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/3 w-4 h-96 bg-gradient-to-b from-transparent via-color-primary/20 to-transparent"
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="layout-container relative z-20 flex items-center min-h-screen">
        <div className="w-full max-w-6xl mx-auto">
          
          {/* Main Content - Centered Layout */}
          <div className="text-center space-y-8">
            
            {/* Badge */}
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-full border border-color-primary/20">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-color-primary rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-small font-medium text-color-primary uppercase tracking-wide">
                    Digital Creative Agency
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="heading-1 text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                <span className="block text-text-primary-light dark:text-text-primary-dark">
                  Transformamos
                </span>
                <span className="block">
                  <span className="text-text-primary-light dark:text-text-primary-dark">Ideas en </span>
                  <motion.span 
                    className="bg-gradient-to-r from-color-primary via-color-accent to-color-secondary bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Realidad
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-text-secondary-light dark:text-text-secondary-dark"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Creamos experiencias digitales excepcionales que conectan marcas con audiencias, 
              combinando creatividad, estrategia y tecnología para generar resultados medibles.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.button 
                className="group relative overflow-hidden px-8 py-4 bg-color-primary text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Comenzar Proyecto
                  <motion.svg 
                    className="w-5 h-5" 
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
                  className="absolute inset-0 bg-gradient-to-r from-color-primary to-color-secondary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.button 
                className="group px-8 py-4 border-2 border-color-primary/30 text-color-primary rounded-full font-medium text-lg hover:border-color-primary hover:bg-color-primary/5 transition-all"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-3">
                  Ver Portfolio
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 lg:gap-16 pt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-color-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-small uppercase tracking-wide text-text-secondary-light dark:text-text-secondary-dark font-medium">
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
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {['Branding', 'Diseño Web', 'Fotografía', 'Video', 'Animación'].map((service, index) => (
                <motion.div
                  key={service}
                  className="px-4 py-2 bg-bg-secondary-light dark:bg-bg-secondary-dark border border-color-primary/20 rounded-full text-small font-medium text-text-primary-light dark:text-text-primary-dark"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.3 }}
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

      {/* Floating Action */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-small text-text-secondary-light dark:text-text-secondary-dark group-hover:text-color-primary transition-colors font-medium uppercase tracking-wider">
            Explorar
          </div>
          <motion.div
            className="w-6 h-10 border-2 border-color-primary/40 rounded-full p-1 group-hover:border-color-primary transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-1 h-3 bg-color-primary rounded-full mx-auto"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero