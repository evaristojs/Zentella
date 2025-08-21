import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const services = [
    { 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ), 
      text: 'Diseño' 
    },
    { 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), 
      text: 'Fotografía' 
    },
    { 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ), 
      text: 'Video' 
    },
    { 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ), 
      text: 'Animación' 
    },
  ]

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-bg-base-light via-bg-base-light to-color-primary/5 dark:from-bg-base-dark dark:via-bg-base-dark dark:to-color-primary/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-color-primary/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.1,
            y: mousePosition.y * 0.1,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 50 }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-color-success/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.05,
            y: mousePosition.y * -0.05,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 50 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-60 h-60 bg-color-primary/5 rounded-full blur-2xl"
          animate={{
            x: mousePosition.x * 0.03,
            y: mousePosition.y * 0.03,
            rotate: 360,
          }}
          transition={{
            x: { type: "spring", damping: 50, stiffness: 50 },
            y: { type: "spring", damping: 50, stiffness: 50 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
        />
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-color-primary/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="layout-container relative z-10 flex items-center min-h-screen">
        <div className="grid-mobile lg:grid-tablet items-center gap-12 lg:gap-16 w-full">
          
          {/* Left Content */}
          <motion.div 
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="w-2 h-2 bg-color-primary rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="bg-gradient-to-r from-color-primary to-color-success bg-clip-text text-transparent font-medium text-small uppercase tracking-wider">
                Agencia Creative Digital
              </span>
              <motion.div
                className="w-2 h-2 bg-color-success rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="heading-1 lg:text-5xl xl:text-6xl leading-tight">
                <span className="block text-text-primary-light dark:text-text-primary-dark">
                  Creamos
                </span>
                <motion.span 
                  className="block bg-gradient-to-r from-color-primary via-color-primary to-color-success bg-clip-text text-transparent"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: "100% 50%" }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Experiencias
                </motion.span>
                <span className="block text-text-primary-light dark:text-text-primary-dark">
                  Extraordinarias
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base leading-relaxed max-w-xl mx-auto lg:mx-0 text-text-secondary-light dark:text-text-secondary-dark"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Transformamos ideas en realidades digitales que conectan marcas con audiencias, 
              generando impacto real y resultados medibles.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button 
                className="btn-primary group flex items-center justify-center gap-3 text-white font-medium px-8 py-4 rounded-full bg-gradient-to-r from-color-primary to-color-success shadow-lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.3 }}
              >
                Comenzar Proyecto
                <motion.div
                  className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </motion.button>
              
              <motion.button 
                className="btn-secondary group relative overflow-hidden font-medium px-8 py-4 rounded-full border-2 border-color-primary/20 hover:border-color-primary text-color-primary"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.3 }}
              >
                <span className="relative z-10">Explorar Trabajo</span>
                <motion.div
                  className="absolute inset-0 bg-color-primary/5"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>

            {/* Services Tags */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.text}
                  className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.8)" }}
                >
                  <span className="text-color-primary">{service.icon}</span>
                  <span className="text-small font-medium text-text-primary-light dark:text-text-primary-dark">
                    {service.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Main Image Container */}
            <div className="relative">
              <motion.div
                className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-color-primary/20 to-color-success/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <img 
                  src="/images/hero/hero-1.jpg" 
                  alt="Zentella Creative Work" 
                  className="w-full h-full object-cover rounded-full relative z-10"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full z-20"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>

              {/* Orbiting Elements */}
              {[
                { 
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ), 
                  color: 'bg-color-primary', 
                  angle: 0, 
                  radius: 180 
                },
                { 
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  ), 
                  color: 'bg-color-success', 
                  angle: 90, 
                  radius: 200 
                },
                { 
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ), 
                  color: 'bg-color-accent', 
                  angle: 180, 
                  radius: 190 
                },
                { 
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  ), 
                  color: 'bg-color-secondary', 
                  angle: 270, 
                  radius: 210 
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`absolute w-16 h-16 ${item.color} rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm`}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 10 + index * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                    originX: 0.5,
                    originY: 0.5,
                    x: Math.cos((item.angle * Math.PI) / 180) * item.radius,
                    y: Math.sin((item.angle * Math.PI) / 180) * item.radius,
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  {item.icon}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="text-small text-text-secondary-light dark:text-text-secondary-dark group-hover:text-color-primary transition-colors font-medium uppercase tracking-wider">
          Explorar
        </div>
        <motion.div
          className="w-8 h-12 border-2 border-color-primary/30 rounded-full p-2 group-hover:border-color-primary transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="w-1 h-3 bg-color-primary rounded-full mx-auto"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero