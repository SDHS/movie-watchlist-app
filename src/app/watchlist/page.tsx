import ErrorCard from '@/ui/error-card';
import MovieCard from '@/ui/movie-card';
import MovieGrid from '@/ui/movie-grid';

import { fetchWatchlist } from '@/api/watchlist/api-server';

export default async function Watchlist() {
  const watchlist = await fetchWatchlist();

  if (!watchlist) {
    return <ErrorCard content="Please sign up to create your watchlist" />;
  }

  return (
    <>
      <h1 className="text-bold mb-unit-xl text-3xl">Watchlist</h1>
      {watchlist.length ? (
        <MovieGrid>
          {watchlist.map(movie => (
            <MovieCard
              href={`/${movie.movieId}`}
              posterPath={movie.posterPath}
              name={movie.title}
              releaseDate={new Date(String(movie.releaseYear))}
              key={movie.id}
            />
          ))}
        </MovieGrid>
      ) : (
        <p className="text-xl font-bold">
          Add movies to your watchlist to save them here!
        </p>
      )}
    </>
  );
}
