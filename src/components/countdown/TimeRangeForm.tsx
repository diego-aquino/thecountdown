import React, { FC, useCallback, useMemo } from 'react';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import clsx from 'clsx';

import { HTMLFormElementProps, Time } from 'typings';
import { Calendar, Hourglass, XMark } from 'assets';
import { AnimatedArrow } from 'components/common';
import { useScreenBreakpoint } from 'hooks';
import styles from 'styles/components/countdown/TimeRangeForm.module.css';

interface ActiveStartDateChangeEvent {
  activeStartDate: Date;
}

type onChangeTimeCallback = (newStartTime: Time) => void;

type FormLayout = 'horizontal' | 'vertical';

interface Props extends HTMLFormElementProps {
  startTime: Time;
  endTime: Time;
  onStartTimeChange?: onChangeTimeCallback;
  onEndTimeChange?: onChangeTimeCallback;
  layoutBreakpoint?: number;
}

const TimeRangeForm: FC<Props> = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  layoutBreakpoint = 0,
  className,
  onSubmit = (e) => e.preventDefault(),
  ...rest
}) => {
  const layout = useScreenBreakpoint<FormLayout>(
    ['vertical', 'horizontal'],
    [layoutBreakpoint],
  );

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
    <form
      className={clsx(
        styles.timeRangeForm,
        layout === 'vertical' && styles.verticalLayout,
        className,
      )}
      onSubmit={onSubmit}
      {...rest}
    >
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
            <Calendar
              id="startTimeCalendarIcon"
              title="Calendar"
              className={styles.calendarIcon}
            />
            Now
          </h4>
          <XMark
            id="clearStartTimeNowLabel"
            title="Clear"
            className={styles.XMark}
          />
        </button>

        <DateTimePicker
          className={clsx(
            styles.dateTimePicker,
            startTime.refersToNow && styles.hidden,
          )}
          calendarIcon={
            <Calendar
              id="openStartTimeCalendar"
              title="Open calendar"
              className={styles.calendarIcon}
            />
          }
          clearIcon={
            <XMark
              id="clearStartTimeInputs"
              title="Clear"
              className={styles.XMark}
            />
          }
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
          finalWidth={layout === 'horizontal' ? 14 : 6}
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
            <Calendar
              id="endTimeCalendarIcon"
              title="Calendar"
              className={styles.calendarIcon}
            />
            Now
          </h4>
          <XMark
            id="clearEndTimeNowLabel"
            title="Clear"
            className={styles.XMark}
          />
        </button>

        <DateTimePicker
          className={clsx(
            styles.dateTimePicker,
            endTime.refersToNow && styles.hidden,
          )}
          calendarIcon={
            <Calendar
              id="openEndTimeCalendar"
              title="Open calendar"
              className={styles.calendarIcon}
            />
          }
          clearIcon={
            <XMark
              id="clearEndTimeInputs"
              title="Clear"
              className={styles.XMark}
            />
          }
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
