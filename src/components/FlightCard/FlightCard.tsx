/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import plural from 'plural-ru';
import { format, addMinutes } from 'date-fns';
import { Ticket } from '../App';
import './ticket.css';

type FlightCardProps = {
  data: Ticket;
};

const getTimeFromMins = (mins: number) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}ч ${minutes}м`;
};

export const FlightCard: FC<FlightCardProps> = ({ data }) => {
  const { price, carrier, segments } = data;
  const url = `//pics.avs.io/99/36/${carrier}.png`;

  return (
    <div className="ticket">
      <header className="ticket-header">
        <div className="ticket-price">{`${price} Р`}</div>
        <div className="ticket-logo">
          <img src={url} alt="logo" />
        </div>
      </header>
      <div className="flight-data">
        {segments.map(({ origin, destination, date, stops, duration }, i) => (
          <div key={i} className="row">
            <div className="container">
              <div className="title">{`${origin}-${destination}`}</div>
              <div className="subtitle">
                {`${format(new Date(date), 'HH:mm')} - ${format(
                  addMinutes(new Date(date), duration),
                  'HH:mm'
                )}`}
              </div>
            </div>
            <div className="container">
              <div className="title">В пути</div>
              <div className="subtitle">{getTimeFromMins(duration)}</div>
            </div>
            <div className="container">
              <div className="title">
                {plural(
                  stops.length,
                  '%d пересадка',
                  '%d пересадки',
                  'Без пересадок'
                )}
              </div>
              <div className="subtitle">{stops.join(',')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
