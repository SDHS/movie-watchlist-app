import Link from 'next/link';

import { Card, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { isValid } from 'date-fns/isValid';

import { getImage } from '@/utils/tmdb';

import type { Props } from './types';

export default function MovieCard({
  posterPath,
  name,
  releaseDate,
  href,
}: Props) {
  const imagePath = getImage(posterPath);

  return (
    <Card className="flex-col items-center justify-between p-2 bg-secondary-50">
      <Link href={href}>
        <Image
          key={imagePath}
          src={imagePath}
          alt={`Movie: ${name} poster`}
          className="z-0 object-cover w-full h-full md:h-[400px]"
        />
      </Link>
      <CardFooter className="mt-7 flex-col items-start">
        <h3 className="line-clamp-1 text-large">{name}</h3>
        <h5>
          {!isValid(releaseDate)
            ? 'Release date not available'
            : releaseDate.getFullYear()}
        </h5>
      </CardFooter>
    </Card>
  );
}
