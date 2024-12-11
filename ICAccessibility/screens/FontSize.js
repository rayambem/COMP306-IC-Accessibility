import React, { createContext, useState, useContext } from 'react';

// Create the Context
const FontSize = createContext();

// Context Provider
export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState('Normal'); // Default font size is Normal

  const toggleFontSize = () => {
    setFontSize((prev) => (prev === 'Normal' ? 'Large' : 'Normal'));
  };

  return (
    <FontSize.Provider value={{ fontSize, toggleFontSize }}>
      {children}
    </FontSize.Provider>
  );
};

// Custom Hook to use FontSizeContext
export const useFontSize = () => useContext(FontSize);
