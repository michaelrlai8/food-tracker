import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiFruitBowl } from 'react-icons/gi';
import DatePicker from './DatePicker';

const NavBar = ({ selectedDate, setSelectedDate }) => {
  const navLinkStyle = 'px-3 py-1.5';

  return (
    <div className='m-auto flex max-w-5xl justify-between px-5'>
      <Link to='/' className='flex w-1/5 items-center text-xl font-bold'>
        <GiFruitBowl className='text-orange-600' />
        <div className='ml-2'>foodtracker</div>
      </Link>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        className='w-3/5'
      />
      <ul className='flex w-1/5 list-none items-center justify-end gap-2 py-8'>
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
  );
};

export default NavBar;
