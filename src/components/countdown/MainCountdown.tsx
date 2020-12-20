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
} & {
  isLoading?: boolean;
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
    ({ startTime: newStartTime, endTime: newEndTime, isLoading }) => {
      const { updateStartTime, updateEndTime, setIsLoading } =
        countdownTimerRef.current || {};

      if (newStartTime) {
        updateStartTime?.(newStartTime);
      }
      if (newEndTime) {
        updateEndTime?.(newEndTime);
      }
      if (isLoading !== undefined) {
        setIsLoading?.(isLoading);
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

      const isFirstCountdownTimerRender = !timePendingDisplay.timer;

      if (isFirstCountdownTimerRender) {
        updateCountdownTimer({ [timeCategory]: newValue });
      } else {
        if (timePendingDisplay.timer) {
          clearTimeout(timePendingDisplay.timer);
        }
        updateCountdownTimer({ isLoading: true });
      }

      timePendingDisplay.timer = setTimeout(() => {
        if (isPendingTimeStillTheSame(timeCategory, newValue)) {
          updateCountdownTimer({ [timeCategory]: newValue, isLoading: false });
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

      updateCountdownTimer({ [timeCategory]: currentValue, isLoading: false });
    },
    [updateCountdownTimer],
  );

  const handleTimeRangeSignChange = useCallback(
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
            onTimeRangeSignChange={handleTimeRangeSignChange}
          />
        </>
      ) : (
        <CircularLoading />
      )}
    </div>
  );
};

export default MainCountdown;
