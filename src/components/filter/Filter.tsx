import React, { FC, SyntheticEvent }from 'react';
import './filter.css';
import { Checkbox } from '../checkbox/Checkbox';
import { stopsFilter } from '../App'

type FilterProps = {
  stops: stopsFilter
  handleStopsChange: (e: SyntheticEvent) => void
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

  const isAllChecked: boolean = Object.values(stops).every(v => v);
  return (
    <aside className="filter col-4">
      <div className="filter-header">Количество пересадок</div>
      <div className="checkbox-list">
        <Checkbox
          label='Все'
          stopType='all'
          isChecked={isAllChecked}
          onChange={handleStopsChange}
        />
        {
          Object.values(stops).map((value, i) => (
            <Checkbox
              key={i}
              label={labelMap[i]}
              stopType={`${i}`}
              isChecked={value}
              onChange={handleStopsChange}
            />
          ))
        }
      </div>
    </aside>
  )
};
