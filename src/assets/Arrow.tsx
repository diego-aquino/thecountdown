import React, { FC } from 'react';

import { HTMLSvgElementProps } from 'typings';

const Arrow: FC<HTMLSvgElementProps> = ({ ...rest }) => (
  <svg
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g clipPath="url(#clip0)">
      <path
        d="M1.42713 0L0 1.41L4.63563 6L0 10.59L1.42713 12L7.5 6L1.42713 0Z"
        fill="#1C5DC4"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="7.5" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Arrow;
