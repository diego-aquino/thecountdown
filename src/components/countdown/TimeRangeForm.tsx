import React, { FC, useMemo } from 'react';
import clsx from 'clsx';

import { HTMLFormElementProps, Time } from 'typings';
import { Hourglass } from 'assets';
import { AnimatedArrow } from 'components/common';
import { useScreenBreakpoint } from 'hooks';
import styles from 'styles/components/countdown/TimeRangeForm.module.css';
import TimeInput from './TimeInput';

type FormLayout = 'horizontal' | 'vertical';

type OnChangeTimeCallback = (newTime: Time) => void;

interface Props extends HTMLFormElementProps {
  startTime: Time;
  endTime: Time;
  onStartTimeChange?: OnChangeTimeCallback;
  onEndTimeChange?: OnChangeTimeCallback;
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
      <TimeInput
        className={styles.startTimeInput}
        id="startTimeInput"
        timeValue={startTime}
        onTimeChange={onStartTimeChange}
      />

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

      <TimeInput
        className={styles.endTimeInput}
        id="endTimeInput"
        timeValue={endTime}
        onTimeChange={onEndTimeChange}
      />
    </form>
  );
};

export default TimeRangeForm;
