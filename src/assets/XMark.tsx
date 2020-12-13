import React, { FC } from 'react';

import { HTMLSvgElementAccessibleProps } from 'typings';

const XMark: FC<HTMLSvgElementAccessibleProps> = ({ title, id, ...rest }) => (
  <svg
    aria-labelledby={id}
    role="img"
    width="24"
    height="24"
    viewBox="0 0 83 83"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <title id={id}>{title}</title>
    <path
      d="M83 8.35928L74.6407 0L41.5 33.1407L8.35928 0L0 8.35928L33.1407 41.5L0 74.6407L8.35928 83L41.5 49.8593L74.6407 83L83 74.6407L49.8593 41.5L83 8.35928Z"
      fill="url(#paint0_linear)"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="6.18398e-07"
        y1="41.5"
        x2="83"
        y2="41.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2094CA" />
        <stop offset="1" stopColor="#1C5DC4" />
      </linearGradient>
    </defs>
  </svg>
);

export default XMark;
