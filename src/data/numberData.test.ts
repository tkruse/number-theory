import {
  ZERO,
  ONE,
  MINUS_ONE,
  SQRT_TWO,
  PI,
  HALF,
  E,
  IMAGINARY_UNIT,
  E_TIMES_I,
  I_PLUS_PI,
  CHAITINS_CONSTANT,
  NATURAL_NUMBERS,
  WHOLE_NUMBERS,
  INTEGERS,
  RATIONAL_NUMBERS,
  IRRATIONAL_NUMBERS,
  TRANSCENDENTAL_NUMBERS,
  ALGEBRAIC_NUMBERS,
  COMPUTABLE_NUMBERS,
  REAL_NUMBERS,
  COMPLEX_NUMBERS,
  CONSTRUCTIBLE_NUMBERS,
  IMAGINARY_NUMBERS,
  PURE_IMAGINARY_NUMBERS,
  GOLDEN_RATIO,
  RepresentativeNumber,
  NumberSet,
  IRepresentativeNumber,
  INumberSet,
} from './numberData';

function getAllIncludedNumbers(set: INumberSet): IRepresentativeNumber[] {
  const numbers = new Set(set.containedElements);
  set.containedPartitions.forEach(partition => {
    partition.forEach(subset => {
      getAllIncludedNumbers(subset).forEach(num => numbers.add(num));
    });
  });
  return Array.from(numbers);
}

import { describe, expect, test } from 'vitest';

describe('toString', () => {
  test.each([
    [ONE, '1'],
    [NATURAL_NUMBERS, 'Natural Numbers (ℕ)'],
  ])('should return correct string representation for %s', (instance, expectedString) => {
    expect(instance.toString()).toBe(expectedString);
  });
});

describe('getAllIncludedNumbers', () => {
  test.each([
    [NATURAL_NUMBERS, [ONE]],
    [WHOLE_NUMBERS, [ZERO, ONE]],
    [INTEGERS, [MINUS_ONE, ZERO, ONE]],
    [RATIONAL_NUMBERS, [HALF, MINUS_ONE, ZERO, ONE]],
    [IRRATIONAL_NUMBERS, [SQRT_TWO, PI, E]],
    [TRANSCENDENTAL_NUMBERS, [PI, E]],
    [ALGEBRAIC_NUMBERS, [GOLDEN_RATIO, IMAGINARY_UNIT, HALF, SQRT_TWO, MINUS_ONE, ZERO, ONE]],
    [COMPUTABLE_NUMBERS, [E, GOLDEN_RATIO, IMAGINARY_UNIT, HALF, SQRT_TWO, MINUS_ONE, ZERO, ONE]],
    [REAL_NUMBERS, [HALF, MINUS_ONE, ZERO, ONE, SQRT_TWO, PI, E, GOLDEN_RATIO, IMAGINARY_UNIT]],
    [COMPLEX_NUMBERS, [E_TIMES_I, I_PLUS_PI, HALF, MINUS_ONE, ZERO, ONE, SQRT_TWO, PI, E, GOLDEN_RATIO, IMAGINARY_UNIT]],
  ])('should return all included numbers for %s', (numberSet, expectedNumbers) => {
    const result = getAllIncludedNumbers(numberSet).map(num => num.name).sort();
    expect(result).toStrictEqual(expectedNumbers.map(num => num.name).sort());
  });
});
