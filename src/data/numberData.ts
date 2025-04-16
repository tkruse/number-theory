import { elementAt } from '../utils/collectionUtils';

enum NumberCategory {
  Hypercomplex,
  Imaginary,
  Real,
  // real irrational numbers conjectured to be absolutelyNormal
  Normal,
  // numbers that are part of liouville numbers, a historically important subset of transcendent numbers
  Liouville,
}

interface IRepresentativeNumber {
  name: string;
  wikipediaLink: string;
  description: string;
  category: NumberCategory;
  essentialForSubetsOfParents?: INumberSet[];
  toString(): string;
}

class RepresentativeNumber implements IRepresentativeNumber {
  constructor(
    public name: string,
    public wikipediaLink: string,
    public description: string,
    public category: NumberCategory = NumberCategory.Real,
    public essentialForSubetsOfParents = [],
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
  "Pythagoras' constant: The square root of 2, an irrational number. Approximately 1.41421.",
);

const CUBE_ROOT_TWO = new RepresentativeNumber(
  '∛2',
  'https://en.wikipedia.org/wiki/Cube_root',
  'The cube root of 2, an irrational number.',
);

const PI = new RepresentativeNumber(
  'π',
  'https://en.wikipedia.org/wiki/Pi',
  "Pi (Archimedes' constant), approximately 3.14159. The ratio of a circle's circumference to its diameter.",
);

const E = new RepresentativeNumber(
  'e',
  'https://en.wikipedia.org/wiki/E_(mathematical_constant)',
  "Euler's number, approximately 2.71828. The base of the natural logarithm, an irrational number.",
);

const LOGARITHM_TWO = new RepresentativeNumber(
  'ln2',
  'https://en.wikipedia.org/wiki/Natural_logarithm_of_2',
  'The natural logarithm of 2, an important constant in mathematics, approximately equal to 0.693147. According to the Lindemann–Weierstrass theorem, all logarithms of integers greater than 1 are transcendental.',
);

const CHAMPERNOWNE_CONSTANT = new RepresentativeNumber(
  'C₁₀',
  'https://en.wikipedia.org/wiki/Champernowne_constant',
  "Champernowne's constant, constructed by concatenating the decimal representations of consecutive natural numbers (e.g., 0.123456789101112...). It is a normal number in base 10. Similar numbers exist using prime numbers, square numbers and so on.",
);

const LIOUVILLE_CONSTANT = new RepresentativeNumber(
  'L',
  'https://en.wikipedia.org/wiki/Liouville_number',
  'The Liouville constant, constructed by placing a 1 in the decimal places corresponding to factorials (e.g., 0.110001000000000000000001...). It was the first number proven to be transcendental.',
);

const UNCOMPUTABLE_LIOUVILLE_NUMBERS = new RepresentativeNumber(
  'L?',
  'https://en.wikipedia.org/wiki/Liouville_number',
  'Many uncomputable numbers are Liouville numbers, but none is specifically known',
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
  'In Maths, no undefinable number can be defined, though most reals are undefinable. Intuitively, those are all numbers with infinite digits that do not follow any pattern or rule. Physical measurements would likely all be undefinable, if they could be measured at infinite precision.',
);

const IMAGINARY_UNIT = new RepresentativeNumber(
  'i',
  'https://en.wikipedia.org/wiki/Imaginary_unit',
  'The imaginary unit, which satisfies i² = -1.',
  NumberCategory.Imaginary,
);

const E_TIMES_I = new RepresentativeNumber(
  'e*i',
  'https://en.wikipedia.org/wiki/Imaginary_unit#Exponential_form',
  'A complex number representing the product of e and the imaginary unit i. Similar examples are 2*i, 0.5*i, etc.',
  NumberCategory.Imaginary,
);

const I_PLUS_PI = new RepresentativeNumber(
  'i+π',
  '',
  'A complex number representing the sum of the imaginary unit i and π.  Similar examples are 2+i, 0.5*3i, e+π*i etc.',
  NumberCategory.Imaginary,
);

const HYPER_COMPLEX = new RepresentativeNumber(
  'hc',
  'https://en.wikipedia.org/wiki/Hypercomplex_number',
  'a · i + b · j + c · k + ...An example of a hypercomplex number. Hypercomplex numbers generalize complex numbers and include systems such as the complex numbers, split-complex numbers, Quaternions, Octonions, Biquaternion, Sedenion, Trigintaduonion and more. These systems extend the real numbers in various ways, often with additional dimensions and different multiplication rules.',
  NumberCategory.Hypercomplex,
);

const INFINITESIMAL = new RepresentativeNumber(
  'ε',
  'https://en.wikipedia.org/wiki/Infinitesimal',
  'In mathematics, an infinitesimal number is a non-zero quantity that is closer to 0 than any non-zero real number is. It;s limit is usually taken as ε → 0.',
  NumberCategory.Real,
);

const OMEGA = new RepresentativeNumber(
  'ω',
  'https://en.wikipedia.org/wiki/Hyperreal_number',
  'An infinite hyperreal number (hyperinteger), often denoted ω. In non-standard analysis, ω is greater than any standard natural number and is used to represent an infinite quantity. 1/ω is an example of a positive infinitesimal.',
  NumberCategory.Hypercomplex,
);

enum AlgebraicStructure {
  Ordered = '<',
  WellOrderedSemiRing = '+*<<',
  OrderedRing = '+*-<',
  OrderedField = '+*-/<',
  OrderedFieldSquareRoot = '+*-/√<',
  OrderedFieldNthRoot = '+*-/∛<',
  Ring = '+*-',
  Field = '+*-/',
  FieldNthRoot = '+*-/∛',
}

interface INumberSet {
  name: string;
  unicodeSymbol: string;
  // relative size of infinite sets according to Cantor
  cardinality: string;
  // size of the infinite set according to lebesgue
  lebesgueMeasure: string;
  description: string;
  webLink: string;
  // Elements directly contained in this set, not part of any subpartition
  containedElements: IRepresentativeNumber[];
  // The algebraic structure of the number set (e.g., SemiRing, Ring, Field)
  algebraicStructure?: AlgebraicStructure;
  // Partitions of subsets that are mutually exclusive and collectively exhaustive within this set
  containedPartitions: INumberSet[][];
  containedSubSets: INumberSet[];
  partitionComplement?: INumberSet;
  parents?: INumberSet[];
  toString(): string;
  toFullDescription(): string;
  getContainedSets(): INumberSet[];
  getAllContainedNumbers(): Set<IRepresentativeNumber>;
  compareTo(other: INumberSet): number;
  nthChild(child: INumberSet): number;
}

const allNumberSets: INumberSet[] = [];

class NumberSet implements INumberSet {
  constructor(
    public name: string,
    public unicodeSymbol: string,
    public cardinality: string,
    public lebesgueMeasure: string,
    public description: string,
    public webLink: string,
    public algebraicStructure?: AlgebraicStructure,
    public containedElements: IRepresentativeNumber[] = [],
    public containedPartitions: INumberSet[][] = [],
    public containedSubSets: INumberSet[] = [],
    public neededNumbers: IRepresentativeNumber[] = [],
    public partitionComplement?: INumberSet,
    public parents?: INumberSet[],
  ) {
    allNumberSets.push(this);

    // Set the complement for each member of the partition assuming size 2
    this.containedPartitions.forEach((partition) => {
      if (partition.length === 2) {
        partition[0].partitionComplement = partition[1];
        partition[1].partitionComplement = partition[0];
      }
    });

    this.getContainedSets().forEach((containedSet) => {
      containedSet.parents ??= [];
      containedSet.parents.push(this);
    });

    neededNumbers.forEach((number) => {
      number.essentialForSubetsOfParents?.push(this);
    });
  }

