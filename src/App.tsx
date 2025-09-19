import { useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import ErrorBoundary from './components/ErrorBoundary'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import { useSectionScroll } from './hooks/useSectionScroll'
import { useNavbarHeight } from './hooks/useNavbarHeight'
import './App.css'
import BackToTop from './components/BackToTop'

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

  // Initialize dynamic navbar height tracking
  useNavbarHeight('navbar')

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
            <Navigation 
              isMenuOpen={isMenuOpen} 
              setIsMenuOpen={setIsMenuOpen}
              currentSection={currentSection}
            />
            <main>
              <Hero />
              <Suspense fallback={<ComponentLoader />}>
                <Services />
              </Suspense>
              <Suspense fallback={<ComponentLoader />}>
                <Portfolio />
              </Suspense>
              <Suspense fallback={<ComponentLoader />}>
                <About />
              </Suspense>
              <Suspense fallback={<ComponentLoader />}>
                <Testimonials />
              </Suspense>
              <Suspense fallback={<ComponentLoader />}>
                <ContactFAQ />
              </Suspense>
              <Suspense fallback={<ComponentLoader />}>
                <Footer />
              </Suspense>
            </main>
            <BackToTop />
          </motion.div>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App