import React, { FC, useCallback, useMemo } from 'react';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import clsx from 'clsx';

import { Time } from 'typings';
import { Calendar, Hourglass, XMark } from 'assets';
import { AnimatedArrow } from 'components/common';
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

  const isStartTimeLaterThanEndTime = useMemo(() => {
    const startDate = startTime.refersToNow ? new Date() : startTime.date;
    const endDate = endTime.refersToNow ? new Date() : endTime.date;

    return startDate > endDate;
  }, [startTime, endTime]);

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
          <h4 className={styles.nowLabel}>
            <Calendar className={styles.calendarIcon} />
            Now
          </h4>
          <XMark className={styles.XMark} />
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
        <AnimatedArrow
          className={styles.animatedArrow}
          initialWidth={2}
          finalWidth={14}
          animationDuration={0.65}
          animationDelay={0.1}
          reversed={isStartTimeLaterThanEndTime}
        />
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
          <h4 className={styles.nowLabel}>
            <Calendar className={styles.calendarIcon} />
            Now
          </h4>
          <XMark className={styles.XMark} />
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
