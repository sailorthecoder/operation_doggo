import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const LazyLoginPage = React.lazy(() => import('./pages/LoginPage'));
const LazyDogSearchPage = React.lazy(() => import('./pages/DogSearchPage'));
const LazyMatchPage = React.lazy(() => import('./pages/MatchPage'));

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
          <Suspense fallback={<div>Loading...</div>}>
            <LazyLoginPage setAuthenticationStatus={setIsAuthenticated}/>
          </Suspense>
          }/>
          <Route path="/search" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <LazyDogSearchPage handleLogout={handleLogout}/>
              </ProtectedRoute>
            </Suspense>
          }/>
          <Route path="/match/" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <LazyMatchPage handleLogout={handleLogout}/>
              </ProtectedRoute>
            </Suspense>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
