import { type Props } from './types';

export default function MovieGrid({ children }: Props) {
  return (
    <div className="m-auto grid grid-cols-[repeat(auto-fit,_minmax(min(100%,_max(320px,_100%_/_5)),_1fr))] gap-unit-lg">
      {children}
    </div>
  );
}
