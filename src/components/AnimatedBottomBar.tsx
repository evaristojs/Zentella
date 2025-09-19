import { motion } from 'framer-motion'
import { useFooterReveal } from '../hooks/useFooterReveal'

const AnimatedBottomBar = () => {
  const services = ['Fotografía', 'Diseño', 'Video', 'Animación', 'Marketing', 'Branding']
  const isFooterRevealed = useFooterReveal(300)

  return (
    <motion.div 
      className="fixed bottom-0 left-0 w-full z-0 overflow-hidden bg-gradient-to-r from-color-primary via-color-secondary to-color-primary dark:from-color-secondary dark:via-color-primary dark:to-color-secondary" 
      style={{ height: '200px' }}
      animate={{
        opacity: isFooterRevealed ? 1 : 0.7,
        scale: isFooterRevealed ? 1.02 : 1,
      }}
      transition={{
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <motion.div
        className="relative h-full flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex items-center gap-12 sm:gap-16 lg:gap-20 xl:gap-24 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear",
            },
          }}
          style={{
            willChange: 'transform'
          }}
        >
          {/* Repetir servicios para efecto infinito */}
          {[...Array(16)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-12 sm:gap-16 lg:gap-20 xl:gap-24">
              {services.map((service, index) => (
                <motion.span
                  key={`${groupIndex}-${service}-${index}`}
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white dark:text-white transition-opacity duration-500 ${
                    isFooterRevealed ? 'opacity-40' : 'opacity-20'
                  }`}
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    letterSpacing: '-0.03em',
                    textRendering: 'optimizeSpeed',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    lineHeight: '0.9',
                  }}
                  whileHover={{
                    opacity: 0.4,
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  {service}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>
        
        {/* Gradiente decorativo animado */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
          animate={{
            opacity: isFooterRevealed ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Líneas decorativas animadas */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            opacity: isFooterRevealed ? 1 : 0.5,
          }}
          transition={{ duration: 0.8 }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            opacity: isFooterRevealed ? 1 : 0.5,
          }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Partículas flotantes cuando se revela */}
        {isFooterRevealed && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default AnimatedBottomBar