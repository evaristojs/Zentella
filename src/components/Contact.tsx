import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  budget: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

const Contact = () => {
  const { elementRef, isVisible } = useIntersectionObserver()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const services = [
    'Marketing Digital',
    'Fotografía',
    'Diseño Gráfico',
    'Videografía',
    'Animación',
    'Proyecto Integral'
  ]

  const budgetRanges = [
    '$5,000 - $15,000 MXN',
    '$15,000 - $30,000 MXN',
    '$30,000 - $50,000 MXN',
    '$50,000 - $100,000 MXN',
    '$100,000+ MXN'
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validación del nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    }

    // Validación del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido'
    }

    // Validación del teléfono
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Ingresa un teléfono válido'
    }

    // Validación del servicio
    if (!formData.service) {
      newErrors.service = 'Selecciona un servicio'
    }

    // Validación del presupuesto
    if (!formData.budget) {
      newErrors.budget = 'Selecciona un rango de presupuesto'
    }

    // Validación del mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Limpiar error específico cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Formulario enviado:', formData)
      setIsSubmitted(true)
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: ''
      })
    } catch (error) {
      console.error('Error al enviar formulario:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="py-12 md:py-20 bg-white dark:bg-bg-base-dark">
        <div className="layout-container">
          <motion.div 
            className="flex items-center justify-center min-h-[60vh]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="card-base text-center max-w-lg">
              <div className="w-16 h-16 bg-color-success rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="heading-2 text-color-success mb-4">¡Mensaje Enviado!</h2>
              <p className="text-base mb-8">
                Gracias por contactarnos. Te responderemos en las próximas 24 horas.
              </p>
              <button 
                className="btn-primary"
                onClick={() => setIsSubmitted(false)}
              >
                Enviar otro mensaje
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section 
      id="contact" 
      className="py-12 md:py-20 bg-bg-base-light dark:bg-bg-base-dark"
      ref={elementRef}
    >
      <div className="layout-container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-color-primary/10 text-color-primary rounded-xl px-4 py-2 text-small font-medium mb-4 inline-block">
            CONTACTO
          </span>
          <h2 className="heading-1 lg:text-4xl text-color-primary mb-6">
            Hablemos
          </h2>
          <p className="text-base max-w-2xl mx-auto">
            Cuéntanos sobre tu proyecto y cómo podemos ayudarte a hacerlo realidad.
          </p>
        </motion.div>

        <div className="grid-mobile lg:grid-tablet gap-16">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid-mobile gap-6">
              <motion.div 
                className="card-base-static hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: "easeInOut" }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="w-10 h-10 bg-color-primary rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </motion.div>
                  <div>
                    <h4 className="heading-3 text-color-primary mb-2">Oficina</h4>
                    <p className="text-base">
                      Mérida, Yucatán<br />
                      México
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="card-base">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-color-primary rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="heading-3 text-color-primary mb-2">Email</h4>
                    <p className="text-base">
                      hello@zentella.com<br />
                      proyectos@zentella.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-base">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-color-primary rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="heading-3 text-color-primary mb-2">Teléfono</h4>
                    <p className="text-base">+52 999 123 4567</p>
                  </div>
                </div>
              </div>

              <div className="card-base">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-color-primary rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="heading-3 text-color-primary mb-2">Horarios</h4>
                    <p className="text-base">
                      Lun - Vie: 9:00 - 18:00<br />
                      Sáb: 9:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-base">
              <h4 className="heading-3 text-color-primary mb-4">Síguenos</h4>
              <div className="flex flex-wrap gap-3">
                {['Instagram', 'Behance', 'LinkedIn', 'Facebook'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card-base"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form 
              onSubmit={handleSubmit}
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />
              
              <div className="grid-mobile md:grid-tablet gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2, ease: "easeInOut" }}
                >
                  <motion.label 
                    className="label-base"
                    animate={{ 
                      color: formData.name ? '#3B82F6' : undefined,
                      scale: formData.name ? 0.95 : 1 
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    Nombre *
                  </motion.label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre completo"
                    className={`input-base ${errors.name ? 'border-color-error shake' : ''}`}
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                  {errors.name && (
                    <motion.p 
                      className="text-color-error text-small mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.2, ease: "easeInOut" }}
                >
                  <motion.label 
                    className="label-base"
                    animate={{ 
                      color: formData.email ? '#3B82F6' : undefined,
                      scale: formData.email ? 0.95 : 1 
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    Email *
                  </motion.label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className={`input-base ${errors.email ? 'border-color-error shake' : ''}`}
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                  {errors.email && (
                    <motion.p 
                      className="text-color-error text-small mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              <div className="grid-mobile md:grid-tablet gap-6">
                <div>
                  <label className="label-base">Teléfono *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+52 999 123 4567"
                    className={`input-base ${errors.phone ? 'border-color-error' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-color-error text-small mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="label-base">Empresa</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nombre de tu empresa"
                    className="input-base"
                  />
                </div>
              </div>

              <div className="grid-mobile md:grid-tablet gap-6">
                <div>
                  <label className="label-base">Servicio de Interés *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={`input-base ${errors.service ? 'border-color-error' : ''}`}
                  >
                    <option value="">Selecciona un servicio</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-color-error text-small mt-1">{errors.service}</p>
                  )}
                </div>

                <div>
                  <label className="label-base">Presupuesto *</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={`input-base ${errors.budget ? 'border-color-error' : ''}`}
                  >
                    <option value="">Selecciona un rango</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                  {errors.budget && (
                    <p className="text-color-error text-small mt-1">{errors.budget}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="label-base">Mensaje *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Cuéntanos sobre tu proyecto, objetivos, timeline y cualquier detalle relevante..."
                  rows={6}
                  className={`input-base h-32 ${errors.message ? 'border-color-error' : ''}`}
                />
                {errors.message && (
                  <p className="text-color-error text-small mt-1">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary flex items-center justify-center gap-2 ${isSubmitting ? 'btn-disabled' : ''}`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                animate={{
                  scale: isSubmitting ? [1, 1.02, 1] : 1
                }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeInOut",
                  repeat: isSubmitting ? Infinity : 0,
                  repeatDelay: 0.5
                }}
              >
                <motion.div
                  animate={{ opacity: isSubmitting ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  Enviar Mensaje
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </motion.svg>
                </motion.div>
                
                <motion.div
                  animate={{ opacity: isSubmitting ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute flex items-center gap-2"
                >
                  <motion.div 
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Enviando...
                </motion.div>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact