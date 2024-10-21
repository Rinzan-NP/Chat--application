import React from 'react';

const SearchBar = () => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default SearchBar;