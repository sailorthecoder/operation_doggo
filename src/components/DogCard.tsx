import React from 'react';
import { DogCardProps } from '../types';
import styles from '../components/css/dogCard.module.css';

const DogCard: React.FC<DogCardProps> = ({ dog, onButtonClick, buttonLabel, buttonColor, customStyle }) => {
  return (
    <div className={styles.dogCard} style={customStyle}>
      <div className={styles.imgContainer}>
        <img src={dog.img} alt={dog.name} />
      </div>
      <div className={styles.textContainer}>
        <h6>{dog.name}</h6>
        <p>Breed: {dog.breed}</p>
        <p>Age: {dog.age}</p>
        <p>Location: {dog.city}, {dog.state} {dog.zip_code}</p>
      </div>
      {onButtonClick && buttonLabel && (
      <div className={styles.buttonContainer}>
        <button
          onClick={onButtonClick}
          style={{ backgroundColor: buttonColor || '#007BFF' }}
          className={styles.button}>
          {buttonLabel}
        </button>
      </div>
      )}
    </div>
  );
};

export default DogCard;