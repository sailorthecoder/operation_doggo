import React from "react";
import DogCard from "./DogCard";
import { FavoritesModalProps } from "../types";
import styles from "./css/favoritesModal.module.css";

const FavoritesModal: React.FC<FavoritesModalProps> = ({
  favorites,
  getMatch,
  onRemove,
  onClose,
}) => {
  const handleRemoval = (dogId: string) => {
    onRemove(dogId);
    if (favorites.length === 1) {
      onClose();
    }
  };

  return (
    <div className={styles.favoritesModalOverlay} onClick={onClose}>
      <div
        className={styles.favoritesModal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeModalBtn} onClick={onClose}>
          x
        </button>
        {favorites.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            onButtonClick={() => handleRemoval(dog.id)}
            buttonLabel="Remove from Favorites"
          />
        ))}
        <button onClick={getMatch} className={styles.getMatchBtn}>
          Get Matched!
        </button>
      </div>
    </div>
  );
};

export default FavoritesModal;
