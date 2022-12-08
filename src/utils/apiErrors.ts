import { AxiosError } from 'axios';

export const isAxiosError = (error: ToFix): AxiosError | null => {
  if (error.isAxiosError) {
    return error as AxiosError;
  }

  return null;
};
