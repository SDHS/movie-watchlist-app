'use client';

import { SearchIcon } from 'lucide-react';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { useDebouncedCallback } from 'use-debounce';

import Input from '@/ui/input';

import { DEBOUNCE_DURATION_MS } from '@/constants/debounce';

export default function MovieSearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set('query', search);
    } else {
      params.delete('query');
    }
    params.delete('primary_release_year');
    params.set('page', '1');

    router.replace(`${pathname}?${params.toString()}`);
  }, DEBOUNCE_DURATION_MS);

  return (
    <Input
      placeholder="Search movies..."
      defaultValue={searchParams.get('query')?.toString() ?? ''}
      onChange={e => handleSearch(e.target.value)}
      onClear={() => handleSearch('')}
      startContent={<SearchIcon />}
      aria-label="Search movies..."
      variant="bordered"
      autoFocus
      className="max-w-unit-9xl"
    />
  );
}
