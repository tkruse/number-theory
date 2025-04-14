import * as d3 from 'd3';
import NumberSetRectangle from '../rendering/shapes/NumberSetRectangle';
import DrawingOptions from '../rendering/DrawingOptions';
import { INumberSet, NUMBER_SETS } from '../data/numberData';
import { schemeSet3 } from 'd3-scale-chromatic';

// Function to get fill color for a number set based on its index in NUMBER_SETS
function fillColorForNumberSet(set: INumberSet): string {
  const index = NUMBER_SETS.indexOf(set);
  return schemeSet3[index % schemeSet3.length];
}

const renderNumberSetRectangle = (
  svg: d3.Selection<SVGGElement | null, unknown, null, undefined>,
  rectangle: NumberSetRectangle,
  set: INumberSet,
  options: DrawingOptions,
) => {
  // Only render the rectangle for the specified set
  const contained = rectangle
    .getContainedRectangles()
    .find((r) => r.set === set);
  if (!contained) return;

  const { x, y, width, height } = contained;
  const fillColor = fillColorForNumberSet(set);
  const fillColorWithTransparency = d3.color(fillColor);
  if (fillColorWithTransparency) {
    fillColorWithTransparency.opacity = 0.5; // Set transparency level
  }
  const fill = fillColorWithTransparency?.toString() ?? fillColor;

  svg
    .append('rect')
    .attr('x', x)
    .attr('y', y)
    .attr('width', width)
    .attr('height', height)
    .attr('rx', 10) // Rounded corners
    .attr('ry', 10) // Rounded corners
    .style('fill', fill)
    .style('opacity', 1.1)
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .append('title')
    .text(set.toFullDescription());

  const textGroup = svg
    .append('g')
    .attr('transform', `translate(${x + 5}, ${y + options.textHeight})`);

  if (set.webLink) {
    textGroup
      .append('a')
      .attr('xlink:href', set.webLink)
      .attr('target', '_blank')
      .append('text')
      .text(set.toString())
      .style('font-size', `${options.textHeight}px`)
      .style('fill', 'black')
      .append('title')
      .text(set.toFullDescription());
  } else {
    textGroup
      .append('text')
      .text(set.toString())
      .style('font-size', `${options.textHeight}px`)
      .style('fill', 'black')
      .append('title')
      .text(set.toFullDescription());
  }
};

export default renderNumberSetRectangle;