  compareTo(other: NumberSet): number {
    if (this === other) {
      return 0;
    }
    if (this.isParentOf(other)) {
      return -1;
    }
    if (other.isParentOf(this)) {
      return 1;
    }

    // Helper to find the longest path from root to a node using memoization
    function longestPathFromRoot(
      node: NumberSet,
      root: NumberSet,
      memo: Map<NumberSet, NumberSet[]>,
    ): NumberSet[] {
      if (memo.has(node)) return memo.get(node) ?? [];
      if (node === root) {
        memo.set(node, [root]);
        return [root];
      }
      if (!node.parents || node.parents.length === 0) {
        memo.set(node, []);
        return [];
      }
      let maxPath: NumberSet[] = [];
      for (const parent of node.parents as NumberSet[]) {
        const path = longestPathFromRoot(parent, root, memo);
        if (path.length > maxPath.length) {
          maxPath = path;
        }
      }
      const result = [...maxPath, node];
      memo.set(node, result);
      return result;
    }

    // Use the exported ALL_NUMBERS singleton as root
    const root = ALL_NUMBERS as NumberSet;
    const memo = new Map<NumberSet, NumberSet[]>();
    const pathThis = longestPathFromRoot(this, root, memo);
    const pathOther = longestPathFromRoot(other, root, memo);

    // Find the first common parent (lowest common ancestor) from root down
    let commonParent: NumberSet | null = null;
    let iterationIndex = 0;
    while (
      iterationIndex < pathThis.length &&
      iterationIndex < pathOther.length &&
      pathThis[iterationIndex] === pathOther[iterationIndex]
    ) {
      commonParent = pathThis[iterationIndex];
      iterationIndex++;
    }

    if (!commonParent || iterationIndex === 0) {
      throw new Error(
        `No common parent found in compareTo between "${this.name}" and "${other.name}". This should never happen.`,
      );
    }

    // The children of the common parent that differ
    // pathThis[iterationIndex] and pathOther[iterationIndex] are the first nodes after the common ancestor
    const p1 = pathThis[iterationIndex] ?? this;
    const p2 = pathOther[iterationIndex] ?? other;

    // Find their positions in the common parent
    const pos1 = commonParent.nthChild(p1);
    const pos2 = commonParent.nthChild(p2);

    if (pos1 === -1 || pos2 === -1) {
      throw new Error(
        `Bug: One of the nodes is not a direct child of the common parent in compareTo between "${this.name}" and "${other.name}".`,
      );
    }
    return pos1 - pos2;
  }

