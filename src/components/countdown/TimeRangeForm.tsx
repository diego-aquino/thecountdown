import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import clsx from 'clsx';

import { HTMLFormElementProps, NumberSign, Time } from 'typings';
import { Hourglass } from 'assets';
import { AnimatedArrow } from 'components/common';
import styles from 'styles/components/countdown/TimeRangeForm.module.css';
import {
  Layout,
  WidthBasedOnLayout,
  OnChangeTimeCallback,
  TimeCategory,
} from './types';
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

const animatedArrow = {
  animationDuration: 0.65,
  animationDelay: 0.1,
};

const IconsInBetween: FC<IconsInBetweenProps> = memo(
  ({ layout, shouldReverseArrow }) => {
    const [shouldAnimateHourglass, setShouldAnimateHourglass] = useState(false);

    useEffect(() => {
      setShouldAnimateHourglass(false);

      const delayToEnableHourglassAnimation =
        animatedArrow.animationDuration + animatedArrow.animationDelay;

      const timer = setTimeout(() => {
        setShouldAnimateHourglass(true);
      }, delayToEnableHourglassAnimation);

      return () => clearTimeout(timer);
    }, [shouldReverseArrow]);

    return (
      <div className={styles.iconsInBetween}>
        <AnimatedArrow
          className={styles.animatedArrow}
          finalWidth={arrowWidthFor[layout]}
          animationDuration={animatedArrow.animationDuration}
          animationDelay={animatedArrow.animationDelay}
          reversed={shouldReverseArrow}
        />
        <div className={styles.hourglassContainer}>
          <Hourglass
            className={clsx(
              styles.hourglass,
              shouldAnimateHourglass && styles.animated,
            )}
          />
        </div>
      </div>
    );
  },
);

interface TimeRangeFormProps extends HTMLFormElementProps {
  startTime: Time;
  endTime: Time;
  timeRangeSign?: NumberSign;
  onStartTimeChange?: OnChangeTimeCallback;
  onEndTimeChange?: OnChangeTimeCallback;
  onTimeInputBlur?: (timeCategory: TimeCategory, currentValue: Time) => void;
  layout: Layout;
}

const TimeRangeForm: FC<TimeRangeFormProps> = ({
  startTime,
  endTime,
  timeRangeSign,
  onStartTimeChange,
  onEndTimeChange,
  onTimeInputBlur,
  layout = 'horizontal',
  className,
  onSubmit = (e) => e.preventDefault(),
  ...rest
}) => {
  const shouldReverseArrow = useMemo(() => {
    if (timeRangeSign !== undefined) {
      return timeRangeSign === -1;
    }

    const startDate = startTime.refersToNow ? new Date() : startTime.date;
    const endDate = endTime.refersToNow ? new Date() : endTime.date;

    return startDate > endDate;
  }, [startTime, endTime, timeRangeSign]);

  const handleStartTimeInputBlur = useCallback(
    () => onTimeInputBlur?.('startTime', startTime),
    [startTime, onTimeInputBlur],
  );
  const handleEndTimeInputBlur = useCallback(
    () => onTimeInputBlur?.('endTime', endTime),
    [endTime, onTimeInputBlur],
  );

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
        onBlur={handleStartTimeInputBlur}
      />

      <IconsInBetween layout={layout} shouldReverseArrow={shouldReverseArrow} />

      <TimeInput
        className={styles.endTimeInput}
        id="endTimeInput"
        timeValue={endTime}
        onTimeChange={onEndTimeChange}
        onBlur={handleEndTimeInputBlur}
      />
    </form>
  );
};

export default TimeRangeForm;
