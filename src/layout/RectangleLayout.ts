import { NumberSet, INumberSet } from '../data/numberData';
import Grid from './Grid';
import { elementAt } from '../utils/collectionUtils';
import { Column } from './Column';

function createRectangleLayout(numberSet: NumberSet): Grid {
  const grid = new Grid();
  // Map to track sets that have been added to avoid duplicates
  const addedSets = new Map<string, { start: number; end: number }>();
  // Map to track numbers that have been added and their columns
  const addedNumbers = new Map<string, number>();

  const traverse = (set: INumberSet): { start: number; end: number } => {
    // If the set has already been added, return its start and end columns
    const existing = addedSets.get(set.name);
    if (existing) {
      return existing;
    }

    if (set.containedPartitions.length === 0) {
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

      elementAt(grid.columns, start).addStartingSet(set);
      elementAt(grid.columns, end).addEndingSet(set);
      const range = { start, end };
      addedSets.set(set.name, range);
      return range;
    } else {
      // Non-leaf node: traverse each partition to determine start and end columns
      let start = Infinity;
      let end = -Infinity;
      set.containedPartitions.forEach((partition) => {
        partition.forEach((subset) => {
          const { start: subsetStart, end: subsetEnd } = traverse(subset);
          start = Math.min(start, subsetStart);
          end = Math.max(end, subsetEnd);
        });
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
      elementAt(grid.columns, start).addStartingSet(set);
      elementAt(grid.columns, end).addEndingSet(set);
      const range = { start, end };
      addedSets.set(set.name, range);
      return range;
    }
  };

  traverse(numberSet);
  return grid;
}

export default createRectangleLayout;
