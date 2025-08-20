import { useState, useEffect } from 'react'

interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

const Navigation = ({ isMenuOpen, setIsMenuOpen }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

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
      {/* Main Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect border-b border-white/10' 
          : 'bg-transparent'
      }`}>
        <div className="container-custom">
          <div className="navbar p-4">
            {/* Logo */}
            <div className="flex-1">
              <div className="hover-glow">
                <img 
                  src="/Zentella Logo Web/isotipo-colorzentella2025.svg" 
                  alt="Zentella" 
                  className="h-10 w-auto"
                />
              </div>
            </div>
            
            {/* Menu Toggle */}
            <div className="flex-none">
              <button 
                className="btn btn-ghost btn-circle glass-effect hover-glow"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-1">
                  <div className={`w-5 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}></div>
                  <div className={`w-5 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}></div>
                  <div className={`w-5 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
        isMenuOpen 
          ? 'opacity-100 visible' 
          : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-base-100/95 backdrop-blur-2xl">
          <div className="container-custom h-full flex flex-col justify-between py-8">
            
            {/* Menu Header */}
            <div className="flex justify-between items-center">
              <div className="hover-glow">
                <img 
                  src="/Zentella Logo Web/positivozentella2025.svg" 
                  alt="Zentella" 
                  className="h-10 w-auto"
                />
              </div>
              
              <button 
                className="btn btn-ghost btn-circle glass-effect hover-glow"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Navigation */}
            <nav className="flex-1 flex items-center justify-center">
              <ul className="space-y-8 text-center">
                {menuItems.map((item, index) => (
                  <li 
                    key={item.name}
                    className={`animate-fade-in delay-${(index + 1) * 100}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <a 
                      href={item.href} 
                      onClick={closeMenu}
                      className="text-hero gradient-text hover:scale-105 transition-all duration-300 block relative group"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Menu Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8">
              <div className="badge badge-ghost glass-effect font-mono text-xs">
                20°58'17.4"N 89°37'18.6"W
              </div>
              
              <div className="flex gap-4">
                {['Instagram', 'Behance', 'LinkedIn'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="btn btn-ghost btn-sm glass-effect hover-glow text-xs"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation