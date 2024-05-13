import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Personal from './components/Personal';
import Sweat from './components/Sweat';
import Work from './components/Work';

function App() {

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (selectedDateNav) => {
    setSelectedDate(selectedDateNav);
  };

  return (
    <div>
        <Header onDateChange={handleDateChange} />
        <div className="container-fluid">
          <div className='row'>
            <div className='col-sm column'>
              <Personal selectedDate={selectedDate}/>
            </div>
            <div className='col-sm column'>
              <Sweat />
            </div>
            <div className='col-sm column'>
              <Work />
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
