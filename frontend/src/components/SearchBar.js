import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ setSelectedFood }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const resultsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setResults([]);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();

    const response = await axios.get(
      `http://localhost:3500/search?q=${searchTerm}`
    );
    const responseData = response.data;
    const foodData = responseData.foods;
    setResults(foodData);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleItemClick = async (result) => {
    setResults([]);
    const response = await axios.get(
      `http://localhost:3500/food?q=${result.fdcId}`
    );
    const responseData = response.data;
    console.log(responseData);

    setSelectedFood(responseData);
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSearch} className='flex w-full gap-2 text-base'>
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={handleChange}
          className='w-full rounded-md border border-solid border-slate-700 bg-slate-900 px-2 py-2 hover:bg-slate-800 focus:outline-none'
        />
        <button
          type='submit'
          className='p rounded-md bg-orange-700 px-3 hover:bg-orange-600'
        >
          Search
        </button>
      </form>
      {results.length > 0 ? (
        <ul
          ref={resultsRef}
          className='absolute z-10 my-1 max-h-72 overflow-y-auto rounded-md bg-slate-800 py-1 text-base'
        >
          {results.map((result, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(result)}
              className='cursor-pointer bg-slate-800 px-2 py-0.5 hover:bg-slate-700'
            >
              {result.description}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default SearchBar;