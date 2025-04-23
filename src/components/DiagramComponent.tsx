import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { INumberSet, IRepresentativeNumber } from '../data/numberData';

import createRectangleLayout, { RenderInputs } from '../layout/RectangleLayout';
import { safeGet } from '../utils/collectionUtils';
import renderRepresentativeNumber from './RepresentativeNumberRenderer';
import RepresentativeNumberLabel from '../rendering/shapes/RepresentativeNumberLabel';
import DrawingOptions from '../rendering/DrawingOptions';
import NumberSetRectangle from '../rendering/shapes/NumberSetRectangle';
import renderNumberSetRectangle from './NumberSetRectangleRenderer';
import Grid from '../layout/Grid';

interface DiagramComponentProps {
  renderInputs: RenderInputs[];
}

function computeRectanglesToRender(
  grid: Grid,
  options: DrawingOptions,
  numberLabelMap: Map<IRepresentativeNumber, RepresentativeNumberLabel>,
): Map<INumberSet, NumberSetRectangle> {
  const rectangleMap = new Map<INumberSet, NumberSetRectangle>();
  grid.iterateColumns({
    /**
     * Handles the opening of a number set.
     * - Creates a new NumberSetRectangle for the set.
     * - Determines the left-most label by finding the number with the smallest x (and y if tied).
     * - Calculates the number of contained subsets at the start column.
     * - Adds the rectangle to the rectangleMap.
     */
    openNumberSet: (set, _) => {
      const complementRectangle = set.partitionComplement
        ? rectangleMap.get(set.partitionComplement)
        : undefined;

      const rectangle =
        complementRectangle ?? new NumberSetRectangle(set, options, grid);

      const allContainedNumbers = Array.from(
        set.getAllContainedNumbers(),
      ).filter((num) => numberLabelMap.has(num));
      const leftMostNumber = allContainedNumbers.reduce((min, num) => {
        const label = safeGet(numberLabelMap, num);
        const minLabel = safeGet(numberLabelMap, min);
        return label.x < minLabel.x ||
          (label.x === minLabel.x && label.y < minLabel.y)
          ? num
          : min;
      }, allContainedNumbers[0]);
      const leftMostLabel = safeGet(numberLabelMap, leftMostNumber);
      rectangle.setLeftMostLabel(set, leftMostLabel);

      grid.columns.forEach((column) => {
        if (column.getStartingSets().includes(set)) {
          const index = column.getStartingSets().indexOf(set);
          const containedSubsetsAtStartColumn =
            column.getStartingSets().length - index - 1;
          rectangle.setContainedSubsetsAtStartColumn(
            set,
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
    processElements: (elements: IRepresentativeNumber[], context) => {
      context.forEach((entry) => {
        const rectangle = safeGet(rectangleMap, entry.set);

        const currentIndex = context.findIndex(
          (ctxEntry) => ctxEntry.set === entry.set,
        );
        const containedSetsCount = context.slice(currentIndex + 1).length;
        rectangle.updateMaxContainedSets(entry.set, containedSetsCount);
        const allContainedNumbers = Array.from(
          entry.set.getAllContainedNumbers(),
        ).filter((num) => numberLabelMap.has(num));
        const bottomMostNumber = allContainedNumbers
          .filter((num) => elements.indexOf(num) !== -1)
          .reduce((max, num) => {
            const label = safeGet(numberLabelMap, num);
            return label.y > safeGet(numberLabelMap, max).y ? num : max;
          }, allContainedNumbers[0]);
        const bottomMostLabel = safeGet(numberLabelMap, bottomMostNumber);
        const containedSubSets =
          context
            .slice(context.findIndex((ctxEntry) => ctxEntry.set === entry.set))
            .filter((ctxEntry) => ctxEntry.isOpen).length - 1;
        rectangle.addBottomMostLabel(
          entry.set,
          bottomMostLabel,
          containedSubSets,
        );
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

      const allContainedNumbers = Array.from(
        set.getAllContainedNumbers(),
      ).filter((num) => numberLabelMap.has(num));

      const rightMostNumber = allContainedNumbers.reduce((max, num) => {
        const label = safeGet(numberLabelMap, num);
        return label.x > safeGet(numberLabelMap, max).x ? num : max;
      }, allContainedNumbers[0]);
      const rightMostLabel = safeGet(numberLabelMap, rightMostNumber);
      rectangle.setRightMostLabel(set, rightMostLabel);

      grid.columns.forEach((column) => {
        if (column.getEndingSets().includes(set)) {
          const containedSubsetsAtEndColumn = column
            .getEndingSets()
            .indexOf(set);
          rectangle.setContainedSubsetsAtEndColumn(
            set,
            containedSubsetsAtEndColumn,
          );
        }
      });
    },
  });
  return rectangleMap;
}

const DiagramComponent: React.FC<DiagramComponentProps> = ({
  renderInputs,
}) => {
  const ref = useRef<SVGSVGElement>(null);

  const [svgWidth, setSvgWidth] = useState(900);
  const [svgHeight, setSvgHeight] = useState(900);

  const calculateCanvasWidth = (
    rectangleMap: Map<INumberSet, NumberSetRectangle>,
  ): number => {
    let maxX = 0;
    Array.from(rectangleMap.values()).forEach((rect) => {
      // Check all contained rectangles
      const contained = rect.getContainedRectangles();
      if (Array.isArray(contained)) {
        contained.forEach((subRect) => {
          maxX = Math.max(maxX, subRect.x + subRect.width);
        });
      }
    });
    return maxX + 3;
  };

  const calculateCanvasHeight = (
    rectangleMap: Map<INumberSet, NumberSetRectangle>,
  ): number => {
    return (
      Array.from(rectangleMap.values()).reduce((max, rect) => {
        return Math.max(max, rect.y + rect.height);
      }, 0) + 3
    );
  };

  useEffect(() => {
    const grid = createRectangleLayout(renderInputs);
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
    const rectangleMap = computeRectanglesToRender(
      grid,
      options,
      numberLabelMap,
    );

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

    // Phase 2: Render each NumberSet
    Array.from(rectangleMap.keys())
      .sort((a, b) => a.compareTo(b))
      .forEach((set) => {
        const rectangle = safeGet(rectangleMap, set);
        renderNumberSetRectangle(group, rectangle, set, options);
      });

    // Phase 2: Render each RepresentativeNumberLabel
    numberLabelMap.forEach((label) => {
      renderRepresentativeNumber(group, label, options);
    });
  }, [renderInputs]);

  return (
    <div>
      <svg
        role="img"
        aria-describedby="diagram-description"
        ref={ref}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto' }}
      >
        <title id="diagram-title">Number Sets Diagram</title>
        <desc id="diagram-description">
          This SVG diagram represents various mathematical number sets and their
          relationships as a Venn diagram. Each set is shown as a rectangle, and
          circles with numbers like pi or square-root of two are shown inside
          the rectangles. The sets shown are: Complex numbers, Imaginary numbers
          and Real numbers, Definable numbers, Computable numbers, Algebraic
          real numbers and Transcendental numbers, Constructible numbers,
          Rational and irrational numbers, Integers, Natural numbers, and Whole
          numbers.
        </desc>
      </svg>
    </div>
  );
};

export default DiagramComponent;
