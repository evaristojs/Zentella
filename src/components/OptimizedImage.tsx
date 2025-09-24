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
  priority = false, // Used for skeleton timing logic
  placeholder = 'none'
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
    setImageStartedLoading(true)
    loadStartTimeRef.current = Date.now()

    // Solo mostrar skeleton si la imagen tarda más de 200ms en cargar
    if (placeholder === 'skeleton') {
      // Use priority for future skeleton timing optimizations
      const delay = priority ? 150 : 200 // Priority images get slightly faster skeleton
      skeletonTimeoutRef.current = setTimeout(() => {
        if (!isLoaded && imageStartedLoading) {
          setShowSkeleton(true)
        }
      }, delay) // Delay más inteligente: solo si realmente tarda
    }

  }, [src, placeholder, isLoaded, imageStartedLoading])

  const handleLoad = () => {
    const loadTime = Date.now() - loadStartTimeRef.current
    setIsLoaded(true)

    // Clear skeleton timeout if image loads quickly
    if (skeletonTimeoutRef.current) {
      clearTimeout(skeletonTimeoutRef.current)
      skeletonTimeoutRef.current = null
    }

    // Solo mostrar skeleton si no se ha mostrado ya y la imagen tardó más de 200ms
    if (loadTime >= 200 && showSkeleton) {
      // Mantener skeleton por un momento antes de ocultarlo para transición suave
      setTimeout(() => setShowSkeleton(false), 100)
    } else {
      setShowSkeleton(false)
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
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={style}
      >
        <span className="text-gray-500 text-sm">Error cargando imagen</span>
      </div>
    )
  }

  // Show skeleton while loading if enabled
  if (showSkeleton && !isLoaded) {
    return (
      <div
        className={`bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center ${className}`}
        style={style}
      >
        <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      </div>
    )
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
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