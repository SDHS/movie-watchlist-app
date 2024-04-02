export type WatchlistObject = {
  id: number;
  movieId: number;
  title: string;
  userId: number;
  posterPath: string;
  releaseYear: string | null;
  createdAt: Date;
};

export type CreateWatchlistRequestBody = {
  data: {
    title: string;
    posterPath: string;
    tmdbId: number;
    releaseDate?: string;
    userId: number;
  };
};

export type FetchWatchlistResponse = WatchlistObject[];
