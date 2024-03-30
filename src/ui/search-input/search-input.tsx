'use client';

import { Input } from '@nextui-org/input';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Props } from './types';
import { useDebouncedCallback } from 'use-debounce';
import { SearchIcon } from 'lucide-react';

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
    } else {
      params.delete(queryKey);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <Input
      placeholder={placeholder}
      defaultValue={searchParams.get(queryKey)?.toString()}
      onChange={e => handleSearch(e.target.value)}
      onClear={() => handleSearch('')}
      startContent={<SearchIcon />}
      variant="bordered"
      className="rounded-large bg-white"
    />
  );
}
