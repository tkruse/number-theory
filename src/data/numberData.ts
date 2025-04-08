interface IRepresentativeNumber {
  name: string;
  wikipediaLink: string;
  description: string;
  toString(): string;
}

class RepresentativeNumber implements IRepresentativeNumber {
  constructor(
    public name: string,
    public wikipediaLink: string,
    public description: string,
  ) {}

  toString(): string {
    return this.name.trim();
  }
}

const ZERO = new RepresentativeNumber(
  '0',
  'https://en.wikipedia.org/wiki/0',
  'The integer zero.',
);

const HALF = new RepresentativeNumber(
  '1/2',
  'https://en.wikipedia.org/wiki/0.5',
  'A rational number representing one half.',
);

const ONE = new RepresentativeNumber(
  '1',
  'https://en.wikipedia.org/wiki/1',
  'The integer one.',
);

const TWO = new RepresentativeNumber(
  '2',
  'https://en.wikipedia.org/wiki/2',
  'The integer two.',
);

const THREE = new RepresentativeNumber(
  '3',
  'https://en.wikipedia.org/wiki/3',
  'The integer three.',
);

const MINUS_ONE = new RepresentativeNumber(
  '-1',
  'https://en.wikipedia.org/wiki/-1',
  'The integer minus one.',
);

const MINUS_TWO = new RepresentativeNumber(
  '-2',
  'https://en.wikipedia.org/wiki/-2',
  'The integer minus two.',
);

const MINUS_THREE = new RepresentativeNumber(
  '-3',
  'https://en.wikipedia.org/wiki/-3',
  'The integer minus three.',
);

const ZERO_POINT_ONE = new RepresentativeNumber(
  '0.1',
  'https://en.wikipedia.org/wiki/0.1',
  'A decimal number representing one tenth.',
);

const SQRT_TWO = new RepresentativeNumber(
  '√2',
  'https://en.wikipedia.org/wiki/Square_root_of_2',
  'The square root of 2, an irrational number.',
);

const CUBE_ROOT_TWO = new RepresentativeNumber(
  '∛2',
  'https://en.wikipedia.org/wiki/Cube_root',
  'The cube root of 2, an irrational number.',
);

const PI = new RepresentativeNumber(
  'π',
  'https://en.wikipedia.org/wiki/Pi',
  "The ratio of a circle's circumference to its diameter.",
);

const E = new RepresentativeNumber(
  'e',
  'https://en.wikipedia.org/wiki/E_(mathematical_constant)',
  'The base of the natural logarithm, an irrational number.',
);

const IMAGINARY_UNIT = new RepresentativeNumber(
  'i',
  'https://en.wikipedia.org/wiki/Imaginary_unit',
  'The imaginary unit, which satisfies i² = -1.',
);

const E_TIMES_I = new RepresentativeNumber(
  'e * i',
  'https://en.wikipedia.org/wiki/Imaginary_unit#Exponential_form',
  'A complex number representing the product of e and the imaginary unit i.',
);

const I_PLUS_PI = new RepresentativeNumber(
  'i + π',
  'https://en.wikipedia.org/wiki/Complex_number',
  'A complex number representing the sum of the imaginary unit i and π.',
);

const GOLDEN_RATIO = new RepresentativeNumber(
  'φ',
  'https://en.wikipedia.org/wiki/Golden_ratio',
  'The golden ratio, an algebraic number approximately equal to 1.618, which is the positive solution to the equation x^2 = x + 1. Sometimes denoted as τ',
);

const CHAITINS_CONSTANT = new RepresentativeNumber(
  'Ω',
  'https://en.wikipedia.org/wiki/Chaitin%27s_constant',
  'A real number representing the halting probability of a universal Chaitin (self-delimiting Turing) machine.',
);

interface INumberSet {
  name: string;
  unicodeSymbol: string;
  cardinality: string;
  description: string;
  webLinks: string[];
  // Elements directly contained in this set, not part of any subpartition
  containedElements: IRepresentativeNumber[];
  // Partitions of subsets that are mutually exclusive and collectively exhaustive within this set
  containedPartitions: INumberSet[][];
  toString(): string;
  getAllContainedNumbers(): Set<IRepresentativeNumber>;
}

class NumberSet implements INumberSet {
  constructor(
    public name: string,
    public unicodeSymbol: string,
    public cardinality: string,
    public description: string,
    public webLinks: string[],
    public containedElements: IRepresentativeNumber[] = [],
    public containedPartitions: INumberSet[][] = [],
  ) {}

  toString(): string {
    return `${this.name} (${this.unicodeSymbol})`;
  }

  getAllContainedNumbers(): Set<IRepresentativeNumber> {
    const numbers = new Set<IRepresentativeNumber>(this.containedElements);
    this.containedPartitions.forEach((partition) => {
      partition.forEach((subset) => {
        subset.getAllContainedNumbers().forEach((num) => numbers.add(num));
      });
    });
    return numbers;
  }
}

const NATURAL_NUMBERS = new NumberSet(
  'Natural Numbers',
  'ℕ',
  'ℵ₀',
  'The set of all positive integers.',
  ['https://en.wikipedia.org/wiki/Natural_number'],
  [ONE, TWO, THREE],
  [],
);

const WHOLE_NUMBERS = new NumberSet(
  'Whole Numbers',
  'ℕ₀',
  'ℵ₀',
  'The set of all non-negative integers, including zero.',
  ['https://en.wikipedia.org/wiki/Whole_number'],
  [ZERO],
  [[NATURAL_NUMBERS]],
);

