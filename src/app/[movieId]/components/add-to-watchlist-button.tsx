'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

import { Button, ButtonProps } from '@nextui-org/button';

import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from '@/api/watchlist/api';

import { getMovieDetailTag } from '@/utils/tmdb';

import { CreateWatchlistRequestBody } from '@/types/api/watchlist/fetch-watchlist';

import { customRevalidateTag } from '../revalidate-tag';

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
      className="min-w-fit"
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
