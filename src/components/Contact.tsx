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
      <section id="contact" className="section-padding bg-base-100">
        <div className="container-custom">
          <motion.div 
            className="flex items-center justify-center min-h-[60vh]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="card glass-effect text-center p-12 max-w-lg">
              <div className="text-6xl mb-6 text-success">✓</div>
              <h2 className="text-2xl font-bold gradient-text mb-4">¡Mensaje Enviado!</h2>
              <p className="text-base-content/80 mb-8">
                Gracias por contactarnos. Te responderemos en las próximas 24 horas.
              </p>
              <button 
                className="btn btn-primary hover-glow"
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
      className="section-padding bg-base-200/50"
      ref={elementRef}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="badge badge-primary badge-lg mb-4 font-mono">CONTACTO</div>
          <h2 className="text-section gradient-text mb-6">
            Hablemos
          </h2>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Cuéntanos sobre tu proyecto y cómo podemos ayudarte a hacerlo realidad.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid gap-6">
              <div className="card glass-effect p-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">🏢</div>
                  <div>
                    <h4 className="font-semibold gradient-text mb-2">Oficina</h4>
                    <p className="text-base-content/80">
                      Mérida, Yucatán<br />
                      México
                    </p>
                  </div>
                </div>
              </div>

              <div className="card glass-effect p-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h4 className="font-semibold gradient-text mb-2">Email</h4>
                    <p className="text-base-content/80">
                      hello@zentella.com<br />
                      proyectos@zentella.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="card glass-effect p-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📱</div>
                  <div>
                    <h4 className="font-semibold gradient-text mb-2">Teléfono</h4>
                    <p className="text-base-content/80">+52 999 123 4567</p>
                  </div>
                </div>
              </div>

              <div className="card glass-effect p-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">🕒</div>
                  <div>
                    <h4 className="font-semibold gradient-text mb-2">Horarios</h4>
                    <p className="text-base-content/80">
                      Lun - Vie: 9:00 - 18:00<br />
                      Sáb: 9:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card glass-effect p-6">
              <h4 className="font-semibold gradient-text mb-4">Síguenos</h4>
              <div className="flex flex-wrap gap-3">
                {['Instagram', 'Behance', 'LinkedIn', 'Facebook'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm glass-effect hover-glow"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="card glass-effect p-8"
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
              
              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Nombre *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre completo"
                    className={`input input-bordered glass-effect ${errors.name ? 'input-error' : ''}`}
                  />
                  {errors.name && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.name}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className={`input input-bordered glass-effect ${errors.email ? 'input-error' : ''}`}
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.email}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Phone & Company Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Teléfono *</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+52 999 123 4567"
                    className={`input input-bordered glass-effect ${errors.phone ? 'input-error' : ''}`}
                  />
                  {errors.phone && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.phone}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Empresa</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nombre de tu empresa"
                    className="input input-bordered glass-effect"
                  />
                </div>
              </div>

              {/* Service & Budget Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Servicio de Interés *</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={`select select-bordered glass-effect ${errors.service ? 'select-error' : ''}`}
                  >
                    <option value="">Selecciona un servicio</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.service}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Presupuesto *</span>
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={`select select-bordered glass-effect ${errors.budget ? 'select-error' : ''}`}
                  >
                    <option value="">Selecciona un rango</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                  {errors.budget && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.budget}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Mensaje *</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Cuéntanos sobre tu proyecto, objetivos, timeline y cualquier detalle relevante..."
                  rows={6}
                  className={`textarea textarea-bordered glass-effect h-32 ${errors.message ? 'textarea-error' : ''}`}
                />
                {errors.message && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.message}</span>
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg w-full hover-glow"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Mensaje
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact