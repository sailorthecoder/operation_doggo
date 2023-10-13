import { useState, useEffect, useMemo } from "react";
import { Dog, UsePaginationProps } from "../types";

const usePagination = ({
  initialData,
  filterFunction,
  pageSize = 25,
}: UsePaginationProps) => {
  const [data, setData] = useState<Dog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize]
  );

  useEffect(() => {
    setIsLoading(true);
    const filteredData = filterFunction(initialData);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
    setTotalItems(filteredData.length);
    setData(paginatedData);
    setIsLoading(false);
  }, [initialData, filterFunction, currentPage, pageSize]);

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

  return {
    data,
    currentPage,
    totalPages,
    handleNextPage,
    handlePrevPage,
    setCurrentPage,
    isLoading,
  };
};

export default usePagination;
