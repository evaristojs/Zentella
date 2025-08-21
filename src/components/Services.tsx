import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
// Asegúrate de instalar heroicons: npm install @heroicons/react
import { SwatchIcon, MegaphoneIcon, CameraIcon, VideoCameraIcon } from '@heroicons/react/24/outline'

const Services = () => {
  const { elementRef, isVisible } = useIntersectionObserver()

  const services = [
    {
      id: 1,
      title: 'Diseño & Branding',
      description: 'Identidades visuales únicas que conectan con tu audiencia y destacan en el mercado.',
      preview: '/images/services/design-preview.jpg',
      icon: <SwatchIcon className="w-6 h-6" />,
      features: ['Logo & Identidad Visual', 'Branding Completo', 'Packaging Design', 'Material Promocional']
    },
    {
      id: 2,
      title: 'Marketing Digital',
      description: 'Estrategias integrales para hacer crecer tu negocio en el mundo online.',
      preview: '/images/services/marketing-preview.jpg',
      icon: <MegaphoneIcon className="w-6 h-6" />,
      features: ['Social Media', 'Google Ads', 'Email Marketing', 'SEO & SEM']
    },
    {
      id: 3,
      title: 'Fotografía',
      description: 'Capturamos la esencia de tu marca con fotografías profesionales.',
      preview: '/images/services/photography-preview.jpg',
      icon: <CameraIcon className="w-6 h-6" />,
      features: ['Fotografía Comercial', 'Producto', 'Eventos', 'Retratos Corporativos']
    },
    {
      id: 4,
      title: 'Video & Animación',
      description: 'Contenido audiovisual que conecta emocionalmente con tu audiencia.',
      preview: '/images/services/video-preview.jpg',
      icon: <VideoCameraIcon className="w-6 h-6" />,
      features: ['Video Corporativo', 'Animación 2D/3D', 'Motion Graphics', 'Social Media Videos']
    }
  ]

  return (
    <section 
      id="services" 
      className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900"
      ref={elementRef}
    >
      <div className="layout-container">
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
              className="card-base group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
            >
              <motion.div 
                className="w-12 h-12 bg-color-primary rounded-xl flex items-center justify-center text-white mb-4 transition-transform duration-300 ease-in-out"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                {service.icon}
              </motion.div>

              <h3 className="heading-3 mb-3 group-hover:text-color-primary transition-colors duration-300 text-text-primary-light dark:text-text-primary-dark">
                {service.title}
              </h3>
              <p className="text-small mb-4 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-small">
                    <div className="w-1.5 h-1.5 bg-color-primary rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-small font-medium text-color-primary group-hover:underline">
                  Conocer más
                </span>
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
    </section>
  )
}

export default Services