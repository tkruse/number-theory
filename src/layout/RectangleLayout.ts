import { NumberSet, INumberSet } from '../data/numberData';
import Grid from './Grid';
import Column from './Column';

class RectangleLayout {
  grid: Grid;

  constructor() {
    this.grid = new Grid();
  }

  // Method to traverse the NumberSet graph and create a layout
  createLayout(numberSet: NumberSet) {
    // Example logic to traverse and populate the grid
    const column = new Column();
    numberSet.containedElements.forEach((element) => {
      column.addNumber(element);
    });
    this.grid.addColumn(column);

    numberSet.containedPartitions.forEach((partition) => {
      partition.forEach((nestedSet) => {
        this.createLayout(nestedSet);
      });
    });
  }
}

export default RectangleLayout;
