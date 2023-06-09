import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const handlePreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(previousDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const handlePreviousMonth = () => {
    const previousMonth = new Date(selectedDate);
    previousMonth.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(selectedDate);
    nextMonth.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(nextMonth);
  };

  const handleCurrentDate = () => {
    setSelectedDate(new Date());
  };

  const buttonStyle = 'rounded-md text-3xl text-orange-600 hover:bg-slate-800';

  return (
    <div className='flex items-center gap-2'>
      <button onClick={handlePreviousMonth}>
        <MdKeyboardDoubleArrowLeft className='rounded-md text-3xl text-orange-600 hover:bg-slate-800' />
      </button>
      <button onClick={handlePreviousDay}>
        <MdKeyboardArrowLeft className={buttonStyle} />
      </button>
      <div
        className='w-48 cursor-pointer rounded-md py-1 text-center text-base hover:bg-slate-800'
        onClick={handleCurrentDate}
      >
        {selectedDate.toDateString()}
      </div>
      <button onClick={handleNextDay}>
        <MdKeyboardArrowRight className={buttonStyle} />
      </button>
      <button onClick={handleNextMonth}>
        <MdKeyboardDoubleArrowRight className={buttonStyle} />
      </button>
    </div>
  );
};

export default DatePicker;
