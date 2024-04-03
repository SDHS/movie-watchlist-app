import { BASE_URL } from '@/constants/tmdb';
import { FetchListResponse } from '@/types/api/tmdb/fetch-list';
import { MovieDetail } from '@/types/api/tmdb/fetch-movie-detail';

const COMMON_QUERY_PARAMS = {
  api_key: process.env.TMDB_API_KEY,
};

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
      throw json;
    }
    return json;
  } catch (error) {
    console.error('An error occurred');
  }
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
      throw json;
    }
    return json;
  } catch (error) {
    console.error('An error occurred');
  }
};

export const fetchMovieDetail = async (id: number) => {
  const queryParams = new URLSearchParams({
    ...COMMON_QUERY_PARAMS,
    append_to_response: 'credits',
  });
  const stringifiedParams = queryParams.toString();

  try {
    const response: Response = await fetch(
      `${BASE_URL}/movie/${id}?${stringifiedParams}`,
      {
        method: 'GET',
      },
    );
    const json: MovieDetail = await response.json();
    if (!response.ok) {
      throw json;
    }
    return json;
  } catch (error) {
    console.error('An error occurred');
  }
};
