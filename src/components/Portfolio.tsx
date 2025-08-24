import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

interface PortfolioItem {
  id: number
  title: string
  category: string
  description: string
  image: string
  images: string[]
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
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [fullscreenImage, setFullscreenImage] = useState('')
  const [itemsToShow, setItemsToShow] = useState(6)
  const { elementRef, isVisible } = useIntersectionObserver()

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'photography', name: 'Fotografía' },
    { id: 'design', name: 'Diseño' },
    { id: 'video', name: 'Video' },
    { id: 'animation', name: 'Animación' },
  ]

  useEffect(() => {
    const realPortfolio: PortfolioItem[] = [
      {
        id: 1,
        title: 'AJF Panadería - Fotografía de Producto',
        category: 'photography',
        description: 'Fotografía especializada de productos de panadería artesanal, destacando la calidad y frescura de cada producto',
        image: '/images/portfolio/photography/ajf-panaderia/ajf-panaderia-1.jpg',
        images: [
          '/images/portfolio/photography/ajf-panaderia/ajf-panaderia-1.jpg',
          '/images/portfolio/photography/ajf-panaderia/ajf-panaderia-2.jpg',
          '/images/portfolio/photography/ajf-panaderia/ajf-panaderia-3.jpg'
        ],
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
        images: [
          '/images/portfolio/photography/el-cayuco/el-cayuco-1.jpg',
          '/images/portfolio/photography/el-cayuco/el-cayuco-2.jpg',
          '/images/portfolio/photography/el-cayuco/el-cayuco-3.jpg'
        ],
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
        images: [
          '/images/portfolio/photography/esvi-hair-studio/esvi-hair-studio-1.jpg',
          '/images/portfolio/photography/esvi-hair-studio/esvi-hair-studio-2.jpg',
          '/images/portfolio/photography/esvi-hair-studio/esvi-hair-studio-3.jpg'
        ],
        client: 'Esvi Hair Studio',
        year: 2024,
        tags: ['Belleza', 'Servicios', 'Profesional', 'Lifestyle']
      },
      {
        id: 6,
        title: 'Better Health Nevada - Identidad Corporativa',
        category: 'design',
        description: 'Desarrollo completo de identidad visual para centro de salud, transmitiendo confianza y profesionalismo',
        image: '/images/portfolio/branding/better-health-nevada/better-health-nevada-1.jpg',
        images: [
          '/images/portfolio/branding/better-health-nevada/better-health-nevada-1.jpg',
          '/images/portfolio/branding/better-health-nevada/better-health-nevada-2.jpg',
          '/images/portfolio/branding/better-health-nevada/better-health-nevada-3.jpg'
        ],
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
        images: [
          '/images/portfolio/branding/kaccao-kitchen/kaccao-kitchen-1.jpg',
          '/images/portfolio/branding/kaccao-kitchen/kaccao-kitchen-2.jpg',
          '/images/portfolio/branding/kaccao-kitchen/kaccao-kitchen-3.jpg'
        ],
        client: 'Kaccao Kitchen',
        year: 2024,
        tags: ['Branding', 'Gourmet', 'Logo Design', 'Gastronomía']
      },
      {
        id: 13,
        title: 'Chavalines RP - Animación 3D Logo',
        category: 'animation',
        description: 'Animación 3D profesional para entrada de logo corporativo, creando impacto visual memorable',
        image: '/images/portfolio/animation/chavalines-rp/chavalines-rp-3d-logo-entrada.gif',
        images: [
          '/images/portfolio/animation/chavalines-rp/chavalines-rp-3d-logo-entrada.gif',
          '/images/portfolio/animation/chavalines-rp/chavalines-rp-3d-visual-logo.gif',
          '/images/portfolio/animation/chavalines-rp/chavalines-rp-banner-conectando-green.gif'
        ],
        client: 'Chavalines RP',
        year: 2024,
        tags: ['3D Animation', 'Logo Animation', 'Corporate', 'Motion Graphics']
      },
      {
        id: 16,
        title: 'Ambiente Chic - Grand Opening',
        category: 'video',
        description: 'Producción audiovisual completa para evento de inauguración, capturando la elegancia del momento',
        image: '/images/services/video-preview.jpg',
        images: [
          '/images/services/video-preview.jpg'
        ],
        video: '/videos/portfolio/videography/ambiente-chic-grand-opening.mp4',
        client: 'Ambiente Chic',
        year: 2024,
        tags: ['Evento', 'Grand Opening', 'Producción', 'Corporativo']
      }
    ]
    
    setPortfolioItems(realPortfolio)
  }, [])

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  const displayedItems = filteredItems.slice(0, itemsToShow)
  const hasMoreItems = displayedItems.length < filteredItems.length

  const loadMore = () => {
    setItemsToShow(prev => prev + 6)
  }

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  const openFullscreen = (imageUrl: string) => {
    setFullscreenImage(imageUrl)
    setIsFullscreenOpen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreenOpen(false)
    setFullscreenImage('')
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setItemsToShow(6)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isFullscreenOpen) {
          closeFullscreen()
        } else if (isModalOpen) {
          closeModal()
        }
      }
    }

    if (isModalOpen || isFullscreenOpen) {
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen, isFullscreenOpen])

  return (
    <section 
      id="portfolio" 
      className="min-h-screen pt-20 pb-24 md:pt-24 md:pb-32 bg-bg-base-light dark:bg-bg-base-dark text-text-primary-light dark:text-text-primary-dark relative snap-start"
      ref={elementRef}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black mb-6 font-display bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent">
            Trabajos Destacados
          </h2>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-3xl mx-auto">
            Una selección de nuestros proyectos más impactantes.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`group relative overflow-hidden px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id 
                  ? 'bg-color-primary text-white' 
                  : 'bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-primary-light dark:text-text-primary-dark hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleCategoryChange(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[4/3]"
                onClick={() => openModal(item)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-white text-lg font-bold text-center p-4">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {hasMoreItems && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              onClick={loadMore}
              className="px-8 py-4 bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-primary-light dark:text-text-primary-dark rounded-full font-medium hover:bg-color-primary transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Cargar más proyectos
            </motion.button>
          </motion.div>
        )}

        <AnimatePresence>
          {isModalOpen && selectedItem && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20 portfolio-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
                onClick={closeModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div 
                className="relative bg-bg-secondary-light dark:bg-bg-secondary-dark max-w-6xl w-full max-h-[calc(90vh-5rem)] overflow-y-auto rounded-2xl border border-gray-200/50 dark:border-gray-700/50 flex flex-col md:flex-row"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="relative group">
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.title} 
                      className="w-full h-auto rounded-lg mb-4 cursor-pointer" 
                      onClick={() => openFullscreen(selectedItem.image)}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                      <motion.div
                        className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                  <div className="flex-grow" />
                  <div className="flex space-x-2">
                    {selectedItem.images.map((image, index) => (
                      <img 
                        key={index} 
                        src={image} 
                        alt={`${selectedItem.title} thumbnail ${index}`} 
                        className="w-16 h-16 object-cover rounded-md cursor-pointer hover:ring-2 hover:ring-color-primary transition-all duration-200" 
                        onClick={() => setSelectedItem({...selectedItem, image: image})} 
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-8">
                  <h3 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4 font-display">
                    {selectedItem.title}
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                    {selectedItem.description}
                  </p>
                  <div className="text-text-secondary-light dark:text-text-secondary-dark space-y-2">
                    <p><span className="font-bold text-text-primary-light dark:text-text-primary-dark">Cliente:</span> {selectedItem.client}</p>
                    <p><span className="font-bold text-text-primary-light dark:text-text-primary-dark">Año:</span> {selectedItem.year}</p>
                    <div>
                      <span className="font-bold text-text-primary-light dark:text-text-primary-dark">Tags:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedItem.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 text-sm bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-secondary-light dark:text-text-secondary-dark rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <motion.button 
                  className="absolute top-4 right-4 z-10 text-text-primary-light dark:text-text-primary-dark bg-bg-secondary-light/50 dark:bg-bg-secondary-dark/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-full p-2"
                  onClick={closeModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen Image Modal */}
        <AnimatePresence>
          {isFullscreenOpen && (
            <motion.div 
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFullscreen}
            >
              <motion.div 
                className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={fullscreenImage}
                  alt="Imagen en pantalla completa"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
                
                <motion.button 
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 backdrop-blur-sm"
                  onClick={closeFullscreen}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Cerrar pantalla completa"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Portfolio