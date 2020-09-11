import React, { FC, useState, useCallback }from 'react';
import './filter.css';
import { Checkbox } from '../Checkbox/Checkbox';

type stops = { [key: string] : { label: string,  checked: boolean }};

export const Filter: FC = () => {

  const initStops: stops = {
    'all': { label: 'Все', checked: true },
    'without stops': { label: 'Без пересадок', checked: true },
    'one stop': { label: '1 пересадка', checked: true },
    'two stops': { label: '2 пересадки', checked: true },
    'three stops': { label: '3 пересадки', checked: true }
  };

  const [stops, setStops] = useState(initStops);

  const handleStopsChange = useCallback((e: any) => {
    const stopType: string = e.target.dataset.type;
    const isChecked: boolean = e.target.checked;
    
    if (stopType === 'all') {
      setStops(Object.entries(stops).reduce((acc, [key, value]) => ({ ...acc, [key]: { ...value, checked: isChecked } }), {}));
      return;
    }

    const newStops = { ...stops, [stopType]: { ...stops[stopType], checked: isChecked }}
    const isAllFieldsChecked: boolean = Object.entries(newStops).filter(([key, ]) => key !== 'all').every(([, { checked }]) => checked);
    newStops['all'] = { ...newStops['all'], checked: isAllFieldsChecked };
    setStops(newStops);
  }, [stops]);

  return (
    <aside className="filter col-4">
      <div className="filter-header">Количество пересадок</div>
      <div className="checkbox-list">
        {
          Object.entries(stops).map(([key, { label, checked }], i) => (
            <Checkbox
              key={i}
              label={label}
              stopType={key}
              isChecked={checked}
              onChange={handleStopsChange}
            />
          ))
        }
      </div>
    </aside>
  )
};
