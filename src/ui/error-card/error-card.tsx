import { ShieldX } from 'lucide-react';

import type { Props } from './types';

export default function ErrorCard({
  content = 'An error occurred, please try again later!',
}: Props) {
  return (
    <div className=" flex flex-col items-center justify-center gap-unit-lg bg-transparent text-danger-500">
      <ShieldX size="100" />
      <h1 className="text-large font-semibold">{content}</h1>
    </div>
  );
}
