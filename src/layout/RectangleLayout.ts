import { INumberSet, IRepresentativeNumber } from '../data/numberData';
import Grid from './Grid';
import { elementAt } from '../utils/collectionUtils';
import { Column } from './Column';

export interface RenderInputs {
  numberSet: INumberSet;
  render: boolean;
}

/**
 * Creates a rectangle layout for a given number set.
 * The current implementation is a bit of a hack making assumptions about the order of the sets.
 * It also arranges all numbers in a single line instead of seeking a two-dimensional order.
 */
function createRectangleLayout(renderInputs: RenderInputs[] = []): Grid {
  const grid = new Grid();
  // Map to track sets that have been added to avoid duplicates
  const addedSets = new Map<string, { start: number; end: number }>();
  // Map to track numbers that have been added and their columns
  const addedNumbers = new Map<string, number>();

  // try rendering numbers even when their direct set is not rendered, if they are essential for some other parent
  function mustRenderForParent(
    set: INumberSet,
    elements: IRepresentativeNumber[],
  ): boolean {
    const essentialSets = new Set(
      elements.flatMap((e) => e.essentialForSubetsOfParents ?? []),
    );
    if (essentialSets.size === 0) return false;
    // Create an array of parents to check
    const parentsToCheck: INumberSet[] = [];
    const seenParents = new Set<INumberSet>();
    if (set.parents) {
      set.parents.forEach((parent: INumberSet) => {
        parentsToCheck.push(parent);
        seenParents.add(parent);
      });
    }
    // Traverse parents
    while (parentsToCheck.length > 0) {
      const parent = parentsToCheck.shift();
      if (!parent) continue;
      // Check if parent is to be rendered
      const parentRender = renderInputs.find(
        (r) => r.numberSet === parent,
      )?.render;
      if (parentRender && essentialSets.has(parent)) {
        return true;
      }
      // Add parent's parents to the list, but only if not already seen
      if (parent.parents) {
        parent.parents.forEach((grandparent: INumberSet) => {
          if (!seenParents.has(grandparent)) {
            parentsToCheck.push(grandparent);
            seenParents.add(grandparent);
          }
        });
      }
    }
    return false;
  }

  // recursive traversal function to determine the start and end columns for each set
  const traverse = (set: INumberSet): { start: number; end: number } => {
    const existing = addedSets.get(set.name);
    if (existing) {
      return existing;
    }
    const renderControl = renderInputs.find(
      (control) => control.numberSet.name === set.name,
    ) ?? { numberSet: set, render: true };

    if (set.getContainedSets().length === 0) {
      // Leaf node: determine the range of columns that contain elements of the set
      let start = Infinity;
      let end = -Infinity;

      set.containedElements.forEach((element) => {
        const columnIndex = addedNumbers.get(element.name);
        if (columnIndex !== undefined) {
          start = Math.min(start, columnIndex);
          end = Math.max(end, columnIndex);
        }
      });

      // Add new columns if needed for elements not yet added
      const newElements = set.containedElements.filter(
        (element) => !addedNumbers.has(element.name),
      );

      if (
        newElements.length > 0 &&
        (renderControl.render || mustRenderForParent(set, newElements))
      ) {
        const column = new Column();
        grid.addColumn(column);
        const newColumnIndex = grid.columns.length - 1;
        newElements.forEach((element) => {
          column.addNumber(element);
          addedNumbers.set(element.name, newColumnIndex);
        });
        start = Math.min(start, newColumnIndex);
        end = Math.max(end, newColumnIndex);
      }

      if (renderControl.render) {
        elementAt(grid.columns, start).addStartingSet(set);
        elementAt(grid.columns, end).addEndingSet(set);
      }
      // Clamp start and end to valid column indices
      const clampedStart = Math.max(0, start);
      const clampedEnd = Math.min(grid.columns.length - 1, end);
      const range = { start: clampedStart, end: clampedEnd };
      addedSets.set(set.name, range);
      return range;
    } else {
      // Non-leaf node: traverse each partition to determine start and end columns
      let start = Infinity;
      let end = -Infinity;
      set.getContainedSets().forEach((subset) => {
        const { start: subsetStart, end: subsetEnd } = traverse(subset);
        start = Math.min(start, subsetStart);
        end = Math.max(end, subsetEnd);
      });

      // Adjust start and end to include columns of already rendered elements
      set.containedElements.forEach((element) => {
        const previousInsertionColumnIndex = addedNumbers.get(element.name);
        if (previousInsertionColumnIndex) {
          start = Math.min(start, previousInsertionColumnIndex);
          end = Math.max(end, previousInsertionColumnIndex);
        }
      });

      // Check if there are any new contained elements to add
      const newElements = set.containedElements.filter(
        (element) => !addedNumbers.has(element.name),
      );
      if (
        newElements.length > 0 &&
        (renderControl.render || mustRenderForParent(set, newElements))
      ) {
        const column = new Column();
        /*
         * typically, appending a new column to the right yields a correct
         * set representation due to the order in which they are nested
         */
        grid.addColumn(column);
        const newColumnIndex = grid.columns.length - 1;
        newElements.forEach((element) => {
          column.addNumber(element);
          addedNumbers.set(element.name, newColumnIndex);
        });
        end = grid.columns.length - 1;
      }
      if (renderControl.render) {
        elementAt(grid.columns, start).addStartingSet(set);
        elementAt(grid.columns, end).addEndingSet(set);
      }
      // Clamp start and end to valid column indices
      const clampedStart = Math.max(0, start);
      const clampedEnd = Math.min(grid.columns.length - 1, end);
      const range = { start: clampedStart, end: clampedEnd };
      addedSets.set(set.name, range);
      return range;
    }
  };

  const collectSetsToRender = (): Set<INumberSet> => {
    const setsToRender = new Set<INumberSet>();
    renderInputs.forEach(({ numberSet, render }) => {
      if (render) {
        setsToRender.add(numberSet);
      }
    });
    return setsToRender;
  };

  const collectIncludedSets = (
    set: INumberSet,
    includedSets: Set<INumberSet>,
  ) => {
    set.getContainedSets().forEach((subset) => {
      if (!includedSets.has(subset)) {
        includedSets.add(subset);
        collectIncludedSets(subset, includedSets);
      }
    });
  };

  function setsToTraverse() {
    const setsToRender = collectSetsToRender();
    const includedSets = new Set<INumberSet>();
    setsToRender.forEach((set) => {
      collectIncludedSets(set, includedSets);
    });

    return new Set<INumberSet>(
      Array.from(setsToRender).filter((set) => !includedSets.has(set)),
    );
  }

  const finalSetsToTraverse = setsToTraverse();

  finalSetsToTraverse.forEach((set) => {
    traverse(set);
  });

  return grid;
}

export default createRectangleLayout;
