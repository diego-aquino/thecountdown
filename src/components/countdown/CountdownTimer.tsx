import React, { FC, useCallback, useEffect, useState } from 'react';

import { Time, DeltaTime } from 'typings';
import { calculateDeltaTime, isDeltaTimeFromPast } from 'utils/date';
import { numberToFormattedString } from 'utils/format';
import styles from 'styles/components/countdown/CountdownTimer.module.css';
import clsx from 'clsx';

interface FormattedDeltaTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isFromPast?: boolean;
}

interface Props {
  startTime: Time;
  endTime: Time;
}

const CountdownTimer: FC<Props> = ({ startTime, endTime }) => {
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

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    updateDisplayTime(startTime, endTime);

    if (startTime.refersToNow || endTime.refersToNow) {
      const updateInterval = setInterval(() => {
        updateDisplayTime(startTime, endTime);
      }, 1000);

      return () => clearInterval(updateInterval);
    }
  }, [startTime, endTime, updateDisplayTime]);

  return (
    <div className={styles.countdownTimer}>
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
