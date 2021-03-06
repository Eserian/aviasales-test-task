import React, { FC, useState, useCallback } from 'react';
import './filter.css';
import { Checkbox } from '../Checkbox/Checkbox';

type Stops = {
  [key: string]: { label: string; checked: boolean; filterParam: number };
};

type FilterProps = {
  handleFilter: (filterParams: number[]) => void;
};

export const Filter: FC<FilterProps> = ({ handleFilter }) => {
  const initStops: Stops = {
    all: { label: 'Все', checked: true, filterParam: -1 },
    'without stops': { label: 'Без пересадок', checked: true, filterParam: 0 },
    'one stop': { label: '1 пересадка', checked: true, filterParam: 1 },
    'two stops': { label: '2 пересадки', checked: true, filterParam: 2 },
    'three stops': { label: '3 пересадки', checked: true, filterParam: 3 },
  };

  const [stops, setStops] = useState(initStops);

  const handleStopsChange = useCallback((e: React.SyntheticEvent<HTMLInputElement>) => {
    const stopType = (e.target as HTMLInputElement).dataset.type;
    const isChecked = (e.target as HTMLInputElement).checked;

    if (stopType === 'all') {
      setStops(
        Object.entries(stops).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: { ...value, checked: isChecked },
          }),
          {}
        )
      );
      handleFilter(isChecked ? [0, 1, 2, 3] : []);
      return;
    }

    const newStops = {
      ...stops,
      [stopType as string]: {
        ...stops[stopType as string],
        checked: isChecked,
      },
    };
    const isAllFieldsChecked: boolean = Object.entries(newStops)
      .filter(([key]) => key !== 'all')
      .every(([, { checked }]) => checked);
    newStops.all = { ...newStops.all, checked: isAllFieldsChecked };
    setStops(newStops);
    handleFilter(
      Object.keys(newStops)
        .filter((key) => newStops[key].checked)
        .map((key) => newStops[key].filterParam)
    );
  },
  [handleFilter, stops]
  );

  return (
    <aside className="filter">
      <div className="filter-header">Количество пересадок</div>
      <div className="checkbox-list">
        {Object.entries(stops)
          .sort(([, a], [, b]) => a.filterParam - b.filterParam)
          .map(([key, { label, checked }], i) => (
            <Checkbox
              key={i}
              label={label}
              stopType={key}
              isChecked={checked}
              onChange={handleStopsChange}
            />
          ))}
      </div>
    </aside>
  );
};
