/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Modern whites for light mode
        'bg-base-light': '#FDFEFF', // Modern off-white with slight cool tint
        'bg-secondary-light': '#F8FAFC', // Subtle gray-white for cards
        
        // Text colors
        'text-primary-light': '#1E1E2E', // Dark purple-gray
        'text-secondary-light': '#64748B', // Balanced gray
        
        // Purple brand palette
        'color-primary': '#6700f8', // Primary purple
        'color-primary-hover': '#5500d6', // Darker hover state
        'color-secondary': '#8001cf', // Secondary purple
        'color-accent': '#ac00d3', // Accent purple
        'color-neutral': '#a304e2', // Neutral purple
        'color-base': '#4801e1', // Base purple
        'color-undefined': '#0013e7', // Deep blue-purple
        
        // Supporting colors
        'color-success': '#10B981', // Keep green
        'color-warning': '#F59E0B', // Keep amber
        'color-error': '#EF4444', // Keep red

        // Dark theme from Linear
        'bg-primary-dark': '#08090a',
        'text-primary-dark': '#f7f8f8',
        'text-secondary-dark': '#d0d6e0',
        'border-translucent-dark': 'hsla(0,0%,100%,.05)',
        'header-bg-dark': 'hsla(0,0%,4%,.8)',
        'bg-base-dark': '#0a0a0a',
        'bg-secondary-dark': '#1a1a1a',
      },
      spacing: {
        'mobile': '1rem',
        'tablet': '1.5rem',
        'desktop': '2rem',
      },
    },
  },
  plugins: [],
}