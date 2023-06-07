import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Tracker from './pages/Tracker';
import { useState } from 'react';

function App() {
  const [selectedFood, setSelectedFood] = useState({});

  return (
    <div className='App h-screen bg-slate-900 '>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/search'
          element={
            <Search
              selectedFood={selectedFood}
              setSelectedFood={setSelectedFood}
            />
          }
        />
        <Route path='/tracker' element={<Tracker />} />
      </Routes>
    </div>
  );
}

export default App;
