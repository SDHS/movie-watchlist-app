'use client';

import { type Selection } from '@nextui-org/react';
import { X } from 'lucide-react';
import { useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Select, SelectItem } from '@nextui-org/select';
import { Tooltip } from '@nextui-org/tooltip';

import { CURRENT_YEAR, MIN_YEAR_SEARCH } from '@/constants/date';

const years: string[] = [];

for (let year = CURRENT_YEAR; year >= MIN_YEAR_SEARCH; year--) {
  years.push(String(year));
}

export default function YearSelect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const defaultValue = searchParams.get('primary_release_year') ?? '';

  const [value, setValue] = useState<Selection>(
    new Set(years.includes(defaultValue) ? [defaultValue] : []),
  );

  const isDisabled = !Boolean(searchParams.get('query')?.toString());

  const handleChange = (val: Selection | null) => {
    const params = new URLSearchParams(searchParams);
    setValue(val ?? new Set([]));

    if (val) {
      params.set('primary_release_year', String([Array(...val)]));
    } else {
      params.delete('primary_release_year');
    }
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  };

  const selectJsx = (
    <Select
      isDisabled={isDisabled}
      selectedKeys={value}
      aria-label="Select year..."
      selectionMode="single"
      placeholder="Select year..."
      className="w-[180px]"
      endContent={
        <div onClick={() => handleChange(null)} className="text-danger-500">
          <X className="hover:opacity-50" size={16} />
        </div>
      }
      items={years}
      onSelectionChange={handleChange}
    >
      {years.map(year => (
        <SelectItem value={year} key={year} textValue={String(year)}>
          {year}
        </SelectItem>
      ))}
    </Select>
  );

  return isDisabled ? (
    <Tooltip content="Only available while searching!">
      <div>{selectJsx}</div>
    </Tooltip>
  ) : (
    selectJsx
  );
}
