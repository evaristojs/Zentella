// Animation Durations
export const DURATION = {
  fast: 0.2,
  normal: 0.3,
  medium: 0.5,
  slow: 0.6,
  verySlow: 0.8
} as const

// Animation Easings
export const EASING = {
  easeOut: 'easeOut',
  easeIn: 'easeIn',
  easeInOut: 'easeInOut',
  backOut: [0.34, 1.56, 0.64, 1],
  backIn: [0.36, 0, 0.66, -0.56],
  bounceOut: [0.68, -0.55, 0.265, 1.55]
} as const

// Animation Delays
export const DELAY = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.3,
  veryLong: 0.5
} as const

// Stagger Values
export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  medium: 0.15,
  slow: 0.2
} as const

// Scale Values
export const SCALE = {
  small: 0.8,
  medium: 0.9,
  normal: 1,
  large: 1.05,
  extraLarge: 1.1
} as const

// Translation Values
export const TRANSLATE = {
  small: 20,
  medium: 50,
  large: 100
} as const