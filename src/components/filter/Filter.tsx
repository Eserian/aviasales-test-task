import React, { FC, useState, useCallback }from 'react';
import './filter.css';
import { Checkbox } from '../checkbox/Checkbox';

type stop = { label: string, type: string, checked: boolean };

export const Filter: FC = () => {

  const initStops: stop[] = [
    { label: 'Все', type: 'all', checked: true },
    { label: 'Без пересадок', type: '1', checked: true },
    { label: '1 пересадка', type: '2', checked: true },
    { label: '2 пересадки', type: '3', checked: true },
    { label: '3 пересадки', type: '4', checked: true }
  ];

  const [stops, setStops] = useState(initStops);

  const handleStopsChange = useCallback((e: any) => {
    const stopType: string = e.target.dataset.type;
    const isChecked: boolean = e.target.checked;

    if (stopType === 'all') {
      const newStops: stop[] = [...stops.map((s) => ({ ...s, checked: isChecked }))];
      setStops(newStops);
      return;
    }

    const newStops: stop[] = [...stops];
    newStops[+stopType] = { ...newStops[+stopType], checked: isChecked };
    const isAllChecked: boolean = newStops.filter(({ type }) => type !== 'all').every(({ checked }) => checked);
    newStops[0] = { ...newStops[0], checked: isAllChecked };
    setStops(newStops);
    
  }, [stops]);

  return (
    <aside className="filter col-4">
      <div className="filter-header">Количество пересадок</div>
      <div className="checkbox-list">
        {
          stops.map(({ label, type, checked }, i) => (
            <Checkbox
              key={i}
              label={label}
              stopType={type}
              isChecked={checked}
              onChange={handleStopsChange}
            />
          ))
        }
      </div>
    </aside>
  )
};
