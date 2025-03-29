import { Column } from './Column';
import { INumberSet, IRepresentativeNumber } from '../data/numberData';

class Grid {
  columns: Column[];

  constructor() {
    this.columns = [];
  }

  addColumn(column: Column) {
    this.columns.push(column);
  }

  /**
   * Calculates the extra left padding required for a given column.
   * This padding accounts for the number of sets starting on or before
   * the specified column and ending before the specified column.
   *
   * @param columnIndex - The index of the column for which to calculate padding.
   * @returns The total extra left padding for the column.
   */
  calculateExtraLeftPadding(columnIndex: number): number {
    let extraPadding = 0;

    for (let i = 0; i <= columnIndex; i++) {
      extraPadding += this.columns[i].startingSets.length;
    }

    for (let i = 0; i < columnIndex; i++) {
      extraPadding += this.columns[i].endingSets.length;
    }

    return extraPadding;
  }

  /**
   * Calculates the total number of sets surrounding a given column.
   * This includes sets that start on or before the column and end on or after the column.
   *
   * @param columnIndex - The index of the column for which to calculate surrounding sets.
   * @returns The total number of surrounding sets for the column.
   */
  calculateSurroundingSets(columnIndex: number): number {
    let numberOfSets = 0;

    this.columns.forEach((column, index) => {
      if (index <= columnIndex) {
        numberOfSets += column.startingSets.length;
      }
      if (index >= columnIndex) {
        numberOfSets += column.endingSets.length;
      }
    });

    return numberOfSets;
  }

  findColumnContainingNumber(
    repNumber: IRepresentativeNumber,
  ): Column | undefined {
    return this.columns.find((column) => column.contains(repNumber));
  }

  findColumnsUpToNumber(repNumber: IRepresentativeNumber): Column[] {
    const columnIndex = this.columns.findIndex((column) =>
      column.contains(repNumber),
    );
    return columnIndex !== -1 ? this.columns.slice(0, columnIndex + 1) : [];
  }

  findColumn(columnIndex: number): Column | undefined {
    return this.columns[columnIndex];
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
