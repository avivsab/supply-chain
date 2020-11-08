import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { Main } from './components/Main'
import { Alerts } from './components/Alerts'
const initialWarehouses = [
  { name: 'north', active: false, useCase: 'normal data' },
  { name: 'west', active: false, useCase: 'big numbers data' },
  { name: 'east', active: false, useCase: 'violate contract properties' },
  { name: 'south', active: false, useCase: 'duplicate data' }
]
function App() {
  return (
    <div className="App">
      <Router basename="/supply-chain">
      <Route path="/" exact render={() => <Main initialWarehouses={initialWarehouses} />}  />
      <Route path="/alerts" exact render={() => <Alerts initialWarehouses={initialWarehouses} />} />
      </Router>
    </div>
  );
}

export default App;
