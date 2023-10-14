import { useState, useCallback } from "react";
import { Dog } from "../types";

const useDogFilter = (dogData: Dog[]) => {
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<"breed" | "age">("breed");
  const [cityFilter, setCityFilter] = useState<string | null>(null);
  const [stateFilter, setStateFilter] = useState<string | null>(null);
  const [zipFilter, setZipFilter] = useState<string | null>(null);

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

    if (cityFilter) {
      filteredDogs = filteredDogs.filter(
        (dog) => dog.city?.toLowerCase() === cityFilter.toLowerCase()
      );
    }

    if (stateFilter) {
      filteredDogs = filteredDogs.filter(
        (dog) => dog.state?.toLowerCase() === stateFilter.toLowerCase()
      );
    }

    if (zipFilter) {
      filteredDogs = filteredDogs.filter((dog) => dog.zip_code === zipFilter);
    }

    return filteredDogs;
  }, [
    dogData,
    selectedBreed,
    ageMin,
    ageMax,
    isAscending,
    sortBy,
    cityFilter,
    stateFilter,
    zipFilter,
  ]);

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
    cityFilter,
    setCityFilter,
    stateFilter,
    setStateFilter,
    zipFilter,
    setZipFilter,
    filterDogs,
  };
};

export default useDogFilter;
