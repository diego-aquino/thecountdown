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
import { isContinuousDeltaTime } from 'utils/date';
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

const animatedArrow = {
  animationDuration: 0.65,
  animationDelay: 0.1,
};

interface IconsInBetweenProps {
  layout: Layout;
  shouldReverseArrow: boolean;
  shouldAnimateHourglass: boolean;
}

const IconsInBetween: FC<IconsInBetweenProps> = memo(
  ({ layout, shouldReverseArrow, shouldAnimateHourglass }) => {
    const [isHourglassAnimated, setIsHourglassAnimated] = useState(false);

    useEffect(() => {
      setIsHourglassAnimated(false);

      if (!shouldAnimateHourglass) return;

      const delayToEnableHourglassAnimation =
        animatedArrow.animationDuration + animatedArrow.animationDelay;

      const timer = setTimeout(() => {
        setIsHourglassAnimated(true);
      }, delayToEnableHourglassAnimation);

      return () => clearTimeout(timer); // eslint-disable-line consistent-return
    }, [shouldReverseArrow, shouldAnimateHourglass]);

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
              isHourglassAnimated && styles.animated,
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

  const shouldAnimateHourglass = useMemo(
    () => isContinuousDeltaTime(startTime, endTime),
    [startTime, endTime],
  );

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

      <IconsInBetween
        layout={layout}
        shouldReverseArrow={shouldReverseArrow}
        shouldAnimateHourglass={shouldAnimateHourglass}
      />

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