const INTEGERS = new NumberSet(
  'Integers',
  'ℤ',
  'ℵ₀',
  'The set of all whole numbers, including negative numbers, zero, and positive numbers.',
  ['https://en.wikipedia.org/wiki/Integer'],
  [MINUS_ONE, TWO, THREE, MINUS_TWO, MINUS_THREE],
  [[WHOLE_NUMBERS]],
);

const RATIONAL_NUMBERS = new NumberSet(
  'Rational Numbers',
  'ℚ',
  'ℵ₀',
  'Numbers that can be expressed as a fraction of two integers.',
  ['https://en.wikipedia.org/wiki/Rational_number'],
  [HALF, ZERO_POINT_ONE],
  [[INTEGERS]],
);

const CONSTRUCTIBLE_NUMBERS = new NumberSet(
  'Constructible Numbers',
  'C',
  'ℵ₀',
  'Numbers that can be constructed using a finite number of additions, subtractions, multiplications, divisions, and square root extractions of integers. These correspond to line segments constructible with a straightedge and compass.',
  ['https://en.wikipedia.org/wiki/Constructible_number'],
  [SQRT_TWO, GOLDEN_RATIO],
  [[RATIONAL_NUMBERS]],
);

const ALGEBRAIC_NUMBERS = new NumberSet(
  'Algebraic Numbers',
  'ℚ̅',
  'ℵ₀',
  'Numbers that are roots of non-zero polynomial equations with rational coefficients.',
  ['https://en.wikipedia.org/wiki/Algebraic_number'],
  [CUBE_ROOT_TWO],
  [[CONSTRUCTIBLE_NUMBERS]],
);

const TRANSCENDENTAL_NUMBERS = new NumberSet(
  'Transcendental Numbers',
  'ℝ \\ ℚ̅',
  'ℵ₁',
  'Numbers that are not roots of any non-zero polynomial equation with rational coefficients.',
  ['https://en.wikipedia.org/wiki/Transcendental_number'],
  [PI, E, CHAITINS_CONSTANT],
  [],
);

const IRRATIONAL_NUMBERS = new NumberSet(
  'Irrational Numbers',
  'ℝ \\ ℚ',
  'ℵ₀',
  'Numbers that cannot be expressed as a fraction of two integers.',
  ['https://en.wikipedia.org/wiki/Irrational_number'],
  [SQRT_TWO, GOLDEN_RATIO, CUBE_ROOT_TWO],
  [[TRANSCENDENTAL_NUMBERS]],
);

const COMPUTABLE_NUMBERS = new NumberSet(
  'Computable Numbers',
  'REC',
  'ℵ₀',
  'Numbers that can be computed to arbitrary precision by a finite, terminating algorithm. Also called recursive numbers.',
  ['https://en.wikipedia.org/wiki/Computable_number'],
  [E],
  [[ALGEBRAIC_NUMBERS]],
);

const REAL_NUMBERS = new NumberSet(
  'Real Numbers',
  'ℝ',
  'ℵ₁',
  'The set of all rational and irrational numbers.',
  ['https://en.wikipedia.org/wiki/Real_number'],
  [],
  [
    [ALGEBRAIC_NUMBERS, TRANSCENDENTAL_NUMBERS],
    [RATIONAL_NUMBERS, IRRATIONAL_NUMBERS],
  ],
);

const PURE_IMAGINARY_NUMBERS = new NumberSet(
  'Pure Imaginary Numbers',
  'ℑ₀',
  'ℵ₀',
  'Numbers that are purely imaginary, having no real part.',
  ['https://en.wikipedia.org/wiki/Imaginary_number'],
  [IMAGINARY_UNIT],
);

const IMAGINARY_NUMBERS = new NumberSet(
  'Imaginary Numbers',
  'ℑ',
  'ℵ₀',
  'Numbers that can be expressed in the form bi, where b is a real number and i is the imaginary unit.',
  ['https://en.wikipedia.org/wiki/Imaginary_number'],
  [E_TIMES_I, I_PLUS_PI],
  [[PURE_IMAGINARY_NUMBERS]],
);

const COMPLEX_NUMBERS = new NumberSet(
  'Complex Numbers',
  'ℂ',
  'ℵ₁',
  'The set of all numbers that can be expressed in the form a + bi, where a and b are real numbers and i is the imaginary unit.',
  ['https://en.wikipedia.org/wiki/Complex_number'],
  [],
  [[REAL_NUMBERS, IMAGINARY_NUMBERS]],
);

// TODO
// algebraic integers
// hyperreals, infinitesimals, surreal numbers
// definable
// IEEE numbers
// prime integers
// Mersenne primes
// Perfect numbers
// Fibonacci numbers
// Bernoulli numbers
// squares
// roots
// trigonometric numbers
// normal numbers
// Algebraic Integers
// Liouville Numbers

export {
  ZERO,
  ONE,
  TWO,
  THREE,
  MINUS_TWO,
  MINUS_THREE,
  ZERO_POINT_ONE,
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
  IMAGINARY_NUMBERS,
  PURE_IMAGINARY_NUMBERS,
  GOLDEN_RATIO,
  RepresentativeNumber,
  NumberSet,
};

export type { IRepresentativeNumber };
export type { INumberSet };
