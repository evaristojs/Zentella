import React from 'react'
import { motion } from 'framer-motion'

interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {

  const containerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 }
  }

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }

  return (
    <motion.nav
      className={`flex items-center space-x-2 text-sm ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      role="navigation"
      aria-label="Breadcrumb"
    >
      <motion.ol
        className="flex items-center space-x-2"
        role="list"
      >
        {items.map((item, index) => (
          <motion.li
            key={`${item.label}-${index}`}
            className="flex items-center space-x-2"
            variants={itemVariants}
            role="listitem"
          >
            {index > 0 && (
              <motion.span
                className="text-text-secondary-light dark:text-text-secondary-dark"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                aria-hidden="true"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </motion.span>
            )}

            {item.href && !item.isActive ? (
              <motion.button
                onClick={() => scrollToSection(item.href!)}
                className="text-color-primary hover:text-color-accent focus:text-color-accent focus:outline-none focus:ring-2 focus:ring-color-primary/20 rounded-md px-1 py-0.5 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Ir a ${item.label}`}
              >
                {item.label}
              </motion.button>
            ) : (
              <motion.span
                className={`${
                  item.isActive
                    ? 'text-text-primary-light dark:text-text-primary-dark font-medium'
                    : 'text-text-secondary-light dark:text-text-secondary-dark'
                }`}
                whileHover={!item.isActive ? { scale: 1.02 } : {}}
                aria-current={item.isActive ? 'page' : undefined}
              >
                {item.label}
              </motion.span>
            )}
          </motion.li>
        ))}
      </motion.ol>
    </motion.nav>
  )
}

export default Breadcrumbs