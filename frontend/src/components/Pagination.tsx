import { useHeroes } from "../hooks/useHeroes";

export const Pagination = () => {
  const { currentPage, totalPages, setPage } = useHeroes();

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={() => setPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
      >
        Prev
      </button>

      <span className="text-gray-700 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
      >
        Next
      </button>
    </div>
  );
};
