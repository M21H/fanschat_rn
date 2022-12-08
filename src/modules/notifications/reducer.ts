import { createReducer } from '@reduxjs/toolkit';

import { getAllNotifications } from './actions';
import { INotification } from './types';

interface State {
  data: INotification[];
  count: Nullable<number>;
}

export const initialState: State = {
  data: [],
  count: null,
};

export const notificationReducer = createReducer(initialState, builder =>
  builder.addCase(getAllNotifications.success, (state, { payload }) => {
    state.data = payload.data;
    state.count = payload.count;
  }),
);
