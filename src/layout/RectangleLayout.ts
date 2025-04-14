import { NumberSet, INumberSet } from '../data/numberData';
import Grid from './Grid';
import { elementAt } from '../utils/collectionUtils';
import { Column } from './Column';

export interface RenderInputs {
  numberSet: NumberSet;
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
      if (newElements.length > 0) {
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
      const range = { start, end };
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
      if (newElements.length > 0) {
        const column = new Column();
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
      const range = { start, end };
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

  const setsToRender = collectSetsToRender();
  const includedSets = new Set<INumberSet>();
  setsToRender.forEach((set) => {
    collectIncludedSets(set, includedSets);
  });

  const finalSetsToTraverse = new Set<INumberSet>(
    Array.from(setsToRender).filter((set) => !includedSets.has(set)),
  );

  finalSetsToTraverse.forEach((set) => {
    traverse(set);
  });
  return grid;
}

export default createRectangleLayout;
