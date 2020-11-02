import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { Main } from './components/Main'
import { Alerts } from './components/Alerts'

function App() {
  return (
    <div className="App">
      <Router>
      <Route path="/" exact component={Main} />
      <Route path="/alerts" exact component={Alerts} />
      </Router>
    </div>
  );
}

export default App;
