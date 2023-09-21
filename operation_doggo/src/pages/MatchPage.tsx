import React from 'react';
import { useLocation } from 'react-router-dom';

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
  const dogState = location.state as { dog: Dog } | undefined;

  return (
    <div className="match-page">
      <h1>You Matched with {dogState?.dog?.name}!</h1>
      {dogState?.dog && (
        <div className="dogState?.dog-card">
          <div style={{ textAlign: 'center' }}>
            <img src={dogState?.dog.img} alt={dogState?.dog.name} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <p>Breed: {dogState?.dog.breed}</p>
          <p>Age: {dogState?.dog.age}</p>
          <p>Location: {dogState?.dog.city}, {dogState?.dog.state} {dogState?.dog.zip_code}</p>
        </div>
      )}
    </div>
  );
};

export default MatchPage;
