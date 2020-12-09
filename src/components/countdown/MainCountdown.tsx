import React, { FC, useCallback, useState } from 'react';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import clsx from 'clsx';

import { Time } from 'typings';
import { Arrow, Calendar, Hourglass, XMark } from 'assets';
import { getRandomTimeInFuture } from 'utils/date';
import styles from 'styles/components/countdown/MainCountdown.module.css';
import CountdownTimer from './CountdownTimer';

interface ActiveStartDateChangeEvent {
  activeStartDate: Date;
}

const MainCountdown: FC = () => {
  const [startTime, setStartTime] = useState<Time>({ refersToNow: true });
  const [endTime, setEndTime] = useState<Time>(getRandomTimeInFuture());

  const updateTimeBasedOnInputEntry = useCallback(
    (
      setStateFunction: React.Dispatch<React.SetStateAction<Time>>,
      entry: Date | null,
    ) => {
      if (entry) {
        setStateFunction({ refersToNow: false, date: entry });
      } else {
        setStateFunction({ refersToNow: true });
      }
    },
    [],
  );

  const handleStartTimeChange = useCallback(
    (entry: Date | null) => {
      updateTimeBasedOnInputEntry(setStartTime, entry);
    },
    [updateTimeBasedOnInputEntry],
  );

  const handleActiveStartTimeChange = useCallback(
    ({ activeStartDate }: ActiveStartDateChangeEvent) =>
      updateTimeBasedOnInputEntry(setStartTime, activeStartDate),
    [updateTimeBasedOnInputEntry],
  );

  const handleEndTimeChange = useCallback(
    (entry: Date | null) => {
      updateTimeBasedOnInputEntry(setEndTime, entry);
    },
    [updateTimeBasedOnInputEntry],
  );

  const handleActiveEndTimeChange = useCallback(
    ({ activeStartDate: activeEndDate }: ActiveStartDateChangeEvent) =>
      updateTimeBasedOnInputEntry(setEndTime, activeEndDate),
    [updateTimeBasedOnInputEntry],
  );

  return (
    <div className={styles.mainCountdown}>
      <form className={styles.timeForm} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.startTimeInputContainer}>
          <button
            className={clsx(
              styles.nowLabelContainer,
              !startTime.refersToNow && styles.hidden,
            )}
            type="button"
            onClick={() =>
              setStartTime({ refersToNow: false, date: new Date() })
            }
          >
            <Calendar className={styles.calendarIcon} />
            <h4 className={styles.nowLabel}>Now</h4>
          </button>

          <DateTimePicker
            className={clsx(
              styles.dateTimePicker,
              startTime.refersToNow && styles.hidden,
            )}
            calendarIcon={<Calendar className={styles.calendarIcon} />}
            clearIcon={<XMark className={styles.XMark} />}
            showLeadingZeros
            value={startTime.refersToNow ? null : startTime.date}
            activeStartDate={startTime.refersToNow ? null : startTime.date}
            onChange={handleStartTimeChange}
            onActiveStartDateChange={handleActiveStartTimeChange}
          />
        </div>

        <div className={styles.middleIconsContainer}>
          <Arrow className={styles.arrowIcon} />
          <Hourglass className={styles.hourglass} />
        </div>

        <div className={styles.endTimeInputContainer}>
          <button
            className={clsx(
              styles.nowLabelContainer,
              !endTime.refersToNow && styles.hidden,
            )}
            type="button"
            onClick={() => setEndTime({ refersToNow: false, date: new Date() })}
          >
            <Calendar className={styles.calendarIcon} />
            <h4 className={styles.nowLabel}>Now</h4>
          </button>

          <DateTimePicker
            className={clsx(
              styles.dateTimePicker,
              endTime.refersToNow && styles.hidden,
            )}
            calendarIcon={<Calendar className={styles.calendarIcon} />}
            clearIcon={<XMark className={styles.XMark} />}
            showLeadingZeros
            value={endTime.refersToNow ? null : endTime.date}
            activeStartDate={endTime.refersToNow ? null : endTime.date}
            onChange={handleEndTimeChange}
            onActiveStartDateChange={handleActiveEndTimeChange}
          />
        </div>
      </form>

      <CountdownTimer startTime={startTime} endTime={endTime} />
    </div>
  );
};

export default MainCountdown;
