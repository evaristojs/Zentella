import { useState, useEffect } from 'react';

// This hook observes which section is currently at the top of the viewport 
// and returns its data-theme attribute.
export const useSectionObserver = (sectionIds: string[]) => {
  const [activeTheme, setActiveTheme] = useState('dark'); // Default to hero theme

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-theme');
            if (theme === 'light' || theme === 'dark') {
              setActiveTheme(theme);
            }
          }
        });
      },
      {
        root: null,
        // This rootMargin creates a "trigger line" 100px from the top of the viewport.
        // When a section crosses this line, the callback fires.
        rootMargin: '-100px 0px -85% 0px',
        threshold: 0,
      }
    );

    const elements = sectionIds.map(id => document.getElementById(id)).filter(el => el !== null);
    elements.forEach(el => observer.observe(el!));

    return () => {
      elements.forEach(el => observer.unobserve(el!));
    };
  }, [sectionIds]);

  return activeTheme;
};
