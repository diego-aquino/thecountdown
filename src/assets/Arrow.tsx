import React, { FC } from 'react';

import { HTMLSvgElementProps } from 'typings';

const Arrow: FC<HTMLSvgElementProps> = ({ ...rest }) => (
  <svg
    width="133"
    height="12"
    viewBox="0 0 133 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <rect y="5" width="130" height="2" fill="url(#paint0_linear)" />
    <g clipPath="url(#clip0)">
      <path
        d="M126.427 0L125 1.41L129.636 6L125 10.59L126.427 12L132.5 6L126.427 0Z"
        fill="#1C5DC4"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="9.68576e-07"
        y1="6"
        x2="130"
        y2="6.00005"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2094CA" />
        <stop offset="1" stopColor="#1C5DC4" />
      </linearGradient>
      <clipPath id="clip0">
        <rect width="7.5" height="12" fill="white" transform="translate(125)" />
      </clipPath>
    </defs>
  </svg>
);

export default Arrow;
