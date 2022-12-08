import { createSelector } from '@reduxjs/toolkit';

import { createErrorSelector } from '~/common/@errors/utils';
import { createLoadingSelector } from '~/common/@loadings/utils';
import { RootState } from '~/store/types';
import { calcPagesCont } from '~/utils/example';

import { TYPES } from './actions';

// Error selectors
export const selectAllUsersError = createErrorSelector(TYPES.getAllUsers.TYPE);

// Loading selectors
export const selectIsAllUserLoading = createLoadingSelector(TYPES.getAllUsers.TYPE);
export const selectIsCurrentUserLoading = createLoadingSelector(TYPES.getOneUser.TYPE);

const usersData = (state: RootState): RootState['users'] => state.users;

// const usersList = createSelector(usersData, users => users.data);

// export const selectSearchUser = createSelector(usersData, users => users.search);

// export const selectAllUsers = createSelector(
//   usersList,
//   selectSearchUser,
//   (usersList, searchUsers) =>
//     usersList.filter(user =>
//       user.displayName.toLocaleLowerCase().includes(searchUsers.toLocaleLowerCase()),
//     ),
// );

export const selectAllUsers = createSelector(usersData, users => users.data);

export const selectTotalUsersPages = createSelector(usersData, users =>
  calcPagesCont(users.perPage, users.count),
);
export const selectCurrentUser = createSelector(usersData, users => users.currentUser);

export const selectSearchUser = createSelector(usersData, users => users.search);
