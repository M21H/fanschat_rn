import { createSelector } from '@reduxjs/toolkit';

import { createErrorSelector } from '~/common/@errors/utils';
import { createLoadingSelector } from '~/common/@loadings/utils';
import { RootState } from '~/store/types';
import { calcPagesCont } from '~/utils/example';

import { TYPES } from './actions';

export const selectAllFriendsError = createErrorSelector(TYPES.getAllFriends.TYPE);
export const selectIsAllFriendsLoading = createLoadingSelector(TYPES.getAllFriends.TYPE);
export const selectIsMutualFriendsLoading = createLoadingSelector(TYPES.getMutualFriends.TYPE);

const selfModule = (state: RootState): RootState['friends'] => state.friends;

export const selectAllFriends = createSelector(selfModule, friends => friends.data);
export const selectTotalFriendsPages = createSelector(selfModule, friends =>
  calcPagesCont(friends.perPage, friends.count),
);

export const selectMutualFriends = createSelector(selfModule, friends => friends.mutualFriends);
