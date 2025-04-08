import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { IRepresentativeNumber, NumberSet } from '../data/numberData';
import { schemeCategory10 } from 'd3-scale-chromatic';
import createRectangleLayout from '../layout/RectangleLayout';
import { safeGet } from '../utils/collectionUtils';
import RepresentativeNumberRenderer from './RepresentativeNumberRenderer';
import RepresentativeNumberLabel from '../rendering/shapes/RepresentativeNumberLabel';
import DrawingOptions from '../rendering/DrawingOptions';
import NumberSetRectangle from '../rendering/shapes/NumberSetRectangle';
import NumberSetRectangleRenderer from './NumberSetRectangleRenderer';

interface DiagramComponentProps {
  numberSet: NumberSet;
}

const DiagramComponent: React.FC<DiagramComponentProps> = ({ numberSet }) => {
  const ref = useRef<SVGSVGElement>(null);

  const [svgWidth, setSvgWidth] = useState(900);
  const [svgHeight, setSvgHeight] = useState(900);

  const calculateCanvasWidth = (
    rectangleMap: Map<NumberSet, NumberSetRectangle>,
  ): number => {
    return (
      Array.from(rectangleMap.values()).reduce((max, rect) => {
        return Math.max(max, rect.x + rect.width);
      }, 0) + 3
    );
  };

  const calculateCanvasHeight = (
    rectangleMap: Map<NumberSet, NumberSetRectangle>,
  ): number => {
    return (
      Array.from(rectangleMap.values()).reduce((max, rect) => {
        return Math.max(max, rect.y + rect.height);
      }, 0) + 3
    );
  };

  useEffect(() => {
    const grid = createRectangleLayout(numberSet);
    const options = new DrawingOptions();

    // Phase 1: Create a map of RepresentativeNumber to RepresentativeNumberLabel
    const numberLabelMap = new Map<
      IRepresentativeNumber,
      RepresentativeNumberLabel
    >();
    grid.columns.forEach((column) => {
      column.numbers.forEach((number) => {
        const label = new RepresentativeNumberLabel(number, grid, options);
        numberLabelMap.set(number, label);
      });
    });

    // Phase 1: Create a map of NumberSet to NumberSetRectangle using iterateColumns
    const rectangleMap = new Map<NumberSet, NumberSetRectangle>();
    grid.iterateColumns({
      /**
       * Handles the opening of a number set.
       * - Creates a new NumberSetRectangle for the set.
       * - Determines the left-most label by finding the number with the smallest x (and y if tied).
       * - Calculates the number of contained subsets at the start column.
       * - Adds the rectangle to the rectangleMap.
       */
      openNumberSet: (set, _) => {
        const rectangle = new NumberSetRectangle(set, options, grid);
        const allContainedNumbers = Array.from(set.getAllContainedNumbers());
        const leftMostNumber = allContainedNumbers.reduce((min, num) => {
          const label = safeGet(numberLabelMap, num);
          const minLabel = safeGet(numberLabelMap, min);
          return label.x < minLabel.x ||
            (label.x === minLabel.x && label.y < minLabel.y)
            ? num
            : min;
        }, allContainedNumbers[0]);
        const leftMostLabel = safeGet(numberLabelMap, leftMostNumber);
        rectangle.setLeftMostLabel(leftMostLabel);

        grid.columns.forEach((column) => {
          if (column.startingSets.includes(set)) {
            const index = column.startingSets.indexOf(set);
            const containedSubsetsAtStartColumn =
              column.startingSets.length - index - 1;
            rectangle.setContainedSubsetsAtStartColumn(
              containedSubsetsAtStartColumn,
            );
          }
        });

        rectangleMap.set(set, rectangle);
      },
      /**
       * Processes elements within the current context.
       * - Iterates over each set in the context.
       * - Updates the maxContainedSets for each rectangle based on the number of sets
       *   that come after the current set in the context.
       */
      processElements: (_, context) => {
        context.forEach((entry) => {
          const rectangle = safeGet(rectangleMap, entry.set);

          const currentIndex = context.findIndex(
            (ctxEntry) => ctxEntry.set === entry.set,
          );
          const containedSetsCount = context.slice(currentIndex + 1).length;
          rectangle.updateMaxContainedSets(containedSetsCount);
        });
      },
      /**
       * Handles the closing of a number set.
       * - Determines the right-most label by finding the number with the largest x.
       * - Determines the bottom-most label by finding the number with the largest y.
       * - Calculates the number of contained subsets at the end column.
       * - Updates the rectangle in the rectangleMap.
       */
      closeNumberSet: (set, _) => {
        const rectangle = safeGet(rectangleMap, set);

        const allContainedNumbers = Array.from(set.getAllContainedNumbers());
        const rightMostNumber = allContainedNumbers.reduce((max, num) => {
          const label = safeGet(numberLabelMap, num);
          return label.x > safeGet(numberLabelMap, max).x ? num : max;
        }, allContainedNumbers[0]);
        const rightMostLabel = safeGet(numberLabelMap, rightMostNumber);
        rectangle.setRightMostLabel(rightMostLabel);

        const bottomMostNumber = allContainedNumbers.reduce((max, num) => {
          const label = safeGet(numberLabelMap, num);
          return label.y > safeGet(numberLabelMap, max).y ? num : max;
        }, allContainedNumbers[0]);
        const bottomMostLabel = safeGet(numberLabelMap, bottomMostNumber);
        rectangle.setBottomMostLabel(bottomMostLabel);
        grid.columns.forEach((column) => {
          if (column.endingSets.includes(set)) {
            const containedSubsetsAtEndColumn = column.endingSets.indexOf(set);
            rectangle.setContainedSubsetsAtEndColumn(
              containedSubsetsAtEndColumn,
            );
          }
        });
      },
    });

    const canvasWidth = calculateCanvasWidth(rectangleMap);
    const canvasHeight = calculateCanvasHeight(rectangleMap);
    const svg = d3
      .select(ref.current)
      .attr('width', canvasWidth)
      .attr('height', canvasHeight);

    setSvgWidth(canvasWidth);
    setSvgHeight(canvasHeight);

    svg.selectAll('*').remove(); // Clear previous content

    const group = svg.append<SVGGElement | null>('g');

    // Phase 2: Render each NumberSetRectangle
    let colorCounter = 0;
    rectangleMap.forEach((rectangle) => {
      const fillColor =
        schemeCategory10[colorCounter % schemeCategory10.length];
      colorCounter++;
      const fillColorWithTransparency = d3.color(fillColor);
      if (fillColorWithTransparency) {
        fillColorWithTransparency.opacity = 0.5; // Set transparency level
      }
      NumberSetRectangleRenderer(
        group,
        rectangle,
        options,
        fillColorWithTransparency?.toString() ?? fillColor,
      );
    });

    // Phase 2: Render each RepresentativeNumberLabel
    numberLabelMap.forEach((label) => {
      RepresentativeNumberRenderer(group, label, options);
    });
  }, [numberSet]);

  return <svg ref={ref} width={svgWidth} height={svgHeight} />;
};

export default DiagramComponent;
