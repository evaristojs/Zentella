import { useState } from 'react'
import './Contact.css'

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
      <section id="contact" className="contact">
        <div className="container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>¡Mensaje Enviado!</h2>
            <p>Gracias por contactarnos. Te responderemos en las próximas 24 horas.</p>
            <button 
              className="back-btn"
              onClick={() => setIsSubmitted(false)}
            >
              Enviar otro mensaje
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>HABLEMOS</h2>
            <p className="contact-subtitle">
              Cuéntanos sobre tu proyecto y cómo podemos ayudarte a hacerlo realidad.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <h4>Oficina</h4>
                <p>Mérida, Yucatán<br />México</p>
              </div>
              
              <div className="contact-item">
                <h4>Email</h4>
                <p>hello@zentella.com<br />proyectos@zentella.com</p>
              </div>
              
              <div className="contact-item">
                <h4>Teléfono</h4>
                <p>+52 999 123 4567</p>
              </div>
              
              <div className="contact-item">
                <h4>Horarios</h4>
                <p>Lun - Vie: 9:00 - 18:00<br />Sáb: 9:00 - 14:00</p>
              </div>
            </div>

            <div className="social-links">
              <h4>Síguenos</h4>
              <div className="social-list">
                <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Behance</a>
                <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form 
              className="contact-form" 
              onSubmit={handleSubmit}
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nombre *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Tu nombre completo"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Teléfono *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="+52 999 123 4567"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="company">Empresa</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="service">Servicio de Interés *</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={errors.service ? 'error' : ''}
                  >
                    <option value="">Selecciona un servicio</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  {errors.service && <span className="error-message">{errors.service}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Presupuesto *</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={errors.budget ? 'error' : ''}
                  >
                    <option value="">Selecciona un rango</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                  {errors.budget && <span className="error-message">{errors.budget}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? 'error' : ''}
                  placeholder="Cuéntanos sobre tu proyecto, objetivos, timeline y cualquier detalle relevante..."
                  rows={6}
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Enviando...
                  </>
                ) : (
                  'Enviar Mensaje'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact