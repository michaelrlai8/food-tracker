import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='mt-20'>
      <h1 className='text-center text-7xl font-extrabold text-slate-100'>
        Track all your macros
      </h1>
      <div className='mt-12 text-center text-slate-400'>
        And reach your fitness goals faster.
      </div>
      <div className='mt-12 flex justify-center'>
        <Link to='/search'>
          <button className='rounded-md bg-orange-700 px-5 py-2 hover:bg-orange-600'>
            Get started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
