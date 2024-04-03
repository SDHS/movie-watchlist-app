import { Avatar } from '@nextui-org/avatar';
import { Card } from '@nextui-org/card';

import { getImage } from '@/utils/tmdb';

import type { Props } from './types';

export default function CastCard({ profilePath, name, character }: Props) {
  return (
    <Card className="flex min-w-fit items-center p-unit-md">
      <Avatar src={getImage(profilePath)} size="lg" />
      <p className="font-bold">{name}</p>
      <p>{character}</p>
    </Card>
  );
}
