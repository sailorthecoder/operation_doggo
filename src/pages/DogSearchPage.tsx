import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FavoritesModal from "../components/FavoritesModal";
import DogCard from "../components/DogCard";
import PaginationControls from "../components/PaginationControls";
import { Dog, Location, DogSearchPageProps } from "../types";
import LoadingDog from '../assets/LoadingDog.json';
import Lottie from 'lottie-react';
import './css/dogSearchPage.css';

const DogSearchPage: React.FC<DogSearchPageProps> = ({ handleLogout }) => {

  const PAGE_SIZE = 15;
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const [nextQuery, setNextQuery] = useState<string | null>(null);
  const [prevQuery, setPrevQuery] = useState<string | null>(null);
  const [totalDogs, setTotalDogs] = useState<number>(0);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const totalPages = useMemo(() => Math.ceil(totalDogs / PAGE_SIZE), [totalDogs, PAGE_SIZE]);

  useEffect(() => {
    const fetchBreeds = async () => {
      const response = await axios.get('/dogs/breeds', { withCredentials: true });
      const sortedBreeds = response.data.sort();
      setBreeds(sortedBreeds);
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      setIsLoading(true);
      try {
        const searchResponse = await axios.get('/dogs/search', {
          params: {
            breeds: selectedBreed ? [selectedBreed] : undefined,
            sort: `breed:${isAscending ? 'asc' : 'desc'}`,
            size: PAGE_SIZE,
            from: currentPage === 1 ? undefined : (currentPage - 1) * PAGE_SIZE,
          },
          withCredentials: true
        });
        setNextQuery(searchResponse.data.next);
        setPrevQuery(searchResponse.data.prev);
        setTotalDogs(searchResponse.data.total);
        const dogIds = searchResponse.data.resultIds;
        if (dogIds.length > 0) {
          const dogDetailsResponse = await axios.post('/dogs', dogIds, { withCredentials: true });
          const dogsWithLocations = await addLocationToDogs(dogDetailsResponse.data);
          setDogs(dogsWithLocations);
          setIsLoading(false);
        } else {
          setDogs([]);
        }
      } catch (error) {
        console.error("Error fetching the dogs", error);
      }
    };
    fetchDogs();
  }, [selectedBreed, currentPage, isAscending]);

  const addLocationToDogs = async (dogs: Dog[]) => {
    try {
        const zipCodes = dogs.map(dog => dog.zip_code);
        const locationResponse = await axios.post('/locations', zipCodes, { withCredentials: true });
        const locationsMap = locationResponse.data.reduce((acc: { [zip_code: string]: Location }, location: Location) => {
            acc[location?.zip_code] = location;
            return acc;
        }, {});

        return dogs.map(dog => ({
            ...dog,
            city: locationsMap[dog.zip_code]?.city,
            state: locationsMap[dog.zip_code]?.state
        }));
    } catch (error) {
        console.error("Error fetching the locations", error);
        return dogs;
    }
  };

  const fetchPage = async (query: string | null, updatePage: (update: (page: number) => number) => void) => {
    if (query) {
      try {
        const searchResponse = await axios.get(query, { withCredentials: true });
        updatePage(prevPage => (query === nextQuery ? prevPage + 1 : prevPage - 1));
        const dogIds = searchResponse.data.resultIds;
        if (dogIds.length > 0) {
          const dogDetailsResponse = await axios.post('/dogs', dogIds, { withCredentials: true });
          setDogs(dogDetailsResponse.data);
        } else {
          setDogs([]);
        }
      } catch (error) {
        console.error("Error fetching the page", error);
      }
    }
  };

  const handleNextPage = () => fetchPage(nextQuery, setCurrentPage);

  const handlePrevPage = () => fetchPage(prevQuery, setCurrentPage);

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

  const getMatch = async () => {
    try {
      const response = await axios.post('/dogs/match', favorites, { withCredentials: true });
      const matchedDog = response.data.match;
      navigate(`/match`, { state: { dog: matchedDog } });
    } catch (error) {
      console.error("Error fetching the match", error);
    }
  };

  const onLogout = async () => {
    await handleLogout();
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
        {favorites.length > 0 && (
          <div className="buttons-container">
            <button onClick={() => setIsFavoritesModalOpen(true)}>
              Favorites: 🐕 {favorites.length} 🐕
            </button>
            <button onClick={getMatch} className="get-match-button">Get Matched!</button>
          </div>
        )}
        <select value={selectedBreed === null ? 'all' : selectedBreed} onChange={handleBreedChange}>
          <option value="" disabled>Select a breed</option>
          <option value="all">All breeds</option>
          {breeds.map(breed => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        {selectedBreed === null && (
          <button onClick={toggleSortOrder}>
            Sort by Breed: {isAscending ? 'Ascending' : 'Descending'}
          </button>
        )}
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