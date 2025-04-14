import { INumberSet } from '../../data/numberData';
import DrawingOptions from '../DrawingOptions';
import RepresentativeNumberLabel from './RepresentativeNumberLabel';
import Grid from '../../layout/Grid';
import { safeGet, getOrCompute } from '../../utils/collectionUtils';

/**
 * Represent a rectangle, which might be a single numberset or a partition of those.
 */
class NumberSetRectangle {
  private numberSetLabels: Map<
    INumberSet,
    {
      leftMostLabel: RepresentativeNumberLabel | null;
      rightMostLabel: RepresentativeNumberLabel | null;
      bottomMostLabel: RepresentativeNumberLabel | null;
      containedSubsetsAtStartColumn: number;
      containedSubsetsAtEndColumn: number;
    }
  >;
  private readonly options: DrawingOptions;
  private readonly grid: Grid;
  private maxContainedSets = 0;

  private static createDefaultSubRectangeStructure() {
    return {
      leftMostLabel: null,
      rightMostLabel: null,
      bottomMostLabel: null,
      containedSubsetsAtStartColumn: 0,
      containedSubsetsAtEndColumn: 0,
    };
  }

  constructor(numberSet: INumberSet, options: DrawingOptions, grid: Grid) {
    this.numberSetLabels = new Map();
    this.numberSetLabels.set(numberSet, {
      leftMostLabel: null,
      rightMostLabel: null,
      bottomMostLabel: null,
      containedSubsetsAtStartColumn: 0,
      containedSubsetsAtEndColumn: 0,
    });
    this.options = options;
    this.grid = grid;
  }

  getContainedRectangles(): {
    set: INumberSet;
    x: number;
    y: number;
    width: number;
    height: number;
  }[] {
    return Array.from(this.numberSetLabels.keys()).map((set) => ({
      set,
      x: this.getSetX(set),
      y: this.getSetY(set),
      width: this.getSetWidth(set),
      height: this.getSetHeight(set),
    }));
  }

  setLeftMostLabel(set: INumberSet, label: RepresentativeNumberLabel) {
    getOrCompute(this.numberSetLabels, set, () =>
      NumberSetRectangle.createDefaultSubRectangeStructure(),
    ).leftMostLabel = label;
  }

  setRightMostLabel(set: INumberSet, label: RepresentativeNumberLabel) {
    getOrCompute(this.numberSetLabels, set, () =>
      NumberSetRectangle.createDefaultSubRectangeStructure(),
    ).rightMostLabel = label;
  }

  setBottomMostLabel(set: INumberSet, label: RepresentativeNumberLabel) {
    getOrCompute(this.numberSetLabels, set, () =>
      NumberSetRectangle.createDefaultSubRectangeStructure(),
    ).bottomMostLabel = label;
  }

  updateMaxContainedSets(count: number) {
    if (count > this.maxContainedSets) {
      this.maxContainedSets = count;
    }
  }

  setContainedSubsetsAtStartColumn(set: INumberSet, count: number) {
    const labels = getOrCompute(this.numberSetLabels, set, () =>
      NumberSetRectangle.createDefaultSubRectangeStructure(),
    );
    if (count > labels.containedSubsetsAtStartColumn) {
      labels.containedSubsetsAtStartColumn = count;
    }
  }

  setContainedSubsetsAtEndColumn(set: INumberSet, count: number) {
    const labels = getOrCompute(this.numberSetLabels, set, () =>
      NumberSetRectangle.createDefaultSubRectangeStructure(),
    );
    if (count > labels.containedSubsetsAtEndColumn) {
      labels.containedSubsetsAtEndColumn = count;
    }
  }

  private getSetX(set: INumberSet): number {
    const { numberCircleRadius, overlapPadding, numberCirclePadding } =
      this.options;
    const { leftMostLabel, containedSubsetsAtStartColumn } = safeGet(
      this.numberSetLabels,
      set,
    );

    return (
      (leftMostLabel?.x ?? 0) -
      numberCircleRadius -
      numberCirclePadding -
      containedSubsetsAtStartColumn * overlapPadding
    );
  }

  private getSetY(set: INumberSet): number {
    const {
      numberCircleRadius,
      overlapPadding,
      textHeight,
      numberCirclePadding,
    } = this.options;

    return (
      (safeGet(this.numberSetLabels, set).leftMostLabel?.y ?? 0) -
      numberCircleRadius -
      numberCirclePadding -
      (this.maxContainedSets + 1) * (textHeight + overlapPadding)
    );
  }

  private getSetWidth(set: INumberSet): number {
    const { numberCircleRadius, overlapPadding, numberCirclePadding } =
      this.options;
    const { rightMostLabel, containedSubsetsAtEndColumn } = safeGet(
      this.numberSetLabels,
      set,
    );
    if (!rightMostLabel) {
      throw new Error(`Right-most label is not set for set ${set}`);
    }
    const column = this.grid.findColumnContainingNumber(
      rightMostLabel.repNumber,
    );
    const extraWidth = column
      ? this.grid.calculateExtraWidth(
          this.grid.columns.indexOf(column),
          this.options,
        )
      : 0;

    return (
      rightMostLabel.x +
      numberCircleRadius +
      numberCirclePadding +
      containedSubsetsAtEndColumn * overlapPadding +
      extraWidth -
      this.getSetX(set)
    );
  }

  private getBottomMostLabel() {
    const bottomMostLabel = Array.from(
      this.numberSetLabels.values(),
    ).reduce<RepresentativeNumberLabel | null>((maxLabel, labels) => {
      if (labels.bottomMostLabel) {
        return !maxLabel || labels.bottomMostLabel.y > maxLabel.y
          ? labels.bottomMostLabel
          : maxLabel;
      }
      return maxLabel;
    }, null);
    if (!bottomMostLabel) {
      throw new Error(
        `Bottom-most label is not set in ${JSON.stringify(Array.from(this.numberSetLabels.entries()))}`,
      );
    }
    return bottomMostLabel;
  }

  private getSetHeight(set: INumberSet): number {
    const { numberCircleRadius, overlapPadding, numberCirclePadding } =
      this.options;
    const bottomMostLabel = this.getBottomMostLabel();
    return (
      bottomMostLabel.y +
      numberCircleRadius +
      numberCirclePadding +
      this.maxContainedSets * overlapPadding -
      this.getSetY(set)
    );
  }

  get x(): number {
    return Math.min(
      ...Array.from(this.numberSetLabels.keys()).map((set) =>
        this.getSetX(set),
      ),
    );
  }

  get y(): number {
    return Math.min(
      ...Array.from(this.numberSetLabels.keys()).map((set) =>
        this.getSetY(set),
      ),
    );
  }

  get height(): number {
    return Math.max(
      ...Array.from(this.numberSetLabels.keys()).map((set) =>
        this.getSetHeight(set),
      ),
    );
  }
}

export default NumberSetRectangle;
