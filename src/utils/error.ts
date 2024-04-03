import toast from 'react-hot-toast';

import { isCustomError } from '@/types/api/error/error';

export const handleError = (error: unknown) => {
  if (isCustomError(error)) {
    toast.error(error.error.message);
  } else {
    toast.error('An unexpected error occurred! Please try again');
  }
};
