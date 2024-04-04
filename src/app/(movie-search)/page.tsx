import MovieCard from '@/ui/movie-card';
import MovieGrid from '@/ui/movie-grid';
import Pagination from '@/ui/pagination';

import { fetchPopularMovies, searchMovies } from '@/api/tmdb/api';

import { MAX_PAGE_ALLOWED } from '@/constants/tmdb';

import { type FetchListResponse } from '@/types/api/tmdb/fetch-list';

import MovieSearchInput from './components/movie-search-input';
import YearSelect from './components/year-select';
import { mapApiToProps, queryParamsSchema } from './utils';

type Props = {
  searchParams: {
    query?: string;
    page?: string;
    primary_release_year?: string;
  };
};

export default async function MovieSearch({ searchParams }: Props) {
  const queryParams = queryParamsSchema.parse(searchParams);
  const shouldDisplayPopularMovies = Boolean(!queryParams.query.length);
  const response: FetchListResponse = (shouldDisplayPopularMovies
    ? await fetchPopularMovies({
        page: String(queryParams.page),
      })
    : await searchMovies({
        query: queryParams.query,
        page: String(queryParams.page),
        ...(queryParams.primary_release_year !== -1 && {
          primary_release_year: String(queryParams.primary_release_year),
        }),
      })) ?? {
    results: [],
    total_pages: 0,
    page: 0,
    total_results: 0,
  };

  const movies = mapApiToProps(response.results);

  return (
    <main>
      <div className="m-auto mb-unit-xl w-full flex justify-center gap-unit-xl">
        <MovieSearchInput key={queryParams.query} />
        <YearSelect key={queryParams.primary_release_year} />
      </div>
      <h1 className="mb-unit-xl text-3xl">
        {shouldDisplayPopularMovies
          ? 'Popular movies'
          : `Searching for ${queryParams.query}...`}
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
          key={queryParams.page}
          total={Math.min(response?.total_pages, MAX_PAGE_ALLOWED)}
          initialPage={queryParams.page}
        />
      </div>
    </main>
  );
}
