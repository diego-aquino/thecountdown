import React, { FC } from 'react';

const Logo: FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="20"
      cy="20"
      r="19"
      fill="url(#paint0_linear)"
      stroke="url(#paint1_linear)"
      strokeWidth="2"
    />
    <path
      d="M23.5932 19.7368C25.8707 19.0227 27.7123 17.0686 28.4014 14.6372L28.6811 13.6504L29.5909 13.8956L30.1502 11.922L29.2404 11.6769L16.5033 8.24513L15.5935 8L15.0342 9.97353L15.944 10.2187L15.6643 11.2054C14.9752 13.6368 15.5263 16.2356 17.1046 17.9885C17.3685 18.2805 17.4671 18.665 17.3678 19.0153L17.3236 19.1713C17.2246 19.5206 16.9378 19.8002 16.557 19.9206C14.2795 20.6346 12.4379 22.5888 11.7488 25.0202L11.4692 26.0069L10.5594 25.7618L10 27.7353L10.9098 27.9805L23.6469 31.4122L24.5567 31.6574L25.1161 29.6838L24.2063 29.4387L24.4859 28.4519C25.1751 26.0205 24.6239 23.4217 23.0463 21.6701C22.782 21.3758 22.6834 20.9913 22.7824 20.642L22.8266 20.4861C22.9259 20.1358 23.213 19.8552 23.5932 19.7368Z"
      fill="url(#paint2_linear)"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="2.98023e-07"
        y1="20"
        x2="40"
        y2="20"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2094CA" />
        <stop offset="1" stopColor="#1C5DC4" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="4.80578"
        y1="20.3266"
        x2="33.4008"
        y2="19.2065"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#C3CFD9" />
      </linearGradient>
      <linearGradient
        id="paint2_linear"
        x1="14.5"
        y1="18.5"
        x2="24.9639"
        y2="21.1428"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#C3CFD9" />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
