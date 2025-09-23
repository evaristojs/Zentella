import { useState, useEffect, useMemo, useReducer, useCallback } from 'react'
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

// Advanced state management with useReducer
interface PortfolioState {
  portfolioItems: PortfolioItem[]
  selectedCategory: string
  selectedItem: PortfolioItem | null
  isModalOpen: boolean
  isFullscreenOpen: boolean
  fullscreenImage: string
  itemsToShow: number
  currentImageIndex: number
  yearFilter: number | null
  tagFilters: string[]
  sortBy: 'date' | 'name' | 'category'
  sortOrder: 'asc' | 'desc'
  slideshowActive: boolean
  zoomLevel: number
  panPosition: { x: number; y: number }
  imageErrors: Set<string>
  retryAttempts: Map<string, number>
  lastViewedItem: number | null
  showMobileInstructions: boolean
  imageDirection: 'next' | 'prev' | null
}

type PortfolioAction =
  | { type: 'SET_PORTFOLIO_ITEMS'; payload: PortfolioItem[] }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'OPEN_MODAL'; payload: PortfolioItem }
  | { type: 'CLOSE_MODAL' }
  | { type: 'OPEN_FULLSCREEN'; payload: string }
  | { type: 'CLOSE_FULLSCREEN' }
  | { type: 'SET_ITEMS_TO_SHOW'; payload: number }
  | { type: 'NEXT_IMAGE' }
  | { type: 'PREV_IMAGE' }
  | { type: 'SELECT_IMAGE'; payload: number }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_YEAR_FILTER'; payload: number | null }
  | { type: 'TOGGLE_TAG_FILTER'; payload: string }
  | { type: 'SET_SORT'; payload: { sortBy: string; sortOrder: string } }
  | { type: 'SET_PREVIEW'; payload: { image: string | null; position: { x: number; y: number } } }
  | { type: 'TOGGLE_SLIDESHOW' }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'SET_PAN'; payload: { x: number; y: number } }
  | { type: 'ADD_IMAGE_ERROR'; payload: string }
  | { type: 'RETRY_IMAGE'; payload: string }
  | { type: 'SET_LAST_VIEWED'; payload: number }
  | { type: 'HIDE_MOBILE_INSTRUCTIONS' }
  | { type: 'SHOW_MOBILE_INSTRUCTIONS' }

const portfolioReducer = (state: PortfolioState, action: PortfolioAction): PortfolioState => {
  switch (action.type) {
    case 'SET_PORTFOLIO_ITEMS':
      return { ...state, portfolioItems: action.payload }

    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload, itemsToShow: 6 }

    case 'OPEN_MODAL':
      return {
        ...state,
        selectedItem: action.payload,
        currentImageIndex: 0,
        isModalOpen: true,
        lastViewedItem: action.payload.id
      }

    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        selectedItem: null,
        currentImageIndex: 0,
        slideshowActive: false,
        zoomLevel: 1,
        panPosition: { x: 0, y: 0 }
      }

    case 'OPEN_FULLSCREEN':
      return { ...state, fullscreenImage: action.payload, isFullscreenOpen: true, showMobileInstructions: true }

    case 'CLOSE_FULLSCREEN':
      return { ...state, isFullscreenOpen: false, fullscreenImage: '', showMobileInstructions: false }

    case 'SET_ITEMS_TO_SHOW':
      return { ...state, itemsToShow: action.payload }

    case 'NEXT_IMAGE':
      if (!state.selectedItem) return state
      const nextIndex = state.currentImageIndex < state.selectedItem.images.length - 1
        ? state.currentImageIndex + 1
        : 0
      return { ...state, currentImageIndex: nextIndex, imageDirection: 'next' }

    case 'PREV_IMAGE':
      if (!state.selectedItem) return state
      const prevIndex = state.currentImageIndex > 0
        ? state.currentImageIndex - 1
        : state.selectedItem.images.length - 1
      return { ...state, currentImageIndex: prevIndex, imageDirection: 'prev' }

    case 'SELECT_IMAGE':
      return { ...state, currentImageIndex: action.payload }


    case 'SET_YEAR_FILTER':
      return { ...state, yearFilter: action.payload }

    case 'TOGGLE_TAG_FILTER':
      const tagFilters = state.tagFilters.includes(action.payload)
        ? state.tagFilters.filter(tag => tag !== action.payload)
        : [...state.tagFilters, action.payload]
      return { ...state, tagFilters }

    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.sortBy as any,
        sortOrder: action.payload.sortOrder as any
      }


    case 'TOGGLE_SLIDESHOW':
      return { ...state, slideshowActive: !state.slideshowActive }

    case 'SET_ZOOM':
      return { ...state, zoomLevel: action.payload }

    case 'SET_PAN':
      return { ...state, panPosition: action.payload }

    case 'ADD_IMAGE_ERROR':
      const newErrors = new Set(state.imageErrors)
      newErrors.add(action.payload)
      return { ...state, imageErrors: newErrors }

    case 'RETRY_IMAGE':
      const newRetries = new Map(state.retryAttempts)
      const currentRetries = newRetries.get(action.payload) || 0
      newRetries.set(action.payload, currentRetries + 1)
      return { ...state, retryAttempts: newRetries }

    case 'SET_LAST_VIEWED':
      return { ...state, lastViewedItem: action.payload }

    case 'HIDE_MOBILE_INSTRUCTIONS':
      return { ...state, showMobileInstructions: false }

    case 'SHOW_MOBILE_INSTRUCTIONS':
      return { ...state, showMobileInstructions: true }

    default:
      return state
  }
}

