import React, { useState, useRef, useEffect } from 'react';
import { BsCaretDownFill } from 'react-icons/bs';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FoodInfo = ({
  selectedFood,
  amount,
  food,
  setAmount,
  protein,
  carbs,
  fat,
  kcal,
  selectedDate,
}) => {
  const [showPortions, setShowPortions] = useState(false);

  const resultsRef = useRef(null);

  const handleShowPortionsClick = () => {
    setShowPortions((prevShowPortions) => !prevShowPortions);
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

  const handleSave = () => {
    const postMacroData = async () => {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3500/macros',
        data: {
          date: selectedDate,
          food: food,
          amount: amount,
          protein: protein,
          carbs: carbs,
          fat: fat,
          kcal: kcal,
        },
      });
    };

    postMacroData();
  };

  const lineStyle = 'rounded-md bg-slate-900 p-4 mb-4';
  const macros = ['Protein', 'Carbs', 'Fat', 'Energy'];

  return (
    <div className='pb-4'>
      {selectedFood.description ? (
        <div>
          <div
            className={`mb-4 mt-10 rounded-md bg-slate-900 p-4 text-center text-2xl font-semibold`}
          >
            {selectedFood.description}
          </div>

          <div className={`mb-4 flex justify-between rounded-md bg-slate-900`}>
            <div className='rounded-l-md p-4'>Amount</div>
            <div className='relative z-0 mr-3.5 flex items-center'>
              <input
                id='amount'
                type='number'
                value={amount}
                onChange={handleAmountChange}
                className='w-24 appearance-none rounded-md border border-solid border-slate-700  bg-slate-950 p-2 pr-8 text-right hover:bg-slate-800 focus:outline-none'
              />
              <div className='pointer-events-none absolute right-4 top-4 text-slate-600'>
                g
              </div>
            </div>
          </div>
          <div className={`relative ${lineStyle}`}>
            <div className='flex justify-between'>
              <div>Serving size</div>
              <button
                className='mr-2 mt-1 cursor-pointer'
                onClick={handleShowPortionsClick}
              >
                <BsCaretDownFill className='text-slate-500' />
              </button>
            </div>
            {showPortions && selectedFood.foodPortions ? (
              <div
                ref={resultsRef}
                className='absolute right-0 top-12 z-20 my-3 max-h-72 overflow-y-auto rounded-md bg-slate-700 py-1'
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
          <div
            className={`relative flex items-center justify-center gap-20 ${lineStyle}`}
          >
            <ul>
              {macros.map((macro) => (
                <li
                  key={macro}
                  className={`flex w-48 justify-between ${
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
                    <div>
                      <div>{`${((fat * amount) / 100).toFixed(2)} g`}</div>
                      <br />
                    </div>
                  ) : macro === 'Energy' ? (
                    <div>{`${((kcal * amount) / 100).toFixed(2)} kcal`}</div>
                  ) : null}
                </li>
              ))}
            </ul>
            <PieChart
              className='w-40 py-4'
              data={[
                { title: 'One', value: protein, color: 'rgb(74 222 128)' },
                { title: 'Two', value: carbs, color: 'rgb(96 165 250)' },
                { title: 'Three', value: fat, color: 'rgb(248 113 113)' },
              ]}
              startAngle={-45}
              lengthAngle={-360}
              lineWidth={20}
            />
          </div>
          <Link to='/tracker'>
            <button
              onClick={handleSave}
              className={`${lineStyle} w-full bg-cyan-400 text-black hover:bg-cyan-500`}
            >
              Add
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default FoodInfo;
