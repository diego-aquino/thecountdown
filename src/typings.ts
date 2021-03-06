import {
  AnchorHTMLAttributes,
  FormHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  SVGAttributes,
} from 'react';

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
  isNegative: boolean;
}

export type NumberSign = -1 | 1;

export type HTMLSvgElementProps = SVGAttributes<SVGElement>;

export interface HTMLSvgElementAccessibleProps extends HTMLSvgElementProps {
  title: string;
  id: string;
}

export type HTMLDivElementProps = HTMLAttributes<HTMLDivElement>;

export type HTMLAnchorElementProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export type HTMLImageElementProps = ImgHTMLAttributes<HTMLImageElement>;

export type HTMLFormElementProps = FormHTMLAttributes<HTMLFormElement>;
