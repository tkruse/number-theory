import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { NumberSet } from '../data/numberData';
import { schemeCategory10 } from 'd3-scale-chromatic';

interface NumberSetProps {
  numberSet: NumberSet;
  x: number;
  y: number;
  colorIndex: number;
}

const NumberSetComponent: React.FC<NumberSetProps> = ({
  numberSet,
  x,
  y,
  colorIndex,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    d3.select(ref.current).selectAll('*').remove(); // Clear previous content

    const svg = d3.select(ref.current)
      .append('svg')
      .attr('width', 200) // Adjust width as needed
      .attr('height', 200); // Adjust height as needed

    svg.append('text')
      .attr('x', x)
      .attr('y', y - 10)
      .text(numberSet.name)
      .attr('font-size', '12px')
      .attr('fill', 'black');

    svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', 100)
      .attr('height', 100)
      .attr('rx', 15) // Rounded corners
      .attr('ry', 15) // Rounded corners
      .attr('fill', schemeCategory10[colorIndex % 10]);
  }, [x, y, colorIndex]);

  return <div ref={ref} />;
};

export default NumberSetComponent;
