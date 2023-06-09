import React from 'react';
import TrackerEntry from '../components/TrackerEntry';

const Tracker = ({ history, setHistory }) => {
  return (
    <div className='m-auto max-w-5xl px-5'>
      {history &&
        history.map((entry) => (
          <TrackerEntry
            entry={entry}
            key={(entry.id, entry.food)}
            setHistory={setHistory}
          />
        ))}
    </div>
  );
};

export default Tracker;
