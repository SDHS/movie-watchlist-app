'use client';

import { addMovieToWatchlist } from '@/api/watchlist/api';
import { CreateWatchlistRequestBody } from '@/types/api/watchlist/fetch-watchlist';
import { Button } from '@nextui-org/button';
import { useState } from 'react';

export default function AddToWatchlistButton({
  watchlistBody,
}: {
  watchlistBody: CreateWatchlistRequestBody['data'];
}) {
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
    >
      Add to watchlist
    </Button>
  );
}
