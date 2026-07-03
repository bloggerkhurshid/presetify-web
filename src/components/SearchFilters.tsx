"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function SearchFilters({ categories }: { categories: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentSearch = searchParams.get('q') || '';
  const currentCategory = searchParams.get('category') || '';
  
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        const params = new URLSearchParams(searchParams.toString());
        if (searchTerm) {
          params.set('q', searchTerm);
        } else {
          params.delete('q');
        }
        router.push(`/?${params.toString()}`, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, currentSearch, router, searchParams]);

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentCategory === categoryId || !categoryId) {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-6 mb-8 w-full">
      {/* Search Bar */}
      <div className="relative w-full max-w-md mx-auto md:mx-0">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search presets by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] text-black dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
        />
      </div>

      {/* Horizontal Category Pills */}
      {categories.length > 0 && (
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 gap-2 hide-scrollbar">
          <button
            onClick={() => handleCategoryClick('')}
            className={`whitespace-nowrap px-6 py-2 text-sm font-medium transition-colors ${
              !currentCategory 
                ? 'bg-black text-white dark:bg-white dark:text-black' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:border dark:border-zinc-800'
            }`}
          >
            All Presets
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`whitespace-nowrap px-6 py-2 text-sm font-medium transition-colors ${
                currentCategory === cat.name 
                  ? 'bg-black text-white dark:bg-white dark:text-black' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:border dark:border-zinc-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
