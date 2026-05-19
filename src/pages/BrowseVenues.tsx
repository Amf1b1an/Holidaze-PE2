import { useEffect, useState } from "react";
import type { Venue } from "../types";
import { apiRequest } from "../utils/api";
import { VenueCard } from "../components/VenueCard";
import Layout from "../components/Layout";
import { SearchBar } from "../components/SearchBar";
import { FilterChips } from "../components/FilterChips";
import { Pagination } from "../components/Pagination";
import { useVenueFilters } from "../hooks/useVenueFilters";

export default function BrowseVenues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLastPage, setIsLastPage] = useState(false);

  const f = useVenueFilters();

  useEffect(() => {
    async function loadVenues() {
      try {
        setLoading(true);
        let endpoint = f.debouncedSearch.trim()
          ? `/holidaze/venues/search?q=${encodeURIComponent(f.debouncedSearch)}&_owner=true`
          : `/holidaze/venues?_owner=true`;

        const [sortField, sortOrder] = f.selectedSort.split("_");
        endpoint += `&page=${f.currentPage}&limit=12&sort=${sortField}&sortOrder=${sortOrder}`;

        const response = await apiRequest<any>(endpoint);
        const rawData = response?.data || response;
        const metaData = response?.meta;

        setVenues(Array.isArray(rawData) ? rawData : []);
        setIsLastPage(metaData?.isLastPage ?? rawData.length < 12);
      } catch (err) {
        setError("Failed to load venues.");
      } finally {
        setLoading(false);
      }
    }
    loadVenues();
  }, [f.currentPage, f.debouncedSearch, f.selectedSort]);

  const filteredVenues = venues.filter((v) => {
    if (f.filters.wifi && !v.meta?.wifi) return false;
    if (f.filters.parking && !v.meta?.parking) return false;
    if (f.filters.breakfast && !v.meta?.breakfast) return false;
    if (f.filters.pets && !v.meta?.pets) return false;
    return true;
  });

  return (
    <Layout subtitle="Explore Venues">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <SearchBar
          query={f.searchQuery}
          setQuery={f.setSearchQuery}
          sort={f.selectedSort}
          setSort={f.setSelectedSort}
        />

        <FilterChips
          filters={f.filters}
          onToggle={f.toggleFilter}
          onClear={f.clearAll}
          showClear={f.hasActiveFilters}
        />

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : filteredVenues.length === 0 ? (
          <div className="text-center py-20">No matching venues found.</div>
        ) : (
          <div className="flex flex-wrap justify-center md:justify-start gap-8 w-full">
            {filteredVenues.map((v) => (
              <VenueCard key={v.id} venue={v} />
            ))}
          </div>
        )}

        {!loading && filteredVenues.length > 0 && (
          <Pagination
            currentPage={f.currentPage}
            isLastPage={isLastPage}
            onPageChange={f.setCurrentPage}
          />
        )}
      </div>
    </Layout>
  );
}
