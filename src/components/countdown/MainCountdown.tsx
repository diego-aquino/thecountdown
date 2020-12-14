import React, { FC, useEffect, useState } from 'react';

import { Time } from 'typings';
import { CircularLoading } from 'components/common';
import { getFutureTime } from 'utils/date';
import styles from 'styles/components/countdown/MainCountdown.module.css';
import CountdownTimer from './CountdownTimer';
import TimeRangeForm from './TimeRangeForm';

const MainCountdown: FC = () => {
  const [startTime, setStartTime] = useState<Time | null>(null);
  const [endTime, setEndTime] = useState<Time | null>(null);

  useEffect(() => {
    setStartTime({ refersToNow: true });
    setEndTime(
      getFutureTime({
        dayVariation: 48,
        hoursVariation: 11,
      }),
    );
  }, []);

  return (
    <div className={styles.mainCountdown}>
      <TimeRangeForm
        startTime={startTime}
        endTime={endTime}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
        layoutBreakpoint={880}
      />
      <CountdownTimer startTime={startTime} endTime={endTime} />
    </div>
  );
};

export default MainCountdown;
