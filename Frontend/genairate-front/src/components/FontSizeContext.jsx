import { createContext, useContext, useEffect, useState } from 'react';

const FontSizeContext = createContext();

const FONT_SIZES = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
};

export function FontSizeProvider({ children }) {
  const [size, setSize] = useState('medium');

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('fontSize');
    if (stored && FONT_SIZES[stored]) setSize(stored);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('fontSize', size);
  }, [size]);

  const value = {
    size,
    setSize,
    getFontSizeClass: () => FONT_SIZES[size] || FONT_SIZES.medium,
  };

  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  return useContext(FontSizeContext);
}