// Custom hooks for localStorage persistence
const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue]
}

// Touch/Swipe gesture hook
const useSwipeable = (handlers: {
  onSwipedLeft?: () => void
  onSwipedRight?: () => void
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    if (e.targetTouches[0]) {
      setTouchStart(e.targetTouches[0].clientX)
    }
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches[0]) {
      setTouchEnd(e.targetTouches[0].clientX)
    }
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && handlers.onSwipedLeft) {
      handlers.onSwipedLeft()
    }
    if (isRightSwipe && handlers.onSwipedRight) {
      handlers.onSwipedRight()
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}

// Combined touch gestures hook for fullscreen (pinch zoom + swipe navigation)
const useFullscreenTouchGestures = (dispatch: React.Dispatch<PortfolioAction>) => {
  const [initialDistance, setInitialDistance] = useState<number | null>(null)
  const [initialZoom, setInitialZoom] = useState<number>(1)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  const minSwipeDistance = 50

  const getDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0
    const touch1 = touches[0]
    const touch2 = touches[1]
    if (!touch1 || !touch2) return 0
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    )
  }

  const onTouchStart = (e: React.TouchEvent, currentZoom: number) => {
    if (e.touches.length === 2) {
      // Pinch zoom gesture
      e.preventDefault()
      const distance = getDistance(e.touches)
      setInitialDistance(distance)
      setInitialZoom(currentZoom)
      setTouchStart(null)
      setTouchEnd(null)
    } else if (e.touches.length === 1 && e.targetTouches[0]) {
      // Single touch for swipe
      setTouchEnd(null)
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      })
      setInitialDistance(null)
    }
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistance) {
      // Handle pinch zoom
      e.preventDefault()
      const currentDistance = getDistance(e.touches)
      const scale = currentDistance / initialDistance
      const newZoom = Math.min(3, Math.max(0.5, initialZoom * scale))
      dispatch({ type: 'SET_ZOOM', payload: newZoom })
    } else if (e.touches.length === 1 && touchStart && e.targetTouches[0]) {
      // Handle swipe
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      })
    }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      setInitialDistance(null)
    }

    // Handle swipe navigation when single touch ends
    if (touchStart && touchEnd && e.touches.length === 0) {
      const distanceX = touchStart.x - touchEnd.x
      const distanceY = Math.abs(touchStart.y - touchEnd.y)

      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(distanceX) > minSwipeDistance && Math.abs(distanceX) > distanceY) {
        const isLeftSwipe = distanceX > minSwipeDistance
        const isRightSwipe = distanceX < -minSwipeDistance

        if (isLeftSwipe) {
          dispatch({ type: 'NEXT_IMAGE' })
        } else if (isRightSwipe) {
          dispatch({ type: 'PREV_IMAGE' })
        }
      }

      setTouchStart(null)
      setTouchEnd(null)
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}

