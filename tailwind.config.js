/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        zentella: {
          "primary": "#8502bb",
          "primary-content": "#ffffff",
          "secondary": "#ff007f", 
          "secondary-content": "#ffffff",
          "accent": "#00f5ff",
          "accent-content": "#000000",
          "neutral": "#1a1a1a",
          "neutral-content": "#ffffff",
          "base-100": "#0a0a0a",
          "base-200": "#1a1a1a",
          "base-300": "#2a2a2a",
          "base-content": "#ffffff",
          "info": "#00f5ff",
          "success": "#00ff88",
          "warning": "#ffaa00",
          "error": "#ff4444",
        },
      },
      "dark",
      "light",
    ],
    darkTheme: "zentella",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
}