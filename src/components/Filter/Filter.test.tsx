import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Filter } from './Filter';

beforeEach(() => {
  render(<Filter handleFilter={() => {}} />);
});

test('Checkbox check/uncheck', () => {
  const checkbox = screen.getByLabelText('Без пересадок');
  expect(checkbox).toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

test('Checkbox "All" works correctly', () => {
  const checkboxAll = screen.getByLabelText('Все');
  const checkboxes = screen.getAllByRole('checkbox');
  checkboxes.forEach((c) => expect(c).toBeChecked());
  fireEvent.click(checkboxAll);
  checkboxes.forEach((c) => expect(c).not.toBeChecked());
});
