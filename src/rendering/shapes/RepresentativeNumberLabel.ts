import { RepresentativeNumber } from '../../data/numberData';
import DrawingOptions from '../DrawingOptions';
import Grid from '../../layout/Grid';

class RepresentativeNumberLabel {
  public repNumber: RepresentativeNumber;
  public grid: Grid;
  private readonly options: DrawingOptions;

  // TODO: instead of calculating x and y based on params, reactively add top/left elements as they are being rendered to move this labels coordinates.

  constructor(
    repNumber: RepresentativeNumber,
    grid: Grid,
    options: DrawingOptions,
  ) {
    this.repNumber = repNumber;
    this.grid = grid;
    this.options = options;
  }

  /**
   * Calculates the x-coordinate for the representative number label.
   * The x-coordinate is determined by the column index of the number,
   * the column width, column padding, and any extra left padding due to
   * overlapping sets. The formula is:
   *
   * x = (columnIndex * (columnWidth + columnPadding)) + (extraLeftPadding * overlapPadding)
   *
   * @returns The calculated x-coordinate.
   */
  get x(): number {
    const column = this.grid.findColumnContainingNumber(this.repNumber);
    if (!column) {
      throw new Error('Column not found for the representative number');
    }
    const columnIndex = this.grid.columns.indexOf(column);
    const { columnWidth, columnPadding, overlapPadding } = this.options;
    const extraLeftPadding = this.grid.calculateExtraLeftPadding(columnIndex);
    return (
      (columnIndex + 1) * (columnWidth / 2 + columnPadding) +
      extraLeftPadding * overlapPadding
    );
  }

  /**
   * Calculates the y-coordinate for the representative number label.
   * The y-coordinate is determined by the index of the number within its column,
   * the radius and padding of the number circles, and an extra offset for surrounding sets.
   * The formula is:
   *
   * y = (numberIndex * (2 * numberCircleRadius + numberCirclePadding)) + numberCircleRadius + (surroundingSetsCount * (textHeight + overlapPadding))
   *
   * @returns The calculated y-coordinate.
   */
  get y(): number {
    const column = this.grid.findColumnContainingNumber(this.repNumber);
    if (!column) {
      throw new Error('Column not found for the representative number');
    }
    const numberIndex = column.numbers.indexOf(this.repNumber);
    if (numberIndex === -1) {
      throw new Error('Representative number not found in its column');
    }
    const {
      numberCircleRadius,
      numberCirclePadding,
      textHeight,
      overlapPadding,
    } = this.options;
    const extraVerticalPadding = this.grid.calculateExtraVerticalPadding();
    const extraOffset = extraVerticalPadding * (textHeight + overlapPadding);
    return (
      (numberIndex + 1) * (2 * numberCircleRadius + numberCirclePadding) +
      numberCircleRadius +
      extraOffset
    );
  }
}

export default RepresentativeNumberLabel;
