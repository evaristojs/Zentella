import React from 'react'
import { motion } from 'framer-motion'

interface PortfolioSkeletonProps {
  count?: number
  className?: string
}

export const PortfolioSkeleton: React.FC<PortfolioSkeletonProps> = ({
  count = 6,
  className = ''
}) => {
  const skeletonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  }

  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: {
      x: '100%',
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  }

  const pulseVariants = {
    initial: { opacity: 0.6 },
    animate: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}
      variants={skeletonVariants}
      initial="initial"
      animate="animate"
      role="status"
      aria-label="Cargando portfolio..."
    >
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={`skeleton-${index}`}
          className="relative bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden"
          style={{ height: '280px' }}
          variants={skeletonVariants}
        >
          {/* Main skeleton container */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
            variants={pulseVariants}
          />

          {/* Shimmer effect */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent"
              variants={shimmerVariants}
            />
          </div>

          {/* Skeleton content overlay */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            {/* Top elements */}
            <div className="flex justify-between items-start">
              {/* Category badge */}
              <motion.div
                className="bg-gray-300 dark:bg-gray-600 rounded-full h-6 w-16"
                variants={pulseVariants}
              />

              {/* Video indicator placeholder */}
              <motion.div
                className="bg-gray-300 dark:bg-gray-600 rounded-full h-8 w-8"
                variants={pulseVariants}
              />
            </div>

            {/* Bottom content */}
            <div className="space-y-3">
              {/* Title */}
              <motion.div
                className="bg-gray-300 dark:bg-gray-600 rounded h-5 w-3/4"
                variants={pulseVariants}
              />

              {/* Client */}
              <motion.div
                className="bg-gray-300 dark:bg-gray-600 rounded h-4 w-1/2"
                variants={pulseVariants}
              />

              {/* CTA Button */}
              <motion.div
                className="bg-gray-300 dark:bg-gray-600 rounded-full h-9 w-32 mx-auto"
                variants={pulseVariants}
              />
            </div>
          </div>

          {/* Focus indicator for accessibility */}
          <motion.div
            className="absolute inset-0 ring-2 ring-color-primary/20 rounded-3xl opacity-0"
            whileFocus={{ opacity: 1 }}
          />
        </motion.div>
      ))}

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Cargando proyectos del portfolio, por favor espera...
      </div>
    </motion.div>
  )
}

// Loading states for different sections
export const HeroSkeleton: React.FC = () => (
  <motion.div
    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-color-primary/5 to-color-secondary/5"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <div className="text-center space-y-8">
      <motion.div
        className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-72 mx-auto"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
      />
      <div className="flex gap-4 justify-center">
        <motion.div
          className="h-12 bg-color-primary/20 rounded-full w-32"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        />
        <motion.div
          className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full w-32"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        />
      </div>
    </div>
  </motion.div>
)

export default PortfolioSkeleton