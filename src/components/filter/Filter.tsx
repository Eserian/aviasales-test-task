import React, { FC }from 'react';
import './filter.css';
import { Checkbox } from '../checkbox/Checkbox';
import { stopsFilter } from '../App'

type FilterProps = {
  stops: stopsFilter
  handleStopsChange: (stops: stopsFilter) => void
}

type labelMapType = {
  [key: number]: string
}

const labelMap: labelMapType = {
  0: "Без пересадок",
  1: "1 пересадка",
  2: "2 пересадки",
  3: "3 пересадки"
}

export const Filter: FC<FilterProps> = ({ stops, handleStopsChange }) => {

  const createToggleHandle = (stops: stopsFilter, handleStopsChange: (stops: stopsFilter) => void ) => (e: any) => {
    const stopType: string = e.target.dataset.type;
    const isChecked: boolean = e.target.checked;
  
    if (stopType === 'all') {
      const newStops: stopsFilter = {
        0: isChecked,
        1: isChecked,
        2: isChecked,
        3: isChecked,
      }
      handleStopsChange(newStops);
      return;
    }

    const newStops: stopsFilter = { ...stops };
    newStops[stopType] = isChecked;
    handleStopsChange(newStops);
  };

  const isAllChecked: boolean = Object.values(stops).every(v => v);

  return (
    <aside className="filter col-4">
      <div className="filter-header">Количество пересадок</div>
      <div className="checkbox-list">
        <Checkbox
          label="Все"
          stopType={'all'}
          isChecked={isAllChecked}
          onToggle={createToggleHandle(stops, handleStopsChange)}
        />
        {
          Object.values(stops).map((value, i) => (
            <Checkbox
            key={i}
            label={labelMap[i]}
            stopType={`${i}`}
            isChecked={value}
            onToggle={createToggleHandle(stops, handleStopsChange)}
            />
          ))
        }
      </div>
    </aside>
  )
};
