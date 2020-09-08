import React from 'react';
import { render } from '@testing-library/react';
import { Filter } from './Filter';

test('render correctly', () => {
  const handleStopsChange = () => {};
  const stops = {
    0: true,
    1: true,
    2: true,
    3: true,
  };

  const filter = render(<Filter stops={stops} handleStopsChange={handleStopsChange} />);
  expect(filter).toMatchSnapshot();
});
