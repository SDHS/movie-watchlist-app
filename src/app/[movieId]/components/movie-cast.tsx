import CastCard from '@/ui/cast-card';

import { fetchMovieCast } from '@/api/tmdb/api';

export default async function MovieCast({ movieId }: { movieId: number }) {
  const credits = await fetchMovieCast(movieId);

  if (!credits) {
    return null;
  }

  return (
    <div className="flex max-w-[100%] items-center gap-unit-md overflow-scroll p-unit-md">
      {Array.isArray(credits.cast) ? (
        credits.cast.map(({ id, name, profile_path, character }) => (
          <CastCard
            key={id}
            name={name}
            profilePath={profile_path}
            character={character}
          />
        ))
      ) : (
        <p className="font-bold">Cast unavailable</p>
      )}
    </div>
  );
}
