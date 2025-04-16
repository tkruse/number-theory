import { useState, useEffect } from 'react';
import DiagramComponent from './components/DiagramComponent';
import {
  INumberSet,
  NUMBER_SETS,
  COMPLEX_NUMBERS,
  HYPERREAL_NUMBERS,
  HYPERCOMPLEX_NUMBERS,
} from './data/numberData';
import NumberSetChooser from './components/NumberSetChooser';
import { RenderInputs } from './layout/RectangleLayout';

// Helper to get a unique key for each set (use name, or unicodeSymbol if more robust)
function getSetKey(set: INumberSet): string {
  return set.name;
}

// Parse enabled sets from URL
function parseEnabledSetsFromUrl(): Map<INumberSet, boolean> {
  const params = new URLSearchParams(window.location.search);
  const setsParam = params.get('sets');
  if (!setsParam) {
    // Default: enable only selected sets
    const enabledSetNames = new Set([
      'Complex',
      'Real',
      'Algebraic',
      'Transcendental',
      'Rational',
      'Irrational',
      'Integers',
      'Imaginary',
    ]);
    return new Map(
      NUMBER_SETS.map((set) => [set, enabledSetNames.has(set.name)]),
    );
  }
  const enabledKeys = new Set(setsParam.split(','));
  return new Map(
    NUMBER_SETS.map((set) => [set, enabledKeys.has(getSetKey(set))]),
  );
}

// Encode enabled sets to URL
function encodeEnabledSetsToUrl(enabledNumberSets: Map<INumberSet, boolean>) {
  const enabledKeys = Array.from(enabledNumberSets.entries())
    .filter(([_, enabled]) => enabled)
    .map(([set]) => getSetKey(set));
  const params = new URLSearchParams(window.location.search);
  params.set('sets', enabledKeys.join(','));
  const newUrl =
    window.location.pathname +
    (params.toString() ? '?' + params.toString() : '');
  window.history.replaceState({}, '', newUrl);
}

