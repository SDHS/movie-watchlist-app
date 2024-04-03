import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

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

    Response.json(
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
    Response.json(
      { error: { message: 'Error removing from watchlist' } },
      { status: 500 },
    );
  }
}
