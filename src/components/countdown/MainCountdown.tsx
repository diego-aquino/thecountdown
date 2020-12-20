import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { NumberSign, Time } from 'typings';
import {
  getRandomTimeInFuture,
  getLastTimeEntryFor,
  saveTimeEntryLocally,
} from 'utils/date';
import { CircularLoading } from 'components/common';
import { useScreenBreakpoint } from 'hooks';
import styles from 'styles/components/countdown/MainCountdown.module.css';
import { Layout, TimeCategory } from './types';
import CountdownTimer, { Ref as CountdownTimerRef } from './CountdownTimer';
import TimeRangeForm from './TimeRangeForm';

const inactivityDelayTime = 500;

type UpdateOptions = {
  [key in TimeCategory]?: Time;
};

type UpdateCountdownTimerHandle = (options: UpdateOptions) => void;

type TimeCategoriesPendingDisplay = {
  [key in TimeCategory]: {
    value: Time | null;
    timer: NodeJS.Timeout | null;
  };
};

const MainCountdown: FC = () => {
  const [startTime, setStartTime] = useState<Time | null>(null);
  const [endTime, setEndTime] = useState<Time | null>(null);

  const countdownTimerRef = useRef<CountdownTimerRef>(null);

  const layout = useScreenBreakpoint<Layout>(
    ['vertical', 'horizontalNarrow', 'horizontal'],
    [805, 860],
  );

  const [timeRangeSign, setTimeRangeSign] = useState<NumberSign>();

  const lastStartTime = useMemo(() => getLastTimeEntryFor('startTime'), []);
  const lastEndTime = useMemo(() => getLastTimeEntryFor('endTime'), []);

  const getDefaultStartTime = useCallback(
    (): Time => ({ refersToNow: true }),
    [],
  );
  const getDefaultEndTime = useCallback(() => getRandomTimeInFuture(), []);

  useEffect(() => {
    setStartTime(lastStartTime || getDefaultStartTime());
    setEndTime(lastEndTime || getDefaultEndTime());
  }, [lastStartTime, lastEndTime, getDefaultStartTime, getDefaultEndTime]);

  const updateCountdownTimer = useCallback<UpdateCountdownTimerHandle>(
    ({ startTime: newStartTime, endTime: newEndTime }) => {
      if (newStartTime) {
        countdownTimerRef.current?.updateStartTime(newStartTime);
      }
      if (newEndTime) {
        countdownTimerRef.current?.updateEndTime(newEndTime);
      }
    },
    [],
  );

  const timeCategoriesPendingDisplay = useRef<TimeCategoriesPendingDisplay>({
    startTime: { value: null, timer: null },
    endTime: { value: null, timer: null },
  });

  const isPendingTimeStillTheSame = useCallback(
    (pendingTimeCategory: TimeCategory, currentValue: Time | null) => {
      const pendingTimeValue =
        timeCategoriesPendingDisplay.current[pendingTimeCategory].value;

      return pendingTimeValue === currentValue;
    },
    [],
  );

  const handleTimeChange = useCallback(
    (timeCategory: TimeCategory, newValue: Time | null) => {
      if (!newValue) return;

      saveTimeEntryLocally(timeCategory, newValue);

      const timePendingDisplay =
        timeCategoriesPendingDisplay.current[timeCategory];

      timePendingDisplay.value = newValue;

      if (timePendingDisplay.timer) {
        clearTimeout(timePendingDisplay.timer);
      } else {
        // update CountdownTimer right away if on first render
        updateCountdownTimer({ [timeCategory]: newValue });
      }

      timePendingDisplay.timer = setTimeout(() => {
        if (isPendingTimeStillTheSame(timeCategory, newValue)) {
          updateCountdownTimer({ [timeCategory]: newValue });
        }
      }, inactivityDelayTime);
    },
    [isPendingTimeStillTheSame, updateCountdownTimer],
  );

  useEffect(() => {
    handleTimeChange('startTime', startTime);
  }, [startTime, handleTimeChange]);

  useEffect(() => {
    handleTimeChange('endTime', endTime);
  }, [endTime, handleTimeChange]);

  const handleTimeInputBlur = useCallback(
    (timeCategory: TimeCategory, currentValue: Time) => {
      const onGoingUpdateTimer =
        timeCategoriesPendingDisplay.current[timeCategory].timer;
      if (onGoingUpdateTimer) {
        clearTimeout(onGoingUpdateTimer);
      }

      updateCountdownTimer({ [timeCategory]: currentValue });
    },
    [updateCountdownTimer],
  );

  const handleCountdownTimerEnd = useCallback(
    (newTimeRangeSign: NumberSign) => {
      setTimeRangeSign(newTimeRangeSign);
    },
    [],
  );

  return (
    <div className={styles.mainCountdown}>
      {startTime && endTime && layout ? (
        <>
          <TimeRangeForm
            layout={layout}
            startTime={startTime}
            endTime={endTime}
            timeRangeSign={timeRangeSign}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
            onTimeInputBlur={handleTimeInputBlur}
          />
          <CountdownTimer
            ref={countdownTimerRef}
            onTimerEnd={handleCountdownTimerEnd}
          />
        </>
      ) : (
        <CircularLoading />
      )}
    </div>
  );
};

export default MainCountdown;
