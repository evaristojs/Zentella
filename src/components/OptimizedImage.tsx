import React, { useState, useEffect, useRef } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  width?: number
  height?: number
  style?: React.CSSProperties
  onClick?: () => void
  onLoad?: () => void
  onError?: () => void
  priority?: boolean
  placeholder?: 'blur' | 'skeleton' | 'none'
}

// Detectar soporte para WebP
const supportsWebP = (() => {
  try {
    return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
  } catch {
    return false
  }
})()

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  style,
  onClick,
  onLoad,
  onError,
  priority = false,
  placeholder = 'skeleton'
}) => {
  const [imageSrc, setImageSrc] = useState<string>('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const skeletonTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Intersection Observer para lazy loading inteligente
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsVisible(true)
      return
    }

    const currentContainer = containerRef.current
    if (!currentContainer) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px', // Comenzar a cargar 50px antes
        threshold: 0.1
      }
    )

    observer.observe(currentContainer)

    return () => {
      observer.disconnect()
    }
  }, [priority, loading])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (skeletonTimeoutRef.current) {
        clearTimeout(skeletonTimeoutRef.current)
      }
    }
  }, [])

  // Reset states when src changes
  useEffect(() => {
    setIsLoaded(false)
    setShowSkeleton(false)
    
    // Clear any existing timeout
    if (skeletonTimeoutRef.current) {
      clearTimeout(skeletonTimeoutRef.current)
    }
  }, [src])

  useEffect(() => {
    if (!isVisible && !priority && loading !== 'eager') return

    // Determinar la mejor fuente de imagen
    const getOptimalSrc = () => {
      // Si la imagen original está en images-optimized, usar WebP si está soportado
      if (src.startsWith('/images/') || src.startsWith('images/')) {
        const optimizedPath = src.replace('/images/', '/images-optimized/').replace('images/', 'images-optimized/')

        if (supportsWebP) {
          // Convertir extensión a WebP
          const webpPath = optimizedPath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp')
          return webpPath
        } else {
          // Usar versión optimizada original
          return optimizedPath
        }
      }

      // Si no está en images/, usar src original
      return src
    }

    setImageSrc(getOptimalSrc())
    
    // Set skeleton timeout based on priority
    const skeletonDelay = priority ? 150 : 300 // Shorter delay for priority images
    
    skeletonTimeoutRef.current = setTimeout(() => {
      setShowSkeleton(true)
    }, skeletonDelay)
    
  }, [src, isVisible, priority, loading])

  const handleLoad = () => {
    setIsLoaded(true)
    setShowSkeleton(false)
    
    // Clear skeleton timeout if image loads quickly
    if (skeletonTimeoutRef.current) {
      clearTimeout(skeletonTimeoutRef.current)
      skeletonTimeoutRef.current = null
    }
    
    onLoad?.()
  }

  const handleError = () => {
    // Fallback a imagen original si hay error
    if (imageSrc !== src) {
      setImageSrc(src)
      setHasError(false)
    } else {
      setHasError(true)
      onError?.()
    }
  }

  const renderPlaceholder = () => {
    if (placeholder === 'none' || !showSkeleton) return null

    const placeholderClasses = `absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
      isLoaded ? 'opacity-0' : 'opacity-100'
    }`

    if (placeholder === 'skeleton') {
      return (
        <div className={placeholderClasses}>
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse rounded-lg" />
        </div>
      )
    }

    if (placeholder === 'blur') {
      return (
        <div className={placeholderClasses}>
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 blur-sm rounded-lg" />
        </div>
      )
    }

    return null
  }

  if (hasError) {
    return (
      <div
        ref={containerRef}
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative ${className}`}
        style={style}
      >
        <span className="text-gray-500 dark:text-gray-400 text-sm">Error cargando imagen</span>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {imageSrc && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={priority ? 'eager' : loading}
          width={width}
          height={height}
          onClick={onClick}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      {renderPlaceholder()}
    </div>
  )
}

export default OptimizedImage