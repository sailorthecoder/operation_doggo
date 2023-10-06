import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Header from '../components/Header';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
  };

  return (
    <>
      <Header/>
      <Component {...pageProps} isAuthenticated={isAuthenticated} handleLogout={handleLogout} setAuthenticationStatus={setIsAuthenticated} />
    </>
  );
};

export default MyApp;
