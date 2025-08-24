import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const Services = () => {
  const { elementRef, isVisible } = useIntersectionObserver()

  const services = [
    {
      id: 1,
      title: 'Diseño & Branding',
      description: 'Identidades visuales únicas que conectan con tu audiencia y destacan en el mercado.',
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-4a2 2 0 00-2-2H7M7 21V9a2 2 0 012-2h6a2 2 0 012 2v8M7 9V5a2 2 0 012-2h6a2 2 0 012 2v4H7z" /></svg>,
    },
    {
      id: 2,
      title: 'Marketing Digital',
      description: 'Estrategias integrales para hacer crecer tu negocio en el mundo online.',
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
    },
    {
      id: 3,
      title: 'Fotografía',
      description: 'Capturamos la esencia de tu marca con fotografías profesionales.',
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    },
    {
      id: 4,
      title: 'Video & Animación',
      description: 'Contenido audiovisual que conecta emocionalmente con tu audiencia.',
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    }
  ]

  return (
    <motion.section 
      id="services" 
      className="min-h-screen py-24 md:py-32 bg-bg-base-light dark:bg-bg-base-dark text-text-primary-light dark:text-text-primary-dark relative snap-start"
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
          <motion.h2 
            className="text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight font-display bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Nuestros Servicios
          </motion.h2>
          
          <motion.p 
            className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Soluciones integrales de marketing digital diseñadas para transformar tu visión en resultados reales
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative cursor-pointer p-8 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-3xl border border-gray-200/30 dark:border-gray-800/30 shadow-2xl shadow-black/30"
              initial={{ opacity: 0, y: 60 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.15 }}
              whileHover={{ y: -8, boxShadow: "0 35px 70px -12px rgba(103, 0, 248, 0.2), 0 15px 25px -5px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="relative flex flex-col items-center text-center">
                <motion.div 
                  className="w-20 h-20 mb-6 relative flex items-center justify-center bg-gradient-to-br from-color-primary to-color-secondary rounded-full shadow-lg"
                  whileHover={{ scale: 1.1, rotate: [0, -8, 8, 0] }}
                  transition={{ scale: { duration: 0.3 }, rotate: { duration: 0.6, ease: "easeInOut" } }}
                >
                  <div className="text-white">
                    {service.icon}
                  </div>
                </motion.div>

                <div className="flex-1 space-y-4">
                  <motion.h3 
                    className="text-2xl lg:text-3xl font-black leading-tight text-text-primary-light dark:text-text-primary-dark"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <p className="text-base lg:text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed max-w-sm mx-auto font-medium">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Services