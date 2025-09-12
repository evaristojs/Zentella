import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { devLog } from '../utils/logger'

interface FAQItem {
  id: number
  question: string
  answer: string
  details?: string[]
}

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  budget: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

const ContactFAQ = () => {
  const { elementRef, isVisible } = useIntersectionObserver()
  const [openItem, setOpenItem] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "¿Cuánto cuesta el servicio/proyecto?",
      answer: "Los costos varían según objetivos, recursos y complejidad del proyecto. Factores como industria, competencia, alcance y personalización influyen en el precio.",
      details: [
        "Publicidad PPC: $1,500-$10,000/mes",
        "SEO: $1,000-$7,500/mes", 
        "Marketing en redes sociales: $1,000-$3,500/mes",
        "Videos corporativos: $20,000-$100,000 MXN"
      ]
    },
    {
      id: 2,
      question: "¿Qué servicios ofrecen?",
      answer: "Ofrecemos servicios completos de marketing digital, diseño gráfico, fotografía, videografía, animación y desarrollo web para mejorar la presencia digital de tu negocio.",
      details: [
        "Posicionamiento SEO y campañas SEM",
        "Diseño y desarrollo web",
        "Fotografía comercial y de producto",
        "Videografía y animación 2D/3D",
        "Gestión de redes sociales"
      ]
    },
    {
      id: 3,
      question: "¿Cuánto tiempo toma un proyecto?",
      answer: "La duración depende de la complejidad del proyecto y la información proporcionada. Los proyectos se dividen en fases con entregables que requieren tu aprobación.",
      details: [
        "Tiempos según información inicial",
        "Cada fase requiere aprobación",
        "Cronograma detallado antes de iniciar"
      ]
    },
    {
      id: 4,
      question: "¿Cómo manejan las modificaciones?",
      answer: "Incluimos hasta dos modificaciones. Cambios adicionales tienen tarifa preferencial. Los aumentos de alcance se reevalúan en tiempo y costos.",
      details: [
        "Máximo dos modificaciones incluidas",
        "Cambios adicionales con tarifa preferencial",
        "Comunicación transparente sobre impactos"
      ]
    }
  ]

  const serviceOptions = [
    'Marketing Digital',
    'Diseño Gráfico',
    'Fotografía',
    'Videografía',
    'Animación',
    'Desarrollo Web',
    'Consultoría',
    'Otro'
  ]

  const budgetRanges = [
    'Menos de $10,000 MXN',
    '$10,000 - $25,000 MXN',
    '$25,000 - $50,000 MXN',
    '$50,000 - $100,000 MXN',
    'Más de $100,000 MXN',
    'Por definir'
  ]

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido'
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    if (!formData.service) newErrors.service = 'Selecciona un servicio'
    if (!formData.message.trim()) newErrors.message = 'El mensaje es requerido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      devLog.info('Formulario enviado exitosamente', { ...formData }, 'ContactFAQ')
      setSubmitSuccess(true)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: ''
      })

      setTimeout(() => setSubmitSuccess(false), 5000)
      
    } catch (error) {
      devLog.error('Error al enviar formulario', String(error), 'ContactFAQ')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section 
      id="contact" 
      className="min-h-screen py-24 md:py-32 bg-gradient-to-br from-bg-base-light via-bg-secondary-light/30 to-bg-base-light dark:from-bg-base-dark dark:via-bg-secondary-dark/30 dark:to-bg-base-dark relative overflow-hidden snap-start"
      ref={elementRef}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="contact-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" className="text-color-primary" />
        </svg>
      </div>

      <div className="layout-container relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-full border border-white/30 dark:border-gray-700/30 mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-2 h-2 bg-color-primary rounded-full animate-pulse" />
            <span className="text-small font-medium text-color-primary uppercase tracking-wider">
              ¿Dudas? Hablemos
            </span>
          </motion.div>
          
          <h2 className="heading-1 text-4xl lg:text-5xl xl:text-6xl font-black mb-6 font-display bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent">
            Resolvamos tus dudas y comencemos
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
            Consulta nuestras preguntas frecuentes o contáctanos directamente. Estamos listos para hacer crecer tu negocio.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-text-primary-light dark:text-text-primary-dark">
              Preguntas Frecuentes
            </h3>
            
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-white/5 dark:bg-black/5 backdrop-blur-xl rounded-xl border border-white/10 dark:border-gray-700/10 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 dark:hover:bg-black/5 transition-colors duration-200 rounded-xl"
                  >
                    <h4 className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark pr-4 leading-tight">
                      {item.question}
                    </h4>
                    <motion.div
                      animate={{ rotate: openItem === item.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <svg className="w-4 h-4 text-color-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openItem === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-white/10 dark:border-gray-700/10"
                      >
                        <div className="p-4 space-y-3">
                          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                            {item.answer}
                          </p>
                          
                          {item.details && (
                            <ul className="space-y-1">
                              {item.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                                  <div className="w-1 h-1 bg-color-primary rounded-full mt-2 flex-shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-text-primary-light dark:text-text-primary-dark">
              Cuéntanos sobre tu proyecto
            </h3>

            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl">
              <h4 className="text-xl font-bold mb-6 text-text-primary-light dark:text-text-primary-dark flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-color-accent rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                Contáctanos
              </h4>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-3 uppercase tracking-wider">
                      NOMBRE
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                      className={`w-full px-4 py-4 bg-transparent border-b-2 focus:outline-none transition-all duration-300 text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light/50 dark:placeholder-text-secondary-dark/50 ${
                        errors.name ? 'border-red-500' : 'border-white/30 dark:border-gray-600/30 focus:border-color-primary'
                      }`}
                    />
                    {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
                  </div>
                
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-3 uppercase tracking-wider">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="hola@tuempresa.com"
                      className={`w-full px-4 py-4 bg-transparent border-b-2 focus:outline-none transition-all duration-300 text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light/50 dark:placeholder-text-secondary-dark/50 ${
                        errors.email ? 'border-red-500' : 'border-white/30 dark:border-gray-600/30 focus:border-color-primary'
                      }`}
                    />
                    {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-3 uppercase tracking-wider">
                    TELÉFONO
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+52 999 123 4567"
                    className="w-full px-4 py-4 bg-transparent border-b-2 border-white/30 dark:border-gray-600/30 focus:border-color-primary focus:outline-none transition-all duration-300 text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light/50 dark:placeholder-text-secondary-dark/50"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-3 uppercase tracking-wider">
                      SERVICIO DE INTERÉS
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 bg-transparent border-b-2 focus:outline-none transition-all duration-300 text-text-primary-light dark:text-text-primary-dark appearance-none cursor-pointer ${
                        errors.service ? 'border-red-500' : 'border-white/30 dark:border-gray-600/30 focus:border-color-primary'
                      }`}
                    >
                      <option value="" className="bg-bg-base-light dark:bg-bg-base-dark">Seleccionar servicio</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option} className="bg-bg-base-light dark:bg-bg-base-dark">
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className="mt-2 text-xs text-red-500">{errors.service}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-3 uppercase tracking-wider">
                      PRESUPUESTO ESTIMADO
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-transparent border-b-2 border-white/30 dark:border-gray-600/30 focus:border-color-primary focus:outline-none transition-all duration-300 text-text-primary-light dark:text-text-primary-dark appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-bg-base-light dark:bg-bg-base-dark">Seleccionar rango</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range} className="bg-bg-base-light dark:bg-bg-base-dark">
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-3 uppercase tracking-wider">
                    MENSAJE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-4 bg-transparent border-b-2 focus:outline-none transition-all duration-300 text-text-primary-light dark:text-text-primary-dark resize-none placeholder-text-secondary-light/50 dark:placeholder-text-secondary-dark/50 ${
                      errors.message ? 'border-red-500' : 'border-white/30 dark:border-gray-600/30 focus:border-color-primary'
                    }`}
                    placeholder="Me encantaría conocer más sobre sus servicios"
                  />
                  {errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
                </div>

                <div className="flex items-start gap-3 py-4">
                  <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-sm flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Acepto los términos y condiciones
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-2xl font-bold text-white transition-all duration-300 shadow-xl hover:shadow-2xl text-lg ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : submitSuccess
                      ? 'bg-green-500'
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? 'Enviando...' : submitSuccess ? '¡Mensaje enviado!' : 'Enviar ahora'}
                </motion.button>
              </form>
            </div>

            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl text-green-700 dark:text-green-300"
              >
                ¡Gracias por contactarnos! Te responderemos dentro de 24 horas.
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactFAQ