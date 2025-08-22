import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Servicios', href: '#services' },
    { name: 'Portafolio', href: '#portfolio' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Contacto', href: '#contact' }
  ]

  const services = [
    'Marketing Digital',
    'Fotografía',
    'Diseño Gráfico',
    'Videografía',
    'Animación'
  ]

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/zentella', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ) },
    { name: 'Behance', href: 'https://behance.net/zentella', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.498 1.21.906.26 1.576.72 2.022 1.37.448.66.672 1.45.672 2.38 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.76-.622.16-1.29.24-1.985.24H0V4.51h6.938v-.007zM16.94 16.665c.44.428 1.073.643 1.894.643.59 0 1.1-.148 1.53-.447.424-.29.68-.61.78-.94h2.588c-.403 1.28-1.048 2.2-1.9 2.75-.85.56-1.884.83-3.08.83-.837 0-1.584-.13-2.272-.4-.673-.27-1.24-.65-1.7-1.14-.46-.49-.814-1.08-1.063-1.77-.25-.69-.373-1.45-.373-2.28 0-.85.125-1.61.373-2.28.25-.67.603-1.26 1.063-1.75.46-.49 1.027-.87 1.7-1.14.688-.27 1.435-.41 2.272-.41.86 0 1.622.15 2.287.45.666.3 1.224.73 1.68 1.27.456.54.78 1.18.974 1.91.194.73.29 1.53.29 2.4 0 .2-.007.38-.02.55H14.088c-.013.97.334 1.85.853 2.01zm-4.016-9.48V5.64h7.5v1.545h-7.5z"/>
      </svg>
    ) },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/zentella', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ) },
    { name: 'Facebook', href: 'https://facebook.com/zentella', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ) }
  ]

  return (
    <>
    {/* Large Services Banner - Footer Version */}
    <motion.section
      className="w-full overflow-hidden relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ height: '200px', marginTop: '80px' }}
    >
      <motion.div
        className="relative h-full bg-white dark:bg-bg-secondary-dark flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Large Banner */}
        <motion.div
          className="flex items-center gap-16 sm:gap-20 lg:gap-28 xl:gap-32 whitespace-nowrap"
          animate={{ x: ["0%", "-20%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear",
            },
          }}
          style={{
            willChange: 'transform'
          }}
        >
          {/* Patrón repetido más grande: TODOS + separador + servicios */}
          {[...Array(8)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-16 sm:gap-20 lg:gap-28 xl:gap-32">
              {/* "TODOS" como elemento principal - MUCHO MAS GRANDE */}
              <motion.span
                className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-black text-text-primary-light dark:text-text-primary-dark"
                style={{ 
                  fontFamily: 'Poppins, sans-serif',
                  letterSpacing: '-0.04em',
                  textRendering: 'optimizeSpeed',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                  lineHeight: '0.8',
                }}
              >
                TODOS
              </motion.span>
              
              {/* Separador visual más grande */}
              <motion.div
                className="w-3 sm:w-4 lg:w-6 h-16 sm:h-20 lg:h-24 xl:h-28 bg-color-primary rounded-full"
                style={{ 
                  transform: 'translateZ(0)',
                }}
              />
              
              {/* Servicios agrupados más grandes */}
              <div className="flex items-center gap-12 sm:gap-16 lg:gap-20 xl:gap-24">
                {['Fotografía', 'Diseño', 'Video', 'Animación'].map((service, index) => (
                  <motion.span
                    key={`${groupIndex}-${service}-${index}`}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-text-primary-light dark:text-text-primary-dark"
                    style={{ 
                      fontFamily: 'Poppins, sans-serif',
                      letterSpacing: '-0.03em',
                      textRendering: 'optimizeSpeed',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                      lineHeight: '0.9',
                    }}
                  >
                    {service}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
    
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="layout-container py-16">
        <div className="grid-mobile md:grid-tablet lg:grid-desktop-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src="/Zentella Logo Web/positivozentella2025.svg" 
                alt="Zentella" 
                className="h-12 w-auto hover-smooth hover:scale-105"
              />
            </div>
            <p className="text-base mb-6 leading-relaxed">
              Agencia creativa integral especializada en marketing, fotografía, 
              diseño gráfico, videografía y animación. Creamos experiencias 
              visuales que conectan marcas con sus audiencias.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-color-primary">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-small">hello@zentella.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-color-primary">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-small">+52 999 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-color-primary">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-small">Mérida, Yucatán, México</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="heading-3 font-black mb-4 bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent">Navegación</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-small hover:text-color-primary hover-smooth"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="heading-3 font-black mb-4 bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent">Servicios</h4>
            <ul className="space-y-2">
              {services.map(service => (
                <li key={service}>
                  <a 
                    href="#services"
                    className="text-small hover:text-color-primary hover-smooth"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card-base mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="heading-2 font-black mb-4 bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent">Mantente al día</h4>
            <p className="text-base mb-6">
              Suscríbete para recibir noticias sobre nuestros últimos proyectos y tendencias creativas.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="input-base flex-1"
                required 
              />
              <button 
                type="submit"
                className="btn-primary"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {socialLinks.map(social => (
            <a 
              key={social.name}
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-color-primary text-white rounded-xl flex items-center justify-center hover-smooth hover:bg-color-primary-hover"
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-small mb-2">
                &copy; {currentYear} Zentella. Todos los derechos reservados.
              </p>
              <div className="flex gap-4">
                <a href="/privacy" className="text-small hover:text-color-primary hover-smooth">
                  Política de Privacidad
                </a>
                <a href="/terms" className="text-small hover:text-color-primary hover-smooth">
                  Términos de Servicio
                </a>
              </div>
            </div>
            
            <div className="bg-gray-200 dark:bg-gray-800 text-text-secondary-light dark:text-text-secondary-dark rounded px-3 py-1 font-mono text-small">
              20°58'17.4"N 89°37'18.6"W
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer