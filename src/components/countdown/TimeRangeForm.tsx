import React, { FC, memo, useMemo } from 'react';
import clsx from 'clsx';

import { HTMLFormElementProps, Time } from 'typings';
import { Hourglass } from 'assets';
import { AnimatedArrow } from 'components/common';
import styles from 'styles/components/countdown/TimeRangeForm.module.css';
import { Layout, WidthBasedOnLayout, OnChangeTimeCallback } from './types';
import TimeInput from './TimeInput';

const arrowWidthFor: WidthBasedOnLayout = {
  horizontal: 11.5,
  horizontalNarrow: 7.6,
  vertical: 5.5,
};

interface IconsInBetweenProps {
  layout: Layout;
  shouldReverseArrow: boolean;
}

const IconsInBetween: FC<IconsInBetweenProps> = memo(
  ({ layout, shouldReverseArrow }) => (
    <div className={styles.iconsInBetween}>
      <AnimatedArrow
        className={styles.animatedArrow}
        finalWidth={arrowWidthFor[layout]}
        animationDuration={0.65}
        animationDelay={0.1}
        reversed={shouldReverseArrow}
      />
      <Hourglass className={styles.hourglass} />
    </div>
  ),
);

interface TimeRangeFormProps extends HTMLFormElementProps {
  startTime: Time;
  endTime: Time;
  onStartTimeChange?: OnChangeTimeCallback;
  onEndTimeChange?: OnChangeTimeCallback;
  layout: Layout;
}

const TimeRangeForm: FC<TimeRangeFormProps> = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  layout = 'horizontal',
  className,
  onSubmit = (e) => e.preventDefault(),
  ...rest
}) => {
  const isStartTimeLaterThanEndTime = useMemo(() => {
    const startDate = startTime.refersToNow ? new Date() : startTime.date;
    const endDate = endTime.refersToNow ? new Date() : endTime.date;

    return startDate > endDate;
  }, [startTime, endTime]);

  return (
    <form
      className={clsx(styles.timeRangeForm, styles[layout], className)}
      onSubmit={onSubmit}
      {...rest}
    >
      <TimeInput
        className={styles.startTimeInput}
        id="startTimeInput"
        timeValue={startTime}
        onTimeChange={onStartTimeChange}
      />

      <IconsInBetween
        layout={layout}
        shouldReverseArrow={isStartTimeLaterThanEndTime}
      />

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
