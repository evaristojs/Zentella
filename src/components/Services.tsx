import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const Services = () => {
  const [activeService, setActiveService] = useState(0)
  const { elementRef, isVisible } = useIntersectionObserver()

  const services = [
    {
      id: 1,
      title: 'Diseño & Branding',
      description: 'Creamos identidades visuales únicas que conectan con tu audiencia y destacan en el mercado.',
      preview: '/images/services/design-preview.jpg',
      icon: '🎨',
      features: ['Logo & Identidad Visual', 'Branding Completo', 'Packaging Design', 'Material Promocional']
    },
    {
      id: 2,
      title: 'Marketing Digital',
      description: 'Estrategias integrales de marketing digital para hacer crecer tu negocio en el mundo online.',
      preview: '/images/services/marketing-preview.jpg',
      icon: '📱',
      features: ['Social Media', 'Google Ads', 'Email Marketing', 'SEO & SEM']
    },
    {
      id: 3,
      title: 'Fotografía',
      description: 'Capturamos la esencia de tu marca con fotografías profesionales que cuentan tu historia.',
      preview: '/images/services/photography-preview.jpg',
      icon: '📸',
      features: ['Fotografía Comercial', 'Producto', 'Eventos', 'Retratos Corporativos']
    },
    {
      id: 4,
      title: 'Video & Animación',
      description: 'Contenido audiovisual que conecta emocionalmente con tu audiencia y aumenta el engagement.',
      preview: '/images/services/video-preview.jpg',
      icon: '🎬',
      features: ['Video Corporativo', 'Animación 2D/3D', 'Motion Graphics', 'Social Media Videos']
    },
    {
      id: 5,
      title: 'Animación',
      description: 'Damos vida a tus ideas con animaciones creativas que capturan la atención de tu audiencia.',
      preview: '/images/services/animation-preview.gif',
      icon: '✨',
      features: ['Animación 2D', 'Motion Graphics', 'Logo Animado', 'Explainer Videos']
    }
  ]

  return (
    <section 
      id="services" 
      className="section-padding bg-base-100"
      ref={elementRef}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="badge badge-primary badge-lg mb-4 font-mono">SERVICIOS</div>
          <h2 className="text-section gradient-text mb-6">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Soluciones integrales para hacer crecer tu marca en el mundo digital
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Services List */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className={`card glass-effect cursor-pointer transition-all duration-300 border-l-4 ${
                  activeService === index 
                    ? 'border-primary bg-base-200/50 shadow-lg shadow-primary/10' 
                    : 'border-transparent hover:border-primary/50'
                }`}
                onClick={() => setActiveService(index)}
                initial={{ opacity: 0, x: -50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="card-body p-6">
                  <div className="flex items-start gap-4">
                    {/* Number & Icon */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="badge badge-outline badge-lg font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="text-2xl">{service.icon}</div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="card-title text-xl mb-2 gradient-text">
                        {service.title}
                      </h3>
                      <p className="text-base-content/80 mb-4 text-sm">
                        {service.description}
                      </p>
                      
                      {/* Features */}
                      <div className={`grid grid-cols-2 gap-1 transition-all duration-300 ${
                        activeService === index ? 'opacity-100 max-h-40' : 'opacity-60 max-h-20 overflow-hidden'
                      }`}>
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            <span className="text-xs text-base-content/70">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Service Preview */}
          <motion.div
            className="sticky top-32"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="card glass-effect">
              <figure className="aspect-video bg-base-200 overflow-hidden">
                <img 
                  src={services[activeService].preview} 
                  alt={services[activeService].title}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                />
              </figure>
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{services[activeService].icon}</span>
                  <h3 className="card-title gradient-text">
                    {services[activeService].title}
                  </h3>
                </div>
                <p className="text-base-content/80">
                  {services[activeService].description}
                </p>
                <div className="card-actions justify-end mt-6">
                  <button className="btn btn-primary btn-sm hover-glow">
                    Ver más
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Services