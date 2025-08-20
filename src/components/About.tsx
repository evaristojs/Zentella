import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const About = () => {
  const { elementRef, isVisible } = useIntersectionObserver()

  const stats = [
    { number: '4+', label: 'Años de Experiencia', icon: '🚀' },
    { number: '100+', label: 'Proyectos Completados', icon: '📈' },
    { number: '50+', label: 'Clientes Satisfechos', icon: '⭐' },
    { number: '100%', label: 'Compromiso con la Excelencia', icon: '💎' }
  ]

  const values = [
    {
      icon: '🚀',
      title: 'Innovación',
      description: 'Creemos en la importancia de estar a la vanguardia de las tendencias y tecnologías del marketing digital.'
    },
    {
      icon: '⭐',
      title: 'Excelencia',
      description: 'Nos comprometemos a ofrecer servicios de alta calidad que superen las expectativas de nuestros clientes.'
    },
    {
      icon: '💎',
      title: 'Transparencia',
      description: 'Mantenemos una comunicación abierta y honesta con nuestros clientes, asegurando que estén informados en cada paso del proceso.'
    },
    {
      icon: '🤝',
      title: 'Trabajo en Equipo',
      description: 'Valoramos la colaboración y el trabajo conjunto, tanto dentro de nuestro equipo como con nuestros clientes.'
    }
  ]

  return (
    <section 
      id="about" 
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
          <div className="badge badge-primary badge-lg mb-4 font-mono">NOSOTROS</div>
          <h2 className="text-section gradient-text mb-6">
            Sobre Zentella
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-base-content/80 leading-relaxed">
                En <span className="gradient-text font-semibold">Zentella</span>, somos una agencia de marketing digital con más de 4 años de experiencia 
                comprometida con la innovación y la excelencia. Desde nuestros inicios, hemos trabajado 
                con dedicación para ayudar a nuestros clientes a alcanzar sus objetivos de negocio a través 
                de estrategias personalizadas y efectivas.
              </p>
              
              <div className="card glass-effect p-6 my-6">
                <h3 className="text-xl font-bold gradient-text mb-3">El Motor de Nuestra Pasión</h3>
                <p className="text-base-content/80">
                  Es proporcionar soluciones de marketing digital y publicidad 
                  que impulsen el crecimiento y el éxito de nuestros clientes. Nos esforzamos por comprender 
                  las necesidades específicas de cada cliente y desarrollar estrategias que generen resultados tangibles.
                </p>
              </div>

              <div className="card glass-effect p-6">
                <h3 className="text-xl font-bold gradient-text mb-3">La Profecía del Éxito</h3>
                <p className="text-base-content/80">
                  Ser una agencia de referencia en el sector del marketing digital 
                  y la publicidad, reconocida por nuestra creatividad, innovación y capacidad para transformar 
                  desafíos en oportunidades. Queremos ser el socio estratégico que acompaña a las empresas 
                  en su camino hacia el éxito.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="card glass-effect text-center p-6 hover-glow"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-black gradient-text mb-2">{stat.number}</div>
                <div className="text-sm text-base-content/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold gradient-text mb-6">Despega con Nosotros</h3>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg text-base-content/80 leading-relaxed">
              Nuestro equipo está compuesto por profesionales apasionados y experimentados en 
              diversas áreas del marketing digital. Cada miembro de nuestro equipo aporta su experiencia 
              y creatividad para ofrecer soluciones innovadoras y efectivas.
            </p>
            <div className="card glass-effect p-6">
              <p className="text-base-content/80">
                En Zentella, estamos aquí para ayudarte a alcanzar tus objetivos y llevar tu negocio al 
                siguiente nivel. <span className="gradient-text font-semibold">Contáctanos y descubre cómo podemos trabajar juntos para hacer realidad 
                tus metas.</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-2xl font-bold gradient-text text-center mb-12">Nuestro Universo Creativo</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="card glass-effect text-center p-6 hover-glow"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-lg font-bold gradient-text mb-3">{value.title}</h4>
                <p className="text-sm text-base-content/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About