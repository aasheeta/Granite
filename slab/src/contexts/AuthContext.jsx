import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));

  useEffect(() => {
    if (token && username) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    }
  }, [token, username]);

  const login = ({ token, username }) => {
    setToken(token);
    setUsername(username);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
