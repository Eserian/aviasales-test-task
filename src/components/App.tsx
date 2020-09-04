import React, { useState, FC, useCallback } from 'react';
import './App.css';
import { Header } from './header/Header'
import { Filter } from './filter/Filter'


type flight = {
  origin: string
  destination: string
  date: string
  stops: Array<string>
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

type AppState = {
  tickets: ticket[]
  stops: stopsFilter
}

const App: FC = () => {

  const allTickets: ticket[] = [];

  const initState: AppState = {
    tickets: [],
    stops: {
      0: true,
      1: true,
      2: true,
      3: true,
    }
  }

  const [state, setState] = useState(initState);

  const handleStopsChange = (stops: stopsFilter) => {
    const tickets = allTickets.filter((ticket: ticket) => {
      const stopsFlightForth: string[] = ticket.segments[0].stops;
      const stopsFlightBack: string[] = ticket.segments[1].stops;

      return stops[stopsFlightForth.length] || stops[stopsFlightBack.length];
    });
    setState({ stops, tickets });
  };

  const handleStopsChangeCallback = useCallback(handleStopsChange, [state.stops]);

  return (
    <>
      <Header />
      <main className="main-grid">
        <Filter stops={state.stops} handleStopsChange={handleStopsChangeCallback} />
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
