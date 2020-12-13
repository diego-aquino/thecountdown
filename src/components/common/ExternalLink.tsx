import React, { FC } from 'react';

import { HTMLAnchorElementProps } from 'typings';

const ExternalLink: FC<HTMLAnchorElementProps> = ({
  href,
  children,
  ...rest
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
    {children}
  </a>
);

export default ExternalLink;
