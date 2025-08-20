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
    // Simulamos carga de datos del portafolio
    const mockPortfolio: PortfolioItem[] = [
      {
        id: 1,
        title: 'Campaña Digital Restaurante Maya',
        category: 'marketing',
        description: 'Estrategia integral de marketing digital que aumentó las ventas en un 150%',
        image: '/images/portfolio/maya-restaurant.jpg',
        video: '/videos/portfolio/maya-restaurant.mp4',
        client: 'Restaurante Maya',
        year: 2024,
        tags: ['Social Media', 'SEO', 'Email Marketing']
      },
      {
        id: 2,
        title: 'Sesión Fotográfica Hotel Boutique',
        category: 'photography',
        description: 'Fotografía arquitectural y lifestyle para hotel de lujo en Mérida',
        image: '/images/portfolio/hotel-boutique.jpg',
        client: 'Hotel Boutique Yucatán',
        year: 2024,
        tags: ['Arquitectura', 'Lifestyle', 'Comercial']
      },
      {
        id: 3,
        title: 'Identidad Visual Startup Tech',
        category: 'design',
        description: 'Desarrollo completo de identidad corporativa para empresa tecnológica',
        image: '/images/portfolio/startup-branding.jpg',
        client: 'TechStart Solutions',
        year: 2023,
        tags: ['Branding', 'Logo Design', 'Papelería']
      },
      {
        id: 4,
        title: 'Documental Artesanos Yucatecos',
        category: 'video',
        description: 'Producción audiovisual sobre la tradición artesanal de Yucatán',
        image: '/images/portfolio/artesanos-doc.jpg',
        video: '/videos/portfolio/artesanos-doc.mp4',
        client: 'Gobierno de Yucatán',
        year: 2024,
        tags: ['Documental', 'Cultural', 'Storytelling']
      },
      {
        id: 5,
        title: 'Animación Explainer FinTech',
        category: 'animation',
        description: 'Video animado explicativo para aplicación financiera',
        image: '/images/portfolio/fintech-animation.jpg',
        video: '/videos/portfolio/fintech-animation.mp4',
        client: 'PayMéxico',
        year: 2024,
        tags: ['Motion Graphics', '2D Animation', 'Explainer']
      },
      {
        id: 6,
        title: 'Campaña Producto Cosmético',
        category: 'photography',
        description: 'Fotografía de producto y lifestyle para línea de cosméticos naturales',
        image: '/images/portfolio/cosmetics-campaign.jpg',
        client: 'Natural Beauty Co.',
        year: 2023,
        tags: ['Producto', 'Beauty', 'Lifestyle']
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