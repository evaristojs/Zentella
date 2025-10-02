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
          // Vendors - separar React del resto
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],

          // Features - split por secciones de la app
          'home-section': [
            './src/components/Hero.tsx',
            './src/components/Services.tsx'
          ],
          'portfolio-section': [
            './src/components/Portfolio.tsx'
          ],
          'contact-section': [
            './src/components/About.tsx',
            './src/components/ContactFAQ.tsx',
            './src/components/Testimonials.tsx'
          ],

          // Contexts - agrupar solo los usados globalmente
          'app-contexts': [
            './src/contexts/ThemeContext.tsx',
            './src/contexts/LanguageContext.tsx'
          ],

          // Hooks - solo los relacionados con scroll
          'scroll-system': [
            './src/hooks/useUltraScrollDetection.ts',
            './src/hooks/useSectionScroll.ts',
            './src/hooks/useMagneticScroll.ts'
          ]
        }
      }
    },
    // Optimize bundle size
    chunkSizeWarningLimit: 600,
    minify: 'terser',
    sourcemap: false
  }
})