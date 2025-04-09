import * as d3 from 'd3';
import NumberSetRectangle from '../rendering/shapes/NumberSetRectangle';
import DrawingOptions from '../rendering/DrawingOptions';

const NumberSetRectangleRenderer = (
  svg: d3.Selection<SVGGElement | null, unknown, null, undefined>,
  rectangle: NumberSetRectangle,
  options: DrawingOptions,
  fill = 'lightblue',
  opacity = 1.0,
) => {
  svg
    .append('rect')
    .attr('x', rectangle.x)
    .attr('y', rectangle.y)
    .attr('width', rectangle.width)
    .attr('height', rectangle.height)
    .attr('rx', 10) // Rounded corners
    .attr('ry', 10) // Rounded corners
    .style('fill', fill)
    .style('opacity', opacity)
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .append('title')
    .text(rectangle.numberSet.toFullDescription());

  const textGroup = svg
    .append('g')
    .attr('transform', `translate(${rectangle.x + 5}, ${rectangle.y + options.textHeight})`);

  if (rectangle.numberSet.webLink) {
    textGroup
      .append('a')
      .attr('xlink:href', rectangle.numberSet.webLink)
      .attr('target', '_blank')
      .append('text')
      .text(rectangle.numberSet.toString())
      .style('font-size', `${options.textHeight}px`)
      .style('fill', 'black')
      .append('title')
      .text(rectangle.numberSet.toFullDescription());
  } else {
    textGroup
      .append('text')
      .text(rectangle.numberSet.toString())
      .style('font-size', `${options.textHeight}px`)
      .style('fill', 'black')
      .append('title')
      .text(rectangle.numberSet.toFullDescription());
  }
};

export default NumberSetRectangleRenderer;
