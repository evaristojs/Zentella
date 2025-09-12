
import { createContext, useContext, useState, useMemo } from 'react';

interface NavbarHeightContextType {
  navbarHeight: number;
  setNavbarHeight: (height: number) => void;
}

const NavbarHeightContext = createContext<NavbarHeightContextType | undefined>(undefined);

export const NavbarHeightProvider = ({ children }: { children: React.ReactNode }) => {
  const [navbarHeight, setNavbarHeight] = useState(80); // Default height

  const value = useMemo(() => ({ navbarHeight, setNavbarHeight }), [navbarHeight]);

  return (
    <NavbarHeightContext.Provider value={value}>
      {children}
    </NavbarHeightContext.Provider>
  );
};

export const useNavbarHeight = () => {
  const context = useContext(NavbarHeightContext);
  if (!context) {
    throw new Error('useNavbarHeight must be used within a NavbarHeightProvider');
  }
  return context;
};
