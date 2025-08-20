import { useState, useEffect } from 'react'
import './Portfolio.css'

interface PortfolioItem {
  id: number
  title: string
  category: string
  description: string
  image: string
  video?: string
  client: string
  year: number
  tags: string[]
}

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = ['all', 'marketing', 'photography', 'design', 'video', 'animation']

  useEffect(() => {
    // Portafolio completo real de Zentella
    const realPortfolio: PortfolioItem[] = [
      // FOTOGRAFÍA
      {
        id: 1,
        title: 'AJF Panadería - Fotografía de Producto',
        category: 'photography',
        description: 'Fotografía especializada de productos de panadería artesanal, destacando la calidad y frescura de cada producto',
        image: '/images/portfolio/photography/ajf-panaderia/ajf-panaderia-1.jpg',
        client: 'AJF Panadería',
        year: 2024,
        tags: ['Producto', 'Food Photography', 'Artesanal', 'Comercial']
      },
      {
        id: 2,
        title: 'El Cayuco Restaurante - Fotografía Gastronómica',
        category: 'photography',
        description: 'Sesión fotográfica completa para restaurante, capturando la esencia culinaria y ambiente único',
        image: '/images/portfolio/photography/el-cayuco/el-cayuco-1.jpg',
        client: 'El Cayuco Restaurante',
        year: 2024,
        tags: ['Gastronomía', 'Ambiente', 'Restaurante', 'Lifestyle']
      },
      {
        id: 3,
        title: 'Esvi Hair Studio - Fotografía de Servicios',
        category: 'photography',
        description: 'Fotografía profesional de servicios de belleza, mostrando técnicas y resultados de alta calidad',
        image: '/images/portfolio/photography/esvi-hair-studio/esvi-hair-studio-1.jpg',
        client: 'Esvi Hair Studio',
        year: 2024,
        tags: ['Belleza', 'Servicios', 'Profesional', 'Lifestyle']
      },
      {
        id: 4,
        title: 'Revel Bar & Kitchen - Fotografía Gastronómica',
        category: 'photography',
        description: 'Sesión fotográfica profesional para restaurante de alta cocina, destacando presentación y calidad',
        image: '/images/portfolio/photography/revel-bar/revel-bar-1.jpg',
        client: 'Revel Bar & Kitchen',
        year: 2024,
        tags: ['Gastronomía', 'Alta Cocina', 'Comercial', 'Premium']
      },
      {
        id: 5,
        title: 'Widook Optic - Fotografía de Producto',
        category: 'photography',
        description: 'Fotografía comercial de productos ópticos, resaltando diseño y funcionalidad de monturas',
        image: '/images/portfolio/photography/widook-optic/widook-optic-1.jpg',
        client: 'Widook Optic',
        year: 2024,
        tags: ['Producto', 'Óptica', 'Comercial', 'Diseño']
      },

      // IDENTIDAD VISUAL & BRANDING
      {
        id: 6,
        title: 'Better Health Nevada - Identidad Corporativa',
        category: 'design',
        description: 'Desarrollo completo de identidad visual para centro de salud, transmitiendo confianza y profesionalismo',
        image: '/images/portfolio/branding/better-health-nevada/better-health-nevada-1.jpg',
        client: 'Better Health Nevada',
        year: 2024,
        tags: ['Branding', 'Healthcare', 'Identidad Visual', 'Corporativo']
      },
      {
        id: 7,
        title: 'Kaccao Kitchen - Desarrollo de Marca',
        category: 'design',
        description: 'Creación de identidad visual completa para cocina gourmet, enfocada en calidad y sofisticación',
        image: '/images/portfolio/branding/kaccao-kitchen/kaccao-kitchen-1.jpg',
        client: 'Kaccao Kitchen',
        year: 2024,
        tags: ['Branding', 'Gourmet', 'Logo Design', 'Gastronomía']
      },
      {
        id: 8,
        title: 'Los Hotdogs SDQ - Identidad de Marca',
        category: 'design',
        description: 'Desarrollo de marca para cadena de comida rápida, balanceando modernidad y tradición',
        image: '/images/portfolio/branding/los-hotdogs-sdq/los-hotdogs-sdq-1.png',
        client: 'Los Hotdogs SDQ',
        year: 2024,
        tags: ['Branding', 'Fast Food', 'Identidad Visual', 'Franquicia']
      },
      {
        id: 9,
        title: 'Nevada Care Pharmacy - Identidad Corporativa',
        category: 'design',
        description: 'Desarrollo completo de identidad visual para farmacia especializada, enfocada en cuidado y confianza',
        image: '/images/portfolio/branding/nevada-care-pharmacy/nevada-care-pharmacy-1.jpg',
        client: 'Nevada Care Pharmacy',
        year: 2024,
        tags: ['Branding', 'Healthcare', 'Farmacia', 'Corporativo']
      },
      {
        id: 10,
        title: 'Palo Studio - Desarrollo de Marca',
        category: 'design',
        description: 'Creación de identidad visual completa para estudio creativo, reflejando innovación y profesionalismo',
        image: '/images/portfolio/branding/palo-studio/palo-studio-1.png',
        client: 'Palo Studio',
        year: 2023,
        tags: ['Branding', 'Creative Studio', 'Logo Design', 'Innovación']
      },
      {
        id: 11,
        title: 'PreMeditest - Identidad Médica',
        category: 'design',
        description: 'Desarrollo de marca para servicios médicos especializados, transmitiendo profesionalismo y confianza',
        image: '/images/portfolio/branding/premeditest/premeditest-1.png',
        client: 'PreMeditest',
        year: 2024,
        tags: ['Branding', 'Medicina', 'Healthcare', 'Profesional']
      },
      {
        id: 12,
        title: 'TH Oasis - Identidad Corporativa',
        category: 'design',
        description: 'Creación de identidad visual para desarrollo inmobiliario, evocando lujo y tranquilidad',
        image: '/images/portfolio/branding/th-oasis/th-oasis-1.png',
        client: 'TH Oasis',
        year: 2024,
        tags: ['Branding', 'Inmobiliario', 'Lujo', 'Corporativo']
      },

      // ANIMACIÓN
      {
        id: 13,
        title: 'Chavalines RP - Animación 3D Logo',
        category: 'animation',
        description: 'Animación 3D profesional para entrada de logo corporativo, creando impacto visual memorable',
        image: '/images/portfolio/animation/chavalines-rp/chavalines-rp-3d-logo-entrada.gif',
        client: 'Chavalines RP',
        year: 2024,
        tags: ['3D Animation', 'Logo Animation', 'Corporate', 'Motion Graphics']
      },
      {
        id: 14,
        title: 'Nevada Care Pharmacy - Animación Vertical',
        category: 'animation',
        description: 'Animación promocional vertical para redes sociales, optimizada para engagement móvil',
        image: '/images/portfolio/animation/chavalines-rp/chavalines-rp-3d-visual-logo.gif',
        video: '/videos/portfolio/animation/nevada-care-pharmacy-animation.mp4',
        client: 'Nevada Care Pharmacy',
        year: 2024,
        tags: ['Motion Graphics', 'Social Media', 'Healthcare', 'Vertical Video']
      },
      {
        id: 15,
        title: 'Servi-Sec - Animación Promocional',
        category: 'animation',
        description: 'Animaciones promocionales para servicios de lavado en seco, combinando información y entretenimiento',
        image: '/images/portfolio/animation/chavalines-rp/chavalines-rp-banner-conectando-green.gif',
        video: '/videos/portfolio/animation/servi-sec-lavado-en-seco-animation.mp4',
        client: 'Servi-Sec',
        year: 2024,
        tags: ['Motion Graphics', 'Promocional', 'Servicios', 'Animación 2D']
      },

      // VIDEOGRAFÍA
      {
        id: 16,
        title: 'Ambiente Chic - Grand Opening',
        category: 'video',
        description: 'Producción audiovisual completa para evento de inauguración, capturando la elegancia del momento',
        image: '/images/services/video-preview.jpg',
        video: '/videos/portfolio/videography/ambiente-chic-grand-opening.mp4',
        client: 'Ambiente Chic',
        year: 2024,
        tags: ['Evento', 'Grand Opening', 'Producción', 'Corporativo']
      },
      {
        id: 17,
        title: 'BeerOClock - Campaña Navideña',
        category: 'video',
        description: 'Producción audiovisual para campaña navideña, combinando creatividad y espíritu festivo',
        image: '/images/services/video-preview.jpg',
        video: '/videos/portfolio/videography/beeroclock-navidad.mp4',
        client: 'BeerOClock',
        year: 2024,
        tags: ['Campaña', 'Navidad', 'Bebidas', 'Estacional']
      },
      {
        id: 18,
        title: 'TimeHomes - María Teresa Condos',
        category: 'video',
        description: 'Video promocional para desarrollo inmobiliario, destacando lujo y ubicación privilegiada',
        image: '/images/services/video-preview.jpg',
        video: '/videos/portfolio/videography/timehomes-maria-teresa-condos.mp4',
        client: 'TimeHomes',
        year: 2024,
        tags: ['Inmobiliario', 'Promocional', 'Lujo', 'Arquitectura']
      }
    ]
    
    setPortfolioItems(realPortfolio)
  }, [])

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="portfolio-header">
          <h2>PORTAFOLIO</h2>
          <p>Algunos de nuestros trabajos más destacados</p>
        </div>

        <div className="portfolio-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'Todos' : 
               category === 'marketing' ? 'Marketing' :
               category === 'photography' ? 'Fotografía' :
               category === 'design' ? 'Diseño' :
               category === 'video' ? 'Video' : 'Animación'}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="portfolio-item"
              onClick={() => openModal(item)}
            >
              <div className="portfolio-image">
                <img src={item.image} alt={item.title} />
                <div className="portfolio-overlay">
                  <div className="portfolio-info">
                    <span className="portfolio-category">{item.category}</span>
                    <h3>{item.title}</h3>
                    <p>{item.client} • {item.year}</p>
                  </div>
                  <div className="portfolio-action">
                    <span>Ver proyecto</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && selectedItem && (
          <div className="portfolio-modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <span></span>
                <span></span>
              </button>
              
              <div className="modal-media">
                {selectedItem.video ? (
                  <video controls autoPlay muted>
                    <source src={selectedItem.video} type="video/mp4" />
                  </video>
                ) : (
                  <img src={selectedItem.image} alt={selectedItem.title} />
                )}
              </div>
              
              <div className="modal-info">
                <span className="modal-category">{selectedItem.category}</span>
                <h3>{selectedItem.title}</h3>
                <p className="modal-description">{selectedItem.description}</p>
                <div className="modal-details">
                  <div className="detail-item">
                    <strong>Cliente:</strong> {selectedItem.client}
                  </div>
                  <div className="detail-item">
                    <strong>Año:</strong> {selectedItem.year}
                  </div>
                  <div className="modal-tags">
                    {selectedItem.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Portfolio