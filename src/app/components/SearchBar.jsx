"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

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
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border mt-1 rounded-md z-[100]">
          {suggestions.map((item) => (
            <div
              key={item.slug}
              onClick={() => handleSearch(item.title)}
              className="px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}