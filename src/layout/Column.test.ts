import { describe, it, expect } from 'vitest';
import { Column } from './Column';
import { INumberSet, IRepresentativeNumber, ONE } from '../data/numberData';

const createSet = (name: string): INumberSet => ({
  name,
  unicodeSymbol: '',
  cardinality: '',
  description: '',
  webLinks: [],
  containedElements: [],
  containedPartitions: [],
  toString: () => name,
  getAllContainedNumbers: () => new Set<IRepresentativeNumber>(),
});

const SET_A = createSet('Set A');
const SET_B = createSet('Set B');
const SET_C = createSet('Set C');
const SET_D = createSet('Set D');

describe('Column', () => {
  describe('openNumberSet', () => {
    it('should add a line for opening a number set', () => {
      const column = new Column();
      const context: { set: INumberSet; isOpen: boolean }[] = [];
      const lines: string[] = [];
      column.openNumberSet(SET_A, context, lines);

      expect(lines).toEqual(['┌─ Set A']);
    });
  });

  describe('openNumberSet with complex context', () => {
    it('should add a line for opening a number set with a complex context', () => {
      const column = new Column();
      const context: { set: INumberSet; isOpen: boolean }[] = [
        { set: SET_D, isOpen: true },
        { set: SET_C, isOpen: false },
        { set: SET_B, isOpen: true },
      ];
      const lines: string[] = [];
      column.openNumberSet(SET_A, context, lines);

      expect(lines).toEqual(['|   | ┌─ Set A']);
    });
  });

  describe('processElements', () => {
    it('should add a line for processing elements', () => {
      const column = new Column();
      const context: { set: INumberSet; isOpen: boolean }[] = [];
      const lines: string[] = [];
      const numbers: IRepresentativeNumber[] = [ONE];

      column.processElements(numbers, context, lines);

      expect(lines).toEqual(['1']);
    });
  });

  describe('processElements with complex context', () => {
    it('should add a line for processing elements with a complex context', () => {
      const column = new Column();
      const context: { set: INumberSet; isOpen: boolean }[] = [
        { set: SET_D, isOpen: true },
        { set: SET_C, isOpen: false },
        { set: SET_B, isOpen: true },
      ];
      const lines: string[] = [];
      const numbers: IRepresentativeNumber[] = [ONE];

      column.processElements(numbers, context, lines);

      expect(lines).toEqual(['|   | 1']);
    });
  });

  describe('closeNumberSet', () => {
    it('should add a line for closing a number set', () => {
      const column = new Column();
      const context: { set: INumberSet; isOpen: boolean }[] = [
        { set: SET_A, isOpen: true },
      ];
      const lines: string[] = [];
      column.closeNumberSet(SET_A, context, lines);

      expect(lines).toEqual(['└─ Set A']);
    });
  });

  describe('closeNumberSet with complex context', () => {
    it('should add a line for closing a number set with a complex context', () => {
      const column = new Column();
      const context: { set: INumberSet; isOpen: boolean }[] = [
        { set: SET_D, isOpen: true },
        { set: SET_C, isOpen: false },
        { set: SET_B, isOpen: true },
        { set: SET_A, isOpen: true },
      ];
      const lines: string[] = [];
      column.closeNumberSet(SET_A, context, lines);

      expect(lines).toEqual(['|   | └─ Set A']);
    });
  });
});
