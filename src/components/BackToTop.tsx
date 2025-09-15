import { motion, AnimatePresence } from 'framer-motion'

interface BackToTopProps {
  currentSection?: string
}

const BackToTop = ({ currentSection }: BackToTopProps) => {
  const scrollToTop = () => {
    const element = document.getElementById('hero')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  // Solo mostrar si no estamos en hero
  const shouldShow = currentSection !== 'hero'

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-colors duration-300 flex items-center justify-center"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            width: '56px',
            height: '56px'
          }}
          aria-label="Volver arriba"
          initial={{
            opacity: 0,
            scale: 0.5,
            y: 20,
            rotate: -180
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: 0
          }}
          exit={{
            opacity: 0,
            scale: 0.5,
            y: 20,
            rotate: 180
          }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          whileHover={{
            scale: 1.1,
            y: -3,
            boxShadow: "0 10px 25px rgba(147, 51, 234, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ y: 2 }}
            animate={{ y: 0 }}
            whileHover={{
              y: [0, -2, 0, -1, 0],
              transition: {
                duration: 0.6,
                repeat: Infinity,
                repeatType: "loop"
              }
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              type: "spring",
              stiffness: 400
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BackToTop