import React from 'react';
import { DogCardProps } from '../types';
import './css/dogCard.css';

const DogCard: React.FC<DogCardProps> = ({ dog, onButtonClick, buttonLabel, buttonColor }) => {
  return (
    <div className="dog-card">
      <div className="img-container">
        <img src={dog.img} alt={dog.name} />
      </div>
      <div className="text-container">
        <h6>{dog.name}</h6>
        <p>Breed: {dog.breed}</p>
        <p>Age: {dog.age}</p>
        <p>Location: {dog.city}, {dog.state} {dog.zip_code}</p>
      </div>
      {onButtonClick && buttonLabel && (
        <button onClick={onButtonClick} style={{ backgroundColor: buttonColor || '#007BFF' }}>
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default DogCard;