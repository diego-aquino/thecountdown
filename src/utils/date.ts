import { Time, DeltaTime } from 'typings';

export function getDateObjectFrom(time: Time): Date {
  if (time.refersToNow) {
    return new Date();
  }

  const { year, month, day = 1, hours = 0, minutes = 0 } = time;

  return new Date(year, month, day, hours, minutes);
}

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
