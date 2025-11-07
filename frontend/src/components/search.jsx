import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) navigate(`/search/${keyword}`);
  };

  const clearKeyword = () => setKeyword("");

  useEffect(() => {
    if (location.pathname === "/search") clearKeyword();
  }, [location]);

  return (
    <form
      onSubmit={searchHandler}
      className="w-full flex justify-center mt-6 mb-10 px-4"
    >
      <div className="flex items-center w-full max-w-lg bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden transition-all focus-within:ring-2 focus-within:ring-indigo-500">
        {/* Input Field */}
        <input
          type="text"
          placeholder="Search for crackers..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-grow px-5 py-2 text-gray-700 placeholder-gray-400 focus:outline-none text-sm md:text-base"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 transition-all"
        >
          <SearchIcon size={18} />
        </button>
      </div>

      {/* Browse Button (only visible in search pages) */}
      {location.pathname.startsWith("/search") && (
        <Link to="/search" className="ml-3">
          <button
            type="button"
            className="px-4 py-2 text-sm md:text-base font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Browse
          </button>
        </Link>
      )}
    </form>
  );
}
