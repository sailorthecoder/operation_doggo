import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FavoritesModal from "../components/FavoritesModal";
import SortModal from "../components/SortModal";
import DogCard from "../components/DogCard";
import PaginationControls from "../components/PaginationControls";
import useDogFilter from "../hooks/useDogFilter";
import usePagination from "../hooks/usePagination";
import { Dog, SearchPageProps } from "../types";
import db from "../db.json";
import LoadingDog from "../../public/lottieFiles/LoadingDog.json";
import Lottie from "lottie-react";
import styles from "./css/search.module.css";

export const getStaticProps = async () => {
  return { props: { dogData: db.dogData } };
};

const SearchPage: React.FC<SearchPageProps> = ({ handleLogout, dogData }) => {
  const {
    selectedBreed,
    setSelectedBreed,
    ageMin,
    setAgeMin,
    ageMax,
    setAgeMax,
    isAscending,
    setIsAscending,
    sortBy,
    setSortBy,
    filterDogs,
  } = useDogFilter(dogData);
  const {
    data: dogs,
    currentPage,
    totalPages,
    handleNextPage,
    handlePrevPage,
    setCurrentPage,
    isLoading,
  } = usePagination({
    initialData: dogData,
    filterFunction: filterDogs,
  });
  const router = useRouter();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] =
    useState<boolean>(false);
  const [showSortModal, setShowSortModal] = useState<boolean>(false);

  useEffect(() => {
    console.log("dog data inside fetchbreed effect:", dogData);
    const fetchBreeds = () => {
      const breedsFromData = Array.from(
        new Set(dogData.map((dog) => dog.breed))
      ).sort();
      setBreeds(breedsFromData);
    };
    fetchBreeds();
  }, [dogData]);

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
                ageMin,
                setAgeMin,
                ageMax,
                setAgeMax,
                dogData,
                isAscending,
                setIsAscending,
                setCurrentPage,
                sortBy,
                setSortBy,
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
