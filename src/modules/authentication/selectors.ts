import { createSelector } from '@reduxjs/toolkit';

import { createErrorSelector } from '~/common/@errors/utils';
import { createLoadingSelector } from '~/common/@loadings/utils';
import { RootState } from '~/store/types';

import { TYPES } from './actions';

export const selectIsLoginError = createErrorSelector(TYPES.logIn.TYPE);
export const selectIsLoginLoading = createLoadingSelector(TYPES.logIn.TYPE);

export const selectIsLogoutError = createErrorSelector(TYPES.logOut.TYPE);
export const selectIsLogoutLoading = createLoadingSelector(TYPES.logOut.TYPE);

export const selectIsRegisterError = createErrorSelector([TYPES.register.TYPE]);
export const selectIsRegisterLoading = createLoadingSelector(TYPES.register.TYPE);

export const selectIsLocationLoading = createLoadingSelector(TYPES.getLocation.TYPE);

const selfModule = (state: RootState): RootState['auth'] => state.auth;

const selectAccessToken = createSelector(selfModule, auth => auth.token?.access);

// export const selectAuthErrorMessage = createSelector(selfModule, auth => auth.error);
export const selectIsAuthenticated = createSelector(selectAccessToken, accessToken =>
  Boolean(accessToken),
);

export const selectWasRegistrationCompleted = createSelector(
  selfModule,
  auth => auth.wasRegistrationCompleted,
);

export const selectLocation = createSelector(selfModule, auth => auth.location);

export const selectAuthenticatedUser = createSelector(selfModule, auth => auth.authenticatedUser);
