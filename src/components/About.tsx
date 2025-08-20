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
    { number: '150+', label: 'Proyectos Completados' },
    { number: '50+', label: 'Clientes Satisfechos' },
    { number: '5', label: 'Años de Experiencia' },
    { number: '98%', label: 'Tasa de Satisfacción' }
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>NOSOTROS</h2>
            <div className="about-description">
              <p>
                Somos <strong>Zentella</strong>, una agencia creativa integral ubicada en el corazón 
                de Yucatán. Nos especializamos en crear experiencias visuales y estrategias de 
                comunicación que conectan marcas con sus audiencias de manera auténtica y memorable.
              </p>
              <p>
                Nuestro enfoque multidisciplinario combina creatividad, estrategia y tecnología 
                para ofrecer soluciones integrales que impulsan el crecimiento de nuestros clientes. 
                Desde el desarrollo de identidad visual hasta campañas digitales complejas, 
                trabajamos con pasión para hacer realidad las visiones más ambiciosas.
              </p>
              <p>
                Creemos en el poder de las historias bien contadas y en la importancia de mantener 
                la autenticidad cultural mientras exploramos nuevas fronteras creativas.
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
          <h3>Nuestro Equipo</h3>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                  <div className="member-overlay">
                    <p>{member.bio}</p>
                  </div>
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="values-section">
          <h3>Nuestros Valores</h3>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🎨</div>
              <h4>Creatividad</h4>
              <p>Innovamos constantemente para ofrecer soluciones únicas y memorables.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h4>Colaboración</h4>
              <p>Trabajamos mano a mano con nuestros clientes como socios estratégicos.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">⚡</div>
              <h4>Excelencia</h4>
              <p>Nos comprometemos con la calidad en cada detalle de nuestro trabajo.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🌱</div>
              <h4>Crecimiento</h4>
              <p>Evolucionamos constantemente para mantenernos a la vanguardia.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About