import cn from 'classnames'
import React, { FC, useState, useCallback }from 'react';
import './sorting.css';

export const Sorting: FC = () => {

  const [sortType, setSortType] = useState('cheap');

  const leftTabClass = cn('tab', 'left-tab', {
    active: sortType === 'cheap'
  })

  const rightTabClass = cn('tab', 'right-tab', {
    active: sortType === 'fast'
  })

  const handleClick = useCallback((e: any) => {
    const sortName: string = e.target.dataset.sortname;
    setSortType(sortName);
  }, []);

  return (
    <div className="tabs">
      <div
        className={leftTabClass}
        onClick={handleClick}
        data-sortname="cheap"
      >Самый дешевый</div>
      <div
        className={rightTabClass}
        onClick={handleClick}
        data-sortname="fast"
      >Самый быстрый</div>
    </div>
  )
}