  /**
   * Returns true if this set is a (transitive) parent of the given set.
   * Traverses all parents recursively.
   */
  isParentOf(descendant: NumberSet): boolean {
    const visited = new Set<NumberSet>();
    const stack: NumberSet[] = [];
    if (!descendant.parents) return false;
    stack.push(...(descendant.parents as NumberSet[]));
    while (stack.length > 0) {
      // Use elementAt to safely get the last element before popping
      const current = elementAt(stack, stack.length - 1);
      stack.pop();
      if (current === this) {
        return true;
      }
      if (!visited.has(current)) {
        visited.add(current);
        if (current.parents) {
          stack.push(...(current.parents as NumberSet[]));
        }
      }
    }
    return false;
  }

  /**
   * Returns an index  in the set (subsets first, then partitions).
   * Returns -1 if the given set is not a direct child.
   */
  nthChild(child: INumberSet): number {
    let index = 0;

    /* the order is a hardcoded heuristics mostly to solve
     * useful rendering order for the reals
     */
    for (const subset of this.containedSubSets) {
      if (subset === child) {
        return index;
      }
      index++;
    }
    for (const partition of this.containedPartitions) {
      for (const partitionChild of partition) {
        if (partitionChild === child) {
          return index;
        }
        index++;
      }
    }

    return -1;
  }

  toString(): string {
    return `${this.name} (${this.unicodeSymbol})`;
  }

  toFullDescription(): string {
    return `${this.name} (${this.unicodeSymbol}${this.algebraicStructure ? ', ' + this.algebraicStructure : ''}). Cardinality: ${this.cardinality} ${this.description}`;
  }

  getContainedSets(): INumberSet[] {
    const sets = [...this.containedSubSets];
    this.containedPartitions.forEach((partition) => {
      sets.push(...partition);
    });
    return sets;
  }

  getAllContainedNumbers(): Set<IRepresentativeNumber> {
    const numbers = new Set<IRepresentativeNumber>(this.containedElements);
    this.containedPartitions.forEach((partition) => {
      partition.forEach((subset) => {
        subset.getAllContainedNumbers().forEach((num) => numbers.add(num));
      });
    });
    this.containedSubSets.forEach((subset) => {
      subset.getAllContainedNumbers().forEach((num) => numbers.add(num));
    });
    return numbers;
  }
}

class NumberSetBuilder {
  public name: string;
  public unicodeSymbol: string;
  public cardinality: string;
  public lebesgueMeasure: string;
  public description: string;
  public webLink: string;
  public algebraicStructure?: AlgebraicStructure;
  public containedPartitions: INumberSet[][] = [];
  public containedSubSets: INumberSet[] = [];
  public containedElements: IRepresentativeNumber[] = [];
  public neededNumbers: IRepresentativeNumber[] = [];

