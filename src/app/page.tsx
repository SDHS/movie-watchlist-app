import { z } from 'zod';

import MovieCard from '@/ui/movie-card';
import MovieGrid from '@/ui/movie-grid';
import Pagination from '@/ui/pagination';
import SearchInput from '@/ui/search-input';

import { fetchPopularMovies, searchMovies } from '@/api/tmdb/api';

import { MAX_PAGE_ALLOWED } from '@/constants/tmdb';

import { type FetchListResponse } from '@/types/api/tmdb/fetch-list';

type Props = {
  searchParams: {
    query?: string;
    page?: string;
  };
};

const queryParamsSchema = z.object({
  query: z.string().catch(''),
  page: z.coerce.number().lte(MAX_PAGE_ALLOWED).catch(1),
});

const mapApiToProps = (results: FetchListResponse['results']) =>
  results.map(movie => ({
    id: movie.id,
    href: `/${movie.id}`,
    imageSrc: movie.poster_path,
    name: movie.original_title,
    releaseDate: new Date(movie.release_date),
  })) ?? [];

export default async function MovieSearch({ searchParams }: Props) {
  const { page, query } = queryParamsSchema.parse(searchParams);
  const shouldDisplayPopularMovies = Boolean(!query.length);
  const response: FetchListResponse = (shouldDisplayPopularMovies
    ? await fetchPopularMovies({
        page: String(page),
      })
    : await searchMovies({ query, page: String(page) })) ?? {
    results: [],
    total_pages: 0,
    page: 0,
    total_results: 0,
  };

  const movies = mapApiToProps(response.results);

  return (
    <main>
      <div className="m-auto mb-unit-xl w-3/4">
        <SearchInput key={query} />
      </div>
      <h1 className="mb-unit-xl text-3xl">
        {shouldDisplayPopularMovies
          ? 'Popular movies'
          : `Searching for ${query}...`}
      </h1>
      <MovieGrid>
        {movies.map(({ href, id, imageSrc, name, releaseDate }) => (
          <MovieCard
            href={href}
            posterPath={imageSrc}
            name={name}
            releaseDate={releaseDate}
            key={id}
          />
        ))}
      </MovieGrid>
      <div className="mt-unit-md">
        <Pagination
          key={page}
          total={Math.min(response?.total_pages, MAX_PAGE_ALLOWED)}
          initialPage={page}
        />
      </div>
    </main>
  );
}
