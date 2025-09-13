import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useLanguage } from '../hooks/useLanguage'

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
  const { t } = useLanguage()

  const categories = [
    { id: 'all', name: t('portfolio.todos') },
    { id: 'photography', name: t('portfolio.fotografia') },
    { id: 'design', name: t('portfolio.diseno') },
    { id: 'video', name: t('portfolio.video') },
    { id: 'animation', name: t('portfolio.animacion') },
  ]

  useEffect(() => {
    const realPortfolio: PortfolioItem[] = [
      {
        id: 1,
        title: t('portfolio.ajf_panaderia.titulo'),
        category: 'photography',
        description: t('portfolio.ajf_panaderia.descripcion'),
        image: '/images/portfolio/photography/ajf-panaderia/ajf-panaderia-1.jpg',
        images: [
          '/images/portfolio/photography/ajf-panaderia/ajf-panaderia-1.jpg',
          '/images/portfolio/photography/ajf-panaderia/ajf-panaderia-2.jpg',
          '/images/portfolio/photography/ajf-panaderia/ajf-panaderia-3.jpg'
        ],
        client: t('portfolio.ajf_panaderia.cliente'),
        year: 2024,
        tags: t('portfolio.ajf_panaderia.tags').split(', ')
      },
      {
        id: 2,
        title: t('portfolio.el_cayuco.titulo'),
        category: 'photography',
        description: t('portfolio.el_cayuco.descripcion'),
        image: '/images/portfolio/photography/el-cayuco/el-cayuco-1.jpg',
        images: [
          '/images/portfolio/photography/el-cayuco/el-cayuco-1.jpg',
          '/images/portfolio/photography/el-cayuco/el-cayuco-2.jpg',
          '/images/portfolio/photography/el-cayuco/el-cayuco-3.jpg'
        ],
        client: t('portfolio.el_cayuco.cliente'),
        year: 2024,
        tags: t('portfolio.el_cayuco.tags').split(', ')
      },
      {
        id: 3,
        title: t('portfolio.esvi_hair.titulo'),
        category: 'photography',
        description: t('portfolio.esvi_hair.descripcion'),
        image: '/images/portfolio/photography/esvi-hair-studio/esvi-hair-studio-1.jpg',
        images: [
          '/images/portfolio/photography/esvi-hair-studio/esvi-hair-studio-1.jpg',
          '/images/portfolio/photography/esvi-hair-studio/esvi-hair-studio-2.jpg',
          '/images/portfolio/photography/esvi-hair-studio/esvi-hair-studio-3.jpg'
        ],
        client: t('portfolio.esvi_hair.cliente'),
        year: 2024,
        tags: t('portfolio.esvi_hair.tags').split(', ')
      },
      {
        id: 6,
        title: t('portfolio.better_health.titulo'),
        category: 'design',
        description: t('portfolio.better_health.descripcion'),
        image: '/images/portfolio/branding/better-health-nevada/better-health-nevada-1.jpg',
        images: [
          '/images/portfolio/branding/better-health-nevada/better-health-nevada-1.jpg',
          '/images/portfolio/branding/better-health-nevada/better-health-nevada-2.jpg',
          '/images/portfolio/branding/better-health-nevada/better-health-nevada-3.jpg'
        ],
        client: t('portfolio.better_health.cliente'),
        year: 2024,
        tags: t('portfolio.better_health.tags').split(', ')
      },
      {
        id: 7,
        title: t('portfolio.kaccao.titulo'),
        category: 'design',
        description: t('portfolio.kaccao.descripcion'),
        image: '/images/portfolio/branding/kaccao-kitchen/kaccao-kitchen-1.jpg',
        images: [
          '/images/portfolio/branding/kaccao-kitchen/kaccao-kitchen-1.jpg',
          '/images/portfolio/branding/kaccao-kitchen/kaccao-kitchen-2.jpg',
          '/images/portfolio/branding/kaccao-kitchen/kaccao-kitchen-3.jpg'
        ],
        client: t('portfolio.kaccao.cliente'),
        year: 2024,
        tags: t('portfolio.kaccao.tags').split(', ')
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
        image: '/images/portfolio/video/ambiente-chic-grand-opening.jpg',
        images: [
          '/images/portfolio/video/ambiente-chic-grand-opening.jpg'
        ],
        video: '/videos/portfolio/videography/ambiente-chic-grand-opening.mp4',
        client: 'Ambiente Chic',
        year: 2024,
        tags: ['Evento', 'Grand Opening', 'Producción', 'Corporativo']
      },
      {
        id: 17,
        title: 'Beer O\'Clock - Campaña Navideña',
        category: 'video',
        description: 'Video promocional navideño para marca de cerveza artesanal, con enfoque festivo y familiar',
        image: '/images/portfolio/video/beeroclock-navidad.jpg',
        images: [
          '/images/portfolio/video/beeroclock-navidad.jpg'
        ],
        video: '/videos/portfolio/videography/beeroclock-navidad.mp4',
        client: 'Beer O\'Clock',
        year: 2024,
        tags: ['Promocional', 'Navidad', 'Cerveza', 'Familiar']
      },
      {
        id: 18,
        title: 'Time Homes - María Teresa Condos',
        category: 'video',
        description: 'Video promocional inmobiliario destacando las características y ubicación del proyecto residencial',
        image: '/images/portfolio/video/teresa-condos.jpg',
        images: [
          '/images/portfolio/video/teresa-condos.jpg'
        ],
        video: '/videos/portfolio/videography/timehomes-maria-teresa-condos.mp4',
        client: 'Time Homes',
        year: 2024,
        tags: ['Inmobiliario', 'Condos', 'Promocional', 'Arquitectura']
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

  const showLess = () => {
    setItemsToShow(6)
  }

  const toggleItems = () => {
    if (hasMoreItems) {
      loadMore()
    } else {
      showLess()
    }
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
      className="min-h-screen pt-20 pb-24 md:pt-24 md:pb-32 bg-bg-base-light dark:bg-bg-base-dark text-text-primary-light dark:text-text-primary-dark relative"
      ref={elementRef}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Portfolio Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-8"
          >
            <span className="px-4 py-2 bg-color-primary/10 dark:bg-color-primary/20 text-color-primary text-sm font-medium rounded-full border border-color-primary/20 dark:border-color-primary/30">
              {t('portfolio.badge')}
            </span>
          </motion.div>

          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black mb-6 font-display bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent">
            {t('portfolio.titulo_destacados')}
          </h2>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-3xl mx-auto">
            {t('portfolio.descripcion')}
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
                {item.video && (
                  <div className="absolute top-4 right-4 bg-color-primary text-white rounded-full p-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-white text-lg font-bold text-center p-4">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {(hasMoreItems || itemsToShow > 6) && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              onClick={toggleItems}
              className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-color-primary to-color-secondary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation border border-color-primary/20"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {hasMoreItems ? t('portfolio.cargar_mas') : t('portfolio.mostrar_menos')}
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ y: hasMoreItems ? 3 : -3 }}
                  transition={{ duration: 0.2 }}
                  animate={{ rotate: hasMoreItems ? 0 : 180 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-color-secondary to-color-primary opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"
                whileHover={{ opacity: 1 }}
              />
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
                    {selectedItem.video ? (
                      <video 
                        src={selectedItem.video} 
                        controls
                        className="w-full h-auto rounded-lg mb-4"
                        poster={selectedItem.image}
                      >
                        Tu navegador no soporta el elemento de video.
                      </video>
                    ) : (
                      <>
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
                      </>
                    )}
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