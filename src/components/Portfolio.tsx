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
    { id: 'all', name: 'Todos', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ) },
    { id: 'photography', name: 'Fotografía', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ) },
    { id: 'design', name: 'Diseño', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
      </svg>
    ) },
    { id: 'video', name: 'Video', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ) },
    { id: 'animation', name: 'Animación', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ) }
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
      className="py-12 md:py-20 bg-bg-base-light dark:bg-bg-base-dark"
      ref={elementRef}
    >
      <div className="layout-container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-color-primary/10 text-color-primary rounded-xl px-4 py-2 text-small font-medium mb-4 inline-block">
            PORTAFOLIO
          </span>
          <h2 className="heading-1 lg:text-4xl mb-6 text-color-primary">
            Nuestros Trabajos
          </h2>
          <p className="text-base max-w-2xl mx-auto">
            Algunos de nuestros proyectos más destacados que muestran nuestra experiencia y creatividad
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={selectedCategory === category.id ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.2, ease: "easeInOut" }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          className="grid-mobile md:grid-tablet lg:grid-desktop-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white dark:bg-bg-base-dark rounded-2xl shadow-md overflow-hidden group cursor-pointer"
              onClick={() => openModal(item)}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.2, ease: "easeInOut" }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <figure className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover hover-smooth group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 hover-smooth">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-color-primary text-white text-small rounded px-2 py-1 mb-2 capitalize">
                      {item.category}
                    </div>
                    <h3 className="font-bold text-small mb-1 text-white overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.title}
                    </h3>
                    <p className="text-small text-white/80">
                      {item.client} • {item.year}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </figure>
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-small text-color-primary capitalize border border-color-primary rounded px-2 py-1">
                    {item.category}
                  </div>
                  <div className="text-small">
                    {item.year}
                  </div>
                </div>
                <h3 className="heading-3 mb-1 text-text-primary-light dark:text-text-primary-dark overflow-hidden text-ellipsis">
                  {item.title}
                </h3>
                <p className="text-small mb-3">
                  {item.client}
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map(tag => (
                    <div key={tag} className="bg-gray-100 dark:bg-gray-800 text-small rounded px-2 py-1">
                      {tag}
                    </div>
                  ))}
                  {item.tags.length > 2 && (
                    <div className="bg-gray-100 dark:bg-gray-800 text-small rounded px-2 py-1">
                      +{item.tags.length - 2}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {isModalOpen && selectedItem && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/50" 
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
            <motion.div 
              className="relative card-base-static max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <motion.button 
                className="btn-ghost absolute top-4 right-4 z-10"
                onClick={closeModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              
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
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-color-primary text-white rounded-xl px-4 py-2 text-small font-medium capitalize">
                    {selectedItem.category}
                  </div>
                  <div className="text-small">
                    {selectedItem.year}
                  </div>
                </div>
                
                <h3 className="heading-2 lg:text-3xl text-color-primary mb-4">
                  {selectedItem.title}
                </h3>
                
                <p className="text-base mb-6 leading-relaxed">
                  {selectedItem.description}
                </p>
                
                <div className="grid-mobile md:grid-tablet gap-6">
                  <div>
                    <div className="label-base">Cliente</div>
                    <div className="heading-3 text-text-primary-light dark:text-text-primary-dark">{selectedItem.client}</div>
                  </div>
                  <div>
                    <div className="label-base">Año</div>
                    <div className="heading-3 text-text-primary-light dark:text-text-primary-dark">{selectedItem.year}</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="label-base mb-3">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map(tag => (
                      <div key={tag} className="border border-color-primary text-color-primary rounded px-2 py-1 text-small">
                        {tag}
                      </div>
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