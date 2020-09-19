import React from 'react';
import { render } from '@testing-library/react';
import { FlightCard } from './FlightCard';
import { Ticket } from '../App';

const testTicket: Ticket = {
  price: 93332,
  carrier: 'EY',
  segments: [
    {
      origin: 'MOW',
      destination: 'HKT',
      date: '2020-09-21T05:35:00',
      stops: ['IST', 'HKG'],
      duration: 1706,
    },
    {
      origin: 'HKT',
      destination: 'MOW',
      date: '2020-10-11T14:56:00',
      stops: ['DXB'],
      duration: 681,
    },
  ],
};

test('Render correctly', () => {
  const ticket = render(<FlightCard data={testTicket} />);
  expect(ticket).toMatchSnapshot();
});
