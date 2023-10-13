import { useState, useCallback } from "react";
import { Dog } from "../types";

const useDogFilter = (dogData: Dog[]) => {
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const filterDogs = useCallback(
    (
      breed: string | null,
      minAge: number | null,
      maxAge: number | null,
      isAsc: boolean
    ) => {
      let filteredDogs = dogData;

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
    },
    [dogData]
  );

  return {
    selectedBreed,
    setSelectedBreed,
    ageMin,
    setAgeMin,
    ageMax,
    setAgeMax,
    isAscending,
    setIsAscending,
    filterDogs,
  };
};

export default useDogFilter;
