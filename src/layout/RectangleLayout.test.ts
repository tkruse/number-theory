import { describe, expect, it } from 'vitest';
import RectangleLayout from './RectangleLayout';
import { NATURAL_NUMBERS, ONE, WHOLE_NUMBERS, ZERO, INTEGERS, MINUS_ONE, ALGEBRAIC_NUMBERS } from '../data/numberData';

describe('RectangleLayout', () => {
  it('should create a layout for NATURAL_NUMBERS', () => {
    const layout = new RectangleLayout(NATURAL_NUMBERS);

    const grid = layout.layoutGrid;
    // Add assertions to test the grid directly
    expect(grid.columns.length).toBe(1);

    const column = grid.columns[0];
    expect(column.numbers).toEqual([ONE]);

    // Check starting and ending sets
    expect(column.startingSets).toEqual([NATURAL_NUMBERS]);

    expect(column.endingSets).toEqual([NATURAL_NUMBERS]);
    expect(grid.columns.length).toBe(1);
    expect(grid.columns[0].numbers).toEqual([ONE]);
  });

  it('should create a layout for ALGEBRAIC_NUMBERS using grid.toString()', () => {
    const layout = new RectangleLayout(ALGEBRAIC_NUMBERS);

    const expectedOutput = `
┌─ Algebraic Numbers
| ┌─ Constructible Numbers
| | ┌─ Rational Numbers
| | | ┌─ Integers
| | | | ┌─ Whole Numbers
| | | | | ┌─ Natural Numbers
| | | | | | 1
| | | | | └─ Natural Numbers
| | | | | 0
| | | | └─ Whole Numbers
| | | | -1
| | | └─ Integers
| | | 1/2
| | └─ Rational Numbers
| | √2, φ
| └─ Constructible Numbers
| ∛2
└─ Algebraic Numbers
`.trim();

    expect(layout.layoutGrid.toString()).toBe(expectedOutput);
  });

  it('should create a layout for WHOLE_NUMBERS using grid.toString()', () => {
    const layout = new RectangleLayout(WHOLE_NUMBERS);

    const expectedOutput = `
┌─ Whole Numbers
| ┌─ Natural Numbers
| | 1
| └─ Natural Numbers
| 0
└─ Whole Numbers
`.trim();

    expect(layout.layoutGrid.toString()).toBe(expectedOutput);
  });

  it('should create a layout for INTEGERS using grid.toString()', () => {
    const layout = new RectangleLayout(INTEGERS);

    const expectedOutput = `
┌─ Integers
| ┌─ Whole Numbers
| | ┌─ Natural Numbers
| | | 1
| | └─ Natural Numbers
| | 0
| └─ Whole Numbers
| -1
└─ Integers
`.trim();

    expect(layout.layoutGrid.toString()).toBe(expectedOutput);
  });

  it('should create a layout for WHOLE_NUMBERS', () => {
    const layout = new RectangleLayout(WHOLE_NUMBERS);

    const grid = layout.layoutGrid;
    expect(grid.columns.length).toBe(2);

    const column0 = grid.columns[0];
    expect(column0.numbers).toEqual([ONE]);
    expect(column0.startingSets).toEqual([WHOLE_NUMBERS, NATURAL_NUMBERS]);
    expect(column0.endingSets).toEqual([NATURAL_NUMBERS]);

      const column1 = grid.columns[1];
      expect(column1.numbers).toEqual([ZERO]);
      expect(column1.startingSets).toEqual([]);
      expect(column1.endingSets).toEqual([WHOLE_NUMBERS]);
  });
});
