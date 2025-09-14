import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],

          // Component chunks
          'portfolio': ['./src/components/Portfolio.tsx'],
          'hero': ['./src/components/Hero.tsx'],
          'about': ['./src/components/About.tsx'],

          // Hooks and utilities
          'hooks': [
            './src/hooks/useIntersectionObserver.ts',
            './src/hooks/useSectionScroll.ts',
            './src/hooks/useAdaptiveLogo.ts',
            './src/hooks/useMagneticScroll.ts',
            './src/hooks/useUltraScrollDetection.ts'
          ]
        }
      }
    },
    // Optimize bundle size
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    sourcemap: false
  }
})