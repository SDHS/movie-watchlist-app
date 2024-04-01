import MovieCard, { type Props as MovieCardProps } from '@/ui/movie-card';
import { z } from 'zod';
import { type SearchResponse } from '@/types/api/tmdb/search';
import SearchInput from '@/ui/search-input';
import Pagination from '@/ui/pagination';

const MAX_PAGE_ALLOWED = 500;

const options: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

type Props = {
  searchParams: {
    search?: string;
    page?: string;
  };
};

const queryParamsSchema = z.object({
  query: z.string().catch(''),
  page: z.coerce.number().lte(MAX_PAGE_ALLOWED).catch(1),
});

const mapApiToProps: (
  results: SearchResponse['results'],
) => MovieCardProps[] = (results: SearchResponse['results']) =>
  results.map(movie => ({
    href: `/${movie.id}`,
    imageSrc: movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : null,
    name: movie.original_title,
    releaseDate: new Date(movie.release_date),
  })) ?? [];

export default async function MovieSearch({ searchParams }: Props) {
  const { page, query } = queryParamsSchema.parse(searchParams);
  const shouldDisplayPopularMovies = Boolean(!query.length);
  const response: SearchResponse = await fetch(
    shouldDisplayPopularMovies
      ? `https://api.themoviedb.org/3/movie/popular?page=${page}`
      : `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&query=${query}&page=${page}`,
    options,
  )
    .then(res => res.json())
    .then(json => json);

  const movies = mapApiToProps(response.results);

  return (
    <main>
      <div className="m-auto mb-unit-xl w-3/4">
        <SearchInput />
      </div>
      <h1 className="mb-unit-xl text-3xl">
        {shouldDisplayPopularMovies
          ? 'Popular movies'
          : `Searching for ${query}...`}
      </h1>
      <div className="m-auto grid grid-cols-[repeat(auto-fit,_minmax(min(100%,_max(320px,_100%_/_5)),_1fr))] gap-[40px]">
        {movies.map((props, index) => (
          <MovieCard {...props} key={index} />
        ))}
      </div>
      <div className="mt-unit-md">
        <Pagination
          total={Math.min(response.total_pages, MAX_PAGE_ALLOWED)}
          initialPage={page}
        />
      </div>
    </main>
  );
}
