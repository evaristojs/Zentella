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
      className="min-h-screen py-12 md:py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden snap-start"
      ref={elementRef}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-color-primary/5 to-color-secondary/5 rounded-full blur-3xl"
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-color-secondary/5 to-color-primary/5 rounded-full blur-3xl"
        animate={{ 
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="layout-container relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-color-primary/10 text-color-primary rounded-xl px-4 py-2 text-small font-medium mb-4 inline-block">
            Nuestros servicios
          </span>
          <h2 className="heading-1 lg:text-4xl mb-4 text-text-primary-light dark:text-text-primary-dark">
            Todo lo que necesitas para <span className="text-color-primary">hacer crecer</span> tu marca
          </h2>
          <p className="text-base max-w-2xl mx-auto">
            Soluciones integrales de marketing digital diseñadas para transformar tu visión en resultados reales
          </p>
        </motion.div>

        <div className="grid-mobile sm:grid-tablet lg:grid-desktop-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="card-base group cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(103, 0, 248, 0.1)' 
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-color-primary/5 to-color-secondary/5 rounded-xl opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(103, 0, 248, 0.1) 50%, transparent 70%)',
                  backgroundSize: '200% 200%'
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              
              <div className="relative z-10">
                <motion.div 
                  className="w-12 h-12 bg-color-primary rounded-xl flex items-center justify-center text-white mb-4 relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 10,
                    boxShadow: '0 8px 25px rgba(103, 0, 248, 0.4)'
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Icon pulse effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-xl"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ 
                      scale: [0, 1.2, 0],
                      opacity: [0, 0.6, 0] 
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {service.icon}
                  </motion.div>
                </motion.div>

                <motion.h3 
                  className="heading-3 mb-3 text-text-primary-light dark:text-text-primary-dark"
                  whileHover={{ 
                    color: "rgb(103, 0, 248)",
                    x: 4
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {service.title}
                </motion.h3>
                
                <motion.p 
                  className="text-small mb-4 leading-relaxed"
                  whileHover={{ opacity: 0.8 }}
                >
                  {service.description}
                </motion.p>

                <ul className="space-y-2">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-center gap-2 text-small"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.3 }}
                      whileHover={{ x: 4, color: "rgb(103, 0, 248)" }}
                    >
                      <motion.div 
                        className="w-1.5 h-1.5 bg-color-primary rounded-full"
                        whileHover={{ 
                          scale: 1.5,
                          boxShadow: '0 0 8px rgba(103, 0, 248, 0.6)'
                        }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.div 
                  className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                  whileHover={{ borderColor: "rgba(103, 0, 248, 0.3)" }}
                >
                  <motion.span 
                    className="text-small font-medium text-color-primary flex items-center gap-2"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Conocer más
                    <motion.svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      whileHover={{ x: 3, rotate: -15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="card-base max-w-4xl mx-auto text-center">
            <h3 className="heading-2 lg:text-3xl mb-4 text-text-primary-light dark:text-text-primary-dark">
              ¿Listo para llevar tu marca al <span className="text-color-primary">siguiente nivel?</span>
            </h3>
            <p className="text-base mb-8 max-w-2xl mx-auto">
              Trabajemos juntos para crear una estrategia personalizada que impulse el crecimiento de tu negocio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="btn-primary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Hablemos de tu proyecto
              </button>
              <button 
                className="btn-secondary"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver casos de éxito
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Services