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

const testTickets: ticket[] = [
  {
    price: 93332,
    carrier: "EY",
    segments: [
      {
        origin: "MOW",
        destination: "HKT",
        date: "2020-09-21T05:35:00.000Z",
        stops: ["IST","HKG"],
        duration: 1706
      },
      {
        origin: "HKT",
        destination: "MOW",
        date: "2020-10-11T14:56:00.000Z",
        stops: ["DXB"],
        duration: 681
      }
    ]
  },
  {
    price: 93332,
    carrier: "S7",
    segments: [
      {
        origin: "MOW",
        destination: "HKT",
        date: "2020-09-21T05:35:00.000Z",
        stops: ["IST","HKG"],
        duration: 1706
      },
      {
        origin: "HKT",
        destination: "MOW",
        date: "2020-10-11T14:56:00.000Z",
        stops: ["DXB"],
        duration: 681
      }
    ]
  }
];

const App: FC = () => {

  const [tickets] = useState(testTickets);

  return (
    <>
      <Header />
      <main className="main-grid">
        <Filter />
        <div className="col-8">
          <Sorting />
          <div className="ticketList">
            {tickets.map((ticket: ticket, i) => <Ticket key={i} ticket={ticket} />)}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
