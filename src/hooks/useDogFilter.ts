import { useState, useCallback } from "react";
import { Dog } from "../types";

const useDogFilter = (dogData: Dog[]) => {
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<"breed" | "age">("breed");

  const filterDogs = useCallback(() => {
    let filteredDogs = [...dogData];

    if (selectedBreed) {
      filteredDogs = filteredDogs.filter((dog) => dog.breed === selectedBreed);
    }

    if (ageMin !== null) {
      filteredDogs = filteredDogs.filter((dog) => dog.age >= ageMin);
    }

    if (ageMax !== null) {
      filteredDogs = filteredDogs.filter((dog) => dog.age <= ageMax);
    }

    filteredDogs.sort((a, b) => {
      if (sortBy === "breed") {
        return isAscending
          ? a.breed.localeCompare(b.breed)
          : b.breed.localeCompare(a.breed);
      } else {
        return isAscending ? a.age - b.age : b.age - a.age;
      }
    });

    return filteredDogs;
  }, [dogData, selectedBreed, ageMin, ageMax, isAscending, sortBy]);

  return {
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
  };
};

export default useDogFilter;
