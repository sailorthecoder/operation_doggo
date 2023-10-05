import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import FavoritesModal from "../components/FavoritesModal";
import DogCard from "../components/DogCard";
import PaginationControls from "../components/PaginationControls";
import { Dog, DogSearchPageProps } from "../types";
import LoadingDog from '../assets/lottieFiles/LoadingDog.json';
import Lottie from 'lottie-react';
import './css/dogSearchPage.css';
import dogData from '../assets/db.json';


const DogSearchPage: React.FC<DogSearchPageProps> = ({ handleLogout }) => {

  const PAGE_SIZE = 100;
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const [totalDogs, setTotalDogs] = useState<number>(0);
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [tempAgeMin, setTempAgeMin] = useState<number | null>(null);
  const [tempAgeMax, setTempAgeMax] = useState<number | null>(null);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const totalPages = useMemo(() => Math.ceil(totalDogs / PAGE_SIZE), [totalDogs, PAGE_SIZE]);


  useEffect(() => {
    const fetchBreeds = () => {
      const breedsFromData = Array.from(new Set(dogData.dogData.map(dog => dog.breed))).sort();
      setBreeds(breedsFromData);
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchDogs = () => {
      let filteredDogs = dogData.dogData;
      if (selectedBreed) {
        filteredDogs = filteredDogs.filter(dog => dog.breed === selectedBreed);
      }
      if (ageMin !== null) {
        filteredDogs = filteredDogs.filter(dog => dog.age >= ageMin);
      }
      if (ageMax !== null) {
        filteredDogs = filteredDogs.filter(dog => dog.age <= ageMax);
      }
      if (isAscending) {
        filteredDogs.sort((a, b) => a.breed.localeCompare(b.breed));
      } else {
        filteredDogs.sort((a, b) => b.breed.localeCompare(a.breed));
      }
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const paginatedDogs = filteredDogs.slice(startIndex, startIndex + PAGE_SIZE);
      setTotalDogs(filteredDogs.length);
      setDogs(paginatedDogs);
      setIsLoading(false);
    };
    fetchDogs();
  }, [selectedBreed, currentPage, isAscending, ageMin, ageMax]);

  const handleApplyFilter = () => {
    let isInvalid = false;
    if (tempAgeMin !== null && tempAgeMin < 0) {
      isInvalid = true;
    }
    if (tempAgeMax !== null && tempAgeMax < 0) {
      isInvalid = true;
    }
    if (tempAgeMin !== null && tempAgeMax !== null && tempAgeMin > tempAgeMax) {
      isInvalid = true;
    }
    if (!isInvalid) {
      setAgeMin(tempAgeMin);
      setAgeMax(tempAgeMax);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedBreed(value === "all" ? null : value);
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setIsAscending(prevIsAscending => !prevIsAscending);
    if (selectedBreed === null) {
      setCurrentPage(1);
    }
  };

  const toggleFavorite = (dog: Dog) => {
    setFavorites(prev => {
      if (prev.some(favDog => favDog.id === dog.id)) {
        return prev.filter(favDog => favDog.id !== dog.id);
      } else {
        return [...prev, dog];
      }
    });
  };

  const getMatch = () => {
    const randomIndex = Math.floor(Math.random() * favorites.length);
    const matchedDog = favorites[randomIndex];
    navigate(`/match`, { state: { dog: matchedDog } });
};

  const onLogout = () => {
    handleLogout();
    navigate('/');
  }

  return (
    <div className="dog-search-page">
      <h4>Search for Dogs</h4>
      <div className="dog-search-page-header">
        {isFavoritesModalOpen && (
          <FavoritesModal
            favorites={favorites}
            getMatch={getMatch}
            onRemove={(dogId) => {setFavorites(prev => prev.filter(dog => dog.id !== dogId))}}
            onClose={() => setIsFavoritesModalOpen(false)}
          />
        )}
        <div className="upper-container">
          <select value={selectedBreed === null ? 'all' : selectedBreed} onChange={handleBreedChange}>
            <option value="" disabled>Select a breed</option>
            <option value="all">All breeds</option>
            {breeds.map(breed => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          {favorites.length > 0 && (
          <div className="buttons-container">
            <button onClick={() => setIsFavoritesModalOpen(true)}>
              Favorites: 🐕 {favorites.length} 🐕
            </button>
            <button onClick={getMatch} className="get-match-button">Get Matched!</button>
          </div>
            )}
        </div>
        <div className="sort-filter-container">
          {selectedBreed === null && (
            <button onClick={toggleSortOrder}>
              Sort by Breed: {isAscending ? 'Ascending' : 'Descending'}
            </button>
          )}
          <div className="age-filters">
            <label>
              Filter by Age:
              <input
                type="number"
                min="0"
                value={tempAgeMin ?? ''}
                onChange={(e) => setTempAgeMin(Number(e.target.value) || null)}
                placeholder="Min"
              />
              -
              <input
                type="number"
                min="0"
                value={tempAgeMax ?? ''}
                onChange={(e) => setTempAgeMax(Number(e.target.value) || null)}
                placeholder="Max"
              />
            </label>
              {(tempAgeMin !== null && tempAgeMin < 0) ||
              (tempAgeMax !== null && tempAgeMax < 0) ||
              (tempAgeMin !== null && tempAgeMax !== null && tempAgeMin > tempAgeMax) ? (
                  <p style={{ color: 'red' }}>Please enter a valid range</p>
              ) : null}
          </div>
          <button onClick={handleApplyFilter}>Apply Filter</button>
        </div>
      </div>
      {isLoading ? (
        <div className="loading-placeholder">
          <Lottie animationData={LoadingDog}/>
        </div>
      ) : (
        <div className="dog-cards-container">
          {dogs.map(dog => (
            <DogCard
            key={dog.id}
            dog={dog}
            onButtonClick={() => toggleFavorite(dog)}
            buttonLabel={favorites.some(favDog => favDog.id === dog.id) ? "Added to Favorites" : "Add to Favorites"}
            buttonColor={favorites.some(favDog => favDog.id === dog.id) ? 'green' : '#007BFF'}
            />
          ))}
        </div>
      )}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        setCurrentPage={setCurrentPage}
      />
      <button onClick={onLogout} className="logout-button">Log Out</button>
    </div>
  )
}

export default DogSearchPage;