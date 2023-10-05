import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DogCard from '../components/DogCard';
import { Dog, MatchPageProps } from '../types';
import Streamers from '../assets/lottieFiles/Streamers.json';
import Lottie from 'lottie-react';
import './css/matchPage.css';

const MatchPage: React.FC<MatchPageProps> = ({ handleLogout }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const dogState = location.state as { dog: Dog } | undefined;

  const onLogout = () => {
    handleLogout();
    navigate('/');
  }

  return (
    <div className="match-page">
      <h1>You Matched with {dogState?.dog?.name}!</h1>
        {dogState?.dog && <DogCard dog={dogState.dog} />}
        <div className='streamers-background'>
          <Lottie animationData={Streamers}/>
        </div>
      <button onClick={onLogout} className="logout-button">Log Out</button>
    </div>
  );
};

export default MatchPage;
