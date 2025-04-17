
# TODO List

* mark subsets as constituting (their representative numbers must be rendered when rendering the parent) vs informative (only render their numbers when that set is rendered)
* arrange representative numbers more smartly
* rearrange sets: display as nested rectangle with layered title bars
* 1st level: [algebraic, transcendent]
* 2st level: [imaginary, real, imaginary]
* 3nd level: [algebraic imaginaries, algebraic reals, transcendental reals, transcendental imaginaries]
* improve rendering proportions and symmetry
* better font
* surreal, surcomplex, transfinite, hypercomplex
* Apery's constant, Catalan's constant, Euler-Mascheroni constant, Feigenbaum constants, Gelfond–Schneider constant, Khinchin's constant, plastic number, twin prime constant
* enable configuring of drawing options
* select all, select none
* fallback SVG content when none is selected.

# Random thoughts

## Current Design

The current layout tries to prioritize rendering the hierarchy of Fields (Natural, Rational, Algebraic, Real, Complex) on the X-Axis left to right.
Other Sets are overlayed on top of this.
That design principle makes for great readability.
The hardcoded sorting from largest to smallest helps with the overlaying of the sets, the colored fill pattern helps readability and makes the diagram more appealing than black-and-white.
The links and tooltips turn this into an excellent self-education medium.
The dynamic nature allowing users to "play around" helps to make this slightly entertaining.

Weaknesses are: 

* Currently, the algorithm cannot consider various intersecting subsets like Normal numbers, those would need to get their own "rows"
* Partitions are not properly displayed as such
* Sets that can be partitioned in multiple ways or have non-overlapping subsets are not possible to render with this method.
* The logic for deciding whether to render an example number or not is unclear, flawed and buggy.
* Padding and margins are not consistent, and messy

Key rendering problems are: 
* Splitting the complex numbers both in Real and Imaginary parts, and also Algebraic Complex and Transcendental Complex
* Splitting all numbers into Hyperreal and Real, but also HyperComplex, Complex and real, without fake overlaps
* Splitting the reals into both Rational and Irrational, but also Algebraic Reals and Transcendental Reals, where Algebraic Reals contains Rationals, but Transcendental Reals contains Irrational numbers.
* Rendering normal numbers in a special way as the membership of many numbers is just conjectured, and there is overlap with both irrationals and transcendentals.
* Deciding which numbers to render to keep the diagram focused on the selected sets and their differences.
* Label sizes are currently roughly estimated (could be a quick fix)

## Future idea: Composite partitions with multiple header rows

* The Grid should have rows and Columns, not just columns.
* The Grid should also have meta-rows, for vertical alignment of alternative sets.
* Partitions should be rendered as single box, split horizontally or vertically.
* Sets with multiple ways to partition them can also use double vertical partitioning:

```
|                               Complex                             |
|    Imaginary   |         Real                 |      Imaginary    |
|  Algebraic                 |     |     Transcendental             |
|                |  Rational |  Irrational      |                   |
---------------------------------------------------------------------
|                |           |     |            |                   | 
```

This splits the Imaginaries into two columns, sadly.

The alternative is to have horizontal splits

## Future algorithm steps

1. Decide which Sets to render (based on user Input)
2. Decide which numbers to render (based on sets)

   This step is non-trivial for UX, just rendering all contained numbers makes the diagram less useful. 
   As an example when just selecting the Reals, -1, 0, 1, 2, 3 might be good, but not 4,5,6,7,8,9,10.
3. Decide how to Group the numbers based on the sets to show, form number clusters where the numbers belong all to the same set.
4. Form a simplified structure of these sets and their relationships to make algorithms easier
5. Decide how to lay out the number groups in a 2d grid based on the sets to show 

   Again this does not seem trivial. 
   My approach would still be to use the x-Axis as main layout, and grow to the right with the typical sets until the complex numbers.
   For all other sets, either consider special rows (to the bottom), or growing to the left (for hyperreals).
6. Decide on a rendering order background to foreground, and left to right, top to bottom.
7. For each number set, find the rectangle in the grid it should cover, and in what order it should surround any cell
 
   Basically each row and column in the grid have dynamic separation layers for padding and margin. A layer on a column can be used by multiple sets as long as they do not touch the same rows and vice versa.
8. render the set labels to get the label size in the respective cells, grow the columns and rows respectively
9. based on the numbers in the cells, also grow size (spread to columns and rows)
10. render the sets as rectangles based on grid columns, rows and layers
11. render the numbers

This would require so many changes to the current code that I would rather start from scratch if I wanted to do this.