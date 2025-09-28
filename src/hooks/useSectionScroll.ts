import { useState, useEffect, useRef } from 'react';

interface SectionScrollOptions {
  rootMargin?: string;
}

export const useSectionScroll = (options: SectionScrollOptions = {}) => {
  const {
    rootMargin = '0px 0px -20% 0px' // Default root margin, less aggressive
  } = options;

  const [currentSection, setCurrentSection] = useState<string>('hero');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastSectionRef = useRef<string>('hero');

  useEffect(() => {
    const sectionIds = ['hero', 'services', 'portfolio', 'about', 'testimonials', 'contact', 'footer'];

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Narrow active zone in the middle of the viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visibleSections = entries.filter(entry => entry.isIntersecting);

      if (visibleSections.length > 0) {
        // Find section with highest intersection ratio
        const mostVisible = visibleSections.reduce((prev, current) => {
          return current.intersectionRatio > prev.intersectionRatio ? current : prev;
        });

        const newSection = mostVisible.target.id;

        // Update immediately if it's a different section
        if (newSection !== lastSectionRef.current) {
          lastSectionRef.current = newSection;
          setCurrentSection(newSection);
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