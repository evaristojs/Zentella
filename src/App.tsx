import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingScreen from './components/MinimalLoadingScreen'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Testimonials from './components/Testimonials'
import ContactFAQ from './components/ContactFAQ'
import Footer from './components/Footer'
import { useSectionScroll } from './hooks/useSectionScroll'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  
  // Initialize section scroll detection
  const { currentSection } = useSectionScroll({
    threshold: 0.3,
    rootMargin: '0px 0px -20% 0px'
  })

  // Verificar si es la primera visita
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('zentella-visited')
    
    if (hasVisitedBefore) {
      // No es la primera visita, saltar el loader
      setShowLoadingScreen(false)
    }
    // Si es la primera visita, el loader se mostrará normalmente
  }, [])

  const handleLoadingComplete = () => {
    setShowLoadingScreen(false)
    // Marcar que el usuario ya visitó la página
    localStorage.setItem('zentella-visited', 'true')
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
          <AnimatePresence mode="wait">
            {showLoadingScreen ? (
              <ErrorBoundary>
                <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
              </ErrorBoundary>
            ) : (
              <motion.div
                key="main-app"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="min-h-screen bg-bg-base-light dark:bg-bg-base-dark text-text-primary-light dark:text-text-primary-dark"
              >
                <Navigation 
                  isMenuOpen={isMenuOpen} 
                  setIsMenuOpen={setIsMenuOpen}
                  currentSection={currentSection}
                />
                <main>
                  <section id="hero">
                    <Hero />
                  </section>
                  <section id="services">
                    <Services />
                  </section>
                  <section id="portfolio">
                    <Portfolio />
                  </section>
                  <section id="about">
                    <About />
                  </section>
                  <section id="testimonials">
                    <Testimonials />
                  </section>
                  <section id="contact">
                    <ContactFAQ />
                  </section>
                </main>
                <Footer />
              </motion.div>
            )}
          </AnimatePresence>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App