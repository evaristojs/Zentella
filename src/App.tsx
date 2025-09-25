import { useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import ErrorBoundary from './components/ErrorBoundary'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import SkipLinks from './components/SkipLinks'
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
  
  // Initialize section scroll detection
  const { currentSection } = useSectionScroll({
    rootMargin: '0px 0px -30% 0px'
  })


  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen bg-bg-base-light dark:bg-bg-base-dark text-text-primary-light dark:text-text-primary-dark"
          >
            <SkipLinks />
            <Navigation
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              currentSection={currentSection}
            />
            <main id="main-content" tabIndex={-1}>
              <section id="hero" tabIndex={-1}>
                <Hero />
              </section>
              <section id="services" tabIndex={-1}>
                <Suspense fallback={<ComponentLoader />}>
                  <Services />
                </Suspense>
              </section>
              <section id="portfolio" tabIndex={-1}>
                <Suspense fallback={<ComponentLoader />}>
                  <Portfolio />
                </Suspense>
              </section>
              <section id="about" tabIndex={-1}>
                <Suspense fallback={<ComponentLoader />}>
                  <About />
                </Suspense>
              </section>
              <section id="testimonials" tabIndex={-1}>
                <Suspense fallback={<ComponentLoader />}>
                  <Testimonials />
                </Suspense>
              </section>
              <section id="contact" tabIndex={-1}>
                <Suspense fallback={<ComponentLoader />}>
                  <ContactFAQ />
                </Suspense>
              </section>
              <Suspense fallback={<ComponentLoader />}>
                <Footer />
              </Suspense>
            </main>
          </motion.div>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App