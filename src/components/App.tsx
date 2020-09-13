import React, { FC, useEffect, useState } from 'react';
import './App.css';
import { Header } from './Header/Header';
import { Filter } from './Filter/Filter';
import { Sorting } from './Sorting/Sorting';
import { Ticket } from './Ticket/Ticket';
import { Preload } from './Preload/Preload';
import axios from 'axios';

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

type sortingMap = {
  [key: string]: (a: ticket, b: ticket) => number
}

const comparePrice = (a: ticket, b: ticket) => a.price - b.price;

const copmareFlightDuration = (a: ticket, b: ticket) => {
  const firstFlightDuration = a.segments[0].duration + a.segments[1].duration;
  const secondFlightDuration = b.segments[0].duration + b.segments[1].duration;

  return firstFlightDuration - secondFlightDuration;
}

const sortingMap: sortingMap = {
  'cheap': comparePrice,
  'fast': copmareFlightDuration
}

const getSearchId = async () => {
  const url = "https://front-test.beta.aviasales.ru/search";
  const response = await axios.get(url);
  return response.data.searchId;
}

const getTicketPack = async (searchId: string) => {
  const url = `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`;
  const response = await axios.get(url);
  return response.data;
}

const App: FC = () => {

  const [allTickets, setAllTickets] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [sort, setSort] = useState('cheap');
  const [filterParams, setFilterParams] = useState([0, 1, 2, 3]);

  useEffect(() => {
    const loadTicket = async () => {
      const iter: any = async (searchId: string, acc: ticket[]) => {
        try {
          const ticketPack = await getTicketPack(searchId);
          const newAcc = [...acc, ...ticketPack.tickets];
          if (ticketPack.stop) {
            return newAcc;
          }
          return iter(searchId, newAcc);
        } catch (e) {
          return iter(searchId, acc);
        }
      }

      const searchId = await getSearchId();
      const tickets = await iter(searchId, []);

      setAllTickets(tickets);
      setIsLoad(false);
    }
    loadTicket();
  }, []);

  return (
    <>
      <Header />
      {
        isLoad ?
          <Preload /> :
          <main className="main-grid">
            <Filter handleFilter={setFilterParams} />
            <div className="col-8">
              <Sorting handleSort={setSort} />
              <div className="ticketList">
                {
                  allTickets
                    .filter((ticket: ticket) => {
                      const flightForceStops = ticket.segments[0].stops.length;
                      const flightBackStops = ticket.segments[1].stops.length;
                      return filterParams.includes(flightForceStops) && filterParams.includes(flightBackStops);
                    })
                    .sort(sortingMap[sort])
                    .slice(0, 5)
                    .map((ticket: ticket, i) => <Ticket key={i} data={ticket} />)
                }
              </div> 
            </div>
          </main>
      }
    </>
  );
}

export default App;
