import { Time } from 'typings';

export type TimeCategory = 'startTime' | 'endTime';

export type Layout = 'horizontal' | 'horizontalNarrow' | 'vertical';

export type WidthBasedOnLayout = {
  [key in Layout]: number;
};

export type OnChangeTimeCallback = (newTime: Time) => void;
