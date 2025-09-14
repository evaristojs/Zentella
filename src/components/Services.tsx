import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useLanguage } from '../hooks/useLanguage'

const Services = () => {
  const { elementRef, isVisible } = useIntersectionObserver()
  const { t } = useLanguage()

  const services = [
    {
      id: 1,
      title: t('services.marketing.titulo'),
      description: t('services.marketing.descripcion'),
      features: t('services.marketing.features'),
      icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
    },
    {
      id: 2,
      title: t('services.diseno.titulo'),
      description: t('services.diseno.descripcion'),
      features: t('services.diseno.features'),
      icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-4a2 2 0 00-2-2H7M7 21V9a2 2 0 012-2h6a2 2 0 012 2v8M7 9V5a2 2 0 012-2h6a2 2 0 012 2v4H7z" /></svg>,
    },
    {
      id: 3,
      title: t('services.fotografia.titulo'),
      description: t('services.fotografia.descripcion'),
      features: t('services.fotografia.features'),
      icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    },
    {
      id: 4,
      title: t('services.video.titulo'),
      description: t('services.video.descripcion'),
      features: t('services.video.features'),
      icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    }
  ]

  return (
    <motion.section
      id="services"
      className="min-h-screen py-16 md:py-20 bg-bg-base-light dark:bg-bg-base-dark text-text-primary-light dark:text-text-primary-dark relative"
      ref={elementRef}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Services Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-8"
          >
            <span className="px-4 py-2 bg-color-primary/10 dark:bg-color-primary/20 text-color-primary dark:text-white text-sm font-medium rounded-full border border-color-primary/20 dark:border-color-primary/30">
              {t('services.badge')}
            </span>
          </motion.div>

          <motion.h2 
            className="text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight font-display bg-gradient-to-r from-text-primary-light to-color-primary dark:from-text-primary-dark dark:to-color-accent bg-clip-text text-transparent"
            style={{lineHeight: '1.4', paddingBottom: '0.25rem', overflow: 'visible'}}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('services.titulo')}
          </motion.h2>
          
          <motion.p 
            className="text-center-hyphens text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {t('services.subtitulo')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative cursor-pointer p-6 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl border border-gray-200/30 dark:border-gray-800/30 shadow-2xl shadow-black/30 transition-all duration-300 ease-in-out"
              initial={{ opacity: 0, y: 60 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.15 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 35px 70px -12px rgba(103, 0, 248, 0.15), 0 15px 25px -5px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.2 }
              }}
            >
              <div className="relative flex flex-col items-center text-center h-full">
                <div className="flex-1 flex flex-col items-center">
                  <motion.div
                    className="w-24 h-24 mb-6 relative flex items-center justify-center bg-purple-600 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 mx-auto mt-3"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-white text-5xl flex items-center justify-center">
                      {service.icon}
                    </div>
                  </motion.div>

                  <h3 className="text-3xl font-black leading-tight text-gray-900 dark:text-white h-20 flex items-center justify-center mb-4 text-center">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-700 dark:text-gray-400 leading-snug mb-6 text-justify hyphens-auto break-words">
                    {service.description}
                  </p>

                  <div className="text-xs text-gray-600 dark:text-gray-500 flex-1 pb-3">
                    {Array.isArray(service.features) ? (
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center justify-center text-center">
                            <span className="w-1 h-1 bg-color-primary rounded-full mr-2 flex-shrink-0"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center">{service.features}</div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Services