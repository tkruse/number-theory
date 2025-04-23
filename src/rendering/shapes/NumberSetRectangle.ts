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
      bottomMostLabels: [RepresentativeNumberLabel, number][];
      containedSubsetsAtStartColumn: number;
      containedSubsetsAtEndColumn: number;
      maxContainedSets: number;
    }
  >;
  private readonly options: DrawingOptions;
  private readonly grid: Grid;

  private static createDefaultSubRectangeStructure() {
    return {
      leftMostLabel: null,
      rightMostLabel: null,
      bottomMostLabels: [],
      containedSubsetsAtStartColumn: 0,
      containedSubsetsAtEndColumn: 0,
      maxContainedSets: 0,
    };
  }

  constructor(numberSet: INumberSet, options: DrawingOptions, grid: Grid) {
    this.numberSetLabels = new Map();
    this.numberSetLabels.set(
      numberSet,
      NumberSetRectangle.createDefaultSubRectangeStructure(),
    );
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
      height: this.getSetsHeight(),
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

  addBottomMostLabel(
    set: INumberSet,
    label: RepresentativeNumberLabel,
    containedSubsets: number,
  ) {
    getOrCompute(this.numberSetLabels, set, () =>
      NumberSetRectangle.createDefaultSubRectangeStructure(),
    ).bottomMostLabels.push([label, containedSubsets]);
  }

  updateMaxContainedSets(set: INumberSet, count: number) {
    const rectangleStructure = getOrCompute(this.numberSetLabels, set, () =>
      NumberSetRectangle.createDefaultSubRectangeStructure(),
    );
    if (count > rectangleStructure.maxContainedSets) {
      rectangleStructure.maxContainedSets = count;
    }
  }

  /**
   * get the maximum of contained sets within all this.numberSetLabels
   */
  getMaxContainedSets(): number {
    return Array.from(this.numberSetLabels.values()).reduce(
      (max, label) => Math.max(max, label.maxContainedSets),
      0,
    );
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
      (this.getMaxContainedSets() + 1) * (textHeight + overlapPadding)
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

  private getSetHeight(set: INumberSet): number {
    const { numberCircleRadius, overlapPadding, numberCirclePadding } =
      this.options;
    /*
     * to find the height of the column, filter the grid columns by those spanning this set
     * find the bottom most label in the column, and the contained sets for that column
     */
    const bottomY = safeGet(this.numberSetLabels, set).bottomMostLabels.reduce(
      (max, [label, contained]) =>
        Math.max(max, label.y + contained * overlapPadding),
      0,
    );
    return (
      bottomY + numberCircleRadius + numberCirclePadding - this.getSetY(set)
    );
  }

  private getSetsHeight(): number {
    // return the maximum result of getSetHeight(set) for all sets in this.numberSetLabels
    return Math.max(
      ...Array.from(this.numberSetLabels.keys()).map((set) =>
        this.getSetHeight(set),
      ),
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
