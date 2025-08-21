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
      },
      colors: {
        'bg-base-light': '#F9FAFB',
        'bg-base-dark': '#111827',
        'text-primary-light': '#1F2937',
        'text-primary-dark': '#F3F4F6',
        'text-secondary-light': '#6B7280',
        'text-secondary-dark': '#9CA3AF',
        'color-primary': '#3B82F6',
        'color-primary-hover': '#2563EB',
        'color-success': '#10B981',
        'color-warning': '#F59E0B',
        'color-error': '#EF4444',
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