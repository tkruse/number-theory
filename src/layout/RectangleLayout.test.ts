import { describe, expect, it } from 'vitest';
import createRectangleLayout from './RectangleLayout';
import {
  NATURAL_NUMBERS,
  ONE,
  WHOLE_NUMBERS,
  ZERO,
  INTEGERS,
  ALGEBRAIC_REAL_NUMBERS,
  TWO,
  THREE,
  REAL_NUMBERS,
  COMPLEX_NUMBERS,
  DEFINABLE_REAL_NUMBERS,
  COMPUTABLE_REAL_NUMBERS,
  RATIONAL_REAL_NUMBERS,
} from '../data/numberData';

describe('RectangleLayout', () => {
  it('should create a layout for NATURAL_NUMBERS', () => {
    const grid = createRectangleLayout([
      { numberSet: NATURAL_NUMBERS, render: true },
    ]);
    // Add assertions to test the grid directly
    expect(grid.columns.length).toBe(1);

    const column = grid.columns[0];
    expect(column.numbers).toEqual([ONE, TWO, THREE]);

    // Check starting and ending sets
    expect(column.getStartingSets()).toEqual([NATURAL_NUMBERS]);

    expect(column.getEndingSets()).toEqual([NATURAL_NUMBERS]);
    expect(grid.columns.length).toBe(1);
    expect(grid.columns[0].numbers).toEqual([ONE, TWO, THREE]);
  });

  it.only('should create a layout for WHOLE_NUMBERS', () => {
    const grid = createRectangleLayout([
      { numberSet: WHOLE_NUMBERS, render: true },
    ]);
    expect(grid.columns.length).toBe(2);

    const column0 = grid.columns[0];
    expect(column0.numbers).toEqual([ONE, TWO, THREE]);
    expect(column0.getStartingSets().map((s) => s.name)).toEqual([
      WHOLE_NUMBERS.name,
      NATURAL_NUMBERS.name,
    ]);
    expect(column0.getEndingSets().map((s) => s.name)).toEqual([
      NATURAL_NUMBERS.name,
    ]);

    const column1 = grid.columns[1];
    expect(column1.numbers).toEqual([ZERO]);
    expect(column1.getStartingSets().map((s) => s.name)).toEqual([]);
    expect(column1.getEndingSets().map((s) => s.name)).toEqual([
      WHOLE_NUMBERS.name,
    ]);
  });

  it('should create a layout for WHOLE_NUMBERS using grid.toString()', () => {
    const grid = createRectangleLayout([
      { numberSet: WHOLE_NUMBERS, render: true },
    ]);

    const expectedOutput = `
┌─ Whole
| ┌─ Natural
| | 1, 2, 3
| └─ Natural
| 0
└─ Whole
`.trim();

    expect(grid.toString()).toBe(expectedOutput);
  });

  it('should create a layout for INTEGERS using grid.toString()', () => {
    const grid = createRectangleLayout([{ numberSet: INTEGERS, render: true }]);

    const expectedOutput = `
┌─ Integers
| ┌─ Whole
| | ┌─ Natural
| | | 1, 2, 3
| | └─ Natural
| | 0
| └─ Whole
| -1, -2, -3
└─ Integers
`.trim();

    expect(grid.toString()).toBe(expectedOutput);
  });

  it('should create a layout for ALGEBRAIC_NUMBERS using grid.toString()', () => {
    const grid = createRectangleLayout([
      { numberSet: ALGEBRAIC_REAL_NUMBERS, render: true },
    ]);

    const expectedOutput = `
┌─ Algebraic
| ┌─ Constructible
| | ┌─ Rational
| | | ┌─ Integers
| | | | ┌─ Whole
| | | | | ┌─ Natural
| | | | | | 1, 2, 3
| | | | | └─ Natural
| | | | | 0
| | | | └─ Whole
| | | | -1, -2, -3
| | | └─ Integers
| | | 1/2, 0.1
| | └─ Rational
| | √2, φ
| └─ Constructible
| ∛2
└─ Algebraic
`.trim();

    expect(grid.toString()).toBe(expectedOutput);
  });

  it('should create a layout for REAL_NUMBERS using grid.toString()', () => {
    const grid = createRectangleLayout([
      { numberSet: REAL_NUMBERS, render: true },
      { numberSet: DEFINABLE_REAL_NUMBERS, render: false },
      { numberSet: COMPUTABLE_REAL_NUMBERS, render: false },
      { numberSet: RATIONAL_REAL_NUMBERS, render: false },
      { numberSet: INTEGERS, render: false },
      { numberSet: WHOLE_NUMBERS, render: false },
      { numberSet: NATURAL_NUMBERS, render: false },
    ]);

    const expectedOutput = `
┌─ Real
| ┌─ Algebraic
| | ┌─ Constructible
| | | 1, 2, 3
| | | 0
| | | -1, -2, -3
| | | 1/2, 0.1
| | | ┌─ Irrational
| | | | √2, φ
| | └─ Constructible
| |   | ∛2
| └─ Algebraic
|     | ┌─ Transcendental
|     | | e, π, L, ln2, C₁₀
|     | | Ω, L?
|     | | ?
|     | └─ Transcendental
|     └─ Irrational
└─ Real
`.trim();

    expect(grid.toString()).toBe(expectedOutput);
  });

  it('should create a layout for COMPLEX_NUMBERS using grid.toString()', () => {
    const grid = createRectangleLayout([
      { numberSet: COMPLEX_NUMBERS, render: true },
      { numberSet: DEFINABLE_REAL_NUMBERS, render: false },
      { numberSet: COMPUTABLE_REAL_NUMBERS, render: false },
    ]);

    const expectedOutput = `
┌─ Complex
| ┌─ Real
| | ┌─ Algebraic
| | | ┌─ Constructible
| | | | ┌─ Rational
| | | | | ┌─ Integers
| | | | | | ┌─ Whole
| | | | | | | ┌─ Natural
| | | | | | | | 1, 2, 3
| | | | | | | └─ Natural
| | | | | | | 0
| | | | | | └─ Whole
| | | | | | -1, -2, -3
| | | | | └─ Integers
| | | | | 1/2, 0.1
| | | | └─ Rational
| | | | ┌─ Irrational
| | | | | √2, φ
| | | └─ Constructible
| | |   | ∛2
| | └─ Algebraic
| |     | ┌─ Transcendental
| |     | | e, π, L, ln2, C₁₀
| |     | | Ω, L?
| |     | | ?
| |     | └─ Transcendental
| |     └─ Irrational
| └─ Real
| ┌─ Imaginary
| | ┌─ Pure Imaginary
| | | i, e*i
| | └─ Pure Imaginary
| | i+π
| └─ Imaginary
└─ Complex
`.trim();

    expect(grid.toString()).toBe(expectedOutput);
  });
});
