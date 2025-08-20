import './Footer.css'

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
    { name: 'Instagram', href: 'https://instagram.com/zentella' },
    { name: 'Behance', href: 'https://behance.net/zentella' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/zentella' },
    { name: 'Facebook', href: 'https://facebook.com/zentella' }
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/Zentella Logo Web/positivozentella2025.svg" alt="Zentella" />
              </div>
              <p className="footer-description">
                Agencia creativa integral especializada en marketing, fotografía, 
                diseño gráfico, videografía y animación. Creamos experiencias 
                visuales que conectan marcas con sus audiencias.
              </p>
              <div className="footer-contact">
                <p>
                  <strong>Email:</strong> hello@zentella.com<br />
                  <strong>Teléfono:</strong> +52 999 123 4567<br />
                  <strong>Ubicación:</strong> Mérida, Yucatán, México
                </p>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4>Navegación</h4>
                <ul>
                  {quickLinks.map(link => (
                    <li key={link.name}>
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-column">
                <h4>Servicios</h4>
                <ul>
                  {services.map(service => (
                    <li key={service}>
                      <a href="#services">{service}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-column">
                <h4>Síguenos</h4>
                <ul>
                  {socialLinks.map(social => (
                    <li key={social.name}>
                      <a 
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {social.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Mantente al día</h4>
            <p>Suscríbete para recibir noticias sobre nuestros últimos proyectos y tendencias creativas.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="tu@email.com" 
                required 
              />
              <button type="submit">Suscribirse</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-credits">
            <p>&copy; {currentYear} Zentella. Todos los derechos reservados.</p>
            <div className="footer-legal">
              <a href="/privacy">Política de Privacidad</a>
              <a href="/terms">Términos de Servicio</a>
            </div>
          </div>
          
          <div className="footer-coordinates">
            <p>20°58'17.4"N 89°37'18.6"W</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer