import React, { useState, useRef, useEffect } from 'react';
import { BsCaretDownFill } from 'react-icons/bs';
import { PieChart } from 'react-minimal-pie-chart';

const FoodInfo = ({ selectedFood, amount, setAmount, protein, carbs, fat }) => {
  const [showPortions, setShowPortions] = useState(false);

  const resultsRef = useRef(null);

  const handleShowPortionsClick = () => {
    setShowPortions(!showPortions);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handlePortionClick = (gramWeight) => {
    setAmount(gramWeight);
    setShowPortions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowPortions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const lineStyle = 'rounded-md bg-slate-800 p-4 mb-4';
  const macros = ['Protein', 'Carbs', 'Fat'];

  return (
    <div>
      {selectedFood.description ? (
        <div>
          <div
            className={`mb-4 mt-10 rounded-md bg-slate-500 p-4 text-center text-xl font-semibold`}
          >
            {selectedFood.description}
          </div>
          <div className={`mb-4 flex justify-between rounded-md bg-slate-800`}>
            <div className='rounded-l-md p-4'>Amount</div>
            <div className='relative z-0'>
              <input
                id='amount'
                type='number'
                value={amount}
                onChange={handleAmountChange}
                className='w-24 appearance-none rounded-r-md border border-solid border-slate-700  bg-slate-900 p-4 pr-8 text-right hover:bg-slate-800 focus:outline-none'
              />
              <div className='absolute right-4 top-5 text-slate-600'>g</div>
            </div>
          </div>
          <div className={`relative  ${lineStyle}`}>
            <div className='flex justify-between'>
              <div>Serving size</div>
              <button
                className='cursor-pointer p-1'
                onClick={handleShowPortionsClick}
              >
                <BsCaretDownFill className='text-slate-500' />
              </button>
            </div>
            {showPortions && selectedFood.foodPortions ? (
              <div
                ref={resultsRef}
                className='absolute right-10 z-20 my-3 max-h-72 overflow-y-auto rounded-md bg-slate-700 py-1'
              >
                {selectedFood.foodPortions.map((portion) =>
                  portion.portionDescription !== 'Quantity not specified' ? (
                    <div
                      key={portion.id}
                      className='cursor-pointer bg-slate-700 px-2 py-0.5 hover:bg-slate-600'
                      onClick={() => handlePortionClick(portion.gramWeight)}
                    >
                      {`${portion.portionDescription} (${portion.gramWeight} g)`}
                    </div>
                  ) : null
                )}
              </div>
            ) : null}
          </div>
          <div className={`relative h-64 ${lineStyle}`}>
            <ul>
              {macros.map((macro) => (
                <li
                  key={macro}
                  className={`flex justify-between ${
                    macro === 'Protein'
                      ? 'text-green-400'
                      : macro === 'Carbs'
                      ? 'text-blue-400'
                      : macro === 'Fat'
                      ? 'text-red-400'
                      : ''
                  }`}
                >
                  <div>{macro}</div>
                  {macro === 'Protein' ? (
                    <div>{`${((protein * amount) / 100).toFixed(2)} g`}</div>
                  ) : macro === 'Carbs' ? (
                    <div>{`${((carbs * amount) / 100).toFixed(2)} g`}</div>
                  ) : macro === 'Fat' ? (
                    <div>{`${((fat * amount) / 100).toFixed(2)} g`}</div>
                  ) : null}
                </li>
              ))}
            </ul>
            <PieChart
              className='absolute -left-0 top-5 h-52'
              data={[
                { title: 'One', value: protein, color: 'rgb(74 222 128)' },
                { title: 'Two', value: carbs, color: 'rgb(96 165 250)' },
                { title: 'Three', value: fat, color: 'rgb(248 113 113)' },
              ]}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FoodInfo;
