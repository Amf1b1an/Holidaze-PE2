interface SearchBarProps {
  query: string;
  setQuery: (val: string) => void;
  sort: string;
  setSort: (val: string) => void;
}

export function SearchBar({ query, setQuery, sort, setSort }: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/10 p-4 rounded-2xl border border-white/20 shadow-lg">
      <input
        type="text"
        placeholder="Search by venue name, description, city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-5 py-3 rounded-xl bg-white text-gray-800 outline-none focus:border-[#FF8800] transition"
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full md:w-56 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-medium outline-none"
      >
        <option value="created_desc">Newest Listings</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating_desc">Highest Rated</option>
      </select>
    </div>
  );
}
