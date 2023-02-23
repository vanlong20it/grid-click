import React from 'react';

const GridItem = ({ index, onClick }) => {
  const handleClickItem = () => {
    onClick(index);
  }

  return (
    <div className="grid-item" onClick={handleClickItem}>

    </div>
  );
};

export default GridItem;