import * as d3 from 'd3';
import { NumberSet } from '../data/numberData';
import { schemeCategory10 } from 'd3-scale-chromatic';
import RepresentativeNumberRenderer from './RepresentativeNumberRenderer';

interface NumberSetRendererProps {
  svg: d3.Selection<SVGGElement | null, unknown, null, undefined>;
  numberSet: NumberSet;
  x: number;
  y: number;
  colorIndex: number;
}

const NumberSetRenderer = ({
  svg,
  numberSet,
  x,
  y,
  colorIndex,
}: NumberSetRendererProps) => {
  const text = svg
    .append('text')
    .attr('x', x + 10)
    .attr('y', y + 30)
    .text(numberSet.name)
    .attr('font-size', '16px')
    .attr('fill', 'black');

  const textWidth = text.node()?.getBBox().width || 100;

  const totalHeight = (numberSet.containedElements.length + 1) * 50; // Calculate total height

  svg
    .insert('rect', 'text')
    .attr('x', x)
    .attr('y', y)
    .attr('width', textWidth + 20) // Add some padding
    .attr('height', totalHeight) // Adjust height to fit all elements
    .attr('rx', 15) // Rounded corners
    .attr('ry', 15) // Rounded corners
    .attr('fill', schemeCategory10[colorIndex % 10]);

  numberSet.containedElements.forEach((rep, index) => {
    RepresentativeNumberRenderer({
      svg,
      repNumber: rep,
      x: x + 30,
      y: y + 50 + index * 50,
    });
  });
};

export default NumberSetRenderer;
