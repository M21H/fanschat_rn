import { createAction } from '@reduxjs/toolkit';

import { AuthenticatedUser } from '~/models';
import { GetLocationRes } from '~/services/api/Location';
import { createAsyncAction, createAsyncType } from '~/store/utils';

import { LoginReq, RegisterReq } from './types';

export const TYPES = {
  getLocation: createAsyncType('auth/GET_LOCATION'),
  logIn: createAsyncType('auth/LOG_IN'),
  logOut: createAsyncType('auth/LOG_OUT'),
  register: createAsyncType('auth/REGISTER'),
  setToken: 'auth/SET_TOKEN',
};

const setToken = createAction<{ access: string; refresh: string }>(TYPES.setToken);
const getLocation = createAsyncAction<void, GetLocationRes, void>(TYPES.getLocation);

const logOut = createAsyncAction(TYPES.logOut);
const logIn = createAsyncAction<
  LoginReq,
  { user: AuthenticatedUser; token: string; refreshToken: string },
  void
>(TYPES.logIn);
const register = createAsyncAction<
  RegisterReq,
  { user: AuthenticatedUser; token: string; refreshToken: string },
  void
>(TYPES.register);

export { getLocation, logIn, logOut, register, setToken };
