import { useState, useEffect } from 'react';
import DiagramComponent from './components/DiagramComponent';
import { INumberSet, NUMBER_SETS } from './data/numberData';
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
    // Default: all enabled
    return new Map(NUMBER_SETS.map((set) => [set, true]));
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
        <h2>Future Additions</h2>
        <h3>Number Set Candidates</h3>
        <ul>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Hyperreal_number"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hyperreal Numbers
            </a>
            : An extension of the real numbers that includes infinitesimal and
            infinite quantities, used in non-standard analysis to rigorously
            justify calculus concepts.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Infinitesimal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Infinitesimal Numbers
            </a>
            : Numbers that are greater than zero but smaller than any positive
            real number, used in non-standard analysis to rigorously define
            concepts like derivatives and integrals.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Surreal_number"
              target="_blank"
              rel="noopener noreferrer"
            >
              Surreal Numbers
            </a>
            : A class of numbers that includes real numbers, infinite numbers,
            and infinitesimals, providing a rich number system that extends
            beyond the reals.
          </li>
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
              href="https://en.wikipedia.org/wiki/Hypercomplex_number"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hypercomplex Numbers
            </a>
            : A generalization of complex numbers, expressed in the form a · x +
            b · y + ..., where a, b, ... are real numbers and x, y, ... are
            basis elements that extend beyond the real and imaginary units.
          </li>
          <ul>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Split-complex_number"
                target="_blank"
                rel="noopener noreferrer"
              >
                Split-complex Numbers
              </a>{' '}
              (hyperbolic numbers): Also known as hyperbolic numbers, these
              extend complex numbers by using a different multiplication rule,
              where the square of the imaginary unit is +1 instead of -1. They
              are used in various applications, including special relativity.
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Quaternion"
                target="_blank"
                rel="noopener noreferrer"
              >
                Quaternion
              </a>{' '}
              (4 elements)
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Biquaternion"
                target="_blank"
                rel="noopener noreferrer"
              >
                Biquaternion
              </a>{' '}
              (8 elements)
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Octonion"
                target="_blank"
                rel="noopener noreferrer"
              >
                Octonion
              </a>{' '}
              (8 elements)
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Sedenion"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sedenion
              </a>{' '}
              (16 elements)
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Trigintaduonion"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trigintaduonion
              </a>{' '}
              (32 elements)
            </li>
          </ul>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Normal_number"
              target="_blank"
              rel="noopener noreferrer"
            >
              Normal Numbers
            </a>{' '}
            (absolutely normal): Numbers whose digits are uniformly distributed
            in every base. It is thought that numbers like π, e, ln(2), and all
            irrational algebraic numbers are absolutely normal, but this has not
            been proven for any known number. Almost all real numbers are
            absolutely normal, even though no specific number has been proven to
            be absolutely normal.
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
          <li>(IEEE Numbers)</li>
          <li>(Dyadic Rationals)</li>
          <li>(Bernoulli Numbers)</li>
          <li>(p-adic numbers)</li>
          <li>
            Special Integer Sets
            <ul>
              <li>Prime Integers (infinite)</li>
              <li>(Mersenne Primes) (infinite)</li>
              <li>(Chen Primes) (infinite)</li>
              <li>(Twin Primes) (infinite)</li>
              <li>(Composite Numbers) (infinite)</li>
              <li>(Perfect Numbers) (finite, known)</li>
              <li>(Superperfect Numbers) (finite, known)</li>
              <li>(Smith Numbers) (infinite)</li>
              <li>(Fibonacci Numbers) (infinite)</li>
              <li>(Algebraic Integers) (infinite)</li>
              <li>(Fermat numbers) (finite, known)</li>
            </ul>
          </li>
        </ul>
        <h3>Specific Numbers Candidates</h3>
        <ul>
          <li>Infinity</li>
          <li>Nullity</li>
          <li>Epsilon</li>
          <li>Apery's Constant</li>
          <li>Catalan's Constant</li>
          <li>Euler-Mascheroni Constant</li>
          <li>Feigenbaum Constants</li>
          <li>Gelfond–Schneider Constant</li>
          <li>Khinchin's Constant</li>
          <li>Twin Prime Constant</li>
          <li>
            Ratios, similar to the Golden Ratio
            <ul>
              <li>Plastic Ratio</li>
              <li>Supergolden Ratio</li>
              <li>Silver Ratio</li>
              <li>Supersilver Ratio</li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default App;
