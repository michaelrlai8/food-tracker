import React from 'react';
import TrackerEntry from '../components/TrackerEntry';
import axios from 'axios';

const Tracker = ({ history, setHistory, selectedDate }) => {
  const macroStyle = 'w-1/6 pr-6 text-sm';

  return (
    <div className='m-auto max-w-5xl px-5'>
      {history &&
        history.map((entry) => (
          <TrackerEntry
            entry={entry}
            key={`${entry.id} ${entry.date} ${entry.food}`}
            history={history}
            setHistory={setHistory}
            selectedDate={selectedDate}
          />
        ))}

      {history.length > 0 ? (
        <div className='mb-4 rounded-md bg-slate-800 p-4'>
          <div className='text-2xl font-bold'>Total</div>
          <div className='mt-4 flex'>
            <div className={`w-/1 text-green-400 ${macroStyle}`}>
              {`Protein ${history
                .reduce(
                  (accumulator, object) =>
                    accumulator + parseFloat(object.protein),
                  0
                )
                .toFixed(2)} g`}
            </div>
            <div className={`text-blue-400 ${macroStyle}`}>
              {`Carbs ${history
                .reduce(
                  (accumulator, object) =>
                    accumulator + parseFloat(object.carbs),
                  0
                )
                .toFixed(2)} g`}
            </div>
            <div className={`text-red-400 ${macroStyle}`}>
              {`Fat ${history
                .reduce(
                  (accumulator, object) => accumulator + parseFloat(object.fat),
                  0
                )
                .toFixed(2)} g`}
            </div>
            <div className={macroStyle}>
              {`Energy ${history
                .reduce(
                  (accumulator, object) =>
                    accumulator + parseFloat(object.kcal),
                  0
                )
                .toFixed(2)} kcal`}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Tracker;
