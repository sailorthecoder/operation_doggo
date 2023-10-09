import React from "react";
import { PaginationControlsProps } from "../types";
import styles from "./css/paginationControls.module.css";

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
  setCurrentPage,
}) => (
  <div className={styles.paginationControls}>
    <button disabled={currentPage === 1} onClick={handlePrevPage}>
      Previous
    </button>
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
    <button disabled={currentPage === totalPages} onClick={handleNextPage}>
      Next
    </button>
  </div>
);

export default PaginationControls;
