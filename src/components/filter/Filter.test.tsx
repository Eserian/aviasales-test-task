import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Filter } from './Filter';

type stopsFilter = {
  [key: string]: boolean
}

let stops: stopsFilter = {
  0: true,
  1: true,
  2: true,
  3: true,
}

const handleStopsChange = (e: any) => {
  const stopType: string = e.target.dataset.type;
  const isChecked: boolean = e.target.checked;

  if (stopType === 'all') {
    const newStops: stopsFilter = {
      0: isChecked,
      1: isChecked,
      2: isChecked,
      3: isChecked,
    }
    stops = { ...newStops };
    return;
  }

  const newStops: stopsFilter = { ...stops, [stopType]: isChecked };
  stops = { ...newStops };
};

test('Checkboxes works correctly', () => {
  const { getByLabelText, rerender, getAllByRole  } = render(<Filter stops={stops} handleStopsChange={handleStopsChange} />);

  const checkboxTypeAll = getByLabelText('Все');
  expect(checkboxTypeAll).toBeChecked();

  fireEvent.click(checkboxTypeAll);
  rerender(<Filter stops={stops} handleStopsChange={handleStopsChange} />)

  const checkboxes = getAllByRole('checkbox');
  checkboxes.forEach((c) => expect(c).not.toBeChecked())
});
