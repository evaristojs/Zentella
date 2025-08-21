import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const About = () => {
  const { elementRef, isVisible } = useIntersectionObserver()

  const stats = [
    { number: '5+', label: 'Años de Experiencia' },
    { number: '50+', label: 'Proyectos Completados' },
    { number: '100%', label: 'Clientes Satisfechos' },
    { number: '24/7', label: 'Soporte Disponible' }
  ]

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Innovación',
      description: 'Siempre a la vanguardia de las últimas tendencias y tecnologías del marketing digital.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Calidad',
      description: 'Comprometidos con la excelencia en cada proyecto que desarrollamos.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Colaboración',
      description: 'Trabajamos estrechamente contigo para lograr los mejores resultados.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Resultados',
      description: 'Enfocados en generar un impacto real y medible en tu negocio.'
    }
  ]

  return (
    <section 
      id="about" 
      className="py-12 md:py-20 bg-white dark:bg-bg-base-dark"
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
            Nosotros
          </span>
          <h2 className="heading-1 lg:text-4xl mb-4 text-text-primary-light dark:text-text-primary-dark">
            Conoce a <span className="text-color-primary">Zentella</span>
          </h2>
          <p className="text-base max-w-2xl mx-auto">
            Una agencia comprometida con transformar ideas en resultados extraordinarios
          </p>
        </motion.div>

        <div className="grid-mobile lg:grid-desktop-3 gap-12 mb-16">
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <p className="text-base leading-relaxed text-text-primary-light dark:text-text-primary-dark">
                En <span className="text-color-primary font-semibold">Zentella</span>, somos más que una agencia de marketing digital. 
                Somos tus aliados estratégicos en el camino hacia el éxito digital. Con más de 5 años de experiencia, 
                hemos ayudado a decenas de empresas a transformar su presencia online y alcanzar sus objetivos de negocio.
              </p>
              
              <div className="card-base my-8">
                <h3 className="heading-3 text-color-primary mb-3">Nuestra Misión</h3>
                <p className="text-base">
                  Democratizar el marketing digital de alta calidad, proporcionando soluciones innovadoras 
                  y accesibles que impulsen el crecimiento sostenible de nuestros clientes.
                </p>
              </div>

              <div className="card-base">
                <h3 className="heading-3 text-color-primary mb-3">Nuestra Visión</h3>
                <p className="text-base">
                  Ser la agencia de referencia en Latinoamérica, reconocida por nuestra capacidad 
                  de transformar desafíos digitales en oportunidades de crecimiento real.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="card-base text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <div className="heading-1 lg:text-4xl text-color-primary mb-2">{stat.number}</div>
                <div className="text-small font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="heading-2 lg:text-3xl mb-4 text-text-primary-light dark:text-text-primary-dark">
              Nuestros <span className="text-color-primary">valores</span>
            </h3>
            <p className="text-base max-w-2xl mx-auto">
              Los principios que guían cada decisión y proyecto que desarrollamos
            </p>
          </div>
          
          <div className="grid-mobile md:grid-tablet lg:grid-desktop-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="card-base text-center group"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
              >
                <div className="w-16 h-16 bg-color-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 hover-smooth">
                  {value.icon}
                </div>
                <h4 className="heading-3 mb-3 group-hover:text-color-primary hover-smooth text-text-primary-light dark:text-text-primary-dark">
                  {value.title}
                </h4>
                <p className="text-small leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div className="card-base max-w-3xl mx-auto text-center">
            <h3 className="heading-2 lg:text-3xl mb-4 text-text-primary-light dark:text-text-primary-dark">
              ¿Listo para <span className="text-color-primary">comenzar tu transformación digital?</span>
            </h3>
            <p className="text-base mb-6">
              Conversemos sobre cómo podemos hacer crecer tu negocio juntos
            </p>
            <button 
              className="btn-primary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conversemos
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About