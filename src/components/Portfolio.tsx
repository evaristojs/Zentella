import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

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
  const { elementRef, isVisible } = useIntersectionObserver()

  const categories = [
    { id: 'all', name: 'Todos', icon: '🌟' },
    { id: 'photography', name: 'Fotografía', icon: '📸' },
    { id: 'design', name: 'Diseño', icon: '🎨' },
    { id: 'video', name: 'Video', icon: '🎬' },
    { id: 'animation', name: 'Animación', icon: '✨' }
  ]

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
    <section 
      id="portfolio" 
      className="section-padding bg-base-200/50"
      ref={elementRef}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="badge badge-primary badge-lg mb-4 font-mono">PORTAFOLIO</div>
          <h2 className="text-section gradient-text mb-6">
            Nuestros Trabajos
          </h2>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Algunos de nuestros proyectos más destacados que muestran nuestra experiencia y creatividad
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              className={`btn btn-sm glass-effect hover-glow transition-all duration-300 ${
                selectedCategory === category.id 
                  ? 'btn-primary shadow-lg shadow-primary/20' 
                  : 'btn-ghost'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="card glass-effect hover-glow group cursor-pointer overflow-hidden"
              onClick={() => openModal(item)}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <figure className="aspect-[4/3] bg-base-300 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="badge badge-primary badge-sm mb-2 capitalize">
                      {item.category}
                    </div>
                    <h3 className="font-bold text-sm mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.title}
                    </h3>
                    <p className="text-xs text-base-content/70">
                      {item.client} • {item.year}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="btn btn-circle btn-sm glass-effect">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </figure>
              
              <div className="card-body p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="badge badge-outline badge-xs capitalize">
                    {item.category}
                  </div>
                  <div className="text-xs text-base-content/60">
                    {item.year}
                  </div>
                </div>
                <h3 className="card-title text-sm mb-1 overflow-hidden text-ellipsis">
                  {item.title}
                </h3>
                <p className="text-xs text-base-content/70 mb-3">
                  {item.client}
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map(tag => (
                    <div key={tag} className="badge badge-ghost badge-xs">
                      {tag}
                    </div>
                  ))}
                  {item.tags.length > 2 && (
                    <div className="badge badge-ghost badge-xs">
                      +{item.tags.length - 2}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modern Modal */}
        {isModalOpen && selectedItem && (
          <div className="modal modal-open z-50">
            <div className="modal-box max-w-4xl p-0 glass-effect border border-white/10">
              {/* Close Button */}
              <button 
                className="btn btn-circle btn-ghost absolute top-4 right-4 z-10 glass-effect"
                onClick={closeModal}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Media */}
              <figure className="aspect-video bg-base-300 overflow-hidden">
                {selectedItem.video ? (
                  <video 
                    controls 
                    autoPlay 
                    muted 
                    className="w-full h-full object-cover"
                  >
                    <source src={selectedItem.video} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </figure>
              
              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="badge badge-primary badge-lg capitalize">
                    {selectedItem.category}
                  </div>
                  <div className="text-sm text-base-content/60">
                    {selectedItem.year}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold gradient-text mb-4">
                  {selectedItem.title}
                </h3>
                
                <p className="text-base-content/80 mb-6 leading-relaxed">
                  {selectedItem.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-semibold text-base-content/70 mb-2">Cliente</div>
                    <div className="text-lg font-medium">{selectedItem.client}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-base-content/70 mb-2">Año</div>
                    <div className="text-lg font-medium">{selectedItem.year}</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="text-sm font-semibold text-base-content/70 mb-3">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map(tag => (
                      <div key={tag} className="badge badge-outline">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop" onClick={closeModal}></div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Portfolio