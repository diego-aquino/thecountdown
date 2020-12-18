import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Time } from 'typings';
import {
  getRandomTimeInFuture,
  getLastTimeEntryFor,
  saveTimeEntryLocally,
} from 'utils/date';
import { CircularLoading } from 'components/common';
import styles from 'styles/components/countdown/MainCountdown.module.css';
import CountdownTimer from './CountdownTimer';
import TimeRangeForm from './TimeRangeForm';

const MainCountdown: FC = () => {
  const [startTime, setStartTime] = useState<Time | null>(null);
  const [endTime, setEndTime] = useState<Time | null>(null);

  const lastStartTimeEntry = useMemo(
    () => getLastTimeEntryFor('startTime'),
    [],
  );
  const lastEndTimeEntry = useMemo(() => getLastTimeEntryFor('endTime'), []);

  const getDefaultStartTime = useCallback(
    (): Time => ({ refersToNow: true }),
    [],
  );
  const getDefaultEndTime = useCallback(() => getRandomTimeInFuture(), []);

  useEffect(() => {
    setStartTime(lastStartTimeEntry || getDefaultStartTime());
    setEndTime(lastEndTimeEntry || getDefaultEndTime());
  }, [
    lastStartTimeEntry,
    lastEndTimeEntry,
    getDefaultStartTime,
    getDefaultEndTime,
  ]);

  useEffect(() => {
    if (startTime) {
      saveTimeEntryLocally('startTime', startTime);
    }
  }, [startTime]);

  useEffect(() => {
    if (endTime) {
      saveTimeEntryLocally('endTime', endTime);
    }
  }, [endTime]);

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
