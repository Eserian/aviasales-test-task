import React from 'react';
import { render } from '@testing-library/react';
import { Ticket } from './Ticket';
import { ticket } from '../App';

const testTicket: ticket = {
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
}

test('Render correctly', () => {
  const ticket = render(<Ticket data={testTicket} />);
  expect(ticket).toMatchSnapshot();
})
