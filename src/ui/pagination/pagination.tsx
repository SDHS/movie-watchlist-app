'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Pagination as NextUIPagination } from '@nextui-org/pagination';

export default function Pagination() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <NextUIPagination
      total={5}
      onChange={page => {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(page));
        router.replace(`${pathname}?${params.toString()}`);
      }}
    />
  );
}
