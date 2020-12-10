import React, { FC, useCallback } from 'react';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import clsx from 'clsx';

import { Time } from 'typings';
import { Arrow, Calendar, Hourglass, XMark } from 'assets';
import styles from 'styles/components/countdown/TimeRangeForm.module.css';

interface ActiveStartDateChangeEvent {
  activeStartDate: Date;
}

type onChangeTimeCallback = (newStartTime: Time) => void;

interface Props {
  startTime: Time;
  endTime: Time;
  onStartTimeChange?: onChangeTimeCallback;
  onEndTimeChange?: onChangeTimeCallback;
}

const TimeRangeForm: FC<Props> = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}) => {
  const handleDateChange = useCallback(
    (onChange: onChangeTimeCallback, newDate: Date | null) => {
      const newTime: Time = newDate
        ? { refersToNow: false, date: newDate }
        : { refersToNow: true };

      onChange(newTime);
    },
    [],
  );

  const handleStartDateChange = useCallback(
    (newStartDate: Date | null) => {
      if (onStartTimeChange) {
        handleDateChange(onStartTimeChange, newStartDate);
      }
    },
    [handleDateChange, onStartTimeChange],
  );

  const handleEndDateChange = useCallback(
    (newEndDate: Date | null) => {
      if (onEndTimeChange) {
        handleDateChange(onEndTimeChange, newEndDate);
      }
    },
    [handleDateChange, onEndTimeChange],
  );

  return (
    <form className={styles.timeRangeForm} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.startTimeInputContainer}>
        <button
          className={clsx(
            styles.nowLabelContainer,
            !startTime.refersToNow && styles.hidden,
          )}
          type="button"
          onClick={() => handleStartDateChange(new Date())}
        >
          <Calendar className={styles.calendarIcon} />
          Now
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
          onChange={handleStartDateChange}
          onActiveStartDateChange={(
            { activeStartDate }: ActiveStartDateChangeEvent, // eslint-disable prettier/prettier
          ) => handleStartDateChange(activeStartDate)}
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
          onClick={() => handleEndDateChange(new Date())}
        >
          <Calendar className={styles.calendarIcon} />
          Now
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
          onChange={handleEndDateChange}
          onActiveStartDateChange={(
            { activeStartDate }: ActiveStartDateChangeEvent, // eslint-disable prettier/prettier
          ) => handleEndDateChange(activeStartDate)}
        />
      </div>
    </form>
  );
};

export default TimeRangeForm;
