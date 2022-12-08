import { createReducer } from '@reduxjs/toolkit';

import { IUser } from '~/models';

import { getAllFriends, getMutualFriends } from './actions';

export type FriendsState = {
  data: IUser[];
  mutualFriends: IUser[];
  count: number;
  perPage: number;
};

export const initialState: FriendsState = {
  data: [],
  mutualFriends: [],
  count: 0,
  perPage: 21,
};

export const friendsReducer = createReducer(initialState, builder =>
  builder
    .addCase(getAllFriends.success, (state, { payload }) => {
      state.data = state.data.concat(payload.data);
      state.count = payload.count;
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .addCase(getAllFriends.reset, state => {
      return initialState;
    })
    .addCase(getMutualFriends.success, (state, { payload }) => {
      state.mutualFriends = payload.data;
    }),
);
