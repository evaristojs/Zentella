import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useState } from 'react'

const Testimonials = () => {
  const { elementRef, isVisible } = useIntersectionObserver()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "CEO, TechStart",
      company: "TechStart Solutions",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Zentella transformó completamente nuestra presencia digital. Su equipo no solo entendió nuestra visión, sino que la llevó al siguiente nivel. Los resultados fueron excepcionales.",
      rating: 5
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      role: "Director de Marketing",
      company: "Innovate Corp",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "La estrategia de branding que desarrolló Zentella para nosotros fue extraordinaria. Nuestro reconocimiento de marca aumentó un 300% en solo 6 meses.",
      rating: 5
    },
    {
      id: 3,
      name: "Ana Rodríguez",
      role: "Fundadora",
      company: "Creative Studio",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Profesionalismo, creatividad y resultados. Zentella es el partner perfecto para cualquier empresa que busque destacar en el mundo digital.",
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
      className="min-h-screen py-24 md:py-32 bg-bg-base-light dark:bg-bg-base-dark text-text-primary-light dark:text-text-primary-dark relative snap-start"
      ref={elementRef}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight font-display bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
            La confianza de nuestros clientes es nuestro mayor logro.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="p-8 md:p-12 rounded-3xl bg-bg-secondary-light dark:bg-bg-secondary-dark border border-gray-200/30 dark:border-gray-800/30 shadow-2xl shadow-black/30"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-color-primary/20"
                />
                <blockquote className="text-xl lg:text-2xl text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-6 font-medium">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">{testimonials[currentTestimonial].name}</div>
                <div className="text-color-primary">{testimonials[currentTestimonial].role}</div>
              </div>
            </motion.div>

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