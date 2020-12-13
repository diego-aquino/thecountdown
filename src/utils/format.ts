interface FormatOptions {
  minLength?: number;
  fillWith?: string;
  fillDirection?: 'left' | 'center' | 'right';
}

export function toFormattedString(
  number: unknown,
  options?: FormatOptions,
): string {
  const numberAsString = String(number);

  const {
    minLength = numberAsString.length,
    fillWith = ' ',
    fillDirection = 'left',
  } = options || {};

  const remainingLength = Math.max(minLength - numberAsString.length, 0);

  const numberOfFillRepetitions = { left: 0, right: 0 };
  if (fillDirection === 'center') {
    numberOfFillRepetitions.left = Math.ceil(remainingLength / 2);
    numberOfFillRepetitions.right = Math.floor(remainingLength / 2);
  } else {
    numberOfFillRepetitions[fillDirection] = remainingLength;
  }

  const formattedNumber =
    fillWith.repeat(numberOfFillRepetitions.left) +
    numberAsString +
    fillWith.repeat(numberOfFillRepetitions.right);

  return formattedNumber;
}

export function numberToFormattedString(number: number, minLength = 0): string {
  return toFormattedString(number, { minLength, fillWith: '0' });
}
