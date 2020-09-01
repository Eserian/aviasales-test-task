import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="container">
      <header className="header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="grid-12">
        <div className="filter col-4"></div>
        <div className="col-8">
          <div className="tabs"></div>
          <div className="tickets">
            <div className="ticket"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
