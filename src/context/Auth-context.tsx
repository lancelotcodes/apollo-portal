import React, { createContext } from 'react';
import { FCC } from '@/helpers/FCC';
import { useAppSelector } from '@/infrastructure/store/store-hooks';

export const AuthContextContext = createContext<null>(null);

export const AuthContextContextProvider: FCC = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated && !window.location.pathname.includes('auth')) {
    window.location.replace('/auth/login');
  }

  if (window.location.pathname === '/auth/login' && isAuthenticated) {
    window.location.replace('/');
  }

  return <AuthContextContext.Provider value={null}>{children}</AuthContextContext.Provider>;
};
