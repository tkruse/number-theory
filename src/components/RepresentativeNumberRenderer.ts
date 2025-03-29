import * as d3 from 'd3';
import RepresentativeNumberLabel from '../rendering/shapes/RepresentativeNumberLabel';
import DrawingOptions from '../rendering/DrawingOptions';

const RepresentativeNumberRenderer = (
  svg: d3.Selection<SVGGElement | null, unknown, null, undefined>,
  label: RepresentativeNumberLabel,
  options: DrawingOptions,
) => {
  const group = svg
    .append('g')
    .attr('transform', `translate(${label.x}, ${label.y})`);

  group
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', options.numberCircleRadius)
    .style('fill', 'lightgreen')
    .style('stroke', 'black')
    .style('stroke-width', 2);

  group
    .append('text')
    .attr('x', 0)
    .attr('y', 5)
    .text(label.repNumber.name)
    .style('font-size', `12px`)
    .style('fill', 'black')
    .style('text-anchor', 'middle');
};

export default RepresentativeNumberRenderer;
