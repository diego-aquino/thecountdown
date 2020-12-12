import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import clsx from 'clsx';

import { HTMLAnchorElementProps } from 'typings';
import styles from 'styles/components/common/InlineLink.module.css';

type Props = HTMLAnchorElementProps;
type Ref = HTMLAnchorElement | null;

const InlineLink: ForwardRefRenderFunction<Ref, Props> = (
  { className, children, ...rest },
  ref,
) => (
  <a ref={ref} className={clsx(styles.inlineLink, className)} {...rest}>
    {children}
  </a>
);

export default forwardRef(InlineLink);
