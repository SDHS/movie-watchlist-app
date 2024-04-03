import MovieCard from '@/ui/movie-card';
import MovieGrid from '@/ui/movie-grid';

import { fetchWatchlist } from '@/api/watchlist/api-server';

export default async function Watchlist() {
  const watchlist = await fetchWatchlist();

  if (!watchlist) {
    return <div>An error occurred. Please try again</div>;
  }

  return (
    <>
      <h1 className="text-bold mb-unit-xl text-3xl">Watchlist</h1>
      <MovieGrid>
        {watchlist.map(movie => (
          <MovieCard
            href={`/${movie.movieId}`}
            posterPath={movie.posterPath}
            name={movie.title}
            releaseDate={new Date(movie.releaseYear)}
            key={movie.id}
          />
        ))}
      </MovieGrid>
    </>
  );
}
