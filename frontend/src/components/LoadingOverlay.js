import React from 'react';

const LoadingOverlay = ({ loading }) => {
  return (
    loading && (
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div className='rounded-lg bg-white p-5 opacity-75'>
          <div className='mb-4 flex items-center justify-center'>
            <svg
              className='text-primary mr-3 h-6 w-6 animate-spin'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647z'
              ></path>
            </svg>
            <span className='font-bold'>Loading...</span>
          </div>
          <p className='text-center text-sm text-gray-600'>
            Please wait while we fetch the data.
          </p>
        </div>
      </div>
    )
  );
};

export default LoadingOverlay;
