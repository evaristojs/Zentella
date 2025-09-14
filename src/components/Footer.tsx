import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import OptimizedImage from './OptimizedImage'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  const quickLinks = [
    { name: t('nav.inicio'), href: '#hero' },
    { name: t('nav.servicios'), href: '#services' },
    { name: t('nav.portafolio'), href: '#portfolio' },
    { name: t('nav.nosotros'), href: '#about' },
    { name: t('nav.contacto'), href: '#contact' }
  ]

  const services = [
    t('footer.servicios.marketing'),
    t('footer.servicios.fotografia'),
    t('footer.servicios.diseno'),
    t('footer.servicios.video'),
    t('footer.servicios.animacion')
  ]

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/agenciazentella', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ) },
    { name: 'YouTube', href: 'https://www.youtube.com/channel/UCWe13OOmbJCMTGe3Sht-pMg', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ) },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/76315700/', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ) },
    { name: 'Facebook', href: 'https://www.facebook.com/106240628100307/', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ) }
  ]

  return (
    <footer id="footer" className="bg-bg-secondary-light dark:bg-bg-secondary-dark">
      <div className="layout-container py-16">
        <div className="grid-mobile md:grid-tablet lg:grid-desktop-4 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <OptimizedImage
                src="/logo-modo-claro.svg"
                alt="Zentella"
                className="h-12 w-auto hover-smooth hover:scale-105 block dark:hidden"
                loading="lazy"
              />
              <OptimizedImage
                src="/logo-modo-oscuro.svg"
                alt="Zentella"
                className="h-12 w-auto hover-smooth hover:scale-105 hidden dark:block"
                loading="lazy"
              />
            </div>
            <p className="text-base text-text-secondary-light dark:text-text-secondary-dark mb-6 leading-relaxed">
              {t('footer.descripcion_empresa')}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-color-primary">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-small">hola@agenciazentella.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-color-primary">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-small">+1 (809) 676-2429</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-color-primary">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-small">Torre Naco 2000, Santo Domingo, RD</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="heading-3 font-black mb-4 bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent">{t('footer.navegacion')}</h4>
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
            <h4 className="heading-3 font-black mb-4 bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent">{t('footer.servicios')}</h4>
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
            <h4 className="heading-2 font-black mb-4 bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent">{t('footer.mantente_al_dia')}</h4>
            <p className="text-base mb-6">
              {t('footer.suscribirse_desc')}
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={t('footer.email_placeholder')} 
                className="input-base flex-1"
                required 
              />
              <button 
                type="submit"
                className="btn-primary"
              >
                {t('footer.suscribirse')}
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
              className="relative w-12 h-12 bg-color-primary text-white rounded-xl flex items-center justify-center hover-smooth hover:bg-color-primary-hover"
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
                &copy; {currentYear} Zentella. {t('footer.derechos_completos')}
              </p>
              <div className="flex gap-4">
                <a href="/privacy" className="text-small hover:text-color-primary hover-smooth">
                  {t('footer.politica_privacidad')}
                </a>
                <a href="/terms" className="text-small hover:text-color-primary hover-smooth">
                  {t('footer.terminos_servicio')}
                </a>
              </div>
            </div>
            
            <div className="bg-gray-200 dark:bg-gray-800 text-text-secondary-light dark:text-text-secondary-dark rounded px-3 py-1 font-mono text-small">
              20°58'17.4"N 89°37'18.6"W
            </div>
          </div>
        </div>
      </div>

      {/* Services Banner - Now at the end of footer */}
      <div className="w-full overflow-hidden relative bg-white dark:bg-bg-secondary-dark border-t border-gray-200 dark:border-gray-700" style={{ height: '200px' }}>
        <motion.div
          className="relative h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center gap-12 sm:gap-16 lg:gap-20 xl:gap-24 whitespace-nowrap"
            animate={{ x: ["0%", "-25%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            style={{
              willChange: 'transform'
            }}
          >
            {/* Solo servicios repetidos */}
            {[...Array(12)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex items-center gap-12 sm:gap-16 lg:gap-20 xl:gap-24">
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
            ))}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer