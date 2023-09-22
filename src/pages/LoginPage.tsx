import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { LoginPageProps, AxiosError } from '../types'
import './css/loginPage.css';
import LoginDog from '../assets/LoginDog.json';
import Lottie from 'lottie-react';

const LoginPage: React.FC<LoginPageProps> = ({ setAuthenticationStatus }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', {
        name: name,
        email: email
    }, {
      withCredentials: true
    });
      if (response.status === 200) {
        setAuthenticationStatus(true);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/search')
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.response?.data?.message || 'Failed to Login!');
    }
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
        {error && (
          <div className="error-message">{error}</div>
        )}
      </form>
    </div>
  )
}

export default LoginPage;