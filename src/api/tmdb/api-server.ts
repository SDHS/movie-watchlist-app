import { getServerSession } from 'next-auth';

import { authOptions } from '@/utils/authOptions';
import prisma from '@/utils/prisma';
import { getMovieDetailTag } from '@/utils/tmdb';

import { BASE_URL } from '@/constants/tmdb';

import { MovieDetail } from '@/types/api/tmdb/fetch-movie-detail';

import { COMMON_QUERY_PARAMS } from './constants';

export const fetchMovieDetail = async (id: number) => {
  const session = await getServerSession(authOptions);
  const queryParams = new URLSearchParams({
    ...COMMON_QUERY_PARAMS,
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
      return undefined;
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
  } catch (error) {}
};
