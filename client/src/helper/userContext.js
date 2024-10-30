import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getUserFromCookies = () => {
      const userData = Cookies.get('user');
      const tokenData = Cookies.get('token');

      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (e) {
          console.error('Failed to parse user data:', e);
        }
      }

      if (tokenData) {
        setToken(tokenData); // No parsing needed for token
      }
    };

    getUserFromCookies();
  }, []); 

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
