import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-bg-base-light dark:bg-bg-base-dark">
      <div className="layout-container">
        <div className="grid-mobile md:grid-tablet items-center">
          
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-color-primary/10 text-color-primary rounded-xl px-4 py-2 text-small font-medium">
                Agencia de Marketing Digital
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="heading-1 lg:text-4xl xl:text-5xl leading-tight text-text-primary-light dark:text-text-primary-dark">
                Construimos marcas 
                <span className="text-color-primary"> extraordinarias</span>
              </h1>
            </motion.div>

            <motion.p
              className="text-base leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Transformamos ideas en experiencias digitales que conectan, 
              inspiran y generan resultados reales para tu negocio.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button 
                className="btn-primary flex items-center justify-center gap-2"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.3, ease: "easeInOut" }}
              >
                Trabajemos juntos
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
              </motion.button>
              
              <motion.button 
                className="btn-secondary"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.3, ease: "easeInOut" }}
              >
                Ver nuestro trabajo
              </motion.button>
            </motion.div>

            <motion.div
              className="flex gap-8 pt-8 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div>
                <div className="heading-2 text-color-primary">50+</div>
                <div className="text-small">Proyectos</div>
              </div>
              <div>
                <div className="heading-2 text-color-primary">5+</div>
                <div className="text-small">Años experiencia</div>
              </div>
              <div>
                <div className="heading-2 text-color-primary">100%</div>
                <div className="text-small">Satisfacción</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative z-10">
              <div className="aspect-square bg-color-primary/10 rounded-2xl overflow-hidden card-base">
                <img 
                  src="/images/hero/hero-1.jpg" 
                  alt="Zentella Creative Work" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <motion.div
                className="absolute -top-4 -left-4 card-base-static w-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-color-primary rounded-xl flex items-center justify-center mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <motion.svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </motion.svg>
                </motion.div>
                <div className="text-small font-medium text-text-primary-light dark:text-text-primary-dark">Creativo</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 card-base-static w-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-color-success rounded-xl flex items-center justify-center mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <motion.svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ rotate: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </motion.svg>
                </motion.div>
                <div className="text-small font-medium text-text-primary-light dark:text-text-primary-dark">Resultados</div>
              </motion.div>
            </div>

            <div className="absolute inset-0 bg-color-primary/5 rounded-2xl transform rotate-3 -z-10"></div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="text-small group-hover:text-text-primary-light dark:group-hover:text-text-primary-dark hover-smooth font-medium uppercase tracking-wider">
          Descubre más
        </div>
        <motion.div
          className="w-px h-8 bg-color-primary"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}

export default Hero