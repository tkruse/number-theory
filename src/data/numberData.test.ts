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
  UNDEFINABLE_NUMBER,
  CHAMPERNOWNE_CONSTANT,
  LIOUVILLE_CONSTANT,
  UNCOMPUTABLE_LIOUVILLE_NUMBERS,
  LOGARITHM_TWO,
  NUMBER_SETS,
  ALL_NUMBERS,
  DEFINABLE_REAL_NUMBERS,
  IMAGINARY_NUMBERS,
  PURE_IMAGINARY_NUMBERS,
  HYPERCOMPLEX_NUMBERS,
  HYPERREAL_NUMBERS,
  EXPONENTIAL_PERIOD_REAL_NUMBERS,
  PERIOD_REAL_NUMBERS,
  APERYS_CONSTANT,
} from './numberData';

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

describe('NUMBER_SETS sort order', () => {
  test('should contain the expected number sets in order', () => {
    const expectedNumberSets = [
      ALL_NUMBERS,
      HYPERREAL_NUMBERS,
      HYPERCOMPLEX_NUMBERS,
      COMPLEX_NUMBERS,
      REAL_NUMBERS,
      DEFINABLE_REAL_NUMBERS,
      COMPUTABLE_REAL_NUMBERS,
      EXPONENTIAL_PERIOD_REAL_NUMBERS,
      PERIOD_REAL_NUMBERS,
      ALGEBRAIC_REAL_NUMBERS,
      CONSTRUCTIBLE_REAL_NUMBERS,
      RATIONAL_REAL_NUMBERS,
      INTEGERS,
      WHOLE_NUMBERS,
      NATURAL_NUMBERS,
      IRRATIONAL_REAL_NUMBERS,
      TRANSCENDENTAL_REAL_NUMBERS,
      IMAGINARY_NUMBERS,
      PURE_IMAGINARY_NUMBERS,
    ];

    const numberSetNames = NUMBER_SETS.map((set) => set.name);
    const expectedNumberSetNames = expectedNumberSets.map((set) => set.name);
    expect(numberSetNames).toEqual(expectedNumberSetNames);
  });
});

describe('compareTo', () => {
  test('should return 0 when comparing a set to itself', () => {
    expect(ALL_NUMBERS.compareTo(ALL_NUMBERS)).toBe(0);
    expect(COMPLEX_NUMBERS.compareTo(COMPLEX_NUMBERS)).toBe(0);
    expect(REAL_NUMBERS.compareTo(REAL_NUMBERS)).toBe(0);
  });

  test('should return < 0 when parent is compared to child', () => {
    expect(ALL_NUMBERS.compareTo(COMPLEX_NUMBERS)).toBeLessThan(0);
    expect(COMPLEX_NUMBERS.compareTo(REAL_NUMBERS)).toBeLessThan(0);
    expect(REAL_NUMBERS.compareTo(DEFINABLE_REAL_NUMBERS)).toBeLessThan(0);
  });

  test('should return > 0 when child is compared to parent', () => {
    expect(COMPLEX_NUMBERS.compareTo(ALL_NUMBERS)).toBeGreaterThan(0);
    expect(REAL_NUMBERS.compareTo(COMPLEX_NUMBERS)).toBeGreaterThan(0);
    expect(DEFINABLE_REAL_NUMBERS.compareTo(REAL_NUMBERS)).toBeGreaterThan(0);
  });

  test('should order siblings according to their position in the parent', () => {
    // COMPLEX_NUMBERS partitions: [REAL_NUMBERS, IMAGINARY_NUMBERS]
    expect(COMPLEX_NUMBERS.nthChild(REAL_NUMBERS)).toBeLessThan(
      COMPLEX_NUMBERS.nthChild(IMAGINARY_NUMBERS),
    );
    expect(REAL_NUMBERS.nthChild(DEFINABLE_REAL_NUMBERS)).toEqual(0);
    expect(REAL_NUMBERS.nthChild(ALGEBRAIC_REAL_NUMBERS)).toEqual(1);
    expect(REAL_NUMBERS.nthChild(TRANSCENDENTAL_REAL_NUMBERS)).toEqual(2);
    expect(REAL_NUMBERS.nthChild(RATIONAL_REAL_NUMBERS)).toEqual(3);
    expect(REAL_NUMBERS.nthChild(IRRATIONAL_REAL_NUMBERS)).toEqual(4);
    expect(REAL_NUMBERS.compareTo(IMAGINARY_NUMBERS)).toBeLessThan(0);
    expect(IMAGINARY_NUMBERS.compareTo(REAL_NUMBERS)).toBeGreaterThan(0);
  });
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
        APERYS_CONSTANT,
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
        APERYS_CONSTANT,
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
        APERYS_CONSTANT,
      ],
    ],
  ])(
    'should return all included numbers for %s',
    (numberSet, expectedNumbers) => {
      const result = Array.from(numberSet.getAllContainedNumbers())
        .map((num) => num.name)
        .sort();
      expect(result).toStrictEqual(
        expectedNumbers.map((num) => num.name).sort(),
      );
    },
  );
});
