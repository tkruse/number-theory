import { Column } from './Column';
import { INumberSet } from '../data/numberData';

class Grid {
  columns: Column[];

  constructor() {
    this.columns = [];
  }

  addColumn(column: Column) {
    this.columns.push(column);
  }

  toString(): string {
    const context: { set: INumberSet; isOpen: boolean }[] = [];
    return this.columns
      .map((column) => {
        return column.renderAscii(context);
      })
      .join('\n');
  }
}

export default Grid;
