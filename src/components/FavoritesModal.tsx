import React from 'react';
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
        <div key={dog.id} className="dog-card">
          <div style={{ textAlign: 'center' }}>
            <img src={dog.img} alt={dog.name} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <h6>{dog.name}</h6>
          <p>Breed: {dog.breed}</p>
          <p>Age: {dog.age}</p>
          <p>Location: {dog.city}, {dog.state} {dog.zip_code}</p>
          <button onClick={() => handleRemoval(dog.id)}>Remove from Favorites</button>
        </div>
      ))}
      <button onClick={getMatch} className="get-match-button">Get Matched!</button>
      </div>
    </div>
  );
};

export default FavoritesModal;
