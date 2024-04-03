import { Image } from '@nextui-org/image';
import { CircularProgress } from '@nextui-org/progress';
import { Tooltip } from '@nextui-org/tooltip';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import CastCard from '@/ui/cast-card';

import { fetchMovieDetail } from '@/api/tmdb/api-server';

import { getImage } from '@/utils/tmdb';

import AddToWatchlistButton from './add-to-watchlist-button';
import MovieDetailItem, {
  Props as MovieDetailItemProps,
} from './movie-detail-item';

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
    return <div>An error occurred, please refresh and try again</div>;
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
        userId: session?.user.id,
      }}
    />
  );

  const movieDetails: MovieDetailItemProps[] = [
    {
      heading: 'Release date:',
      content: movie.release_date ?? 'Release date unavailable',
    },
    {
      heading: 'Runtime:',
      content: `${movie.runtime} minutes`,
    },
    {
      heading: 'Genre:',
      content: movie.genres.map(genre => genre.name).join(', '),
    },
    {
      heading: 'Plot summary:',
      content: movie.overview,
    },
    {
      heading: 'User ratings:',
      content: (
        <div className="flex items-center gap-unit-sm">
          <CircularProgress
            size="lg"
            value={(movie.vote_average / 10) * 100}
            color="primary"
            showValueLabel
          />
          <p className="text-small">Based on {movie.vote_count} votes</p>
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
          removeWrapper
          src={getImage(movie.poster_path)}
          alt={`${movie.title} poster`}
          className="w-full object-cover md:w-[50%] md:min-w-[300px]"
        />
        <div className="flex flex-col gap-unit-lg">
          {movieDetails.map(details => (
            <MovieDetailItem key={details.heading} {...details} />
          ))}
        </div>
      </div>
      <h2 className="mt-unit-lg text-xl font-bold">Cast:</h2>
      <div className="flex w-full max-w-[100%] items-center gap-unit-md overflow-scroll p-unit-md">
        {movie.credits.cast.map(({ id, name, profile_path, character }) => (
          <CastCard
            key={id}
            name={name}
            profilePath={profile_path}
            character={character}
          />
        ))}
      </div>
    </main>
  );
}
