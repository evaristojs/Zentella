import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

interface ComponentLoaderProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

const ComponentLoader = ({ text, size = 'md', fullScreen = false }: ComponentLoaderProps) => {
  const { t } = useLanguage()

  const getSize = () => {
    switch(size) {
      case 'sm': return 'w-6 h-6'
      case 'lg': return 'w-12 h-12'
      default: return 'w-8 h-8'
    }
  }

  const spinnerSize = getSize()

  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : 'min-h-[200px]'}`}>
      <div className="animate-pulse flex flex-col items-center">
        <motion.div
          className={`${spinnerSize} bg-color-primary rounded-full mb-4`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          {text || t('loading.cargando') || 'Loading...'}
        </p>
      </div>
    </div>
  )
}

export default ComponentLoader