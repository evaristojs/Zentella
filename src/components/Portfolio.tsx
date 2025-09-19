import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../contexts/ThemeContext'
import OptimizedImage from './OptimizedImage'

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0)
  const { elementRef, isVisible } = useIntersectionObserver()
  const { t } = useLanguage()
  const { isDark } = useTheme()

  const categories = [
    { id: 'all', name: t('portfolio.todos') },
    { id: 'photography', name: t('portfolio.fotografia') },
    { id: 'design', name: t('portfolio.diseno') },
    { id: 'video', name: t('portfolio.video') },
    { id: 'animation', name: t('portfolio.animacion') },
  ]

  useEffect(() => {
    const realPortfolio: PortfolioItem[] = [
      // BRANDING PROJECTS
      {
        id: 1,
        title: 'Better Health Nevada',
        category: 'design',
        description: 'Identidad visual completa para Better Health Nevada, clínica de salud integral.',
        image: '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1 copy 10betterhealth_large.webp',
        images: [
          '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1betterhealth_large.webp',
          '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1 copybetterhealth_large.webp',
          '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1 copy 2betterhealth_large.webp',
          '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1 copy 3betterhealth_large.webp',
          '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1 copy 4betterhealth_large.webp',
          '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1 copy 5betterhealth_large.webp',
          '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1 copy 6betterhealth_large.webp',
          '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1 copy 7betterhealth_large.webp',
          '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1 copy 8betterhealth_large.webp',
          '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1 copy 9betterhealth_large.webp',
          '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1 copy 10betterhealth_large.webp',
          '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1 copy 11betterhealth_large.webp',
          '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1 copy 12betterhealth_large.webp',
          '/images/portfolio/branding/Better Health Nevada/zentella-postArtboard 1 copy 13betterhealth_large.webp'
        ],
        client: 'Better Health Nevada',
        year: 2024,
        tags: ['Branding', 'Identidad Visual', 'Salud']
      },
      {
        id: 2,
        title: 'Kaccao Kitchen',
        category: 'design',
        description: 'Desarrollo de marca para Kaccao Kitchen, restaurante especializado en postres y bebidas.',
        image: '/images/portfolio/branding/Kaccao Kitchen/KaccaoArtboard 1 copy 2-100_large.webp',
        images: [
          '/images/portfolio/branding/Kaccao Kitchen/KaccaoArtboard 1-100_large.webp',
          '/images/portfolio/branding/Kaccao Kitchen/KaccaoArtboard 1 copy-100_large.webp',
          '/images/portfolio/branding/Kaccao Kitchen/KaccaoArtboard 1 copy 2-100_large.webp',
          '/images/portfolio/branding/Kaccao Kitchen/KaccaoArtboard 1 copy 3-100_large.webp',
          '/images/portfolio/branding/Kaccao Kitchen/KaccaoArtboard 1 copy 4-100_large.webp',
          '/images/portfolio/branding/Kaccao Kitchen/KaccaoArtboard 1 copy 5-100_large.webp',
          '/images/portfolio/branding/Kaccao Kitchen/KaccaoArtboard 1 copy 6-100_large.webp',
          '/images/portfolio/branding/Kaccao Kitchen/KaccaoArtboard 1 copy 7-100_large.webp',
          '/images/portfolio/branding/Kaccao Kitchen/KaccaoArtboard 1 copy 8-100_large.webp',
          '/images/portfolio/branding/Kaccao Kitchen/KaccaoArtboard 1 copy 9-100_large.webp'
        ],
        client: 'Kaccao Kitchen',
        year: 2024,
        tags: ['Branding', 'Restaurante', 'Logo']
      },
      {
        id: 3,
        title: 'Los Hotdogs SDQ',
        category: 'design',
        description: 'Identidad de marca para Los Hotdogs SDQ, cadena de comida rápida gourmet.',
        image: '/images/portfolio/branding/Los Hotdogs SDQ/loshotdogsMesa de trabajo 11_large.webp',
        images: [
          '/images/portfolio/branding/Los Hotdogs SDQ/loshotdogs001 copia_large.webp',
          '/images/portfolio/branding/Los Hotdogs SDQ/loshotdogsMesa de trabajo 11_large.webp',
          '/images/portfolio/branding/Los Hotdogs SDQ/loshotdogsMesa de trabajo 11 copia_large.webp',
          '/images/portfolio/branding/Los Hotdogs SDQ/loshotdogsMesa de trabajo 11 copia 2_large.webp',
          '/images/portfolio/branding/Los Hotdogs SDQ/loshotdogsMesa de trabajo 11 copia 3_large.webp',
          '/images/portfolio/branding/Los Hotdogs SDQ/loshotdogsMesa de trabajo 11 copia 4_large.webp',
          '/images/portfolio/branding/Los Hotdogs SDQ/loshotdogsMesa de trabajo 11 copia 5_large.webp',
          '/images/portfolio/branding/Los Hotdogs SDQ/loshotdogsMesa de trabajo 11 copia 6_large.webp',
          '/images/portfolio/branding/Los Hotdogs SDQ/loshotdogsMesa de trabajo 11 copia 7_large.webp'
        ],
        client: 'Los Hotdogs SDQ',
        year: 2024,
        tags: ['Branding', 'Comida Rápida', 'Gourmet']
      },
      {
        id: 4,
        title: 'Nevada Care Pharmacy',
        category: 'design',
        description: 'Rediseño completo de identidad para Nevada Care Pharmacy, farmacia comunitaria.',
        image: '/images/portfolio/branding/Nevada Care Pharmacy/NevadaArtboard 1-100_large.webp',
        images: [
          '/images/portfolio/branding/Nevada Care Pharmacy/NevadaArtboard 1-100_large.webp',
          '/images/portfolio/branding/Nevada Care Pharmacy/NevadaArtboard 1 copy-100_large.webp',
          '/images/portfolio/branding/Nevada Care Pharmacy/NevadaArtboard 1 copy 2-100_large.webp',
          '/images/portfolio/branding/Nevada Care Pharmacy/NevadaArtboard 1 copy 3-100_large.webp',
          '/images/portfolio/branding/Nevada Care Pharmacy/NevadaArtboard 1 copy 4-100_large.webp',
          '/images/portfolio/branding/Nevada Care Pharmacy/NevadaArtboard 1 copy 5-100_large.webp',
          '/images/portfolio/branding/Nevada Care Pharmacy/NevadaArtboard 1 copy 6-100_large.webp',
          '/images/portfolio/branding/Nevada Care Pharmacy/NevadaArtboard 1 copy 7-100_large.webp',
          '/images/portfolio/branding/Nevada Care Pharmacy/NevadaArtboard 1 copy 8-100_large.webp',
          '/images/portfolio/branding/Nevada Care Pharmacy/NevadaArtboard 1 copy 9-100_large.webp'
        ],
        client: 'Nevada Care Pharmacy',
        year: 2024,
        tags: ['Branding', 'Farmacia', 'Salud']
      },
      {
        id: 5,
        title: 'Palo Studio',
        category: 'design',
        description: 'Identidad visual para Palo Studio, estudio creativo y de diseño.',
        image: '/images/portfolio/branding/Palo Studio/Zentella01_large.webp',
        images: [
          '/images/portfolio/branding/Palo Studio/Zentella01_large.webp',
          '/images/portfolio/branding/Palo Studio/Zentella02_large.webp',
          '/images/portfolio/branding/Palo Studio/Zentella03_large.webp',
          '/images/portfolio/branding/Palo Studio/Zentella04_large.webp',
          '/images/portfolio/branding/Palo Studio/Zentella05_large.webp',
          '/images/portfolio/branding/Palo Studio/Zentella06_large.webp',
          '/images/portfolio/branding/Palo Studio/Zentella06 copia_large.webp',
          '/images/portfolio/branding/Palo Studio/Zentella06 copia 2_large.webp',
          '/images/portfolio/branding/Palo Studio/Zentella06 copia 3_large.webp',
          '/images/portfolio/branding/Palo Studio/Zentella06 copia 4_large.webp'
        ],
        client: 'Palo Studio',
        year: 2024,
        tags: ['Branding', 'Estudio', 'Creativo']
      },
      {
        id: 6,
        title: 'PreMeditest',
        category: 'design',
        description: 'Desarrollo de marca para PreMeditest, centro de preparación para exámenes médicos.',
        image: '/images/portfolio/branding/PreMeditest/premeditest001_large.webp',
        images: [
          '/images/portfolio/branding/PreMeditest/premeditest001_large.webp',
          '/images/portfolio/branding/PreMeditest/premeditest002_large.webp',
          '/images/portfolio/branding/PreMeditest/premeditest003_large.webp',
          '/images/portfolio/branding/PreMeditest/premeditest004_large.webp',
          '/images/portfolio/branding/PreMeditest/premeditest005_large.webp',
          '/images/portfolio/branding/PreMeditest/premeditest006_large.webp',
          '/images/portfolio/branding/PreMeditest/premeditest007_large.webp',
          '/images/portfolio/branding/PreMeditest/premeditest008_large.webp',
          '/images/portfolio/branding/PreMeditest/premeditest009_large.webp'
        ],
        client: 'PreMeditest',
        year: 2024,
        tags: ['Branding', 'Educación', 'Medicina']
      },
      {
        id: 7,
        title: 'TH Oasis',
        category: 'design',
        description: 'Identidad de marca para TH Oasis, complejo residencial de lujo.',
        image: '/images/portfolio/branding/TH Oasis/th-oasis001_large.webp',
        images: [
          '/images/portfolio/branding/TH Oasis/th-oasis001_large.webp',
          '/images/portfolio/branding/TH Oasis/th-oasis002_large.webp',
          '/images/portfolio/branding/TH Oasis/th-oasis003_large.webp',
          '/images/portfolio/branding/TH Oasis/th-oasis004_large.webp',
          '/images/portfolio/branding/TH Oasis/th-oasis005_large.webp',
          '/images/portfolio/branding/TH Oasis/th-oasis006_large.webp',
          '/images/portfolio/branding/TH Oasis/th-oasis007_large.webp',
          '/images/portfolio/branding/TH Oasis/th-oasis008_large.webp',
          '/images/portfolio/branding/TH Oasis/th-oasis009_large.webp'
        ],
        client: 'TH Oasis',
        year: 2024,
        tags: ['Branding', 'Inmobiliaria', 'Lujo']
      },

      // PHOTOGRAPHY PROJECTS
      {
        id: 8,
        title: 'AJF Panadería',
        category: 'photography',
        description: 'Sesión fotográfica de productos para AJF Panadería, capturando la esencia artesanal.',
        image: '/images/portfolio/photography/AJF Panaderia/Recurso 24ajf panaderia_large.webp',
        images: [
          '/images/portfolio/photography/AJF Panaderia/Recurso 16ajf panaderia_large.webp',
          '/images/portfolio/photography/AJF Panaderia/Recurso 17ajf panaderia_large.webp',
          '/images/portfolio/photography/AJF Panaderia/Recurso 18ajf panaderia_large.webp',
          '/images/portfolio/photography/AJF Panaderia/Recurso 19ajf panaderia_large.webp',
          '/images/portfolio/photography/AJF Panaderia/Recurso 20ajf panaderia_large.webp',
          '/images/portfolio/photography/AJF Panaderia/Recurso 21ajf panaderia_large.webp',
          '/images/portfolio/photography/AJF Panaderia/Recurso 22ajf panaderia_large.webp',
          '/images/portfolio/photography/AJF Panaderia/Recurso 23ajf panaderia_large.webp',
          '/images/portfolio/photography/AJF Panaderia/Recurso 24ajf panaderia_large.webp'
        ],
        client: 'AJF Panadería',
        year: 2024,
        tags: ['Fotografía', 'Productos', 'Panadería']
      },
      {
        id: 9,
        title: 'El Cayuco Restaurante',
        category: 'photography',
        description: 'Fotografía gastronómica para El Cayuco Restaurante, destacando platos tradicionales.',
        image: '/images/portfolio/photography/El Cayuco Restaurante/Recurso 50cayuco_large.webp',
        images: [
          '/images/portfolio/photography/El Cayuco Restaurante/Recurso 44cayuco_large.webp',
          '/images/portfolio/photography/El Cayuco Restaurante/Recurso 45cayuco_large.webp',
          '/images/portfolio/photography/El Cayuco Restaurante/Recurso 46cayuco_large.webp',
          '/images/portfolio/photography/El Cayuco Restaurante/Recurso 47cayuco_large.webp',
          '/images/portfolio/photography/El Cayuco Restaurante/Recurso 48cayuco_large.webp',
          '/images/portfolio/photography/El Cayuco Restaurante/Recurso 49cayuco_large.webp',
          '/images/portfolio/photography/El Cayuco Restaurante/Recurso 50cayuco_large.webp',
          '/images/portfolio/photography/El Cayuco Restaurante/Recurso 51cayuco_large.webp',
          '/images/portfolio/photography/El Cayuco Restaurante/Recurso 52cayuco_large.webp'
        ],
        client: 'El Cayuco Restaurante',
        year: 2024,
        tags: ['Fotografía', 'Gastronomía', 'Restaurante']
      },
      {
        id: 10,
        title: 'Esvi Hair Studio',
        category: 'photography',
        description: 'Fotografía de servicios para Esvi Hair Studio, salon de belleza premium.',
        image: '/images/portfolio/photography/Esvi Hair Studio/Recurso 1esvi_medium.webp',
        images: [
          '/images/portfolio/photography/Esvi Hair Studio/Recurso 1esvi_large.webp',
          '/images/portfolio/photography/Esvi Hair Studio/Recurso 2esvi_large.webp',
          '/images/portfolio/photography/Esvi Hair Studio/Recurso 3esvi_large.webp',
          '/images/portfolio/photography/Esvi Hair Studio/Recurso 4esvi_large.webp',
          '/images/portfolio/photography/Esvi Hair Studio/Recurso 5esvi_large.webp',
          '/images/portfolio/photography/Esvi Hair Studio/Recurso 6esvi_large.webp'
        ],
        client: 'Esvi Hair Studio',
        year: 2024,
        tags: ['Fotografía', 'Belleza', 'Estudio']
      },
      {
        id: 11,
        title: 'Revel Bar & Kitchen',
        category: 'photography',
        description: 'Fotografía arquitectural y gastronómica para Revel Bar & Kitchen.',
        image: '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 38revel-002_large.webp',
        images: [
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 29revel-001_large.webp',
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 30revel-001_large.webp',
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 31revel-001_large.webp',
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 32revel-001_large.webp',
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 33revel-001_large.webp',
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 34revel-001_large.webp',
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 35revel-001_large.webp',
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 36revel-001_large.webp',
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 37revel-001_large.webp',
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 38revel-002_large.webp',
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 39revel-002_large.webp',
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 40revel-002_large.webp',
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 41revel-002_large.webp',
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 42revel-002_large.webp',
          '/images/portfolio/photography/Revel Bar & Kitchen/Recurso 43revel-002_large.webp'
        ],
        client: 'Revel Bar & Kitchen',
        year: 2024,
        tags: ['Fotografía', 'Bar', 'Gastronomía']
      },
      {
        id: 12,
        title: 'Widook Optic',
        category: 'photography',
        description: 'Fotografía de productos para Widook Optic, óptica especializada.',
        image: '/images/portfolio/photography/Widook Optic/Recurso 7widook_large.webp',
        images: [
          '/images/portfolio/photography/Widook Optic/Recurso 7widook_large.webp',
          '/images/portfolio/photography/Widook Optic/Recurso 8widook_large.webp',
          '/images/portfolio/photography/Widook Optic/Recurso 9widook_large.webp',
          '/images/portfolio/photography/Widook Optic/Recurso 10widook_large.webp',
          '/images/portfolio/photography/Widook Optic/Recurso 11widook_large.webp',
          '/images/portfolio/photography/Widook Optic/Recurso 12widook_large.webp',
          '/images/portfolio/photography/Widook Optic/Recurso 13widook_large.webp',
          '/images/portfolio/photography/Widook Optic/Recurso 14widook_large.webp',
          '/images/portfolio/photography/Widook Optic/Recurso 15widook_large.webp'
        ],
        client: 'Widook Optic',
        year: 2024,
        tags: ['Fotografía', 'Productos', 'Óptica']
      },

      // ANIMATION PROJECTS
      {
        id: 13,
        title: 'Chavalines RP',
        category: 'design',
        description: 'Diseños gráficos y elementos visuales para Chavalines RP, servidor de roleplay.',
        image: '/images/portfolio/animation/Chavalines RP/3D Logo Entrada.webp',
        images: [
          '/images/portfolio/animation/Chavalines RP/3D Logo Entrada.webp',
          '/images/portfolio/animation/Chavalines RP/3D Visual Logo.webp',
          '/images/portfolio/animation/Chavalines RP/Banner Conectando Green 770x240px .webp'
        ],
        client: 'Chavalines RP',
        year: 2024,
        tags: ['Diseño', 'Gaming', 'Gráficos']
      },
      {
        id: 14,
        title: 'Nevada Care Pharmacy Animation',
        category: 'video',
        description: 'Animaciones promocionales para Nevada Care Pharmacy.',
        image: '/images/portfolio/video/nevada-care-animation-thumbnail.jpg',
        images: [
          '/images/portfolio/video/nevada-care-animation-thumbnail.jpg'
        ],
        video: '/images/portfolio/animation/Nevada Care Pharmacy/Animacion Vertical_web.mp4',
        client: 'Nevada Care Pharmacy',
        year: 2024,
        tags: ['Animación', 'Farmacia', 'Promocional']
      },
      {
        id: 15,
        title: 'Servi-Sec Animation',
        category: 'video',
        description: 'Motion graphics para Servi-Sec, empresa de servicios de seguridad.',
        image: '/images/portfolio/video/servisec-animation-thumbnail.jpg',
        images: [
          '/images/portfolio/video/servisec-animation-thumbnail.jpg'
        ],
        video: '/images/portfolio/animation/Servi-Sec/Servi-Sec - Lavado en Seco (animacion)_web.mp4',
        client: 'Servi-Sec',
        year: 2024,
        tags: ['Animación', 'Seguridad', 'Corporativo']
      },

      // VIDEO PROJECTS
      {
        id: 16,
        title: 'Ambiente Chic',
        category: 'video',
        description: 'Video promocional para la gran apertura de Ambiente Chic.',
        image: '/images/portfolio/video/ambiente-chic-thumbnail.jpg',
        images: [
          '/images/portfolio/video/ambiente-chic-thumbnail.jpg'
        ],
        video: '/images/portfolio/video/Ambiente Chic/AmbienteChic - Grand Opening_web.mp4',
        client: 'Ambiente Chic',
        year: 2024,
        tags: ['Video', 'Evento', 'Promocional']
      },
      {
        id: 17,
        title: 'BeerOclock',
        category: 'video',
        description: 'Campaña audiovisual navideña para BeerOclock.',
        image: '/images/portfolio/video/beeroclock-thumbnail.jpg',
        images: [
          '/images/portfolio/video/beeroclock-thumbnail.jpg'
        ],
        video: '/images/portfolio/video/BeerOclock/Zentella X BeerOClock Navidad_web.mp4',
        client: 'BeerOclock',
        year: 2024,
        tags: ['Video', 'Navidad', 'Bebidas']
      },
      {
        id: 18,
        title: 'Esvi Hair Studio Video',
        category: 'video',
        description: 'Video promocional para Esvi Hair Studio, mostrando servicios premium.',
        image: '/images/portfolio/video/esvi-hair-studio-thumbnail.jpg',
        images: [
          '/images/portfolio/video/esvi-hair-studio-thumbnail.jpg'
        ],
        video: '/images/portfolio/video/Esvi Hair Studio/ESVI 23.08 Leo Corte-Secado_web.mp4',
        client: 'Esvi Hair Studio',
        year: 2024,
        tags: ['Video', 'Belleza', 'Promocional']
      },
      {
        id: 19,
        title: 'Heles Decorations',
        category: 'video',
        description: 'Video showcase para Heles Decorations, especialistas en decoración de eventos.',
        image: '/images/portfolio/video/heles-decorations-thumbnail.jpg',
        images: [
          '/images/portfolio/video/heles-decorations-thumbnail.jpg'
        ],
        video: '/images/portfolio/video/Heles Decorations/HELES_02.12 MAMMA MIA MONTAJE_web.mp4',
        client: 'Heles Decorations',
        year: 2024,
        tags: ['Video', 'Decoración', 'Eventos']
      },
      {
        id: 20,
        title: 'IEA Autos',
        category: 'video',
        description: 'Producción audiovisual para IEA Autos, destacando excelencia automotriz.',
        image: '/images/portfolio/video/iea-autos-thumbnail.jpg',
        images: [
          '/images/portfolio/video/iea-autos-thumbnail.jpg'
        ],
        video: '/images/portfolio/video/IEA Autos/IEA AUTOS - CRV GRIS 02.07_web.mp4',
        client: 'IEA Autos',
        year: 2024,
        tags: ['Video', 'Automotriz', 'Comercial']
      },
      {
        id: 21,
        title: 'ServiSec Video',
        category: 'video',
        description: 'Video corporativo para ServiSec, líder en servicios de seguridad.',
        image: '/images/portfolio/video/servisec-thumbnail.jpg',
        images: [
          '/images/portfolio/video/servisec-thumbnail.jpg'
        ],
        video: '/images/portfolio/video/ServiSec/Servisec - Lavado en Seco_web.mp4',
        client: 'ServiSec',
        year: 2024,
        tags: ['Video', 'Seguridad', 'Corporativo']
      },
      {
        id: 22,
        title: 'TimeHomes',
        category: 'video',
        description: 'Video promocional para TimeHomes María Teresa Condos.',
        image: '/images/portfolio/video/timehomes-thumbnail.jpg',
        images: [
          '/images/portfolio/video/timehomes-thumbnail.jpg'
        ],
        video: '/images/portfolio/video/TimeHomes/Maria Teresa Condos - TimeHomes_web.mp4',
        client: 'TimeHomes',
        year: 2024,
        tags: ['Video', 'Inmobiliaria', 'Promocional']
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
    setCurrentImageIndex(0)
    setThumbnailStartIndex(0)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
    setCurrentImageIndex(0)
    setThumbnailStartIndex(0)
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

  const selectImage = (index: number) => {
    console.log('Selecting image index:', index)
    console.log('Available images:', selectedItem?.images.length)
    setCurrentImageIndex(index)
  }

  // Get current image with fallback
  const getCurrentImage = () => {
    if (!selectedItem) return ''
    const currentImg = selectedItem.images[currentImageIndex] || selectedItem.images[0] || selectedItem.image
    console.log('Current image index:', currentImageIndex, 'Image URL:', currentImg)
    return currentImg
  }

  const nextThumbnails = () => {
    if (selectedItem && thumbnailStartIndex + 3 < selectedItem.images.length) {
      setThumbnailStartIndex(prev => prev + 3)
    }
  }

  const prevThumbnails = () => {
    if (thumbnailStartIndex > 0) {
      setThumbnailStartIndex(prev => Math.max(0, prev - 3))
    }
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
      className="min-h-screen pt-16 pb-16 md:pt-20 md:pb-20 text-text-primary-light dark:text-text-primary-dark relative overflow-hidden"
      ref={elementRef}
      style={{
        background: isDark
          ? `
            radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%),
            repeating-conic-gradient(from 30deg at 50% 50%, transparent 0deg, rgba(103, 0, 248, 0.05) 60deg, transparent 120deg),
            linear-gradient(30deg, transparent 25%, rgba(172, 0, 211, 0.02) 25%, rgba(172, 0, 211, 0.02) 75%, transparent 75%)
          `
          : `
            radial-gradient(ellipse at center, #F8FAFC 0%, #FDFEFF 100%),
            repeating-conic-gradient(from 30deg at 50% 50%, transparent 0deg, rgba(103, 0, 248, 0.02) 60deg, transparent 120deg),
            linear-gradient(30deg, transparent 25%, rgba(172, 0, 211, 0.008) 25%, rgba(172, 0, 211, 0.008) 75%, transparent 75%)
          `,
        backgroundSize: '100% 100%, 120px 120px, 40px 40px'
      }}
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
            <span className="px-4 py-2 bg-color-primary/10 dark:bg-color-primary/20 text-color-primary dark:text-white text-sm font-medium rounded-full border border-color-primary/20 dark:border-color-primary/30">
              {t('portfolio.badge')}
            </span>
          </motion.div>

          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black mb-6 font-display bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent" style={{lineHeight: '1.4', paddingBottom: '0.25rem', overflow: 'visible'}}>
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
              className={`group relative overflow-hidden px-6 py-3 rounded-full transition-all duration-300 ${selectedCategory === category.id 
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
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  priority={index < 3}
                  placeholder="skeleton"
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
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pt-20 portfolio-modal"
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
                          key={`main-image-${currentImageIndex}-${getCurrentImage()}`}
                          src={getCurrentImage()}
                          alt={selectedItem.title}
                          className="w-full h-auto rounded-lg mb-4 cursor-pointer transition-opacity duration-300"
                          onClick={() => openFullscreen(getCurrentImage())}
                          loading="eager"
                          onLoad={() => console.log('Image loaded:', getCurrentImage())}
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
                  
                  {/* Thumbnail Navigation */}
                  <div className="flex items-center space-x-2">
                    {/* Previous thumbnails button */}
                    {thumbnailStartIndex > 0 && (
                      <motion.button
                        onClick={prevThumbnails}
                        className="flex-shrink-0 w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md flex items-center justify-center transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </motion.button>
                    )}
                    
                    {/* Thumbnails */}
                    <div className="flex space-x-2 flex-1">
                      {selectedItem.images
                        .slice(thumbnailStartIndex, thumbnailStartIndex + 3)
                        .map((image, index) => {
                          const actualIndex = thumbnailStartIndex + index
                          return (
                            <OptimizedImage
                              key={actualIndex}
                              src={image}
                              alt={`${selectedItem.title} thumbnail ${actualIndex}`}
                              className={`w-16 h-16 object-cover rounded-md cursor-pointer transition-all duration-200 ${
                                actualIndex === currentImageIndex 
                                  ? 'ring-2 ring-color-primary' 
                                  : 'hover:ring-2 hover:ring-color-primary/50'
                              }`}
                              onClick={() => selectImage(actualIndex)}
                              loading="eager"
                              priority={actualIndex < currentImageIndex + 3}
                              placeholder="skeleton"
                            />
                          )
                        })}
                    </div>
                    
                    {/* Next thumbnails button */}
                    {thumbnailStartIndex + 3 < selectedItem.images.length && (
                      <motion.button
                        onClick={nextThumbnails}
                        className="flex-shrink-0 w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md flex items-center justify-center transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    )}
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
              className="fixed inset-0 z-[1010] flex items-center justify-center bg-black/95 backdrop-blur-sm"
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
                <OptimizedImage
                  key={`fullscreen-${fullscreenImage}`}
                  src={fullscreenImage}
                  alt="Imagen en pantalla completa"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  loading="eager"
                  priority={true}
                  placeholder="skeleton"
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
