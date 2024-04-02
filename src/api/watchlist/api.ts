import { BASE_URL } from '@/constants/watchlist';
import {
  CreateWatchlistRequestBody,
  FetchWatchlistResponse,
} from '@/types/api/watchlist/fetch-watchlist';

export const fetchWatchlist = async () => {
  try {
    const response: Response = await fetch(`${BASE_URL}`, {
      method: 'GET',
    });
    const json: FetchWatchlistResponse = await response.json();
    return json;
  } catch (error) {
    console.error('An error occurred');
  }
};

export const addMovieToWatchlist = async (
  body: CreateWatchlistRequestBody['data'],
) => {
  try {
    const res = await fetch('/api/watchlist', {
      method: 'POST',
      body: JSON.stringify({ data: body }),
    });
    const json = res.json();
    return json;
  } catch (error) {
    console.log('An error occurred');
  }
};
