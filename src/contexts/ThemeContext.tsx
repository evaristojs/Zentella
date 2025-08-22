import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
  theme: 'light' | 'dark'
  isInitialized: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

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

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

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
    const initialTheme = getInitialTheme()
    setIsDark(initialTheme)
    applyTheme(initialTheme)
    setIsInitialized(true)
  }, [applyTheme])

  useEffect(() => {
    if (!isInitialized) return
    
    applyTheme(isDark)
    
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {
      console.warn('Failed to save theme preference')
    }
  }, [isDark, isInitialized, applyTheme])

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