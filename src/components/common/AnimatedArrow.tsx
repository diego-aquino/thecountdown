import React, { FC, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';

import { HTMLDivElementProps } from 'typings';
import { Arrow } from 'assets';
import styles from 'styles/components/common/AnimatedArrow.module.css';

const ARROW_HEAD_WIDTH_AT_SCALE_1 = 0.8;
const ARROW_HEAD_HEIGHT_AT_SCALE_1 = 1.2;
const ARROW_HEAD_STROKE_WIDTH_AT_SCALE_1 = 0.2;
const ARROW_HEAD_SIDE_MARGIN_FACTOR = -0.625;

interface Props extends HTMLDivElementProps {
  initialWidth?: number;
  finalWidth: number;
  scale?: number;
  animationDuration: number;
  animationDelay?: number;
  reversed?: boolean;
}

const AnimatedArrow: FC<Props> = ({
  initialWidth,
  finalWidth,
  scale = 1,
  animationDuration,
  animationDelay = 0,
  reversed = false,
  className,
  ...rest
}) => {
  const [
    arrowHeadWidth,
    arrowHeadHeight,
    arrowHeadStrokeWidth,
  ] = useMemo(
    () => [
      ARROW_HEAD_WIDTH_AT_SCALE_1 * scale,
      ARROW_HEAD_HEIGHT_AT_SCALE_1 * scale,
      ARROW_HEAD_STROKE_WIDTH_AT_SCALE_1 * scale,
    ],
    [scale],
  );

  const arrowHeadSideMargin = useMemo(
    () => arrowHeadWidth * ARROW_HEAD_SIDE_MARGIN_FACTOR,
    [arrowHeadWidth],
  );

  const realInitialWidth = useMemo(
    () => initialWidth ?? arrowHeadWidth + arrowHeadSideMargin,
    [initialWidth, arrowHeadWidth, arrowHeadSideMargin],
  );

  const initialBodyWidth = useMemo(
    () => Math.max(realInitialWidth - arrowHeadWidth - arrowHeadSideMargin, 0),
    [realInitialWidth, arrowHeadWidth, arrowHeadSideMargin],
  );
  const finalBodyWidth = useMemo(
    () => finalWidth - arrowHeadWidth - arrowHeadSideMargin,
    [finalWidth, arrowHeadWidth, arrowHeadSideMargin],
  );

  const arrowBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const arrowBody = arrowBodyRef.current;

    if (arrowBody) {
      const previousTransitionStyles = window
        .getComputedStyle(arrowBody)
        .getPropertyValue('transition');

      arrowBody.style.transition = '';
      arrowBody.style.width = `${initialBodyWidth}rem`;

      requestAnimationFrame(() => {
        arrowBody.style.transition = previousTransitionStyles;
        arrowBody.style.width = `${finalBodyWidth}rem`;
      });
    }
  }, [
    animationDuration,
    animationDelay,
    reversed,
    initialBodyWidth,
    finalBodyWidth,
  ]);

  return (
    <div
      className={clsx(styles.animatedArrow, className)}
      style={{
        width: `${finalWidth}rem`,
        flexDirection: reversed ? 'row-reverse' : 'row',
      }}
      {...rest}
    >
      <div
        ref={arrowBodyRef}
        className={styles.arrowBody}
        style={{
          width: `${initialBodyWidth}rem`,
          height: `${arrowHeadStrokeWidth}rem`,
          transform: reversed ? 'rotate(180deg)' : '',
          transitionDuration: `${animationDuration}s`,
          transitionDelay: `${animationDelay}s`,
          transitionTimingFunction: 'cubic-bezier(.2,1.07,.81,.99)',
        }}
      />
      <Arrow
        style={{
          width: `${arrowHeadWidth}rem`,
          height: `${arrowHeadHeight}rem`,
          [reversed
            ? 'marginRight'
            : 'marginLeft']: `${arrowHeadSideMargin}rem`,
          transform: reversed ? 'rotate(180deg)' : '',
        }}
      />
    </div>
  );
};

export default AnimatedArrow;
