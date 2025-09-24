import { useState, useEffect, useRef, useCallback } from 'react'

interface VideoOptimizationOptions {
  quality?: 'low' | 'medium' | 'high'
  autoPlay?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  preferredFormat?: 'mp4' | 'webm' | 'av1'
}

interface VideoSource {
  src: string
  type: string
  quality: string
}

interface UseVideoOptimizationReturn {
  videoSources: VideoSource[]
  isLoading: boolean
  error: string | null
  canPlay: boolean
  loadVideo: () => void
  pauseVideo: () => void
  resumeVideo: () => void
}

// Video format support detection
const getVideoSupport = (): Record<string, boolean> => {
  const video = document.createElement('video')

  return {
    mp4: video.canPlayType('video/mp4; codecs="avc1.42E01E"') !== '',
    webm: video.canPlayType('video/webm; codecs="vp8, vorbis"') !== '',
    av1: video.canPlayType('video/mp4; codecs="av01.0.08M.08"') !== '',
    hls: video.canPlayType('application/vnd.apple.mpegurl') !== '' ||
         video.canPlayType('application/x-mpegURL') !== ''
  }
}

// Connection-based quality selection
const getOptimalQuality = (): 'low' | 'medium' | 'high' => {
  if ('connection' in navigator && 'effectiveType' in (navigator as any).connection) {
    const connection = (navigator as any).connection
    const effectiveType = connection.effectiveType

    if (['slow-2g', '2g'].includes(effectiveType)) return 'low'
    if (['3g'].includes(effectiveType)) return 'medium'
    return 'high'
  }

  // Default to medium quality if no connection info
  return 'medium'
}

// Generate video sources based on capabilities
const generateVideoSources = (
  baseSrc: string,
  options: VideoOptimizationOptions
): VideoSource[] => {
  const sources: VideoSource[] = []
  const support = getVideoSupport()
  const quality = options.quality || getOptimalQuality()

  // Remove extension to get base URL
  const baseUrl = baseSrc.replace(/\.[^/.]+$/, '')

  // Quality mappings
  const qualityParams = {
    low: { suffix: '_360p', bitrate: '500k' },
    medium: { suffix: '_720p', bitrate: '1500k' },
    high: { suffix: '_1080p', bitrate: '3000k' }
  }

  const qualityConfig = qualityParams[quality]

  // AV1 (best compression for modern browsers)
  if (support.av1 && (options.preferredFormat === 'av1' || !options.preferredFormat)) {
    sources.push({
      src: `${baseUrl}${qualityConfig.suffix}.av1.mp4`,
      type: 'video/mp4; codecs="av01.0.08M.08"',
      quality: quality
    })
  }

  // WebM (good compression, wide support)
  if (support.webm && (options.preferredFormat === 'webm' || !options.preferredFormat)) {
    sources.push({
      src: `${baseUrl}${qualityConfig.suffix}.webm`,
      type: 'video/webm; codecs="vp9, opus"',
      quality: quality
    })
  }

  // MP4 (universal fallback)
  if (support.mp4) {
    sources.push({
      src: `${baseUrl}${qualityConfig.suffix}.mp4`,
      type: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
      quality: quality
    })
  }

  // Original as final fallback
  sources.push({
    src: baseSrc,
    type: 'video/mp4',
    quality: 'original'
  })

  return sources
}

export const useVideoOptimization = (
  src: string,
  options: VideoOptimizationOptions = {}
): UseVideoOptimizationReturn => {
  const [videoSources, setVideoSources] = useState<VideoSource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [canPlay, setCanPlay] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Generate optimized video sources
  useEffect(() => {
    if (!src) return

    try {
      const sources = generateVideoSources(src, options)
      setVideoSources(sources)
      setError(null)
    } catch (err) {
      setError('Failed to generate video sources')
      console.error('Video optimization error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [src, options.quality, options.preferredFormat])

  // Preload video metadata if needed
  useEffect(() => {
    if (!videoSources.length || options.preload === 'none') return

    const video = document.createElement('video')
    video.preload = options.preload || 'metadata'

    // Add sources to test video element
    videoSources.forEach((source, index) => {
      if (index === 0) { // Only test the first (best) source
        video.src = source.src
      }
    })

    const handleCanPlay = () => {
      setCanPlay(true)
      setIsLoading(false)
    }

    const handleError = () => {
      setError('Video cannot be played')
      setIsLoading(false)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [videoSources, options.preload])

  const loadVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [])

  const pauseVideo = useCallback(() => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause()
    }
  }, [])

  const resumeVideo = useCallback(() => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(err => {
        console.error('Failed to resume video:', err)
      })
    }
  }, [])

  return {
    videoSources,
    isLoading,
    error,
    canPlay,
    loadVideo,
    pauseVideo,
    resumeVideo
  }
}

// Hook for intersection-based video loading
export const useVideoIntersection = (
  threshold: number = 0.1,
  rootMargin: string = '50px'
) => {
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        setIsVisible(entry.isIntersecting)

        if (entry.isIntersecting) {
          // Auto-play when visible (if muted)
          if (video.muted) {
            video.play().catch(() => {
              // Ignore play errors
            })
          }
        } else {
          // Pause when not visible to save bandwidth
          if (!video.paused) {
            video.pause()
          }
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  return { videoRef, isVisible }
}

// Memory cleanup for video cache
export const clearVideoCache = () => {
  // Clear any cached video elements
  const videos = document.querySelectorAll('video')
  videos.forEach(video => {
    if (!video.paused) {
      video.pause()
    }
    video.src = ''
    video.load()
  })
}