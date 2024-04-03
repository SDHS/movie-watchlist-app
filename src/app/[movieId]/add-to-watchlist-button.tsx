'use client';

import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from '@/api/watchlist/api';
import { CreateWatchlistRequestBody } from '@/types/api/watchlist/fetch-watchlist';
import { Button, ButtonProps } from '@nextui-org/button';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { customRevalidateTag } from './revalidate-tag';
import { getMovieDetailTag } from '@/utils/tmdb';

type Props = ButtonProps & {
  watchlistBody: CreateWatchlistRequestBody['data'];
  inWatchlist?: boolean;
};

export default function AddToWatchlistButton({
  watchlistBody,
  inWatchlist,
  ...rest
}: Props) {
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <Button
      color={inWatchlist ? 'danger' : 'primary'}
      isLoading={isUpdating}
      onClick={async () => {
        setIsUpdating(true);
        if (inWatchlist) {
          await removeMovieFromWatchlist(watchlistBody.tmdbId);
          toast.success('Movie successfully removed from watchlist!');
        } else {
          await addMovieToWatchlist(watchlistBody);
          toast.success('Movie successfully added to watchlist!');
        }
        setIsUpdating(false);
        customRevalidateTag(getMovieDetailTag(watchlistBody.tmdbId));
      }}
      {...rest}
    >
      {inWatchlist ? 'Remove from' : 'Add to'} watchlist
    </Button>
  );
}
