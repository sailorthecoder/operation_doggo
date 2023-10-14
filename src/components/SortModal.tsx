import React, { useState } from "react";
import styles from "./css/sortModal.module.css";
import { SortModalProps } from "../types";

const SortModal: React.FC<SortModalProps> = ({
  dogData,
  filterProps: {
    ageMin,
    ageMax,
    isAscending,
    setAgeMin,
    setAgeMax,
    setIsAscending,
    setCurrentPage,
    sortBy,
    setSortBy,
    cityFilter,
    setCityFilter,
    stateFilter,
    setStateFilter,
    zipFilter,
    setZipFilter,
  },
  onClose,
}) => {
  const [localTempAgeMin, setLocalTempAgeMin] = useState<number | null>(ageMin);
  const [localTempAgeMax, setLocalTempAgeMax] = useState<number | null>(ageMax);
  const [localIsAscending, setLocalIsAscending] =
    useState<boolean>(isAscending);
  const [localSortBy, setLocalSortBy] = useState<"breed" | "age">(sortBy);
  const [localCityFilter, setLocalCityFilter] = useState<string | null>(
    cityFilter
  );
  const [localStateFilter, setLocalStateFilter] = useState<string | null>(
    stateFilter
  );
  const [localZipFilter, setLocalZipFilter] = useState<string | null>(
    zipFilter
  );

  const applyTempFilters = () => {
    setAgeMin(localTempAgeMin);
    setAgeMax(localTempAgeMax);
    setIsAscending(localIsAscending);
    setSortBy(localSortBy);
    setCityFilter(localCityFilter);
    setStateFilter(localStateFilter);
    setZipFilter(localZipFilter);
    setCurrentPage(1);
  };

  const applyChangesAndClose = () => {
    applyTempFilters();
    onClose();
  };

  const getCurrentSortOption = (): string => {
    if (localSortBy === "breed" && localIsAscending)
      return "Breed Name (A - Z)";
    if (localSortBy === "breed" && !localIsAscending)
      return "Breed Name (Z - A)";
    if (localSortBy === "age" && localIsAscending) return "Age (Low - High)";
    if (localSortBy === "age" && !localIsAscending) return "Age (High - Low)";
    return "Age (Low - High)";
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.sortModal}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className={styles.closeButton}>
            X
          </button>
          <div className={styles.sortSection}>
            <h3>Sort by</h3>
            <select
              value={getCurrentSortOption()}
              className={styles.breedSortSelect}
              onChange={(e) => {
                const value = e.target.value;
                if (value.includes("Breed")) {
                  setLocalSortBy("breed");
                } else {
                  setLocalSortBy("age");
                }
                setLocalIsAscending(
                  value.includes("A - Z") || value.includes("Low - High")
                );
              }}
            >
              <option value="Age (Low - High)">Age (Low - High)</option>
              <option value="Age (High - Low)">Age (High - Low)</option>
              <option value="Breed Name (A - Z)">Breed Name (A - Z)</option>
              <option value="Breed Name (Z - A)">Breed Name (Z - A)</option>
            </select>
          </div>

          <div className={styles.filterSection}>
            <h3>Filters</h3>
            <div className={styles.ageFilters}>
              <label>
                Min:
                <input
                  type="number"
                  min="0"
                  value={localTempAgeMin ?? ""}
                  onChange={(e) =>
                    setLocalTempAgeMin(Number(e.target.value) || null)
                  }
                  placeholder="Min"
                />
              </label>
              <label>
                Max:
                <input
                  type="number"
                  min="0"
                  value={localTempAgeMax ?? ""}
                  onChange={(e) =>
                    setLocalTempAgeMax(Number(e.target.value) || null)
                  }
                  placeholder="Max"
                />
              </label>
            </div>
            <div className={styles.locationFilter}>
              <label>
                City:
                <input
                  list="cityOptions"
                  value={localCityFilter ?? ""}
                  onChange={(e) => setLocalCityFilter(e.target.value)}
                />
                <datalist id="cityOptions">
                  {dogData.map((dog) => (
                    <option value={dog.city} key={dog.id + "_city"} />
                  ))}
                </datalist>
              </label>
            </div>

            <div className={styles.locationFilter}>
              <label>
                State:
                <input
                  list="stateOptions"
                  value={localStateFilter ?? ""}
                  onChange={(e) => setLocalStateFilter(e.target.value)}
                />
                <datalist id="stateOptions">
                  {dogData.map((dog) => (
                    <option value={dog.state} key={dog.id + "_state"} />
                  ))}
                </datalist>
              </label>
            </div>

            <div className={styles.locationFilter}>
              <label>
                Zip Code:
                <input
                  list="zipOptions"
                  value={localZipFilter ?? ""}
                  onChange={(e) => setLocalZipFilter(e.target.value)}
                />
                <datalist id="zipOptions">
                  {dogData.map((dog) => (
                    <option value={dog.zip_code} key={dog.id + "_zip"} />
                  ))}
                </datalist>
              </label>
            </div>
          </div>

          <button
            onClick={applyChangesAndClose}
            className={styles.applyFilterButton}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortModal;
