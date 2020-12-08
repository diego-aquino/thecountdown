import React, { FC } from 'react';
import { HTMLImageElementProps } from 'typings';

const Hourglass: FC<HTMLImageElementProps> = ({ className }) => (
  // Temporary workaround... Replace it later by an inline SVG.
  <img className={className} src="/hourglass.svg" alt="" />
);

export default Hourglass;