  constructor(
    name: string,
    unicodeSymbol: string,
    cardinality: string,
    lebesgueMeasure: string,
    description: string,
    webLink: string,
    algebraicStructure?: AlgebraicStructure,
  ) {
    this.name = name;
    this.unicodeSymbol = unicodeSymbol;
    this.cardinality = cardinality;
    this.lebesgueMeasure = lebesgueMeasure;
    this.description = description;
    this.webLink = webLink;
    this.algebraicStructure = algebraicStructure;
  }

  addPartition(...partition: INumberSet[]) {
    this.containedPartitions.push(partition);
    return this;
  }

  needsNumbers(...numbers: IRepresentativeNumber[]) {
    this.neededNumbers.push(...numbers);
    return this;
  }

  needsNumbersOf(numberSet: INumberSet) {
    this.needsNumbers(...Array.from(numberSet.getAllContainedNumbers()));
    return this;
  }

  addSubsetsAndElements(
    subsets: INumberSet[],
    ...elements: IRepresentativeNumber[]
  ) {
    this.containedSubSets.push(...subsets);
    this.containedElements.push(...elements);
    return this;
  }

  build(): INumberSet {
    return new NumberSet(
      this.name,
      this.unicodeSymbol,
      this.cardinality,
      this.lebesgueMeasure,
      this.description,
      this.webLink,
      this.algebraicStructure,
      this.containedElements,
      this.containedPartitions,
      this.containedSubSets,
      this.neededNumbers,
    );
  }
}

const NATURAL_NUMBERS = new NumberSetBuilder(
  'Natural',
  'ℕ',
  'ℵ₀',
  '0',
  'The set of all positive integers.',
  'https://en.wikipedia.org/wiki/Natural_number',
  AlgebraicStructure.WellOrderedSemiRing,
)
  .addSubsetsAndElements([], ONE, TWO, THREE)
  .build();

const WHOLE_NUMBERS = new NumberSetBuilder(
  'Whole',
  'ℕ₀',
  'ℵ₀',
  '0',
  'The set of all non-negative integers, including zero.',
  'https://en.wikipedia.org/wiki/Whole_number',
  AlgebraicStructure.WellOrderedSemiRing,
)
  .addSubsetsAndElements([NATURAL_NUMBERS], ZERO)
  .needsNumbersOf(NATURAL_NUMBERS)
  .build();

const INTEGERS = new NumberSetBuilder(
  'Integers',
  'ℤ',
  'ℵ₀',
  '0',
  'The set of positive and negative integer numbers and zero.',
  'https://en.wikipedia.org/wiki/Integer',
  AlgebraicStructure.OrderedRing,
)
  .addSubsetsAndElements(
    [WHOLE_NUMBERS],
    MINUS_ONE,
    TWO,
    THREE,
    MINUS_TWO,
    MINUS_THREE,
  )
  .needsNumbersOf(WHOLE_NUMBERS)
  .build();

const RATIONAL_REAL_NUMBERS = new NumberSetBuilder(
  'Rational',
  'ℚ',
  'ℵ₀',
  '0',
  'Real numbers that can be expressed as a fraction of two integers.',
  'https://en.wikipedia.org/wiki/Rational_number',
  AlgebraicStructure.OrderedField,
)
  .addSubsetsAndElements([INTEGERS], HALF, ZERO_POINT_ONE)
  .needsNumbersOf(INTEGERS)
  .build();

const CONSTRUCTIBLE_REAL_NUMBERS = new NumberSetBuilder(
  'Constructible',
  'C',
  'ℵ₀',
  '0',
  'Real numbers that can be constructed using a finite number of additions, subtractions, multiplications, divisions, and square root extractions of integers. These correspond to line segments constructible with a straightedge and compass.',
  'https://en.wikipedia.org/wiki/Constructible_number',
  AlgebraicStructure.OrderedFieldSquareRoot,
)
  .addSubsetsAndElements([RATIONAL_REAL_NUMBERS], SQRT_TWO, GOLDEN_RATIO)
  .needsNumbersOf(RATIONAL_REAL_NUMBERS)
  .build();

const ALGEBRAIC_REAL_NUMBERS = new NumberSetBuilder(
  'Algebraic',
  'ℚ̅',
  'ℵ₀',
  '0',
  'Real Numbers that are roots of non-zero polynomial equations with rational coefficients.',
  'https://en.wikipedia.org/wiki/Algebraic_number',
  AlgebraicStructure.OrderedFieldNthRoot,
)
  .addSubsetsAndElements([CONSTRUCTIBLE_REAL_NUMBERS], CUBE_ROOT_TWO)
  .needsNumbersOf(CONSTRUCTIBLE_REAL_NUMBERS)
  .build();

const TRANSCENDENTAL_REAL_NUMBERS = new NumberSetBuilder(
  'Transcendental',
  'ℝ \\ ℚ̅',
  'ℵ₁',
  '1',
  'The Complement of algebraic real numbers. Numbers that are not roots of any non-zero polynomial equation with rational coefficients. Most real numbers are transcendental',
  'https://en.wikipedia.org/wiki/Transcendental_number',
  AlgebraicStructure.Ordered,
)
  .addSubsetsAndElements(
    [],
    PI,
    E,
    CHAITINS_CONSTANT,
    UNDEFINABLE_NUMBER,
    LIOUVILLE_CONSTANT,
    UNCOMPUTABLE_LIOUVILLE_NUMBERS,
    LOGARITHM_TWO,
    CHAMPERNOWNE_CONSTANT,
  )
  .build();

const IRRATIONAL_REAL_NUMBERS = new NumberSetBuilder(
  'Irrational',
  'ℝ \\ ℚ',
  'ℵ₁',
  '1',
  'The complement of rational real numbers. Numbers that cannot be expressed as a fraction of two integers. Most real numbers are Irrational, only some are rational.',
  'https://en.wikipedia.org/wiki/Irrational_number',
  AlgebraicStructure.Ordered,
)
  .addSubsetsAndElements(
    [TRANSCENDENTAL_REAL_NUMBERS],
    SQRT_TWO,
    GOLDEN_RATIO,
    CUBE_ROOT_TWO,
  )
  .needsNumbersOf(TRANSCENDENTAL_REAL_NUMBERS)
  .build();

const COMPUTABLE_REAL_NUMBERS = new NumberSetBuilder(
  'Computable',
  'REC',
  'ℵ₀',
  '0',
  'Real numbers that can be computed to arbitrary precision by a finite, terminating algorithm. Also called recursive numbers.',
  'https://en.wikipedia.org/wiki/Computable_number',
  AlgebraicStructure.OrderedFieldNthRoot,
)
  .addSubsetsAndElements(
    [ALGEBRAIC_REAL_NUMBERS],
    E,
    GOLDEN_RATIO,
    PI,
    LIOUVILLE_CONSTANT,
    LOGARITHM_TWO,
    CHAMPERNOWNE_CONSTANT,
  )
  .needsNumbersOf(ALGEBRAIC_REAL_NUMBERS)
  .build();

const DEFINABLE_REAL_NUMBERS = new NumberSetBuilder(
  'Definable',
  'D',
  'ℵ₀',
  '0',
  'Informally, a definable real number is a real number that can be uniquely specified by any finite mathematical description identifying it precisely.',
  'https://en.wikipedia.org/wiki/Definable_real_number',
  AlgebraicStructure.OrderedFieldNthRoot,
)
  .addSubsetsAndElements(
    [COMPUTABLE_REAL_NUMBERS],
    CHAITINS_CONSTANT,
    UNCOMPUTABLE_LIOUVILLE_NUMBERS,
  )
  .needsNumbersOf(COMPUTABLE_REAL_NUMBERS)
  .build();

const REAL_NUMBERS = new NumberSetBuilder(
  'Real',
  'ℝ',
  'ℵ₁',
  'infinite',
  'The set of all rational and irrational numbers.',
  'https://en.wikipedia.org/wiki/Real_number',
  AlgebraicStructure.OrderedFieldNthRoot,
)
  .addPartition(ALGEBRAIC_REAL_NUMBERS, TRANSCENDENTAL_REAL_NUMBERS)
  .addPartition(RATIONAL_REAL_NUMBERS, IRRATIONAL_REAL_NUMBERS)
  .addSubsetsAndElements([DEFINABLE_REAL_NUMBERS])
  .needsNumbersOf(RATIONAL_REAL_NUMBERS)
  .build();

const PURE_IMAGINARY_NUMBERS = new NumberSetBuilder(
  'Pure Imaginary',
  'ℑ₀',
  'ℵ₁',
  '0',
  'Complex Numbers that are purely imaginary a * i, having no real part.',
  'https://en.wikipedia.org/wiki/Imaginary_number',
)
  .addSubsetsAndElements([], IMAGINARY_UNIT, E_TIMES_I)
  .build();

const IMAGINARY_NUMBERS = new NumberSetBuilder(
  'Imaginary',
  'ℑ',
  'ℵ₁',
  '0',
  'Numbers that can be expressed in the form a + bi, where a ≠ 0, b ≠ 0, where i is the imaginary unit.',
  'https://en.wikipedia.org/wiki/Imaginary_number',
)
  .addSubsetsAndElements([PURE_IMAGINARY_NUMBERS], I_PLUS_PI)
  .needsNumbersOf(PURE_IMAGINARY_NUMBERS)
  .build();

const COMPLEX_NUMBERS = new NumberSetBuilder(
  'Complex',
  'ℂ',
  'ℵ₁',
  'infinite',
  'The set of all numbers that can be expressed in the form a + bi, where a and b are real numbers and i is the imaginary unit.',
  'https://en.wikipedia.org/wiki/Complex_number',
  AlgebraicStructure.FieldNthRoot,
)
  .addPartition(REAL_NUMBERS, IMAGINARY_NUMBERS)
  .needsNumbersOf(REAL_NUMBERS)
  .needsNumbersOf(IMAGINARY_NUMBERS)
  .build();

const HYPERCOMPLEX_NUMBERS = new NumberSetBuilder(
  'Hypercomplex',
  '𝕳',
  '',
  '',
  'The set of all hypercomplex numbers, which generalize complex numbers and include systems such as the complex numbers, split-complex numbers, quaternions, octonions, and more. These systems extend the real numbers in various ways, often with additional dimensions and different multiplication rules.',
  'https://en.wikipedia.org/wiki/Hypercomplex_number',
  undefined,
)
  .addSubsetsAndElements([COMPLEX_NUMBERS], HYPER_COMPLEX)
  .build();

const HYPERREAL_NUMBERS = new NumberSetBuilder(
  'Hyperreal',
  'ℝ*',
  '',
  '',
  'The set of all hyperreal numbers, which extend the real numbers to include infinitesimal and infinite quantities. Hyperreal numbers are used in non-standard analysis and include all real numbers as well as numbers greater than any real (infinite) and less than any positive real (infinitesimal).',
  'https://en.wikipedia.org/wiki/Hyperreal_number',
  undefined,
)
  .addSubsetsAndElements([REAL_NUMBERS], INFINITESIMAL, OMEGA)
  .build();

const ALL_NUMBERS = new NumberSetBuilder(
  'All Numbers',
  '',
  'ℵ₁',
  'infinite',
  'A set containing all number sets in this application.',
  '',
)
  .addSubsetsAndElements([HYPERREAL_NUMBERS, HYPERCOMPLEX_NUMBERS])
  .needsNumbersOf(REAL_NUMBERS)
  .needsNumbersOf(COMPLEX_NUMBERS)
  .build();

const NUMBER_SETS = allNumberSets.slice().sort((a, b) => a.compareTo(b));

// TODO
// a set/partition can have default visibility
// mark subsets as constituting (their representative numbers must be rendered when rendering the parent) vs informative (only render their numbers when that set is rendered)
// arrange representative numbers more smartly
// rearrange sets: display as nested rectangle with layered title bars
// 1st level: [algebraic, transcendent]
// 2st level: [imaginary, real, imaginary]
// 3nd level: [algebraic imaginaries, algebraic reals, transcendental reals, transcendental imaginaries]
// improve rendering proportions and symmetry
// better font
// hyperreals, infinitesimals, surreal, surcomplex, transfinite, hypercomplex
// Apery's constant, Catalan's constant, Euler-Mascheroni constant, Feigenbaum constants, Gelfond–Schneider constant, Khinchin's constant, plastic number, twin prime constant
// configure sets in URL for sharing of specific images
// enable configuring of drawing options
// select all, select none
// fallback SVG content when none is selected.
// Make all controls hidden in menu icon

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
  HYPER_COMPLEX,
  INFINITESIMAL,
  OMEGA,
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
  HYPERCOMPLEX_NUMBERS,
  HYPERREAL_NUMBERS,
  CONSTRUCTIBLE_REAL_NUMBERS,
  IMAGINARY_NUMBERS,
  PURE_IMAGINARY_NUMBERS,
  CHAMPERNOWNE_CONSTANT,
  LIOUVILLE_CONSTANT,
  UNCOMPUTABLE_LIOUVILLE_NUMBERS,
  LOGARITHM_TWO,
  GOLDEN_RATIO,
  RepresentativeNumber,
  NumberSet,
  ALL_NUMBERS,
  NUMBER_SETS,
};

export type { IRepresentativeNumber };
export type { INumberSet };
