import { DEFAULT_IMAGE_PATH, IMAGES_BASE_URL } from '@/constants/tmdb';

export const getImage = (path: string | null | undefined) =>
  path ? `${IMAGES_BASE_URL}${path}` : DEFAULT_IMAGE_PATH;
