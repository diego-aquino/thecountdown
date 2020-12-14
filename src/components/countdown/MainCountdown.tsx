import React, { FC, useEffect, useState } from 'react';

import { Time } from 'typings';
import { CircularLoading } from 'components/common';
import { getRandomTimeInFuture } from 'utils/date';
import styles from 'styles/components/countdown/MainCountdown.module.css';
import CountdownTimer from './CountdownTimer';
import TimeRangeForm from './TimeRangeForm';

const MainCountdown: FC = () => {
  const [startTime, setStartTime] = useState<Time | null>(null);
  const [endTime, setEndTime] = useState<Time | null>(null);

  useEffect(() => {
    setStartTime({ refersToNow: true });
    setEndTime(getRandomTimeInFuture());
  }, []);

  return (
    <div className={styles.mainCountdown}>
      {startTime && endTime ? (
        <>
          <TimeRangeForm
            startTime={startTime}
            endTime={endTime}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
            layoutBreakpoint={880}
          />
          <CountdownTimer startTime={startTime} endTime={endTime} />
        </>
      ) : (
        <CircularLoading />
      )}
    </div>
  );
};

export default MainCountdown;
