import React from 'react';
import DogCard from './DogCard';
import './css/favoritesModal.css'

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

interface FavoritesModalProps {
  favorites: Dog[];
  getMatch: () => void;
  onRemove: (dogId: string) => void;
  onClose: () => void;
}

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
