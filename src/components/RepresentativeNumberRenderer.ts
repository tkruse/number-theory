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
    .style('stroke-width', 2)
    .append('title')
    .text(label.repNumber.description);

  if (label.repNumber.wikipediaLink) {
    group.append('a')
      .attr('xlink:href', label.repNumber.wikipediaLink)
      .attr('target', '_blank')
      .append('text')
      .attr('x', 0)
      .attr('y', options.textHeight * 0.35) // Adjusted to center vertically
      .text(label.repNumber.name)
      .style('font-size', `${options.textHeight}px`)
      .style('fill', 'black')
      .style('text-anchor', 'middle')
      .append('title')
      .text(label.repNumber.description);
  } else {
    group.append('text')
      .attr('x', 0)
      .attr('y', options.textHeight * 0.35) // Adjusted to center vertically
      .text(label.repNumber.name)
      .style('font-size', `${options.textHeight}px`)
      .style('fill', 'black')
      .style('text-anchor', 'middle')
      .append('title')
      .text(label.repNumber.description);
  }

};

export default RepresentativeNumberRenderer;
