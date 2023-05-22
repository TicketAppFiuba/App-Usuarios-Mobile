import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [backToken, setBackToken] = useState("");

  const login = () => {
    // Perform the login logic and set the isLoggedIn state to true upon success
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Perform the logout logic and set the isLoggedIn state to false
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, setBackToken, backToken }}>
      {children}
    </AuthContext.Provider>
  );
};
