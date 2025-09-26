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
  placeholder?: 'skeleton' | 'blur' | 'none'
  sizes?: string
  quality?: number
  preload?: boolean
}

// Advanced image format detection
const formatSupport = (() => {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1

  return {
    webp: canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0,
    avif: canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0,
    jp2: canvas.toDataURL('image/jp2').indexOf('data:image/jp2') === 0
  }
})()

// Image cache with intelligent memory management - Future implementation
/*
class ImageCache {
  private cache = new Map<string, HTMLImageElement>()
  private preloadQueue = new Set<string>()
  private readonly maxCacheSize = 50
  private readonly preloadLimit = 5

  get(src: string): HTMLImageElement | undefined {
    const cached = this.cache.get(src)
    if (cached) {
      // Move to end (LRU)
      this.cache.delete(src)
      this.cache.set(src, cached)
    }
    return cached
  }

  set(src: string, img: HTMLImageElement): void {
    // Remove oldest if cache is full
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey) {
        this.cache.delete(firstKey)
      }
    }

    this.cache.set(src, img)
  }

  preload(src: string): Promise<HTMLImageElement> {
    if (this.cache.has(src)) {
      return Promise.resolve(this.cache.get(src)!)
    }

    if (this.preloadQueue.size >= this.preloadLimit) {
      return Promise.reject(new Error('Preload queue full'))
    }

    if (this.preloadQueue.has(src)) {
      return Promise.reject(new Error('Already preloading'))
    }

    this.preloadQueue.add(src)

    return new Promise((resolve, reject) => {
      const img = new Image()

      img.onload = () => {
        this.preloadQueue.delete(src)
        this.set(src, img)
        resolve(img)
      }

      img.onerror = () => {
        this.preloadQueue.delete(src)
        reject(new Error('Failed to preload image'))
      }

      img.src = src
    })
  }

  clear(): void {
    this.cache.clear()
    this.preloadQueue.clear()
  }
}
*/

// const imageCache = new ImageCache()

// Smart connection detection
// const getConnectionSpeed = (): 'slow' | 'fast' => {
//   if ('connection' in navigator && 'effectiveType' in (navigator as any).connection) {
//     const connection = (navigator as any).connection
//     return ['slow-2g', '2g', '3g'].includes(connection.effectiveType) ? 'slow' : 'fast'
//   }
//   return 'fast'
// }

