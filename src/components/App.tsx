import React, { FC, useCallback, useEffect, useState } from 'react';
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

const comparePrice = (a: ticket, b: ticket) => a.price - b.price;

const copmareFlightDuration = (a: ticket, b: ticket) => {
  const firstFlightDuration = a.segments[0].duration + a.segments[1].duration;
  const secondFlightDuration = b.segments[0].duration + b.segments[1].duration;

  return firstFlightDuration - secondFlightDuration;
}

type sortingMap = {
  [key: string]: (a: ticket, b: ticket) => number
}

const sortingMap: sortingMap = {
  'cheap': comparePrice,
  'fast': copmareFlightDuration
}

const getSearchId = async () => {
  const raw = await axios.get("https://front-test.beta.aviasales.ru/search");
  return raw.data.searchId;
}

const getTicketPack = async (searchId: string) => {
  const raw = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
  return raw.data;
}

const App: FC = () => {

  const [allTickets, setAllTickets] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [sort, setSort] = useState('cheap');
  const [filterParams, setFilterParams] = useState([0, 1, 2, 3]);

  const handleSort = useCallback(((sortType: string) => setSort(sortType)), []);
  const handleFilter = useCallback(((filterParams: (number)[]) => setFilterParams(filterParams)), []);

  useEffect(() => {
    const loadTicket = async () => {
      const iter: any = async (sId: string, acc: any) => {
        try {
          const ticketPack: any = await getTicketPack(searchId);
          const newAcc: any = [...acc, ...ticketPack.tickets];
          if (ticketPack.stop) {
            return newAcc;
          }
          return iter(sId, newAcc);
        } catch (e) {
          return iter(sId, acc);
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
      <main className="main-grid">
        <Filter handleFilter={handleFilter} />
        <div className="col-8">
          <Sorting handleSort={handleSort} />
          {
            isLoad ?
              <Preload /> :
              <div className="ticketList">
                {
                  allTickets
                    .filter((ticket: ticket) => {
                      const flightForceStops: number = ticket.segments[0].stops.length;
                      const flightBackStops: number = ticket.segments[1].stops.length;
                      return filterParams.includes(flightForceStops) && filterParams.includes(flightBackStops);
                    })
                    .sort(sortingMap[sort])
                    .slice(0, 5)
                    .map((ticket: ticket, i) => <Ticket key={i} ticket={ticket} />)
                }
              </div>
          }
        </div>
      </main>
    </>
  );
}

export default App;
