import React from 'react';
import { LuEdit } from 'react-icons/lu';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BsFillTrash3Fill } from 'react-icons/bs';

const TrackerEntry = ({ entry, history, setHistory, selectedDate }) => {
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

    // Update state before PATCH/GET calls for loading
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
      console.log(selectedDate);

      const filteredData = response.data.filter(
        (obj) =>
          new Date(obj.date).toDateString() === selectedDate.toDateString()
      );
      setHistory(filteredData);
    };
    patchAndGet();
  };

  const handleDelete = async () => {
    const newArray = history.filter((item) => item.id !== entry.id);
    setHistory(newArray);

    await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}/delete`,
      data: {
        id: entry.id,
      },
    });

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/history`
    );
    const filteredData = response.data.filter(
      (obj) => new Date(obj.date).toDateString() === selectedDate.toDateString()
    );
    setHistory(filteredData);
  };

  const lineStyle = 'rounded-md bg-slate-900 pt-4 pl-4 pr-4 mb-4';
  const macroStyle = 'w-1/6 pr-6 text-sm';
  return (
    <div className={`${lineStyle}`} key={(entry.id, entry.food)}>
      <div className='flex justify-between'>
        <div className='mr-4 font-semibold'>{entry.food}</div>
        <div className='flex items-center gap-4'>
          <div>{new Date(entry.date).toDateString()}</div>
          <button onClick={handleDelete}>
            <BsFillTrash3Fill className='text-slate-500' />
          </button>
        </div>
      </div>
      <div className='relative flex h-16 items-center justify-between'>
        <div className='flex w-full'>
          <div className={`text-green-400 ${macroStyle}`}>{`Protein ${(
            entry.protein *
            (entry.amount / 100)
          ).toFixed(2)} g`}</div>
          <div className={`text-blue-400 ${macroStyle}`}>{`Carbs ${(
            entry.carbs *
            (entry.amount / 100)
          ).toFixed(2)} g`}</div>
          <div className={`text-red-400 ${macroStyle}`}>{`Fat ${(
            entry.fat *
            (entry.amount / 100)
          ).toFixed(2)} g`}</div>
          <div className={`${macroStyle}`}>{`Energy ${(
            entry.kcal *
            (entry.amount / 100)
          ).toFixed(2)} kcal`}</div>
        </div>
        {!editAmount && (
          <div className='absolute right-0 flex gap-4'>
            <div className='flex'>{`${entry.amount} g`}</div>
            <div>
              <button
                onClick={() => setEditAmount(!editAmount)}
                className='mt-1 text-slate-500'
              >
                <LuEdit />
              </button>
            </div>
          </div>
        )}
        {editAmount && (
          <div className='absolute right-0'>
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleInputChange}
                ref={inputRef}
                type='number'
                className='h-10 w-32 appearance-none rounded-md border border-solid border-slate-700  bg-slate-950 p-2 pr-12 text-right hover:bg-slate-800 focus:outline-none'
              />
            </form>
            <div className='pointer-events-none absolute right-8 top-2 text-slate-600'>
              g
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackerEntry;
