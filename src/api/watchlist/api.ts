import type { CreateWatchlistRequestBody } from '@/types/api/watchlist/fetch-watchlist';
import { handleError } from '@/utils/error';

export const addMovieToWatchlist = async (
  body: CreateWatchlistRequestBody['data'],
) => {
  try {
    const response = await fetch('/api/watchlist', {
      method: 'POST',
      body: JSON.stringify({ data: body }),
    });
    const json = await response.json();
    if (!response.ok) {
      throw json;
    }
    return json;
  } catch (error) {
    handleError(error);
  }
};
