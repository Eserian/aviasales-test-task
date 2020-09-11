import React, { FC }from 'react';
import { ticket } from '../App';
import moment from 'moment';
import './ticket.css';

type FlightCardProps ={
  ticket: ticket
};

const stopsConvertToText = (stops: string[]) => {
  switch (stops.length) {
    case 0:
      return 'Без пересадок';
    case 1:
      return '1 пересадка';
    default:
      return `${stops.length} пересадки`
  } 
};

const getTimeFromMins = (mins: number) => {
  const hours: number = Math.trunc(mins/60);
  const minutes: number = mins % 60;
  return `${hours}ч ${minutes}м`;
};

export const Ticket: FC<FlightCardProps> = ({ ticket }) => {
  return (
    <div className="ticket">
      <header className="ticket-header">
        <div className="ticket-price">{`${ticket.price} Р`}</div>
        <div className="ticket-logo"><img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="logo"/></div>
      </header>
      <div className="flight-data">
        <div className="row">
          <div className="container">
            <div className="title">{`${ticket.segments[0].origin}-${ticket.segments[0].destination}`}</div>
            <div className="subtitle">{`${moment.utc(ticket.segments[0].date).format('HH:mm')} - ${moment.utc(ticket.segments[0].date).add(ticket.segments[0].duration, 'm').format('HH:mm')}`}</div>
          </div>
          <div className="container">
            <div className="title">В пути</div>
            <div className="subtitle">{getTimeFromMins(ticket.segments[0].duration)}</div>
          </div>
          <div className="container">
            <div className="title">{stopsConvertToText(ticket.segments[0].stops)}</div>
            <div className="subtitle">{ticket.segments[0].stops.join(',')}</div>
          </div>
        </div>
        <div className="row">
          <div className="container">
          <div className="title">{`${ticket.segments[1].origin}-${ticket.segments[1].destination}`}</div>
            <div className="subtitle">{`${moment.utc(ticket.segments[1].date).format('HH:mm')} - ${moment.utc(ticket.segments[1].date).add(ticket.segments[1].duration, 'm').format('HH:mm')}`}</div>
          </div>
          <div className="container">
            <div className="title">В пути</div>
            <div className="subtitle">{getTimeFromMins(ticket.segments[1].duration)}</div>
          </div>
          <div className="container">
            <div className="title">{stopsConvertToText(ticket.segments[1].stops)}</div>
            <div className="subtitle">{ticket.segments[1].stops.join(',')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}