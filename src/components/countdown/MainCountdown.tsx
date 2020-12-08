import React, { FC, useCallback, useRef, useState } from 'react';

import { Time, StaticTime } from 'typings';
import { Arrow, Calendar, Hourglass, XMark } from 'assets';
import { getRandomTimeInFuture } from 'utils/date';
import styles from 'styles/components/countdown/MainCountdown.module.css';
import CountdownTimer from './CountdownTimer';

interface TimeInputRefGroup {
  timeInputRef: React.RefObject<HTMLInputElement>;
  dateInputRef: React.RefObject<HTMLInputElement>;
}

const MainCountdown: FC = () => {
  const [startTime, setStartTime] = useState<Time>({ refersToNow: true });
  const [endTime, setEndTime] = useState<Time>(getRandomTimeInFuture());

  const startTimeInputRefGroup = useRef<TimeInputRefGroup>({
    timeInputRef: useRef<HTMLInputElement>(null),
    dateInputRef: useRef<HTMLInputElement>(null),
  });
  const endTimeInputRefGroup = useRef<TimeInputRefGroup>({
    timeInputRef: useRef<HTMLInputElement>(null),
    dateInputRef: useRef<HTMLInputElement>(null),
  });

  const getUpdatedTimeBasedOnInput = useCallback(
    (previousTime: Time, inputType: string, inputValue: string) => {
      const newTime = { ...previousTime, refersToNow: false } as StaticTime;

      if (inputType === 'time') {
        const [hours, minutes] = inputValue.split(':').map((value) => +value);
        newTime.hours = hours;
        newTime.minutes = minutes;
      } else {
        const [year, month, day] = inputValue.split('-').map((value) => +value);
        newTime.year = year;
        newTime.month = month - 1;
        newTime.day = day;
      }

      return newTime;
    },
    [],
  );

  const updateTime = useCallback(
    (
      setStateFunction: React.Dispatch<React.SetStateAction<Time>>,
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const { type: inputType, value: inputValue } = event.target;

      setStateFunction((previousTime) =>
        getUpdatedTimeBasedOnInput(previousTime, inputType, inputValue),
      ); // eslint-disable-line
    },
    [getUpdatedTimeBasedOnInput],
  );

  const clearTimeEntry = useCallback(
    (
      setStateFunction: React.Dispatch<React.SetStateAction<Time>>,
      timeInputRefGroup: React.MutableRefObject<TimeInputRefGroup>,
    ) => {
      setStateFunction({ refersToNow: true });

      const { timeInputRef, dateInputRef } = timeInputRefGroup.current;

      if (timeInputRef.current) {
        timeInputRef.current.value = '';
      }
      if (dateInputRef.current) {
        dateInputRef.current.value = '';
      }
    },
    [],
  );

  return (
    <div className={styles.mainCountdown}>
      <form className={styles.timeForm}>
        <div className={styles.startTimeInputContainer}>
          <Calendar className={styles.calendarIcon} />
          <input
            ref={startTimeInputRefGroup.current.timeInputRef}
            className={styles.startHoursAndMinuteInput}
            type="time"
            onChange={(e) => updateTime(setStartTime, e)}
          />
          <div className={styles.separator} />
          <input
            ref={startTimeInputRefGroup.current.dateInputRef}
            className={styles.startDateInput}
            type="date"
            onChange={(e) => updateTime(setStartTime, e)}
          />

          {!startTime.refersToNow && (
            <button
              type="button"
              className={styles.clearInput}
              onClick={() =>
                clearTimeEntry(setStartTime, startTimeInputRefGroup)
              }
            >
              <XMark className={styles.XMark} />
            </button>
          )}
        </div>

        <Arrow className={styles.arrowIcon} />
        <Hourglass className={styles.hourglass} />

        <div className={styles.endTimeInputContainer}>
          <Calendar className={styles.calendarIcon} />
          <input
            ref={endTimeInputRefGroup.current.timeInputRef}
            className={styles.endHoursAndMinuteInput}
            type="time"
            onChange={(e) => updateTime(setEndTime, e)}
          />
          <div className={styles.separator} />
          <input
            ref={endTimeInputRefGroup.current.dateInputRef}
            className={styles.endDateInput}
            type="date"
            onChange={(e) => updateTime(setEndTime, e)}
          />

          {!endTime.refersToNow && (
            <button
              type="button"
              className={styles.clearInput}
              onClick={() => clearTimeEntry(setEndTime, endTimeInputRefGroup)}
            >
              <XMark className={styles.XMark} />
            </button>
          )}
        </div>
      </form>

      <CountdownTimer startTime={startTime} endTime={endTime} />
    </div>
  );
};

export default MainCountdown;
