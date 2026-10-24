import type { ReactNode } from 'react';

const classesByLayout = {
  'stack': 'stack',
  'stack-lg': 'stack stack--lg',
  'grid-2': 'grid grid--2',
  'grid-3': 'grid grid--3',
  'split': 'split',
  'split-main-aside': 'split split--main-aside',
};

export default function Group({ layout = 'stack', parts }: { layout?: keyof typeof classesByLayout; parts?: ReactNode }) {
  return <div className={classesByLayout[layout]}>{parts}</div>;
}
