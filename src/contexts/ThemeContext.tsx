import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { devLog } from '../utils/logger'

interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
  theme: 'light' | 'dark'
  isInitialized: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const getCurrentTheme = (): boolean => {
  if (typeof window === 'undefined') return false
  
  // Check current DOM state instead of recalculating
  return document.documentElement.classList.contains('dark')
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize with current DOM state (already set in main.tsx)
  const [isDark, setIsDark] = useState<boolean>(() => getCurrentTheme())
  const isInitialized = true

  const applyTheme = useCallback((dark: boolean) => {
    if (typeof window === 'undefined' || !document.documentElement) return
    
    // Clear any existing classes first
    document.documentElement.classList.remove('dark', 'light')
    
    // Apply new theme
    if (dark) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.setAttribute('data-theme', 'light')
    }
    
    // Force repaint
    void document.documentElement.offsetHeight
  }, [])

  useEffect(() => {
    // Save theme preference to localStorage when it changes
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch (error) {
      devLog.warn('Failed to save theme preference', error, 'ThemeContext')
    }
  }, [isDark])

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newValue = !prev
      // Immediate DOM update to prevent visual delay
      applyTheme(newValue)
      return newValue
    })
  }, [applyTheme])

  const value: ThemeContextType = {
    isDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light',
    isInitialized
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}