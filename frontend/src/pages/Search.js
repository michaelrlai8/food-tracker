import React, { useState } from 'react';
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
}) => {
  const [amount, setAmount] = useState(100);

  return (
    <div className='m-auto max-w-5xl px-5'>
      <SearchBar
        setAmount={setAmount}
        setProtein={setProtein}
        setCarbs={setCarbs}
        setFat={setFat}
        setSelectedFood={setSelectedFood}
      />
      <FoodInfo
        amount={amount}
        protein={protein}
        carbs={carbs}
        fat={fat}
        setAmount={setAmount}
        selectedFood={selectedFood}
      />
    </div>
  );
};

export default Search;
