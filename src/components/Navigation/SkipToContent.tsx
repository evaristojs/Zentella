import { motion } from 'framer-motion'

/**
 * Skip to Content link for accessibility
 * Hidden by default, visible when focused via keyboard navigation
 */
const SkipToContent = () => {
  const handleSkipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const mainContent = document.getElementById('main-content') || document.querySelector('main')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.a
      href="#main-content"
      onClick={handleSkipToContent}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] bg-color-primary text-white px-4 py-2 rounded-lg font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-color-primary"
      initial={{ opacity: 0, y: -10 }}
      whileFocus={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      Skip to main content
    </motion.a>
  )
}

export default SkipToContent