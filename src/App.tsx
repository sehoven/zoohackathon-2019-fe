import React from 'react';
import Confirmation from './pages/Confirmation/Confirmation';

const exampleEvent: event = {
  location: {
    long: -16.400251,
    lat: 19.942287,
    radius: 1000
  },
  dateRange: {
    startDate: 1572643422,
    endDate: 1574285022
  }
};

function App() {
  return (
    <div className="App">
      <Confirmation event={exampleEvent}/>
    </div>
  );
}

export default App;
