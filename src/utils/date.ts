import { Time, DeltaTime } from 'typings';
import { randomInt } from 'utils/random';

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
  baseYear: number;
  yearVariation?: number;
}

export function getRandomTimeInFuture(
  options?: RandomTimeInFutureOptions,
): Time {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  const { baseYear = currentYear, yearVariation = 1 } = options || {};

  const timeInFuture: Time = {
    refersToNow: false,
    year: randomInt(baseYear, baseYear + yearVariation + 1),
    month: 0,
    day: 1,
    hours: randomInt(0, 24),
    minutes: randomInt(0, 60),
  };

  if (timeInFuture.year === currentYear) {
    timeInFuture.month = randomInt(currentMonth, 12);
  } else {
    timeInFuture.month = randomInt(0, 12);
  }

  const numberOfDaysInMonth = getNumberOfDaysInMonth(
    timeInFuture.month,
    timeInFuture.year as number,
  );

  if (timeInFuture.month === currentMonth) {
    timeInFuture.day = randomInt(currentDay, numberOfDaysInMonth + 1);
  } else {
    timeInFuture.day = randomInt(0, numberOfDaysInMonth + 1);
  }

  return timeInFuture;
}
