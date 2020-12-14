import React, { FC, useEffect, useState } from 'react';

import { Time } from 'typings';
import {
  getFutureTime,
  getLastTimeEntryFor,
  saveTimeEntryLocally,
} from 'utils/date';
import styles from 'styles/components/countdown/MainCountdown.module.css';
import CountdownTimer from './CountdownTimer';
import TimeRangeForm from './TimeRangeForm';

const defaultStartTime: Time = { refersToNow: true };
const defaultEndTime: Time = getFutureTime({
  dayVariation: 48,
  hoursVariation: 11,
});

const lastStartTimeEntry = getLastTimeEntryFor('startTime');
const lastEndTimeEntry = getLastTimeEntryFor('endTime');

const MainCountdown: FC = () => {
  const [startTime, setStartTime] = useState<Time>(defaultStartTime);
  const [endTime, setEndTime] = useState<Time>(defaultEndTime);

  useEffect(() => {
    setStartTime(lastStartTimeEntry || defaultStartTime);
    setEndTime(lastEndTimeEntry || defaultEndTime);
  }, []);

  useEffect(() => {
    saveTimeEntryLocally('startTime', startTime);
  }, [startTime]);

  useEffect(() => {
    saveTimeEntryLocally('endTime', endTime);
  }, [endTime]);

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
