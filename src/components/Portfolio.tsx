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
    // Portafolio real de Zentella
    const mockPortfolio: PortfolioItem[] = [
      {
        id: 1,
        title: 'Nevada Care Pharmacy - Identidad Corporativa',
        category: 'design',
        description: 'Desarrollo completo de identidad visual para farmacia especializada en Nevada',
        image: '/images/portfolio/nevada-care.jpg',
        client: 'Nevada Care Pharmacy',
        year: 2024,
        tags: ['Branding', 'Identidad Visual', 'Healthcare']
      },
      {
        id: 2,
        title: 'Revel Bar & Kitchen - Fotografía Gastronómica',
        category: 'photography',
        description: 'Sesión fotográfica profesional para restaurante de alta cocina',
        image: '/images/portfolio/revel-bar.jpg',
        client: 'Revel Bar & Kitchen',
        year: 2024,
        tags: ['Gastronomía', 'Lifestyle', 'Comercial']
      },
      {
        id: 3,
        title: 'Palo Studio - Desarrollo de Marca',
        category: 'design',
        description: 'Creación de identidad visual completa para estudio creativo',
        image: '/images/portfolio/palo-studio.jpg',
        client: 'Palo Studio',
        year: 2023,
        tags: ['Branding', 'Logo Design', 'Creative']
      },
      {
        id: 4,
        title: 'ESVI x Brugal - Colaboración Audiovisual',
        category: 'video',
        description: 'Producción audiovisual para colaboración entre salon y marca premium',
        image: '/images/services/video-preview.jpg',
        video: '/videos/portfolio/esvi-brugal.mp4',
        client: 'ESVI Hair Studio',
        year: 2024,
        tags: ['Colaboración', 'Lifestyle', 'Premium']
      },
      {
        id: 5,
        title: 'Chavalines RP - Animación 3D Logo',
        category: 'animation',
        description: 'Animación 3D profesional para entrada de logo corporativo',
        image: '/images/services/animation-preview.gif',
        client: 'Chavalines RP',
        year: 2024,
        tags: ['3D Animation', 'Logo Animation', 'Corporate']
      },
      {
        id: 6,
        title: 'AJF Panadería - Fotografía de Producto',
        category: 'photography',
        description: 'Fotografía especializada de productos de panadería artesanal',
        image: '/images/services/photography-preview.jpg',
        client: 'AJF Panadería',
        year: 2024,
        tags: ['Producto', 'Food Photography', 'Artesanal']
      }
    ]
    
    setPortfolioItems(mockPortfolio)
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