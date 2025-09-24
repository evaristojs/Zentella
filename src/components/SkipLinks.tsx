import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

interface SkipLink {
  href: string
  label: string
}

export const SkipLinks: React.FC = () => {
  const { t } = useLanguage()

  const skipLinks: SkipLink[] = [
    { href: '#main-content', label: t('skip.main_content') || 'Saltar al contenido principal' },
    { href: '#navigation', label: t('skip.navigation') || 'Saltar a navegación' },
    { href: '#portfolio', label: t('skip.portfolio') || 'Saltar al portafolio' },
    { href: '#contact', label: t('skip.contact') || 'Saltar al contacto' }
  ]

  const handleSkipToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })

      // Focus the element for screen readers
      if (element instanceof HTMLElement) {
        element.focus()
      }
    }
  }

  return (
    <div className="sr-only focus-within:not-sr-only">
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[9999] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-2"
        initial={{ y: -100 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.3 }}
        role="navigation"
        aria-label="Enlaces de accesibilidad"
      >
        <div className="flex flex-wrap gap-2 max-w-4xl mx-auto">
          {skipLinks.map((link, index) => (
            <motion.button
              key={link.href}
              onClick={() => handleSkipToSection(link.href)}
              className="inline-block bg-color-primary hover:bg-color-accent text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-primary transition-colors duration-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {link.label}
            </motion.button>
          ))}
        </div>
      </motion.nav>
    </div>
  )
}

export default SkipLinks