import { NumberSet, INumberSet } from '../data/numberData';
import Grid from './Grid';
import { elementAt } from '../utils/collectionUtils';
import { Column } from './Column';

class RectangleLayout {
  grid: Grid;

  get layoutGrid(): Grid {
    return this.grid;
  }

  constructor(numberSet: NumberSet) {
    this.grid = new Grid();
    // Map to track sets that have been added to avoid duplicates
    const addedSets = new Map<string, { start: number; end: number }>();
    // Map to track numbers that have been added and their columns
    const addedNumbers = new Map<string, number>();

    const traverse = (set: INumberSet): { start: number; end: number } => {
      // If the set has already been added, return its start and end columns
      if (addedSets.has(set.name)) {
        return addedSets.get(set.name)!;
      }

      if (set.containedPartitions.length === 0) {
        // Leaf node: create a column that starts and ends with the same set
        const column = new Column();
        this.grid.addColumn(column);
        const newColumnIndex = this.grid.columns.length - 1;
        column.addStartingSet(set);
        column.addEndingSet(set);
        // Add contained elements to the column, ensuring no duplicates
        set.containedElements.forEach((element) => {
          if (!addedNumbers.has(element.name)) {
            column.addNumber(element);
            addedNumbers.set(element.name, newColumnIndex);
          }
        });
        const range = { start: newColumnIndex, end: newColumnIndex };
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
          if (addedNumbers.has(element.name)) {
            const columnIndex = addedNumbers.get(element.name)!;
            start = Math.min(start, columnIndex);
            end = Math.max(end, columnIndex);
          }
        });

        // Check if there are any new contained elements to add
        const newElements = set.containedElements.filter(
          (element) => !addedNumbers.has(element.name),
        );

        if (newElements.length > 0) {
          const column = new Column();
          this.grid.addColumn(column);
          const newColumnIndex = this.grid.columns.length - 1;
          newElements.forEach((element) => {
            column.addNumber(element);
            addedNumbers.set(element.name, newColumnIndex);
          });
          end = this.grid.columns.length - 1;
        }
        elementAt(this.grid.columns, start).addStartingSet(set);
        elementAt(this.grid.columns, end).addEndingSet(set);
        const range = { start, end };
        addedSets.set(set.name, range);
        return range;
      }
    };

    traverse(numberSet);
  }
}

export default RectangleLayout;
