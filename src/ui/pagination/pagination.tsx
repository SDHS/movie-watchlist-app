'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Pagination as NextUIPagination } from '@nextui-org/pagination';
import { type Props } from './types';

export default function Pagination({ total, initialPage }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <NextUIPagination
      total={total}
      onChange={page => {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(page));
        router.replace(`${pathname}?${params.toString()}`);
      }}
      initialPage={initialPage}
      showControls
    />
  );
}
