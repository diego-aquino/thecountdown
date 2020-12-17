import React, { FC } from 'react';
import { HTMLSvgElementProps } from 'typings';

const Hourglass: FC<HTMLSvgElementProps> = ({ ...rest }) => (
  <svg
    width="17"
    height="20"
    viewBox="0 0 17 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g clipPath="url(#C)">
      <path
        d="M15.64 18h-.24c-.3 0-.56 0-.6-.34-.65-6.38-4.65-6.5-4.65-8s4-1.62 4.7-8c0-.3.3-.34.6-.34a.68.68 0 0 0 .65-.66.66.66 0 0 0-.179-.483.66.66 0 0 0-.471-.207H.68A.69.69 0 0 0 0 .66a.67.67 0 0 0 .186.483.67.67 0 0 0 .474.207h.26c.3 0 .56 0 .6.34.7 6.37 4.7 6.5 4.7 8s-4 1.62-4.7 8c0 .3-.3.34-.6.34H.68a.69.69 0 0 0-.68.63.67.67 0 0 0 .186.483.67.67 0 0 0 .474.207h15a.66.66 0 0 0 .478-.204.66.66 0 0 0 .182-.486.69.69 0 0 0-.68-.66zM3.8 16.4c1.35-3.74 3.74-3.3 3.74-4.74V9.03c0-.9-2.27-1.12-3.35-2.6C4.02 6.2 2.02.94 2.33.94h11.54c.3 0-1.37 5.2-1.54 5.45-1.06 1.5-3.56 1.73-3.56 2.64v2.63c0 1.46 2.3 1.06 3.74 4.76.14.33 0 .75-.32.75H4.16c-.38-.02-.47-.43-.35-.77z"
        fill="url(#A)"
      />
      <path
        d="M7.55 10.66v-2.6C7.55 6.6 5.25 7 3.8 3.3c-.13-.34 0-.75.32-.75h8.03c.36 0 .45.4.33.75-1.33 3.78-3.7 3.36-3.7 4.8v2.56l1.38-1c0-1.5 3.8-1.62 4.48-8 0-.3.3-.34.6-.34h.24a.68.68 0 0 0 .62-.66.66.66 0 0 0-.179-.483.66.66 0 0 0-.471-.207H.66a.65.65 0 0 0-.481.201A.65.65 0 0 0 0 .66a.69.69 0 0 0 .68.63c.3 0 .57 0 .6.34.68 6.37 4.9 6.5 4.9 8l1.36 1.03z"
        fill="url(#B)"
      />
    </g>
    <defs>
      <linearGradient
        id="A"
        x1="0"
        y1="9.66"
        x2="16.321"
        y2="9.66"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2094ca" />
        <stop offset="1" stopColor="#1c5dc4" />
      </linearGradient>
      <linearGradient
        id="B"
        x1="-.001"
        y1="5.315"
        x2="16.101"
        y2="5.315"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2094ca" />
        <stop offset="1" stopColor="#1c5dc4" />
      </linearGradient>
      <clipPath id="C">
        <path fill="#fff" d="M0 0h16.3v19.3H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Hourglass;
