import React from 'react';
import { render } from '@testing-library/react';
import { Filter } from './Filter';

test('renders without crashing', () => {
  const handleStopsChange = () => {};
  const stops = {};

  render(<Filter stops={stops} handleStopsChange={handleStopsChange} />);
});
