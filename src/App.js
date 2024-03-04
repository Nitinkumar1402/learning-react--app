import React from 'react';
import './App.css';
import Add from './Add';
import Count from './Count';
import Update from './Update';

const App = () => {
  return (
    <div className="app">
      <div className="component-container">
        <Add />
        <Update />
      </div>
        <Count />
    </div>
  );
};

export default App;
