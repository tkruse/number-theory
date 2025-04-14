import { INumberSet } from '../../data/numberData';
import DrawingOptions from '../DrawingOptions';
import RepresentativeNumberLabel from './RepresentativeNumberLabel';
import Grid from '../../layout/Grid';

class NumberSetRectangle {
  public numberSet: INumberSet;
  private readonly options: DrawingOptions;
  private readonly grid: Grid;
  private leftMostLabel: RepresentativeNumberLabel | null = null;
  private rightMostLabel: RepresentativeNumberLabel | null = null;
  private bottomMostLabel: RepresentativeNumberLabel | null = null;
  private maxContainedSets = 0;
  private containedSubsetsAtStartColumn = 0;
  private containedSubsetsAtEndColumn = 0;

  constructor(numberSet: INumberSet, options: DrawingOptions, grid: Grid) {
    this.numberSet = numberSet;
    this.options = options;
    this.grid = grid;
  }

  setLeftMostLabel(label: RepresentativeNumberLabel) {
    this.leftMostLabel = label;
  }

  setRightMostLabel(label: RepresentativeNumberLabel) {
    this.rightMostLabel = label;
  }

  setBottomMostLabel(label: RepresentativeNumberLabel) {
    this.bottomMostLabel = label;
  }

  updateMaxContainedSets(count: number) {
    if (count > this.maxContainedSets) {
      this.maxContainedSets = count;
    }
  }

  setContainedSubsetsAtStartColumn(count: number) {
    this.containedSubsetsAtStartColumn = count;
  }

  setContainedSubsetsAtEndColumn(count: number) {
    this.containedSubsetsAtEndColumn = count;
  }

  get x(): number {
    const { numberCircleRadius, overlapPadding, numberCirclePadding } =
      this.options;
    if (!this.leftMostLabel) {
      throw new Error('Left-most label is not set');
    }
    return (
      this.leftMostLabel.x -
      numberCircleRadius -
      numberCirclePadding -
      this.containedSubsetsAtStartColumn * overlapPadding
    );
  }

  get y(): number {
    const {
      numberCircleRadius,
      overlapPadding,
      textHeight,
      numberCirclePadding,
    } = this.options;
    if (!this.leftMostLabel) {
      throw new Error('Left-most label is not set');
    }
    return (
      this.leftMostLabel.y -
      numberCircleRadius -
      numberCirclePadding -
      (this.maxContainedSets + 1) * (textHeight + overlapPadding)
    );
  }

  get width(): number {
    const { numberCircleRadius, overlapPadding, numberCirclePadding } =
      this.options;
    if (!this.rightMostLabel) {
      throw new Error('Right-most label is not set');
    }
    const column = this.grid.findColumnContainingNumber(
      this.rightMostLabel.repNumber,
    );
    const extraWidth = column
      ? this.grid.calculateExtraWidth(
          this.grid.columns.indexOf(column),
          this.options,
        )
      : 0;

    return (
      this.rightMostLabel.x +
      numberCircleRadius +
      numberCirclePadding +
      this.containedSubsetsAtEndColumn * overlapPadding +
      extraWidth -
      this.x
    );
  }

  get height(): number {
    const { numberCircleRadius, overlapPadding, numberCirclePadding } =
      this.options;
    if (!this.bottomMostLabel) {
      throw new Error('Bottom-most label is not set');
    }
    return (
      this.bottomMostLabel.y +
      numberCircleRadius +
      numberCirclePadding +
      this.maxContainedSets * overlapPadding -
      this.y
    );
  }
}

export default NumberSetRectangle;
