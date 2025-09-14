import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useLanguage } from '../hooks/useLanguage'

interface FAQItem {
  id: number
  question: string
  answer: string
  details?: string[]
}

const FAQ = () => {
  const { elementRef, isVisible } = useIntersectionObserver()
  const { t } = useLanguage()
  const [openItem, setOpenItem] = useState<number | null>(null)

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: t('faq.q1.question'),
      answer: t('faq.q1.answer'),
      details: [
        t('faq.q1.detail1'),
        t('faq.q1.detail2'),
        t('faq.q1.detail3'),
        t('faq.q1.detail4'),
        t('faq.q1.detail5'),
        t('faq.q1.detail6')
      ]
    },
    {
      id: 2,
      question: t('faq.q2.question'),
      answer: t('faq.q2.answer'),
      details: [
        t('faq.q2.detail1'),
        t('faq.q2.detail2'),
        t('faq.q2.detail3'),
        t('faq.q2.detail4'),
        t('faq.q2.detail5'),
        t('faq.q2.detail6'),
        t('faq.q2.detail7')
      ]
    },
    {
      id: 3,
      question: t('faq.q3.question'),
      answer: t('faq.q3.answer'),
      details: [
        t('faq.q3.detail1'),
        t('faq.q3.detail2'),
        t('faq.q3.detail3'),
        t('faq.q3.detail4'),
        t('faq.q3.detail5')
      ]
    },
    {
      id: 4,
      question: t('faq.q4.question'),
      answer: t('faq.q4.answer'),
      details: [
        t('faq.q4.detail1'),
        t('faq.q4.detail2'),
        t('faq.q4.detail3'),
        t('faq.q4.detail4')
      ]
    },
    {
      id: 5,
      question: t('faq.q5.question'),
      answer: t('faq.q5.answer'),
      details: [
        t('faq.q5.detail1'),
        t('faq.q5.detail2'),
        t('faq.q5.detail3'),
        t('faq.q5.detail4')
      ]
    },
    {
      id: 6,
      question: t('faq.q6.question'),
      answer: t('faq.q6.answer'),
      details: [
        t('faq.q6.detail1'),
        t('faq.q6.detail2'),
        t('faq.q6.detail3'),
        t('faq.q6.detail4'),
        t('faq.q6.detail5')
      ]
    },
    {
      id: 7,
      question: t('faq.q7.question'),
      answer: t('faq.q7.answer'),
      details: [
        t('faq.q7.detail1'),
        t('faq.q7.detail2'),
        t('faq.q7.detail3'),
        t('faq.q7.detail4'),
        t('faq.q7.detail5')
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
              {t('faq.badge')}
            </span>
          </motion.div>
          
          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black mb-6 font-display bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent" style={{lineHeight: '1.4', paddingBottom: '0.25rem', overflow: 'visible'}}>
            {t('faq.titulo')}
          </h2>
          <p className="text-center-hyphens text-lg max-w-3xl mx-auto text-text-secondary-light dark:text-text-secondary-dark">
            {t('faq.subtitulo')}
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
              className="group relative overflow-visible bg-white/5 dark:bg-black/5 backdrop-blur-xl rounded-2xl border border-white/10 dark:border-gray-700/10 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              style={{ isolation: 'isolate' }}
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
                    initial={{ height: 0, opacity: 0, y: -10 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-white/10 dark:border-gray-700/10"
                    style={{ transformOrigin: "top" }}
                  >
                    <div className="p-6 space-y-4">
                      <p className="text-left-hyphens text-base text-text-secondary-light dark:text-text-secondary-dark">
                        {item.answer}
                      </p>
                      
                      {item.details && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-color-primary uppercase tracking-wider">
                            {t('faq.detalles_especificos')}
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
          <p className="text-center-hyphens text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-2xl mx-auto">
            {t('faq.no_respuesta')}
          </p>
          <motion.button 
            className="px-8 py-4 bg-gradient-to-r from-color-primary to-color-secondary text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('faq.contactar_ahora')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