import { useState, useEffect, useRef } from 'react'
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
  videoThumbnail?: string
  client: string
  year: number
  tags: string[]
}

// Componente de slider de imágenes
const ImageSlider = ({ images, alt, className, showDots = true, onClick }: { images: string[], alt: string, className: string, showDots?: boolean, onClick?: (index: number) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  if (images.length === 0) return null
  if (images.length === 1) {
    return (
      <div ref={imgRef} className={`${className} relative overflow-hidden bg-gray-200 dark:bg-gray-800`}>
        {isVisible && (
          <motion.img
            src={images[0]}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            initial={{ scale: 1.1 }}
            animate={{ scale: isLoaded ? 1 : 1.1 }}
            transition={{ duration: 0.6 }}
          />
        )}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-color-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={imgRef} className={`${className} relative overflow-hidden bg-gray-200 dark:bg-gray-800 group`}>
      {isVisible && (
        <>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${alt} ${currentIndex + 1}`}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${onClick ? 'cursor-zoom-in' : ''}`}
            onLoad={() => setIsLoaded(true)}
            onClick={() => onClick && onClick(currentIndex)}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: isLoaded ? 1 : 1.1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Dots Indicator */}
          {images.length > 1 && showDots && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    goToImage(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
          
        </>
      )}
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-color-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}


const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const [expandedImageIndex, setExpandedImageIndex] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(6)
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
        id: 4,
        title: 'Revel Bar & Kitchen - Fotografía Gastronómica',
        category: 'photography',
        description: 'Sesión fotográfica profesional para restaurante de alta cocina, destacando presentación y calidad',
        image: '/images/portfolio/photography/revel-bar/revel-bar-1.jpg',
        images: [
          '/images/portfolio/photography/revel-bar/revel-bar-1.jpg',
          '/images/portfolio/photography/revel-bar/revel-bar-2.jpg',
          '/images/portfolio/photography/revel-bar/revel-bar-3.jpg'
        ],
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
        images: [
          '/images/portfolio/photography/widook-optic/widook-optic-1.jpg',
          '/images/portfolio/photography/widook-optic/widook-optic-2.jpg',
          '/images/portfolio/photography/widook-optic/widook-optic-3.jpg'
        ],
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
        id: 8,
        title: 'Los Hotdogs SDQ - Identidad de Marca',
        category: 'design',
        description: 'Desarrollo de marca para cadena de comida rápida, balanceando modernidad y tradición',
        image: '/images/portfolio/branding/los-hotdogs-sdq/los-hotdogs-sdq-1.png',
        images: [
          '/images/portfolio/branding/los-hotdogs-sdq/los-hotdogs-sdq-1.png',
          '/images/portfolio/branding/los-hotdogs-sdq/los-hotdogs-sdq-2.png',
          '/images/portfolio/branding/los-hotdogs-sdq/los-hotdogs-sdq-3.png'
        ],
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
        images: [
          '/images/portfolio/branding/nevada-care-pharmacy/nevada-care-pharmacy-1.jpg',
          '/images/portfolio/branding/nevada-care-pharmacy/nevada-care-pharmacy-2.jpg',
          '/images/portfolio/branding/nevada-care-pharmacy/nevada-care-pharmacy-3.jpg'
        ],
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
        images: [
          '/images/portfolio/branding/palo-studio/palo-studio-1.png',
          '/images/portfolio/branding/palo-studio/palo-studio-2.png',
          '/images/portfolio/branding/palo-studio/palo-studio-3.png'
        ],
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
        images: [
          '/images/portfolio/branding/premeditest/premeditest-1.png',
          '/images/portfolio/branding/premeditest/premeditest-2.png',
          '/images/portfolio/branding/premeditest/premeditest-3.png'
        ],
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
        images: [
          '/images/portfolio/branding/th-oasis/th-oasis-1.png',
          '/images/portfolio/branding/th-oasis/th-oasis-2.png',
          '/images/portfolio/branding/th-oasis/th-oasis-3.png'
        ],
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
        id: 14,
        title: 'Nevada Care Pharmacy - Animación Vertical',
        category: 'animation',
        description: 'Animación promocional vertical para redes sociales, optimizada para engagement móvil',
        image: '/images/portfolio/animation/chavalines-rp/chavalines-rp-3d-visual-logo.gif',
        images: [
          '/images/portfolio/animation/chavalines-rp/chavalines-rp-3d-visual-logo.gif'
        ],
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
        images: [
          '/images/portfolio/animation/chavalines-rp/chavalines-rp-banner-conectando-green.gif'
        ],
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
        image: '/images/portfolio/video/ambiente-chic-thumb.jpg',
        images: [
          '/images/portfolio/video/ambiente-chic-thumb.jpg'
        ],
        videoThumbnail: '/images/portfolio/video/ambiente-chic-thumb.jpg',
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
        image: '/images/portfolio/video/beeroclock-thumb.jpg',
        images: [
          '/images/portfolio/video/beeroclock-thumb.jpg'
        ],
        videoThumbnail: '/images/portfolio/video/beeroclock-thumb.jpg',
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
        image: '/images/portfolio/video/timehomes-thumb.jpg',
        images: [
          '/images/portfolio/video/timehomes-thumb.jpg'
        ],
        videoThumbnail: '/images/portfolio/video/timehomes-thumb.jpg',
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
    setIsImageExpanded(false)
    setExpandedImageIndex(0)
  }

  const expandImage = (index: number) => {
    setExpandedImageIndex(index)
    setIsImageExpanded(true)
  }

  const closeExpandedImage = () => {
    setIsImageExpanded(false)
  }

  const nextExpandedImage = () => {
    if (selectedItem) {
      setExpandedImageIndex((prev) => (prev + 1) % selectedItem.images.length)
    }
  }

  const prevExpandedImage = () => {
    if (selectedItem) {
      setExpandedImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length)
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setItemsToShow(6) // Reset items to show when changing category
  }

  return (
    <section 
      id="portfolio" 
      className="min-h-screen py-20 md:py-32 bg-gradient-to-b from-bg-base-light to-bg-secondary-light dark:from-bg-base-dark dark:to-bg-secondary-dark relative overflow-hidden snap-start"
      ref={elementRef}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="portfolio-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#portfolio-grid)" className="text-color-primary" />
        </svg>
      </div>

      <div className="layout-container relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-full border border-white/30 dark:border-gray-700/30 mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-2 h-2 bg-color-primary rounded-full animate-pulse" />
            <span className="text-small font-medium text-color-primary uppercase tracking-wider">
              Portafolio
            </span>
          </motion.div>
          
          <h2 className="heading-1 text-4xl lg:text-5xl xl:text-6xl font-black mb-6 bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent">
            Trabajos Destacados
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
            Una selección de nuestros proyectos más impactantes que demuestran nuestra pasión por la excelencia creativa
          </p>
        </motion.div>

        {/* Categories with Glassmorphism */}
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
                  ? 'bg-color-primary text-white shadow-lg shadow-color-primary/30' 
                  : 'bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 text-text-primary-light dark:text-text-primary-dark hover:bg-white/20 dark:hover:bg-black/20 hover:border-color-primary/30'
              }`}
              onClick={() => handleCategoryChange(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
            >
              <span className="relative z-10 flex items-center gap-2 font-medium">
                {category.icon}
                {category.name}
              </span>
              {selectedCategory === category.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-color-primary to-color-secondary"
                  layoutId="activeCategory"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
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
                className="group relative bg-white/5 dark:bg-black/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 dark:border-gray-700/10 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer z-0 hover:z-30"
                onClick={() => openModal(item)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <ImageSlider
                    images={item.images}
                    alt={item.title}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                    showDots={true}
                  />
                  
                  {/* Video Indicator */}
                  {item.video && (
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-color-primary/80 transition-colors duration-300">
                        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-color-primary text-white text-xs font-medium rounded-full capitalize">
                          {item.category}
                        </span>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-xs">
                        {item.client}
                      </p>
                    </div>
                    
                    <div className="absolute top-4 left-4">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 text-xs font-medium text-color-primary bg-color-primary/10 rounded-full capitalize">
                      {item.category}
                    </span>
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      {item.year}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-2 line-clamp-1 group-hover:text-color-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                    {item.client}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-text-secondary-light dark:text-text-secondary-dark rounded-md">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-color-primary/10 text-color-primary rounded-md">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {hasMoreItems && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              onClick={loadMore}
              className="px-8 py-4 bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 text-text-primary-light dark:text-text-primary-dark rounded-full font-medium hover:bg-color-primary hover:text-white hover:border-color-primary transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Cargar más proyectos
            </motion.button>
          </motion.div>
        )}

        {isModalOpen && selectedItem && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-24"
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
              className="relative card-base-static max-w-2xl w-full max-h-[calc(100vh-6rem)] overflow-y-auto"
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
              <figure className="aspect-[16/10] bg-base-300 overflow-hidden relative group">
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
                  <ImageSlider
                    images={selectedItem.images}
                    alt={selectedItem.title}
                    className="w-full h-full cursor-zoom-in"
                    showDots={true}
                    onClick={(index) => expandImage(index)}
                  />
                )}
                
                {/* Expand Button */}
                {!selectedItem.video && selectedItem.images.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      expandImage(0)
                    }}
                    className="absolute top-4 left-4 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </button>
                )}
              </figure>
              
              {/* Content */}
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-color-primary text-white rounded-xl px-4 py-2 text-small font-medium capitalize">
                    {selectedItem.category}
                  </div>
                  <div className="text-small">
                    {selectedItem.year}
                  </div>
                </div>
                
                <h3 className="text-xl lg:text-2xl font-bold text-color-primary mb-3">
                  {selectedItem.title}
                </h3>
                
                <p className="text-sm mb-4 leading-relaxed">
                  {selectedItem.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="label-base">Cliente</div>
                    <div className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark">{selectedItem.client}</div>
                  </div>
                  <div>
                    <div className="label-base">Año</div>
                    <div className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark">{selectedItem.year}</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-2">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map(tag => (
                      <div key={tag} className="border border-color-primary text-color-primary rounded px-2 py-1 text-xs">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Expanded Image Modal */}
        {isImageExpanded && selectedItem && (
          <motion.div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeExpandedImage}
          >
            <motion.div 
              className="relative max-w-full max-h-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:border-white/50 shadow-lg transition-all duration-200 hover:scale-110"
                onClick={closeExpandedImage}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Navigation Arrows */}
              {selectedItem.images.length > 1 && (
                <>
                  <button
                    onClick={prevExpandedImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white z-10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextExpandedImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white z-10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              
              {/* Expanded Image */}
              <motion.img
                key={expandedImageIndex}
                src={selectedItem.images[expandedImageIndex]}
                alt={`${selectedItem.title} ${expandedImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Image Thumbnails */}
              {selectedItem.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
                  {selectedItem.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setExpandedImageIndex(index)}
                      className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === expandedImageIndex 
                          ? 'border-white shadow-lg' 
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Portfolio