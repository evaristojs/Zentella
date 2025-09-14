import React, { useState, useEffect } from 'react'

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
  onError
}) => {
  const [imageSrc, setImageSrc] = useState<string>('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
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
  }, [src])

  const handleLoad = () => {
    setIsLoaded(true)
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

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
      style={style}
      onClick={onClick}
      onLoad={handleLoad}
      onError={handleError}
      // Mejorar el placeholder mientras carga
      {...(!isLoaded && {
        style: {
          ...style,
          backgroundColor: '#f3f4f6',
          minHeight: height || '200px'
        }
      })}
    />
  )
}

export default OptimizedImage