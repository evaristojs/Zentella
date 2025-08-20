import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation, fadeInUp, fadeInLeft, staggerContainer } from '../hooks/useScrollAnimation'
import './Services.css'

const Services = () => {
  const [activeService, setActiveService] = useState(0)
  const { ref, controls } = useScrollAnimation()

  const services = [
    {
      title: 'Estrategia Publicitaria',
      description: 'Desarrollamos campañas publicitarias que captan la atención de tu audiencia y generan resultados',
      features: ['Campañas Creativas', 'Publicidad Digital', 'Branding', 'ROI Optimizado'],
      image: '/images/services/marketing-preview.jpg'
    },
    {
      title: 'Marketing Digital',
      description: 'Implementamos estrategias de marketing digital que aumentan la visibilidad de tu marca y mejoran tu presencia en línea',
      features: ['SEO', 'SEM', 'Email Marketing', 'Analytics'],
      image: '/images/services/marketing-preview.jpg'
    },
    {
      title: 'Gestión de Redes Sociales',
      description: 'Creamos y gestionamos contenido en redes sociales para construir y fortalecer la relación con tus seguidores',
      features: ['Content Creation', 'Community Management', 'Social Media Ads', 'Influencer Marketing'],
      image: '/images/services/photography-preview.jpg'
    },
    {
      title: 'SEO',
      description: 'Optimizamos tu sitio web para mejorar su posicionamiento en los motores de búsqueda y atraer tráfico orgánico',
      features: ['On-Page SEO', 'Technical SEO', 'Link Building', 'Local SEO'],
      image: '/images/services/design-preview.jpg'
    },
    {
      title: 'Creación de Contenido',
      description: 'Desarrollamos contenido de alta calidad que resuena con tu audiencia y refuerza tu mensaje de marca',
      features: ['Copywriting', 'Diseño Gráfico', 'Video Content', 'Photography'],
      image: '/images/services/animation-preview.gif'
    }
  ]

  return (
    <motion.section 
      id="services" 
      className="services"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
    >
      <div className="container">
        <motion.div className="services-header" variants={fadeInUp}>
          <h2>LAS ÓRBITAS QUE TRAZAMOS</h2>
          <p>Impulsa tu éxito con estrategias que no solo impactan, ¡sorprenden!</p>
        </motion.div>

        <motion.div className="services-grid" variants={fadeInUp}>
          <motion.div className="services-list" variants={fadeInLeft}>
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-item ${index === activeService ? 'active' : ''}`}
                onMouseEnter={() => setActiveService(index)}
              >
                <div className="service-number">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div className="services-preview" variants={fadeInUp}>
            <div className="preview-container">
              <img
                src={services[activeService].image}
                alt={services[activeService].title}
                className="preview-image"
              />
              <div className="preview-overlay">
                <h4>{services[activeService].title}</h4>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Services