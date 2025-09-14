import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingScreen from './components/MinimalLoadingScreen'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import { useSectionScroll } from './hooks/useSectionScroll'
import './App.css'

// Lazy load heavy components
const Services = lazy(() => import('./components/Services'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const About = lazy(() => import('./components/About'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const ContactFAQ = lazy(() => import('./components/ContactFAQ'))
const Footer = lazy(() => import('./components/Footer'))

// Loading fallback component
const ComponentLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-8 h-8 bg-color-primary rounded-full animate-bounce mb-4"></div>
      <div className="text-text-secondary-light dark:text-text-secondary-dark">Cargando...</div>
    </div>
  </div>
)

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
        <LanguageProvider>
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
                className="min-h-screen bg-bg-base-light dark:bg-bg-base-dark text-text-primary-light dark:text-text-primary-dark snap-y snap-mandatory"
              >
                <Navigation 
                  isMenuOpen={isMenuOpen} 
                  setIsMenuOpen={setIsMenuOpen}
                  currentSection={currentSection}
                />
                <main>
                  <section id="hero" className="snap-start min-h-screen">
                    <Hero />
                  </section>
                  <section id="services" className="snap-start min-h-screen">
                    <Suspense fallback={<ComponentLoader />}>
                      <Services />
                    </Suspense>
                  </section>
                  <section id="portfolio" className="snap-start min-h-screen">
                    <Suspense fallback={<ComponentLoader />}>
                      <Portfolio />
                    </Suspense>
                  </section>
                  <section id="about" className="snap-start min-h-screen">
                    <Suspense fallback={<ComponentLoader />}>
                      <About />
                    </Suspense>
                  </section>
                  <section id="testimonials" className="snap-start min-h-screen">
                    <Suspense fallback={<ComponentLoader />}>
                      <Testimonials />
                    </Suspense>
                  </section>
                  <section id="contact" className="snap-start min-h-screen">
                    <Suspense fallback={<ComponentLoader />}>
                      <ContactFAQ />
                    </Suspense>
                  </section>
                </main>
                <Suspense fallback={<ComponentLoader />}>
                  <Footer />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App