import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useState } from 'react'

const About = () => {
  const { elementRef, isVisible } = useIntersectionObserver()


  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Innovación',
      description: 'Creamos ideas únicas y distintivas que moldean la identidad de tu marca.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Responsabilidad',
      description: 'Comprometidos éticamente con el medio ambiente y la sociedad.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Pasión',
      description: 'Amor por lo que hacemos, reflejado en cada proyecto que desarrollamos.'
    }
  ]

  const teamMembers = [
    { 
      name: "Ángel Reyes", 
      role: "Director Creativo",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
      name: "Stephanía García", 
      role: "Directora de Marketing",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
      name: "Ana García", 
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmVzc2lvbmFsJTIwcGVvcGxlfGVufDB8fDB8fHww"
    },
    { 
      name: "Colaborador Creativo", 
      role: "Diseñador Senior",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsJTIwcGVvcGxlfGVufDB8fDB8fHww"
    },
    { 
      name: "Especialista Digital", 
      role: "Growth Manager",
      image: "https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2Zlc3Npb25hbCUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    { 
      name: "Estratega de Marca", 
      role: "Brand Manager",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const updateCarousel = (newIndex: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((newIndex + teamMembers.length) % teamMembers.length)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 800)
  }

  const getCardClass = (index: number) => {
    const offset = (index - currentIndex + teamMembers.length) % teamMembers.length
    
    if (offset === 0) return 'center'
    if (offset === 1) return 'right-1'
    if (offset === 2) return 'right-2'
    if (offset === teamMembers.length - 1) return 'left-1'
    if (offset === teamMembers.length - 2) return 'left-2'
    return 'hidden'
  }

  return (
    <section 
      id="about" 
      className="min-h-screen py-12 md:py-20 bg-white dark:bg-bg-base-dark snap-start"
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
          <h2 className="heading-1 text-4xl lg:text-5xl xl:text-6xl font-black mb-6 bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent">
            Conoce a Zentella
          </h2>
          <p className="text-base max-w-4xl mx-auto leading-relaxed">
            Nos dedicamos a la planificación, creación y comunicación en los diversos canales digitales para el posicionamiento de las marcas, a través de campañas impactantes y estrategias personalizadas para cada cliente.
          </p>
        </motion.div>

        {/* Misión, Visión y Valores */}
        <div className="grid-mobile lg:grid-cols-1 gap-12 mb-16">
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Misión */}
            <div className="card-base-static">
              <h3 className="heading-2 text-color-primary mb-4">Misión</h3>
              <p className="text-base leading-relaxed">
                Potenciar los proyectos de todos los emprendedores y hacerlos crecer sea cual sea el punto en el que se encuentren. Ofrecemos soluciones avanzadas de mercadeo de forma personalizada que permiten mejorar la competitividad y productividad de tu marca, producto o servicio, generando un impacto en conversiones efectivas al fidelizar el mercado y promover el crecimiento organizacional de nuestros clientes.
              </p>
            </div>

            {/* Visión */}
            <div className="card-base-static">
              <h3 className="heading-2 text-color-primary mb-4">Visión</h3>
              <p className="text-base leading-relaxed">
                Nuestra visión es ser una Agencia de Marketing capaz de proponer campañas, técnicas y herramientas de comunicación a todas aquellas empresas que tengan algo que decir a quien quiera escuchar su mensaje. Favoreceremos el encuentro de nuestros clientes y su entorno logrando la satisfacción de todas las partes, siempre desde el compromiso ético, medio-ambiental y social.
              </p>
            </div>

            {/* Valores */}
            <div className="card-base-static">
              <h3 className="heading-2 text-color-primary mb-4">Valores</h3>
              <p className="text-base leading-relaxed mb-6">
                Destacamos la comunicación y la profesionalidad, ante todo, no solo con el cliente sino como cultura interna del equipo. Tomamos el <strong>Kaizen</strong> como filosofía de mejora continua para llegar a alcanzar todos nuestros objetivos y los de las empresas con las que trabajamos.
              </p>
              
              <h4 className="heading-3 mb-4">¿Qué nos identifica?</h4>
              <div className="grid-mobile md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    className="text-center p-4 rounded-xl bg-color-primary/5 hover:bg-color-primary/10 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="w-16 h-16 bg-color-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-color-primary">
                        {value.icon}
                      </div>
                    </div>
                    <h5 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                      {value.title}
                    </h5>
                    <p className="text-small">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3D Team Carousel */}
        <motion.div
          className="team-section relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ 
            minHeight: '600px',
            overflow: 'hidden',
            perspective: '1000px'
          }}
        >
          {/* Team Title */}
          <h1 
            className="team-title"
            style={{
              fontSize: '6rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              fontFamily: '"Arial Black", "Arial Bold", Arial, sans-serif',
              background: 'linear-gradient(to bottom, rgba(103, 0, 248, 0.35) 30%, rgba(255, 255, 255, 0) 76%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              zIndex: 1
            }}
          >
            NUESTRO EQUIPO
          </h1>

          {/* Carousel Container */}
          <div 
            className="carousel-container"
            style={{
              width: '100%',
              maxWidth: '1200px',
              height: '450px',
              position: 'relative',
              perspective: '1000px',
              marginTop: '80px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            {/* Left Arrow */}
            <button
              className="nav-arrow left"
              onClick={() => updateCarousel(currentIndex - 1)}
              style={{
                position: 'absolute',
                top: '50%',
                left: '20px',
                transform: 'translateY(-50%)',
                background: 'rgba(103, 0, 248, 0.6)',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
                transition: 'all 0.3s ease',
                fontSize: '1.5rem',
                border: 'none',
                outline: 'none',
                paddingBottom: '4px',
                paddingRight: '3px'
              }}
            >
              ‹
            </button>

            {/* Carousel Track */}
            <div 
              className="carousel-track"
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`card ${getCardClass(index)}`}
                  onClick={() => updateCarousel(index)}
                  style={{
                    position: 'absolute',
                    width: '280px',
                    height: '380px',
                    background: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: 'pointer',
                    ...(getCardClass(index) === 'center' && {
                      zIndex: 10,
                      transform: 'scale(1.1) translateZ(0)'
                    }),
                    ...(getCardClass(index) === 'left-2' && {
                      zIndex: 1,
                      transform: 'translateX(-400px) scale(0.8) translateZ(-300px)',
                      opacity: 0.7
                    }),
                    ...(getCardClass(index) === 'left-1' && {
                      zIndex: 5,
                      transform: 'translateX(-200px) scale(0.9) translateZ(-100px)',
                      opacity: 0.9
                    }),
                    ...(getCardClass(index) === 'right-1' && {
                      zIndex: 5,
                      transform: 'translateX(200px) scale(0.9) translateZ(-100px)',
                      opacity: 0.9
                    }),
                    ...(getCardClass(index) === 'right-2' && {
                      zIndex: 1,
                      transform: 'translateX(400px) scale(0.8) translateZ(-300px)',
                      opacity: 0.7
                    }),
                    ...(getCardClass(index) === 'hidden' && {
                      opacity: 0,
                      pointerEvents: 'none'
                    })
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      filter: getCardClass(index) === 'center' ? 'none' : 'grayscale(100%)'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              className="nav-arrow right"
              onClick={() => updateCarousel(currentIndex + 1)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)',
                background: 'rgba(103, 0, 248, 0.6)',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
                transition: 'all 0.3s ease',
                fontSize: '1.5rem',
                border: 'none',
                outline: 'none',
                paddingBottom: '4px',
                paddingLeft: '3px'
              }}
            >
              ›
            </button>
          </div>

          {/* Member Info */}
          <motion.div 
            className="member-info"
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              textAlign: 'center',
              marginTop: '40px'
            }}
          >
            <h2 
              className="member-name"
              style={{
                color: 'rgb(103, 0, 248)',
                fontSize: '2.5rem',
                fontWeight: 700,
                marginBottom: '10px',
                position: 'relative',
                display: 'inline-block'
              }}
            >
              {teamMembers[currentIndex].name}
            </h2>
            <p 
              className="member-role"
              style={{
                color: '#848696',
                fontSize: '1.5rem',
                fontWeight: 500,
                opacity: 0.8,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '10px 0',
                marginTop: '-15px'
              }}
            >
              {teamMembers[currentIndex].role}
            </p>
          </motion.div>

          {/* Dots Navigation */}
          <div 
            className="dots"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '60px'
            }}
          >
            {teamMembers.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => updateCarousel(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: index === currentIndex ? 'rgb(103, 0, 248)' : 'rgba(103, 0, 248, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="card-base-static bg-gradient-to-r from-color-primary/5 to-color-secondary/5 border-color-primary/20">
            <h3 className="heading-2 text-color-primary mb-4">
              ¡Quédate con nosotros y despega!
            </h3>
            <p className="text-base mb-6">
              Destacamos por crear ideas únicas y distintivas que moldean la identidad de tu marca, junto con estrategias de marketing personalizadas para cada uno de nuestros colaboradores.
            </p>
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contáctanos Ahora
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About