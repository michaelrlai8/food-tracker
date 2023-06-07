import React, { useState, useRef, useEffect } from 'react';
import { BsCaretDownFill } from 'react-icons/bs';

const FoodInfo = ({ selectedFood }) => {
  const [showPortions, setShowPortions] = useState(false);
  const [amount, setAmount] = useState('100');

  const resultsRef = useRef(null);

  const handleShowPortionsClick = () => {
    setShowPortions(!showPortions);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handlePortionClick = (gramWeight) => {
    setAmount(gramWeight);
    setShowPortions(false); // Hide the portions list when a portion is selected
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
  const lineStyle = 'rounded-md bg-slate-800 p-2 mb-4';

  return (
    <div>
      {selectedFood.description ? (
        <div>
          <div
            className={`mt-10 bg-slate-600 text-center text-xl font-semibold ${lineStyle}`}
          >
            {selectedFood.description}
          </div>
          <div className={`mb-4 flex justify-between rounded-md bg-slate-800`}>
            <div className='rounded-l-md p-2'>Amount</div>
            <div className='relative z-0'>
              <input
                id='amount'
                type='text'
                value={amount}
                onChange={handleAmountChange}
                className='w-24 rounded-r-md border border-solid border-slate-700  bg-slate-900 p-2 pr-9 text-right hover:bg-slate-800 focus:outline-none'
              />
              <div className='absolute right-4 top-3 text-slate-600'>g</div>
            </div>
          </div>
          <div className={`relative z-0 ${lineStyle}`}>
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
                className='absolute right-0 my-3 max-h-72 overflow-y-auto rounded-md bg-slate-800 py-1'
              >
                {selectedFood.foodPortions.map((portion) =>
                  portion.portionDescription !== 'Quantity not specified' ? (
                    <div
                      key={portion.id}
                      className='cursor-pointer bg-slate-800 px-2 py-0.5 hover:bg-slate-700'
                      onClick={() => handlePortionClick(portion.gramWeight)}
                    >
                      {`${portion.portionDescription} (${portion.gramWeight} g)`}
                    </div>
                  ) : null
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FoodInfo;
