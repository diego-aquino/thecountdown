import { useCallback, useEffect, useState } from 'react';

import useResize from './useResize';

function useScreenBreakpoint<IntervalLabel>(
  intervalLabels: IntervalLabel[],
  breakpoints: number[],
): IntervalLabel | null {
  const [label, setLabel] = useState<IntervalLabel | null>(null);

  const searchRightmostValueLowerThan = useCallback(
    (upperLimit: number, searchingArray: number[]) => {
      let left = 0;
      let right = searchingArray.length - 1;
      let middle = Math.floor((left + right) / 2);

      while (left <= right) {
        middle = Math.floor((left + right) / 2);

        if (searchingArray[middle] < upperLimit) {
          left = middle + 1;
        } else {
          right = middle - 1;
        }
      }

      return searchingArray[middle] < upperLimit ? middle : middle - 1;
    },
    [],
  );

  const getLabelFor = useCallback(
    (currentWindowWidth: number) => {
      const activeLeftBreakpointIndex = searchRightmostValueLowerThan(
        currentWindowWidth,
        breakpoints,
      );

      return intervalLabels[activeLeftBreakpointIndex + 1];
    },
    [intervalLabels, breakpoints, searchRightmostValueLowerThan],
  );

  const updateLabelIfNecessary = useCallback(() => {
    const newLabel = getLabelFor(window.innerWidth);

    if (newLabel !== label) {
      setLabel(newLabel);
    }
  }, [label, getLabelFor]);

  useResize(updateLabelIfNecessary);
  useEffect(updateLabelIfNecessary, [updateLabelIfNecessary]);

  return label;
}

export default useScreenBreakpoint;
