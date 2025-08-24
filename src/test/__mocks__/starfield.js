/**
 * Mock implementation of starfield.js for testing
 * This mock provides the same API but without actual canvas operations
 */

const mockStarfield = {
  setup: vi.fn((config) => {
    console.log('Mock Starfield setup called with config:', config)
    return Promise.resolve()
  }),
  
  setAccelerate: vi.fn((state) => {
    console.log('Mock Starfield setAccelerate:', state)
  }),
  
  setOrigin: vi.fn((x, y) => {
    console.log('Mock Starfield setOrigin:', { x, y })
  }),
  
  setOriginX: vi.fn((x) => {
    console.log('Mock Starfield setOriginX:', x)
  }),
  
  setOriginY: vi.fn((y) => {
    console.log('Mock Starfield setOriginY:', y)
  }),
  
  resize: vi.fn((width, height) => {
    console.log('Mock Starfield resize:', { width, height })
  }),
  
  cleanup: vi.fn(() => {
    console.log('Mock Starfield cleanup called')
  }),
  
  config: {
    numStars: 250,
    baseSpeed: 1,
    trailLength: 0.8,
    starColor: 'rgb(255, 255, 255)',
    canvasColor: 'rgb(0, 0, 0)',
    hueJitter: 0,
    maxAcceleration: 10,
    accelerationRate: 0.2,
    decelerationRate: 0.2,
    minSpawnRadius: 80,
    maxSpawnRadius: 500,
    auto: true,
    originX: null,
    originY: null,
    container: null,
    originElement: null,
  },
  
  // Mock internal state for testing
  _mockState: {
    isSetup: false,
    isAccelerating: false,
    originX: 0,
    originY: 0,
    container: null,
    canvas: null,
  },
  
  // Test helpers
  _mockReset: () => {
    mockStarfield.setup.mockClear()
    mockStarfield.setAccelerate.mockClear()
    mockStarfield.setOrigin.mockClear()
    mockStarfield.setOriginX.mockClear()
    mockStarfield.setOriginY.mockClear()
    mockStarfield.resize.mockClear()
    mockStarfield.cleanup.mockClear()
    
    mockStarfield._mockState = {
      isSetup: false,
      isAccelerating: false,
      originX: 0,
      originY: 0,
      container: null,
      canvas: null,
    }
  },
  
  _mockSetupSuccess: () => {
    mockStarfield._mockState.isSetup = true
    return Promise.resolve()
  },
  
  _mockSetupError: (error) => {
    mockStarfield._mockState.isSetup = false
    return Promise.reject(error || new Error('Mock setup error'))
  },
}

// Global mock for window.Starfield
global.Starfield = mockStarfield

module.exports = mockStarfield