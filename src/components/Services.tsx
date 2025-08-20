import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation, fadeInUp, fadeInLeft, staggerContainer } from '../hooks/useScrollAnimation'
import './Services.css'

const Services = () => {
  const [activeService, setActiveService] = useState(0)
  const { ref, controls } = useScrollAnimation()

  const services = [
    {
      title: 'Marketing Digital',
      description: 'Estrategias integrales para posicionar tu marca en el mundo digital',
      features: ['SEO/SEM', 'Social Media', 'Email Marketing', 'Analytics'],
      image: '/images/marketing-preview.gif'
    },
    {
      title: 'Fotografía',
      description: 'Capturamos la esencia de tu marca con imágenes profesionales',
      features: ['Producto', 'Corporativo', 'Eventos', 'Lifestyle'],
      image: '/images/photography-preview.gif'
    },
    {
      title: 'Diseño Gráfico',
      description: 'Identidad visual que conecta con tu audiencia',
      features: ['Branding', 'Editorial', 'Packaging', 'Digital'],
      image: '/images/design-preview.gif'
    },
    {
      title: 'Videografía',
      description: 'Historias audiovisuales que impactan y convierten',
      features: ['Comerciales', 'Corporativos', 'Documentales', 'Social Media'],
      image: '/images/video-preview.gif'
    },
    {
      title: 'Animación',
      description: 'Movimiento y vida para tus ideas más creativas',
      features: ['Motion Graphics', '2D/3D', 'Explicativos', 'Interactivos'],
      image: '/images/animation-preview.gif'
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
          <h2>SERVICIOS INTEGRALES</h2>
          <p>Soluciones creativas completas para impulsar tu marca</p>
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