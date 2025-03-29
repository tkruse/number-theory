import { describe, expect, it } from 'vitest';
import { ZERO, ONE, MINUS_ONE, INumberSet } from '../data/numberData';
import { Column } from './Column';

const createSet = (name: string): INumberSet => ({
  name,
  unicodeSymbol: '',
  cardinality: '',
  description: '',
  webLinks: [],
  containedElements: [],
  containedPartitions: [],
  toString: () => {
    return name;
  },
});

const SET_A = createSet('Set A');
const SET_B = createSet('Set B');
const SET_C = createSet('Set C');
const SET_D = createSet('Set D');

describe('Column', () => {
  it('should return a comma-separated list of element names', () => {
    const column = new Column();
    [ZERO, ONE, MINUS_ONE].forEach((num) => {
      column.addNumber(num);
    });

    expect(column.renderAscii([])).toBe('0, 1, -1');
    const context: { set: INumberSet; isOpen: boolean }[] = [];
    column.renderAscii(context);
    expect(context).toEqual([]);
  });

  it('should render a scenario with context A-open, B-closed, C-open, and closes C, leaving only A open', () => {
    const column = new Column();
    column.addEndingSet(SET_C);

    const expectedOutput = `
|   └─ Set C
`.trim();

    const context = [
      { set: SET_A, isOpen: true },
      { set: SET_B, isOpen: false },
      { set: SET_C, isOpen: true },
    ];
    expect(column.renderAscii(context)).toBe(expectedOutput);
    expect(context).toEqual([{ set: SET_A, isOpen: true }]);
  });

  it('should handle an empty column', () => {
    const column = new Column();
    expect(column.renderAscii([])).toBe('');
  });

  it('should render a column with numbers, indents, starting, and ending sets', () => {
    const column = new Column();
    column.addStartingSet(SET_A);
    column.addNumber(ZERO);
    column.addNumber(ONE);
    column.addEndingSet(SET_A);

    const expectedOutput = `
┌─ Set A
| 0, 1
└─ Set A
`.trim();

    const context: { set: INumberSet; isOpen: boolean }[] = [];
    expect(column.renderAscii(context)).toBe(expectedOutput);
    expect(context).toEqual([]);
  });

  it('should render a column with an initial indent level of 2 and different starting and ending sets', () => {
    const column = new Column();
    column.addStartingSet(SET_D);
    column.addNumber(ONE);
    column.addEndingSet(SET_D);

    const expectedOutput = `
| | ┌─ Set D
| | | 1
| | └─ Set D
`.trim();

    const context = [
      { set: SET_A, isOpen: true },
      { set: SET_B, isOpen: true },
    ];
    expect(column.renderAscii(context)).toBe(expectedOutput);
    expect(context).toEqual([
      { set: SET_A, isOpen: true },
      { set: SET_B, isOpen: true },
    ]);
  });

  it('should render a complex scenario with context A open, B closed, C open, and D starting, and C ending', () => {
    const column = new Column();
    column.addStartingSet(SET_D);
    column.addNumber(ONE);
    column.addEndingSet(SET_C);

    const expectedOutput = `
|   | ┌─ Set D
|   | | 1
|   └─ Set C
`.trim();

    const context = [
      { set: SET_A, isOpen: true },
      { set: SET_B, isOpen: false },
      { set: SET_C, isOpen: true },
    ];
    expect(column.renderAscii(context)).toBe(expectedOutput);
    expect(context).toEqual([
      { set: SET_A, isOpen: true },
      { set: SET_B, isOpen: false },
      { set: SET_C, isOpen: false },
      { set: SET_D, isOpen: true },
    ]);
  });
});
