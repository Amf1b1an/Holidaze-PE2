interface FilterChipsProps {
  filters: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  onToggle: (key: "wifi" | "parking" | "breakfast" | "pets") => void;
  onClear: () => void;
  showClear: boolean;
}

export function FilterChips({
  filters,
  onToggle,
  onClear,
  showClear,
}: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center bg-white/5 p-3 rounded-xl border border-white/10">
      <span className="text-sm font-semibold uppercase text-[#FFF04D] mr-2">
        Amenities:
      </span>
      {(Object.keys(filters) as Array<keyof typeof filters>).map((key) => (
        <button
          key={key}
          onClick={() => onToggle(key)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all border ${
            filters[key]
              ? "bg-[#007878] text-white border-[#007878]"
              : "bg-white/10 text-white border-white/20"
          }`}
        >
          {key}
        </button>
      ))}
      {showClear && (
        <button
          onClick={onClear}
          className="text-xs text-[#FF544E] underline font-bold ml-auto"
        >
          Clear All
        </button>
      )}
    </div>
  );
}
