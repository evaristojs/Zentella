import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import LoadingScreen from './components/MinimalLoadingScreen'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Services from './components/Services'
import FAQ from './components/FAQ'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

// Función para verificar si es la primera visita
const isFirstVisit = (): boolean => {
  if (typeof window === 'undefined') return true
  
  try {
    const hasVisited = localStorage.getItem('hasVisited')
    return !hasVisited
  } catch {
    return true
  }
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoadingScreen, setShowLoadingScreen] = useState(isFirstVisit())

  const handleLoadingComplete = () => {
    setShowLoadingScreen(false)
    // Marcar que el usuario ya visitó el sitio
    try {
      localStorage.setItem('hasVisited', 'true')
    } catch {
      console.warn('Failed to save visit status')
    }
  }

  // Efecto para manejar visitas posteriores
  useEffect(() => {
    if (!isFirstVisit()) {
      // Si no es la primera visita, no mostrar loading screen
      setShowLoadingScreen(false)
    }
  }, [])

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {showLoadingScreen ? (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen bg-bg-base-light dark:bg-bg-base-dark text-text-primary-light dark:text-text-primary-dark"
          >
            <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <main>
              <Hero />
              <Services />
              <FAQ />
              <Portfolio />
              <About />
              <Testimonials />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App