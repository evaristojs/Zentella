
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from './hooks/useNavigationState';

interface MobileMenuProps {
  isMenuOpen: boolean;
  menuItems: MenuItem[];
  toggleMenu: () => void;
  closeMenu: () => void;
  activeSection: string;
}

const MobileMenu = ({ isMenuOpen, menuItems, toggleMenu, closeMenu, activeSection }: MobileMenuProps) => {

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  const navVariants = {
    hidden: { y: '-10%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
      },
    },
    exit: {
      y: '-10%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.64, 0, 0.78, 0],
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="reset_reset-button__5vBZ4 Header_mobileMenuTrigger__ignIg"
        aria-expanded={isMenuOpen}
      >
        <span className="sr-only">Open main menu</span>
        <div className={`w-6 h-6 relative transform transition-transform duration-500 ease-in-out`}>
            <span className={`block absolute h-0.5 w-full bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
            <span className={`block absolute h-0.5 w-full bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block absolute h-0.5 w-full bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
        </div>
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-header-bg-dark/95 dark:bg-header-bg-dark/95 backdrop-blur-lg z-40"
          >
            <motion.nav
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center justify-center h-full space-y-4"
            >
              {menuItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`text-3xl font-medium transition-colors duration-300 ${
                    activeSection === item.href.substring(1)
                      ? 'text-text-primary-dark'
                      : 'text-text-secondary-dark hover:text-text-primary-dark'
                  }`}
                  variants={linkVariants}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
