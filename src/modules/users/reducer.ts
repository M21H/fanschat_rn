import { createReducer } from '@reduxjs/toolkit';

import { IUser } from '~/models';

import { getAllUsers, getOneUser, setSearchUser } from './actions';

type UsersState = {
  data: IUser[];
  count: number;
  currentUser: Nullable<IUser>;
  search: string;
  perPage: number;
};

export const initialState: UsersState = {
  data: [],
  count: 0,
  currentUser: null,
  search: '',
  perPage: 21,
};

export const usersReducer = createReducer(initialState, builder =>
  builder
    .addCase(getAllUsers.success, (state, { payload }) => {
      state.data = payload.data;
      state.count = payload.count;
    })

    .addCase(getOneUser.success, (state, { payload }) => {
      state.currentUser = payload;
    })
    .addCase(setSearchUser, (state, { payload }) => {
      state.search = payload;
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .addCase(getAllUsers.reset, state => {
      return initialState;
    }),
);
