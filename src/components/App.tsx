import React, { FC, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header } from './Header/Header';
import { Filter } from './Filter/Filter';
import { Sorting } from './Sorting/Sorting';
import { FlightCard } from './FlightCard/FlightCard';
import { Preloader } from './Preloader/Preloader';

type Flight = {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
};

export type Ticket = {
  price: number;
  carrier: string;
  segments: Flight[];
};

type SortingMap = {
  [key: string]: (a: Ticket, b: Ticket) => number;
};

const comparePrice = (a: Ticket, b: Ticket) => a.price - b.price;

const compareFlightDuration = (a: Ticket, b: Ticket) => {
  const firstFlightDuration = a.segments[0].duration + a.segments[1].duration;
  const secondFlightDuration = b.segments[0].duration + b.segments[1].duration;

  return firstFlightDuration - secondFlightDuration;
};

const sortingMap: SortingMap = {
  cheap: comparePrice,
  fast: compareFlightDuration,
};

const API_URL = 'https://front-test.beta.aviasales.ru';

const getSearchId = async () => {
  const url = `${API_URL}/search`;
  const response = await axios.get(url);
  return response.data.searchId;
};

const getTicketPack = async (searchId: string) => {
  const url = `${API_URL}/tickets?searchId=${searchId}`;
  const response = await axios.get(url);
  return response.data;
};

const App: FC = () => {
  const [allTickets, setAllTickets] = useState([] as Ticket[]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState('cheap');
  const [filterParams, setFilterParams] = useState([0, 1, 2, 3]);

  const filter = (ticket: Ticket) => {
    const flightForceStops = ticket.segments[0].stops.length;
    const flightBackStops = ticket.segments[1].stops.length;
    return filterParams.includes(flightForceStops) && filterParams.includes(flightBackStops);
  };

  useEffect(() => {
    type Iter = (searchId: string, acc: Ticket[]) => Promise<Ticket[] | Iter>;

    const loadTickets = async () => {
      const iter: Iter = async (searchId: string, acc: Ticket[]) => {
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
      };

      const searchId = await getSearchId();
      const tickets = await iter(searchId, []);

      setAllTickets(tickets as Ticket[]);
      setIsLoading(false);
    };

    loadTickets();
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <Preloader />
      ) : (
        <main className="flex">
          <Filter handleFilter={setFilterParams} />
          <div className="content">
            <Sorting handleSort={setSort} />
            <div className="ticketList">
              {allTickets
                .filter(filter)
                .sort(sortingMap[sort])
                .slice(0, 5)
                .map((Ticket: Ticket, i) => (
                  <FlightCard key={i} data={Ticket} />
                ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default App;
