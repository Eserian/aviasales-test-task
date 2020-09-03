import React, { FunctionComponent }from 'react';
import './filter.css';
import { Checkbox } from '../checkbox/Checkbox';
import { stopsFilterType } from '../App'

type FilterProps = {
    stops: stopsFilterType
    handleStopsChange: (stops: stopsFilterType) => void
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

export const Filter: FunctionComponent<FilterProps> = ({ stops, handleStopsChange }) => {

    const onToggleHandle = (stops: stopsFilterType, handleStopsChange: (stops: stopsFilterType) => void ) => (e: any) => {
        const stopType: number = +e.target.dataset.type;
        const isChecked: boolean = e.target.checked;
        
        if (stopType === -1) { 
            const newStops: stopsFilterType = {
                0: isChecked,
                1: isChecked,
                2: isChecked,
                3: isChecked,
            }
            handleStopsChange(newStops);
            return; 
        }

        const newStops: stopsFilterType = { ...stops };
        newStops[stopType] = isChecked;
        handleStopsChange(newStops);
    };

    const isAllChecked: boolean = Object.values(stops).every(v => v);

    return (
        <aside className="filter col-4">
            <div className="filter-header">Количество пересадок</div>
            <div className="checkbox-list">
                <Checkbox label="Все" stopType={-1} isChecked={isAllChecked} onToggle={onToggleHandle(stops, handleStopsChange)} />
                {
                    Object.values(stops).map((value, i) => {
                        return <Checkbox key={i} label={labelMap[i]} stopType={i} isChecked={value} onToggle={onToggleHandle(stops, handleStopsChange)} />
                    })
                }
            </div>
        </aside>
    )
};
