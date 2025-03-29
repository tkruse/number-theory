import {
  ZERO,
  ONE,
  MINUS_ONE,
  SQRT_TWO,
  CUBE_ROOT_TWO,
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
  GOLDEN_RATIO,
  TWO,
  THREE,
  MINUS_TWO,
  MINUS_THREE,
  ZERO_POINT_ONE,
  INumberSet,
} from './numberData';

function getAllIncludedNumbers(set: INumberSet): IRepresentativeNumber[] {
  const numbers = new Set(set.containedElements);
  set.containedPartitions.forEach((partition) => {
    partition.forEach((subset) => {
      getAllIncludedNumbers(subset).forEach((num) => numbers.add(num));
    });
  });
  return Array.from(numbers);
}

import { describe, expect, test } from 'vitest';

describe('toString', () => {
  test.each([
    [ONE, '1'],
    [NATURAL_NUMBERS, 'Natural Numbers (ℕ)'],
  ])(
    'should return correct string representation for %s',
    (instance, expectedString) => {
      expect(instance.toString()).toBe(expectedString);
    },
  );
});

describe('getAllIncludedNumbers', () => {
  test.each([
    [NATURAL_NUMBERS, [ONE, TWO, THREE]],
    [WHOLE_NUMBERS, [ZERO, ONE, TWO, THREE]],
    [INTEGERS, [MINUS_THREE, MINUS_TWO, MINUS_ONE, ZERO, ONE, TWO, THREE]],
    [
      RATIONAL_NUMBERS,
      [
        HALF,
        ZERO_POINT_ONE,
        MINUS_THREE,
        MINUS_TWO,
        MINUS_ONE,
        ZERO,
        ONE,
        TWO,
        THREE,
      ],
    ],
    [
      IRRATIONAL_NUMBERS,
      [SQRT_TWO, PI, E, GOLDEN_RATIO, CHAITINS_CONSTANT, CUBE_ROOT_TWO],
    ],
    [TRANSCENDENTAL_NUMBERS, [PI, E, CHAITINS_CONSTANT]],
    [
      ALGEBRAIC_NUMBERS,
      [
        GOLDEN_RATIO,
        HALF,
        SQRT_TWO,
        CUBE_ROOT_TWO,
        MINUS_ONE,
        ZERO,
        ONE,
        TWO,
        THREE,
        MINUS_TWO,
        MINUS_THREE,
        ZERO_POINT_ONE,
      ],
    ],
    [
      COMPUTABLE_NUMBERS,
      [
        E,
        GOLDEN_RATIO,
        HALF,
        SQRT_TWO,
        CUBE_ROOT_TWO,
        MINUS_ONE,
        ZERO,
        ONE,
        TWO,
        THREE,
        MINUS_TWO,
        MINUS_THREE,
        ZERO_POINT_ONE,
      ],
    ],
    [
      CONSTRUCTIBLE_NUMBERS,
      [
        SQRT_TWO,
        HALF,
        MINUS_ONE,
        ZERO,
        ONE,
        GOLDEN_RATIO,
        TWO,
        THREE,
        MINUS_TWO,
        MINUS_THREE,
        ZERO_POINT_ONE,
      ],
    ],
    [
      REAL_NUMBERS,
      [
        HALF,
        MINUS_ONE,
        ZERO,
        ONE,
        SQRT_TWO,
        CUBE_ROOT_TWO,
        PI,
        E,
        GOLDEN_RATIO,
        CHAITINS_CONSTANT,
        TWO,
        THREE,
        MINUS_TWO,
        MINUS_THREE,
        ZERO_POINT_ONE,
      ],
    ],
    [
      COMPLEX_NUMBERS,
      [
        E_TIMES_I,
        I_PLUS_PI,
        HALF,
        MINUS_ONE,
        ZERO,
        ONE,
        SQRT_TWO,
        CUBE_ROOT_TWO,
        PI,
        E,
        GOLDEN_RATIO,
        IMAGINARY_UNIT,
        CHAITINS_CONSTANT,
        TWO,
        THREE,
        MINUS_TWO,
        MINUS_THREE,
        ZERO_POINT_ONE,
      ],
    ],
  ])(
    'should return all included numbers for %s',
    (numberSet, expectedNumbers) => {
      const result = getAllIncludedNumbers(numberSet)
        .map((num) => num.name)
        .sort();
      expect(result).toStrictEqual(
        expectedNumbers.map((num) => num.name).sort(),
      );
    },
  );
});
