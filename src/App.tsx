import { useState, lazy } from 'react'
import { motion } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { ToastProvider } from './components/Toast'
import ErrorBoundary from './components/ErrorBoundary'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import SuspenseLoader from './components/SuspenseLoader'
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
          <ToastProvider>
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
              <SuspenseLoader>
                <Services />
              </SuspenseLoader>
              <SuspenseLoader>
                <Portfolio />
              </SuspenseLoader>
              <SuspenseLoader>
                <About />
              </SuspenseLoader>
              <SuspenseLoader>
                <Testimonials />
              </SuspenseLoader>
              <SuspenseLoader>
                <ContactFAQ />
              </SuspenseLoader>
              <SuspenseLoader>
                <Footer />
              </SuspenseLoader>
            </main>
            <BackToTop />
          </motion.div>
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App