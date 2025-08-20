import './About.css'

const About = () => {
  const team = [
    {
      name: 'Ana Zentella',
      role: 'Creative Director',
      image: '/images/team/ana-zentella.jpg',
      bio: 'Directora creativa con más de 10 años de experiencia en branding y marketing digital.'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Art Director',
      image: '/images/team/carlos-mendoza.jpg',
      bio: 'Director de arte especializado en diseño gráfico y dirección visual de campañas.'
    },
    {
      name: 'María González',
      role: 'Head of Strategy',
      image: '/images/team/maria-gonzalez.jpg',
      bio: 'Estratega de marketing con experiencia en desarrollo de marcas y análisis de mercado.'
    }
  ]

  const stats = [
    { number: '4+', label: 'Años de Experiencia' },
    { number: '100+', label: 'Proyectos Completados' },
    { number: '50+', label: 'Clientes Satisfechos' },
    { number: '100%', label: 'Compromiso con la Excelencia' }
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>NOSOTROS</h2>
            <div className="about-description">
              <p>
                En <strong>Zentella</strong>, somos una agencia de marketing digital con más de 4 años de experiencia 
                comprometida con la innovación y la excelencia. Desde nuestros inicios, hemos trabajado 
                con dedicación para ayudar a nuestros clientes a alcanzar sus objetivos de negocio a través 
                de estrategias personalizadas y efectivas.
              </p>
              <p>
                <strong>El Motor de Nuestra Pasión</strong> es proporcionar soluciones de marketing digital y publicidad 
                que impulsen el crecimiento y el éxito de nuestros clientes. Nos esforzamos por comprender 
                las necesidades específicas de cada cliente y desarrollar estrategias que generen resultados tangibles.
              </p>
              <p>
                <strong>La Profecía del Éxito:</strong> Ser una agencia de referencia en el sector del marketing digital 
                y la publicidad, reconocida por nuestra creatividad, innovación y capacidad para transformar 
                desafíos en oportunidades. Queremos ser el socio estratégico que acompaña a las empresas 
                en su camino hacia el éxito.
              </p>
            </div>
          </div>

          <div className="about-stats">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="team-section">
          <h3>Despega con Nosotros</h3>
          <div className="team-description">
            <p>
              Nuestro equipo está compuesto por profesionales apasionados y experimentados en 
              diversas áreas del marketing digital. Cada miembro de nuestro equipo aporta su experiencia 
              y creatividad para ofrecer soluciones innovadoras y efectivas.
            </p>
            <p>
              En Zentella, estamos aquí para ayudarte a alcanzar tus objetivos y llevar tu negocio al 
              siguiente nivel. <strong>Contáctanos y descubre cómo podemos trabajar juntos para hacer realidad 
              tus metas.</strong>
            </p>
          </div>
        </div>

        <div className="values-section">
          <h3>Nuestro Universo Creativo</h3>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🚀</div>
              <h4>Innovación</h4>
              <p>Creemos en la importancia de estar a la vanguardia de las tendencias y tecnologías del marketing digital.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">⭐</div>
              <h4>Excelencia</h4>
              <p>Nos comprometemos a ofrecer servicios de alta calidad que superen las expectativas de nuestros clientes.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">💎</div>
              <h4>Transparencia</h4>
              <p>Mantenemos una comunicación abierta y honesta con nuestros clientes, asegurando que estén informados en cada paso del proceso.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h4>Trabajo en Equipo</h4>
              <p>Valoramos la colaboración y el trabajo conjunto, tanto dentro de nuestro equipo como con nuestros clientes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About