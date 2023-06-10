import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiFruitBowl } from 'react-icons/gi';
import DatePicker from './DatePicker';

const NavBar = ({ selectedDate, setSelectedDate }) => {
  const navLinkStyle = 'px-3 py-1.5';

  return (
    <div className='m-auto max-w-5xl px-5'>
      <div className='flex justify-between py-3'>
        <Link to='/' className='flex items-center text-xl font-bold'>
          <GiFruitBowl className='text-orange-600' />
          <div className='ml-2'>foodtracker</div>
        </Link>
        <div className='hidden sm:flex'>
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <ul className='flex list-none items-center justify-end gap-2 sm:py-8'>
          <li>
            <NavLink to='/search' className={navLinkStyle}>
              Search
            </NavLink>
          </li>
          <li>
            <NavLink to='/tracker' className={navLinkStyle}>
              Tracker
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='mb-4 flex items-center justify-center sm:hidden'>
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
};

export default NavBar;
