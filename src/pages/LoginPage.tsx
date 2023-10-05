import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { LoginPageProps } from '../types'
import './css/loginPage.css';
import LoginDog from '../assets/lottieFiles/LoginDog.json';
import Lottie from 'lottie-react';

const LoginPage: React.FC<LoginPageProps> = ({ setAuthenticationStatus }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticationStatus(true);
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/search');
  }

  return (
    <div className="login-page">
      <h2>Pup Finder</h2>
          <Lottie
            animationData={LoginDog}
            style={{
              height: '15%',
              width: '33%',
              border: '1px solid',
              margin: '25px',
              marginTop: '0px',
              maxWidth: '225px'
              }}
          />
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage;