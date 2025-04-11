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

const MINUS_TWO = new RepresentativeNumber('-2', '', 'The integer minus two.');

const MINUS_THREE = new RepresentativeNumber(
  '-3',
  '',
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
  'The square root of 2, an irrational number. Approximately 1.41421.',
);

const CUBE_ROOT_TWO = new RepresentativeNumber(
  '∛2',
  'https://en.wikipedia.org/wiki/Cube_root',
  'The cube root of 2, an irrational number.',
);

const PI = new RepresentativeNumber(
  'π',
  'https://en.wikipedia.org/wiki/Pi',
  "Pi, approximately 3.14159. The ratio of a circle's circumference to its diameter.",
);

const E = new RepresentativeNumber(
  'e',
  'https://en.wikipedia.org/wiki/E_(mathematical_constant)',
  "Euler's number, approximately 2.71828. The base of the natural logarithm, an irrational number.",
);

const IMAGINARY_UNIT = new RepresentativeNumber(
  'i',
  'https://en.wikipedia.org/wiki/Imaginary_unit',
  'The imaginary unit, which satisfies i² = -1.',
);

const E_TIMES_I = new RepresentativeNumber(
  'e*i',
  'https://en.wikipedia.org/wiki/Imaginary_unit#Exponential_form',
  'A complex number representing the product of e and the imaginary unit i.',
);

const I_PLUS_PI = new RepresentativeNumber(
  'i+π',
  '',
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
  'A real number representing the halting probability of a universal Chaitin (self-delimiting Turing) machine. It has a definition but is not computable.',
);

const UNDEFINABLE_NUMBER = new RepresentativeNumber(
  '?',
  '',
  'In Maths, no undefinable number can be defined, though most reals are undefinable. Physical measurements would likely all be undefinable, if they could be measured at infinite precision.',
);

enum AlgebraicStructure {
  SemiRing = '+*',
  Ring = '+*-',
  Field = '+*-/',
}

interface INumberSet {
  name: string;
  unicodeSymbol: string;
  cardinality: string;
  description: string;
  webLink: string;
  // Elements directly contained in this set, not part of any subpartition
  containedElements: IRepresentativeNumber[];
  // The algebraic structure of the number set (e.g., SemiRing, Ring, Field)
  algebraicStructure?: AlgebraicStructure;
  // Partitions of subsets that are mutually exclusive and collectively exhaustive within this set
  containedPartitions: INumberSet[][];
  toString(): string;
  toFullDescription(): string;
  getAllContainedNumbers(): Set<IRepresentativeNumber>;
}

class NumberSet implements INumberSet {
  constructor(
    public name: string,
    public unicodeSymbol: string,
    public cardinality: string,
    public description: string,
    public webLink: string,
    public algebraicStructure?: AlgebraicStructure,
    public containedElements: IRepresentativeNumber[] = [],
    public containedPartitions: INumberSet[][] = [],
  ) {}

  toString(): string {
    return `${this.name} (${this.unicodeSymbol})`;
  }

  toFullDescription(): string {
    return `${this.name} (${this.unicodeSymbol}${this.algebraicStructure ? ', ' + this.algebraicStructure : ''}). Cardinality: ${this.cardinality} ${this.description}`;
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
  'Natural',
  'ℕ',
  'ℵ₀',
  'The set of all positive integers.',
  'https://en.wikipedia.org/wiki/Natural_number',
  AlgebraicStructure.SemiRing,
  [ONE, TWO, THREE],
  [],
);

const WHOLE_NUMBERS = new NumberSet(
  'Whole',
  'ℕ₀',
  'ℵ₀',
  'The set of all non-negative integers, including zero.',
  'https://en.wikipedia.org/wiki/Whole_number',
  AlgebraicStructure.SemiRing,
  [ZERO],
  [[NATURAL_NUMBERS]],
);

const INTEGERS = new NumberSet(
  'Integers',
  'ℤ',
  'ℵ₀',
  'The set of positive and negative integer numbers and zero.',
  'https://en.wikipedia.org/wiki/Integer',
  AlgebraicStructure.Ring,
  [MINUS_ONE, TWO, THREE, MINUS_TWO, MINUS_THREE],
  [[WHOLE_NUMBERS]],
);

const RATIONAL_REAL_NUMBERS = new NumberSet(
  'Rational',
  'ℚ',
  'ℵ₀',
  'Real numbers that can be expressed as a fraction of two integers.',
  'https://en.wikipedia.org/wiki/Rational_number',
  AlgebraicStructure.Field,
  [HALF, ZERO_POINT_ONE],
  [[INTEGERS]],
);

const CONSTRUCTIBLE_REAL_NUMBERS = new NumberSet(
  'Constructible',
  'C',
  'ℵ₀',
  'Real numbers that can be constructed using a finite number of additions, subtractions, multiplications, divisions, and square root extractions of integers. These correspond to line segments constructible with a straightedge and compass.',
  'https://en.wikipedia.org/wiki/Constructible_number',
  AlgebraicStructure.Field,
  [SQRT_TWO, GOLDEN_RATIO],
  [[RATIONAL_REAL_NUMBERS]],
);

const ALGEBRAIC_REAL_NUMBERS = new NumberSet(
  'Algebraic',
  'ℚ̅',
  'ℵ₀',
  'Real Numbers that are roots of non-zero polynomial equations with rational coefficients.',
  'https://en.wikipedia.org/wiki/Algebraic_number',
  AlgebraicStructure.Field,
  [CUBE_ROOT_TWO],
  [[CONSTRUCTIBLE_REAL_NUMBERS]],
);

const TRANSCENDENTAL_REAL_NUMBERS = new NumberSet(
  'Transcendental',
  'ℝ \\ ℚ̅',
  'ℵ₁',
  'The Complement of algebraic real numbers. Numbers that are not roots of any non-zero polynomial equation with rational coefficients. Most real numbers are transcendental',
  'https://en.wikipedia.org/wiki/Transcendental_number',
  undefined,
  [PI, E, CHAITINS_CONSTANT, UNDEFINABLE_NUMBER],
  [],
);

const IRRATIONAL_REAL_NUMBERS = new NumberSet(
  'Irrational',
  'ℝ \\ ℚ',
  'ℵ₁',
  'The complement of rational real numbers. Numbers that cannot be expressed as a fraction of two integers. Most real numbers are Irrational, only some are rational.',
  'https://en.wikipedia.org/wiki/Irrational_number',
  undefined,
  [SQRT_TWO, GOLDEN_RATIO, CUBE_ROOT_TWO],
  [[TRANSCENDENTAL_REAL_NUMBERS]],
);

const COMPUTABLE_REAL_NUMBERS = new NumberSet(
  'Computable',
  'REC',
  'ℵ₀',
  'Real numbers that can be computed to arbitrary precision by a finite, terminating algorithm. Also called recursive numbers.',
  'https://en.wikipedia.org/wiki/Computable_number',
  AlgebraicStructure.Field,
  [E, GOLDEN_RATIO, PI],
  [[ALGEBRAIC_REAL_NUMBERS]],
);

const DEFINABLE_REAL_NUMBERS = new NumberSet(
  'Definable',
  'D',
  'ℵ₀',
  'Informally, a definable real number is a real number that can be uniquely specified by any finite mathematical description identifying it precisely.',
  'https://en.wikipedia.org/wiki/Definable_real_number',
  AlgebraicStructure.Field,
  [CHAITINS_CONSTANT],
  [[COMPUTABLE_REAL_NUMBERS]],
);

const REAL_NUMBERS = new NumberSet(
  'Real',
  'ℝ',
  'ℵ₁',
  'The set of all rational and irrational numbers.',
  'https://en.wikipedia.org/wiki/Real_number',
  AlgebraicStructure.Field,
  [],
  [
    [DEFINABLE_REAL_NUMBERS],
    [ALGEBRAIC_REAL_NUMBERS, TRANSCENDENTAL_REAL_NUMBERS],
    [RATIONAL_REAL_NUMBERS, IRRATIONAL_REAL_NUMBERS],
  ],
);

const PURE_IMAGINARY_NUMBERS = new NumberSet(
  'Pure Imaginary',
  'ℑ₀',
  'ℵ₁',
  'Complex Numbers that are purely imaginary a * i, having no real part.',
  'https://en.wikipedia.org/wiki/Imaginary_number',
  undefined,
  [IMAGINARY_UNIT, E_TIMES_I],
);

const IMAGINARY_NUMBERS = new NumberSet(
  'Imaginary',
  'ℑ',
  'ℵ₁',
  'Numbers that can be expressed in the form a + bi, where a ≠ 0, b ≠ 0, where i is the imaginary unit.',
  'https://en.wikipedia.org/wiki/Imaginary_number',
  undefined,
  [I_PLUS_PI],
  [[PURE_IMAGINARY_NUMBERS]],
);

const COMPLEX_NUMBERS = new NumberSet(
  'Complex',
  'ℂ',
  'ℵ₁',
  'The set of all numbers that can be expressed in the form a + bi, where a and b are real numbers and i is the imaginary unit.',
  'https://en.wikipedia.org/wiki/Complex_number',
  AlgebraicStructure.Field,
  [],
  [[REAL_NUMBERS, IMAGINARY_NUMBERS]],
);

// TODO
// a set/partition can have default visibility
// controls for set/partition visibility
// all sets are added to a collection on construction
// where possible, render partitions with same vertical height (unless it breaks containment)
// mark subsets as constituting (their representative numbers must be rendered when rendering the parent) vs informative (only render their numbers when that set is rendered)
// rearrange sets: display as nested rectangle with layered title bars
// 1st level: [algebraic, transcendent]
// 2st level: [imaginary, real, imaginary]
// 3nd level: [algebraic imaginaries, algebraic reals, transcendental reals, transcendental imaginaries]
// arrange representative numbers more smartly
// display whether totally and / or well ordered '<', '<<'
// improve rendering proportions and symmetry
// better font
// hyperreals, infinitesimals, surreal, surcomplex, transfinite, hypercomplex
// non-definable numbers
// IEEE numbers
// prime integers / composite numbers
// Dyadic rational
// Mersenne primes
// Perfect numbers
// Fibonacci numbers
// Bernoulli numbers
// trigonometric numbers
// normal numbers
// Algebraic Integers
// Liouville Numbers
// infinity, nullity
// epsilon
// Apery's constant, Catalan's constant, Euler-Mascheroni constant, Feigenbaum constants, Gelfond–Schneider constant, Khinchin's constant, plastic number, twin prime constant

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
  UNDEFINABLE_NUMBER,
  NATURAL_NUMBERS,
  WHOLE_NUMBERS,
  INTEGERS,
  RATIONAL_REAL_NUMBERS,
  IRRATIONAL_REAL_NUMBERS,
  TRANSCENDENTAL_REAL_NUMBERS,
  ALGEBRAIC_REAL_NUMBERS,
  COMPUTABLE_REAL_NUMBERS,
  DEFINABLE_REAL_NUMBERS,
  REAL_NUMBERS,
  COMPLEX_NUMBERS,
  CONSTRUCTIBLE_REAL_NUMBERS,
  IMAGINARY_NUMBERS,
  PURE_IMAGINARY_NUMBERS,
  GOLDEN_RATIO,
  RepresentativeNumber,
  NumberSet,
};

export type { IRepresentativeNumber };
export type { INumberSet };
