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
    const context: Array<{ set: INumberSet; isOpen: boolean }> = [];
    return this.columns
      .map((column, index) => {
        const result = column.renderAscii(context);
        return result;
      })
      .join('\n');
  }
}

export default Grid;
