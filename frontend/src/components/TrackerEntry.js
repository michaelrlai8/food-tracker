import React from 'react';
import { LuEdit } from 'react-icons/lu';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const TrackerEntry = ({ entry, setHistory }) => {
  const [editAmount, setEditAmount] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setEditAmount(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setEditAmount(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEditAmount(!editAmount);
    // Conditional to return if blank input submission
    if (inputValue.trim() === '') {
      return;
    }

    // Update state before PATCH/GET calls to prevent loading visual
    const updateItemValue = () => {
      setHistory((prevHistory) => {
        return prevHistory.map((item) => {
          console.log(item);
          if (item.id === entry.id) {
            return { ...item, amount: inputValue };
          }
          return item;
        });
      });
    };
    updateItemValue();

    const patchAndGet = async () => {
      // PATCH request to update amount of a food
      const patchResp = await axios({
        method: 'patch',
        url: 'http://localhost:3500/entry',
        data: {
          id: entry.id,
          amount: inputValue,
        },
      });
      console.log(patchResp);

      // GET request to get updated list
      const response = await axios.get('http://localhost:3500/history');
      setHistory(response.data);
    };
    patchAndGet();
  };

  const lineStyle = 'rounded-md bg-slate-900 pt-4 pl-4 pr-4 mb-4';
  const macroStyle = 'w-40';
  return (
    <div className={`${lineStyle}`} key={(entry.id, entry.food)}>
      <div className='flex justify-between'>
        <div className='mb-2 mr-4 font-semibold'>{entry.food}</div>
        <div>{new Date(entry.date).toDateString()}</div>
      </div>
      <div className='flex h-16 items-center justify-between'>
        <div className='flex'>
          <div
            className={`text-green-400 ${macroStyle}`}
          >{`Protein ${entry.protein} g`}</div>
          <div
            className={`text-blue-400 ${macroStyle}`}
          >{`Carbs ${entry.carbs} g`}</div>
          <div
            className={`text-red-400 ${macroStyle}`}
          >{`Fat ${entry.fat} g`}</div>
          <div className={`${macroStyle}`}>{`Energy ${entry.kcal} kcal`}</div>
        </div>
        {!editAmount && (
          <div className='mr-4 flex'>
            <div>
              <button
                onClick={() => setEditAmount(!editAmount)}
                className='mr-3 mt-1 text-slate-500'
              >
                <LuEdit />
              </button>
            </div>
            <div className='flex'>{`${entry.amount} g`}</div>
          </div>
        )}
        {editAmount && (
          <div className='relative'>
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleInputChange}
                ref={inputRef}
                type='number'
                className='h-10 w-32 appearance-none rounded-md border border-solid border-slate-700  bg-slate-950 p-2 pr-8 text-right hover:bg-slate-800 focus:outline-none'
              />
            </form>
            <div className='pointer-events-none absolute right-4 top-2 text-slate-600'>
              g
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackerEntry;
