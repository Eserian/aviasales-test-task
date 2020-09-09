import React, { useState, FC, useCallback } from 'react';
import './App.css';
import { Header } from './header/Header'
import { Filter } from './filter/Filter'


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

export type stopsFilter = {
  [key: string]: boolean
}

const App: FC = () => {

  const initStops: stopsFilter = {
    0: true,
    1: true,
    2: true,
    3: true,
  }

  const [stops, setStops] = useState(initStops);

  const handleStopsChange = useCallback((e: any) => {
    const stopType: string = e.target.dataset.type;
    const isChecked: boolean = e.target.checked;

    if (stopType === 'all') {
      const newStops: stopsFilter = {
        0: isChecked,
        1: isChecked,
        2: isChecked,
        3: isChecked,
      }
      setStops(newStops);
      return;
    }

    const newStops: stopsFilter = { ...stops, [stopType]: isChecked };
    setStops(newStops);
  }, [stops]);

  return (
    <>
      <Header />
      <main className="main-grid">
        <Filter stops={stops} handleStopsChange={handleStopsChange} />
        <div className="col-8">
          <div className="tabs"></div>
          <div className="tickets">
            <div className="ticket"></div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
