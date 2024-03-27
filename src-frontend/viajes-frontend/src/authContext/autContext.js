import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);

  const login = (userData) => {
    setActiveUser(userData);
  };

  const logout = () => {
    setActiveUser(null);
  };

  return (
    <AuthContext.Provider value={{ activeUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
