import { describe, expect, it } from 'vitest';
import Grid from './Grid';
import { Column } from './Column';
import { ZERO, ONE, INumberSet } from '../data/numberData';

const createSet = (name: string): INumberSet => ({
  name,
  unicodeSymbol: '',
  cardinality: '',
  description: '',
  webLink: '',
  containedElements: [],
  containedPartitions: [],
  toString: () => name,
  toFullDescription: () => '',
  getAllContainedNumbers: () => new Set(),
});

const SET_A = createSet('Set A');
const SET_B = createSet('Set B');

describe('Grid', () => {
  it('should render an empty grid', () => {
    const grid = new Grid();
    expect(grid.toString()).toBe('');
  });

  it('should render a grid with one column', () => {
    const grid = new Grid();
    const column = new Column();
    column.addStartingSet(SET_A);
    column.addNumber(ZERO);
    column.addEndingSet(SET_A);
    grid.addColumn(column);

    const expectedOutput = `
┌─ Set A
| 0
└─ Set A
`.trim();

    expect(grid.toString()).toBe(expectedOutput);
  });

  it('should render a grid with multiple columns', () => {
    const grid = new Grid();
    const column1 = new Column();
    column1.addStartingSet(SET_B);
    column1.addStartingSet(SET_A);
    column1.addNumber(ZERO);
    column1.addEndingSet(SET_B);
    grid.addColumn(column1);

    const column2 = new Column();
    column2.addNumber(ONE);
    column2.addEndingSet(SET_A);
    grid.addColumn(column2);

    const expectedOutput = `
┌─ Set A
| ┌─ Set B
| | 0
| └─ Set B
| 1
└─ Set A
`.trim();

    expect(grid.toString()).toBe(expectedOutput);
  });
});
