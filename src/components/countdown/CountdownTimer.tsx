import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Time, DeltaTime, HTMLDivElementProps } from 'typings';
import { calculateDeltaTime, isDeltaTimeFromPast } from 'utils/date';
import { numberToFormattedString } from 'utils/format';
import { useResize, useScreenBreakpoint } from 'hooks';
import styles from 'styles/components/countdown/CountdownTimer.module.css';

interface FormattedDeltaTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isFromPast?: boolean;
}

type CountdownTimerLayout = 'horizontal' | 'vertical';

interface Props extends HTMLDivElementProps {
  startTime: Time;
  endTime: Time;
}

const CountdownTimer: FC<Props> = ({
  startTime,
  endTime,
  className,
  ...rest
}) => {
  const [displayTime, setDisplayTime] = useState<FormattedDeltaTime>();

  const formatDeltaTime = useCallback(
    (deltaTime: DeltaTime, isFromPast: boolean): FormattedDeltaTime => {
      const { days, hours, minutes, seconds } = deltaTime;

      return {
        days: days.toString(),
        hours: numberToFormattedString(hours, 2),
        minutes: numberToFormattedString(minutes, 2),
        seconds: numberToFormattedString(seconds, 2),
        isFromPast,
      };
    },
    [],
  );

  const updateDisplayTime = useCallback(
    (newStartTime: Time, newEndTime: Time) => {
      const startTimeDate = newStartTime.refersToNow
        ? new Date()
        : newStartTime.date;
      const endTimeDate = newEndTime.refersToNow ? new Date() : newEndTime.date;

      const deltaTime = calculateDeltaTime(startTimeDate, endTimeDate);
      const formattedDeltaTime = formatDeltaTime(
        deltaTime,
        isDeltaTimeFromPast(newStartTime, newEndTime),
      );

      setDisplayTime(formattedDeltaTime);
    },
    [formatDeltaTime],
  );

  useEffect(() => {
    updateDisplayTime(startTime, endTime);

    if (startTime.refersToNow || endTime.refersToNow) {
      const updateInterval = setInterval(() => {
        updateDisplayTime(startTime, endTime);
      }, 1000);

      return () => clearInterval(updateInterval);
    }
  }, [startTime, endTime, updateDisplayTime]);

  const countdownTimerRef = useRef<HTMLDivElement>(null);
  const layout = useScreenBreakpoint<CountdownTimerLayout>(
    ['vertical', 'horizontal'],
    [550],
  );

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

      if (newTransformValue !== currentTransformValue) {
        countdownTimerElement.style.transform = newTransformValue;
        countdownTimerElement.style.height = newHeightValue;
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
      <div className={styles.timerContainer}>
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
          !displayTime?.isFromPast && styles.hidden,
        )}
      >
        ago
      </div>
    </div>
  );
};

export default CountdownTimer;
