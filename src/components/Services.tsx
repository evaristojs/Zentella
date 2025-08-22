import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const Services = () => {
  const { elementRef, isVisible } = useIntersectionObserver()

  const services = [
    {
      id: 1,
      title: 'Diseño & Branding',
      description: 'Identidades visuales únicas que conectan con tu audiencia y destacan en el mercado.',
      preview: '/images/services/design-preview.jpg',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-4a2 2 0 00-2-2H7M7 21V9a2 2 0 012-2h6a2 2 0 012 2v8M7 9V5a2 2 0 012-2h6a2 2 0 012 2v4H7z" /></svg>,
      features: ['Logo & Identidad Visual', 'Branding Completo', 'Packaging Design', 'Material Promocional']
    },
    {
      id: 2,
      title: 'Marketing Digital',
      description: 'Estrategias integrales para hacer crecer tu negocio en el mundo online.',
      preview: '/images/services/marketing-preview.jpg',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
      features: ['Social Media', 'Google Ads', 'Email Marketing', 'SEO & SEM']
    },
    {
      id: 3,
      title: 'Fotografía',
      description: 'Capturamos la esencia de tu marca con fotografías profesionales.',
      preview: '/images/services/photography-preview.jpg',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      features: ['Fotografía Comercial', 'Producto', 'Eventos', 'Retratos Corporativos']
    },
    {
      id: 4,
      title: 'Video & Animación',
      description: 'Contenido audiovisual que conecta emocionalmente con tu audiencia.',
      preview: '/images/services/video-preview.jpg',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      features: ['Video Corporativo', 'Animación 2D/3D', 'Motion Graphics', 'Social Media Videos']
    }
  ]

  return (
    <motion.section 
      id="services" 
      className="min-h-screen py-24 md:py-32 bg-white dark:bg-gray-950 relative snap-start"
      ref={elementRef}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-sm font-medium text-color-primary uppercase tracking-[0.2em] border border-color-primary/20 rounded-full px-6 py-2">
              Nuestros servicios
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block text-gray-900 dark:text-white mb-2">Todo lo que</span>
            <span className="block bg-gradient-to-r from-color-primary via-color-secondary to-color-accent bg-clip-text text-transparent">
              necesitas
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Soluciones integrales de marketing digital diseñadas para transformar tu visión en resultados reales
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            >
              {/* Background Card */}
              <motion.div 
                className="absolute inset-0 bg-white dark:bg-bg-secondary-dark rounded-3xl border border-text-secondary-light/10 dark:border-text-secondary-dark/10 backdrop-blur-sm shadow-lg shadow-black/5 dark:shadow-black/20"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(103, 0, 248, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              
              {/* Gradient Border on Hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 bg-gradient-to-br from-color-primary/20 via-color-secondary/20 to-color-accent/20 shadow-xl shadow-color-primary/10"
                whileHover={{ 
                  opacity: 1,
                  boxShadow: "0 30px 60px -15px rgba(103, 0, 248, 0.25)"
                }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative p-10 lg:p-12 h-full">
                {/* Icon */}
                <motion.div 
                  className="w-28 h-28 lg:w-32 lg:h-32 mb-8 relative mx-auto flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: [0, -5, 5, -5, 0],
                    transition: { rotate: { duration: 0.5 } }
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div 
                    className="w-full h-full bg-gradient-to-br from-color-primary to-color-secondary rounded-full shadow-xl absolute inset-0"
                    whileHover={{ 
                      boxShadow: "0 20px 40px -12px rgba(103, 0, 248, 0.4)",
                      background: "linear-gradient(135deg, #8001cf 0%, #6700f8 100%)"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="relative z-10 flex items-center justify-center text-white"
                    style={{ 
                      width: '48px', 
                      height: '48px'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {service.icon}
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-color-accent to-color-primary rounded-full opacity-0"
                    whileHover={{ 
                      opacity: 0.3, 
                      scale: 1.3,
                      rotate: 45
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div
                    className="absolute inset-0 border-2 border-color-primary/30 rounded-full opacity-0"
                    whileHover={{ 
                      opacity: 1, 
                      scale: 1.4,
                      borderColor: "rgba(103, 0, 248, 0.6)"
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                </motion.div>

                {/* Content */}
                <div className="space-y-8 text-center">
                  <motion.h3 
                    className="text-2xl lg:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark leading-tight"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <p className="text-base lg:text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed max-w-md mx-auto">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-5">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-center justify-center gap-4 text-text-secondary-light dark:text-text-secondary-dark"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + idx * 0.1, duration: 0.5 }}
                      >
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-color-primary to-color-secondary rounded-full flex-shrink-0 shadow-sm" />
                        <span className="font-medium text-sm lg:text-base">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.div 
                    className="pt-10"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="inline-flex items-center gap-3 text-color-primary font-semibold uppercase tracking-wider text-sm cursor-pointer hover:text-color-secondary transition-colors duration-300">
                      Ver más
                      <motion.svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.h3 
            className="text-4xl lg:text-5xl font-bold mb-8 leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <span className="block text-gray-900 dark:text-white mb-2">¿Listo para llevar</span>
            <span className="block bg-gradient-to-r from-color-primary via-color-secondary to-color-accent bg-clip-text text-transparent">
              tu marca al siguiente nivel?
            </span>
          </motion.h3>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Trabajemos juntos para crear una estrategia personalizada que impulse el crecimiento de tu negocio
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button 
              className="px-8 py-4 bg-gradient-to-r from-color-primary to-color-secondary text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Hablemos de tu proyecto
            </motion.button>
            
            <motion.button 
              className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold rounded-full hover:border-color-primary hover:text-color-primary transition-all duration-300"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver casos de éxito
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Services