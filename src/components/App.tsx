import React, { FC } from 'react';
import './App.css';
import { Header } from './header/Header'
import { Filter } from './filter/Filter'
import { Sorting } from './sorting/Sorting'

type flight = {
  origin: string
  destination: string
  date: string
  stops: string[]
  duration: number
}

type ticket = {
  price: number
  carrier: string
  segments: flight[]
}

const App: FC = () => {
  return (
    <>
      <Header />
      <main className="main-grid">
        <Filter />
        <div className="col-8">
          <Sorting />
          <div className="tickets">
            <div className="ticket"></div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
