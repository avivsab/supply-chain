import React, {useState} from 'react';
import './App.css';
// import {
//   BrowserRouter as Router,
//   Route
// } from "react-router-dom";
import { Main } from './components/Main'
import { Alerts } from './components/Alerts'

const initialWarehouses = [
  { name: 'north', active: false, useCase: 'normal data' },
  { name: 'west', active: false, useCase: 'big numbers data' },
  { name: 'east', active: false, useCase: 'violate contract properties' },
  { name: 'south', active: false, useCase: 'duplicate data' }
]
function App() {
  const [mimicRoute, setMimicRoute] = useState('base');
  return (
    <div className="App">
     { mimicRoute==='base' && <Main initialWarehouses={initialWarehouses} passVirtulRoute={setMimicRoute} currentRoute={mimicRoute} /> }
     { mimicRoute==='alerts' && <Alerts initialWarehouses={initialWarehouses} passVirtulRoute={setMimicRoute} currentRoute={mimicRoute}/> }     
    </div>
  );
}

export default App;
