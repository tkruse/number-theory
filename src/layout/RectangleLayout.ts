import { NumberSet, INumberSet } from '../data/numberData';
import Grid from './Grid';
import { Column } from './Column';

class RectangleLayout {
  grid: Grid;

  get layoutGrid(): Grid {
    return this.grid;
  }

  constructor(numberSet: NumberSet) {
    this.grid = new Grid();
    const addedSets = new Map<string, { start: number; end: number }>();
    const addedNumbers = new Set<string>();

    const traverse = (set: INumberSet): { start: number; end: number } => {
      if (addedSets.has(set.name)) {
        return addedSets.get(set.name)!;
      }

      if (set.containedPartitions.length === 0) {
        // Leaf node: create a column that starts and ends the same set
        const column = new Column();
        column.addStartingSet(set);
        column.addEndingSet(set);
        set.containedElements.forEach((element) => {
          if (!addedNumbers.has(element.name)) {
            column.addNumber(element);
            addedNumbers.add(element.name);
          }
        });
        this.grid.addColumn(column);
        const index = this.grid.columns.length - 1;
        const range = { start: index, end: index };
        addedSets.set(set.name, range);
        return range;
      } else {
        // Non-leaf node: traverse each partition
        let start = Infinity;
        let end = -Infinity;
        set.containedPartitions.forEach((partition) => {
          partition.forEach((subset) => {
            const { start: subsetStart, end: subsetEnd } = traverse(subset);
            start = Math.min(start, subsetStart);
            end = Math.max(end, subsetEnd);
          });
        });
        // Add a column for any contained elements in the non-leaf node
        if (set.containedElements.length > 0) {
          const column = new Column();
          set.containedElements.forEach((element) => {
            column.addNumber(element);
          });
          this.grid.addColumn(column);
          end = this.grid.columns.length - 1;
        }
        this.grid.columns[start].addStartingSet(set);
        this.grid.columns[end].addEndingSet(set);
        const range = { start, end };
        addedSets.set(set.name, range);
        return range;
      }
    };

    traverse(numberSet);
  }
}

export default RectangleLayout;
