import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '~/store/types';

const selfModule = (state: RootState): RootState['ui'] => state.ui;

export const selectAuthModal = createSelector(selfModule, data => data.authModal);
export const selectNotificationsModal = createSelector(selfModule, data => data.notificationsModal);
export const selectUnfriendModal = createSelector(selfModule, data => data.unfriendModal);
export const selectReportModal = createSelector(selfModule, data => data.reportModal);
export const selectRequestFriendModal = createSelector(selfModule, data => data.requestFriendModal);
