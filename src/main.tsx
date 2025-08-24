import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize theme synchronously to prevent FOUC
const getInitialTheme = (): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    return false
  }
}

const applyInitialTheme = (isDark: boolean) => {
  // Clear any existing classes first
  document.documentElement.classList.remove('dark', 'light')
  
  // Apply initial theme
  if (isDark) {
    document.documentElement.classList.add('dark')
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.classList.add('light')
    document.documentElement.setAttribute('data-theme', 'light')
  }
}

// Apply theme before React mounts to prevent flash
const initialTheme = getInitialTheme()
applyInitialTheme(initialTheme)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)