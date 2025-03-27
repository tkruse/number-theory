import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { RepresentativeNumber } from '../data/numberData';

interface RepresentativeNumberProps {
  repNumber: RepresentativeNumber;
  x: number;
  y: number;
}

const RepresentativeNumberComponent: React.FC<RepresentativeNumberProps> = ({
  repNumber,
  x,
  y,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    d3.select(ref.current).selectAll('*').remove(); // Clear previous content

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', 100)
      .attr('height', 100);

    const group = svg.append('g');

    group
      .append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', 20)
      .style('fill', 'lightgreen')
      .style('stroke', 'black')
      .style('stroke-width', 2);

    group
      .append('text')
      .attr('x', x)
      .attr('y', y + 5)
      .text(repNumber.name)
      .style('font-size', '12px')
      .style('fill', 'black')
      .style('text-anchor', 'middle');

  }, [repNumber, x, y]);

  return <div ref={ref} />;
};

export default RepresentativeNumberComponent;
