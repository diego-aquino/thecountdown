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

  const timeReferringNow =
    (startTimeWithDate.refersToNow && startTimeWithDate) ||
    (endTimeWithDate.refersToNow && endTimeWithDate) ||
    null;
  const timeReferringStaticTime =
    (!startTimeWithDate.refersToNow && startTimeWithDate) ||
    (!endTimeWithDate.refersToNow && endTimeWithDate) ||
    null;

  const isFromPast = Boolean(
    timeReferringNow &&
      timeReferringStaticTime &&
      timeReferringStaticTime.date < timeReferringNow.date,
  );

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

interface FutureTimeOptions {
  dayVariation?: number;
  hoursVariation?: number;
}

const futureTimeMinutes = 23;
const futureTimeSeconds = 0;

export function getFutureTime(options: FutureTimeOptions = {}): Time {
  const now = new Date();

  const currentDate = now.getDate();
  const currentHours = now.getHours();

  const { dayVariation = 0, hoursVariation = 0 } = options;

  const futureDate = new Date();
  futureDate.setDate(currentDate + dayVariation);
  futureDate.setHours(currentHours + hoursVariation);
  futureDate.setMinutes(futureTimeMinutes);
  futureDate.setSeconds(futureTimeSeconds);

  const futureTime: Time = {
    refersToNow: false,
    date: futureDate,
  };

  return futureTime;
}
