import { createReducer } from '@reduxjs/toolkit';

import { AuthenticatedUser } from '~/models';

import { getLocation, logIn, register, setToken } from './actions';

interface UserState {
  wasRegistrationCompleted: boolean;
  authenticatedUser: Nullable<AuthenticatedUser>;
  location: any;
  token: { access: string; refresh: string };
}

export const initialState: UserState = {
  wasRegistrationCompleted: false,
  authenticatedUser: null,
  location: null,
  token: {
    access: '',
    refresh: '',
  },
};

export const authReducer = createReducer(initialState, builder =>
  builder
    .addCase(logIn.success, (state, { payload }) => {
      state.authenticatedUser = payload.user;
      state.token.access = payload.token;
      state.token.refresh = payload.refreshToken;
      state.wasRegistrationCompleted = true;
    })
    .addCase(register.success, (state, { payload }) => {
      state.authenticatedUser = payload.user;
      state.token.access = payload.token;
      state.token.refresh = payload.refreshToken;
      state.wasRegistrationCompleted = true;
    })
    .addCase(setToken, (state, { payload }) => {
      state.token = payload;
    })
    .addCase(getLocation.success, (state, { payload }) => {
      state.location = payload;
    }),
);
