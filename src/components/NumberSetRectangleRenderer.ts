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
    .style('stroke-width', 2);

  svg
    .append('text')
    .attr('x', rectangle.x + 5) // Slightly offset from the left edge
    .attr('y', rectangle.y + options.textHeight) // Slightly offset from the top edge
    .text(rectangle.numberSet.toString())
    .style('font-size', `${options.textHeight}px`)
    .style('fill', 'black');
};

export default NumberSetRectangleRenderer;
