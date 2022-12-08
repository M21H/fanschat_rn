import { createReducer } from '@reduxjs/toolkit';

import { toggleModal } from './actions';

export type State = {
  authModal: boolean;
  unfriendModal: boolean;
  requestFriendModal: boolean;
  reportModal: boolean;
  notificationsModal: boolean;
};

export const initialState: State = {
  authModal: false,
  unfriendModal: false,
  requestFriendModal: false,
  reportModal: false,
  notificationsModal: false,
};

export const uiReducer = createReducer(initialState, builder =>
  builder.addCase(toggleModal, (state, { payload }) => {
    state[payload.name] = !state[payload.name];
  }),
);
