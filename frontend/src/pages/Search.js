import React from 'react';
import SearchBar from '../components/SearchBar';
import FoodInfo from '../components/FoodInfo';

const Search = ({
  selectedFood,
  setSelectedFood,
  food,
  protein,
  carbs,
  fat,
  setFood,
  setProtein,
  setCarbs,
  setFat,
  searchTerm,
  setSearchTerm,
  amount,
  setAmount,
  kcal,
  setKcal,
  selectedDate,
}) => {
  return (
    <div className='m-auto max-w-5xl px-5'>
      <SearchBar
        setSelectedFood={setSelectedFood}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFood={setFood}
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
        food={food}
        protein={protein}
        carbs={carbs}
        fat={fat}
        kcal={kcal}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Search;
