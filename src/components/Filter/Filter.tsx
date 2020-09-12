import React, { FC, useState, useCallback }from 'react';
import './filter.css';
import { Checkbox } from '../Checkbox/Checkbox';

type stops = {
  [key: string] : { label: string,  checked: boolean, filterParam: number }
};

type filterProps = {
  handleFilter: (filterParams: number[]) => void
}

export const Filter: FC<filterProps> = ({handleFilter}) => {

  const initStops: stops = {
    'all': { label: 'Все', checked: true, filterParam: -1 },
    'without stops': { label: 'Без пересадок', checked: true, filterParam: 0 },
    'one stop': { label: '1 пересадка', checked: true, filterParam: 1 },
    'two stops': { label: '2 пересадки', checked: true, filterParam: 2 },
    'three stops': { label: '3 пересадки', checked: true, filterParam: 3 }
  };

  const [stops, setStops] = useState(initStops);

  const handleStopsChange = useCallback((e: any) => {
    const stopType: string = e.target.dataset.type;
    const isChecked: boolean = e.target.checked;
    
    if (stopType === 'all') {
      setStops(Object.entries(stops).reduce((acc, [key, value]) => ({ ...acc, [key]: { ...value, checked: isChecked } }), {}));
      handleFilter(isChecked ? [0, 1, 2, 3] : []);
      return;
    }

    const newStops = { ...stops, [stopType]: { ...stops[stopType], checked: isChecked }}
    const isAllFieldsChecked: boolean = Object.entries(newStops).filter(([key, ]) => key !== 'all').every(([, { checked }]) => checked);
    newStops['all'] = { ...newStops['all'], checked: isAllFieldsChecked };
    setStops(newStops);
    handleFilter(Object.keys(newStops).filter((key) => newStops[key].checked).map((key) => newStops[key].filterParam));
  }, [handleFilter, stops]);

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
