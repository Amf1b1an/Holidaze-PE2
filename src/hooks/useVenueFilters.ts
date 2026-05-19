import { useState, useEffect } from "react";

export function useVenueFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedSort, setSelectedSort] = useState("created_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const clearAll = () => {
    setSearchQuery("");
    setSelectedSort("created_desc");
    setFilters({ wifi: false, parking: false, breakfast: false, pets: false });
    setCurrentPage(1);
  };

  const hasActiveFilters =
    !!searchQuery || Object.values(filters).some(Boolean);

  return {
    searchQuery,
    setSearchQuery,
    debouncedSearch,
    selectedSort,
    setSelectedSort,
    currentPage,
    setCurrentPage,
    filters,
    toggleFilter,
    clearAll,
    hasActiveFilters,
  };
}
