import React from 'react';
// import Confirmation from './pages/Confirmation/Confirmation';
// import Celebration from './pages/Celebration/Celebration';
import Landing from './pages/Landing/Landing';
import { AppDiv, Logo } from './App.styles';

// const exampleActivity: activity = {
//   location: {
//     long: -16.400251,
//     lat: 19.942287,
//     radius: 1000
//   },
//   dateRange: {
//     startDate: 1572643422,
//     endDate: 1574285022
//   }
// };

function App() {
  return (
    <div>
      <Logo>NGO Underground</Logo>
      <AppDiv>
        <Landing />
        {/* <Confirmation activity={exampleActivity} /> */}
      </AppDiv>
    </div>
  );
}

export default App;
