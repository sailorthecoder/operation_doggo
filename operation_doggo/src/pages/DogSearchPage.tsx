import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FavoritesModal from "../components/FavoritesModal";
import './css/dogSearchPage.css';

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

interface Location {
  zip_code: string;
  city: string;
  state: string;
}

const DogSearchPage: React.FC = () => {

  const PAGE_SIZE = 10;
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
            acc[location.zip_code] = location;
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

  const handleNextPage = async () => {
    if (nextQuery) {
      const searchResponse = await axios.get(nextQuery, { withCredentials: true });
      setCurrentPage(prevPage => prevPage + 1);
      const dogIds = searchResponse.data.resultIds;
      if (dogIds.length > 0) {
        const dogDetailsResponse = await axios.post('/dogs', dogIds, { withCredentials: true });
        setDogs(dogDetailsResponse.data);
      } else {
        setDogs([]);
      }
    }
  };

  const handlePrevPage = async () => {
    if (prevQuery) {
      const searchResponse = await axios.get(prevQuery, { withCredentials: true });
      if (currentPage > 1) {
        setCurrentPage(prevPage => prevPage - 1);
      }
      const dogIds = searchResponse.data.resultIds;
      if (dogIds.length > 0) {
        const dogDetailsResponse = await axios.post('/dogs', dogIds, { withCredentials: true });
        setDogs(dogDetailsResponse.data);
      } else {
        setDogs([]);
      }
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
      if (prev.some(d => d.id === dog.id)) {
        return prev.filter(d => d.id !== dog.id);
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

  return (
    <div className="dog-search-page">
      <h4>Search for Dogs</h4>
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
      {dogs.map(dog => (
        <div key={dog.id} className="dog-card">
          <div style={{ textAlign: 'center' }}>
            <img
              src={dog.img}
              alt={dog.name}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <h6>{dog.name}</h6>
          <p>Breed: {dog.breed}</p>
          <p>Age: {dog.age}</p>
          <p>Location: {dog.city}, {dog.state} {dog.zip_code}</p>
          <button
            onClick={() => toggleFavorite(dog)}
            style={{ backgroundColor: favorites.some(d => d.id === dog.id) ? 'green' : '#007BFF', color: 'white' }}
          >
            {favorites.some(d => d.id === dog.id) ? "Added to Favorites" : "Add to Favorites"}
          </button>
        </div>
      ))}
      <div className="pagination-controls">
        <button disabled={currentPage === 1} onClick={handlePrevPage}>Previous</button>
        <span>Page</span>
        <select
          value={currentPage}
          onChange={(e) => setCurrentPage(Number(e.target.value))}
        >
          {Array.from({ length: totalPages }).map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <span>of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>Next</button>
      </div>
    </div>
  )
}

export default DogSearchPage;