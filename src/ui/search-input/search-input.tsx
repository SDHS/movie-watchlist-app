'use client';

import { SearchIcon } from 'lucide-react';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { Input } from '@nextui-org/input';
import { useDebouncedCallback } from 'use-debounce';

import { DEBOUNCE_DURATION_MS } from '@/constants/debounce';

import { Props } from './types';

export default function SearchInput({
  queryKey = 'query',
  placeholder = 'Search movies...',
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set(queryKey, search);
      params.set('page', '1');
    } else {
      params.delete(queryKey);
      params.delete('page');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, DEBOUNCE_DURATION_MS);

  return (
    <Input
      placeholder={placeholder}
      defaultValue={searchParams.get(queryKey)?.toString()}
      onChange={e => handleSearch(e.target.value)}
      onClear={() => handleSearch('')}
      startContent={<SearchIcon />}
      variant="bordered"
      autoFocus
      className="rounded-large bg-default-50"
    />
  );
}
