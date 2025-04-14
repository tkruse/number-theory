import { IRepresentativeNumber, INumberSet } from '../data/numberData';
import { safeSlice } from '../utils/collectionUtils';

class Column {
  numbers: IRepresentativeNumber[];

  startingSets: INumberSet[];
  endingSets: INumberSet[];

  startingPartitionSplits: [INumberSet, INumberSet][];

  constructor() {
    this.startingPartitionSplits = [];
    this.startingSets = [];
    this.endingSets = [];
    this.numbers = [];
  }

  contains(repNumber: IRepresentativeNumber): boolean {
    return this.numbers.includes(repNumber);
  }

  addStartingSet(set: INumberSet) {
    this.startingSets.unshift(set);
  }

  addEndingSet(set: INumberSet) {
    this.endingSets.push(set);
  }

  addStartingPartitionSplit(split: [INumberSet, INumberSet]) {
    this.startingPartitionSplits.push(split);
  }

  addNumber(number: IRepresentativeNumber) {
    this.numbers.push(number);
  }

  static getPrefix(context: { set: INumberSet; isOpen: boolean }[]): string {
    return context.map(({ isOpen }) => (isOpen ? '| ' : '  ')).join('');
  }

  openNumberSet(
    set: INumberSet,
    context: { set: INumberSet; isOpen: boolean }[],
    lines: string[],
  ) {
    const endIndex = context.findIndex((entry) => entry.set === set);
    if (endIndex !== -1) {
      const startPrefix = safeSlice(context, 0, endIndex)
        .map(({ isOpen }) => (isOpen ? '| ' : '  '))
        .join('');
      lines.push(`${startPrefix}┌─ ${set.name}`);
    } else {
      lines.push(`${Column.getPrefix(context)}┌─ ${set.name}`);
    }
  }

  processElements(
    numbers: IRepresentativeNumber[],
    context: { set: INumberSet; isOpen: boolean }[],
    lines: string[],
  ) {
    // Add lines for numbers in the column, if any
    if (numbers.length > 0) {
      lines.push(
        `${Column.getPrefix(context)}${numbers.map((number) => number.name).join(', ')}`,
      );
    }
  }

  closeNumberSet(
    set: INumberSet,
    context: { set: INumberSet; isOpen: boolean }[],
    lines: string[],
  ) {
    const endIndex = context.findIndex((entry) => entry.set === set);
    const endPrefix = safeSlice(context, 0, endIndex)
      .map(({ isOpen }) => (isOpen ? '| ' : '  '))
      .join('');
    lines.push(`${endPrefix}└─ ${set.name}`);
  }
}

export { Column };
