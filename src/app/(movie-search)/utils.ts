import { z } from 'zod';

import { CURRENT_YEAR, MIN_YEAR_SEARCH } from '@/constants/date';
import { MAX_PAGE_ALLOWED } from '@/constants/tmdb';

import type { FetchListResponse } from '@/types/api/tmdb/fetch-list';

export const mapApiToProps = (results: FetchListResponse['results']) =>
  results.map(movie => ({
    id: movie.id,
    href: `/${movie.id}`,
    imageSrc: movie.poster_path,
    name: movie.original_title,
    releaseDate: new Date(movie.release_date),
  })) ?? [];

export const queryParamsSchema = z.object({
  query: z.string().catch(''),
  page: z.coerce.number().lte(MAX_PAGE_ALLOWED).catch(1),
  primary_release_year: z.coerce
    .number()
    .lte(CURRENT_YEAR)
    .gte(MIN_YEAR_SEARCH)
    .catch(-1),
});

export type QueryParams = z.infer<typeof queryParamsSchema>;
