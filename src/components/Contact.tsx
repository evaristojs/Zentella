import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { Building, Mail, Phone, Clock, Send, CheckCircle } from '@klarr-agency/circum-icons-react'

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

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido'
    else if (formData.name.trim().length < 2) newErrors.name = 'El nombre debe tener al menos 2 caracteres'

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) newErrors.email = 'El email es requerido'
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Ingresa un email válido'

    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido'
    else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Ingresa un teléfono válido'

    if (!formData.service) newErrors.service = 'Selecciona un servicio'
    if (!formData.budget) newErrors.budget = 'Selecciona un rango de presupuesto'

    if (!formData.message.trim()) newErrors.message = 'El mensaje es requerido'
    else if (formData.message.trim().length < 10) newErrors.message = 'El mensaje debe tener al menos 10 caracteres'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Formulario enviado:', formData)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' })
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
              <motion.div 
                className="w-16 h-16 bg-color-success rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="heading-2 text-color-success mb-4">¡Mensaje Enviado!</h2>
              <p className="text-base mb-8">
                Gracias por contactarnos. Te responderemos en las próximas 24 horas.
              </p>
              <motion.button 
                className="btn-primary"
                onClick={() => setIsSubmitted(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enviar otro mensaje
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section 
      id="contact" 
      className="py-12 md:py-20 bg-bg-base-light dark:bg-bg-base-dark snap-start"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoCard icon={<Building className="w-5 h-5 text-white" />} title="Oficina" lines={['Mérida, Yucatán', 'México']} />
              <InfoCard icon={<Mail className="w-5 h-5 text-white" />} title="Email" lines={['hello@zentella.com', 'proyectos@zentella.com']} />
              <InfoCard icon={<Phone className="w-5 h-5 text-white" />} title="Teléfono" lines={['+52 999 123 4567']} />
              <InfoCard icon={<Clock className="w-5 h-5 text-white" />} title="Horarios" lines={['Lun - Vie: 9:00 - 18:00', 'Sáb: 9:00 - 14:00']} />
            </div>

            <div className="card-base">
              <h4 className="heading-3 text-color-primary mb-4">Síguenos</h4>
              <div className="flex flex-wrap gap-3">
                {['Instagram', 'Behance', 'LinkedIn', 'Facebook'].map((social) => (
                  <motion.a 
                    key={social}
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social}
                  </motion.a>
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
                <FormField name="name" label="Nombre" placeholder="Tu nombre completo" value={formData.name} error={errors.name} onChange={handleInputChange} />
                <FormField name="email" type="email" label="Email" placeholder="tu@email.com" value={formData.email} error={errors.email} onChange={handleInputChange} />
              </div>

              <div className="grid-mobile md:grid-tablet gap-6">
                <FormField name="phone" type="tel" label="Teléfono" placeholder="+52 999 123 4567" value={formData.phone} error={errors.phone} onChange={handleInputChange} />
                <FormField name="company" label="Empresa" placeholder="Nombre de tu empresa" value={formData.company} error={errors.company} onChange={handleInputChange} />
              </div>

              <div className="grid-mobile md:grid-tablet gap-6">
                <FormSelect name="service" label="Servicio de Interés" value={formData.service} error={errors.service} options={services} onChange={handleInputChange} />
                <FormSelect name="budget" label="Presupuesto" value={formData.budget} error={errors.budget} options={budgetRanges} onChange={handleInputChange} />
              </div>

              <FormTextarea name="message" label="Mensaje" placeholder="Cuéntanos sobre tu proyecto..." value={formData.message} error={errors.message} onChange={handleInputChange} />

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary w-full flex items-center justify-center gap-2 ${isSubmitting ? 'btn-disabled' : ''}`}
                whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div 
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Enviando...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="submit"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      Enviar Mensaje
                      <Send className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Helper components for form fields to reduce repetition
const FormField = ({ name, label, error, ...props }: { name: string; label: string; error?: string; [key: string]: unknown }) => (
  <div>
    <label className="label-base">{label} *</label>
    <motion.div 
      className={`messageBox ${error ? 'border-color-error dark:border-color-error' : ''}`}
      whileFocus={{ scale: 1.01 }}
    >
      <input
        name={name}
        {...props}
      />
    </motion.div>
    <AnimatePresence>
      {error && <FormError message={error} />}
    </AnimatePresence>
  </div>
)

const FormSelect = ({ name, label, error, options, ...props }: { name: string; label: string; error?: string; options: string[]; [key: string]: unknown }) => (
  <div>
    <label className="label-base">{label} *</label>
    <motion.div 
      className={`messageBox ${error ? 'border-color-error dark:border-color-error' : ''}`}
      whileFocus={{ scale: 1.01 }}
    >
      <select name={name} {...props}>
        <option value="">Selecciona una opción</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </motion.div>
    <AnimatePresence>
      {error && <FormError message={error} />}
    </AnimatePresence>
  </div>
)

const FormTextarea = ({ name, label, error, ...props }: { name: string; label: string; error?: string; [key: string]: unknown }) => (
  <div>
    <label className="label-base">{label} *</label>
    <motion.div 
      className={`messageBox ${error ? 'border-color-error dark:border-color-error' : ''}`}
      whileFocus={{ scale: 1.01 }}
    >
      <textarea
        name={name}
        rows={5}
        {...props}
      />
    </motion.div>
    <AnimatePresence>
      {error && <FormError message={error} />}
    </AnimatePresence>
  </div>
)

const FormError = ({ message }: { message: string }) => (
  <motion.p
    className="text-color-error text-small mt-1"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    {message}
  </motion.p>
)

const InfoCard = ({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) => (
  <motion.div 
    className="card-base-static hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    whileHover={{ scale: 1.03 }}
  >
    <div className="flex items-start gap-4">
      <motion.div 
        className="w-10 h-10 bg-color-primary rounded-xl flex items-center justify-center text-white flex-shrink-0"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {icon}
      </motion.div>
      <div>
        <h4 className="heading-3 text-color-primary mb-2">{title}</h4>
        <div className="text-base">
          {lines.map((line, i) => <p key={i}>{line}</p>)}
        </div>
      </div>
    </div>
  </motion.div>
)

export default Contact