const Portfolio = () => {
  const initialState: PortfolioState = {
    portfolioItems: [],
    selectedCategory: 'all',
    selectedItem: null,
    isModalOpen: false,
    isFullscreenOpen: false,
    fullscreenImage: '',
    itemsToShow: 6,
    currentImageIndex: 0,
    yearFilter: null,
    tagFilters: [],
    sortBy: 'date',
    sortOrder: 'desc',
    slideshowActive: false,
    zoomLevel: 1,
    panPosition: { x: 0, y: 0 },
    imageErrors: new Set(),
    retryAttempts: new Map(),
    lastViewedItem: null,
    showMobileInstructions: true,
    imageDirection: null
  }

  const [state, dispatch] = useReducer(portfolioReducer, initialState)
  const [lastViewedItem, setLastViewedItem] = useLocalStorage<number | null>('portfolio-last-viewed', null)
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

  // Get current image with useMemo for proper dependency tracking
  const currentImageSrc = useMemo(() => {
    if (!state.selectedItem) return ''
    return state.selectedItem.images[state.currentImageIndex] || state.selectedItem.images[0] || state.selectedItem.image
  }, [state.selectedItem, state.currentImageIndex])

  // Advanced filtering and sorting
  const filteredAndSortedItems = useMemo(() => {
    let items = [...state.portfolioItems]

    // Filter by category
    if (state.selectedCategory !== 'all') {
      items = items.filter(item => item.category === state.selectedCategory)
    }


    // Filter by year
    if (state.yearFilter) {
      items = items.filter(item => item.year === state.yearFilter)
    }

    // Filter by tags
    if (state.tagFilters.length > 0) {
      items = items.filter(item =>
        state.tagFilters.every(filterTag =>
          item.tags.some(itemTag => itemTag.toLowerCase().includes(filterTag.toLowerCase()))
        )
      )
    }

    // Sort items
    items.sort((a, b) => {
      let comparison = 0

      switch (state.sortBy) {
        case 'date':
          comparison = a.year - b.year
          break
        case 'name':
          comparison = a.title.localeCompare(b.title)
          break
        case 'category':
          comparison = a.category.localeCompare(b.category)
          break
      }

      return state.sortOrder === 'asc' ? comparison : -comparison
    })

    return items
  }, [state.portfolioItems, state.selectedCategory, state.yearFilter, state.tagFilters, state.sortBy, state.sortOrder])

  const displayedItems = filteredAndSortedItems.slice(0, state.itemsToShow)
  const hasMoreItems = displayedItems.length < filteredAndSortedItems.length

  // Get all unique years and tags for filters
  // const availableYears = useMemo(() => {
  //   const years = [...new Set(state.portfolioItems.map(item => item.year))]
  //   return years.sort((a, b) => b - a)
  // }, [state.portfolioItems])

  // const availableTags = useMemo(() => {
  //   const tags = new Set<string>()
  //   state.portfolioItems.forEach(item => {
  //     item.tags.forEach(tag => tags.add(tag))
  //   })
  //   return Array.from(tags).sort()
  // }, [state.portfolioItems])

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (state.isModalOpen && state.selectedItem) {
        dispatch({ type: 'NEXT_IMAGE' })
      }
    },
    onSwipedRight: () => {
      if (state.isModalOpen && state.selectedItem) {
        dispatch({ type: 'PREV_IMAGE' })
      }
    }
  })

  // Combined touch handlers for fullscreen (zoom + navigation)
  const fullscreenTouchHandlers = useFullscreenTouchGestures(dispatch)

  // Portfolio data initialization with translations
  const realPortfolio: PortfolioItem[] = useMemo(() => [
      // BRANDING PROJECTS
      {
        id: 1,
        title: t('portfolio.better_health.titulo'),
        category: 'design',
        description: t('portfolio.better_health.descripcion'),
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
        client: t('portfolio.better_health.cliente'),
        year: 2024,
        tags: ['Branding', 'Identidad Visual', 'Salud']
      },
      {
        id: 2,
        title: t('portfolio.kaccao.titulo'),
        category: 'design',
        description: t('portfolio.kaccao.descripcion'),
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
        client: t('portfolio.kaccao.cliente'),
        year: 2024,
        tags: ['Branding', 'Restaurante', 'Logo']
      },
      {
        id: 3,
        title: t('portfolio.los_hotdogs.titulo'),
        category: 'design',
        description: t('portfolio.los_hotdogs.descripcion'),
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
        client: t('portfolio.los_hotdogs.cliente'),
        year: 2024,
        tags: ['Branding', 'Comida Rápida', 'Gourmet']
      },
      {
        id: 4,
        title: t('portfolio.nevada_care.titulo'),
        category: 'design',
        description: t('portfolio.nevada_care.descripcion'),
        image: '/images/portfolio/branding/nevada-care-pharmacy/nevada-care-pharmacy-1.webp',
        images: [
          '/images/portfolio/branding/nevada-care-pharmacy/nevada-care-pharmacy-1.webp',
          '/images/portfolio/branding/nevada-care-pharmacy/nevada-care-pharmacy-2.webp',
          '/images/portfolio/branding/nevada-care-pharmacy/nevada-care-pharmacy-3.webp'
        ],
        client: t('portfolio.nevada_care.cliente'),
        year: 2024,
        tags: ['Branding', 'Farmacia', 'Salud']
      },
      {
        id: 5,
        title: t('portfolio.palo_studio.titulo'),
        category: 'design',
        description: t('portfolio.palo_studio.descripcion'),
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
        client: t('portfolio.palo_studio.cliente'),
        year: 2024,
        tags: ['Branding', 'Estudio', 'Creativo']
      },
      {
        id: 6,
        title: t('portfolio.premeditest.titulo'),
        category: 'design',
        description: t('portfolio.premeditest.descripcion'),
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
        client: t('portfolio.premeditest.cliente'),
        year: 2024,
        tags: ['Branding', 'Educación', 'Medicina']
      },
      {
        id: 7,
        title: t('portfolio.th_oasis.titulo'),
        category: 'design',
        description: t('portfolio.th_oasis.descripcion'),
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
        client: t('portfolio.th_oasis.cliente'),
        year: 2024,
        tags: ['Branding', 'Inmobiliaria', 'Lujo']
      },

      // PHOTOGRAPHY PROJECTS
      {
        id: 8,
        title: t('portfolio.ajf_panaderia.titulo'),
        category: 'photography',
        description: t('portfolio.ajf_panaderia.descripcion'),
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
        client: t('portfolio.ajf_panaderia.cliente'),
        year: 2024,
        tags: ['Fotografía', 'Productos', 'Panadería']
      },
      {
        id: 9,
        title: t('portfolio.el_cayuco.titulo'),
        category: 'photography',
        description: t('portfolio.el_cayuco.descripcion'),
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
        client: t('portfolio.el_cayuco.cliente'),
        year: 2024,
        tags: ['Fotografía', 'Gastronomía', 'Restaurante']
      },
      {
        id: 10,
        title: t('portfolio.esvi_hair.titulo'),
        category: 'photography',
        description: t('portfolio.esvi_hair.descripcion'),
        image: '/images/portfolio/photography/Esvi Hair Studio/Recurso 1esvi_medium.webp',
        images: [
          '/images/portfolio/photography/Esvi Hair Studio/Recurso 1esvi_large.webp',
          '/images/portfolio/photography/Esvi Hair Studio/Recurso 2esvi_large.webp',
          '/images/portfolio/photography/Esvi Hair Studio/Recurso 3esvi_large.webp',
          '/images/portfolio/photography/Esvi Hair Studio/Recurso 4esvi_large.webp',
          '/images/portfolio/photography/Esvi Hair Studio/Recurso 5esvi_large.webp',
          '/images/portfolio/photography/Esvi Hair Studio/Recurso 6esvi_large.webp'
        ],
        client: t('portfolio.esvi_hair.cliente'),
        year: 2024,
        tags: ['Fotografía', 'Belleza', 'Estudio']
      },
      {
        id: 11,
        title: t('portfolio.revel_bar.titulo'),
        category: 'photography',
        description: t('portfolio.revel_bar.descripcion'),
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
        client: t('portfolio.revel_bar.cliente'),
        year: 2024,
        tags: ['Fotografía', 'Bar', 'Gastronomía']
      },
      {
        id: 12,
        title: t('portfolio.widook_optic.titulo'),
        category: 'photography',
        description: t('portfolio.widook_optic.descripcion'),
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
        client: t('portfolio.widook_optic.cliente'),
        year: 2024,
        tags: ['Fotografía', 'Productos', 'Óptica']
      },

      // ANIMATION/DESIGN PROJECTS
      {
        id: 13,
        title: t('portfolio.chavalines.titulo'),
        category: 'animation',
        description: t('portfolio.chavalines.descripcion'),
        image: '/images/portfolio/animation/Chavalines RP/3D Logo Entrada.webp',
        images: [
          '/images/portfolio/animation/Chavalines RP/3D Logo Entrada.webp',
          '/images/portfolio/animation/Chavalines RP/3D Visual Logo.webp',
          '/images/portfolio/animation/Chavalines RP/Banner Conectando Green 770x240px .webp'
        ],
        client: t('portfolio.chavalines.cliente'),
        year: 2024,
        tags: ['Animación', 'Gaming', 'Gráficos']
      },
      {
        id: 14,
        title: t('portfolio.nevada_care.titulo'),
        category: 'animation',
        description: t('portfolio.nevada_care.descripcion'),
        image: '/images/portfolio/nevada-care-animation.webp',
        images: [
          '/images/portfolio/nevada-care-animation.webp'
        ],
        video: '/images/portfolio/animation/Nevada Care Pharmacy/Animacion Vertical_web.mp4',
        client: t('portfolio.nevada_care.cliente'),
        year: 2024,
        tags: ['Animación', 'Farmacia', 'Promocional']
      },
      {
        id: 15,
        title: t('portfolio.servi_sec.titulo'),
        category: 'animation',
        description: t('portfolio.servi_sec.descripcion'),
        image: '/images/portfolio/servisec-animation.webp',
        images: [
          '/images/portfolio/servisec-animation.webp'
        ],
        video: '/images/portfolio/animation/Servi-Sec/Servi-Sec - Lavado en Seco (animacion)_web.mp4',
        client: t('portfolio.servi_sec.cliente'),
        year: 2024,
        tags: ['Animación', 'Lavandería', 'Corporativo']
      },

      // VIDEO PROJECTS
      {
        id: 16,
        title: t('portfolio.ambiente_chic.titulo'),
        category: 'video',
        description: t('portfolio.ambiente_chic.descripcion'),
        image: '/images/portfolio/video/ambiente-chic-grand-opening.webp',
        images: [
          '/images/portfolio/video/ambiente-chic-grand-opening.webp'
        ],
        video: '/videos/portfolio/videography/ambiente-chic-grand-opening.mp4',
        client: t('portfolio.ambiente_chic.cliente'),
        year: 2024,
        tags: ['Video', 'Evento', 'Promocional']
      },
      {
        id: 17,
        title: t('portfolio.beeroclock.titulo'),
        category: 'video',
        description: t('portfolio.beeroclock.descripcion'),
        image: '/images/portfolio/video/beeroclock-navidad.webp',
        images: [
          '/images/portfolio/video/beeroclock-navidad.webp'
        ],
        video: '/videos/portfolio/videography/beeroclock-navidad.mp4',
        client: t('portfolio.beeroclock.cliente'),
        year: 2024,
        tags: ['Video', 'Navidad', 'Bebidas']
      },
      {
        id: 18,
        title: t('portfolio.time_homes.titulo'),
        category: 'video',
        description: t('portfolio.time_homes.descripcion'),
        image: '/images/portfolio/video/teresa-condos.webp',
        images: [
          '/images/portfolio/video/teresa-condos.webp'
        ],
        video: '/videos/portfolio/videography/timehomes-maria-teresa-condos.mp4',
        client: t('portfolio.time_homes.cliente'),
        year: 2024,
        tags: ['Video', 'Inmobiliaria', 'Promocional']
      }
    ], [t])

  // Update portfolio items and selected item when language changes
  useEffect(() => {
    dispatch({ type: 'SET_PORTFOLIO_ITEMS', payload: realPortfolio })

    // Update selected item if modal is open
    if (state.selectedItem) {
      const updatedSelectedItem = realPortfolio.find(item => item.id === state.selectedItem!.id)
      if (updatedSelectedItem) {
        dispatch({ type: 'OPEN_MODAL', payload: updatedSelectedItem })
      }
    }
  }, [realPortfolio, state.selectedItem?.id])

  // Slideshow effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (state.slideshowActive && state.selectedItem) {
      interval = setInterval(() => {
        dispatch({ type: 'NEXT_IMAGE' })
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [state.slideshowActive, state.selectedItem])

  // Advanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (state.isFullscreenOpen) {
          dispatch({ type: 'CLOSE_FULLSCREEN' })
        } else if (state.isModalOpen) {
          dispatch({ type: 'CLOSE_MODAL' })
        }
      } else if (state.isModalOpen && state.selectedItem && !state.isFullscreenOpen) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault()
            dispatch({ type: 'PREV_IMAGE' })
            break
          case 'ArrowRight':
            event.preventDefault()
            dispatch({ type: 'NEXT_IMAGE' })
            break
          case 'Home':
            event.preventDefault()
            dispatch({ type: 'SELECT_IMAGE', payload: 0 })
            break
          case 'End':
            event.preventDefault()
            dispatch({ type: 'SELECT_IMAGE', payload: state.selectedItem.images.length - 1 })
            break
          case ' ':
            event.preventDefault()
            dispatch({ type: 'OPEN_FULLSCREEN', payload: currentImageSrc })
            break
          case 's':
            event.preventDefault()
            dispatch({ type: 'TOGGLE_SLIDESHOW' })
            break
        }
      } else if (state.isFullscreenOpen && state.selectedItem) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault()
            dispatch({ type: 'PREV_IMAGE' })
            break
          case 'ArrowRight':
            event.preventDefault()
            dispatch({ type: 'NEXT_IMAGE' })
            break
          case 'Home':
            event.preventDefault()
            dispatch({ type: 'SELECT_IMAGE', payload: 0 })
            break
          case 'End':
            event.preventDefault()
            dispatch({ type: 'SELECT_IMAGE', payload: state.selectedItem.images.length - 1 })
            break
          case '+':
          case '=':
            event.preventDefault()
            dispatch({ type: 'SET_ZOOM', payload: Math.min(3, state.zoomLevel + 0.25) })
            break
          case '-':
            event.preventDefault()
            dispatch({ type: 'SET_ZOOM', payload: Math.max(0.5, state.zoomLevel - 0.25) })
            break
          case '0':
            event.preventDefault()
            dispatch({ type: 'SET_ZOOM', payload: 1 })
            break
        }
      }
    }

    if (state.isModalOpen || state.isFullscreenOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [state.isModalOpen, state.isFullscreenOpen, state.currentImageIndex, state.selectedItem, currentImageSrc])

  // Body scroll management
  useEffect(() => {
    if (state.isModalOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [state.isModalOpen])

  // Auto-hide mobile instructions after 5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (state.isFullscreenOpen && state.showMobileInstructions) {
      timer = setTimeout(() => {
        dispatch({ type: 'HIDE_MOBILE_INSTRUCTIONS' })
      }, 5000)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [state.isFullscreenOpen, state.showMobileInstructions])

  // Analytics tracking
  const trackPortfolioView = useCallback((itemId: number) => {
    // Here you would implement your analytics tracking
    console.log(`Portfolio item ${itemId} viewed (previous: ${lastViewedItem})`)
    dispatch({ type: 'SET_LAST_VIEWED', payload: itemId })
    setLastViewedItem(itemId)
  }, [lastViewedItem, setLastViewedItem])


  // Image error handling with retry
  const handleImageError = useCallback((src: string) => {
    dispatch({ type: 'ADD_IMAGE_ERROR', payload: src })

    const retries = state.retryAttempts.get(src) || 0
    if (retries < 3) {
      setTimeout(() => {
        dispatch({ type: 'RETRY_IMAGE', payload: src })
      }, 1000 * (retries + 1))
    }
  }, [state.retryAttempts])

  // Share functionality
  const shareProject = useCallback(async (item: PortfolioItem) => {
    const shareData = {
      title: `${item.title} - Zentella Portfolio`,
      text: item.description,
      url: `${window.location.origin}#portfolio`
    }

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Error sharing:', error)
        // Fallback to clipboard
        fallbackShare(shareData)
      }
    } else {
      // Fallback for browsers without Web Share API
      fallbackShare(shareData)
    }
  }, [])

  const fallbackShare = (shareData: { title: string; text: string; url: string }) => {
    const shareText = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        // Could show a toast notification here
        console.log('Enlace copiado al portapapeles')
      }).catch(() => {
        // Fallback to creating a temporary textarea
        createTextAreaFallback(shareText)
      })
    } else {
      createTextAreaFallback(shareText)
    }
  }

  const createTextAreaFallback = (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      document.execCommand('copy')
      console.log('Enlace copiado al portapapeles')
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }

    document.body.removeChild(textArea)
  }


  // Actions
  const openModal = (item: PortfolioItem) => {
    dispatch({ type: 'OPEN_MODAL', payload: item })
    trackPortfolioView(item.id)
    document.body.classList.add('modal-open')
  }

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' })
    document.body.classList.remove('modal-open')
  }

  const openFullscreen = (imageUrl: string) => {
    dispatch({ type: 'OPEN_FULLSCREEN', payload: imageUrl })
  }

  const closeFullscreen = () => {
    dispatch({ type: 'CLOSE_FULLSCREEN' })
    if (!state.isModalOpen) {
      document.body.classList.remove('modal-open')
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: categoryId })
  }

  const loadMore = () => {
    dispatch({ type: 'SET_ITEMS_TO_SHOW', payload: state.itemsToShow + 6 })
  }

  const showLess = () => {
    dispatch({ type: 'SET_ITEMS_TO_SHOW', payload: 6 })
  }

  const toggleItems = () => {
    if (hasMoreItems) {
      loadMore()
    } else {
      showLess()
    }
  }

  const selectImage = (index: number) => {
    dispatch({ type: 'SELECT_IMAGE', payload: index })
  }

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


        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`group relative overflow-hidden px-6 py-3 rounded-full transition-all duration-300 ${state.selectedCategory === category.id
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



        {/* Portfolio Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${state.selectedCategory}-${state.yearFilter}-${state.tagFilters.join(',')}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="group relative rounded-3xl overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800"
                onClick={() => openModal(item)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                style={{ height: '280px' }}
                role="button"
                tabIndex={0}
                aria-label={`Ver proyecto ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openModal(item)
                  }
                }}
              >
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover absolute inset-0"
                  loading={index < 3 ? "eager" : "lazy"}
                  onError={() => handleImageError(item.image)}
                />
                {item.video && (
                  <div className="absolute top-4 right-4 bg-color-primary text-white rounded-full p-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-4">
                    <h3 className="text-white text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.client}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More / Show Less */}
        {(hasMoreItems || state.itemsToShow > 6) && (
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

        {/* Advanced Modal */}
        <AnimatePresence>
          {state.isModalOpen && state.selectedItem && (
            <motion.div
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pt-[65px] xl:pt-[90px] xl:pb-[10px] portfolio-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              {...swipeHandlers}
            >
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={closeModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="relative bg-bg-secondary-light dark:bg-bg-secondary-dark max-w-4xl w-full max-h-[calc(85vh-4rem)] overflow-y-auto rounded-2xl border border-gray-200/50 dark:border-gray-700/50 flex flex-col md:flex-row"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
              >
                <div className="w-full md:w-1/2 p-8 flex flex-col xl:justify-start justify-center">
                  <div className="relative group mb-4 xl:flex-1 xl:flex xl:flex-col xl:justify-center">
                    {state.selectedItem.video ? (
                      <video
                        src={state.selectedItem.video}
                        controls
                        className="w-full h-auto rounded-lg"
                        poster={state.selectedItem.image}
                      >
                        Tu navegador no soporta el elemento de video.
                      </video>
                    ) : (
                      <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg aspect-[3/2] overflow-hidden">
                        <OptimizedImage
                          key={`modal-image-${state.selectedItem.id}-${state.currentImageIndex}`}
                          src={currentImageSrc}
                          alt={state.selectedItem.title}
                          className="w-full h-full object-cover cursor-pointer absolute inset-0"
                          onClick={() => openFullscreen(currentImageSrc)}
                          loading="eager"
                          style={{
                            transform: `scale(${state.zoomLevel}) translate(${state.panPosition.x}px, ${state.panPosition.y}px)`,
                            transition: 'transform 0.2s ease-out'
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                          <motion.div
                            className="bg-white/20 backdrop-blur-sm rounded-full p-3 cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              openFullscreen(currentImageSrc)
                            }}
                          >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Navigation */}
                  <div className="w-full px-2 md:px-0 mt-1 xl:mt-1">
                    <div className="flex space-x-2 overflow-x-auto scrollbar-hide py-2 px-1 cursor-grab active:cursor-grabbing select-none">
                      {state.selectedItem.images.map((image, index) => (
                        <OptimizedImage
                          key={index}
                          src={image}
                          alt={`${state.selectedItem?.title || 'Portfolio item'} thumbnail ${index}`}
                          className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 object-cover rounded-md cursor-pointer transition-all duration-200 ${
                            index === state.currentImageIndex
                              ? 'ring-2 ring-color-primary'
                              : 'hover:ring-2 hover:ring-color-primary/50'
                          }`}
                          onClick={() => selectImage(index)}
                          loading="eager"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 p-8">
                  <h3 id="modal-title" className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4 font-display">
                    {state.selectedItem.title}
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                    {state.selectedItem.description}
                  </p>

                  {/* Project Details */}
                  <div className="text-text-secondary-light dark:text-text-secondary-dark space-y-2 mb-6">
                    <p><span className="font-bold text-text-primary-light dark:text-text-primary-dark">{t('portfolio.cliente')}</span> {state.selectedItem.client}</p>
                    <p><span className="font-bold text-text-primary-light dark:text-text-primary-dark">{t('portfolio.ano')}</span> {state.selectedItem.year}</p>
                    <div>
                      <span className="font-bold text-text-primary-light dark:text-text-primary-dark">{t('portfolio.tags')}</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {state.selectedItem.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 text-sm bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-secondary-light dark:text-text-secondary-dark rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Modal Controls */}
                  <div className="flex gap-2 mb-4">
                    <motion.button
                      onClick={() => dispatch({ type: 'TOGGLE_SLIDESHOW' })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        state.slideshowActive
                          ? 'bg-color-primary text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-text-primary-light dark:text-text-primary-dark'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={t('portfolio.slideshow_title')}
                    >
                      {state.slideshowActive ? t('portfolio.pausar') : t('portfolio.slideshow')}
                    </motion.button>

                    {/* Share Button - Mobile Only */}
                    <motion.button
                      onClick={() => state.selectedItem && shareProject(state.selectedItem)}
                      className="md:hidden px-4 py-2 rounded-lg text-sm font-medium bg-color-primary text-white hover:bg-color-primary/80 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={t('portfolio.compartir_proyecto')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      {t('portfolio.compartir')}
                    </motion.button>
                  </div>

                  {/* Navigation Instructions - Mobile Only */}
                  <div className="md:hidden text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    <p className="mb-1">{t('portfolio.navegacion')}:</p>
                    <ul className="text-xs space-y-1">
                      <li>• {t('portfolio.flechas_cambiar')}</li>
                      <li>• {t('portfolio.espacio_pantalla_completa')}</li>
                      <li>• {t('portfolio.s_slideshow')}</li>
                      <li>• {t('portfolio.escape_cerrar')}</li>
                    </ul>
                  </div>

                  {/* Desktop-only enhanced content */}
                  <div className="hidden xl:block mt-8">
                    <div className="bg-bg-base-light dark:bg-bg-base-dark rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
                        {t('portfolio.detalles_proyecto')}
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-color-primary rounded-full"></div>
                          <span className="text-text-secondary-light dark:text-text-secondary-dark">
                            <span className="font-medium text-text-primary-light dark:text-text-primary-dark">{t('portfolio.categoria')}</span> {
                              state.selectedItem.category === 'design' ? t('portfolio.cat_diseno_grafico') :
                              state.selectedItem.category === 'photography' ? t('portfolio.cat_fotografia_profesional') :
                              state.selectedItem.category === 'video' ? t('portfolio.cat_produccion_audiovisual') : t('portfolio.cat_motion_graphics')
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-color-primary rounded-full"></div>
                          <span className="text-text-secondary-light dark:text-text-secondary-dark">
                            <span className="font-medium text-text-primary-light dark:text-text-primary-dark">{t('portfolio.imagenes')}</span> {state.selectedItem.images.length} {t('portfolio.archivo')}{state.selectedItem.images.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 z-10 text-text-primary-light dark:text-text-primary-dark bg-bg-secondary-light/50 dark:bg-bg-secondary-dark/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-full p-2"
                  onClick={closeModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Cerrar modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Fullscreen Modal with Zoom */}
        <AnimatePresence>
          {state.isFullscreenOpen && (
            <motion.div
              className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFullscreen}
            >
              <motion.div
                className="group relative max-w-[95vw] max-h-[95vh] flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={(e) => fullscreenTouchHandlers.onTouchStart(e, state.zoomLevel)}
                onTouchMove={fullscreenTouchHandlers.onTouchMove}
                onTouchEnd={fullscreenTouchHandlers.onTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`fullscreen-${state.selectedItem?.images[state.currentImageIndex] || state.fullscreenImage}`}
                    initial={{
                      opacity: 0,
                      scale: 1,
                      x: state.imageDirection === 'next' ? 50 :
                         state.imageDirection === 'prev' ? -50 : 0
                    }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 1,
                      x: state.imageDirection === 'next' ? -50 :
                         state.imageDirection === 'prev' ? 50 : 0
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut"
                    }}
                    className="flex items-center justify-center"
                  >
                    <OptimizedImage
                      src={state.selectedItem?.images[state.currentImageIndex] || state.fullscreenImage}
                      alt="Imagen en pantalla completa"
                      className="max-w-[70vw] max-h-[70vh] object-contain rounded-lg shadow-2xl"
                      loading="eager"
                      style={{
                        transform: `scale(${state.zoomLevel}) translate(${state.panPosition.x}px, ${state.panPosition.y}px)`,
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Zoom Controls - Desktop Only */}
                <div className="hidden md:flex absolute bottom-4 left-4 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm"
                    onClick={() => dispatch({ type: 'SET_ZOOM', payload: Math.max(0.5, state.zoomLevel - 0.25) })}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Zoom out"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </motion.button>

                  <motion.button
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm"
                    onClick={() => dispatch({ type: 'SET_ZOOM', payload: 1 })}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Reset zoom"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </motion.button>

                  <motion.button
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm"
                    onClick={() => dispatch({ type: 'SET_ZOOM', payload: Math.min(3, state.zoomLevel + 0.25) })}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Zoom in"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.button>
                </div>

                {/* Image Counter */}
                {state.selectedItem && state.selectedItem.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {state.currentImageIndex + 1} / {state.selectedItem.images.length}
                  </div>
                )}

                {/* Mobile Touch Instructions */}
                <AnimatePresence>
                  {state.showMobileInstructions && (
                    <motion.div
                      className="md:hidden absolute top-4 left-4 bg-black/70 text-white px-4 py-3 rounded-xl text-xs backdrop-blur-sm border border-color-primary"
                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 400,
                        duration: 0.3
                      }}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <motion.svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </motion.svg>
                          <span>{t('portfolio.pellizca_zoom')}</span>
                        </div>
                        {state.selectedItem && state.selectedItem.images.length > 1 && (
                          <div className="flex items-center gap-2">
                            <motion.svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              animate={{ x: [-2, 2, -2] }}
                              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </motion.svg>
                            <span>{t('portfolio.desliza_cambiar')}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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