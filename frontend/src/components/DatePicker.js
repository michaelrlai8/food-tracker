import React, { useState } from 'react';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleBackButtonClick = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(previousDay);
  };

  const handleForwardButtonClick = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
  };

  return (
    <div className='text-center text-lg'>
      <button onClick={handleBackButtonClick} className='bg-orange-700'>
        Back
      </button>
      <span>{selectedDate.toDateString()}</span>
      <button onClick={handleForwardButtonClick} className='bg-orange-700'>
        Forward
      </button>
    </div>
  );
};

export default DatePicker;
