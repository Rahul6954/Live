/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('token') || localStorage.getItem('token'));

  const storeTokenInStorage = (serverToken, useCookies = true) => {
    setToken(serverToken);
    if (useCookies) {
      Cookies.set('token', serverToken, { expires: 7 }); // Set the token with an expiration of 7 days in cookies
      localStorage.removeItem('token'); // Remove token from local storage if storing in cookies
    } else {
      localStorage.setItem('token', serverToken); // Set the token in local storage instead of cookies
      localStorage.setItem('token', serverToken); // Set the token in local storage instead of cookies
      Cookies.remove('token'); // Remove token from cookies if storing in local storage
    }
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken('');
    Cookies.remove('token');
    localStorage.removeItem('token');
    localStorage.removeItem('emailId');
    localStorage.removeItem('user_id');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInStorage, LogoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error('useAuth used outside of the provider');
  }
  return authContextValue;
};
