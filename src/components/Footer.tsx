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
    { name: 'Instagram', href: 'https://instagram.com/zentella', icon: '📱' },
    { name: 'Behance', href: 'https://behance.net/zentella', icon: '🎨' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/zentella', icon: '💼' },
    { name: 'Facebook', href: 'https://facebook.com/zentella', icon: '👥' }
  ]

  return (
    <footer className="bg-base-300 border-t border-white/10">
      <div className="container-custom py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src="/Zentella Logo Web/positivozentella2025.svg" 
                alt="Zentella" 
                className="h-12 w-auto hover-glow"
              />
            </div>
            <p className="text-base-content/80 mb-6 leading-relaxed">
              Agencia creativa integral especializada en marketing, fotografía, 
              diseño gráfico, videografía y animación. Creamos experiencias 
              visuales que conectan marcas con sus audiencias.
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary">✉️</span>
                <span>hello@zentella.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">📞</span>
                <span>+52 999 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">📍</span>
                <span>Mérida, Yucatán, México</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold gradient-text mb-4">Navegación</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-base-content/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold gradient-text mb-4">Servicios</h4>
            <ul className="space-y-2">
              {services.map(service => (
                <li key={service}>
                  <a 
                    href="#services"
                    className="text-base-content/70 hover:text-primary transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="card glass-effect p-8 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-xl font-bold gradient-text mb-4">Mantente al día</h4>
            <p className="text-base-content/80 mb-6">
              Suscríbete para recibir noticias sobre nuestros últimos proyectos y tendencias creativas.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="input input-bordered glass-effect flex-1"
                required 
              />
              <button 
                type="submit"
                className="btn btn-primary hover-glow"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-12">
          {socialLinks.map(social => (
            <a 
              key={social.name}
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-circle glass-effect hover-glow"
              title={social.name}
            >
              <span className="text-lg">{social.icon}</span>
            </a>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-base-content/60 text-sm mb-2">
                &copy; {currentYear} Zentella. Todos los derechos reservados.
              </p>
              <div className="flex gap-4 text-xs">
                <a href="/privacy" className="text-base-content/50 hover:text-primary transition-colors">
                  Política de Privacidad
                </a>
                <a href="/terms" className="text-base-content/50 hover:text-primary transition-colors">
                  Términos de Servicio
                </a>
              </div>
            </div>
            
            <div className="badge badge-ghost glass-effect font-mono text-xs">
              20°58'17.4"N 89°37'18.6"W
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer