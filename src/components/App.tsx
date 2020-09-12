import React, { FC, useState } from 'react';
import './App.css';
import { Header } from './Header/Header';
import { Filter } from './Filter/Filter';
import { Sorting } from './Sorting/Sorting';
import { Ticket } from './Ticket/Ticket';

type flight = {
  origin: string
  destination: string
  date: string
  stops: string[]
  duration: number
}

export type ticket = {
  price: number
  carrier: string
  segments: flight[]
}

const App: FC = () => {

  const [tickets] = useState([]);

  return (
    <>
      <Header />
      <main className="main-grid">
        <Filter />
        <div className="col-8">
          <Sorting />
          <div className="ticketList">
            {tickets.map((ticket: ticket, i) => <Ticket key={i} data={ticket} />)}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
