import React, { useState } from "react";
import styles from "./css/sortModal.module.css";
import { SortModalProps } from "../types";

const SortModal: React.FC<SortModalProps> = ({
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
  },
  onClose,
}) => {
  const [localTempAgeMin, setLocalTempAgeMin] = useState<number | null>(ageMin);
  const [localTempAgeMax, setLocalTempAgeMax] = useState<number | null>(ageMax);
  const [localIsAscending, setLocalIsAscending] =
    useState<boolean>(isAscending);
  const [localSortBy, setLocalSortBy] = useState<"breed" | "age">(sortBy);

  const applyTempFilters = () => {
    setAgeMin(localTempAgeMin);
    setAgeMax(localTempAgeMax);
    setIsAscending(localIsAscending);
    setSortBy(localSortBy);
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
            <h3>Age</h3>
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
