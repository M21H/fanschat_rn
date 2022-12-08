import { createAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export type ResponseError = { message: string; name?: string };

type AbstractFailActionCreatorType = (payload?: ResponseError) => any;

export const processRequestError = createAction<{
  error: AxiosError;
  failAction: AbstractFailActionCreatorType;
}>('errors/PROCESS_REQUEST_ERROR');
