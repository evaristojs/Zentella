import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'

interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

const Navigation = ({ isMenuOpen, setIsMenuOpen }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { toggleTheme, isDark } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const menuItems = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Servicios', href: '#services' },
    { name: 'Portafolio', href: '#portfolio' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Contacto', href: '#contact' }
  ]

  return (
    <>
      {/* Clean Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-base-100/80 backdrop-blur-lg border-b border-base-300' 
          : 'bg-transparent'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/Zentella Logo Web/isotipo-colorzentella2025.svg" 
                alt="Zentella" 
                className="h-8 w-auto hover-lift"
              />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-base-content/80 hover:text-primary transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                className="btn btn-ghost btn-sm btn-circle md:hidden"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-1">
                  <div className={`w-4 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}></div>
                  <div className={`w-4 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}></div>
                  <div className={`w-4 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}></div>
                </div>
              </button>

              {/* CTA Button */}
              <button className="btn btn-primary btn-sm hidden lg:flex">
                Trabajemos juntos
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isMenuOpen 
          ? 'opacity-100 visible' 
          : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-base-100">
          <div className="container-custom h-full flex flex-col">
            
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between h-16 border-b border-base-300">
              <img 
                src="/Zentella Logo Web/isotipo-colorzentella2025.svg" 
                alt="Zentella" 
                className="h-8 w-auto"
              />
              <button 
                className="btn btn-ghost btn-sm btn-circle"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <nav className="flex-1 py-8">
              <ul className="space-y-6">
                {menuItems.map((item, index) => (
                  <li key={item.name}>
                    <a 
                      href={item.href} 
                      onClick={closeMenu}
                      className="block text-xl font-medium text-base-content hover:text-primary transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="py-6 border-t border-base-300">
              <button className="btn btn-primary w-full">
                Trabajemos juntos
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation