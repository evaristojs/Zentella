import { useState, useEffect } from 'react'

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('hero')
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50px 0px -50px 0px' }
    )
    
    const sections = ['hero', 'services', 'portfolio', 'about', 'testimonials', 'contact']
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    
    return () => observer.disconnect()
  }, [])
  
  return activeSection
}