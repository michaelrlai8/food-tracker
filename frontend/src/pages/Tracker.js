import React from 'react';
import TrackerEntry from '../components/TrackerEntry';

const Tracker = ({ history, setHistory, selectedDate }) => {
  const macroStyle = 'w-1/6 pr-6 text-sm text-lg font-semibold';

  return (
    <div className='m-auto max-w-5xl px-5'>
      {history.length > 0 ? (
        <div className='mb-4 rounded-md bg-slate-800 p-4'>
          <div className='text-2xl font-bold'>Daily Total</div>
          <div className='mt-4 flex'>
            <div className={`w-/1 text-green-400 ${macroStyle}`}>
              {`Protein ${history
                .reduce(
                  (accumulator, object) =>
                    accumulator +
                    parseFloat(object.protein * (object.amount / 100)),
                  0
                )
                .toFixed(2)} g`}
            </div>
            <div className={`text-blue-400 ${macroStyle}`}>
              {`Carbs ${history
                .reduce(
                  (accumulator, object) =>
                    accumulator +
                    parseFloat(object.carbs * (object.amount / 100)),
                  0
                )
                .toFixed(2)} g`}
            </div>
            <div className={`text-red-400 ${macroStyle}`}>
              {`Fat ${history
                .reduce(
                  (accumulator, object) =>
                    accumulator +
                    parseFloat(object.fat * (object.amount / 100)),
                  0
                )
                .toFixed(2)} g`}
            </div>
            <div className='w-1/4 pr-6 text-lg text-sm font-semibold'>
              {`Energy ${history
                .reduce(
                  (accumulator, object) =>
                    accumulator +
                    parseFloat(object.kcal * (object.amount / 100)),
                  0
                )
                .toFixed(2)} kcal`}
            </div>
          </div>
        </div>
      ) : null}

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
    </div>
  );
};

export default Tracker;
