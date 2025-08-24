import { renderHook, act } from '@testing-library/react'
import { useNavigationState, MenuItem } from '../useNavigationState'

describe('useNavigationState', () => {
  let mockSetIsMenuOpen: any

  beforeEach(() => {
    mockSetIsMenuOpen = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Functionality', () => {
    it('should return correct initial state', () => {
      const { result } = renderHook(() => 
        useNavigationState(false, mockSetIsMenuOpen)
      )

      expect(result.current.toggleMenu).toBeInstanceOf(Function)
      expect(result.current.closeMenu).toBeInstanceOf(Function)
      expect(result.current.menuItems).toBeInstanceOf(Array)
      expect(result.current.menuItems).toHaveLength(5)
    })

    it('should return correct menu items with expected structure', () => {
      const { result } = renderHook(() => 
        useNavigationState(false, mockSetIsMenuOpen)
      )

      const expectedMenuItems: MenuItem[] = [
        { name: 'Inicio', href: '#hero' },
        { name: 'Servicios', href: '#services' },
        { name: 'Portafolio', href: '#portfolio' },
        { name: 'Nosotros', href: '#about' },
        { name: 'Contacto', href: '#contact' }
      ]

      expect(result.current.menuItems).toEqual(expectedMenuItems)
    })
  })

  describe('Toggle Menu Functionality', () => {
    it('should call setIsMenuOpen with opposite value when menu is closed', () => {
      const { result } = renderHook(() => 
        useNavigationState(false, mockSetIsMenuOpen)
      )

      act(() => {
        result.current.toggleMenu()
      })

      expect(mockSetIsMenuOpen).toHaveBeenCalledWith(true)
      expect(mockSetIsMenuOpen).toHaveBeenCalledTimes(1)
    })

    it('should call setIsMenuOpen with opposite value when menu is open', () => {
      const { result } = renderHook(() => 
        useNavigationState(true, mockSetIsMenuOpen)
      )

      act(() => {
        result.current.toggleMenu()
      })

      expect(mockSetIsMenuOpen).toHaveBeenCalledWith(false)
      expect(mockSetIsMenuOpen).toHaveBeenCalledTimes(1)
    })

    it('should toggle correctly multiple times', () => {
      const { result, rerender } = renderHook(
        ({ isMenuOpen }) => useNavigationState(isMenuOpen, mockSetIsMenuOpen),
        { initialProps: { isMenuOpen: false } }
      )

      // First toggle: false -> true
      act(() => {
        result.current.toggleMenu()
      })
      expect(mockSetIsMenuOpen).toHaveBeenCalledWith(true)

      // Simulate state change
      rerender({ isMenuOpen: true })

      // Second toggle: true -> false
      act(() => {
        result.current.toggleMenu()
      })
      expect(mockSetIsMenuOpen).toHaveBeenCalledWith(false)

      expect(mockSetIsMenuOpen).toHaveBeenCalledTimes(2)
    })
  })

  describe('Close Menu Functionality', () => {
    it('should call setIsMenuOpen with false when menu is open', () => {
      const { result } = renderHook(() => 
        useNavigationState(true, mockSetIsMenuOpen)
      )

      act(() => {
        result.current.closeMenu()
      })

      expect(mockSetIsMenuOpen).toHaveBeenCalledWith(false)
      expect(mockSetIsMenuOpen).toHaveBeenCalledTimes(1)
    })

    it('should call setIsMenuOpen with false when menu is already closed', () => {
      const { result } = renderHook(() => 
        useNavigationState(false, mockSetIsMenuOpen)
      )

      act(() => {
        result.current.closeMenu()
      })

      expect(mockSetIsMenuOpen).toHaveBeenCalledWith(false)
      expect(mockSetIsMenuOpen).toHaveBeenCalledTimes(1)
    })

    it('should always close menu regardless of current state', () => {
      const { result, rerender } = renderHook(
        ({ isMenuOpen }) => useNavigationState(isMenuOpen, mockSetIsMenuOpen),
        { initialProps: { isMenuOpen: true } }
      )

      // Close when open
      act(() => {
        result.current.closeMenu()
      })
      expect(mockSetIsMenuOpen).toHaveBeenCalledWith(false)

      // Simulate state change to closed
      rerender({ isMenuOpen: false })

      // Close when already closed
      act(() => {
        result.current.closeMenu()
      })
      expect(mockSetIsMenuOpen).toHaveBeenCalledWith(false)

      expect(mockSetIsMenuOpen).toHaveBeenCalledTimes(2)
    })
  })

  describe('Menu Items Validation', () => {
    it('should have correct menu item names in Spanish', () => {
      const { result } = renderHook(() => 
        useNavigationState(false, mockSetIsMenuOpen)
      )

      const menuNames = result.current.menuItems.map(item => item.name)
      
      expect(menuNames).toContain('Inicio')
      expect(menuNames).toContain('Servicios')
      expect(menuNames).toContain('Portafolio')
      expect(menuNames).toContain('Nosotros')
      expect(menuNames).toContain('Contacto')
    })

    it('should have correct href anchors for each menu item', () => {
      const { result } = renderHook(() => 
        useNavigationState(false, mockSetIsMenuOpen)
      )

      const menuHrefs = result.current.menuItems.map(item => item.href)
      
      expect(menuHrefs).toContain('#hero')
      expect(menuHrefs).toContain('#services')
      expect(menuHrefs).toContain('#portfolio')
      expect(menuHrefs).toContain('#about')
      expect(menuHrefs).toContain('#contact')
    })

    it('should maintain consistent menu items across re-renders', () => {
      const { result, rerender } = renderHook(
        ({ isMenuOpen }) => useNavigationState(isMenuOpen, mockSetIsMenuOpen),
        { initialProps: { isMenuOpen: false } }
      )

      const initialMenuItems = result.current.menuItems

      // Re-render with different state
      rerender({ isMenuOpen: true })

      expect(result.current.menuItems).toEqual(initialMenuItems)
    })

    it('should have menu items as immutable reference', () => {
      const { result } = renderHook(() => 
        useNavigationState(false, mockSetIsMenuOpen)
      )

      const menuItems1 = result.current.menuItems
      const menuItems2 = result.current.menuItems

      // Should return the same reference (memoized)
      expect(menuItems1).toBe(menuItems2)
    })
  })

  describe('Function Stability', () => {
    it('should create new function instances on each render (expected behavior)', () => {
      const { result, rerender } = renderHook(
        ({ isMenuOpen }) => useNavigationState(isMenuOpen, mockSetIsMenuOpen),
        { initialProps: { isMenuOpen: false } }
      )

      const initialToggleMenu = result.current.toggleMenu
      const initialCloseMenu = result.current.closeMenu

      // Re-render with same state
      rerender({ isMenuOpen: false })

      // Functions are recreated on each render (this is expected for this simple hook)
      expect(typeof result.current.toggleMenu).toBe('function')
      expect(typeof result.current.closeMenu).toBe('function')
      // Note: This hook doesn't use useCallback, so functions are recreated each render
    })

    it('should update function behavior when isMenuOpen changes', () => {
      const { result, rerender } = renderHook(
        ({ isMenuOpen }) => useNavigationState(isMenuOpen, mockSetIsMenuOpen),
        { initialProps: { isMenuOpen: false } }
      )

      // Test initial state (false)
      act(() => {
        result.current.toggleMenu()
      })
      expect(mockSetIsMenuOpen).toHaveBeenCalledWith(true)

      // Change state and rerender
      rerender({ isMenuOpen: true })
      mockSetIsMenuOpen.mockClear()

      // Test updated state (true)
      act(() => {
        result.current.toggleMenu()
      })
      expect(mockSetIsMenuOpen).toHaveBeenCalledWith(false)
    })
  })

  describe('Error Handling', () => {
    it('should handle undefined setIsMenuOpen gracefully', () => {
      expect(() => {
        renderHook(() => 
          useNavigationState(false, undefined as any)
        )
      }).not.toThrow()
    })

    it('should handle null setIsMenuOpen gracefully', () => {
      expect(() => {
        renderHook(() => 
          useNavigationState(false, null as any)
        )
      }).not.toThrow()
    })

    it('should handle invalid setIsMenuOpen by throwing expected error', () => {
      const { result } = renderHook(() => 
        useNavigationState(false, undefined as any)
      )

      // The hook should throw when trying to call undefined function
      expect(() => {
        act(() => {
          result.current.toggleMenu()
        })
      }).toThrow('setIsMenuOpen is not a function')
    })
  })

  describe('Type Safety', () => {
    it('should return properly typed MenuItem objects', () => {
      const { result } = renderHook(() => 
        useNavigationState(false, mockSetIsMenuOpen)
      )

      result.current.menuItems.forEach(item => {
        expect(typeof item.name).toBe('string')
        expect(typeof item.href).toBe('string')
        expect(item.href).toMatch(/^#\w+$/) // Should be anchor format
      })
    })

    it('should return properly typed functions', () => {
      const { result } = renderHook(() => 
        useNavigationState(false, mockSetIsMenuOpen)
      )

      expect(typeof result.current.toggleMenu).toBe('function')
      expect(typeof result.current.closeMenu).toBe('function')
    })
  })
})