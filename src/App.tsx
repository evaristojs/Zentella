import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'
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

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)

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
              <ErrorBoundary>
                <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
              </ErrorBoundary>
              <main>
                <section id="hero">
                  <ErrorBoundary>
                    <Hero />
                  </ErrorBoundary>
                </section>
                <section id="about">
                  <ErrorBoundary>
                    <About />
                  </ErrorBoundary>
                </section>
                <section id="services">
                  <ErrorBoundary>
                    <Services />
                  </ErrorBoundary>
                </section>
                <section id="portfolio">
                  <ErrorBoundary>
                    <Portfolio />
                  </ErrorBoundary>
                </section>
                <section id="testimonials">
                  <ErrorBoundary>
                    <Testimonials />
                  </ErrorBoundary>
                </section>
                <section id="faq">
                  <ErrorBoundary>
                    <FAQ />
                  </ErrorBoundary>
                </section>
                <section id="contact">
                  <ErrorBoundary>
                    <Contact />
                  </ErrorBoundary>
                </section>
              </main>
              <ErrorBoundary>
                <Footer />
              </ErrorBoundary>
            </motion.div>
          )}
        </AnimatePresence>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App