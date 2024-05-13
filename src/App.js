import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Personal from './components/Personal';
import Sweat from './components/Sweat';

function App() {

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (selectedDateNav) => {
    setSelectedDate(selectedDateNav);
  };

  return (
    <div>
        <Header onDateChange={handleDateChange} />
        <Personal selectedDate={selectedDate}/>
        <Sweat />
    </div>
  );
}

export default App;
