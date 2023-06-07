import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Tracker from './pages/Tracker';
import { useState } from 'react';

function App() {
  const [selectedFood, setSelectedFood] = useState({});
  const [protein, setProtein] = useState();
  const [carbs, setCarbs] = useState();
  const [fat, setFat] = useState();

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
              protein={protein}
              carbs={carbs}
              fat={fat}
              setProtein={setProtein}
              setCarbs={setCarbs}
              setFat={setFat}
            />
          }
        />
        <Route path='/tracker' element={<Tracker />} />
      </Routes>
    </div>
  );
}

export default App;
