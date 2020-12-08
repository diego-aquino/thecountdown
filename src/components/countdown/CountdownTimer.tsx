import React, { FC, useCallback, useEffect, useState } from 'react';

import { Time, DeltaTime } from 'typings';
import { getDateObjectFrom, calculateDeltaTime } from 'utils/date';
import { numberToFormattedString } from 'utils/format';
import styles from 'styles/components/countdown/CountdownTimer.module.css';

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
    (deltaTime: DeltaTime): FormattedDeltaTime => {
      const { days, hours, minutes, seconds, isFromPast } = deltaTime;

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
      const startTimeAsDate = getDateObjectFrom(newStartTime);
      const endTimeAsDate = getDateObjectFrom(newEndTime);

      const deltaTime = calculateDeltaTime(startTimeAsDate, endTimeAsDate);
      const formattedDeltaTime = formatDeltaTime(deltaTime);

      setDisplayTime(formattedDeltaTime);
    },
    [formatDeltaTime],
  );

  useEffect(() => { // eslint-disable-line
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
      <div className={styles.largeTimeSection}>
        <h1 className={styles.largeTimeSectionCount}>{displayTime?.days}</h1>
        <h4 className={styles.largeTimeSectionLabel}>days</h4>
      </div>
      <div className={styles.largeTimeSection}>
        <h1 className={styles.largeTimeSectionCount}>{displayTime?.hours}</h1>
        <h4 className={styles.largeTimeSectionLabel}>hours</h4>
      </div>
      <div className={styles.largeTimeSection}>
        <h1 className={styles.largeTimeSectionCount}>{displayTime?.minutes}</h1>
        <h4 className={styles.largeTimeSectionLabel}>minutes</h4>
      </div>
      <div className={styles.smallTimeSection}>
        <h3 className={styles.smallTimeSectionCount}>{displayTime?.seconds}</h3>
        <h4 className={styles.smallTimeSectionLabel}>s</h4>
      </div>
    </div>
  );
};

export default CountdownTimer;
