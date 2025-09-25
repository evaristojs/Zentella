import { useState, useEffect, useRef } from 'react';

interface SectionScrollOptions {
  rootMargin?: string;
}

export const useSectionScroll = (options: SectionScrollOptions = {}) => {
  const {
    rootMargin = '0px 0px -40% 0px' // Default root margin
  } = options;

  const [currentSection, setCurrentSection] = useState<string>('hero');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastSectionRef = useRef<string>('hero');

  useEffect(() => {
    const sectionIds = ['hero', 'services', 'portfolio', 'about', 'testimonials', 'contact', 'footer'];

    const observerOptions = {
      root: null,
      rootMargin,
      // Use fewer, strategic thresholds to reduce noise
      threshold: [0, 0.25, 0.5, 0.75],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visibleSections = entries.filter(entry => entry.isIntersecting);

      if (visibleSections.length > 0) {
        // Find section with highest intersection ratio
        const mostVisible = visibleSections.reduce((prev, current) => {
          return current.intersectionRatio > prev.intersectionRatio ? current : prev;
        });

        const newSection = mostVisible.target.id;

        // Add hysteresis: require a minimum intersection ratio to switch
        const minRatioToSwitch = 0.1;
        const isSignificantChange = mostVisible.intersectionRatio >= minRatioToSwitch;

        // Only change if:
        // 1. It's a significant intersection ratio
        // 2. AND (it's a different section OR the intersection ratio is very high)
        if (isSignificantChange && (newSection !== lastSectionRef.current || mostVisible.intersectionRatio > 0.6)) {
          // Clear previous timeout
          if (debounceRef.current) {
            clearTimeout(debounceRef.current);
          }

          // Use longer debounce for better stability
          debounceRef.current = setTimeout(() => {
            lastSectionRef.current = newSection;
            setCurrentSection(newSection);
          }, 100);
        }
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

    // Retry finding elements multiple times (for lazy loaded components)
    const observeElements = () => {
      const foundElements: string[] = [];
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element && observerRef.current) {
          observerRef.current.observe(element);
          foundElements.push(id);
        }
      });

      // If we didn't find all elements, retry after a short delay
      if (foundElements.length < sectionIds.length) {
        setTimeout(() => {
          const missingIds = sectionIds.filter(id => !foundElements.includes(id));
          missingIds.forEach(id => {
            const element = document.getElementById(id);
            if (element && observerRef.current) {
              observerRef.current.observe(element);
            }
          });
        }, 1000);
      }
    };

    observeElements();

    const observer = observerRef.current;
    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [rootMargin]);

  return { currentSection };
};