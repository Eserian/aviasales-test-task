import cn from 'classnames';
import React, { FC, useState, useCallback } from 'react';
import './sorting.css';

type SortingProps = {
  handleSort: (sortType: string) => void;
};

export const Sorting: FC<SortingProps> = ({ handleSort }) => {
  const [sortType, setSortType] = useState('cheap');

  const leftTabClass = cn('tab', 'left-tab', {
    active: sortType === 'cheap',
  });

  const rightTabClass = cn('tab', 'right-tab', {
    active: sortType === 'fast',
  });

  const handleClick = useCallback((e: React.SyntheticEvent<HTMLDivElement>) => {
    const sortName = (e.target as HTMLDivElement).dataset.sortname;
    setSortType(sortName as string);
    handleSort(sortName as string);
  },
  [handleSort]
  );

  return (
    <div className="tabs">
      <div className={leftTabClass} onClick={handleClick} data-sortname="cheap">
        Самый дешевый
      </div>
      <div className={rightTabClass} onClick={handleClick} data-sortname="fast">
        Самый быстрый
      </div>
    </div>
  );
};
