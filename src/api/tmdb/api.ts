import { BASE_URL } from '@/constants/tmdb';

import { FetchListResponse } from '@/types/api/tmdb/fetch-list';

import { COMMON_QUERY_PARAMS } from './constants';

export const searchMovies = async (params: { query: string; page: string }) => {
  const queryParams = new URLSearchParams({
    ...params,
    ...COMMON_QUERY_PARAMS,
    include_adult: 'false',
    language: 'en-US',
  });
  const stringifiedParams = queryParams.toString();

  try {
    const response: Response = await fetch(
      `${BASE_URL}/search/movie?${stringifiedParams}`,
      {
        method: 'GET',
      },
    );
    const json: FetchListResponse = await response.json();
    if (!response.ok) {
      return undefined;
    }
    return json;
  } catch (error) {}
};

export const fetchPopularMovies = async (params: { page: string }) => {
  const queryParams = new URLSearchParams({
    ...params,
    ...COMMON_QUERY_PARAMS,
  });
  const stringifiedParams = queryParams.toString();

  try {
    const response: Response = await fetch(
      `${BASE_URL}/movie/popular?${stringifiedParams}`,
      {
        method: 'GET',
      },
    );
    const json: FetchListResponse = await response.json();
    if (!response.ok) {
      return undefined;
    }
    return json;
  } catch (error) {}
};
