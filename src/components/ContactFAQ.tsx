import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../contexts/ThemeContext'


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
  const { t } = useLanguage()
  const { isDark } = useTheme()
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
  const [acceptedTerms, setAcceptedTerms] = useState(true)

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: t('contact.faq.q1.question'),
      answer: t('contact.faq.q1.answer'),
      details: [
        t('contact.faq.q1.detail1'),
        t('contact.faq.q1.detail2'),
        t('contact.faq.q1.detail3'),
        t('contact.faq.q1.detail4'),
        t('contact.faq.q1.detail5'),
        t('contact.faq.q1.detail6')
      ]
    },
    {
      id: 2,
      question: t('contact.faq.q2.question'),
      answer: t('contact.faq.q2.answer'),
      details: [
        t('contact.faq.q2.detail1'),
        t('contact.faq.q2.detail2'),
        t('contact.faq.q2.detail3'),
        t('contact.faq.q2.detail4'),
        t('contact.faq.q2.detail5'),
        t('contact.faq.q2.detail6'),
        t('contact.faq.q2.detail7')
      ]
    },
    {
      id: 3,
      question: t('contact.faq.q3.question'),
      answer: t('contact.faq.q3.answer'),
      details: [
        t('contact.faq.q3.detail1'),
        t('contact.faq.q3.detail2'),
        t('contact.faq.q3.detail3'),
        t('contact.faq.q3.detail4'),
        t('contact.faq.q3.detail5')
      ]
    },
    {
      id: 4,
      question: t('contact.faq.q4.question'),
      answer: t('contact.faq.q4.answer'),
      details: [
        t('contact.faq.q4.detail1'),
        t('contact.faq.q4.detail2'),
        t('contact.faq.q4.detail3'),
        t('contact.faq.q4.detail4')
      ]
    },
    {
      id: 5,
      question: t('contact.faq.q6.question'),
      answer: t('contact.faq.q6.answer'),
      details: [
        t('contact.faq.q6.detail1'),
        t('contact.faq.q6.detail2'),
        t('contact.faq.q6.detail3'),
        t('contact.faq.q6.detail4'),
        t('contact.faq.q6.detail5')
      ]
    },
    {
      id: 6,
      question: t('contact.faq.q7.question'),
      answer: t('contact.faq.q7.answer'),
      details: [
        t('contact.faq.q7.detail1'),
        t('contact.faq.q7.detail2'),
        t('contact.faq.q7.detail3'),
        t('contact.faq.q7.detail4'),
        t('contact.faq.q7.detail5')
      ]
    }
  ]

  const serviceOptions = [
    t('contact.servicio_marketing_digital'),
    t('contact.servicio_diseno_grafico'),
    t('contact.servicio_fotografia'),
    t('contact.servicio_videografia'),
    t('contact.servicio_animacion'),
    t('contact.servicio_desarrollo_web'),
    t('contact.servicio_consultoria'),
    t('contact.servicio_otro')
  ]

  const budgetRanges = [
    t('contact.presupuesto_menos_10k'),
    t('contact.presupuesto_10k_25k'),
    t('contact.presupuesto_25k_50k'),
    t('contact.presupuesto_50k_100k'),
    t('contact.presupuesto_mas_100k'),
    t('contact.presupuesto_por_definir')
  ]

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) newErrors.name = t('error.nombre_requerido')
    if (!formData.email.trim()) {
      newErrors.email = t('error.email_requerido')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('error.email_invalido')
    }
    if (!formData.service) newErrors.service = t('error.servicio_requerido')
    if (!formData.message.trim()) newErrors.message = t('error.mensaje_requerido')

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
      console.error('Form submission error:', error)
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
      className="min-h-screen py-24 md:py-32 pb-0 text-text-primary-light dark:text-text-primary-dark relative overflow-hidden"
      ref={elementRef}
      style={{
        background: isDark
          ? `
            linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%),
            conic-gradient(from 45deg at 25% 25%, rgba(103, 0, 248, 0.02) 0deg, transparent 90deg),
            conic-gradient(from 225deg at 75% 75%, rgba(172, 0, 211, 0.025) 0deg, transparent 90deg)
          `
          : `
            linear-gradient(135deg, #FDFEFF 0%, #F8FAFC 50%, #FDFEFF 100%),
            conic-gradient(from 45deg at 25% 25%, rgba(103, 0, 248, 0.008) 0deg, transparent 90deg),
            conic-gradient(from 225deg at 75% 75%, rgba(172, 0, 211, 0.01) 0deg, transparent 90deg)
          `
      }}
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

      <div className="layout-container relative z-10 pb-24 md:pb-32">
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
              {t('contact.subtitulo')}
            </span>
          </motion.div>
          
          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black mb-6 font-display bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent" style={{lineHeight: '1.4', paddingBottom: '0.25rem', overflow: 'visible'}}>
            {t('contact.titulo_principal')}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
            {t('contact.descripcion')}
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
              {t('contact.faq_titulo')}
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

            {/* Información de contacto - Debajo del FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 space-y-4"
            >
              {/* Contacto */}
              <motion.div
                whileHover={{ y: -3 }}
                className="p-6 rounded-2xl bg-bg-secondary-light dark:bg-bg-secondary-dark border border-gray-200/30 dark:border-gray-800/30 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-color-primary/10 dark:bg-color-primary/20 flex-shrink-0">
                    <svg className="w-5 h-5 text-color-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2 text-text-primary-light dark:text-text-primary-dark">
                      {t('contact.ubicacion.contacto_titulo')}
                    </h4>
                    <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{t('contact.ubicacion.telefono')}: </span>
                        <a
                          href="tel:8495170527"
                          className="text-color-primary hover:text-color-secondary transition-colors duration-300 hover:underline"
                        >
                          {t('contact.ubicacion.numero_telefono')}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{t('contact.ubicacion.email')}: </span>
                        <a
                          href="mailto:hola@zentella.com"
                          className="text-color-primary hover:text-color-secondary transition-colors duration-300 hover:underline"
                        >
                          {t('contact.ubicacion.direccion_email')}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{t('contact.ubicacion.whatsapp')}: </span>
                        <a
                          href="https://wa.me/8495170527"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-color-primary hover:text-color-secondary transition-colors duration-300 hover:underline"
                        >
                          {t('contact.ubicacion.numero_whatsapp')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-full flex flex-col"
          >
            <h3 className="text-2xl font-bold mb-8 text-text-primary-light dark:text-text-primary-dark">
              {t('contact.form_titulo')}
            </h3>

            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl flex-1 flex flex-col">
              <h4 className="text-xl font-bold mb-6 text-text-primary-light dark:text-text-primary-dark flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-color-accent rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                {t('contact.titulo')}
              </h4>
              
              <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactfaq-name" className="block text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-3 uppercase tracking-wider">
                      {t('contact.nombre')}
                    </label>
                    <input
                      id="contactfaq-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('placeholder.nombre')}
                      autoComplete="name"
                      className={`w-full px-4 py-4 bg-transparent border-b-2 focus:outline-none transition-all duration-300 text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light/50 dark:placeholder-text-secondary-dark/50 ${
                        errors.name ? 'border-red-500' : 'border-white/30 dark:border-gray-600/30 focus:border-color-primary'
                      }`}
                    />
                    {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
                  </div>
                
                  <div>
                    <label htmlFor="contactfaq-email" className="block text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-3 uppercase tracking-wider">
                      {t('contact.email')}
                    </label>
                    <input
                      id="contactfaq-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('placeholder.email')}
                      autoComplete="email"
                      className={`w-full px-4 py-4 bg-transparent border-b-2 focus:outline-none transition-all duration-300 text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light/50 dark:placeholder-text-secondary-dark/50 ${
                        errors.email ? 'border-red-500' : 'border-white/30 dark:border-gray-600/30 focus:border-color-primary'
                      }`}
                    />
                    {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contactfaq-phone" className="block text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-3 uppercase tracking-wider">
                    {t('contact.telefono')}
                  </label>
                  <input
                    id="contactfaq-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('placeholder.telefono')}
                    autoComplete="tel"
                    className="w-full px-4 py-4 bg-transparent border-b-2 border-white/30 dark:border-gray-600/30 focus:border-color-primary focus:outline-none transition-all duration-300 text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light/50 dark:placeholder-text-secondary-dark/50"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactfaq-service" className="block text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-3 uppercase tracking-wider">
                      {t('contact.servicio')}
                    </label>
                    <select
                      id="contactfaq-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      autoComplete="off"
                      className={`w-full px-4 py-4 bg-transparent border-b-2 focus:outline-none transition-all duration-300 text-text-primary-light dark:text-text-primary-dark appearance-none cursor-pointer ${
                        errors.service ? 'border-red-500' : 'border-white/30 dark:border-gray-600/30 focus:border-color-primary'
                      }`}
                    >
                      <option value="" className="bg-bg-base-light dark:bg-bg-base-dark">{t('contact.seleccionar_servicio')}</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option} className="bg-bg-base-light dark:bg-bg-base-dark">
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className="mt-2 text-xs text-red-500">{errors.service}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="contactfaq-budget" className="block text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-3 uppercase tracking-wider">
                      {t('contact.presupuesto')}
                    </label>
                    <select
                      id="contactfaq-budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      autoComplete="off"
                      className="w-full px-4 py-4 bg-transparent border-b-2 border-white/30 dark:border-gray-600/30 focus:border-color-primary focus:outline-none transition-all duration-300 text-text-primary-light dark:text-text-primary-dark appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-bg-base-light dark:bg-bg-base-dark">{t('contact.seleccionar_rango')}</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range} className="bg-bg-base-light dark:bg-bg-base-dark">
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <label htmlFor="contactfaq-message" className="block text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-3 uppercase tracking-wider">
                    {t('contact.mensaje')}
                  </label>
                  <textarea
                    id="contactfaq-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    autoComplete="off"
                    className={`w-full px-4 py-4 bg-transparent border-b-2 focus:outline-none transition-all duration-300 text-text-primary-light dark:text-text-primary-dark resize-none placeholder-text-secondary-light/50 dark:placeholder-text-secondary-dark/50 flex-1 ${
                      errors.message ? 'border-red-500' : 'border-white/30 dark:border-gray-600/30 focus:border-color-primary'
                    }`}
                    placeholder={t('placeholder.mensaje')}
                  />
                  {errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
                </div>

                <div className="flex items-start gap-3 py-4">
                  <button
                    type="button"
                    onClick={() => setAcceptedTerms(!acceptedTerms)}
                    className={`flex items-center justify-center w-6 h-6 rounded-sm flex-shrink-0 mt-0.5 transition-all duration-300 ${
                      acceptedTerms
                        ? 'bg-gradient-to-r from-color-primary to-color-secondary'
                        : 'border-2 border-text-secondary-light/30 dark:border-text-secondary-dark/30 bg-transparent hover:border-color-primary'
                    }`}
                  >
                    {acceptedTerms && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {t('contact.terminos')}
                  </p>
                </div>
                <div className="min-h-[24px] -mt-2 ml-9 mb-2">
                  {!acceptedTerms && (
                    <p className="text-xs text-red-500">
                      {t('contact.terminos_requeridos')}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !acceptedTerms}
                  className={`group relative overflow-hidden w-full px-8 py-4 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation border flex items-center justify-center gap-2 ${
                    isSubmitting || !acceptedTerms
                      ? 'bg-gray-400 cursor-not-allowed opacity-70 border-gray-400/20'
                      : submitSuccess
                      ? 'bg-green-500 border-green-500/20'
                      : 'bg-gradient-to-r from-color-primary to-color-secondary border-color-primary/20'
                  }`}
                  whileHover={!isSubmitting && acceptedTerms ? { scale: 1.03, y: -2 } : {}}
                  whileTap={!isSubmitting && acceptedTerms ? { scale: 0.97 } : {}}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div 
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        {t('contact.enviando')}
                      </>
                    ) : submitSuccess ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t('contact.enviado')}
                      </>
                    ) : (
                      <>
                        {t('contact.enviar')}
                        <motion.svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </motion.svg>
                      </>
                    )}
                  </span>
                  {!isSubmitting && !submitSuccess && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-color-secondary to-color-primary opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"
                      whileHover={{ opacity: 1 }}
                    />
                  )}
                </motion.button>
              </form>
            </div>

            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl text-green-700 dark:text-green-300"
              >
                {t('contact.success_message')}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactFAQ