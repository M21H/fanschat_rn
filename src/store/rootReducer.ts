import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { createTransform, persistReducer } from 'redux-persist';

import { errorsReducer } from '~/common/@errors/reducer';
import { loadingsReducer } from '~/common/@loadings/reducer';
import { resetStore } from '~/modules/app/actions';
import { authReducer } from '~/modules/authentication/reducer';
import { feedReducer } from '~/modules/feed/reducer';
import { friendsReducer } from '~/modules/friends/reducer';
import { notificationReducer } from '~/modules/notifications/reducer';
import { uiReducer } from '~/modules/ui/reducer';
import { usersReducer } from '~/modules/users/reducer';

const transforms = [
  createTransform(
    state => JSON.stringify(state),
    state =>
      JSON.parse(state, (key, value) =>
        typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
          ? new Date(value)
          : value,
      ),
  ),
];

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  transforms,
};

const appReducer = combineReducers({
  '@errors': errorsReducer,
  '@loadings': loadingsReducer,
  notifications: notificationReducer,
  ui: uiReducer,
  auth: authReducer,
  friends: friendsReducer,
  users: usersReducer,
  feed: feedReducer,
});

const reducer: typeof appReducer = (state, action) => {
  if (action.type === resetStore().type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const rootReducer = persistReducer<ReturnType<typeof reducer>>(rootPersistConfig, reducer);
