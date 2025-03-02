"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, Command, Filter } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import Templates from '@/app/(data)/Templates';

function SearchSection({ onSearchInput }: { onSearchInput: (value: string) => void }) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilterTooltip, setShowFilterTooltip] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Get unique categories from Templates data
  const categories = ['All', ...Array.from(
    new Set(Templates.map(template => template.category))
  )].filter(Boolean);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    // Always consider the selected category when searching
    applyFilters(value, selectedCategory);
  };

  const clearSearch = () => {
    setSearchValue("");
    // Clear search but maintain category filter
    applyFilters("", selectedCategory);
    inputRef.current?.focus();
  };

  // Function to handle category selection
  const handleCategorySelect = (category: string) => {
    // Only update if the category changed
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      // Show feedback tooltip
      setShowFilterTooltip(true);
      setTimeout(() => setShowFilterTooltip(false), 2000);
      
      // Apply filters with current search value and new category
      applyFilters(searchValue, category);
      
      // Scroll selected category into view if needed
      setTimeout(() => {
        if (categoryRef.current) {
          const button = categoryRef.current.querySelector(`[data-category="${category}"]`);
          button?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      }, 100);
    }
  };
  
  // Combined function to apply both filters
  const applyFilters = (searchText: string, category: string) => {
    console.log("Applying filters:", { searchText, category });
    
    if (category === "All") {
      onSearchInput(searchText.trim());
    } else {
      // Use a consistent format that can be parsed in TemplateListSection
      onSearchInput(`${searchText.trim()} [category:${category}]`);
    }
  };

  // Keyboard navigation handler
  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      inputRef.current?.focus();
    }
  }, []);

  // Fixed useEffect with proper cleanup
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="relative w-full">
      {/* Gradient background with subtle animation */}
      <div className="absolute inset-0 -z-10 h-56 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(40%_36%_at_50%_30%,theme(colors.primary/8%)_0%,transparent_60%)]"></div>
      </div>

      <div className='p-5 md:p-8 flex flex-col justify-center items-center'>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-5"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary">
            Browse All Templates
          </h1>
          <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/70 to-transparent rounded-full"></span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className='w-full max-w-xl'
        >
          <div 
            className={cn(
              "group relative flex items-center gap-2 rounded-xl border bg-white p-2 shadow-lg transition-all duration-300",
              isFocused
                ? "border-primary/50 shadow-primary/10 ring-4 ring-primary/5"
                : "hover:border-gray-300"
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary group-hover:bg-primary/10">
              <Search
                className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  isFocused && "scale-110"
                )}
              />
            </div>

            <input
              ref={inputRef}
              type="text"
              placeholder="Search templates, categories or features..."
              value={searchValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-label="Search templates"
              className="flex-1 bg-transparent py-2 outline-none text-gray-800 placeholder:text-gray-400"
            />

            <AnimatePresence>
              {searchValue && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="group flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-500 group-hover:text-gray-700" />
                </motion.button>
              )}
            </AnimatePresence>

            <div className="hidden md:flex items-center gap-1 border rounded px-2 py-1 text-xs text-gray-400">
              <Command className="h-3.5 w-3.5" />
              <span>K</span>
            </div>
          </div>

          {/* Category selection - IMPROVED SPACING */}
          <div className="mt-3 relative">
            {/* Small filter indicator */}
            <div className="flex items-center gap-1 px-1 mb-1.5">
              <Filter className="h-3 w-3 text-primary/70" />
              <span className="text-xs text-gray-500">Filter by:</span>
              
              {/* Tooltip for filter feedback */}
              <AnimatePresence>
                {showFilterTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-20 text-xs bg-primary text-white px-2 py-0.5 rounded"
                  >
                    Filter applied!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Horizontal scrollable category buttons */}
            <div 
              ref={categoryRef}
              className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar snap-x"
            >
              {categories.map((category) => (
                <motion.button 
                  key={category}
                  data-category={category}
                  onClick={() => handleCategorySelect(category)}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "text-xs whitespace-nowrap px-2.5 py-1.5 rounded-full border transition-all duration-200 snap-start",
                    selectedCategory === category 
                      ? "bg-primary text-white border-primary font-medium" 
                      : "bg-white border-gray-200 hover:border-primary/30 hover:bg-primary/5 text-gray-700"
                  )}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hide scrollbar but keep functionality */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          height: 3px;
          background: transparent;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(112, 78, 248, 0.1);
          border-radius: 999px;
        }
        .hide-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(112, 78, 248, 0.2);
        }
      `}</style>
    </div>
  );
}

export default SearchSection;