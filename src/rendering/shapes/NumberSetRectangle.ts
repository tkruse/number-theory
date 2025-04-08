import { NumberSet } from '../../data/numberData';
import DrawingOptions from '../DrawingOptions';
import RepresentativeNumberLabel from './RepresentativeNumberLabel';

class NumberSetRectangle {
  public numberSet: NumberSet;
  private readonly options: DrawingOptions;
  private leftMostLabel: RepresentativeNumberLabel | null = null;
  private rightMostLabel: RepresentativeNumberLabel | null = null;
  private bottomMostLabel: RepresentativeNumberLabel | null = null;
  private maxContainedSets = 0;
  private containedSubsetsAtStartColumn = 0;
  private containedSubsetsAtEndColumn = 0;

  constructor(numberSet: NumberSet, options: DrawingOptions) {
    this.numberSet = numberSet;
    this.options = options;
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
    return (
      this.rightMostLabel.x +
      numberCircleRadius +
      numberCirclePadding +
      this.containedSubsetsAtEndColumn * overlapPadding -
      this.x
    );
  }

  get height(): number {
    const {
      numberCircleRadius,
      overlapPadding,
      numberCirclePadding,
    } = this.options;
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
