import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { NumberSet } from '../data/numberData';
import { schemeCategory10 } from 'd3-scale-chromatic';
import createRectangleLayout from '../layout/RectangleLayout';
import RepresentativeNumberRenderer from './RepresentativeNumberRenderer';
import RepresentativeNumberLabel from '../rendering/shapes/RepresentativeNumberLabel';
import DrawingOptions from '../rendering/DrawingOptions';
import Grid from "../layout/Grid";
import NumberSetRectangle from "../rendering/shapes/NumberSetRectangle";
import NumberSetRectangleRenderer from "./NumberSetRectangleRenderer";

interface DiagramComponentProps {
  numberSet: NumberSet;
}

const DiagramComponent: React.FC<DiagramComponentProps> = ({ numberSet }) => {
  const ref = useRef<SVGSVGElement>(null);

  const [svgWidth, setSvgWidth] = useState(900);
  const [svgHeight, setSvgHeight] = useState(900);

  const calculateCanvasWidth = (grid: Grid, options: DrawingOptions): number => {
    const { columnWidth, columnPadding, overlapPadding } = options;
    return grid.columns.reduce((totalWidth, _, columnIndex) => {
      const extraPadding = grid.calculateExtraLeftPadding(columnIndex);
      return totalWidth + columnWidth + columnPadding + extraPadding * overlapPadding;
    }, 0);
  };

  const calculateCanvasHeight = (grid: Grid, options: DrawingOptions): number => {
    const { numberCircleRadius, numberCirclePadding, textHeight, overlapPadding } = options;
    const maxNumbersInColumn = Math.max(
      ...grid.columns.map((column) => column.numbers.length)
    );
    const maxSurroundingSets = Math.max(
      ...grid.columns.map((_, index) => grid.calculateSurroundingSets(index))
    );
    return (
      maxNumbersInColumn * (2 * numberCircleRadius + numberCirclePadding) +
      maxSurroundingSets * (2 * overlapPadding + textHeight) +
      numberCircleRadius
    );
  };

  useEffect(() => {
    const grid = createRectangleLayout(numberSet);
    const options = new DrawingOptions();

    const svg = d3
      .select(ref.current)
      .attr('width', calculateCanvasWidth(grid, options))
      .attr('height', calculateCanvasHeight(grid, options));

    setSvgWidth(calculateCanvasWidth(grid, options));
    setSvgHeight(calculateCanvasHeight(grid, options));

    svg.selectAll('*').remove(); // Clear previous content

    const group = svg.append<SVGGElement | null>('g');

    // Draw the number set rectangles
    grid.columns.forEach((column, columnIndex) => {
      column.startingSets.forEach((numberSet, setIndex) => {
        const rectangle = new NumberSetRectangle(numberSet, grid, options);
        const fillColor = schemeCategory10[(columnIndex + setIndex) % schemeCategory10.length];
        NumberSetRectangleRenderer(group, rectangle, options, fillColor);
      });
    });

    // Draw the number labels
    grid.columns.forEach((column) => {
      column.numbers.forEach((number) => {
        const label = new RepresentativeNumberLabel(number, grid, options);
        RepresentativeNumberRenderer(group, label, options);
      });
    });
  }, [numberSet]);

  return <svg ref={ref} width={svgWidth} height={svgHeight} />;
};

export default DiagramComponent;
