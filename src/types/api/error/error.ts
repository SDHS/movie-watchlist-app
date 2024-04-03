export type CustomError = {
  error: {
    message: string;
    data?: Record<string, unknown>;
  };
};

export const isCustomError = (obj: unknown): obj is CustomError =>
  obj !== null &&
  typeof obj === 'object' &&
  'error' in obj &&
  obj.error !== null &&
  typeof obj.error === 'object' &&
  'message' in obj.error;
