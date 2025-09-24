import React from 'react'
import ReactDOM from 'react-dom/client'
// Removed unused ThemeProvider import - handled in App.tsx
import App from './App.tsx'
import './index.css'

// Aplicar tema inicial antes de renderizar para evitar parpadeos
const getInitialTheme = (): 'light' | 'dark' => {
  // 1. Verificar localStorage
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  // 2. Si no hay preferencia guardada, usar preferencia del sistema
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  // 3. Por defecto: light
  return 'light'
}

const applyInitialTheme = (theme: 'light' | 'dark') => {
  // Aplicar al documentElement inmediatamente para evitar parpadeos
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  // Opcional: guardar en localStorage
  localStorage.setItem('theme', theme)

  // Establecer atributo data-theme para CSS
  document.documentElement.setAttribute('data-theme', theme)
}

const initialTheme = getInitialTheme()
applyInitialTheme(initialTheme)


const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)