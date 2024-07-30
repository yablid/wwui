// lib/context/MenuContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface Page {
  label: string;
  path: string;
}

interface MenuContextType {
  pages: Page[];
  setPages: (pages: Page[]) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [pages, setPages] = useState<Page[]>([
    { label: 'Home', path: '/home' },
  ]);

  return (
    <MenuContext.Provider value={{ pages, setPages }}>
      {children}
    </MenuContext.Provider>
  );
};

const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export { MenuProvider, useMenu }