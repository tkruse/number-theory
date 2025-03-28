import { IRepresentativeNumber, INumberSet } from '../data/numberData';

class Column {
  numbers: IRepresentativeNumber[];

  startingSets: INumberSet[];
  endingSets: INumberSet[];

  constructor() {
    this.startingSets = [];
    this.endingSets = [];
    this.numbers = [];
  }

  addStartingSet(set: INumberSet) {
    this.startingSets.unshift(set);
  }

  addEndingSet(set: INumberSet) {
    this.endingSets.push(set);
  }

  addNumber(number: IRepresentativeNumber) {
    this.numbers.push(number);
  }

  /**
   * Renders the column as a comma-separated list of element names.
   * This representation is "on the side" left to right, instead of top to bottom
   * as it would be displayed in the browser.
   */
  renderAscii(
    context: Array<{ set: INumberSet; isOpen: boolean }> = [],
  ): string {
    // Helper function to update the context with the current open/close state of a set
    const updateContext = (set: INumberSet, open: boolean) => {
      const index = context.findIndex((entry) => entry.set === set);
      if (index !== -1) {
        context[index].isOpen = open;
      } else {
        context.push({ set, isOpen: open });
      }
    };

    // Helper function to generate the prefix based on the current context
    const getPrefix = () =>
      context.map(({ isOpen }) => (isOpen ? '| ' : '  ')).join('');

    const lines: string[] = [];

    // Process starting sets, updating context and adding lines for each
    this.startingSets.forEach((set) => {
      lines.push(`${getPrefix()}┌─ ${set.name}`);
      updateContext(set, true);
    });

    // Add lines for numbers in the column, if any
    if (this.numbers.length > 0) {
      lines.push(
        `${getPrefix()}${this.numbers.map((number) => number.name).join(', ')}`,
      );
    }

    // Process ending sets, updating context and adding lines for each
    this.endingSets.forEach((set) => {
      const endIndex = context.findIndex((entry) => entry.set === set);
      const endPrefix = context
        .slice(0, endIndex)
        .map(({ isOpen }) => (isOpen ? '| ' : '  '))
        .join('');
      updateContext(set, false);
      lines.push(`${endPrefix}└─ ${set.name}`);

      // Remove closed sets from the end of the context
      while (context.length > 0 && !context[context.length - 1].isOpen) {
        context.pop();
      }
    });

    return lines.join('\n');
  }
}

export { Column };
