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
    {
      id: 4,
      name: "Roberto Silva",
      role: "Gerente General",
      company: "Retail Plus",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Gracias a Zentella, nuestras ventas online se incrementaron un 250%. Su enfoque estratégico y creativo marcó la diferencia.",
      rating: 5
    },
    {
      id: 5,
      name: "Laura Morales",
      role: "Directora Ejecutiva",
      company: "Health & Wellness",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "El trabajo de Zentella superó todas nuestras expectativas. Su atención al detalle y dedicación es incomparable.",
      rating: 5
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index)
  }

  return (
    <section 
      id="testimonials" 
      className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-bg-base-dark"
      ref={elementRef}
    >
      <div className="layout-container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-color-primary/10 text-color-primary rounded-xl px-4 py-2 text-small font-medium mb-4 inline-block">
            Testimonios
          </span>
          <h2 className="heading-1 lg:text-4xl mb-4 text-text-primary-light dark:text-text-primary-dark">
            Lo que dicen nuestros <span className="text-color-primary">clientes</span>
          </h2>
          <p className="text-base max-w-2xl mx-auto">
            La confianza de nuestros clientes es nuestro mayor logro. Descubre cómo hemos transformado sus marcas
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="card-base-safe text-center relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-color-primary/20">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </div>

            {/* Testimonial Content */}
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-8"
            >
              {/* Rating Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <motion.svg
                    key={i}
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg lg:text-xl leading-relaxed mb-8 text-text-primary-light dark:text-text-primary-dark font-medium">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-center gap-4">
                <motion.img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-color-primary/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                />
                <div className="text-left">
                  <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-small text-color-primary font-medium">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-small opacity-70">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Previous Button */}
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 text-color-primary hover:bg-color-primary hover:text-white transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-color-primary scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-color-primary/50'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 text-color-primary hover:bg-color-primary hover:text-white transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

        {/* Thumbnails */}
        <motion.div
          className="flex justify-center gap-4 overflow-x-auto pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={testimonial.id}
              onClick={() => goToTestimonial(index)}
              className={`flex-shrink-0 p-4 rounded-xl border-2 transition-all duration-300 ${
                index === currentTestimonial
                  ? 'border-color-primary bg-color-primary/5'
                  : 'border-gray-200 dark:border-gray-700 hover:border-color-primary/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-3 min-w-[200px]">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-medium text-sm text-text-primary-light dark:text-text-primary-dark">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-color-primary">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { number: '98%', label: 'Satisfacción del Cliente' },
            { number: '150+', label: 'Proyectos Exitosos' },
            { number: '5★', label: 'Calificación Promedio' },
            { number: '24/7', label: 'Soporte Continuo' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
            >
              <div className="text-3xl font-bold text-color-primary mb-2">
                {stat.number}
              </div>
              <div className="text-small font-medium text-text-primary-light dark:text-text-primary-dark">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials