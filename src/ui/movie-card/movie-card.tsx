import { Card, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import NextImage from 'next/image';
import { Props } from './types';
import Link from 'next/link';
import { isValid } from 'date-fns/isValid';

const DEFAULT_IMAGE = '/image_not_found.jpg';

export default function MovieCard({
  imageSrc,
  name,
  releaseDate,
  href,
}: Props) {
  return (
    <Card className="flex-col items-center justify-between p-2">
      <Link href={href}>
        <Image
          as={NextImage}
          width={310}
          height={200}
          src={imageSrc ?? DEFAULT_IMAGE}
          alt={`Movie: ${name} poster`}
          className="z-0 object-cover"
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
