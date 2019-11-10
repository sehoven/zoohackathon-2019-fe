import React, { useState } from 'react';
import Confirmation from './pages/Confirmation/Confirmation';
import Celebration from './pages/Celebration/Celebration';
import Landing from './pages/Landing/Landing';
import { AppDiv, Logo } from './App.styles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SearchPage from './pages/SearchPage';

const exampleActivity: activity = {
  location: {
    long: -16.400251,
    lat: 19.942287,
    radius: 1234
  },
  dateRange: {
    startDate: 1572643422,
    endDate: 1574285022
  }
};

function App() {
  return (
    <Router>
      <Logo onClick={() => {window.location.href = '/'}}>NGO Hub</Logo>
      <AppDiv>
        <Switch>
          <Route path='/confirmation/:lat/:long/:radius/:start/:end'><Confirmation /></Route>
          <Route path='/celebration'><Celebration activity={exampleActivity} /></Route>
          <Route path='/search'><SearchPage/></Route>
          <Route path='/'><Landing /></Route>
        </Switch>
      </AppDiv>
    </Router>
  );
}

export default App;
