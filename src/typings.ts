import React from 'react';

export interface StaticTime {
  refersToNow: false;
  date: Date;
}

export interface InstantTime {
  refersToNow: true;
}

export type Time = StaticTime | InstantTime;

export interface DeltaTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export type HTMLSvgElementProps = React.SVGProps<SVGSVGElement>;

export type HTMLDivElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type HTMLAnchorElementProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export type HTMLImageElementProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export type HTMLFormElementProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;
