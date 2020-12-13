import React, { FC } from 'react';

import { HTMLSvgElementAccessibleProps } from 'typings';

const Calendar: FC<HTMLSvgElementAccessibleProps> = ({
  title,
  id,
  ...rest
}) => (
  <svg
    aria-labelledby={id}
    role="img"
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <title id={id}>{title}</title>
    <path
      d="M17.7083 12.5H12.5V17.7083H17.7083V12.5ZM16.6667 1.04167V3.12501H8.33333V1.04167H6.25V3.12501H5.20833C4.05208 3.12501 3.13542 4.06251 3.13542 5.20834L3.125 19.7917C3.125 20.9375 4.05208 21.875 5.20833 21.875H19.7917C20.9375 21.875 21.875 20.9375 21.875 19.7917V5.20834C21.875 4.06251 20.9375 3.12501 19.7917 3.12501H18.75V1.04167H16.6667ZM19.7917 19.7917H5.20833V8.33334H19.7917V19.7917Z"
      fill="url(#paint0_linear)"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="3.125"
        y1="11.4583"
        x2="21.875"
        y2="11.4583"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2094CA" />
        <stop offset="1" stopColor="#1C5DC4" />
      </linearGradient>
    </defs>
  </svg>
);

export default Calendar;
