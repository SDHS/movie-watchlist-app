import { Card, CardBody, CardFooter } from '@nextui-org/card';
import Image from 'next/image';
import { Props } from './types';
import Link from 'next/link';

const DEFAULT_IMAGE = '/image_not_found.jpg';

export default function MovieCard({
  imageSrc,
  name,
  releaseDate,
  href,
}: Props) {
  return (
    <Card className="p-2">
      <CardBody className="flex content-center items-center overflow-hidden">
        <Link href={href}>
          <div
            className="relative h-52 w-80"
            style={{ width: '320px', height: '210px' }}
          >
            <Image
              className="m-auto object-contain"
              src={imageSrc ?? DEFAULT_IMAGE}
              fill
              key={imageSrc ?? DEFAULT_IMAGE}
              alt={`Movie "${name}" poster`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      </CardBody>
      <CardFooter className="flex-col items-start">
        <h3 className="line-clamp-1 text-large">{name}</h3>
        <h5>{releaseDate.getFullYear()}</h5>
      </CardFooter>
    </Card>
  );
}
