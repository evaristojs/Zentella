/**
 * Test fixtures and mock data for components and hooks
 */

export const mockScrollPositions = {
  top: 0,
  heroSection: 100,
  servicesSection: 800,
  portfolioSection: 1600,
  aboutSection: 2400,
  contactSection: 3200,
}

export const mockViewportSizes = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
}

export const mockSectionElements = {
  hero: {
    id: 'hero',
    offsetTop: 0,
    clientHeight: 800,
  },
  services: {
    id: 'services',
    offsetTop: 800,
    clientHeight: 600,
  },
  portfolio: {
    id: 'portfolio',
    offsetTop: 1400,
    clientHeight: 800,
  },
  about: {
    id: 'about',
    offsetTop: 2200,
    clientHeight: 600,
  },
  contact: {
    id: 'contact',
    offsetTop: 2800,
    clientHeight: 400,
  },
}

export const mockNavigationState = {
  initial: {
    isScrolled: false,
    isInHero: true,
    currentSection: 'hero',
  },
  scrolled: {
    isScrolled: true,
    isInHero: false,
    currentSection: 'services',
  },
}

export const mockThemeContextValue = {
  isDark: false,
  toggleDark: vi.fn(),
}

export const mockErrorBoundaryProps = {
  error: new Error('Test error'),
  errorInfo: {
    componentStack: 'TestComponent -> ErrorBoundary',
  },
}

export const mockPerformanceMetrics = {
  scrollPerformance: {
    targetFPS: 60,
    targetFrameTime: 16.67, // ms
    maxFrameTime: 33.33, // 30fps minimum
  },
  renderPerformance: {
    maxRenderTime: 100, // ms
    maxReRenders: 3,
  },
}