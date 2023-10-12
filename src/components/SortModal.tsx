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
  },
  onClose,
}) => {
  const [localTempAgeMin, setLocalTempAgeMin] = useState<number | null>(ageMin);
  const [localTempAgeMax, setLocalTempAgeMax] = useState<number | null>(ageMax);
  const [localIsAscending, setLocalIsAscending] =
    useState<boolean>(isAscending);

  const applyTempFilters = () => {
    setAgeMin(localTempAgeMin);
    setAgeMax(localTempAgeMax);
    setIsAscending(localIsAscending);
    setCurrentPage(1);
  };

  const applyChangesAndClose = () => {
    applyTempFilters();
    onClose();
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
              value={localIsAscending ? "ascending" : "descending"}
              onChange={() => setLocalIsAscending((prev) => !prev)}
              className={styles.breedSortSelect}
            >
              <option value="ascending">Sort by Breed Ascending</option>
              <option value="descending">Sort by Breed Descending</option>
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
