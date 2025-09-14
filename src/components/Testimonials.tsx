import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../contexts/ThemeContext'
import { useState } from 'react'
import OptimizedImage from './OptimizedImage'

const Testimonials = () => {
  const { elementRef, isVisible } = useIntersectionObserver()
  const { t } = useLanguage()
  const { isDark } = useTheme()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: t('testimonials.maria.name'),
      role: t('testimonials.maria.role'),
      company: t('testimonials.maria.company'),
      image: "/images/portfolio/branding/better-health-nevada/better-health-nevada-1.webp",
      text: t('testimonials.maria.text'),
      rating: 5
    },
    {
      id: 2,
      name: t('testimonials.carlos.name'),
      role: t('testimonials.carlos.role'),
      company: t('testimonials.carlos.company'),
      image: "/images/portfolio/branding/kaccao-kitchen/kaccao-kitchen-1.webp",
      text: t('testimonials.carlos.text'),
      rating: 5
    },
    {
      id: 3,
      name: t('testimonials.ana.name'),
      role: t('testimonials.ana.role'),
      company: t('testimonials.ana.company'),
      image: "/images/portfolio/photography/revel-bar/revel-bar-1.webp",
      text: t('testimonials.ana.text'),
      rating: 5
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section
      id="testimonials"
      className="min-h-screen py-16 md:py-20 text-text-primary-light dark:text-text-primary-dark relative overflow-hidden"
      ref={elementRef}
      style={{
        background: isDark
          ? `
            linear-gradient(225deg, #0a0a0a 0%, #1a1a1a 100%),
            radial-gradient(circle at 10% 20%, rgba(172, 0, 211, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(103, 0, 248, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(163, 4, 226, 0.03) 0%, transparent 50%)
          `
          : `
            linear-gradient(225deg, #FDFEFF 0%, #F8FAFC 100%),
            radial-gradient(circle at 10% 20%, rgba(172, 0, 211, 0.015) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(103, 0, 248, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(163, 4, 226, 0.01) 0%, transparent 50%)
          `
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 bg-color-primary/10 dark:bg-color-primary/20 text-color-primary dark:text-white text-sm font-medium rounded-full border border-color-primary/20 dark:border-color-primary/30">
            {t('testimonials.badge')}
          </span>
          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black mb-8 mt-6 leading-tight font-display bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent">
            {t('testimonials.titulo')}
          </h2>
          <p className="text-center-hyphens text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
            {t('testimonials.subtitulo')}
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <div className="p-8 md:p-12 rounded-3xl bg-bg-secondary-light dark:bg-bg-secondary-dark border border-gray-200/30 dark:border-gray-800/30 shadow-2xl shadow-black/30">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-6 relative flex-shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`avatar-${currentTestimonial}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <OptimizedImage
                        src={testimonials[currentTestimonial]?.image || ''}
                        alt={testimonials[currentTestimonial]?.name || ''}
                        className="w-24 h-24 rounded-full object-cover border-4 border-color-primary/20"
                        loading="lazy"
                        width={96}
                        height={96}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${currentTestimonial}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <blockquote className="text-center-hyphens text-xl lg:text-2xl text-text-secondary-light dark:text-text-secondary-dark mb-6 font-medium">
                      "{testimonials[currentTestimonial]?.text}"
                    </blockquote>
                    <div className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">{testimonials[currentTestimonial]?.name}</div>
                    <div className="text-color-primary">{testimonials[currentTestimonial]?.role}</div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 p-3 rounded-full bg-bg-secondary-light dark:bg-bg-secondary-dark hover:bg-color-primary text-text-primary-light dark:text-text-primary-dark hover:text-white transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 p-3 rounded-full bg-bg-secondary-light dark:bg-bg-secondary-dark hover:bg-color-primary text-text-primary-light dark:text-text-primary-dark hover:text-white transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials