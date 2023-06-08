import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiFruitBowl } from 'react-icons/gi';
import DatePicker from './DatePicker';

const NavBar = ({ selectedDate, setSelectedDate }) => {
  const navLinkStyle = 'px-3 py-1.5';

  return (
    <div className='m-auto flex max-w-5xl justify-between px-5'>
      <Link to='/' className='flex items-center text-xl font-bold'>
        <GiFruitBowl className='text-orange-600' />
        <div className='ml-2'>foodtracker</div>
      </Link>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ul className='flex list-none items-center gap-2 py-8'>
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
