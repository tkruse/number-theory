import * as d3 from 'd3';
import '../styles/style.css';
import { NumberSet, NATURAL_NUMBERS, RepresentativeNumber, ZERO } from '../data/numberData';
import { schemeCategory10 } from 'd3-scale-chromatic';

document.getElementById('app')!.innerHTML = '<h1>Number Theory Visualizer</h1>';

const svg = d3.select('#app').append('svg').attr('width', 500).attr('height', 500);

function renderNumberSet(numberSet: NumberSet, x: number, y: number, colorIndex: number) {
  const group = svg.append('g');

  group
    .append('rect')
    .attr('x', x)
    .attr('y', y)
    .attr('width', 200)
    .attr('height', 100)
    .attr('rx', 20)
    .attr('ry', 20)
    .style('fill', schemeCategory10[colorIndex % schemeCategory10.length])
    .style('stroke', 'black')
    .style('stroke-width', 2);

  group
    .append('text')
    .attr('x', x + 10)
    .attr('y', y + 20)
    .text(numberSet.name)
    .style('font-size', '14px')
    .style('fill', 'black');
}

function renderRepresentativeNumber(repNumber: RepresentativeNumber, x: number, y: number) {
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
}

renderNumberSet(NATURAL_NUMBERS, 50, 50, 0);
renderRepresentativeNumber(ZERO, 150, 150);
