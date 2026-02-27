"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchBar({ isAdmin }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const containerRef = useRef(null);

  /* ======================
      DEBOUNCING (300ms)
  ====================== */
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  /* ======================
      FETCH SUGGESTIONS
  ====================== */
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery) {
        setSuggestions([]);
        return;
      }

      const BASE = `${process.env.NEXT_PUBLIC_API_URL}/api`;
      const endpoint = `${BASE}/products/suggestions?q=${debouncedQuery}`;

      const res = await fetch(endpoint);
      const data = await res.json();

      setSuggestions(data);
      setShowDropdown(true);
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  /* ======================
      CLICK OUTSIDE
  ====================== */
  useEffect(() => {
    const handleClick = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleSearch = (value) => {
    if (!value.trim()) return;

    if (isAdmin) {
      router.push(`/admin/products?search=${encodeURIComponent(value)}`);
    } else {
      router.push(`/products?search=${encodeURIComponent(value)}`);
    }

    setShowDropdown(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-[#F2F1EC] flex items-center gap-3 px-4 py-2 rounded-md w-full"
    >
      <FiSearch
        size={18}
        className="cursor-pointer"
        onClick={() => handleSearch(query)}
      />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(query);
        }}
        placeholder="Search products..."
        className="bg-transparent outline-none text-sm w-full"
      />

      {/* Dropdown */}
      {query && showDropdown && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-md mt-2 z-20">
          {suggestions.length > 0 ? (
            suggestions.map((item) => (
              <Link
                key={item._id}
                href={`/products/${item.slug}`}
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => setShowDropdown(false)}
              >
                {item.title}
              </Link>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
