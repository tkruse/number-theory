import { Column } from './Column';
import { INumberSet, IRepresentativeNumber } from '../data/numberData';
import DrawingOptions from '../rendering/DrawingOptions';

class Grid {
  columns: Column[];

  constructor() {
    this.columns = [];
  }

  /**
   * Calculates the extra width required for a given column.
   * This is determined by the maximum width of any set that is both in the starting
   * and ending sets of the column, taking into account the set's name and the text height.
   *
   * @param columnIndex - The index of the column for which to calculate extra width.
   * @param options - The drawing options containing text height and circle radius.
   * @returns The extra width required for the column.
   */
  calculateExtraWidth(columnIndex: number, options: DrawingOptions): number {
    const column = this.columns[columnIndex];
    let maxWidth = 0;

    column.endingSets.forEach((set) => {
      const setWidth = set.toString().length * options.textHeight * 0.45;
      if (column.startingSets.includes(set)) {
        maxWidth = Math.max(maxWidth, setWidth);
      } else {
        if (columnIndex > 0) {
          const previousColumn = this.columns[columnIndex - 1];
          if (previousColumn.startingSets.includes(set)) {
            const adjustedWidth =
                setWidth - options.numberCircleRadius * 2 - options.columnPadding;
            maxWidth = Math.max(maxWidth, adjustedWidth);
          }
        }
        if (columnIndex > 1) {
          const twoColumnsBack = this.columns[columnIndex - 2];
          if (twoColumnsBack.startingSets.includes(set)) {
            const adjustedWidth =
                setWidth - options.numberCircleRadius * 4 - options.columnPadding * 6;
            maxWidth = Math.max(maxWidth, adjustedWidth);
          }
        }
      }
    });

    return Math.max(0, maxWidth - 2 * options.numberCircleRadius);
  }

  /**
   * Iterates over the columns and invokes callbacks for events like opening and closing number sets.
   * This method helps in computing the max depth of nesting and other operations.
   *
   * @param callbacks - An object containing callback functions for different events.
   */
  iterateColumns(callbacks: {
    openNumberSet: (
      set: INumberSet,
      context: { set: INumberSet; isOpen: boolean }[],
    ) => void;
    processElements: (
      numbers: IRepresentativeNumber[],
      context: { set: INumberSet; isOpen: boolean }[],
    ) => void;
    closeNumberSet: (
      set: INumberSet,
      context: { set: INumberSet; isOpen: boolean }[],
    ) => void;
  }) {
    const context: { set: INumberSet; isOpen: boolean }[] = [];

    this.columns.forEach((column) => {
      // Open number sets
      column.startingSets.forEach((set) => {
        callbacks.openNumberSet(set, context);
        const index = context.findIndex((entry) => entry.set === set);
        if (index === -1) {
          context.push({ set, isOpen: true });
        } else {
          context[index].isOpen = true;
        }
      });

      // Process elements
      if (column.numbers.length > 0) {
        callbacks.processElements(column.numbers, context);
      }

      // Close number sets
      column.endingSets.forEach((set) => {
        callbacks.closeNumberSet(set, context);
        const index = context.findIndex((entry) => entry.set === set);
        if (index !== -1) {
          context[index].isOpen = false;
        }
      });

      // Clean up closed sets from the context
      while (context.length > 0 && !context[context.length - 1].isOpen) {
        context.pop();
      }
    });
  }

  /**
   * Computes the vertical offset required to align RepresentativeNumberLabel.
   * This method will be implemented to calculate the necessary offset.
   *
   * @returns How many surrounding sets layers maximally exist in the grid
   */
  calculateExtraVerticalPadding(): number {
    let maxSurroundingSets = 0;

    this.iterateColumns({
      openNumberSet: () => {
        // This is an intentional no-op
      },
      processElements: (_, context) => {
        maxSurroundingSets = Math.max(maxSurroundingSets, context.length);
      },
      closeNumberSet: () => {
        // This is an intentional no-op
      },
    });

    return maxSurroundingSets;
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
    const surroundingSets = new Set<INumberSet>();

    this.columns.forEach((column, index) => {
      if (index <= columnIndex) {
        column.startingSets.forEach((set) => surroundingSets.add(set));
      }
      if (index >= columnIndex) {
        column.endingSets.forEach((set) => surroundingSets.add(set));
      }
    });

    return surroundingSets.size;
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
    const lines: string[] = [];

    this.iterateColumns({
      openNumberSet: (set, context) => {
        const column = this.columns.find((col) =>
          col.startingSets.includes(set),
        );
        if (column) {
          column.openNumberSet(set, context, lines);
        }
      },
      processElements: (numbers, context) => {
        const column = this.columns.find((col) =>
          col.numbers.some((num) => numbers.includes(num)),
        );
        if (column) {
          column.processElements(numbers, context, lines);
        }
      },
      closeNumberSet: (set, context) => {
        const column = this.columns.find((col) => col.endingSets.includes(set));
        if (column) {
          column.closeNumberSet(set, context, lines);
        }
      },
    });

    return lines.join('\n');
  }
}

export default Grid;
