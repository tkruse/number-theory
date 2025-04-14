import { describe, expect, it, vi } from 'vitest';
import {
  elementAt,
  elementAtOrFallback,
  getOrFallback,
  getOrCompute,
  safeSlice,
  safeGet,
} from './collectionUtils';

describe('elementAt', () => {
  it('should return the correct element for a valid index', () => {
    const array = [10, 20, 30, 40];
    expect(elementAt(array, 2)).toBe(30);
  });

  it('should throw an error for an out-of-bounds index', () => {
    const array = [10, 20, 30, 40];
    expect(() => elementAt(array, 5)).toThrow(
      'Index 5 is out of bounds for array of length 4',
    );
  });

  it('should throw an error for a negative index', () => {
    const array = [10, 20, 30, 40];
    expect(() => elementAt(array, -1)).toThrow(
      'Index -1 is out of bounds for array of length 4',
    );
  });
});

describe('elementAtOrFallback', () => {
  it('should return the correct element for a valid index', () => {
    const array = [10, 20, 30, 40];
    expect(elementAtOrFallback(array, 2, () => 99)).toBe(30);
  });

  it('should return the fallback for an out-of-bounds index', () => {
    const array = [10, 20, 30, 40];
    expect(elementAtOrFallback(array, 5, () => 99)).toBe(99);
  });

  it('should return the fallback for a negative index', () => {
    const array = [10, 20, 30, 40];
    expect(elementAtOrFallback(array, -1, () => 99)).toBe(99);
  });
});

describe('safeGet', () => {
  it('should return the correct value for an existing key', () => {
    const map = new Map<string, number>([
      ['a', 1],
      ['b', 2],
    ]);
    expect(safeGet(map, 'a')).toBe(1);
  });

  it('should throw an error for a non-existing key', () => {
    const map = new Map<string, number>([
      ['a', 1],
      ['b', 2],
    ]);
    expect(() => safeGet(map, 'c')).toThrow('Key c not found in map');
  });
});

describe('getOrFallback', () => {
  it('should return the correct value for an existing key', () => {
    const map = new Map<string, number>([
      ['a', 1],
      ['b', 2],
    ]);
    expect(getOrFallback(map, 'a', () => 99)).toBe(1);
  });

  it('should return the fallback for a non-existing key', () => {
    const map = new Map<string, number>([
      ['a', 1],
      ['b', 2],
    ]);
    expect(getOrFallback(map, 'c', () => 99)).toBe(99);
  });

  it('should call the fallback function only when the key is not found', () => {
    const map = new Map<string, number>([
      ['a', 1],
      ['b', 2],
    ]);
    const fallback = vi.fn(() => 99);
    getOrFallback(map, 'a', fallback);
    expect(fallback).not.toHaveBeenCalled();
    getOrFallback(map, 'c', fallback);
    expect(fallback).toHaveBeenCalledTimes(1);
  });
});

describe('safeSlice', () => {
  const array = [1, 2, 3];

  it('should return the correct slice for valid indices', () => {
    expect(safeSlice(array, 0, 2)).toEqual([1, 2]);
  });

  it('should return the correct slice for a negative start index', () => {
    expect(safeSlice(array, -2)).toEqual([2, 3]);
  });

  it('should throw an error for an out-of-bounds start index', () => {
    expect(() => safeSlice(array, 3, 4)).toThrow(
      'Invalid slice indices: start 3, end 4, for array of length 3',
    );
  });

  it('should throw an error for a negative start index when end is provided', () => {
    expect(() => safeSlice(array, -1, 2)).toThrow(
      'Invalid slice indices: start -1, end 2, for array of length 3',
    );
  });

  it('should throw an error for an out-of-bounds end index', () => {
    expect(() => safeSlice(array, 0, 4)).toThrow(
      'Invalid slice indices: start 0, end 4, for array of length 3',
    );
  });
});

describe('getOrCompute', () => {
  it('should return the correct value for an existing key', () => {
    const map = new Map<string, number>([
      ['a', 1],
      ['b', 2],
    ]);
    expect(getOrCompute(map, 'a', () => 99)).toBe(1);
    // Should not overwrite the value
    expect(map.get('a')).toBe(1);
  });

  it('should compute, set, and return the value for a non-existing key', () => {
    const map = new Map<string, number>([
      ['a', 1],
      ['b', 2],
    ]);
    const result = getOrCompute(map, 'c', () => 99);
    expect(result).toBe(99);
    expect(map.get('c')).toBe(99);
  });

  it('should call the fallback function only when the key is not found', () => {
    const map = new Map<string, number>([
      ['a', 1],
      ['b', 2],
    ]);
    const fallback = vi.fn(() => 99);
    getOrCompute(map, 'a', fallback);
    expect(fallback).not.toHaveBeenCalled();
    getOrCompute(map, 'c', fallback);
    expect(fallback).toHaveBeenCalledTimes(1);
  });
});
