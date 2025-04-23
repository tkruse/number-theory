import { IRepresentativeNumber, INumberSet } from '../data/numberData';
import { safeSlice } from '../utils/collectionUtils';

class Column {
  numbers: IRepresentativeNumber[];

  private _startingSets: INumberSet[];
  private _endingSets: INumberSet[];

  constructor() {
    this._startingSets = [];
    this._endingSets = [];
    this.numbers = [];
  }

  contains(repNumber: IRepresentativeNumber): boolean {
    return this.numbers.includes(repNumber);
  }

  addStartingSet(set: INumberSet) {
    this._startingSets.unshift(set);
  }

  addEndingSet(set: INumberSet) {
    this._endingSets.push(set);
  }

  getStartingSets(): INumberSet[] {
    return this._startingSets;
  }

  setStartingSets(sets: INumberSet[]): void {
    this._startingSets = [...sets];
  }

  getEndingSets(): INumberSet[] {
    return this._endingSets;
  }

  setEndingSets(sets: INumberSet[]): void {
    this._endingSets = [...sets];
  }

  // For test access only
  _getRawStartingSets(): INumberSet[] {
    return this._startingSets;
  }

  _getRawEndingSets(): INumberSet[] {
    return this._endingSets;
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
