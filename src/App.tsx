import React from 'react';
// import Confirmation from './pages/Confirmation/Confirmation';
import Celebration from './pages/Celebration/Celebration';
import { AppDiv } from './App.styles';

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
    <AppDiv>
      <Celebration event={exampleEvent}/>
    </AppDiv>
  );
}

export default App;
