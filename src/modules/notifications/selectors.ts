import { createSelector } from '@reduxjs/toolkit';

import { createLoadingSelector } from '~/common/@loadings/utils';
import { RootState } from '~/store/types';

import { TYPES } from './actions';

const selfModule = (state: RootState): RootState['notifications'] => state.notifications;

export const selectNotifications = createSelector(selfModule, data => data.data);

export const selectIsNotificationLoading = createLoadingSelector(TYPES.getAllNotifications.TYPE);