// Generate optimized image URLs - Future implementation
// const generateImageSources = (src: string, width?: number, quality = 85): string[] => {
//   const sources: string[] = []
//   const baseUrl = src.replace(/\.[^/.]+$/, '')
//   const extension = src.split('.').pop()?.toLowerCase()
//
//   // Skip optimization for SVGs and data URLs
//   if (extension === 'svg' || src.startsWith('data:')) {
//     return [src]
//   }
//
//   const connectionSpeed = getConnectionSpeed()
//   const targetQuality = connectionSpeed === 'slow' ? Math.min(quality, 70) : quality
//
//   // AVIF (best compression, newer browsers)
//   if (formatSupport.avif) {
//     sources.push(`${baseUrl}.avif?q=${targetQuality}${width ? `&w=${width}` : ''}`)
//   }
//
//   // WebP (good compression, wide support)
//   if (formatSupport.webp) {
//     sources.push(`${baseUrl}.webp?q=${targetQuality}${width ? `&w=${width}` : ''}`)
//   }
//
//   // JP2 (Safari fallback)
//   if (formatSupport.jp2 && ['jpg', 'jpeg'].includes(extension || '')) {
//     sources.push(`${baseUrl}.jp2?q=${targetQuality}${width ? `&w=${width}` : ''}`)
//   }
//
//   // Original format as fallback
//   sources.push(`${src}?q=${targetQuality}${width ? `&w=${width}` : ''}`)
//
//   return sources
// }

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt = '', // Default to empty alt to prevent text flash
  className = '',
  loading = 'lazy',
  width,
  height,
  style,
  onClick,
  onLoad,
  onError,
  priority = false,
  placeholder = 'none',
  // sizes,
  // quality = 85,
  // preload = false
}) => {
  const [imageSrc, setImageSrc] = useState<string>('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(false)
  const [imageStartedLoading, setImageStartedLoading] = useState(false)
  const skeletonTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const loadStartTimeRef = useRef<number>(0)

  // Reset states when src changes
  useEffect(() => {
    setIsLoaded(false)
    setHasError(false) // Also reset error state
    setShowSkeleton(false)
    setImageStartedLoading(false)
    loadStartTimeRef.current = 0

    // Clear any existing timeout
    if (skeletonTimeoutRef.current) {
      clearTimeout(skeletonTimeoutRef.current)
      skeletonTimeoutRef.current = null
    }
  }, [src])

  // Handle image loading with intelligent skeleton
  useEffect(() => {
    if (!src) return

    // Determinar la mejor fuente de imagen
    const getOptimalSrc = () => {
      // Si la imagen original está en images-optimized, usar WebP si está soportado
      if (src.startsWith('/images/') || src.startsWith('images/')) {
        const optimizedPath = src.replace('/images/', '/images-optimized/').replace('images/', 'images-optimized/')

        if (formatSupport.webp) {
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
    setImageStartedLoading(true)
    loadStartTimeRef.current = Date.now()

    // Solo mostrar skeleton si la imagen tarda más de un tiempo específico
    if (placeholder === 'skeleton') {
      // Reduced delay for mobile and priority images
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
      let delay = priority ? 100 : (isMobile ? 120 : 200)

      skeletonTimeoutRef.current = setTimeout(() => {
        if (!isLoaded && imageStartedLoading && !hasError) {
          setShowSkeleton(true)
        }
      }, delay) // Delay más inteligente: más rápido en móvil
    }

  }, [src, placeholder, priority])

  const handleLoad = () => {
    setIsLoaded(true)

    // Clear skeleton timeout if image loads quickly
    if (skeletonTimeoutRef.current) {
      clearTimeout(skeletonTimeoutRef.current)
      skeletonTimeoutRef.current = null
    }

    // Siempre ocultar skeleton cuando la imagen carga
    setShowSkeleton(false)

    onLoad?.()
  }

  const handleError = () => {
    // Clear skeleton timeout
    if (skeletonTimeoutRef.current) {
      clearTimeout(skeletonTimeoutRef.current)
      skeletonTimeoutRef.current = null
    }

    // Fallback a imagen original si hay error
    if (imageSrc !== src) {
      setImageSrc(src)
      setHasError(false)
    } else {
      setHasError(true)
      setShowSkeleton(false) // Ocultar skeleton cuando falla definitivamente
      onError?.()
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (skeletonTimeoutRef.current) {
        clearTimeout(skeletonTimeoutRef.current)
      }
    }
  }, [])

  if (hasError) {
    return (
      <div
        className={`bg-gray-100 dark:bg-gray-800 ${className}`}
        style={{
          ...style,
          minHeight: height || '200px',
        }}
      >
        {/* Silent error - no visible text to prevent flash */}
      </div>
    )
  }

  // Show skeleton while loading if enabled (but not if there's an error)
  if (showSkeleton && !isLoaded && !hasError) {
    return (
      <div
        className={`bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center ${className}`}
        style={style}
      >
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse rounded-lg" />
      </div>
    )
  }

  return (
    <img
      src={imageSrc}
      alt={alt} // Always empty by default to prevent text flash
      className={`${className} transition-opacity duration-200 ${!isLoaded && !hasError ? 'opacity-0' : 'opacity-100'}`}
      loading={loading}
      width={width}
      height={height}
      draggable={false} // Prevent dragging which can cause visual glitches
      style={{
        ...style,
        ...((!isLoaded && placeholder !== 'skeleton') && {
          backgroundColor: '#f3f4f6',
          minHeight: height || '200px'
        })
      }}
      onClick={onClick}
      onLoad={handleLoad}
      onError={handleError}
    />
  )
}

export default OptimizedImage