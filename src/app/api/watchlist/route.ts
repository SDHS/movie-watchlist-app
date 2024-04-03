import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';
import type { CreateWatchlistRequestBody } from '@/types/api/watchlist/fetch-watchlist';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json(
      {
        error: {
          message: 'Unauthorized',
        },
      },
      {
        status: 401,
      },
    );
  }

  const userWatchlist = await prisma.watchlist.findMany({
    where: {
      userId: Number(session.user.id),
    },
  });

  return Response.json(userWatchlist, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json(
      {
        error: {
          message: 'Unauthorized',
        },
      },
      {
        status: 401,
      },
    );
  }

  const {
    data: { tmdbId, userId, posterPath, title, releaseDate },
  }: { data: CreateWatchlistRequestBody['data'] } = await request.json();

  const movieAlreadyExists = await prisma.watchlist.findUnique({
    where: {
      userId_movieId: {
        movieId: tmdbId,
        userId,
      },
    },
  });

  if (movieAlreadyExists) {
    return Response.json(
      { error: { message: 'Movie is already present in the watchlist' } },
      { status: 409 },
    );
  }

  const newWatchlist = await prisma.watchlist.create({
    data: {
      movieId: tmdbId,
      title,
      posterPath,
      userId,
      releaseYear: releaseDate,
    },
  });

  return Response.json(
    { data: { message: 'Added to watchlist!', movie: newWatchlist } },
    { status: 201 },
  );
}
