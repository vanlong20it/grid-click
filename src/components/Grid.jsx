import React, { useEffect, useState } from 'react';
import GridItem from './GridItem';
import anime from 'animejs';
import { COLORS } from '../enums/colors';
import { WIDTH_ITEM } from '../enums/common';

const Grid = () => {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [titles, setTitles] = useState([]);
  const [currentColor, setCurrenColor] = useState(0)
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const c = Math.floor(window.innerWidth / WIDTH_ITEM);
      const r = Math.floor(window.innerHeight / WIDTH_ITEM)
      setTitles(Array.from({ length: c * r }, (v, k) => k))
      setColumns(c);
      setRows(r)
    }

    handleResize();

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleClick = (index) => {
    setToggle((prev) => !prev);
    setCurrenColor((prev) => {
      if (prev === COLORS.length) {
        return 0;
      }
      return prev + 1
    });
    anime({
      targets: ".grid-item", backgroundColor: COLORS[currentColor],
      opacity: !toggle ? 0 : 1,
      duration: 300,
      easing: "easeOutInQuint",
      delay: anime.stagger(WIDTH_ITEM, {
        easing: "linear",
        grid: [columns, rows],
        from: index,
      }),
    });
  }

  return (
    <div className="grid" style={{ '--columns': columns, '--rows': rows }}>
      {titles.map((item) => {
        return (
          <GridItem key={item} index={item} onClick={handleClick} />
        )
      })}
    </div>
  );
};

export default Grid;