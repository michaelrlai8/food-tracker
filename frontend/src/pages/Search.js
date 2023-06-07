import React from 'react';
import SearchBar from '../components/SearchBar';
import FoodInfo from '../components/FoodInfo';

const Search = ({ selectedFood, setSelectedFood }) => {
  return (
    <div className='m-auto max-w-5xl px-5'>
      <SearchBar setSelectedFood={setSelectedFood} />
      <FoodInfo selectedFood={selectedFood} />
    </div>
  );
};

export default Search;
