import { NextRequest } from 'next/server';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/utils/authOptions';
import prisma from '@/utils/prisma';

export async function DELETE(request: NextRequest) {
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

  const { movieId } = await request.json();

  try {
    const deletedMovie = await prisma.watchlist.delete({
      where: {
        userId_movieId: {
          movieId,
          userId: session.user.id,
        },
      },
    });

    return Response.json(
      {
        data: {
          message: 'Watchlist item successfully deleted',
          deletedMovie,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return Response.json(
      { error: { message: 'Error removing from watchlist' } },
      { status: 500 },
    );
  }
}
