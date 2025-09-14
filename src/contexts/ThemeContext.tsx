import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react'


interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
  theme: 'light' | 'dark'
  isInitialized: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const getCurrentTheme = (): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    // Always prioritize DOM state as source of truth since main.tsx sets it correctly
    const domHasDark = document.documentElement.classList.contains('dark')
    
    // Verify it matches localStorage, if not sync them
    const savedTheme = localStorage.getItem('theme')
    const savedIsDark = savedTheme === 'dark'
    
    // If DOM and localStorage are mismatched, DOM wins (main.tsx set it correctly)
    if (savedTheme && domHasDark !== savedIsDark) {
      localStorage.setItem('theme', domHasDark ? 'dark' : 'light')
    }
    
    return domHasDark
  } catch {
    return false
  }
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize with current theme from localStorage/DOM
  const [isDark, setIsDark] = useState<boolean>(() => getCurrentTheme())
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

  // Ensure DOM is in sync with state on initialization
  useEffect(() => {
    applyTheme(isDark)
    setIsInitialized(true)
  }, [applyTheme]) // Only run once on mount

  useEffect(() => {
    // Save theme preference to localStorage when it changes
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newValue = !prev
      // Immediate DOM update to prevent visual delay
      applyTheme(newValue)
      return newValue
    })
  }, [applyTheme])

  const value: ThemeContextType = useMemo(() => ({
    isDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light',
    isInitialized
  }), [isDark, toggleTheme, isInitialized])

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