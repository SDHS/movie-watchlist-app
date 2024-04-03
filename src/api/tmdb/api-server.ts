import { getServerSession } from 'next-auth';

import { authOptions } from '@/utils/authOptions';
import { handleError } from '@/utils/error';
import { getMovieDetailTag } from '@/utils/tmdb';

import prisma from '@/lib/prisma';

import { BASE_URL } from '@/constants/tmdb';

import { MovieDetail } from '@/types/api/tmdb/fetch-movie-detail';

import { COMMON_QUERY_PARAMS } from './constants';

export const fetchMovieDetail = async (id: number) => {
  const session = await getServerSession(authOptions);
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
        next: { tags: [getMovieDetailTag(id)] },
      },
    );
    const json: MovieDetail = await response.json();
    if (!response.ok) {
      throw json;
    }

    let isMovieInWatchlist = false;
    if (session?.user) {
      isMovieInWatchlist = Boolean(
        await prisma.watchlist.findUnique({
          where: {
            userId_movieId: {
              movieId: json.id,
              userId: session.user.id,
            },
          },
        }),
      );
    }
    return { ...json, in_watchlist: isMovieInWatchlist };
  } catch (error) {
    handleError(error);
  }
};
