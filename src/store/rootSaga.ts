import { all, SagaGenerator } from 'typed-redux-saga';

import { watchErrors } from '~/common/@errors/saga';
import { watchAuth } from '~/modules/authentication/saga';
import { watchFeed } from '~/modules/feed/saga';
import { watchFriends } from '~/modules/friends/saga';
import { watchNotifications } from '~/modules/notifications/saga';
import { watchUsers } from '~/modules/users/saga';

export function* rootSaga(): SagaGenerator<ToFix> {
  yield* all([
    watchAuth(),
    watchErrors(),
    watchFriends(),
    watchUsers(),
    watchFeed(),
    watchNotifications(),
  ]);
}
