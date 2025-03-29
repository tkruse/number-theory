import * as d3 from 'd3';
import { RepresentativeNumber } from '../data/numberData';

interface RepresentativeNumberRendererProps {
  svg: d3.Selection<SVGGElement | null, unknown, null, undefined>;
  repNumber: RepresentativeNumber;
  x: number;
  y: number;
}

const RepresentativeNumberRenderer = ({
  svg,
  repNumber,
  x,
  y,
}: RepresentativeNumberRendererProps) => {
  const group = svg.append('g').attr('transform', `translate(${x}, ${y})`);

  group
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 20)
    .style('fill', 'lightgreen')
    .style('stroke', 'black')
    .style('stroke-width', 2);

  group
    .append('text')
    .attr('x', 0)
    .attr('y', 5)
    .text(repNumber.name)
    .style('font-size', '12px')
    .style('fill', 'black')
    .style('text-anchor', 'middle');
};

export default RepresentativeNumberRenderer;
