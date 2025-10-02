import { useUltraScrollDetection } from './useUltraScrollDetection'

interface SectionScrollOptions {
  rootMargin?: string;
}

/**
 * Section scroll hook using centralized scroll detection
 * No longer creates its own Intersection Observer
 *
 * Note: rootMargin option is kept for API compatibility but is ignored
 * since the centralized system handles all section detection
 */
export const useSectionScroll = (_options: SectionScrollOptions = {}) => {
  // Use centralized scroll detection system instead of creating a new observer
  const { currentSection } = useUltraScrollDetection({
    threshold: 0,
    enableSections: true
  })

  return { currentSection }
}