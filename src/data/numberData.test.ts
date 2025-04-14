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
  RATIONAL_REAL_NUMBERS,
  IRRATIONAL_REAL_NUMBERS,
  TRANSCENDENTAL_REAL_NUMBERS,
  ALGEBRAIC_REAL_NUMBERS,
  COMPUTABLE_REAL_NUMBERS,
  REAL_NUMBERS,
  COMPLEX_NUMBERS,
  CONSTRUCTIBLE_REAL_NUMBERS,
  GOLDEN_RATIO,
  TWO,
  THREE,
  MINUS_TWO,
  MINUS_THREE,
  ZERO_POINT_ONE,
  INumberSet,
  IRepresentativeNumber,
  UNDEFINABLE_NUMBER,
  CHAMPERNOWNE_CONSTANT,
  LIOUVILLE_CONSTANT,
  UNCOMPUTABLE_LIOUVILLE_NUMBERS,
  LOGARITHM_TWO,
} from './numberData';

function getAllIncludedNumbers(set: INumberSet): IRepresentativeNumber[] {
  const numbers = new Set<IRepresentativeNumber>(set.containedElements);
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
    [NATURAL_NUMBERS, 'Natural (ℕ)'],
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
      RATIONAL_REAL_NUMBERS,
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
      IRRATIONAL_REAL_NUMBERS,
      [
        UNDEFINABLE_NUMBER,
        CHAMPERNOWNE_CONSTANT,
        LIOUVILLE_CONSTANT,
        UNCOMPUTABLE_LIOUVILLE_NUMBERS,
        LOGARITHM_TWO,
        SQRT_TWO,
        PI,
        E,
        GOLDEN_RATIO,
        CHAITINS_CONSTANT,
        CUBE_ROOT_TWO,
      ],
    ],
    [
      TRANSCENDENTAL_REAL_NUMBERS,
      [
        UNDEFINABLE_NUMBER,
        PI,
        E,
        CHAITINS_CONSTANT,
        CHAMPERNOWNE_CONSTANT,
        LIOUVILLE_CONSTANT,
        UNCOMPUTABLE_LIOUVILLE_NUMBERS,
        LOGARITHM_TWO,
      ],
    ],
    [
      ALGEBRAIC_REAL_NUMBERS,
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
      COMPUTABLE_REAL_NUMBERS,
      [
        E,
        GOLDEN_RATIO,
        HALF,
        SQRT_TWO,
        CUBE_ROOT_TWO,
        MINUS_ONE,
        PI,
        ZERO,
        ONE,
        TWO,
        THREE,
        MINUS_TWO,
        MINUS_THREE,
        ZERO_POINT_ONE,
        CHAMPERNOWNE_CONSTANT,
        LIOUVILLE_CONSTANT,
        LOGARITHM_TWO,
      ],
    ],
    [
      CONSTRUCTIBLE_REAL_NUMBERS,
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
        UNDEFINABLE_NUMBER,
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
        CHAMPERNOWNE_CONSTANT,
        LIOUVILLE_CONSTANT,
        UNCOMPUTABLE_LIOUVILLE_NUMBERS,
        LOGARITHM_TWO,
      ],
    ],
    [
      COMPLEX_NUMBERS,
      [
        UNDEFINABLE_NUMBER,
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
        CHAMPERNOWNE_CONSTANT,
        LIOUVILLE_CONSTANT,
        UNCOMPUTABLE_LIOUVILLE_NUMBERS,
        LOGARITHM_TWO,
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
