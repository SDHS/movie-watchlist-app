'use client';

import { addMovieToWatchlist } from '@/api/watchlist/api';
import { CreateWatchlistRequestBody } from '@/types/api/watchlist/fetch-watchlist';
import { Button, ButtonProps } from '@nextui-org/button';
import { useState } from 'react';

type Props = ButtonProps & {
  watchlistBody: CreateWatchlistRequestBody['data'];
};

export default function AddToWatchlistButton({
  watchlistBody,
  ...rest
}: Props) {
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <Button
      color="primary"
      isLoading={isUpdating}
      onClick={async () => {
        setIsUpdating(true);
        await addMovieToWatchlist(watchlistBody);
        setIsUpdating(false);
      }}
      {...rest}
    >
      Add to watchlist
    </Button>
  );
}
