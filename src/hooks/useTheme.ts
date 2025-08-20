import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState<'zentellaLight' | 'zentellaDark'>('zentellaLight')

  useEffect(() => {
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem('zentella-theme') as 'zentellaLight' | 'zentellaDark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialTheme = savedTheme || (prefersDark ? 'zentellaDark' : 'zentellaLight')
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'zentellaLight' ? 'zentellaDark' : 'zentellaLight'
    setTheme(newTheme)
    localStorage.setItem('zentella-theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return { theme, toggleTheme, isDark: theme === 'zentellaDark' }
}