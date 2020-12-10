import React, { FC, useState } from 'react';

import { Time } from 'typings';
import { getRandomTimeInFuture } from 'utils/date';
import styles from 'styles/components/countdown/MainCountdown.module.css';
import CountdownTimer from './CountdownTimer';
import TimeRangeForm from './TimeRangeForm';

const MainCountdown: FC = () => {
  const [startTime, setStartTime] = useState<Time>({ refersToNow: true });
  const [endTime, setEndTime] = useState<Time>(getRandomTimeInFuture());

  return (
    <div className={styles.mainCountdown}>
      <TimeRangeForm
        startTime={startTime}
        endTime={endTime}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
      />
      <CountdownTimer startTime={startTime} endTime={endTime} />
    </div>
  );
};

export default MainCountdown;
