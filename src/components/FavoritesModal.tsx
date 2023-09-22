import React from 'react';
import DogCard from './DogCard';
import { FavoritesModalProps } from '../types'
import './css/favoritesModal.css'

const FavoritesModal: React.FC<FavoritesModalProps> = ({ favorites, getMatch, onRemove, onClose }) => {

  const handleRemoval = (dogId: string) => {
    onRemove(dogId);
    if (favorites.length === 1) {
      onClose();
    }
  }

  return (
  <div className="favorites-modal-overlay">
    <div className="favorites-modal">
      <button className="close-modal-btn" onClick={onClose}>x</button>
      {favorites.map(dog => (
        <DogCard
          key={dog.id}
          dog={dog}
          onButtonClick={() => handleRemoval(dog.id)}
          buttonLabel="Remove from Favorites"
        />
      ))}
      <button onClick={getMatch} className="get-match-button">Get Matched!</button>
      </div>
    </div>
  );
};

export default FavoritesModal;
