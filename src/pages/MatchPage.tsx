import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DogCard from '../components/DogCard';
import { Dog, MatchPageProps } from '../types';
import './css/matchPage.css';

const MatchPage: React.FC<MatchPageProps> = ({ handleLogout }) => {

  const location = useLocation();
  const navigate = useNavigate();
  const dogState = location.state as { dog: Dog } | undefined;

  const onLogout = async () => {
    await handleLogout();
    navigate('/');
  }

  return (
    <div className="match-page">
      <h1>You Matched with {dogState?.dog?.name}!</h1>
      {dogState?.dog && <DogCard dog={dogState.dog} />}
      <button onClick={onLogout} className="logout-button">Log Out</button>
    </div>
  );
};

export default MatchPage;
