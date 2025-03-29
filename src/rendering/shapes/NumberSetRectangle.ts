import { NumberSet } from '../../data/numberData';
import DrawingOptions from '../DrawingOptions';
import Grid from '../../layout/Grid';

class NumberSetRectangle {
  public numberSet: NumberSet;
  private grid: Grid;
  private options: DrawingOptions;

  constructor(numberSet: NumberSet, grid: Grid, options: DrawingOptions) {
    this.numberSet = numberSet;
    this.grid = grid;
    this.options = options;
  }

  /**
   * Calculates the x-coordinate for the top-left corner of the number set rectangle.
   * The x-coordinate is determined by the starting column index of the number set,
   * the column width, column padding, and any extra left padding due to overlapping sets.
   *
   * @returns The calculated x-coordinate.
   */
  get x(): number {
    const startingColumnIndex = this.grid.columns.findIndex((column) =>
      column.startingSets.includes(this.numberSet)
    );
    if (startingColumnIndex === -1) {
      throw new Error('Starting column not found for the number set');
    }
    const { columnWidth, columnPadding, overlapPadding } = this.options;
    const extraLeftPadding = this.grid.calculateExtraLeftPadding(startingColumnIndex);
    return (
      startingColumnIndex * (columnWidth + columnPadding) +
      extraLeftPadding * overlapPadding
    );
  }

  /**
   * Calculates the y-coordinate for the top-left corner of the number set rectangle.
   * The y-coordinate is determined by the number of surrounding sets and the drawing options.
   *
   * @returns The calculated y-coordinate.
   */
  get y(): number {
    const startingColumnIndex = this.grid.columns.findIndex((column) =>
      column.startingSets.includes(this.numberSet)
    );
    if (startingColumnIndex === -1) {
      throw new Error('Starting column not found for the number set');
    }
    const { textHeight, overlapPadding } = this.options;
    const surroundingSetsCount = this.grid.calculateSurroundingSets(startingColumnIndex);
    return surroundingSetsCount * (textHeight + overlapPadding);
  }

  /**
   * Calculates the width of the number set rectangle.
   * The width is determined by the difference between the x-coordinates of the
   * bottom-right and top-left corners of the rectangle.
   *
   * @returns The calculated width.
   */
  get width(): number {
    const endingColumnIndex = this.grid.columns.findIndex((column) =>
      column.endingSets.includes(this.numberSet)
    );
    if (endingColumnIndex === -1) {
      throw new Error('Ending column not found for the number set');
    }
    const { columnWidth, columnPadding, overlapPadding } = this.options;
    const extraLeftPadding = this.grid.calculateExtraLeftPadding(endingColumnIndex);
    const bottomRightX =
      endingColumnIndex * (columnWidth + columnPadding) +
      extraLeftPadding * overlapPadding +
      columnWidth;
    return bottomRightX - this.x;
  }

  /**
   * Calculates the height of the number set rectangle.
   * The height is determined by the difference between the y-coordinates of the
   * bottom-right and top-left corners of the rectangle.
   *
   * @returns The calculated height.
   */
  get height(): number {
    const endingColumnIndex = this.grid.columns.findIndex((column) =>
      column.endingSets.includes(this.numberSet)
    );
    if (endingColumnIndex === -1) {
      throw new Error('Ending column not found for the number set');
    }
    const { textHeight, overlapPadding } = this.options;
    const surroundingSetsCount = this.grid.calculateSurroundingSets(endingColumnIndex);
    const bottomRightY = surroundingSetsCount * (textHeight + overlapPadding) + textHeight;
    return bottomRightY - this.y;
  }
}

export default NumberSetRectangle;
