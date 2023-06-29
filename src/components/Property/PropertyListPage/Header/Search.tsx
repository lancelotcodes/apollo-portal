import { SearchIcon } from '@/components/core/Icon';
import IconButton from '@/components/core/IconButton';
import React from 'react';
import { IoMdClose } from 'react-icons/io';

interface SearchProps {
  isSearching: boolean;
  setIsSearching: (e: boolean) => void;
  searchValue: string;
  setSearchValue: (e: string) => void;
}

const Search: React.FC<SearchProps> = ({ isSearching, setIsSearching, searchValue, setSearchValue }) => {
  return (
    <>
      {!isSearching ? (
        <IconButton onClick={() => setIsSearching(!isSearching)} className="p-2 text-gray-blue-6">
          <SearchIcon />
        </IconButton>
      ) : (
        <div className="w-full self-center flex-1">
          <div className="flex items-center xl:px-0 h-[40px] lg:h-[42px]">
            <div className="w-full">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400">
                  <SearchIcon aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full border border-gray-300 rounded py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-blue-7 focus:border-gray-blue-7 sm:text-sm"
                  placeholder="Search"
                  value={searchValue}
                  onChange={({ currentTarget }) => setSearchValue(currentTarget.value)}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/3">
                  <IconButton onClick={() => setIsSearching(!isSearching)} className="text-gray-blue-8">
                    <IoMdClose className="h-5 w-5" />
                  </IconButton>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
