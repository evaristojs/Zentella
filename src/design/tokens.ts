/**
 * Design System Tokens for Zentella Website
 * Modern design system with consistent spacing, colors, and typography
 */

// Spacing System (4px base grid)
export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  '3xl': '3rem',    // 48px
  '4xl': '4rem',    // 64px
  '5xl': '6rem',    // 96px
} as const

// Typography Scale
export const typography = {
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  }
} as const

// Brand Colors (Zentella Purple Palette)
export const colors = {
  primary: {
    50: '#f3e8ff',
    100: '#e9d5ff', 
    200: '#d8b4fe',
    300: '#c084fc',
    400: '#a855f7',
    500: '#8b5cf6', // Main brand color
    600: '#7c3aed',
    700: '#6d28d9', // Secondary brand
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
  accent: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe', 
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef', // Accent color
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  }
} as const

// Touch Targets & Interactive Elements
export const interactive = {
  minTouchTarget: '44px', // WCAG AA minimum
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
  },
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  }
} as const

// Animation & Transitions
export const motion = {
  duration: {
    instant: '0s',
    fast: '0.15s',
    normal: '0.2s',
    slow: '0.3s',
    slower: '0.5s',
  },
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  }
} as const

// Z-Index Scale
export const zIndex = {
  behind: '-1',
  base: '0',
  dropdown: '10',
  sticky: '20',
  fixed: '30',
  modalBackdrop: '40',
  modal: '50',
  popover: '60',
  tooltip: '70',
  toast: '80',
  skipLink: '90',
} as const

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const