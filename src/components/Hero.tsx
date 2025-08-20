import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="badge badge-primary badge-lg font-medium">
                Agencia de Marketing Digital
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-hero leading-tight">
                Construimos marcas 
                <span className="gradient-text"> extraordinarias</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-base-content/70 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Transformamos ideas en experiencias digitales que conectan, 
              inspiran y generan resultados reales para tu negocio.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button 
                className="btn btn-primary btn-lg hover-lift"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Trabajemos juntos
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <button 
                className="btn btn-outline btn-lg hover-lift"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver nuestro trabajo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 pt-8 border-t border-base-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div>
                <div className="text-2xl font-bold gradient-text">50+</div>
                <div className="text-sm text-base-content/60">Proyectos</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">5+</div>
                <div className="text-sm text-base-content/60">Años experiencia</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">100%</div>
                <div className="text-sm text-base-content/60">Satisfacción</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative z-10">
              {/* Main Image/Video Placeholder */}
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl overflow-hidden clean-card">
                <img 
                  src="/images/hero/hero-1.jpg" 
                  alt="Zentella Creative Work" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Cards */}
              <motion.div
                className="absolute -top-4 -left-4 bg-base-100 p-4 rounded-2xl shadow-lg clean-card"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="mt-2 text-sm font-medium">Creativo</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-base-100 p-4 rounded-2xl shadow-lg clean-card"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="mt-2 text-sm font-medium">Resultados</div>
              </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl transform rotate-3 -z-10"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="text-xs text-base-content/60 group-hover:text-base-content/80 transition-colors font-medium uppercase tracking-wider">
          Descubre más
        </div>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-primary to-secondary"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}

export default Hero