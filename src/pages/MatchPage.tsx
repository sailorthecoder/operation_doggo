import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DogCard from '../components/DogCard';
import './css/matchPage.css';

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
  city?: string;
  state?: string;
}

const MatchPage: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dogState = location.state as { dog: Dog } | undefined;

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <div className="match-page">
      <h1>You Matched with {dogState?.dog?.name}!</h1>
      {dogState?.dog && <DogCard dog={dogState.dog} />}
      <button onClick={handleLogout} className="logout-button">Log Out</button>
    </div>
  );
};

export default MatchPage;
