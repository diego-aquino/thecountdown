import { Time, DeltaTime } from 'typings';

export function calculateDeltaTime(startTime: Date, endTime: Date): DeltaTime {
  const deltaTimeInMilliseconds = Math.abs(
    endTime.getTime() - startTime.getTime(),
  );
  const deltaTimeInSeconds = Math.floor(deltaTimeInMilliseconds / 1000);

  const seconds = deltaTimeInSeconds % 60;
  const remainingMinutes = Math.floor(deltaTimeInSeconds / 60);
  const minutes = remainingMinutes % 60;
  const remainingHours = Math.floor(remainingMinutes / 60);
  const hours = remainingHours % 24;
  const remainingDays = Math.floor(remainingHours / 24);
  const days = remainingDays;

  const deltaTime: DeltaTime = { days, hours, minutes, seconds };

  return deltaTime;
}

export function isDeltaTimeFromPast(startTime: Time, endTime: Time): boolean {
  const startTimeWithDate = {
    refersToNow: startTime.refersToNow,
    date: startTime.refersToNow ? new Date() : startTime.date,
  };
  const endTimeWithDate = {
    refersToNow: endTime.refersToNow,
    date: endTime.refersToNow ? new Date() : endTime.date,
  };

  /* eslint-disable */
  const timeReferringNow = (
    (startTimeWithDate.refersToNow && startTimeWithDate)
    || (endTimeWithDate.refersToNow && endTimeWithDate)
    || null
  );
  const timeReferringStaticTime = (
    (!startTimeWithDate.refersToNow && startTimeWithDate)
    || (!endTimeWithDate.refersToNow && endTimeWithDate)
    || null
  );

  const isFromPast = Boolean(
    (timeReferringNow && timeReferringStaticTime)
    && timeReferringStaticTime.date < timeReferringNow.date
  );
  /* eslint-enable */

  return isFromPast;
}

export function getNumberOfDaysInMonth(month: number, year: number): number {
  const isLeapYear = year % 4 === 0;

  const numberOfDaysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return numberOfDaysInMonth[month];
}

interface RandomTimeInFutureOptions {
  dayVariation?: number;
  hoursVariation?: number;
  minutesVariation?: number;
}

export function getRandomTimeInFuture(
  options: RandomTimeInFutureOptions = {},
): Time {
  const placeholderDate = new Date();

  const currentDate = placeholderDate.getDate();
  const currentHours = placeholderDate.getHours();
  const currentMinutes = placeholderDate.getMinutes();

  const { minutesVariation = currentMinutes * 3 } = options;
  const { hoursVariation = currentHours + (minutesVariation % 24) } = options;
  const { dayVariation = currentDate * 10 + hoursVariation } = options;

  placeholderDate.setDate(currentDate + dayVariation);
  placeholderDate.setHours(currentHours + hoursVariation);
  placeholderDate.setMinutes(currentMinutes + minutesVariation);
  placeholderDate.setSeconds(0);

  const timeInFuture: Time = {
    refersToNow: false,
    date: placeholderDate,
  };

  return timeInFuture;
}
