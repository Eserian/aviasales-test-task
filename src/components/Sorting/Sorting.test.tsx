import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Sorting } from './Sorting';

test('Sorting click', () => {
  const { getByText } = render(<Sorting handleSort={() => {}} />);

  const leftTab = getByText('Самый дешевый');
  const rightTab = getByText('Самый быстрый');

  expect(leftTab).toHaveClass('active');
  expect(rightTab).not.toHaveClass('active');

  fireEvent.click(rightTab);

  expect(leftTab).not.toHaveClass('active');
  expect(rightTab).toHaveClass('active');
})