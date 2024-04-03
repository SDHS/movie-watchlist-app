import type { CreateWatchlistRequestBody } from '@/types/api/watchlist/fetch-watchlist';

export const addMovieToWatchlist = async (
  body: CreateWatchlistRequestBody['data'],
) => {
  try {
    const response = await fetch('/api/watchlist', {
      method: 'POST',
      body: JSON.stringify({ data: body }),
    });
    const json = response.json();
    if (!response.ok) {
      throw json;
    }
    return json;
  } catch (error) {
    console.log('An error occurred');
  }
};
