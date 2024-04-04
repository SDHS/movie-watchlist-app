import { Input as NextUiInput } from '@nextui-org/input';

import type { Props } from './types';

export default function Input(props: Props) {
  return (
    <NextUiInput
      {...props}
      className={`rounded-large bg-default-50 ${props.className ?? ''}`}
    />
  );
}
