import { Time, DeltaTime } from 'typings';

export function calculateDeltaTime(startTime: Date, endTime: Date): DeltaTime {
  const startTimeInMilliseconds = startTime.getTime();
  const endTimeInMilliseconds = endTime.getTime();

  const deltaTimeInMilliseconds = Math.abs(
    endTimeInMilliseconds - startTimeInMilliseconds,
  );
  const deltaTimeInSeconds = Math.floor(deltaTimeInMilliseconds / 1000);

  const seconds = deltaTimeInSeconds % 60;
  const remainingMinutes = Math.floor(deltaTimeInSeconds / 60);
  const minutes = remainingMinutes % 60;
  const remainingHours = Math.floor(remainingMinutes / 60);
  const hours = remainingHours % 24;
  const remainingDays = Math.floor(remainingHours / 24);
  const days = remainingDays;

  const isFromPast = startTimeInMilliseconds > endTimeInMilliseconds;

  const deltaTime: DeltaTime = { days, hours, minutes, seconds, isFromPast };

  return deltaTime;
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
