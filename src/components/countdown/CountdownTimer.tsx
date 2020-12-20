import React, {
  forwardRef,
  ForwardRefRenderFunction,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import { Time, DeltaTime, HTMLDivElementProps, NumberSign } from 'typings';
import {
  calculateDeltaTime,
  isContinuousDeltaTime,
  isDeltaTimeAgo,
} from 'utils/date';
import { numberToFormattedString } from 'utils/format';
import { useResize, useScreenBreakpoint } from 'hooks';
import { CircularLoading } from 'components/common';
import styles from 'styles/components/countdown/CountdownTimer.module.css';

interface FormattedDeltaTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isNegative: boolean;
  isAgo: boolean;
}

type CountdownTimerLayout = 'horizontal' | 'vertical';

export type Ref = {
  updateStartTime: (newStartTime: Time) => void;
  updateEndTime: (newEndTime: Time) => void;
  setIsLoading: (newLoadingStatus: boolean) => void;
};

interface Props extends HTMLDivElementProps {
  onTimeRangeSignChange?: (newTimeRangeSign: NumberSign) => void;
}

const CountdownTimer: ForwardRefRenderFunction<Ref, Props> = (
  { onTimeRangeSignChange, className, ...rest },
  ref,
) => {
  const [startTime, setStartTime] = useState<Time | null>(null);
  const [endTime, setEndTime] = useState<Time | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [displayTime, setDisplayTime] = useState<FormattedDeltaTime>();
  const timeRangeSign = useRef<NumberSign>();

  const countdownTimerRef = useRef<HTMLDivElement | null>(null);

  const layout = useScreenBreakpoint<CountdownTimerLayout>(
    ['vertical', 'horizontal'],
    [550],
  );

  useImperativeHandle(
    ref,
    () => ({
      updateStartTime: setStartTime,
      updateEndTime: setEndTime,
      setIsLoading,
    }),
    [],
  );

  const formatDeltaTime = useCallback(
    (deltaTime: DeltaTime, isAgo: boolean): FormattedDeltaTime => {
      const { days, hours, minutes, seconds, isNegative } = deltaTime;

      return {
        days: days.toString(),
        hours: numberToFormattedString(hours, 2),
        minutes: numberToFormattedString(minutes, 2),
        seconds: numberToFormattedString(seconds, 2),
        isNegative,
        isAgo,
      };
    },
    [],
  );

  const updateDisplayTime = useCallback(
    (newStartTime: Time, newEndTime: Time) => {
      const deltaTime = calculateDeltaTime(newStartTime, newEndTime);
      const isAgo = isDeltaTimeAgo(newStartTime, newEndTime);

      const formattedDeltaTime = formatDeltaTime(deltaTime, isAgo);

      setDisplayTime(formattedDeltaTime);
    },
    [formatDeltaTime],
  );

  useEffect(() => {
    if (!startTime || !endTime) return;

    updateDisplayTime(startTime, endTime);

    if (isContinuousDeltaTime(startTime, endTime)) {
      const updateInterval = setInterval(() => {
        updateDisplayTime(startTime, endTime);
      }, 1000);

      return () => clearInterval(updateInterval); // eslint-disable-line consistent-return
    }
  }, [startTime, endTime, updateDisplayTime]);

  useEffect(() => {
    if (!displayTime) return;

    const previousTimeRangeSign = timeRangeSign.current;
    const currentTimeRangeSign = displayTime.isNegative ? -1 : 1;

    const hasTimeRangeSignChanged =
      previousTimeRangeSign !== currentTimeRangeSign;

    if (hasTimeRangeSignChanged) {
      onTimeRangeSignChange?.(currentTimeRangeSign);
      timeRangeSign.current = currentTimeRangeSign;
    }
  }, [onTimeRangeSignChange, displayTime]);

  const adaptStylesToAvailableWidth = useCallback(() => {
    const countdownTimerElement = countdownTimerRef.current;

    if (!countdownTimerElement) {
      return;
    }

    countdownTimerElement.style.height = '';

    requestAnimationFrame(() => {
      const countdownTimerWidth = countdownTimerElement.clientWidth;
      const countdownTimerHeight = countdownTimerElement.clientHeight;

      const parent = countdownTimerElement.parentElement as HTMLElement;
      const parentStyles = window.getComputedStyle(parent);
      const parentHorizontalPadding =
        parseFloat(parentStyles.getPropertyValue('padding-left')) +
        parseFloat(parentStyles.getPropertyValue('padding-right'));

      const availableWidth = parent.clientWidth - parentHorizontalPadding;

      const newScale = Math.min(availableWidth / countdownTimerWidth, 1);
      const newHeightValue = `${countdownTimerHeight * newScale}px`;

      const newTransformValue = `scale(${newScale})`;
      const currentTransformValue = countdownTimerElement.style.transform;

      countdownTimerElement.style.height = newHeightValue;
      if (newTransformValue !== currentTransformValue) {
        countdownTimerElement.style.transform = newTransformValue;
      }
    });
  }, []);

  useResize(adaptStylesToAvailableWidth);
  useEffect(adaptStylesToAvailableWidth, [
    startTime,
    endTime,
    adaptStylesToAvailableWidth,
  ]);

  return (
    <div
      ref={countdownTimerRef}
      className={clsx(
        styles.countdownTimer,
        layout && styles[layout],
        className,
      )}
      {...rest}
    >
      <div className={clsx(styles.timerContainer, isLoading && styles.loading)}>
        {isLoading && (
          <div className={styles.loadingContainer}>
            <CircularLoading className={styles.loadingIcon} />
          </div>
        )}

        <div className={styles.largeTimeSection}>
          <h1 className={styles.largeTimeSectionCount}>{displayTime?.days}</h1>
          <h4 className={styles.largeTimeSectionLabel}>days</h4>
        </div>
        <div className={styles.largeTimeSection}>
          <h1 className={styles.largeTimeSectionCount}>{displayTime?.hours}</h1>
          <h4 className={styles.largeTimeSectionLabel}>hours</h4>
        </div>
        <div className={styles.largeTimeSection}>
          <h1 className={styles.largeTimeSectionCount}>
            {displayTime?.minutes}
          </h1>
          <h4 className={styles.largeTimeSectionLabel}>minutes</h4>
        </div>
        <div className={styles.smallTimeSection}>
          <h3 className={styles.smallTimeSectionCount}>
            {displayTime?.seconds}
          </h3>
          <h4 className={styles.smallTimeSectionLabel}>s</h4>
        </div>
      </div>

      <div
        className={clsx(
          styles.agoFlag,
          !displayTime?.isAgo && styles.hidden,
          isLoading && styles.loading,
        )}
      >
        ago
      </div>
    </div>
  );
};

export default memo(forwardRef(CountdownTimer));
