interface PaginationProps {
  currentPage: number;
  isLastPage: boolean;
  onPageChange: (newPage: number) => void;
}

export function Pagination({
  currentPage,
  isLastPage,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-6 pt-10 border-t border-white/10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-5 py-2 rounded-xl bg-white font-bold text-gray-700 disabled:opacity-40"
      >
        Previous
      </button>
      <span className="text-lg font-bold text-[#FFF04D]">
        Page {currentPage}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="px-5 py-2 rounded-xl bg-white font-bold text-gray-700 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
