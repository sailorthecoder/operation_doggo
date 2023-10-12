import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import FavoritesModal from "../components/FavoritesModal";
import SortModal from "../components/SortModal";
import DogCard from "../components/DogCard";
import PaginationControls from "../components/PaginationControls";
import { Dog, SearchPageProps } from "../types";
import db from "../db.json";
import LoadingDog from "../../public/lottieFiles/LoadingDog.json";
import Lottie from "lottie-react";
import styles from "./css/search.module.css";

export const getStaticProps = async () => {
  const dogData = db;
  return { props: { dogData } };
};

const SearchPage: React.FC<SearchPageProps> = ({ handleLogout, dogData }) => {
  const PAGE_SIZE = 25;
  const router = useRouter();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const [totalDogs, setTotalDogs] = useState<number>(0);
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] =
    useState<boolean>(false);
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const totalPages = useMemo(
    () => Math.ceil(totalDogs / PAGE_SIZE),
    [totalDogs, PAGE_SIZE]
  );

  const filterDogs = (
    breed: string | null,
    minAge: number | null,
    maxAge: number | null,
    isAsc: boolean
  ) => {
    let filteredDogs = dogData.dogData;
    if (breed) {
      filteredDogs = filteredDogs.filter((dog) => dog.breed === breed);
    }
    if (minAge !== null) {
      filteredDogs = filteredDogs.filter((dog) => dog.age >= minAge);
    }
    if (maxAge !== null) {
      filteredDogs = filteredDogs.filter((dog) => dog.age <= maxAge);
    }
    if (isAsc) {
      filteredDogs.sort((a, b) => a.breed.localeCompare(b.breed));
    } else {
      filteredDogs.sort((a, b) => b.breed.localeCompare(a.breed));
    }
    return filteredDogs;
  };

  useEffect(() => {
    const fetchBreeds = () => {
      const breedsFromData = Array.from(
        new Set(dogData.dogData.map((dog) => dog.breed))
      ).sort();
      setBreeds(breedsFromData);
    };
    fetchBreeds();
  }, [dogData.dogData]);

  useEffect(() => {
    setIsLoading(true);
    const filteredDogs = filterDogs(selectedBreed, ageMin, ageMax, isAscending);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const paginatedDogs = filteredDogs.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );
    setTotalDogs(filteredDogs.length);
    setDogs(paginatedDogs);
    setIsLoading(false);
  }, [
    selectedBreed,
    currentPage,
    isAscending,
    ageMin,
    ageMax,
    dogData.dogData,
  ]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedBreed(value === "all" ? null : value);
    setCurrentPage(1);
  };

  const toggleFavorite = (dog: Dog) => {
    setFavorites((prev) => {
      if (prev.some((favDog) => favDog.id === dog.id)) {
        return prev.filter((favDog) => favDog.id !== dog.id);
      } else {
        return [...prev, dog];
      }
    });
  };

  const getMatch = () => {
    const randomIndex = Math.floor(Math.random() * favorites.length);
    const matchedDog = favorites[randomIndex];
    const dogDataString = encodeURIComponent(JSON.stringify(matchedDog));
    router.push(`/match?dog=${dogDataString}`);
  };

  const onLogout = () => {
    handleLogout();
    router.push("/");
  };

  return (
    <div className={styles.dogSearchPage}>
      <h4 className={styles.title}>Search for Dogs</h4>
      <div className={styles.header}>
        {isFavoritesModalOpen && (
          <FavoritesModal
            favorites={favorites}
            getMatch={getMatch}
            onRemove={(dogId) => {
              setFavorites((prev) => prev.filter((dog) => dog.id !== dogId));
            }}
            onClose={() => setIsFavoritesModalOpen(false)}
          />
        )}
        <div className={styles.upperContainer}>
          <select
            value={selectedBreed === null ? "all" : selectedBreed}
            onChange={handleBreedChange}
            className={styles.breedSelect}
          >
            <option value="" disabled>
              Select a breed
            </option>
            <option value="all">All breeds</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          {favorites.length > 0 && (
            <div className={styles.buttonsContainer}>
              <button onClick={() => setIsFavoritesModalOpen(true)}>
                Favorites: 🐕 {favorites.length} 🐕
              </button>
              <button onClick={getMatch} className={styles.getMatchButton}>
                Get Matched!
              </button>
            </div>
          )}
        </div>
        <div className={styles.sortFilterContainer}>
          <button onClick={() => setShowSortModal(true)}>Sort & Filter</button>
          {showSortModal && (
            <SortModal
              filterProps={{
                selectedBreed,
                ageMin,
                setAgeMin,
                ageMax,
                setAgeMax,
                dogData,
                isAscending,
                setIsAscending,
                setCurrentPage,
                filterDogs,
              }}
              onClose={() => setShowSortModal(false)}
            />
          )}
        </div>
      </div>
      {isLoading ? (
        <div className={styles.loadingPlaceholder}>
          <Lottie animationData={LoadingDog} />
        </div>
      ) : (
        <div className={styles.dogCardsContainer}>
          {dogs.map((dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              onButtonClick={() => toggleFavorite(dog)}
              buttonLabel={
                favorites.some((favDog) => favDog.id === dog.id)
                  ? "Added to Favorites"
                  : "Add to Favorites"
              }
              buttonColor={
                favorites.some((favDog) => favDog.id === dog.id)
                  ? "green"
                  : "#007BFF"
              }
              customStyle={{ width: "250px" }}
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
      <button onClick={onLogout} className={styles.logoutButton}>
        Log Out
      </button>
    </div>
  );
};

export default SearchPage;
