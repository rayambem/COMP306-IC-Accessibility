import React, { createContext, useContext, useState } from 'react';

const RoutesContext = createContext();

export const RoutesProvider = ({ children }) => {
    // State to store the saved routes
    const [savedRoutes, setSavedRoutes] = useState([]);

    const addRoute = (route) => {
        setSavedRoutes((prevRoutes) => [...prevRoutes, route]);
    };

    const removeRoute = (routeId) => {
        setSavedRoutes((prevRoutes) => 
        prevRoutes.filter(route => route.id !== routeId)
        );
    };

    return (
        <RoutesContext.Provider value={{ savedRoutes, addRoute, removeRoute }}>
        {children}
        </RoutesContext.Provider>
    );
};

export const useRoutes = () => useContext(RoutesContext);