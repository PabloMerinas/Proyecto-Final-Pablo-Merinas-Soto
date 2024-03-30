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

  const updateUser = (userData) => {
    setActiveUser(userData);
  };

  return (
    <AuthContext.Provider value={{ activeUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
