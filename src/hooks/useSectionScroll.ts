import { useState, useEffect, useRef } from 'react';

interface SectionScrollOptions {
  rootMargin?: string;
}

export const useSectionScroll = (options: SectionScrollOptions = {}) => {
  const {
    rootMargin = '0px 0px -25% 0px' // Default root margin
  } = options;

  const [currentSection, setCurrentSection] = useState<string>('hero');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionIds = ['hero', 'services', 'portfolio', 'about', 'testimonials', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin,
      // Use a range of thresholds for more frequent updates
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visibleSections = entries.filter(entry => entry.isIntersecting);

      if (visibleSections.length > 0) {
        const mostVisible = visibleSections.reduce((prev, current) => {
          return current.intersectionRatio > prev.intersectionRatio ? current : prev;
        });
        setCurrentSection(mostVisible.target.id);
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    const observer = observerRef.current;
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [rootMargin]);

  return { currentSection };
};