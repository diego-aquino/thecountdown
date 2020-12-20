import { Time, DeltaTime } from 'typings';
import { retrieveFromLocalStorage, saveToLocalStorage } from './local';

export function isContinuousDeltaTime(startTime: Time, endTime: Time): boolean {
  const isContinuous =
    (startTime.refersToNow && !endTime.refersToNow) ||
    (!startTime.refersToNow && endTime.refersToNow);

  return isContinuous;
}

export function calculateDeltaTime(startTime: Time, endTime: Time): DeltaTime {
  const startTimeDate = startTime.refersToNow ? new Date() : startTime.date;
  const endTimeDate = endTime.refersToNow ? new Date() : endTime.date;

  const deltaTimeInMilliseconds = Math.abs(
    endTimeDate.getTime() - startTimeDate.getTime(),
  );

  const deltaTimeInSeconds = Math.floor(deltaTimeInMilliseconds / 1000);

  const seconds = deltaTimeInSeconds % 60;
  const remainingMinutes = Math.floor(deltaTimeInSeconds / 60);
  const minutes = remainingMinutes % 60;
  const remainingHours = Math.floor(remainingMinutes / 60);
  const hours = remainingHours % 24;
  const remainingDays = Math.floor(remainingHours / 24);
  const days = remainingDays;

  const isNegative = startTimeDate > endTimeDate;

  const deltaTime: DeltaTime = {
    days,
    hours,
    minutes,
    seconds,
    isNegative,
  };

  return deltaTime;
}

export function isDeltaTimeAgo(startTime: Time, endTime: Time): boolean {
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

type TimeEntryName = 'startTime' | 'endTime';
type JSONSafeTimeEntryValue =
  | { refersToNow: false; date: string }
  | { refersToNow: true };

export function getLastTimeEntryFor(entryName: TimeEntryName): Time | null {
  const valueFromLocalStorage = retrieveFromLocalStorage(entryName);
  if (!valueFromLocalStorage) {
    return null;
  }

  const parsedTimeEntry: JSONSafeTimeEntryValue = JSON.parse(
    valueFromLocalStorage,
  );

  const timeEntry: Time = parsedTimeEntry.refersToNow
    ? { refersToNow: true }
    : { refersToNow: false, date: new Date(parsedTimeEntry.date) };

  return timeEntry;
}

export function saveTimeEntryLocally(
  entryName: TimeEntryName,
  entryValue: Time,
): boolean {
  const safeEntryValue: JSONSafeTimeEntryValue = entryValue.refersToNow
    ? { refersToNow: true }
    : { refersToNow: false, date: entryValue.date.toISOString() };

  return saveToLocalStorage(entryName, JSON.stringify(safeEntryValue));
}
