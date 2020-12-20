import React, { FC, memo, useCallback } from 'react';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import clsx from 'clsx';

import { HTMLDivElementProps, Time } from 'typings';
import { Calendar, XMark } from 'assets';
import styles from 'styles/components/countdown/TimeInput.module.css';

interface ActiveStartDateChangeEvent {
  activeStartDate: Date;
}

interface Props extends HTMLDivElementProps {
  id: string;
  timeValue: Time;
  onTimeChange?: (newValue: Time) => void;
}

const TimeInput: FC<Props> = ({
  id,
  timeValue,
  onTimeChange,
  className,
  ...rest
}) => {
  const handleDateChange = useCallback(
    (newDate: Date | null) => {
      if (!onTimeChange) {
        return;
      }

      const newTime: Time = newDate
        ? { refersToNow: false, date: newDate }
        : { refersToNow: true };

      onTimeChange(newTime);
    },
    [onTimeChange],
  );

  const resetDateToNowAsStaticDate = useCallback(() => {
    const nowAsStaticDate = new Date();
    nowAsStaticDate.setSeconds(0);
    nowAsStaticDate.setMilliseconds(0);

    handleDateChange(nowAsStaticDate);
  }, [handleDateChange]);

  return (
    <div className={clsx(styles.timeInput, className)} {...rest}>
      <button
        className={clsx(
          styles.nowLabelContainer,
          !timeValue.refersToNow && styles.hidden,
        )}
        type="button"
        onClick={resetDateToNowAsStaticDate}
      >
        <h4 className={styles.nowLabel}>
          <Calendar
            id={`${id}TimeCalendarIcon`}
            title="Calendar"
            className={styles.calendarIcon}
          />
          Now
        </h4>
        <XMark
          id={`${id}ClearNowLabel`}
          title="Clear"
          className={styles.XMark}
        />
      </button>

      <DateTimePicker
        className={clsx(
          styles.dateTimePicker,
          timeValue.refersToNow && styles.hidden,
        )}
        calendarIcon={
          <Calendar
            id={`${id}OpenCalendar`}
            title="Open calendar"
            className={styles.calendarIcon}
          />
        }
        clearIcon={
          <XMark
            id={`${id}ClearInputs`}
            title="Clear"
            className={styles.XMark}
          />
        }
        showLeadingZeros
        value={timeValue.refersToNow ? null : timeValue.date}
        activeStartDate={timeValue.refersToNow ? null : timeValue.date}
        onChange={handleDateChange}
        onActiveStartDateChange={(
          { activeStartDate }: ActiveStartDateChangeEvent, // eslint-disable prettier/prettier
        ) => handleDateChange(activeStartDate)}
      />
    </div>
  );
};

export default memo(TimeInput);
