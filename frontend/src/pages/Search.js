import React from 'react';
import SearchBar from '../components/SearchBar';
import FoodInfo from '../components/FoodInfo';

const Search = ({
  selectedFood,
  setSelectedFood,
  protein,
  carbs,
  fat,
  setProtein,
  setCarbs,
  setFat,
  searchTerm,
  setSearchTerm,
  amount,
  setAmount,
  kcal,
  setKcal,
}) => {
  return (
    <div className='m-auto max-w-5xl px-5'>
      <SearchBar
        setSelectedFood={setSelectedFood}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setAmount={setAmount}
        setProtein={setProtein}
        setCarbs={setCarbs}
        setFat={setFat}
        setKcal={setKcal}
      />
      <FoodInfo
        amount={amount}
        setAmount={setAmount}
        selectedFood={selectedFood}
        protein={protein}
        carbs={carbs}
        fat={fat}
        kcal={kcal}
      />
    </div>
  );
};

export default Search;