function App() {
  const [enabledNumberSets, setEnabledNumberSets] = useState<
    Map<INumberSet, boolean>
  >(() => parseEnabledSetsFromUrl());

  /* Ensure HYPERREAL_NUMBERS is disabled if COMPLEX_NUMBERS is enabled,
   * because else the rendering would include hyperreal numbers in the complex.
   * A better solution would be to rewrite the layout algorith from scratch,
   * to work in more dimensions and directions.
   */
  useEffect(() => {
    if (
      (enabledNumberSets.get(COMPLEX_NUMBERS) ||
        enabledNumberSets.get(HYPERCOMPLEX_NUMBERS)) &&
      enabledNumberSets.get(HYPERREAL_NUMBERS)
    ) {
      const newMap = new Map(enabledNumberSets);
      newMap.set(HYPERREAL_NUMBERS, false);
      setEnabledNumberSets(newMap);
    }
    // Only run when enabledNumberSets changes
  }, [enabledNumberSets]);

  // Update URL when enabledNumberSets changes
  useEffect(() => {
    encodeEnabledSetsToUrl(enabledNumberSets);
  }, [enabledNumberSets]);

  // Listen for URL changes (e.g., back/forward navigation)
  useEffect(() => {
    const onPopState = () => {
      setEnabledNumberSets(parseEnabledSetsFromUrl());
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const renderInputs: RenderInputs[] = Array.from(
    enabledNumberSets.entries(),
  ).map(([numberSet, render]) => ({ numberSet, render }));
  return (
    <div className="app-container">
      <div className="title-legend-container">
        <h1>Numbers Chart</h1>
        <p>
          This diagram illustrates various number sets. Each area is empty
          unless the diagram shows any representative number. You can click on a
          label to open its Wikipedia page, and hover over elements to see
          descriptions. The symbols +, -, *, / represent whether the set is
          closed under these operations, the symbol &lt; means the set is
          ordered, and &lt; means it is well-ordered, having a minimum.
        </p>
      </div>
      <NumberSetChooser
        enabledNumberSets={enabledNumberSets}
        setEnabledNumberSets={setEnabledNumberSets}
      />
      <div className="diagram-container">
        <DiagramComponent renderInputs={renderInputs} />
      </div>
      <footer className="footer">
        <a
          href="https://github.com/tkruse/number-theory"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/github-mark.svg" alt="GitHub" className="github-icon" />
        </a>
      </footer>
      <section className="todo-list">
        <h2>Further interesting sets and numbers</h2>
        <h3>Number Sets</h3>
        <ul>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Superreal_number"
              target="_blank"
              rel="noopener noreferrer"
            >
              Superreal Numbers
            </a>
            : An extension of the real numbers that includes infinitesimals and
            infinite numbers, used to provide a rigorous foundation for calculus
            and analysis.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Normal_number"
              target="_blank"
              rel="noopener noreferrer"
            >
              Normal Numbers
            </a>
            : Numbers whose digits are uniformly distributed in every base. It
            is thought that numbers like π, e, ln(2), and all irrational
            algebraic numbers are absolutely normal, but this has not been
            proven for any known number. Almost all real numbers are absolutely
            normal, even though no specific number has been proven to be
            absolutely normal.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Liouville_number"
              target="_blank"
              rel="noopener noreferrer"
            >
              Liouville Numbers
            </a>
            : A class of definable transcendental numbers that can be
            approximated "too well" by rational numbers. They were the first
            numbers proven to be transcendental.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/IEEE_754"
              target="_blank"
              rel="noopener noreferrer"
            >
              IEEE Numbers
            </a>
            : Numbers represented in the IEEE 754 standard for floating-point
            arithmetic, widely used in computers and digital systems.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Dyadic_rational"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dyadic Rationals
            </a>
            : Rational numbers whose denominator is a power of two, important in
            computer science and binary arithmetic.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Bernoulli_number"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bernoulli Numbers
            </a>
            : A sequence of rational numbers with deep connections to number
            theory, especially in the study of the Riemann zeta function and
            calculus.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/P-adic_number"
              target="_blank"
              rel="noopener noreferrer"
            >
              p-adic Numbers
            </a>
            : An alternative number system for expressing numbers, useful in
            number theory and algebraic geometry.
          </li>
          <li>
            Special Integer Sets
            <ul>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Prime_number"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prime Integers
                </a>
                : Natural numbers greater than 1 that have no positive divisors
                other than 1 and themselves (infinite).
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Mersenne_prime"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mersenne Primes
                </a>
                : Primes of the form 2ⁿ−1, important in the search for large
                primes (infinite).
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Chen_prime"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chen Primes
                </a>
                : Primes p such that p+2 is either prime or a product of two
                primes (infinite).
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Twin_prime"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twin Primes
                </a>
                : Pairs of primes that differ by 2, such as (3, 5) and (11, 13)
                (infinite).
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Composite_number"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Composite Numbers
                </a>
                : Natural numbers greater than 1 that are not prime (infinite).
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Perfect_number"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Perfect Numbers
                </a>
                : Positive integers that are equal to the sum of their proper
                divisors (finite, known).
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Superperfect_number"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Superperfect Numbers
                </a>
                : Numbers n such that the sum of the divisors of the sum of the
                divisors of n equals 2n (finite, known).
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Smith_number"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Smith Numbers
                </a>
                : Composite numbers for which the sum of their digits equals the
                sum of the digits of their prime factors (infinite).
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Fibonacci_number"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fibonacci Numbers
                </a>
                : The sequence where each number is the sum of the two preceding
                ones, starting from 0 and 1 (infinite).
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Pell_number"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pell Numbers
                </a>
                : An integer sequence where each number is twice the previous
                plus the one before that, starting from 0 and 1 (infinite).
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Algebraic_integer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Algebraic Integers
                </a>
                : Complex numbers that are roots of monic polynomials with
                integer coefficients (infinite).
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Fermat_number"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fermat Numbers
                </a>
                : Numbers of the form 2^(2ⁿ)+1, related to constructible
                polygons (finite, known).
              </li>
            </ul>
          </li>
        </ul>
        <h3>Specific Numbers Candidates</h3>
        <ul>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Ap%C3%A9ry%27s_constant"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apery's Constant
            </a>
            : The value ζ(3), an irrational number that appears in number theory
            and mathematical analysis.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Catalan%27s_constant"
              target="_blank"
              rel="noopener noreferrer"
            >
              Catalan's Constant
            </a>
            : A mathematical constant that arises in combinatorics and number
            theory, denoted G ≈ 0.915965.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Euler%E2%80%93Mascheroni_constant"
              target="_blank"
              rel="noopener noreferrer"
            >
              Euler–Mascheroni Constant
            </a>
            : The limiting difference between the harmonic series and the
            natural logarithm, denoted γ ≈ 0.5772.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Feigenbaum_constants"
              target="_blank"
              rel="noopener noreferrer"
            >
              Feigenbaum Constants
            </a>
            : Two mathematical constants that appear in chaos theory and
            bifurcation theory.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Gelfond%E2%80%93Schneider_constant"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gelfond–Schneider Constant
            </a>
            : The number 2^√2, a famous example of a transcendental number.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Khinchin%27s_constant"
              target="_blank"
              rel="noopener noreferrer"
            >
              Khinchin's Constant
            </a>
            : A constant that arises in the study of continued fractions,
            approximately 2.685452.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Twin_prime#Twin_prime_constant"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twin Prime Constant
            </a>
            : A constant that appears in the formula for the density of twin
            primes, approximately 0.6601618.
          </li>
          <li>
            Ratios, similar to the Golden Ratio
            <ul>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Plastic_ratio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Plastic Ratio
                </a>
                : The unique real solution to x³ = x + 1, approximately 1.3247.
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Supergolden_ratio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Supergolden Ratio
                </a>
                : A solution to x³ = x² + 1, approximately 1.4656.
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Silver_ratio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Silver Ratio
                </a>
                : The number 1 + √2, approximately 2.4142.
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Supersilver_ratio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Supersilver Ratio
                </a>
                : A solution to x³ = 2x² + 1, approximately 2.8473.
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default App;
