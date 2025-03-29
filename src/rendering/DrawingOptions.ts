class DrawingOptions {
  // Width of each column in the grid
  columnWidth;
  // Padding between columns
  columnPadding;
  // Additional padding for overlapping elements
  overlapPadding;
  // Radius of the circles representing numbers
  numberCircleRadius;
  // Padding around the number circles
  numberCirclePadding;
  // Height reserved for text labels of number sets
  textHeight;

  constructor(
    columnWidth = 50,
    columnPadding = 10,
    overlapPadding = 10,
    numberCircleRadius = 20,
    numberCirclePadding = 5,
    textHeight = 20,
  ) {
    this.columnWidth = columnWidth;
    this.columnPadding = columnPadding;
    this.overlapPadding = overlapPadding;
    this.numberCircleRadius = numberCircleRadius;
    this.numberCirclePadding = numberCirclePadding;
    this.textHeight = textHeight;
  }
}

export default DrawingOptions;
