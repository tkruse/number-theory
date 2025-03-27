import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { NumberSet } from '../data/numberData';
import NumberSetRenderer from './NumberSetRenderer';

interface DiagramComponentProps {
  numberSet: NumberSet;
}

const DiagramComponent: React.FC<DiagramComponentProps> = ({ numberSet }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // Clear previous content

    // Render the NumberSetComponent within this SVG
    const group = svg.append('g');
    // Render the NumberSetComponent within this SVG
    NumberSetRenderer({ svg: group, numberSet, x: 0, y: 0, colorIndex: 0 });
  }, [numberSet]);

  return <svg ref={ref} width={400} height={400} />;
};

export default DiagramComponent;
