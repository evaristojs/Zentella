import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

interface FAQItem {
  id: number
  question: string
  answer: string
  details?: string[]
}

const FAQ = () => {
  const { elementRef, isVisible } = useIntersectionObserver()
  const [openItem, setOpenItem] = useState<number | null>(null)

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "¿Cuánto cuesta el servicio/proyecto o cuál es el presupuesto necesario?",
      answer: "Los costos pueden variar enormemente, desde el 0 al infinito, dependiendo de los objetivos y recursos, así como de la fase del proyecto y la exposición de la marca. Factores como la industria, la competencia, la ubicación geográfica, el alcance y los objetivos del proyecto, la reputación y experiencia de la agencia, y la personalización de los servicios influyen en el precio.",
      details: [
        "Publicidad PPC: $1,500-$10,000/mes",
        "SEO: $1,000-$7,500/mes", 
        "Marketing en redes sociales: $1,000-$3,500/mes",
        "Marketing de contenido: $1,800-$12,000/mes",
        "Email marketing: $1,500-$7,500/mes",
        "Videos corporativos: entre $20,000-$100,000 MXN"
      ]
    },
    {
      id: 2,
      question: "¿Qué servicios ofrecen y cómo pueden ayudar a mi negocio?",
      answer: "Ofrecemos una amplia gama de servicios para mejorar la visibilidad, relevancia y posicionamiento de tu negocio. Nuestros servicios incluyen posicionamiento SEO, campañas SEM, diseño y desarrollo web, estrategias de contenido, diseño gráfico, fotografía, videografía, animación y gestión de redes sociales.",
      details: [
        "Posicionamiento SEO y campañas SEM",
        "Diseño y desarrollo web (WordPress, Woocommerce)",
        "Estrategias de contenido y marketing digital",
        "Diseño gráfico e identidad visual",
        "Fotografía comercial y de producto",
        "Videografía y animación 2D/3D",
        "Gestión de redes sociales"
      ]
    },
    {
      id: 3,
      question: "¿Qué resultados puedo esperar y cómo se mide el éxito?",
      answer: "Puedes esperar un aumento en el tráfico web, mayor visibilidad en los motores de búsqueda y un incremento en las conversiones. Utilizamos métricas específicas y objetivos SMART para medir el éxito de nuestras estrategias.",
      details: [
        "Análisis de datos de SEO y SEM",
        "Seguimiento de conversiones y ROI",
        "Métricas de engagement en redes sociales",
        "Informes regulares de rendimiento",
        "Objetivos SMART (Específicos, Medibles, Alcanzables, Relevantes, Temporales)"
      ]
    },
    {
      id: 4,
      question: "¿Cuánto tiempo tomará el proyecto o cuáles son los plazos de entrega?",
      answer: "La duración es variable y depende de la información proporcionada por el cliente y la complejidad del proyecto. Los proyectos se dividen en fases, y cada fase incluye un 'entregable' que requiere tu aprobación.",
      details: [
        "Los tiempos dependen de la información inicial proporcionada",
        "Cada fase requiere aprobación del cliente",
        "Los retrasos en feedback pueden afectar tiempos",
        "Proporcionamos cronograma detallado antes de iniciar"
      ]
    },
    {
      id: 5,
      question: "¿Cómo manejan las modificaciones y los cambios en el alcance del proyecto?",
      answer: "Ofrecemos hasta dos modificaciones incluidas en el proyecto inicial. Si se necesitan más cambios, se aplicará una tarifa preferencial. Los aumentos de alcance se reevalúan en tiempo y costos, formalizándose en una enmienda al contrato.",
      details: [
        "Máximo dos modificaciones incluidas",
        "Cambios adicionales con tarifa preferencial",
        "Reevaluación de tiempo y costos para cambios de alcance",
        "Comunicación transparente sobre impactos en el proyecto"
      ]
    },
    {
      id: 6,
      question: "¿Es necesario que mi empresa esté presente en redes sociales?",
      answer: "Sí, es prácticamente imprescindible estar presente en redes sociales, independientemente del tamaño de la empresa. Las redes sociales permiten conseguir nuevos clientes, demostrar modernidad y ofrecer múltiples canales de contacto.",
      details: [
        "Conseguir nuevos clientes y leads",
        "Demostrar modernidad y relevancia",
        "Múltiples canales de contacto",
        "Interacción bidireccional con audiencia",
        "Ventaja competitiva en el mercado"
      ]
    },
    {
      id: 7,
      question: "¿Cómo es el proceso de colaboración y comunicación durante el proyecto?",
      answer: "El proceso se construye mediante el aporte constante de ambas partes: tu visión de negocio y nuestra experiencia en diseño, comunicación y tecnología. Comenzamos con una consultoría inicial y mantenemos comunicación regular throughout el proyecto.",
      details: [
        "Consultoría inicial para definir objetivos",
        "Seguimiento constante con informes regulares",
        "Comunicación clara y transparente",
        "Colaboración estrecha cliente-agencia",
        "Adaptación de estrategias según necesidades"
      ]
    }
  ]

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section 
      id="faq" 
      className="min-h-screen py-24 md:py-32 bg-bg-base-light dark:bg-bg-base-dark relative overflow-hidden snap-start"
      ref={elementRef}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="faq-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faq-grid)" className="text-color-primary" />
        </svg>
      </div>

      <div className="layout-container relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
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
              FAQ
            </span>
          </motion.div>
          
          <h2 className="heading-1 text-4xl lg:text-5xl xl:text-6xl font-black mb-6 font-display bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
            Resolvemos las dudas más comunes sobre nuestros servicios de marketing digital, diseño y producción audiovisual
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div 
          className="max-w-4xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative overflow-hidden bg-white/5 dark:bg-black/5 backdrop-blur-xl rounded-2xl border border-white/10 dark:border-gray-700/10 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 dark:hover:bg-black/5 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark pr-4 leading-tight">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItem === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg 
                    className="w-5 h-5 text-color-primary" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-white/10 dark:border-gray-700/10"
                  >
                    <div className="p-6 space-y-4">
                      <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                        {item.answer}
                      </p>
                      
                      {item.details && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-color-primary uppercase tracking-wider">
                            Detalles específicos:
                          </h4>
                          <ul className="space-y-2">
                            {item.details.map((detail, idx) => (
                              <li 
                                key={idx}
                                className="flex items-start gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark"
                              >
                                <div className="w-1.5 h-1.5 bg-color-primary rounded-full mt-2 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-2xl mx-auto">
            ¿No encontraste la respuesta que buscabas? Contáctanos directamente y resolveremos todas tus dudas.
          </p>
          <motion.button 
            className="px-8 py-4 bg-gradient-to-r from-color-primary to-color-secondary text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Contactar ahora
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