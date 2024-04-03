import { headers } from 'next/headers';

import { handleError } from '@/utils/error';

import { BASE_URL } from '@/constants/watchlist';

import type { FetchWatchlistResponse } from '@/types/api/watchlist/fetch-watchlist';

export const fetchWatchlist = async () => {
  try {
    const response: Response = await fetch(`${BASE_URL}`, {
      method: 'GET',
      headers: headers(),
    });
    const json: FetchWatchlistResponse = await response.json();
    if (!response.ok) {
      throw json;
    }
    return json;
  } catch (error) {
    handleError(error);
  }
};
