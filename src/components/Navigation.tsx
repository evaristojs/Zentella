import { useState, useEffect } from 'react'
import './Navigation.css'

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
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/Zentella Logo Web/isotipo-colorzentella2025.svg" alt="Zentella" />
          </div>
          
          <div className="nav-menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}>
        <div className="menu-content">
          <div className="menu-header">
            <div className="menu-logo">
              <img src="/Zentella Logo Web/positivozentella2025.svg" alt="Zentella" />
            </div>
            <button className="menu-close" onClick={closeMenu}>
              <span></span>
              <span></span>
            </button>
          </div>
          
          <nav className="menu-navigation">
            <ul>
              {menuItems.map((item, index) => (
                <li key={item.name} style={{ animationDelay: `${index * 0.1}s` }}>
                  <a href={item.href} onClick={closeMenu}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu-footer">
            <p>48°51'10.9"N 2°23'25.2"E</p>
            <div className="menu-social">
              <a href="#">Instagram</a>
              <a href="#">Behance</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation