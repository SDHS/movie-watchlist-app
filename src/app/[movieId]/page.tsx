import { fetchMovieDetail } from '@/api/tmdb/api';
import { IMAGES_BASE_URL } from '@/constants/tmdb';

import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { Plus } from 'lucide-react';

import { CircularProgress } from '@nextui-org/progress';
import { Card } from '@nextui-org/card';
import { Avatar } from '@nextui-org/react';

const getImage = (path: string | null | undefined) =>
  path ? `${IMAGES_BASE_URL}${path}` : './image_not_found.jpg';

export default async function MovieDetail({
  params,
}: {
  params: {
    movieId: string;
  };
}) {
  const movie = await fetchMovieDetail(+params.movieId);

  if (!movie) {
    return <div>An error occurred, please refresh and try again</div>;
  }

  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <Button startContent={<Plus />}>Add to watchlist</Button>
      </div>
      <div className="mt-unit-xl flex w-full flex-col gap-unit-lg md:flex-row">
        <Image
          removeWrapper
          src={getImage(movie.poster_path)}
          alt={`${movie.title} poster`}
          className="w-full object-cover md:w-[50%] md:min-w-[300px]"
        />
        <div className="flex flex-col gap-unit-lg">
          <div>
            <h3>Release date:</h3>
            <h3>{movie.release_date ?? 'Release date unavailable'}</h3>
          </div>
          <div>
            <h3>Runtime:</h3>
            <h3>{movie.runtime} minutes</h3>
          </div>
          <div>
            <h3>Genre:</h3>
            <h3>{movie.genres.map(genre => genre.name).join(', ')}</h3>
          </div>
          <div>
            <h3>Plot summary:</h3>
            <h3>{movie.overview}</h3>
          </div>
          <div>
            <h3>User ratings:</h3>
            <div className="flex items-center gap-unit-sm">
              <CircularProgress
                size="lg"
                value={(movie.vote_average / 10) * 100}
                color="primary"
                showValueLabel
              />
              <p className="text-small">Based on {movie.vote_count} votes</p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="mt-unit-lg text-xl font-bold">Cast:</h2>
      <div className="flex w-full max-w-[100%] items-center gap-unit-md overflow-scroll p-unit-md">
        {movie.credits.cast.map(member => (
          <Card
            key={member.id}
            className="flex min-w-fit items-center p-unit-md"
          >
            <Avatar src={getImage(member.profile_path)} size="lg" />
            <p className="font-bold">{member.name}</p>
            <p>{member.character}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
