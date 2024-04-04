import { Image } from '@nextui-org/image';
import { CircularProgress } from '@nextui-org/progress';
import { Tooltip } from '@nextui-org/tooltip';
import { getServerSession } from 'next-auth';

import ErrorCard from '@/ui/error-card';

import { fetchMovieDetail } from '@/api/tmdb/api-server';

import { authOptions } from '@/utils/authOptions';
import { getImage } from '@/utils/tmdb';

import AddToWatchlistButton from './components/add-to-watchlist-button';
import MovieCast from './components/movie-cast';
import MovieDetailItem, {
  Props as MovieDetailItemProps,
} from './components/movie-detail-item';

export default async function MovieDetail({
  params,
}: {
  params: {
    movieId: string;
  };
}) {
  const [movie, session] = await Promise.all([
    fetchMovieDetail(+params.movieId),
    getServerSession(authOptions),
  ]);

  if (!movie) {
    return <ErrorCard />;
  }

  const addToWatchlistButtonJsx = (
    <AddToWatchlistButton
      isDisabled={session === null}
      inWatchlist={movie.in_watchlist}
      watchlistBody={{
        posterPath: movie.poster_path,
        title: movie.title,
        tmdbId: movie.id,
        releaseDate: movie.release_date ?? undefined,
        userId: session?.user.id ?? -1,
      }}
    />
  );

  const movieDetails: MovieDetailItemProps[] = [
    {
      heading: 'Release date:',
      content: movie?.release_date ?? 'Unavailable',
    },
    {
      heading: 'Runtime:',
      content: movie?.runtime ? `${movie.runtime} minutes` : 'Unavailable',
    },
    {
      heading: 'Genre:',
      content: Array.isArray(movie?.genres)
        ? movie.genres.map(genre => genre.name).join(', ')
        : 'Unavailable',
    },
    {
      heading: 'Plot summary:',
      content: movie?.overview ?? 'Unavailable',
    },
    {
      heading: 'User ratings:',
      content: (
        <div className="flex items-center gap-unit-sm">
          <CircularProgress
            size="lg"
            value={((movie?.vote_average ?? 0) / 10) * 100}
            color="primary"
            showValueLabel
            aria-label="user ratings"
          />
          {movie?.vote_count ? (
            <p className="text-small">Based on {movie.vote_count} votes</p>
          ) : (
            'Unavailable'
          )}
        </div>
      ),
    },
  ];

  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        {!session ? (
          <Tooltip content="Please sign in to add to watchlist">
            <div>{addToWatchlistButtonJsx}</div>
          </Tooltip>
        ) : (
          addToWatchlistButtonJsx
        )}
      </div>
      <div className="mt-unit-xl flex w-full flex-col gap-unit-lg md:flex-row">
        <Image
          src={getImage(movie.poster_path)}
          alt={`${movie?.title ?? ''} poster`}
          className="w-full object-cover md:w-[50%] md:min-w-[300px]"
        />
        <div className="flex flex-col gap-unit-lg">
          {movieDetails.map(details => (
            <MovieDetailItem key={details.heading} {...details} />
          ))}
        </div>
      </div>
      <h2 className="mt-unit-lg text-xl font-bold">Cast:</h2>
      <MovieCast movieId={+params.movieId} />
    </main>
  );
}
