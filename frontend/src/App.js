import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Tracker from './pages/Tracker';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFood, setSelectedFood] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const [food, setFood] = useState();
  const [amount, setAmount] = useState(100);
  const [protein, setProtein] = useState();
  const [carbs, setCarbs] = useState();
  const [fat, setFat] = useState();
  const [kcal, setKcal] = useState();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const response = await axios.get('http://localhost:3500/history');
      console.log(response.data);
      setHistory(response.data);
    };
    getHistory();
    console.log('first get');
  }, []);

  return (
    <div className='App scrollbar-track-transparent h-screen overflow-y-scroll bg-slate-950'>
      <NavBar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/search'
          element={
            <Search
              selectedFood={selectedFood}
              setSelectedFood={setSelectedFood}
              food={food}
              protein={protein}
              carbs={carbs}
              fat={fat}
              setFood={setFood}
              setProtein={setProtein}
              setCarbs={setCarbs}
              setFat={setFat}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              amount={amount}
              setAmount={setAmount}
              kcal={kcal}
              setKcal={setKcal}
              selectedDate={selectedDate}
              history={history}
              setHistory={setHistory}
            />
          }
        />
        <Route
          path='/tracker'
          element={<Tracker history={history} setHistory={setHistory} />}
        />
      </Routes>
    </div>
  );
}

export default App;
