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
      description: 'Identidades visuales únicas que conectan con tu audiencia y destacan en el mercado.',
      preview: '/images/services/design-preview.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      features: ['Logo & Identidad Visual', 'Branding Completo', 'Packaging Design', 'Material Promocional']
    },
    {
      id: 2,
      title: 'Marketing Digital',
      description: 'Estrategias integrales para hacer crecer tu negocio en el mundo online.',
      preview: '/images/services/marketing-preview.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: ['Social Media', 'Google Ads', 'Email Marketing', 'SEO & SEM']
    },
    {
      id: 3,
      title: 'Fotografía',
      description: 'Capturamos la esencia de tu marca con fotografías profesionales.',
      preview: '/images/services/photography-preview.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      features: ['Fotografía Comercial', 'Producto', 'Eventos', 'Retratos Corporativos']
    },
    {
      id: 4,
      title: 'Video & Animación',
      description: 'Contenido audiovisual que conecta emocionalmente con tu audiencia.',
      preview: '/images/services/video-preview.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      features: ['Video Corporativo', 'Animación 2D/3D', 'Motion Graphics', 'Social Media Videos']
    }
  ]

  return (
    <section 
      id="services" 
      className="section-padding bg-base-200/50"
      ref={elementRef}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-primary badge-lg mb-4 font-medium">
            Nuestros servicios
          </span>
          <h2 className="text-section mb-4">
            Todo lo que necesitas para <span className="gradient-text">hacer crecer</span> tu marca
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Soluciones integrales de marketing digital diseñadas para transformar tu visión en resultados reales
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="clean-card p-6 hover-lift group cursor-pointer"
              onClick={() => setActiveService(index)}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-base-content/70 text-sm mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-base-content/60">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn More */}
              <div className="mt-6 pt-4 border-t border-base-300">
                <span className="text-sm font-medium text-primary group-hover:underline">
                  Conocer más
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="clean-card p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              ¿Listo para llevar tu marca al <span className="gradient-text">siguiente nivel?</span>
            </h3>
            <p className="text-base-content/70 mb-8 max-w-2xl mx-auto">
              Trabajemos juntos para crear una estrategia personalizada que impulse el crecimiento de tu negocio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="btn btn-primary btn-lg hover-lift"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Hablemos de tu proyecto
              </button>
              <button 
                className="btn btn-outline btn-lg hover-lift"
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