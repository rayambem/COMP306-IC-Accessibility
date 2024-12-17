import React, { createContext, useState, useContext } from 'react';

// Create the Context
const FontSize = createContext();

// Context Provider
export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState('Normal'); // Default font size is Normal
  const [mapType, setMapType] = useState('standard');
  

  const toggleFontSize = () => {
    setFontSize((prev) => (prev === 'Normal' ? 'Large' : 'Normal'));
  };

  const toggleMapType = () => {
    setMapType((prev) => (prev === 'standard' ? 'satellite' : 'standard'));
  };

  return (
    <FontSize.Provider value={{ fontSize, toggleFontSize, mapType, toggleMapType }}>
      {children}
    </FontSize.Provider>
  );
};


export const useFontSize = () => useContext(FontSize);
