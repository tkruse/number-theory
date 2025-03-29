export function elementAt<T>(array: T[], index: number): T {
  if (index < 0 || index >= array.length) {
    throw new Error(
      `Index ${index} is out of bounds for array of length ${array.length}`,
    );
  }
  return array[index];
}

export function nonNull<T>(value: T | null): T {
  if (value === null) {
    throw new Error('Value cannot be null');
  }
  return value;
}

export function safeSlice<T>(array: T[], start: number, end?: number): T[] {
  if (end === undefined) {
    if (start < 0) {
      return array.slice(start);
    }
    throw new Error(
      `Invalid negative start index ${start} when end is not provided.`,
    );
  }

  if (start < 0 || end < 0 || start >= array.length || end > array.length) {
    throw new Error(
      `Invalid slice indices: start ${start}, end ${end}, for array of length ${array.length}`,
    );
  }

  return array.slice(start, end);
}
