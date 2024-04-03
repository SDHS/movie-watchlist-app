import { type Props } from './types';

export default function MovieGrid({ children }: Props) {
  return (
    <div className="m-auto grid justify-center grid-cols-[repeat(auto-fit,_minmax(min(100%,_max(320px,_100%_/_5)),_320px))] gap-unit-lg">
      {children}
    </div>
  );
}
